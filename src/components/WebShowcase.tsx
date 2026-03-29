import { useRef, useEffect, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import clientVideo from '@/assets/cursorful-video-1773412428700.mp4';
const iphoneModel = '/models/IPHONE17.glb';

// Ready for VideoTexture application — do not use until mesh name confirmed from console
const videoSrc = clientVideo;

function Starfield() {
  const stars = Array.from({ length: 140 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.8 + 0.4,
    opacity: Math.random() * 0.5 + 0.1,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
}

type DragState = { rotX: number; rotY: number; isDragging: boolean; lastX: number; lastY: number };

function IPhoneWithVideo({ dragRef, videoRef }: { dragRef: React.RefObject<DragState>; videoRef: React.RefObject<HTMLVideoElement | null> }) {
  const { scene } = useGLTF(iphoneModel);
  const groupRef = useRef<THREE.Group>(null);
  const currentRotY = useRef(0.15);
  const currentRotX = useRef(-0.12);

  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const video = document.createElement('video');
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.style.display = 'none';
    video.src = videoSrc;
    document.body.appendChild(video);
    videoRef.current = video;

    const onReady = () => {
      // Offscreen canvas — bypasses UV/WebGL video sampling issues
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d')!;

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      textureRef.current = texture;
      canvasCtxRef.current = ctx;

      // Draw red rect immediately to confirm canvas pipeline reaches the material
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(0, 0, 1080, 1920);
      texture.needsUpdate = true;
      console.log('Canvas ctx set, drew red test rect');

      scene.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (!mesh.isMesh) return;

        // Hide screen placeholder content meshes (emissive white = glowing screen elements)
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat?.emissive?.getHex() === 0xffffff && mesh.name !== 'lAVJNLotEOnEKjC001') {
          mesh.visible = false;
          console.log('Hidden placeholder mesh:', mesh.name);
        }

        if (mesh.name === 'lAVJNLotEOnEKjC001') {
          const uvs = mesh.geometry.attributes.uv;
          console.log('UV attribute:', uvs ? `exists, count: ${uvs.count}` : 'MISSING - no UVs');

          if (!uvs) {
            // Generate flat UVs from position data
            const pos = mesh.geometry.attributes.position;
            const uvArray = new Float32Array(pos.count * 2);
            const box = new THREE.Box3().setFromBufferAttribute(pos as THREE.BufferAttribute);
            const size = new THREE.Vector3();
            box.getSize(size);

            for (let i = 0; i < pos.count; i++) {
              uvArray[i * 2]     = (pos.getX(i) - box.min.x) / size.x;
              uvArray[i * 2 + 1] = (pos.getY(i) - box.min.y) / size.y;
            }
            mesh.geometry.setAttribute('uv', new THREE.BufferAttribute(uvArray, 2));
            console.log('Generated UVs from position bounds');
          }

          const uv = mesh.geometry.attributes.uv;
          if (uv) {
            console.log('UV sample 0:', uv.getX(0), uv.getY(0));
            console.log('UV sample 20:', uv.getX(20), uv.getY(20));
            console.log('UV sample 40:', uv.getX(40), uv.getY(40));
          }

          mesh.material = new THREE.MeshBasicMaterial({
            map: texture,
            toneMapped: false,
            side: THREE.DoubleSide,
            depthTest: false,
            depthWrite: false,
          });
          (mesh.material as THREE.MeshBasicMaterial).needsUpdate = true;
          mesh.renderOrder = 999;
          console.log('Canvas texture applied');
        }
      });

      video.play().then(() => {
        console.log('Video playing, readyState:', video.readyState);
      }).catch((err) => console.error('Play failed:', err));
    };

    video.addEventListener('canplaythrough', onReady, { once: true });

    video.play().catch((err) => {
      console.error('Autoplay blocked:', err.message);
      const playOnInteraction = () => {
        video.play();
        window.removeEventListener('pointerdown', playOnInteraction);
      };
      window.addEventListener('pointerdown', playOnInteraction);
    });

    return () => {
      video.pause();
      document.body.removeChild(video);
      textureRef.current?.dispose();
      videoRef.current = null;
      textureRef.current = null;
      canvasCtxRef.current = null;
    };
  }, [scene]);

  // Fix 3 — Idle animation + cursor LERP
  useFrame((state) => {
    if (!groupRef.current) return;
    const drag = dragRef.current;

    // Slow idle rotation only when cursor is not actively driving the model
    if (Math.abs(drag.rotY - currentRotY.current) < 0.01) {
      drag.rotY += 0.003;
    }

    // Cursor LERP — unchanged
    currentRotY.current += (drag.rotY - currentRotY.current) * 0.1;
    currentRotX.current += (drag.rotX - currentRotX.current) * 0.1;
    groupRef.current.rotation.y = currentRotY.current;
    groupRef.current.rotation.x = currentRotX.current;

    // Gentle float
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.04;

    // Draw video frames onto canvas each frame
    if (!canvasCtxRef.current) return;
    if (canvasCtxRef.current && videoRef.current) {
      canvasCtxRef.current.drawImage(videoRef.current, 0, 0, 1080, 1920);
      if (textureRef.current) textureRef.current.needsUpdate = true;
    }
  });

  // Fix 2 — Scale 8, commanding presence
  return (
    <primitive
      ref={groupRef}
      object={scene}
      scale={8.5}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

function SceneContent({ dragRef, videoRef }: { dragRef: React.RefObject<DragState>; videoRef: React.RefObject<HTMLVideoElement | null> }) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} castShadow />
      <pointLight position={[-3, -2, 2]} intensity={0.5} color="#B85C2A" />
      <pointLight position={[0, -4, 1]} intensity={0.3} color="#B85C2A" />
      <Suspense fallback={null}>
        <IPhoneWithVideo dragRef={dragRef} videoRef={videoRef} />
      </Suspense>
    </>
  );
}

export default function WebShowcase() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.3 });
  const dragRef = useRef<DragState>({ rotX: -0.12, rotY: 0.15, isDragging: false, lastX: 0, lastY: 0 });
  const videoRef = useRef<HTMLVideoElement | null>(null);

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    dragRef.current.isDragging = true;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragRef.current.isDragging) return;
    const dx = e.clientX - dragRef.current.lastX;
    const dy = e.clientY - dragRef.current.lastY;
    dragRef.current.rotY += dx * 0.008;
    dragRef.current.rotX += dy * 0.008;
    dragRef.current.rotX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, dragRef.current.rotX));
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
  }

  function handlePointerUp() {
    dragRef.current.isDragging = false;
  }

  // Fix 1 — Full-bleed canvas; text floats over at z-10
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0A0806]"
      style={{ cursor: 'grab' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onClick={() => {
        if (videoRef.current?.paused) {
          videoRef.current.play().then(() => console.log('Manual play triggered'));
        }
      }}
    >
      {/* ── Full-bleed 3D canvas — position: absolute, inset: 0 ── */}
      <div className="absolute inset-0">
        <Starfield />
        <Canvas
          style={{ width: '100%', height: '100%' }}
          camera={{ position: [0, 0, 2.5], fov: 38 }}
          gl={{ antialias: true, alpha: true }}
        >
          <SceneContent dragRef={dragRef} videoRef={videoRef} />
        </Canvas>
        {/* Ambient glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: '600px',
            height: '200px',
            background: 'radial-gradient(ellipse, rgba(184,92,42,0.15) 0%, transparent 70%)',
            filter: 'blur(32px)',
          }}
        />
      </div>

      {/* ── Text overlay — relative z-10, pointer-events-none ── */}
      <div
        className="relative z-10 pointer-events-none flex flex-col justify-between px-8 md:px-14 py-12"
        style={{ height: '100%' }}
      >
        {/* Top: label + heading */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-xs tracking-[0.2em] uppercase text-[#B85C2A] mb-4"
          >
            What We Build
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="leading-[1.05]"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              color: '#F7F4F1',
            }}
          >
            Websites that carry<br />the weight of a brand.
          </motion.h2>
        </div>

        {/* Bottom: meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="text-white/40 text-xs font-mono mb-1">Client Work — 2025</p>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F7F4F1', fontSize: '1.1rem' }}>
              Premium real estate platform for a Philippine property brand.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {['Web Design', 'Development', 'Framer'].map((tag) => (
              <span key={tag} className="text-xs font-mono px-3 py-1 border border-white/20 text-white/50 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

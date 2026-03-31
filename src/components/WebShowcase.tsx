import { useRef, useEffect, Suspense, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useDeviceControls, type DeviceRotation } from '@/hooks/useDeviceControls';
import clientVideo from '@/assets/NPSSITE.mov';
const iphoneModel = '/models/IPHONE17.glb';

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

function IPhoneWithVideo({
  dragRef,
  isMobile,
  deviceRotRef,
}: {
  dragRef: React.RefObject<DragState>;
  isMobile: boolean;
  deviceRotRef: React.RefObject<DeviceRotation>;
}) {
  const { scene } = useGLTF(iphoneModel);
  const groupRef = useRef<THREE.Group>(null);
  const currentRotY = useRef(0.15);
  const currentRotX = useRef(-0.12);
  const textureRef = useRef<THREE.VideoTexture | null>(null);

  useEffect(() => {
    scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh || mesh.name !== 'HkNSnYzBPABcqwM001') return;

      const video = document.createElement('video');
      video.src = videoSrc;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.style.display = 'none';
      document.body.appendChild(video);

      video.addEventListener('canplaythrough', () => {
        const texture = new THREE.VideoTexture(video);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.flipY = false;
        texture.repeat.set(1, 1);
        texture.offset.set(0, 0);
        textureRef.current = texture;

        mesh.material = new THREE.MeshBasicMaterial({
          map: texture,
          toneMapped: false,
          side: THREE.FrontSide,
        });
        (mesh.material as THREE.MeshBasicMaterial).needsUpdate = true;
        video.play();
        console.log('Video texture applied to HkNSnYzBPABcqwM001');
      }, { once: true });

      video.play().catch(() => {});
    });
  }, [scene]);

  useFrame((state) => {
    if (!groupRef.current) return;

    if (isMobile) {
      // Auto-rotate base + device tilt/touch offset
      currentRotY.current += 0.003;
      groupRef.current.rotation.y = currentRotY.current + deviceRotRef.current.y;
      groupRef.current.rotation.x = -0.12 + deviceRotRef.current.x;
    } else {
      const drag = dragRef.current;
      if (Math.abs(drag.rotY - currentRotY.current) < 0.01) {
        drag.rotY += 0.003;
      }
      currentRotY.current += (drag.rotY - currentRotY.current) * 0.1;
      currentRotX.current += (drag.rotX - currentRotX.current) * 0.1;
      groupRef.current.rotation.y = currentRotY.current;
      groupRef.current.rotation.x = currentRotX.current;
    }

    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.04;
    if (textureRef.current) textureRef.current.needsUpdate = true;
  });

  return (
    <primitive
      ref={groupRef}
      object={scene}
      scale={8.5}
      position={[0, 0, 0]}
      rotation={[0, Math.PI, 0]}
    />
  );
}

function SceneContent({
  dragRef,
  isMobile,
  deviceRotRef,
}: {
  dragRef: React.RefObject<DragState>;
  isMobile: boolean;
  deviceRotRef: React.RefObject<DeviceRotation>;
}) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} castShadow />
      <pointLight position={[-3, -2, 2]} intensity={0.5} color="#B85C2A" />
      <pointLight position={[0, -4, 1]} intensity={0.3} color="#B85C2A" />
      <Suspense fallback={null}>
        <IPhoneWithVideo dragRef={dragRef} isMobile={isMobile} deviceRotRef={deviceRotRef} />
      </Suspense>
    </>
  );
}

export default function WebShowcase() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.3 });
  const dragRef = useRef<DragState>({ rotX: -0.12, rotY: 0.15, isDragging: false, lastX: 0, lastY: 0 });

  const { isMobile, needsPermission, permissionGranted, requestIOSPermission, deviceRotRef } =
    useDeviceControls();

  const [showHint, setShowHint] = useState(true);
  useEffect(() => {
    if (!isMobile) return;
    const t = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(t);
  }, [isMobile]);

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (isMobile) return;
    dragRef.current.isDragging = true;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (isMobile || !dragRef.current.isDragging) return;
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

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0A0806]"
      style={{ cursor: isMobile ? 'default' : 'grab' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* ── Full-bleed 3D canvas — position: absolute, inset: 0 ── */}
      <div className="absolute inset-0">
        <Starfield />
        <Canvas
          style={{ width: '100%', height: '100%' }}
          camera={{ position: [0, 0, 2.5], fov: 38 }}
          gl={{ antialias: true, alpha: true }}
        >
          <SceneContent dragRef={dragRef} isMobile={isMobile} deviceRotRef={deviceRotRef} />
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

      {/* ── Mobile: "tilt to explore" hint ── */}
      {isMobile && (
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none whitespace-nowrap"
            >
              <p className="text-xs font-mono tracking-widest text-white/40 uppercase flex items-center gap-2">
                <span>↕</span> tilt to explore
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* ── iOS: "Enable motion" permission pill ── */}
      {isMobile && needsPermission && !permissionGranted && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
          onClick={requestIOSPermission}
          className="absolute bottom-8 right-6 z-30"
          style={{
            background: 'rgba(184,92,42,0.15)',
            border: '1px solid rgba(184,92,42,0.4)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '999px',
            padding: '6px 14px',
            color: '#B85C2A',
            fontSize: '11px',
            fontFamily: 'DM Mono, monospace',
            letterSpacing: '0.1em',
            cursor: 'pointer',
          }}
        >
          Enable motion
        </motion.button>
      )}
    </section>
  );
}

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

function IPhoneWithVideo({ dragRef }: { dragRef: React.RefObject<DragState> }) {
  const { scene } = useGLTF(iphoneModel);
  const groupRef = useRef<THREE.Group>(null);
  const currentRotY = useRef(0.15);
  const currentRotX = useRef(-0.12);

  // Fix 2 — Log all mesh names for screen mesh identification
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        console.log('MESH:', mesh.name, '| material:', (mesh.material as THREE.Material)?.name);
      }
    });
    // TODO: apply VideoTexture to [MESH NAME] after confirmation
    // videoSrc is ready: see const videoSrc above
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
  });

  // Fix 1 — Scale 5, centered
  return (
    <primitive
      ref={groupRef}
      object={scene}
      scale={5}
      position={[0, 0, 0]}
    />
  );
}

function SceneContent({ dragRef }: { dragRef: React.RefObject<DragState> }) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} castShadow />
      <pointLight position={[-3, -2, 2]} intensity={0.5} color="#B85C2A" />
      <pointLight position={[0, -4, 1]} intensity={0.3} color="#B85C2A" />
      <Suspense fallback={null}>
        <IPhoneWithVideo dragRef={dragRef} />
      </Suspense>
    </>
  );
}

export default function WebShowcase() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.3 });
  const dragRef = useRef<DragState>({ rotX: -0.12, rotY: 0.15, isDragging: false, lastX: 0, lastY: 0 });

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    dragRef.current.isDragging = true;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
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

  return (
    <section
      ref={sectionRef}
      className="bg-[#0A0806] py-6 px-6 md:px-10 flex flex-col justify-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-xs tracking-[0.2em] uppercase text-[#B85C2A] mb-6"
        >
          What We Build
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 leading-[1.05]"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            color: '#F7F4F1',
          }}
        >
          Websites that carry<br />the weight of a brand.
        </motion.h2>

        {/* 3D Stage */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl overflow-hidden border border-white/10"
          style={{ height: 'clamp(300px, calc(100vh - 260px), 520px)', background: '#060504', cursor: 'grab' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <Starfield />

          {/* Browser chrome */}
          <div className="absolute top-0 left-0 right-0 bg-[#111]/80 backdrop-blur-sm px-4 py-2.5 flex items-center gap-2 border-b border-white/10 z-10">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            </div>
            <div className="flex-1 mx-3">
              <div className="bg-white/10 rounded px-3 py-0.5 text-xs text-white/40 font-mono max-w-[200px]">
                client-site.com
              </div>
            </div>
          </div>

          {/* R3F Canvas */}
          <div className="absolute inset-0" style={{ paddingTop: '36px' }}>
            <Canvas
              style={{ width: '100%', height: '100%' }}
              camera={{ position: [0, 0, 3.5], fov: 45 }}
              gl={{ antialias: true, alpha: true }}
            >
              <SceneContent dragRef={dragRef} />
            </Canvas>
          </div>

          {/* Ambient glow */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: '400px',
              height: '150px',
              background: 'radial-gradient(ellipse, rgba(184,92,42,0.12) 0%, transparent 70%)',
              filter: 'blur(24px)',
            }}
          />
        </motion.div>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-6 flex flex-wrap items-center justify-between gap-4"
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

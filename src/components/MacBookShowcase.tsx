import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const macbookModel = '/models/MACBOOK.glb';

function MacBookModel() {
  const { scene } = useGLTF(macbookModel);
  const groupRef = useRef<THREE.Group>(null);
  const rotY = useRef(0);

  useFrame((state) => {
    if (!groupRef.current) return;
    rotY.current += 0.003;
    groupRef.current.rotation.y = rotY.current;
    // gentle float
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.04;
  });

  return (
    <primitive
      ref={groupRef}
      object={scene}
      scale={1}
      position={[0, 0, 0]}
      rotation={[-0.18, 0, 0]}
    />
  );
}

export default function MacBookShowcase() {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      camera={{ position: [0, 0.4, 2.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} castShadow />
      <pointLight position={[-3, -2, 2]} intensity={0.5} color="#B85C2A" />
      <pointLight position={[0, -4, 1]} intensity={0.3} color="#B85C2A" />
      <Suspense fallback={null}>
        <MacBookModel />
      </Suspense>
    </Canvas>
  );
}

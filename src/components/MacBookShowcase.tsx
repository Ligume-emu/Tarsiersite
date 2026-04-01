import { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import macbookVideo from '@/assets/macbook-demo.mp4';

const macbookModel = '/models/MACBOOK.glb';

function MacBookModel() {
  const { scene } = useGLTF(macbookModel);
  const groupRef = useRef<THREE.Group>(null);
  const rotY = useRef(0);
  const textureRef = useRef<THREE.VideoTexture | null>(null);

  useEffect(() => {
    // Log all mesh names to identify the screen mesh
    scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        console.log('[MacBook mesh]', mesh.name);
      }
    });

    // Apply video texture to the screen mesh
    scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;

      const name = mesh.name.toLowerCase();
      const isScreen = name.includes('screen') || name.includes('display') || name.includes('glass') || name.includes('monitor');
      if (!isScreen) return;

      const video = document.createElement('video');
      video.src = macbookVideo;
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
      }, { once: true });

      video.play().catch(() => {});
    });
  }, [scene]);

  useFrame((state) => {
    if (!groupRef.current) return;
    rotY.current += 0.003;
    groupRef.current.rotation.y = rotY.current;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.04;
    if (textureRef.current) textureRef.current.needsUpdate = true;
  });

  return (
    <primitive
      ref={groupRef}
      object={scene}
      scale={1.2}
      position={[0, 0, 0]}
      rotation={[-0.18, 0, 0]}
    />
  );
}

export default function MacBookShowcase() {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      camera={{ position: [0, 0.2, 1.5], fov: 54 }}
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

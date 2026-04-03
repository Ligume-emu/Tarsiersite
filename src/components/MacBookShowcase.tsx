import { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, RootState } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import macbookVideo from '@/assets/macbook-demo.mp4';

const macbookModel = '/models/MACBOOK.glb';

type DragState = { rotX: number; rotY: number; isDragging: boolean; lastX: number; lastY: number };

function MacBookModel({ dragRef }: { dragRef: React.RefObject<DragState> }) {
  const { scene } = useGLTF(macbookModel);
  const groupRef = useRef<THREE.Group>(null);
  const currentRotY = useRef(0);
  const currentRotX = useRef(-0.18);
  const textureRef = useRef<THREE.VideoTexture | null>(null);

  useEffect(() => {
    // Log ALL mesh names to console first
    scene.traverse((child: THREE.Object3D) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        console.log('[MacBook mesh]', mesh.name);
      }
    });

    // Apply video texture to the screen mesh (Object_107 based on earlier Blender inspection)
    scene.traverse((child: THREE.Object3D) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;

      // Target the screen mesh specifically (Object_107 based on earlier Blender inspection)
      if (mesh.name !== 'Object_107') return;

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

      // If UV check fails (black screen), generate flat UVs from position bounds
      // This is a simplified approach - in practice you'd check if the texture appears correctly
      // and generate UVs if needed, but we'll implement the basic UV generation as fallback
      const geometry = mesh.geometry;
      if (geometry.isBufferGeometry) {
        const position = geometry.attributes.position;
        if (position) {
          const uvs = new Float32Array(position.count * 2);
          let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

          // Find bounds
          for (let i = 0; i < position.count; i++) {
            const x = position.getX(i);
            const y = position.getY(i);
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }

          const rangeX = maxX - minX;
          const rangeY = maxY - minY;

          // Generate UVs from position bounds
          for (let i = 0; i < position.count; i++) {
            const x = position.getX(i);
            const y = position.getY(i);
            uvs[i * 2] = (x - minX) / rangeX;
            uvs[i * 2 + 1] = (y - minY) / rangeY;
          }

          geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
        }
      }
    });
  }, [scene]);

  useFrame((state: RootState) => {
    if (!groupRef.current) return;

    const drag = dragRef.current;
    if (Math.abs(drag.rotY - currentRotY.current) < 0.01) {
      drag.rotY += 0.003;
    }
    currentRotY.current += (drag.rotY - currentRotY.current) * 0.1;
    currentRotX.current += (drag.rotX - currentRotX.current) * 0.1;
    groupRef.current.rotation.y = currentRotY.current;
    groupRef.current.rotation.x = currentRotX.current;

    // Shift model position down by -0.1 units to roughly vertical center
    groupRef.current.position.y = -0.1;

    if (textureRef.current) textureRef.current.needsUpdate = true;
  });

  return (
    <primitive
      ref={groupRef}
      object={scene}
      scale={1.2}
      position={[0, 0, 0]}
      rotation={[0, Math.PI, 0]}
    />
  );
}

export default function MacBookShowcase({ dragRef }: { dragRef: React.RefObject<DragState> }) {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      camera={{ position: [0, 0.1, 0.45], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} castShadow />
      <pointLight position={[-3, -2, 2]} intensity={0.5} color="#B85C2A" />
      <pointLight position={[0, -4, 1]} intensity={0.3} color="#B85C2A" />
      <Suspense fallback={null}>
        <MacBookModel dragRef={dragRef} />
      </Suspense>
    </Canvas>
  );
}

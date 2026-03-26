import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import tarsierLogoSrc from '@/assets/tarsier-logo.png';

const TARSIER_ORANGE = 0xb85c2a;
const PARTICLE_COUNT = 220;

const TarsierHero3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    mount.appendChild(renderer.domElement);

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 0, 5);

    // --- Particles ---
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities: THREE.Vector3[] = [];
    const basePositions: THREE.Vector3[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.8 + Math.random() * 2.4;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      basePositions.push(new THREE.Vector3(x, y, z));
      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.004,
          (Math.random() - 0.5) * 0.004,
          (Math.random() - 0.5) * 0.003
        )
      );
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: TARSIER_ORANGE,
      size: 0.045,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Mouse tracking ---
    const mouse = new THREE.Vector2(0, 0);
    const target = new THREE.Vector2(0, 0);

    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // --- Resize ---
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // --- Animate ---
    let frameId: number;
    let t = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      t += 0.008;

      // Mouse tilt for particles
      target.x += (mouse.x - target.x) * 0.04;
      target.y += (mouse.y - target.y) * 0.04;

      // Particle drift
      const pos = particleGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const base = basePositions[i];
        const vel = velocities[i];
        pos.array[i * 3] += vel.x;
        pos.array[i * 3 + 1] += vel.y;
        pos.array[i * 3 + 2] += vel.z;

        // Pull back toward base position
        pos.array[i * 3] += (base.x - pos.array[i * 3]) * 0.008;
        pos.array[i * 3 + 1] += (base.y - pos.array[i * 3 + 1]) * 0.008;
        pos.array[i * 3 + 2] += (base.z - pos.array[i * 3 + 2]) * 0.008;

        // Slight orbit
        const ox = pos.array[i * 3];
        const oz = pos.array[i * 3 + 2];
        pos.array[i * 3] = ox * Math.cos(0.002) - oz * Math.sin(0.002);
        pos.array[i * 3 + 2] = ox * Math.sin(0.002) + oz * Math.cos(0.002);
      }
      pos.needsUpdate = true;

      // Particle group follows cursor subtly
      particles.rotation.y = target.x * 0.12;
      particles.rotation.x = -target.y * 0.08;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full max-h-[320px] lg:max-h-none relative"
      style={{ minHeight: '420px' }}
    >
      {/* Logo image — sits above canvas, below hero text z-stack */}
      <img
        src={tarsierLogoSrc}
        alt="Tarsier"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
        style={{ zIndex: 1 }}
        draggable={false}
      />
    </div>
  );
};

export default TarsierHero3D;

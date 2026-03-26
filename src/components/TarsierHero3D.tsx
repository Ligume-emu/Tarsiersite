import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const TARSIER_ORANGE = 0xb85c2a;
const PARTICLE_COUNT = 300;

const TarsierHero3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Use the section dimensions (mount fills the section via absolute inset-0)
    const W = mount.offsetWidth || window.innerWidth;
    const H = mount.offsetHeight || window.innerHeight;

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
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.set(0, 0, 7);

    // --- Particles spread across full section ---
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities: THREE.Vector3[] = [];
    const basePositions: THREE.Vector3[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      // Bigger spread to fill the full hero
      const r = 2.8 + Math.random() * 4.0;
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
      size: 0.05,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Mouse tracking — normalized to full section/window ---
    const mouse = new THREE.Vector2(0, 0);
    const target = new THREE.Vector2(0, 0);

    const onMouseMove = (e: MouseEvent) => {
      // Normalize to [-1, 1] using full viewport/section coordinates
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    // Attach to the section element (mount's parent or window) for full coverage
    const section = mount.closest('section') || window;
    section.addEventListener('mousemove', onMouseMove as EventListener);

    // --- Resize ---
    const onResize = () => {
      const w = mount.offsetWidth || window.innerWidth;
      const h = mount.offsetHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // --- Animate ---
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Smooth mouse follow
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

      // Particles tilt with mouse
      particles.rotation.y = target.x * 0.15;
      particles.rotation.x = -target.y * 0.1;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      section.removeEventListener('mousemove', onMouseMove as EventListener);
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
      className="absolute inset-0 w-full h-full"
    />
  );
};

export default TarsierHero3D;

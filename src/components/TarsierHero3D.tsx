import { useEffect, useRef } from 'react';
import * as THREE from 'three';

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
    mount.appendChild(renderer.domElement);

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 0, 7);

    // --- Lighting ---
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const point = new THREE.PointLight(TARSIER_ORANGE, 3, 20);
    point.position.set(2, 3, 4);
    scene.add(point);
    const point2 = new THREE.PointLight(0xffd4a8, 1.5, 15);
    point2.position.set(-3, -2, 3);
    scene.add(point2);

    // --- Material ---
    const mat = new THREE.MeshStandardMaterial({
      color: TARSIER_ORANGE,
      metalness: 0.4,
      roughness: 0.3,
    });

    const group = new THREE.Group();
    scene.add(group);

    // Helper: rounded box (brace segment)
    const box = (w: number, h: number, d: number) =>
      new THREE.BoxGeometry(w, h, d, 1, 1, 1);

    // --- Build {  } braces ---
    const braceThick = 0.13;
    const braceD = 0.28;

    // Single brace shape: top bar + bottom bar + left vertical
    const makeBrace = (flip: boolean) => {
      const g = new THREE.Group();
      const sign = flip ? 1 : -1;

      // Top horizontal
      const topMesh = new THREE.Mesh(box(0.55, braceThick, braceD), mat);
      topMesh.position.set(sign * 0.2, 0.82, 0);
      g.add(topMesh);

      // Bottom horizontal
      const botMesh = new THREE.Mesh(box(0.55, braceThick, braceD), mat);
      botMesh.position.set(sign * 0.2, -0.82, 0);
      g.add(botMesh);

      // Vertical spine
      const spineMesh = new THREE.Mesh(box(braceThick, 1.52, braceD), mat);
      spineMesh.position.set(sign * 0.44, 0, 0);
      g.add(spineMesh);

      // Mid knuckle (the centre bump of a curly brace)
      const knuckleMesh = new THREE.Mesh(box(0.3, braceThick, braceD), mat);
      knuckleMesh.position.set(sign * 0.05, 0, 0);
      g.add(knuckleMesh);

      return g;
    };

    const leftBrace = makeBrace(false);
    leftBrace.position.x = -1.72;
    group.add(leftBrace);

    const rightBrace = makeBrace(true);
    rightBrace.position.x = 1.72;
    group.add(rightBrace);

    // --- Eyes (two spheres) ---
    const eyeGeo = new THREE.SphereGeometry(0.38, 32, 32);
    const eyeMat = new THREE.MeshStandardMaterial({
      color: TARSIER_ORANGE,
      metalness: 0.5,
      roughness: 0.2,
      emissive: new THREE.Color(TARSIER_ORANGE),
      emissiveIntensity: 0.15,
    });

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.62, 0.18, 0);
    group.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.62, 0.18, 0);
    group.add(rightEye);

    // --- Asterisk nose (6 thin boxes rotated) ---
    const asteriskGroup = new THREE.Group();
    asteriskGroup.position.set(0, -0.55, 0);
    const asteriskMat = new THREE.MeshStandardMaterial({
      color: TARSIER_ORANGE,
      metalness: 0.3,
      roughness: 0.4,
    });
    for (let i = 0; i < 3; i++) {
      const arm = new THREE.Mesh(box(0.36, 0.07, 0.07), asteriskMat);
      arm.rotation.z = (i * Math.PI) / 3;
      asteriskGroup.add(arm);
    }
    group.add(asteriskGroup);

    // --- TARSIER wordmark (extruded letter boxes) ---
    const wordGroup = new THREE.Group();
    wordGroup.position.set(0, -1.28, 0);

    const letterMat = new THREE.MeshStandardMaterial({
      color: TARSIER_ORANGE,
      metalness: 0.35,
      roughness: 0.35,
    });

    // Simple block letters as flat extruded boxes
    // Each letter: [x-offset, width]
    const letters = [
      { x: -2.1, w: 0.28 }, // T
      { x: -1.62, w: 0.22 }, // A
      { x: -1.18, w: 0.22 }, // R
      { x: -0.74, w: 0.22 }, // S
      { x: -0.28, w: 0.28 }, // I
      { x: 0.18, w: 0.22 },  // E
      { x: 0.62, w: 0.22 },  // R
    ];

    letters.forEach(({ x, w }) => {
      const lMesh = new THREE.Mesh(
        new THREE.BoxGeometry(w, 0.22, 0.16),
        letterMat
      );
      lMesh.position.set(x, 0, 0);
      wordGroup.add(lMesh);
    });

    // Horizontal bar for T and I (crossbars)
    const crossbar = new THREE.Mesh(
      new THREE.BoxGeometry(0.52, 0.07, 0.16),
      letterMat
    );
    crossbar.position.set(-2.1, 0.08, 0);
    wordGroup.add(crossbar);

    group.add(wordGroup);

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

      // Smooth mouse follow
      target.x += (mouse.x - target.x) * 0.06;
      target.y += (mouse.y - target.y) * 0.06;

      // Group rotation follows cursor
      group.rotation.y = target.x * 0.28;
      group.rotation.x = -target.y * 0.18;

      // Subtle idle float
      group.position.y = Math.sin(t * 0.6) * 0.06;

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

      // Particle group also follows cursor subtly
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
      className="w-full h-full max-h-[320px] lg:max-h-none"
      style={{ minHeight: '420px' }}
    />
  );
};

export default TarsierHero3D;

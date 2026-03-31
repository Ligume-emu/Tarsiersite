import { useEffect, useRef, useState } from 'react';

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

const DEG_TO_RAD = Math.PI / 180;
const CLAMP_DEG = 30;
const LERP = 0.08;

export interface DeviceRotation {
  x: number;
  y: number;
}

export function useDeviceControls() {
  const deviceRotRef = useRef<DeviceRotation>({ x: 0, y: 0 });
  const gyroTargetRef = useRef<DeviceRotation>({ x: 0, y: 0 });
  const touchRef = useRef({ active: false, x: 0, y: 0 });

  const [isMobile, setIsMobile] = useState(false);
  const [needsPermission, setNeedsPermission] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const gyroCleanup = useRef<(() => void) | null>(null);

  const attachGyro = () => {
    const handler = (e: DeviceOrientationEvent) => {
      if (touchRef.current.active) return;
      const beta = e.beta ?? 0;   // front-back tilt
      const gamma = e.gamma ?? 0; // left-right tilt
      gyroTargetRef.current.x = clamp(beta - 45, -CLAMP_DEG, CLAMP_DEG) * DEG_TO_RAD * 0.4;
      gyroTargetRef.current.y = clamp(gamma, -CLAMP_DEG, CLAMP_DEG) * DEG_TO_RAD * 0.4;
    };
    window.addEventListener('deviceorientation', handler);
    gyroCleanup.current = () => window.removeEventListener('deviceorientation', handler);
  };

  const requestIOSPermission = async () => {
    try {
      const perm = await (DeviceOrientationEvent as any).requestPermission();
      if (perm === 'granted') {
        setPermissionGranted(true);
        setNeedsPermission(false);
        attachGyro();
      }
    } catch {
      // permission denied or unavailable
    }
  };

  useEffect(() => {
    const mobile =
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      'ontouchstart' in window;

    setIsMobile(mobile);
    if (!mobile) return;

    const hasGyro = typeof DeviceOrientationEvent !== 'undefined';
    if (hasGyro) {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        setNeedsPermission(true);
      } else {
        attachGyro();
      }
    }

    let touchStartX = 0;
    let touchStartY = 0;
    let touchBaseX = 0;
    let touchBaseY = 0;

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      touchStartX = t.clientX;
      touchStartY = t.clientY;
      touchBaseX = deviceRotRef.current.x;
      touchBaseY = deviceRotRef.current.y;
      touchRef.current.active = true;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!touchRef.current.active) return;
      const t = e.touches[0];
      const maxRad = CLAMP_DEG * DEG_TO_RAD;
      touchRef.current.x = clamp(touchBaseX + (t.clientY - touchStartY) * 0.005, -maxRad, maxRad);
      touchRef.current.y = clamp(touchBaseY + (t.clientX - touchStartX) * 0.005, -maxRad, maxRad);
    };

    const onTouchEnd = () => {
      touchRef.current.active = false;
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // RAF loop: lerp deviceRotRef toward current target
    let rafId: number;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const target = touchRef.current.active ? touchRef.current : gyroTargetRef.current;
      deviceRotRef.current.x += (target.x - deviceRotRef.current.x) * LERP;
      deviceRotRef.current.y += (target.y - deviceRotRef.current.y) * LERP;
    };
    tick();

    return () => {
      gyroCleanup.current?.();
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return {
    isMobile,
    needsPermission,
    permissionGranted,
    requestIOSPermission,
    deviceRotRef,
  };
}

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import tarsierLogo from "@/assets/tarsier-logo.png";
import TarsierHero3D from "@/components/TarsierHero3D";
import { useDeviceControlsContext } from "@/contexts/DeviceControlsContext";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  // Shared smoothed tilt state passed into TarsierHero3D
  const tiltRef = useRef({ x: 0, y: 0 });

  // Gyro from shared context (already initialised once in App)
  const { isMobile, deviceRotRef } = useDeviceControlsContext();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const rect = section.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const tick = () => {
      rafId = requestAnimationFrame(tick);

      if (isMobile) {
        // Map gyro output (radians, max ~0.21) to tiltRef range (-1..1)
        // deviceRotRef.y = left-right → tiltRef.x; .x = front-back → tiltRef.y
        const scale = 4.8;
        tiltRef.current.x = deviceRotRef.current.y * scale;
        tiltRef.current.y = deviceRotRef.current.x * scale;
        if (logoRef.current) {
          logoRef.current.style.transform = `translate(${tiltRef.current.x * 12}px, ${tiltRef.current.y * 8}px)`;
        }
      } else {
        currentX += (targetX - currentX) * 0.06;
        currentY += (targetY - currentY) * 0.06;
        tiltRef.current.x = currentX;
        tiltRef.current.y = currentY;
        if (logoRef.current) {
          logoRef.current.style.transform = `translate(${currentX * 18}px, ${currentY * 12}px)`;
        }
      }
    };

    section.addEventListener('mousemove', onMouseMove);
    tick();

    return () => {
      section.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]); // re-run once isMobile resolves

  return (
    <section
      ref={sectionRef}
      data-section="hero"
      className="relative bg-bg-warm flex flex-col lg:justify-center overflow-hidden"
    >
      {/* Subtle warm radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,hsl(22_68%_45%_/_0.07),transparent)]" />

      {/* Three.js particles — full section background */}
      <TarsierHero3D tiltRef={tiltRef} />

      {/*
        Mobile: full-height flex column — text 45%, visual 55%
        Desktop: max-width centered block with grid
      */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 lg:px-12 lg:pt-20 lg:pb-8 h-full lg:h-auto flex flex-col lg:block">
        <div className="flex flex-col h-full lg:grid lg:grid-cols-2 lg:gap-6 lg:items-center lg:h-auto">

          {/* Text block — 45% on mobile */}
          <div className="flex-[45] min-h-0 flex flex-col justify-start pt-14 lg:flex-none lg:block lg:pt-0">
            <motion.div
              className="flex items-center gap-2 mb-4 lg:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src={tarsierLogo} alt="Tarsier" className="w-7 h-7 lg:w-8 lg:h-8 object-contain" />
              <span className="font-mono text-[10px] lg:text-[11px] uppercase tracking-[0.14em] text-tarsier">
                Tarsier Global Technologies
              </span>
            </motion.div>

            <motion.h1
              className="font-display text-[34px] sm:text-[44px] md:text-[56px] lg:text-[76px] font-bold text-text-primary leading-[1.0] mb-4 lg:mb-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              The Eyes<br />
              <em className="not-italic text-tarsier">Behind</em><br />
              Your Business.
            </motion.h1>

            <motion.p
              className="font-body text-[14px] lg:text-[18px] text-text-secondary max-w-[440px] leading-relaxed mb-5 lg:mb-10"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              Filipino-built. Globally trusted. No subscriptions. No disappearing acts.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-tarsier text-primary-foreground font-body text-[15px] font-medium hover:bg-[#9A4A20] transition-colors shadow-[0_4px_24px_hsl(22_68%_45%_/_0.3)] min-h-[44px]"
              >
                Get a Free Audit →
              </a>
            </motion.div>
          </div>

          {/* Visual block — 55% on mobile */}
          <motion.div
            className="flex-[55] min-h-0 flex items-center justify-center w-full pb-8 lg:flex-none lg:h-[420px] lg:pb-0"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              ref={logoRef}
              src={tarsierLogo}
              alt="Tarsier"
              className="w-full h-full object-contain pointer-events-none select-none max-h-[260px] lg:max-h-none"
              style={{ transition: 'transform 0.15s ease-out', willChange: 'transform' }}
              draggable={false}
            />
          </motion.div>

        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-4 lg:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="font-mono text-[10px] text-text-secondary tracking-wider uppercase">Scroll</span>
        <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
          <path d="M6 0v14M1 9l5 5 5-5" stroke="hsl(var(--text-secondary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;

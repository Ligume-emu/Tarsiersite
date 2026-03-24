import { Suspense } from "react";
// @ts-ignore
import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";
import tarsierLogo from "@/assets/tarsier-logo.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-bg-warm flex flex-col justify-center overflow-hidden">
      {/* Subtle warm radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,hsl(22_68%_45%_/_0.07),transparent)]" />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-32 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left — Text */}
          <div>
            <motion.div
              className="flex items-center gap-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src={tarsierLogo} alt="Tarsier" className="w-8 h-8 object-contain" />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-tarsier">
                Tarsier Global Technologies
              </span>
            </motion.div>

            <motion.h1
              className="font-display text-[56px] sm:text-[68px] lg:text-[76px] font-bold text-text-primary leading-[1.0] mb-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              The Eyes<br />
              <em className="not-italic text-tarsier">Behind</em><br />
              Your Business.
            </motion.h1>

            <motion.p
              className="font-body text-[18px] text-text-secondary max-w-[440px] leading-relaxed mb-10"
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
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-tarsier text-primary-foreground font-body text-[15px] font-medium hover:bg-[#9A4A20] transition-colors shadow-[0_4px_24px_hsl(22_68%_45%_/_0.3)]"
              >
                Get a Free Audit →
              </a>
            </motion.div>
          </div>

          {/* Right — Spline 3D Scene */}
          <motion.div
            className="flex items-center justify-center w-full h-[600px] md:h-[700px]"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="font-mono text-[11px] text-tarsier animate-pulse tracking-widest uppercase">
                  Loading...
                </div>
              </div>
            }>
              <div className="w-full h-[600px] md:h-[700px]">
                <Spline
                  scene="https://prod.spline.design/arZuDQHq9mAZoKo6/scene.splinecode"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </Suspense>
          </motion.div>

        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="font-mono text-[10px] text-text-secondary tracking-wider uppercase">Scroll</span>
        <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
          <path d="M6 0v14M1 9l5 5 5-5" stroke="hsl(var(--text-secondary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;

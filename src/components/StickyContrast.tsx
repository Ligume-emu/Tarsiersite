import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import tarsierMascot from '@/assets/tarsier-mascot.png';

const statements = [
  {
    label: 'Most agencies',
    them: 'Disappear after launch. Hand over files. Move to the next client.',
    us: 'We stay. Every client gets post-launch support, monthly optimization, and a team that actually answers.',
    usLabel: 'Tarsier',
  },
  {
    label: 'Most agencies',
    them: 'Resell white-label tools and call it a custom system.',
    us: 'Everything is coded, designed, and deployed in-house. If we built it, we can change it — instantly.',
    usLabel: 'Tarsier',
  },
  {
    label: 'Most agencies',
    them: 'Pitch AI as a buzzword. Bolt it on after the fact.',
    us: 'Every system we build is AI-native from day one. Not an add-on. The foundation.',
    usLabel: 'Tarsier',
  },
];

const StickyContrast = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const statement1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.33, 0.5], [1, 1, 0, 0]);
  const statement2Opacity = useTransform(scrollYProgress, [0.3, 0.45, 0.6, 0.75], [0, 1, 1, 0]);
  const statement3Opacity = useTransform(scrollYProgress, [0.65, 0.8, 1, 1], [0, 1, 1, 1]);

  const opacities = [statement1Opacity, statement2Opacity, statement3Opacity];

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: '300vh', backgroundColor: 'hsl(var(--bg-dark))' }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — scrolling statements */}
          <div className="relative h-[320px] sm:h-[280px]">
            {statements.map((s, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 flex flex-col justify-center"
                style={{ opacity: opacities[i] }}
              >
                {/* Them */}
                <div className="mb-8">
                  <span className="font-mono text-[10px] text-text-on-dark/30 uppercase tracking-[0.16em] mb-3 block">
                    {s.label}
                  </span>
                  <p className="font-body text-[17px] text-text-on-dark/40 leading-relaxed line-through decoration-tarsier/40">
                    {s.them}
                  </p>
                </div>

                {/* Us */}
                <div>
                  <span className="font-mono text-[10px] text-tarsier uppercase tracking-[0.16em] mb-3 block">
                    {s.usLabel}
                  </span>
                  <p className="font-display text-[28px] lg:text-[36px] font-semibold text-text-on-dark leading-tight">
                    {s.us}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right — pinned visual */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-[360px] h-[360px] flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-tarsier/5 blur-3xl" />
              <img
                src={tarsierMascot}
                alt="Tarsier"
                className="w-[280px] h-auto object-contain opacity-20 hover:opacity-30 transition-opacity duration-700"
              />
              {/* Progress dots */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
                {statements.map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-tarsier"
                    style={{ opacity: opacities[i] }}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StickyContrast;

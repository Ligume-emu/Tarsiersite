import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import tarsierMascot from "@/assets/tarsier-mascot.png";
import FadeUp from "@/components/FadeUp";

const steps = [
  { num: "01", title: "Diagnose", desc: "We audit your current setup and map every gap.", icon: "🔍" },
  { num: "02", title: "Design", desc: "We architect your full digital infrastructure before writing a single line of code.", icon: "✏️" },
  { num: "03", title: "Deploy & Stay", desc: "We build, launch, and remain your long-term systems partner.", icon: "🚀" },
];

const HowWeWork = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start end', 'end start'],
  });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.7], ['0%', '100%']);

  return (
    <section className="py-20 lg:py-28 bg-bg-warm relative overflow-hidden">
      <img src={tarsierMascot} alt="" className="absolute right-[-80px] top-1/2 -translate-y-1/2 w-[400px] lg:w-[500px] opacity-[0.04] pointer-events-none" />
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <FadeUp className="text-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-tarsier font-mono text-[11px] uppercase tracking-wider text-tarsier">Our Process</span>
        </FadeUp>
        <FadeUp delay={0.05} className="text-center mb-4">
          <h2 className="font-display text-[40px] lg:text-[52px] font-semibold text-text-primary">We don't just build. We think with you.</h2>
        </FadeUp>
        <FadeUp delay={0.1} className="text-center mb-16">
          <p className="font-body text-[17px] text-text-secondary max-w-[560px] mx-auto leading-relaxed">
            Every project follows a battle-tested three-phase methodology designed to eliminate guesswork and maximize results.
          </p>
        </FadeUp>
        <div className="relative">
          <div ref={lineRef} className="hidden lg:block absolute top-[72px] left-[15%] right-[15%] h-[2px] bg-tarsier/10 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-tarsier/0 via-tarsier/60 to-tarsier/0"
              style={{ width: lineWidth }}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, i) => (
              <FadeUp key={i} delay={i * 0.15}>
                <div className="group relative flex flex-col items-center text-center">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 rounded-2xl bg-bg-dark border border-tarsier/20 flex items-center justify-center shadow-[0_8px_32px_rgba(28,20,16,0.12)] group-hover:shadow-[0_12px_40px_rgba(184,92,42,0.2)] transition-all duration-300 group-hover:-translate-y-1">
                      <span className="text-3xl">{step.icon}</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-tarsier flex items-center justify-center">
                      <span className="font-mono text-[11px] text-primary-foreground font-bold">{step.num}</span>
                    </div>
                  </div>
                  <div className="bg-bg-warm border border-sand rounded-2xl p-6 w-full group-hover:border-tarsier/30 transition-colors">
                    <h3 className="font-display text-2xl font-semibold text-text-primary mb-3">{step.title}</h3>
                    <p className="font-body text-[15px] text-text-secondary leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;

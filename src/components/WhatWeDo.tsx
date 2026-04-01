import { Link } from 'react-router-dom';
import FadeUp from '@/components/FadeUp';

const pillars = [
  {
    number: '01',
    name: 'Vision',
    line: 'Custom systems, applications, and digital infrastructure built from the ground up.',
    accent: 'We build what you need — not what\'s off the shelf.',
  },
  {
    number: '02',
    name: 'Automation',
    line: 'The machines that bring you customers while you sleep.',
    accent: 'CRMs, funnels, ads, and content — all running without you.',
  },
  {
    number: '03',
    name: 'Growth',
    line: 'The partner that stays long after most agencies leave.',
    accent: 'Maintenance, audits, training. We don\'t hand over files and disappear.',
  },
];

const WhatWeDo = () => {
  return (
    <section id="services" className="py-8 lg:py-10 bg-[#0A0806] flex flex-col justify-center">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">

        <FadeUp className="mb-6 lg:mb-8">
          <span className="font-mono text-[11px] text-tarsier uppercase tracking-[0.14em] mb-3 block">
            What We Do
          </span>
          <h2 className="font-display text-[40px] lg:text-[52px] font-bold text-text-on-dark leading-[1.0]">
            Three practices.<br />
            <em className="not-italic text-tarsier">Infinite scope.</em>
          </h2>
        </FadeUp>

        <div className="flex flex-col divide-y divide-white/10">
          {pillars.map((p, i) => (
            <FadeUp key={i} delay={i * 0.12}>
              <div className="group py-4 lg:py-5 grid grid-cols-1 lg:grid-cols-[80px_1fr_auto] gap-4 lg:gap-10 items-start cursor-default">

                {/* Number */}
                <span className="font-mono text-[12px] text-tarsier tracking-widest pt-1">
                  {p.number}
                </span>

                {/* Content */}
                <div>
                  <h3 className="font-display text-[28px] lg:text-[36px] font-bold text-text-on-dark leading-tight mb-2 group-hover:text-tarsier transition-colors duration-300">
                    {p.name}
                  </h3>
                  <p className="font-body text-[14px] text-text-on-dark/60 leading-relaxed max-w-[520px]">
                    {p.line}
                  </p>
                  <p className="font-mono text-[11px] text-tarsier/70 mt-2 tracking-wide">
                    {p.accent}
                  </p>
                </div>

                {/* Arrow — visible on hover */}
                <div className="hidden lg:flex items-center pt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0">
                  <span className="font-mono text-[13px] text-tarsier">→</span>
                </div>

              </div>
            </FadeUp>
          ))}
        </div>

        {/* Curiosity gap CTA */}
        <FadeUp delay={0.4} className="mt-6 flex justify-end">
          <Link
            to="/services"
            className="inline-flex items-center gap-3 font-mono text-[13px] text-text-on-dark/50 hover:text-tarsier transition-colors group"
          >
            See the full scope of work
            <span className="w-8 h-px bg-text-on-dark/40 group-hover:bg-tarsier group-hover:w-12 transition-all duration-300" />
          </Link>
        </FadeUp>

      </div>
    </section>
  );
};

export default WhatWeDo;

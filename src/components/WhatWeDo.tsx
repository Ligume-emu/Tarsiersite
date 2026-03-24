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
    <section id="services" className="py-28 lg:py-36 bg-bg-warm">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">

        <FadeUp className="mb-20">
          <span className="font-mono text-[11px] text-tarsier uppercase tracking-[0.14em] mb-5 block">
            What We Do
          </span>
          <h2 className="font-display text-[52px] lg:text-[72px] font-bold text-text-primary leading-[1.0]">
            Three practices.<br />
            <em className="not-italic text-tarsier">Infinite scope.</em>
          </h2>
        </FadeUp>

        <div className="flex flex-col divide-y divide-sand">
          {pillars.map((p, i) => (
            <FadeUp key={i} delay={i * 0.12}>
              <div className="group py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-[120px_1fr_auto] gap-6 lg:gap-12 items-start cursor-default">

                {/* Number */}
                <span className="font-mono text-[13px] text-tarsier tracking-widest pt-2">
                  {p.number}
                </span>

                {/* Content */}
                <div>
                  <h3 className="font-display text-[40px] lg:text-[56px] font-bold text-text-primary leading-tight mb-3 group-hover:text-tarsier transition-colors duration-300">
                    {p.name}
                  </h3>
                  <p className="font-body text-[16px] text-text-secondary leading-relaxed max-w-[520px]">
                    {p.line}
                  </p>
                  <p className="font-mono text-[12px] text-tarsier/70 mt-3 tracking-wide">
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
        <FadeUp delay={0.4} className="mt-16 flex justify-end">
          <Link
            to="/services"
            className="inline-flex items-center gap-3 font-mono text-[13px] text-text-secondary hover:text-tarsier transition-colors group"
          >
            See the full scope of work
            <span className="w-8 h-px bg-text-secondary group-hover:bg-tarsier group-hover:w-12 transition-all duration-300" />
          </Link>
        </FadeUp>

      </div>
    </section>
  );
};

export default WhatWeDo;

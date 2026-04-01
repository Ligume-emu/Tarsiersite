import { useState } from "react";
import FadeUp from "@/components/FadeUp";

const faqs = [
  { q: "How long does a typical project take?", a: "It depends on scope, but most web applications launch within 4–8 weeks. POS systems and simpler tools can be ready in 2–3 weeks. We'll give you a clear timeline before we start." },
  { q: "What happens after launch?", a: "We don't disappear. Every client gets post-launch support, and most choose our monthly retainer packages for ongoing maintenance, optimization, and growth." },
  { q: "Can you work with our existing systems?", a: "Yes. We specialize in API integrations and can connect with virtually any platform your business currently uses — CRMs, payment gateways, ERPs, you name it." },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className="relative py-8 lg:py-10 bg-[#0A0806] flex flex-col justify-center overflow-hidden">
      {/* Gradient fade at top */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

      <div className="max-w-[800px] mx-auto px-6 w-full">
        <FadeUp className="text-center mb-6">
          <span className="font-mono text-[11px] text-tarsier uppercase tracking-[0.12em] mb-4 block">FAQ</span>
          <h2 className="font-display text-[40px] lg:text-[52px] font-semibold text-text-on-dark leading-tight">Got Questions?</h2>
        </FadeUp>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <div className="rounded-2xl border border-white/10 overflow-hidden hover:border-tarsier/40 transition-colors">
                <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
                  <span className="font-display text-[18px] lg:text-[20px] font-semibold text-text-on-dark pr-4">{faq.q}</span>
                  <span className={`text-tarsier text-2xl flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: openIndex === i ? "200px" : "0px" }}>
                  <p className="px-6 pb-6 font-body text-[15px] text-text-on-dark/60 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Typographic statement */}
        <FadeUp delay={0.3}>
          <div className="mt-14 text-center">
            <p className="font-display text-[28px] lg:text-[42px] font-semibold text-text-on-dark leading-tight">
              Built in the Philippines.<br />
              <span className="text-tarsier">Trusted everywhere.</span>
            </p>
          </div>
        </FadeUp>
      </div>

      {/* Gradient fade into footer */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-[#0D0D0D] pointer-events-none" />
    </section>
  );
};

export default FAQSection;

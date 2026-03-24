import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const testimonials = [
  { text: "Before Tarsier, we were running everything on group chats and spreadsheets. Now our entire operation runs on one dashboard. I can see everything from my phone.", name: "J. Santos", role: "Restaurant Owner", align: "left" as const },
  { text: "They didn't just build our website. They rebuilt how we think about our business. Our leads tripled in 60 days.", name: "M. Reyes", role: "Real Estate Broker", align: "right" as const },
  { text: "What shocked me was that they stayed. Most agencies hand over the files and disappear. Tarsier is still with us, a year later.", name: "A. Cruz", role: "E-Commerce Founder", align: "left" as const },
];

const TestimonialCard = ({ t, i }: { t: typeof testimonials[0]; i: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });

  return (
    <div ref={ref} className={`flex ${t.align === "right" ? "justify-end" : "justify-start"}`}>
      <motion.div
        className="max-w-[520px]"
        initial={{ opacity: 0, x: t.align === 'right' ? 40 : -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="bg-bg-warm p-6 shadow-[0_2px_12px_rgba(28,20,16,0.08)]" style={{ borderRadius: t.align === "left" ? "20px 20px 20px 4px" : "20px 20px 4px 20px" }}>
          <p className="font-body text-[15px] text-text-primary leading-relaxed">"{t.text}"</p>
        </div>
        <div className={`flex items-center gap-3 mt-3 ${t.align === "right" ? "justify-end" : ""}`}>
          <div className="w-8 h-8 rounded-full bg-tarsier flex items-center justify-center">
            <span className="font-mono text-[11px] text-primary-foreground">{t.name[0]}{t.name.split(" ")[1]?.[0]}</span>
          </div>
          <div>
            <span className="font-mono text-[11px] text-text-primary">{t.name}</span>
            <span className="font-mono text-[11px] text-text-secondary ml-2">{t.role}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "hsl(var(--sand) / 0.25)" }}>
      <div className="max-w-[800px] mx-auto px-6 flex flex-col gap-8">
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} t={t} i={i} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

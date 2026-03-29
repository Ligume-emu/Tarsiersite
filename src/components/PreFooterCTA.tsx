import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function PreFooterCTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const line2Y = useTransform(scrollYProgress, [0.3, 1], [0, 40]);
  const line2Opacity = useTransform(scrollYProgress, [0.3, 0.6, 1], [0, 1, 0.3]);

  return (
    <section
      ref={ref}
      className="bg-[#F7F4F1] py-14 px-6 md:px-16 flex flex-col justify-center"
    >
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-xs tracking-[0.2em] uppercase text-[#B85C2A] mb-8"
        >
          Start a project
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: 'Cormorant Garamond, serif', lineHeight: '0.95' }}
          className="text-[clamp(3rem,10vw,9rem)] font-semibold text-[#141210] leading-none"
        >
          Let's build
        </motion.h2>

        <motion.h2
          style={{
            y: line2Y,
            opacity: line2Opacity,
            fontFamily: 'Cormorant Garamond, serif',
            lineHeight: '0.95',
          }}
          className="text-[clamp(3rem,10vw,9rem)] font-semibold text-[#141210]/30 leading-none mt-2"
        >
          something together.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 mb-0"
        >
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-tarsier text-primary-foreground font-body text-[15px] font-medium hover:bg-[#9A4A20] transition-colors shadow-[0_4px_24px_hsl(22_68%_45%_/_0.3)] min-h-[44px]"
          >
            Start a Conversation →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

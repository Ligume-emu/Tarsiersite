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
      className="bg-[#F7F4F1] pt-32 pb-0 px-6 md:px-16 overflow-hidden"
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
      </div>
    </section>
  );
}

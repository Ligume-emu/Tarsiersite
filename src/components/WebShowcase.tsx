import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function WebShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section
      ref={ref}
      className="bg-[#141210] py-24 px-6 md:px-16 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl mx-auto"
      >
        {/* Section label */}
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#B85C2A] mb-6">
          What We Build
        </p>

        {/* Heading */}
        <h2
          className="font-display text-4xl md:text-6xl text-[#F7F4F1] mb-16 leading-[1.1]"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Websites that carry<br />the weight of a brand.
        </h2>

        {/* Browser mockup */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl overflow-hidden border border-white/10 shadow-2xl"
        >
          {/* Browser chrome */}
          <div className="bg-[#1E1B18] px-4 py-3 flex items-center gap-2 border-b border-white/10">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-white/10 rounded-md px-3 py-1 text-xs text-white/40 font-mono max-w-xs">
                client-site.com
              </div>
            </div>
          </div>

          {/* Site preview area */}
          <div className="bg-[#0E0C0A] aspect-[16/9] flex flex-col items-center justify-center relative overflow-hidden">
            {/* Skeleton lines */}
            <div className="absolute inset-0 flex flex-col gap-4 p-12 opacity-20">
              <div className="h-8 w-1/3 bg-white/30 rounded" />
              <div className="h-4 w-2/3 bg-white/20 rounded" />
              <div className="h-4 w-1/2 bg-white/20 rounded" />
              <div className="mt-6 h-10 w-36 bg-[#B85C2A]/60 rounded" />
            </div>
            {/* Center label */}
            <div className="relative z-10 text-center">
              <p className="text-white/30 font-mono text-xs tracking-widest uppercase mb-2">Client Work</p>
              <p className="text-white/60 text-sm">Preview coming soon</p>
            </div>
          </div>
        </motion.div>

        {/* Site meta */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-between gap-4"
        >
          <div>
            <p className="text-white/40 text-xs font-mono mb-1">Client Work — 2025</p>
            <p className="text-[#F7F4F1] text-lg" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Bespoke digital presence for a Philippine premium brand.
            </p>
          </div>
          <div className="flex gap-2">
            {['Brand Identity', 'Web Design', 'Framer'].map((tag) => (
              <span key={tag} className="text-xs font-mono px-3 py-1 border border-white/20 text-white/50 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import MacBookShowcase from '@/components/MacBookShowcase';

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

const INTERVAL_MS = 4000;

const StickyContrast = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.3 });
  const dragRef = useRef({ rotX: -0.18, rotY: 0, isDragging: false, lastX: 0, lastY: 0 });

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    dragRef.current.isDragging = true;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }
  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragRef.current.isDragging) return;
    const dx = e.clientX - dragRef.current.lastX;
    const dy = e.clientY - dragRef.current.lastY;
    dragRef.current.rotY += dx * 0.008;
    dragRef.current.rotX += dy * 0.008;
    dragRef.current.rotX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, dragRef.current.rotX));
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
  }
  function handlePointerUp() {
    dragRef.current.isDragging = false;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % statements.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor: '#F8F7F4' }}
    >
      {/* Left half — text content */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 px-8 sm:px-12 w-[320px]">
        {/* AnimatePresence statement cycling */}
        <div className="relative h-[320px] mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="absolute inset-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Them */}
              <div className="mb-7">
                <span className="font-mono text-[10px] text-neutral-900/30 uppercase tracking-[0.16em] mb-3 block">
                  {statements[activeIndex].label}
                </span>
                <p className="font-body text-[16px] text-neutral-900/40 leading-relaxed line-through decoration-tarsier/40">
                  {statements[activeIndex].them}
                </p>
              </div>

              {/* Us */}
              <div>
                <span className="font-mono text-[10px] text-tarsier uppercase tracking-[0.16em] mb-3 block">
                  {statements[activeIndex].usLabel}
                </span>
                <p className="font-display text-[26px] lg:text-[32px] font-semibold text-neutral-900 leading-tight">
                  {statements[activeIndex].us}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="flex gap-3 mt-8">
          {statements.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Statement ${i + 1}`}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: 'hsl(var(--tarsier))',
                opacity: i === activeIndex ? 1 : 0.25,
                transform: i === activeIndex ? 'scale(1.3)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Right half — MacBook 3D (slam dunk from right) */}
      <div className="absolute left-2/5 top-0 w-3/5 h-full">
        <motion.div
          className="hidden lg:flex items-center justify-center w-full h-full"
          initial={{ x: '120%' }}
          animate={{ x: inView ? '0%' : '120%' }}
          transition={{ type: 'spring', stiffness: 60, damping: 18 }}
          style={{ cursor: 'grab' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <MacBookShowcase dragRef={dragRef} />
        </motion.div>
      </div>
    </section>
  );
};

export default StickyContrast;

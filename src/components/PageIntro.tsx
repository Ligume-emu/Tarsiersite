import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import tarsierLogo from '@/assets/tarsier-logo.png';

const PageIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [visible, setVisible] = useState(true);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setTextVisible(true), 300);
    const t2 = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 900);
    }, 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ backgroundColor: 'hsl(20 15% 8%)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <AnimatePresence>
            {textVisible && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-6"
              >
                <img
                  src={tarsierLogo}
                  alt="Tarsier Global Technologies"
                  style={{ width: '80px', height: 'auto' }}
                />

                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-[13px] tracking-[0.3em] uppercase"
                  style={{ color: 'hsl(22 68% 45% / 0.6)' }}
                >
                  Tarsier Global Technologies
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageIntro;

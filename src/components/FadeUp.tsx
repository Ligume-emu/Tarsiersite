import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  distance?: number;
}

const FadeUp = ({ children, delay = 0, className = '', distance = 32 }: FadeUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: distance }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeUp;

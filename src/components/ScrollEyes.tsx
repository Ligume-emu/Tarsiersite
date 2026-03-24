import { useEffect, useState } from "react";

const ScrollEyes = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const p = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setProgress(Math.min(Math.max(p, 0), 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const eye1Fill = Math.min(progress * 2, 1);
  const eye2Fill = Math.max((progress - 0.5) * 2, 0);
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-2">
      <svg width="14" height="14" viewBox="0 0 14 14">
        <circle cx="7" cy="7" r="6" fill="none" stroke="hsl(var(--tarsier))" strokeWidth="1.5" />
        <circle cx="7" cy="7" r="6" fill="hsl(var(--tarsier))" opacity={eye1Fill} />
      </svg>
      <div className="w-px h-6 bg-tarsier/30" />
      <svg width="14" height="14" viewBox="0 0 14 14">
        <circle cx="7" cy="7" r="6" fill="none" stroke="hsl(var(--tarsier))" strokeWidth="1.5" />
        <circle cx="7" cy="7" r="6" fill="hsl(var(--tarsier))" opacity={eye2Fill} />
      </svg>
    </div>
  );
};

export default ScrollEyes;

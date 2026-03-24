import { useEffect, useRef } from "react";

const stats = [
  { value: 24, label: "AI Systems Running for Clients", suffix: "/7", special: true },
  { value: 20, label: "Business Systems Built & Deployed", suffix: "+" },
  { value: 100, label: "Ownership of Everything We Build for You", suffix: "%" },
];

const StatsBand = () => {
  const bandRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const el = bandRef.current;
    if (!el) return;
    let started = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        started = true;
        countersRef.current.forEach((counter, i) => {
          if (!counter) return;
          const stat = stats[i];
          if (stat.special) { counter.textContent = "24/7"; return; }
          const end = stat.value;
          const duration = 1800;
          const startTime = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = String(Math.round(eased * end)) + (stat.suffix || "");
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        });
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={bandRef} className="bg-bg-dark py-16 lg:py-20">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`flex flex-col items-center text-center py-6 ${i < stats.length - 1 ? "sm:border-r sm:border-tarsier/30" : ""}`}
          >
            <span ref={(el) => { countersRef.current[i] = el; }} className="font-mono text-[48px] text-tarsier">
              0
            </span>
            <span className="font-body text-[13px] text-text-on-dark/70 mt-2 max-w-[200px]">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBand;

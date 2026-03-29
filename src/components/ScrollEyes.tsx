import { useEffect, useState } from "react";

const ScrollEyes = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sectionCount, setSectionCount] = useState(0);

  useEffect(() => {
    const container = document.querySelector('.snap-container') as HTMLElement | null;
    if (!container) return;

    const sections = Array.from(
      container.querySelectorAll(':scope > section, :scope > footer')
    ) as HTMLElement[];

    setSectionCount(sections.length);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sections.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { root: container, threshold: 0.5 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  if (sectionCount === 0) return null;

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-1.5">
      {Array.from({ length: sectionCount }).map((_, i) => (
        <div
          key={i}
          className="rounded-full bg-tarsier transition-all duration-300 ease-out"
          style={{
            width: '6px',
            height: i === activeIndex ? '20px' : '6px',
            opacity: i === activeIndex ? 1 : 0.28,
          }}
        />
      ))}
    </div>
  );
};

export default ScrollEyes;

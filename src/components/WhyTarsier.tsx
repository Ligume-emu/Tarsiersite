import manilaSkyline from "@/assets/manila-skyline.png";
import FadeUp from "@/components/FadeUp";

const reasons = [
  { num: "01", title: "We're Builders, Not Resellers", desc: "Every system is coded, designed, and deployed in-house. No white-label shortcuts. No outsourced agencies pretending to be technical.", icon: "⚒️" },
  { num: "02", title: "Filipino Roots, Global Standards", desc: "We understand the local market but build to international quality. Our clients span Manila to Dubai to Toronto.", icon: "🌏" },
  { num: "03", title: "We Stay After Launch", desc: "Most agencies disappear. We maintain, optimize, and grow your systems month after month. That's the Tarsier difference.", icon: "🤝" },
  { num: "04", title: "AI-First Thinking", desc: "Every system we build is designed to leverage AI from day one — not bolt it on later. Your business runs smarter from the start.", icon: "🧠" },
];

const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = ((y - centerY) / centerY) * -6;
  const rotateY = ((x - centerX) / centerX) * 6;
  card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
};

const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
};

const WhyTarsier = () => {
  return (
    <section className="py-20 lg:py-28 bg-bg-warm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-tarsier/[0.03] blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 relative z-10">
        <FadeUp className="text-center mb-16">
          <span className="font-mono text-[11px] text-tarsier uppercase tracking-[0.12em] mb-4 block">Why Choose Us</span>
          <h2 className="font-display text-[44px] lg:text-[60px] font-semibold text-text-primary leading-tight">Not Your Average Agency.</h2>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {reasons.map((r, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div
                className="group relative rounded-2xl border border-sand bg-bg-warm p-8 lg:p-10 hover:border-tarsier/40 hover:shadow-[0_12px_40px_rgba(184,92,42,0.08)] transition-colors duration-300"
                style={{ transition: 'transform 0.15s ease, box-shadow 0.3s ease, border-color 0.3s ease' }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-xl bg-tarsier/10 flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-tarsier/20 transition-colors">{r.icon}</div>
                  <div>
                    <span className="font-mono text-[11px] text-tarsier tracking-wider">{r.num}</span>
                    <h3 className="font-display text-[24px] lg:text-[28px] font-semibold text-text-primary mt-1 mb-3 leading-tight">{r.title}</h3>
                    <p className="font-body text-[15px] text-text-secondary leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
        <FadeUp>
          <div className="flex justify-center">
            <img src={manilaSkyline} alt="Manila Skyline" className="w-full max-w-[900px] opacity-15 hover:opacity-25 transition-opacity duration-500" />
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default WhyTarsier;

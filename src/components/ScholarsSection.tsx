import { useScrollReveal } from "@/hooks/useScrollReveal";
import scholarsLogo from "@/assets/tarsier-scholars-logo.png";

const receives = [
  "Free access to a structured coding course",
  "Entry into the Tarsier Tech Community group",
  "Direct mentorship from our founders",
  "Certificate of completion",
  "First access to Tarsier job openings",
];

const howTo = [
  "Follow Tarsier on all platforms",
  "Share our scholarship announcement post",
  'Answer: "Why do you want to learn to code?"',
  "Wait for the batch announcement",
];

const ScholarsSection = () => {
  const ref = useScrollReveal();
  return (
    <section id="scholars" className="py-20 lg:py-28 dot-grid-bg bg-bg-warm relative">
      <div className="hidden lg:block absolute left-4 top-32 z-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-tarsier whitespace-nowrap" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          04 — COMMUNITY
        </span>
      </div>
      <div ref={ref} className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="scroll-reveal flex justify-center mb-8">
          <img src={scholarsLogo} alt="Tarsier Tech Scholars" className="w-40 h-auto lg:w-56 object-contain" />
        </div>
        <div className="scroll-reveal flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-tarsier font-mono text-[11px] uppercase tracking-wider text-tarsier">
            Community Program · Tarsier Tech Scholars
          </span>
        </div>
        <h2 className="scroll-reveal font-display text-[40px] lg:text-[52px] font-semibold text-text-primary text-center mb-4 leading-tight">
          We Don't Just Build Businesses.<br />We Build People.
        </h2>
        <p className="scroll-reveal font-body text-[17px] text-text-secondary text-center max-w-[640px] mx-auto mb-16 leading-relaxed">
          Every batch, we open free coding course applications for aspiring Filipino developers and digital creators. Because the best investment we can make is in our community.
        </p>
        <div className="scroll-reveal grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          <div>
            <h3 className="font-display text-2xl font-semibold text-text-primary mb-6">What Scholars Receive</h3>
            <ul className="space-y-4">
              {receives.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-tarsier mt-0.5">✦</span>
                  <span className="font-body text-[15px] text-text-primary leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-2xl font-semibold text-text-primary mb-6">How to Apply</h3>
            <ol className="space-y-4">
              {howTo.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-mono text-[13px] text-tarsier mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-body text-[15px] text-text-primary leading-relaxed">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="scroll-reveal text-center">
          <a href="#contact" className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-tarsier text-primary-foreground font-body text-[16px] font-medium hover:bg-[#9A4A20] transition-colors">
            Apply for the Next Batch →
          </a>
          <p className="font-mono text-[11px] italic text-text-secondary mt-4">
            Applications open for 5 days per batch only. Follow us so you never miss one.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ScholarsSection;

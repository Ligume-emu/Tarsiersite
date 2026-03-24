import { useScrollReveal } from "@/hooks/useScrollReveal";
import posDemoGif from "@/assets/pos-demo.gif";

interface ServiceTile {
  name: string;
  desc: string;
  size: "standard" | "wide" | "tall" | "hero";
  icon: string;
  gif?: string;
}

interface PillarSectionProps {
  number: string;
  pillar: string;
  tagline: string;
  headline: string;
  subheadline: string;
  tiles: ServiceTile[];
  bandStyle: "dark" | "tarsier" | "sand";
}

const sizeClasses: Record<string, string> = {
  standard: "col-span-1 row-span-1",
  wide: "col-span-1 md:col-span-2 row-span-1",
  tall: "col-span-1 row-span-2",
  hero: "col-span-1 md:col-span-2 row-span-2",
};

const bandStyles = {
  dark: { bg: "bg-bg-dark", left: "text-tarsier", right: "text-text-on-dark" },
  tarsier: { bg: "bg-tarsier", left: "text-primary-foreground", right: "text-primary-foreground" },
  sand: { bg: "bg-sand", left: "text-text-primary", right: "text-text-secondary" },
};

const PillarSection = ({ number, pillar, tagline, headline, subheadline, tiles, bandStyle }: PillarSectionProps) => {
  const sectionRef = useScrollReveal();
  const band = bandStyles[bandStyle];

  return (
    <section id="services" className="relative">
      <div className="hidden lg:block absolute left-4 top-32 z-10">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.12em] text-tarsier whitespace-nowrap"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {number} — {pillar}
        </span>
      </div>

      <div className={`${band.bg} h-16 flex items-center px-6 lg:px-12`}>
        <span className={`font-mono text-[15px] tracking-[0.08em] font-medium ${band.left}`}>{pillar}</span>
        <span className={`font-body text-[14px] ${band.right} ml-auto hidden sm:block`}>{tagline}</span>
      </div>

      <div ref={sectionRef} className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <h2 className="scroll-reveal font-display text-[44px] lg:text-[60px] font-semibold leading-tight text-text-primary mb-5">
          {headline}
        </h2>
        <p className="scroll-reveal font-body text-[18px] text-text-secondary max-w-[620px] mb-14 leading-relaxed">
          {subheadline}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[240px] lg:auto-rows-[260px]">
          {tiles.map((tile, i) => (
            <div
              key={i}
              className={`scroll-reveal group relative rounded-2xl overflow-hidden cursor-pointer ${sizeClasses[tile.size]} hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_16px_48px_rgba(184,92,42,0.15)]`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="absolute inset-0 bg-bg-dark">
                {tile.gif && (
                  <img
                    src={tile.gif}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-tarsier/60 via-tarsier/20 to-transparent transition-opacity duration-300 group-hover:from-tarsier/30 group-hover:via-transparent" />
              <div className="absolute top-6 left-6 text-3xl opacity-60 group-hover:opacity-100 transition-opacity">
                {tile.icon}
              </div>
              <span className="absolute top-5 right-5 font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full border border-primary-foreground/30 text-primary-foreground/80">
                {pillar}
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-6 transition-transform duration-300 group-hover:-translate-y-3">
                <h3 className="font-display text-[22px] lg:text-[26px] font-bold text-primary-foreground leading-tight">{tile.name}</h3>
                <p className="font-body text-[14px] text-text-on-dark/0 group-hover:text-text-on-dark/90 transition-all duration-300 mt-2 leading-relaxed max-w-[400px]">
                  {tile.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const visionTiles: ServiceTile[] = [
  { name: "Custom Web Application Development", desc: "Fully bespoke web systems built around how your business actually works.", size: "wide", icon: "🌐", gif: "https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif" },
  { name: "Mobile App Development", desc: "iOS and Android apps your customers will actually use.", size: "standard", icon: "📱" },
  { name: "Point of Sale (POS) System", desc: "Built for Philippine retail. Cloud-synced, offline-ready, multi-cashier.", size: "standard", icon: "💳", gif: posDemoGif },
  { name: "E-Commerce & Online Store", desc: "Sell anywhere. Ship everywhere. Own the experience.", size: "tall", icon: "🛒" },
  { name: "Real Estate Property Portal", desc: "Listings, agents, inquiries — one intelligent platform.", size: "standard", icon: "🏠" },
  { name: "Booking & Reservation System", desc: "From restaurants to clinics — let customers book themselves.", size: "standard", icon: "📅" },
  { name: "Admin Dashboards & Internal Tools", desc: "Real-time visibility into every corner of your operation.", size: "wide", icon: "📊" },
  { name: "API Development & Integrations", desc: "Connect every tool your business already uses.", size: "standard", icon: "🔗" },
];

const automationTiles: ServiceTile[] = [
  { name: "CRM System Setup & Automation", desc: "Capture every lead. Nurture every customer. Close more deals on autopilot.", size: "wide", icon: "🤖" },
  { name: "Sales Funnel Design & Build", desc: "A system that turns strangers into paying customers, step by step.", size: "standard", icon: "🎯" },
  { name: "Landing Page Development", desc: "High-converting pages that don't just look good — they perform.", size: "standard", icon: "🚀" },
  { name: "Email & SMS Marketing Automation", desc: "The right message, to the right person, at exactly the right time.", size: "tall", icon: "✉️" },
  { name: "Lead Generation Systems", desc: "A steady pipeline of qualified prospects — without cold calling.", size: "standard", icon: "🧲" },
  { name: "Social Media Management", desc: "20 pieces of content per day. Every platform. Consistent. Strategic.", size: "standard", icon: "📣" },
  { name: "Paid Ads Setup & Management", desc: "Every peso of your ad budget working harder than it ever has.", size: "wide", icon: "💰" },
];

const growthTiles: ServiceTile[] = [
  { name: "Website & App Maintenance", desc: "Always updated. Always secure. Always yours.", size: "standard", icon: "🛡️" },
  { name: "Monthly Retainer Packages", desc: "Predictable support, no surprises, real outcomes every month.", size: "standard", icon: "📋" },
  { name: "Business Systems Consulting", desc: "We map out exactly what your business needs and build you a roadmap.", size: "wide", icon: "🗺️" },
  { name: "Tech Stack Audits", desc: "Find the gaps. Fix the leaks. Optimize everything.", size: "standard", icon: "🔍" },
  { name: "Staff Training on Systems", desc: "Your team, fully equipped to use every system we build.", size: "standard", icon: "🎓" },
];

const ServicesSection = () => (
  <>
    <PillarSection
      number="01" pillar="VISION" tagline="We engineer the systems your business runs on."
      headline="Built from the ground up. For you."
      subheadline="Custom technology isn't a luxury. It's the difference between a business that grows and one that just survives."
      tiles={visionTiles} bandStyle="dark"
    />
    <PillarSection
      number="02" pillar="AUTOMATION" tagline="We build the machines that bring you customers."
      headline="Your business should work while you sleep."
      subheadline="Every missed follow-up is a lost customer. Every manual task is wasted time. We automate both — so you can focus on growing."
      tiles={automationTiles} bandStyle="tarsier"
    />
    <PillarSection
      number="03" pillar="GROWTH" tagline="We stay long after most agencies leave."
      headline="The partner that grows with you."
      subheadline="We don't disappear after launch. We audit, optimize, train your team, and evolve your systems as your business scales."
      tiles={growthTiles} bandStyle="sand"
    />
  </>
);

export default ServicesSection;

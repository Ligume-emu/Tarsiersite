import FadeUp from "@/components/FadeUp";

const roles = [
  { title: "SEO & Content Marketing Specialist", type: "Contractor (Retainer-based)", traits: ["Can show documented ranking improvements", "Knows technical SEO (site speed, schema, Core Web Vitals)", "Uses Ahrefs, Semrush, or equivalent"] },
  { title: "Operations & Project Manager", type: "Full-time Employee", traits: ["Has managed multiple client projects simultaneously", "Can build an SOP from a 15-minute conversation", "Proficient in Notion, ClickUp, or Asana at admin level"] },
  { title: "Marketing Automation Builder", type: "Contractor (Project-based + Retainer)", traits: ["Can show at least 3 live automation flows built", "Understands webhooks, API keys, and JSON", "Worked with GoHighLevel, ActiveCampaign, or HubSpot"] },
  { title: "Inside Sales & Client Acquisition Specialist", type: "Full-time Employee", traits: ["Has closed B2B service contracts before", "Can run a discovery call and write a proposal same day", "Understands CRM and automation basics"] },
  { title: "Finance & Admin Officer", type: "Full-time Employee", traits: ["Background in accounting or finance", "Familiar with Philippine BIR compliance", "Proficient in QuickBooks, Xero, or Wave"] },
  { title: "Technical Support & Systems Administrator", type: "Contractor (Retainer-based)", traits: ["Experience supporting live CRM or SaaS environments", "Can triage and communicate issues to non-technical clients", "Available for urgent response within 2 hours"] },
];

const CareersSection = () => {
  return (
    <section id="work-with-us" className="py-20 lg:py-28 bg-bg-warm relative">
      <div className="hidden lg:block absolute left-4 top-32 z-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-tarsier whitespace-nowrap" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          05 — JOIN US
        </span>
      </div>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <FadeUp className="text-center mb-4">
          <h2 className="font-display text-[40px] lg:text-[52px] font-semibold text-text-primary">
            We're building the future. Want in?
          </h2>
        </FadeUp>
        <FadeUp delay={0.1} className="text-center mb-16">
          <p className="font-body text-[17px] text-text-secondary max-w-[640px] mx-auto leading-relaxed">
            These are future roles as Tarsier scales. Submit your interest now — be first in line when we're ready.
          </p>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {roles.map((role, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <div className="group relative rounded-2xl border border-sand bg-bg-warm p-6 flex flex-col overflow-hidden hover:shadow-[0_8px_32px_rgba(184,92,42,0.1)] transition-shadow">
                <div className="absolute top-0 left-0 h-[2px] w-0 bg-tarsier group-hover:w-full transition-all duration-500 ease-out" />
                <h3 className="font-display text-2xl font-semibold text-text-primary mb-1">{role.title}</h3>
                <span className="font-mono text-[11px] text-tarsier uppercase tracking-wider mb-5">{role.type}</span>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {role.traits.map((trait, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="text-tarsier text-xs mt-1">·</span>
                      <span className="font-body text-[14px] text-text-secondary leading-relaxed">{trait}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="inline-flex items-center justify-center gap-1 px-5 py-2.5 rounded-full border border-tarsier text-tarsier font-body text-[13px] font-medium hover:bg-tarsier hover:text-primary-foreground transition-colors">
                  Express Interest →
                </a>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareersSection;

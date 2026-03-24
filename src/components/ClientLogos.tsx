const ClientLogos = () => {
  const industries = ["Real Estate", "Restaurants", "E-Commerce", "Healthcare", "Retail", "Education", "Logistics", "Professional Services"];
  return (
    <section className="py-16 lg:py-20 bg-bg-warm border-y border-sand/60">
      <div className="max-w-[1280px] mx-auto px-6 text-center">
        <span className="font-mono text-[11px] text-text-secondary uppercase tracking-[0.12em] mb-8 block">Trusted across industries</span>
        <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
          {industries.map((industry, i) => (
            <div key={i} className="px-6 py-3 rounded-full border border-sand bg-bg-warm font-body text-[14px] text-text-secondary hover:border-tarsier/40 hover:text-tarsier transition-colors">
              {industry}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;

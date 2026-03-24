import TarsierNav from '@/components/TarsierNav';
import ServicesSection from '@/components/ServicesSection';
import MarqueeStrip from '@/components/MarqueeStrip';
import TarsierFooter from '@/components/TarsierFooter';

const ServicesPage = () => (
  <div className="min-h-screen bg-bg-warm">
    <TarsierNav />
    <div className="pt-[72px]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20">
        <span className="font-mono text-[11px] text-tarsier uppercase tracking-[0.12em] mb-4 block">What We Build</span>
        <h1 className="font-display text-[56px] lg:text-[72px] font-bold text-text-primary leading-tight mb-6">
          Every system,<br />built for you.
        </h1>
        <p className="font-body text-[17px] text-text-secondary max-w-[560px] leading-relaxed mb-16">
          Three practice areas. Every system coded, designed, and deployed in-house.
        </p>
      </div>
      <MarqueeStrip />
      <ServicesSection />
    </div>
    <TarsierFooter />
  </div>
);

export default ServicesPage;

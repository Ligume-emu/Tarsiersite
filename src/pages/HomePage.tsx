import HeroSection from '@/components/HeroSection';
import WhatWeDo from '@/components/WhatWeDo';
import StickyContrast from '@/components/StickyContrast';
import WebShowcase from '@/components/WebShowcase';
import Testimonials from '@/components/Testimonials';
import FAQSection from '@/components/FAQSection';
import PreFooterCTA from '@/components/PreFooterCTA';
import TarsierFooter from '@/components/TarsierFooter';
import TarsierNav from '@/components/TarsierNav';
import ScrollEyes from '@/components/ScrollEyes';

const HomePage = () => (
  <div className="min-h-screen bg-bg-warm">
    <TarsierNav />
    <ScrollEyes />
    <HeroSection />
    <WhatWeDo />
    <StickyContrast />
    <WebShowcase />
    <Testimonials />
    <FAQSection />
    <PreFooterCTA />
    <TarsierFooter />
  </div>
);

export default HomePage;

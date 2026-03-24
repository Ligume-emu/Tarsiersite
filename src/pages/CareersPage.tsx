import TarsierNav from '@/components/TarsierNav';
import CareersSection from '@/components/CareersSection';
import TarsierFooter from '@/components/TarsierFooter';

const CareersPage = () => (
  <div className="min-h-screen bg-bg-warm">
    <TarsierNav />
    <div className="pt-[72px]">
      <CareersSection />
    </div>
    <TarsierFooter />
  </div>
);

export default CareersPage;

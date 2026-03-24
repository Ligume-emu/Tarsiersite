import TarsierNav from '@/components/TarsierNav';
import ScholarsSection from '@/components/ScholarsSection';
import TarsierFooter from '@/components/TarsierFooter';

const ScholarsPage = () => (
  <div className="min-h-screen bg-bg-warm">
    <TarsierNav />
    <div className="pt-[72px]">
      <ScholarsSection />
    </div>
    <TarsierFooter />
  </div>
);

export default ScholarsPage;

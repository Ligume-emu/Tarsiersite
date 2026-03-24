import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { initSmoothScroll } from '@/lib/smooth-scroll';
import PageIntro from '@/components/PageIntro';
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import ScholarsPage from '@/pages/ScholarsPage';
import CareersPage from '@/pages/CareersPage';

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    if (isHome) {
      document.body.style.overflow = 'hidden';
    } else {
      setIntroComplete(true);
      initSmoothScroll();
    }
  }, [isHome]);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    document.body.style.overflow = '';
    initSmoothScroll();
  };

  return (
    <>
      {isHome && <PageIntro onComplete={handleIntroComplete} />}
      <div
        style={{
          opacity: introComplete ? 1 : 0,
          transition: 'opacity 0.6s ease',
          pointerEvents: introComplete ? 'auto' : 'none',
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/scholars" element={<ScholarsPage />} />
          <Route path="/careers" element={<CareersPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

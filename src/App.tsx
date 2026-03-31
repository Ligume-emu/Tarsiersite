import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { initSmoothScroll } from '@/lib/smooth-scroll';
import PageIntro from '@/components/PageIntro';
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import ScholarsPage from '@/pages/ScholarsPage';
import CareersPage from '@/pages/CareersPage';
import { DeviceControlsProvider, useDeviceControlsContext } from '@/contexts/DeviceControlsContext';

function AppContent() {
  const [introComplete, setIntroComplete] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const { isMobile, needsPermission, permissionGranted, requestIOSPermission } =
    useDeviceControlsContext();

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
    if (!isHome) initSmoothScroll();
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

      {/* ── Global iOS "Enable motion" pill — fixed, z-50, mobile only ── */}
      {isMobile && needsPermission && !permissionGranted && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4, delay: 1 }}
          onClick={requestIOSPermission}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '20px',
            zIndex: 50,
            background: 'rgba(184,92,42,0.15)',
            border: '1px solid rgba(184,92,42,0.4)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '999px',
            padding: '7px 16px',
            color: '#B85C2A',
            fontSize: '11px',
            fontFamily: 'DM Mono, monospace',
            letterSpacing: '0.1em',
            cursor: 'pointer',
          }}
        >
          Enable motion
        </motion.button>
      )}
    </>
  );
}

export default function App() {
  return (
    <DeviceControlsProvider>
      <AppContent />
    </DeviceControlsProvider>
  );
}

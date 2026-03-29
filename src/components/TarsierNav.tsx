import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import tarsierLogo from "@/assets/tarsier-logo.png";

const TarsierNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const container = document.querySelector('.snap-container') as HTMLElement | null;
    const target: HTMLElement | Window = container ?? window;
    const getScrollTop = () => (container ? container.scrollTop : window.scrollY);
    const onScroll = () => setScrolled(getScrollTop() > 60);
    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: '/services', label: 'Services' },
    { href: '/#contact', label: 'Contact' },
  ];

  const pillBg = scrolled
    ? 'rgba(20,16,14,0.7)'
    : hovered
    ? 'rgba(255,255,255,0.10)'
    : 'rgba(255,255,255,0.06)';

  const pillBorder = scrolled
    ? 'rgba(180,102,68,0.2)'
    : hovered
    ? 'rgba(255,255,255,0.2)'
    : 'rgba(255,255,255,0.12)';

  const pillBlur = scrolled ? 'blur(60px) saturate(180%)' : 'blur(40px) saturate(180%)';

  return (
    <>
      {/* Floating pill nav */}
      <motion.nav
        className="fixed z-50"
        style={{ top: '20px', left: '50%', x: '-50%' }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="relative flex items-center gap-5"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            padding: '10px 20px',
            borderRadius: '9999px',
            background: pillBg,
            border: `1px solid ${pillBorder}`,
            backdropFilter: pillBlur,
            WebkitBackdropFilter: pillBlur,
            boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
            transition: 'background 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.5s cubic-bezier(0.16,1,0.3,1), backdrop-filter 0.5s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Glass sheen — top-left highlight */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)',
            }}
          />

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 relative z-10 shrink-0">
            <img src={tarsierLogo} alt="Tarsier" className="w-5 h-5 object-contain opacity-90" />
            <span
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: '#f8f7f4',
                fontSize: '15px',
                lineHeight: 1,
              }}
            >
              TARSIER
            </span>
          </a>

          {/* Nav links */}
          <div className="hidden lg:flex items-center gap-5 relative z-10">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'rgba(248,247,244,0.6)',
                  transition: 'color 0.2s ease',
                  lineHeight: 1,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#f8f7f4')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(248,247,244,0.6)')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            href="/#contact"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="hidden sm:inline-flex items-center relative z-10 shrink-0"
            style={{
              background: '#b46644',
              color: '#f8f7f4',
              borderRadius: '9999px',
              padding: '8px 18px',
              fontFamily: 'DM Mono, monospace',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}
          >
            Free Audit
          </motion.a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-[5px] p-1 relative z-10 ml-1"
            aria-label="Menu"
          >
            <span className={`block w-[18px] h-[1.5px] bg-[#f8f7f4] transition-transform duration-200 ${mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-[18px] h-[1.5px] bg-[#f8f7f4] transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-[18px] h-[1.5px] bg-[#f8f7f4] transition-transform duration-200 ${mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </motion.div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-[#141210]/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '40px', fontWeight: 600, color: '#f8f7f4' }}
              className="hover:text-[#b46644] transition-colors min-h-[44px] flex items-center"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={() => setMobileOpen(false)}
            style={{
              background: '#b46644',
              color: '#f8f7f4',
              borderRadius: '9999px',
              padding: '12px 32px',
              fontFamily: 'DM Mono, monospace',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
            }}
            className="mt-4 min-h-[44px] flex items-center"
          >
            Free Audit
          </a>
        </div>
      )}
    </>
  );
};

export default TarsierNav;

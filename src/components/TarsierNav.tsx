import { useEffect, useState } from "react";
import tarsierLogo from "@/assets/tarsier-logo.png";

const TarsierNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: '/services', label: 'Services', desc: 'Vision, Automation & Growth', external: false },
    { href: '/#contact', label: 'Contact', desc: 'Start a conversation', external: false },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-bg-warm shadow-[0_1px_12px_rgba(28,20,16,0.06)]" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-[72px] flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5">
          <img src={tarsierLogo} alt="Tarsier" className="w-10 h-10 object-contain" />
          <span className="font-display text-xl font-bold text-tarsier tracking-wide">TARSIER</span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((link, i) => (
            <div key={link.href} className="relative group">
              <a
                href={link.href}
                className="font-body text-sm text-text-secondary hover:text-tarsier transition-colors"
                style={{
                  opacity: scrolled ? 1 : 0,
                  transform: scrolled ? "translateX(0)" : "translateX(-12px)",
                  transition: `all 0.3s ease ${i * 0.05}s`,
                }}
              >
                {link.label}
              </a>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 rounded-md bg-bg-dark text-text-on-dark font-mono text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {link.desc}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/#contact"
            className="hidden sm:inline-flex items-center gap-1 px-5 py-2.5 rounded-full bg-tarsier text-primary-foreground font-body text-[13px] font-medium hover:bg-[#9A4A20] transition-colors"
          >
            Get a Free Audit →
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span className={`block w-5 h-[2px] bg-text-primary transition-transform ${mobileOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`block w-5 h-[2px] bg-text-primary transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[2px] bg-text-primary transition-transform ${mobileOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[72px] bg-bg-warm z-40 flex flex-col items-center justify-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-display text-4xl font-semibold text-text-primary hover:text-tarsier transition-colors min-h-[44px] flex items-center"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 px-8 py-3 rounded-full bg-tarsier text-primary-foreground font-body text-base min-h-[44px]"
          >
            Get a Free Audit →
          </a>
        </div>
      )}
    </nav>
  );
};

export default TarsierNav;

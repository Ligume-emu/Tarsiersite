import FadeUp from '@/components/FadeUp';
import posDemoGif from '@/assets/cursorful-video-1773413007416.gif';

const POSSpotlight = () => (
  <section className="py-28 lg:py-36 bg-bg-dark overflow-hidden">
    <div className="max-w-[1280px] mx-auto px-6 lg:px-12">

      <FadeUp>
        <span className="font-mono text-[11px] text-tarsier uppercase tracking-[0.14em] mb-5 block">
          Signature Product
        </span>
        <h2 className="font-display text-[48px] lg:text-[68px] font-bold text-text-on-dark leading-tight mb-6">
          TarsierPOS.<br />
          <em className="not-italic text-tarsier">Built for the Philippines.</em>
        </h2>
        <p className="font-body text-[17px] text-text-on-dark/60 max-w-[500px] leading-relaxed mb-16">
          Offline-first. No subscription. No cloud dependency. One-time ownership for Philippine cafes and restaurants that can't afford downtime.
        </p>
      </FadeUp>

      {/* GIF showcase */}
      <FadeUp delay={0.2}>
        <div className="relative rounded-2xl overflow-hidden border border-tarsier/20 shadow-[0_32px_80px_rgba(0,0,0,0.4)]">
          <img
            src={posDemoGif}
            alt="TarsierPOS Demo"
            className="w-full h-auto object-cover rounded-xl"
            loading="lazy"
            style={{ minHeight: '280px', maxHeight: '520px' }}
          />
          {/* Gradient overlay — bottom */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-dark to-transparent" />
        </div>
      </FadeUp>

      {/* Three proof points */}
      <FadeUp delay={0.35}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-tarsier/10 rounded-2xl overflow-hidden mt-12">
          {[
            { stat: 'Offline-first', desc: 'Works without internet. Always.' },
            { stat: 'One-time fee', desc: 'No monthly subscriptions. Ever.' },
            { stat: 'On-premise', desc: 'Your data stays on your machine.' },
          ].map((item, i) => (
            <div key={i} className="bg-bg-dark px-8 py-10">
              <div className="font-display text-[32px] font-bold text-tarsier mb-2">{item.stat}</div>
              <div className="font-body text-[14px] text-text-on-dark/50">{item.desc}</div>
            </div>
          ))}
        </div>
      </FadeUp>

      <FadeUp delay={0.5}>
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <a
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-tarsier text-primary-foreground font-body text-[15px] font-medium hover:bg-[#9A4A20] transition-colors shadow-[0_4px_24px_hsl(22_68%_45%_/_0.3)] min-h-[44px]"
          >
            Get TarsierPOS →
          </a>
        </div>
      </FadeUp>

    </div>
  </section>
);

export default POSSpotlight;

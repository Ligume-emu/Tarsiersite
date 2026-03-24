const rows = [
  {
    bg: "bg-bg-dark",
    text: "text-text-on-dark",
    content: "✦ VISION · Custom Web Apps · POS Systems · Mobile Development · E-Commerce Stores · Real Estate Portals · Booking Systems · Admin Dashboards · API Integrations · ",
    speed: "35s",
    direction: "normal",
  },
  {
    bg: "bg-tarsier",
    text: "text-primary-foreground",
    content: "✦ AUTOMATION · Landing Pages · CRM Systems · Sales Funnels · Email Automation · SMS Sequences · Lead Generation · Social Media Management · Paid Ads Setup · ",
    speed: "28s",
    direction: "reverse",
  },
  {
    bg: "bg-sand",
    text: "text-text-primary",
    content: "✦ GROWTH · Monthly Retainers · Tech Consulting · System Audits · Maintenance & Support · Staff Training · Business Systems Review · ",
    speed: "42s",
    direction: "normal",
  },
];

const MarqueeStrip = () => (
  <div className="w-full">
    {rows.map((row, i) => (
      <div key={i} className={`${row.bg} h-12 flex items-center overflow-hidden`}>
        <div
          className="marquee-track"
          style={{
            animation: `${row.direction === "reverse" ? "marquee-reverse" : "marquee"} ${row.speed} linear infinite`,
          }}
        >
          {[0, 1].map((j) => (
            <span key={j} className={`${row.text} font-mono text-[13px] tracking-[0.06em] whitespace-nowrap px-2`}>
              {row.content}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default MarqueeStrip;

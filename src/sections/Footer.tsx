export default function Footer() {
  const scrollTo = (target: string) => {
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const links = [
    { label: 'About', target: '#about' },
    { label: 'Ventures', target: '#ventures' },
    { label: 'What We Build', target: '#what-we-build' },
    { label: 'Philosophy', target: '#philosophy' },
    { label: 'Founder', target: '#founder' },
    { label: 'Contact', target: '#contact' },
  ];

  return (
    <footer className="bg-[#0F2440] text-white">
      <div className="content-max py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-semibold mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Nueve Technologies</h3>
            <p className="text-sm text-white/60 mb-4">Ideas . People . Technology . Service</p>
            <p className="text-sm text-white/50 leading-relaxed">Building technology that removes unnecessary work and gives people more time to live.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#D4A853] mb-4">Navigation</h4>
            <div className="flex flex-col gap-2">
              {links.map((l) => (
                <button key={l.label} onClick={() => scrollTo(l.target)} className="text-left text-sm text-white/60 hover:text-white transition-colors">{l.label}</button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#D4A853] mb-4">Contact</h4>
            <p className="text-sm text-white/60 mb-1">Nueve Technologies LLC</p>
            <a href="mailto:info@nuevetech.io" className="text-sm text-white/60 hover:text-[#D4A853] transition-colors">info@nuevetech.io</a>
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-white/30">SquadPay is a venture of Nueve Technologies LLC</p>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">&copy; 2026 Nueve Technologies LLC. All rights reserved.</p>
          <p className="text-xs text-white/40">Technology. People. Service.</p>
        </div>
      </div>
    </footer>
  );
}

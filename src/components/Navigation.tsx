import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

const navLinks = [
  { label: 'About', target: '#about' },
  { label: 'Ventures', target: '#ventures' },
  { label: 'What We Build', target: '#what-we-build' },
  { label: 'Philosophy', target: '#philosophy' },
  { label: 'Founder', target: '#founder' },
  { label: 'Contact', target: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (target: string) => {
    setMobileOpen(false);
    if (target.startsWith('#')) {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const bg = scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bg}`}>
        <div className="content-max h-16 md:h-20 flex items-center justify-between">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2">
            <span className="text-[#1A3A5C] font-bold text-lg tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Nueve</span>
            <span className="hidden sm:inline text-xs text-[#64748B] font-medium tracking-wide">TECHNOLOGIES</span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button key={link.label} onClick={() => scrollTo(link.target)} className="text-sm font-medium text-[#1C1917]/80 hover:text-[#1A3A5C] transition-colors">
                {link.label}
              </button>
            ))}
            <a href="#squadpay" onClick={(e) => { e.preventDefault(); scrollTo('#squadpay'); }} className="text-sm font-semibold text-[#7B3FF2] hover:text-[#9B5FFF] transition-colors">
              SquadPay
            </a>
            {user?.role === 'admin' && (
              <a href="/admin" className="text-sm font-medium text-[#D4A853] hover:text-[#B8923F] transition-colors">Admin</a>
            )}
          </div>

          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-[#1C1917] transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-[#1C1917] transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-[#1C1917] transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 lg:hidden">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <button key={link.label} onClick={() => scrollTo(link.target)} className="text-left text-2xl font-semibold text-[#1C1917]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {link.label}
              </button>
            ))}
            <button onClick={() => scrollTo('#squadpay')} className="text-left text-2xl font-semibold text-[#7B3FF2]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              SquadPay
            </button>
            {user?.role === 'admin' && (
              <a href="/admin" className="text-lg font-medium text-[#D4A853]">Admin Dashboard</a>
            )}
          </div>
        </div>
      )}
    </>
  );
}

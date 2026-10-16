import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  'Scan a merchant QR code, split instantly',
  'Invite participants — everyone pays their share',
  'No one person fronts the bill',
  'Merchants receive combined payment directly',
];

export default function SquadPaySection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll('.sp-reveal');
    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 70%' } });
    tl.fromTo(items, { y: 25, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power2.out' });
    return () => { tl.kill(); };
  }, []);

  return (
    <section id="squadpay" ref={ref} className="bg-white section-padding">
      <div className="content-max">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="sp-reveal flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#7B3FF2]" />
              <span className="eyebrow text-[#7B3FF2]">First Venture</span>
            </div>
            <h2 className="sp-reveal text-[#1C1917] mb-2" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', lineHeight: 1.2 }}>SquadPay LLC</h2>
            <p className="sp-reveal text-[#64748B] italic text-lg mb-6">Collaborative payments made simple.</p>
            <p className="sp-reveal text-[#64748B] leading-relaxed mb-6">
              SquadPay is a collaborative payment platform that transforms how groups share expenses. From restaurant payments and group outings to recurring household contributions and future merchant experiences, SquadPay simplifies the way people coordinate money together.
            </p>
            <p className="sp-reveal text-[#1C1917] font-semibold text-xl mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '0.03em' }}>
              Scan. Split. Settle.
            </p>
            <ul className="sp-reveal space-y-3 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-[#1C1917]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 flex-shrink-0">
                    <circle cx="8" cy="8" r="8" fill="#7B3FF2" />
                    <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <a href="#" className="sp-reveal inline-block px-8 py-3 rounded-md text-white font-semibold text-sm transition-all hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #7B3FF2, #9B5FFF)' }}>
              Discover SquadPay &rarr;
            </a>
          </div>
          <div className="sp-reveal flex justify-center">
            <div className="relative" style={{ width: 260, height: 500 }}>
              <div className="absolute hidden sm:block" style={{ left: '-15%', top: '8%', transform: 'rotate(-6deg) scale(0.9)', zIndex: 2, opacity: 0.85 }}>
                <div className="overflow-hidden rounded-[28px] border-[10px] border-[#1C1917] shadow-xl" style={{ width: 220, height: 440 }}>
                  <img src="/images/squadpay_2.png" alt="SquadPay" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="absolute" style={{ left: '50%', top: '0', transform: 'translateX(-50%)', zIndex: 3 }}>
                <div className="overflow-hidden rounded-[28px] border-[10px] border-[#1C1917] shadow-xl" style={{ width: 220, height: 440 }}>
                  <img src="/images/squadpay_1.png" alt="SquadPay" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="absolute hidden sm:block" style={{ right: '-12%', top: '12%', transform: 'rotate(5deg) scale(0.9)', zIndex: 1, opacity: 0.85 }}>
                <div className="overflow-hidden rounded-[28px] border-[10px] border-[#1C1917] shadow-xl" style={{ width: 220, height: 440 }}>
                  <img src="/images/squadpay_3.png" alt="SquadPay" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

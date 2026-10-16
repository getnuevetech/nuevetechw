import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(el.querySelectorAll('.hero-reveal'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out' });
    return () => { tl.kill(); };
  }, []);

  const scrollTo = (id: string) => { const el = document.querySelector(id); if (el) el.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <section id="hero" ref={ref} className="relative min-h-[100dvh] flex items-center overflow-hidden bg-white">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-[#1A3A5C] blur-[128px]" />
        <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-[#D4A853] blur-[96px]" />
      </div>
      <div className="content-max relative z-10 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="hero-reveal flex items-center gap-3 mb-8">
              <span className="w-8 h-[2px] bg-[#D4A853]" />
              <span className="eyebrow">Nueve Technologies LLC</span>
            </div>
            <h1 className="hero-reveal text-[#1A3A5C] mb-6" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              We build technology that works, so people can live.
            </h1>
            <p className="hero-reveal text-[#64748B] text-lg leading-relaxed mb-4 max-w-lg">
              A technology venture company focused on identifying everyday challenges, redesigning inefficient processes, and building scalable digital businesses.
            </p>
            <p className="hero-reveal text-[#1A3A5C] font-medium text-lg mb-10">
              People should let technology work so they can live.
            </p>
            <div className="hero-reveal flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollTo('#ventures')} className="btn-primary">Explore Our Ventures</button>
              <button onClick={() => scrollTo('#contact')} className="btn-outline">Partner With Us</button>
            </div>
          </div>
          <div className="hero-reveal relative">
            <img src="/images/hero-tech.jpg" alt="Technology visualization" className="w-full rounded-lg shadow-2xl object-cover" style={{ aspectRatio: '16/10' }} />
            <div className="absolute -bottom-4 -left-4 bg-[#1A3A5C] text-white px-6 py-4 rounded-lg shadow-lg">
              <p className="text-xs uppercase tracking-wider text-[#D4A853] mb-1">Our First Venture</p>
              <p className="text-lg font-semibold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>SquadPay LLC</p>
            </div>
          </div>
        </div>
        <div className="hero-reveal mt-20 pt-8 border-t border-[#E2E8F0]">
          <p className="text-center text-sm text-[#94A3B8] uppercase tracking-[0.2em] font-medium">Ideas . People . Technology . Service</p>
        </div>
      </div>
    </section>
  );
}

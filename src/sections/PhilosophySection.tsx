import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  { title: 'Technology', body: 'We use technology to create practical, scalable, and dependable solutions — not complexity for its own sake.' },
  { title: 'People', body: 'Every product begins with a real human problem. We design around the people experiencing it.' },
  { title: 'Service', body: 'Technology becomes valuable when it improves someone\'s life, work, business, or community.' },
];

export default function PhilosophySection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll('.phil-reveal');
    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
    tl.fromTo(items, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power2.out' });
    return () => { tl.kill(); };
  }, []);

  return (
    <section id="philosophy" ref={ref} className="bg-[#0F2440] section-padding">
      <div className="content-max">
        <div className="text-center mb-16">
          <div className="phil-reveal flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#D4A853]" />
            <span className="eyebrow">Our Philosophy</span>
          </div>
          <h2 className="phil-reveal text-white mb-4" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', lineHeight: 1.2 }}>
            People Should Let Technology Work So They Can Live.
          </h2>
          <p className="phil-reveal text-white/60 max-w-2xl mx-auto leading-relaxed">
            Technology exists to improve life. Our philosophy guides every decision we make.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pillars.map((p, i) => (
            <div key={p.title} className="phil-reveal bg-[#1A3A5C]/50 rounded-lg p-8 border border-white/10">
              <span className="text-5xl font-bold text-[#D4A853]/20 mb-4 block" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>0{i + 1}</span>
              <h3 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{p.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="phil-reveal bg-[#1A3A5C] rounded-lg p-8 md:p-12 max-w-3xl mx-auto text-center">
          <p className="text-white/60 mb-4">If a process is unnecessarily manual, if people repeat the same task every day, if valuable time is being wasted —</p>
          <p className="text-white text-lg mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>We believe technology can make it better.</p>
          <div className="w-16 h-[2px] bg-[#D4A853] mx-auto mt-6" />
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ventures = [
  {
    name: 'SquadPay LLC',
    desc: 'Collaborative payment platform that transforms how groups share expenses.',
    image: '/images/ventures-consumer-tech.jpg',
    tag: 'Financial Technology',
    color: '#7B3FF2',
  },
  {
    name: 'Influrios',
    desc: 'Influencer directory and collaboration platform that helps creators and businesses find the right influence and build powerful partnerships.',
    image: '/images/ventures-influrios.jpg',
    tag: 'Future Venture',
    color: '#7C3AED',
  },
  {
    name: 'VueKumi',
    desc: 'Stock image marketplace for authentic African photography — premium visuals celebrating African life, culture, business, and creativity.',
    image: '/images/ventures-vuekumi.jpg',
    tag: 'Future Venture',
    color: '#FF7227',
  },
  {
    name: 'ZuriKaribu',
    desc: 'African fashion marketplace connecting designers, fabric sellers, and global customers — authentic style, craftsmanship, and contemporary African design.',
    image: '/images/ventures-zurikaribu.jpg',
    tag: 'Future Venture',
    color: '#C45C26',
  },
];

export default function VenturesSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll('.venture-reveal');
    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
    tl.fromTo(items, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'power2.out' });
    return () => { tl.kill(); };
  }, []);

  return (
    <section id="ventures" ref={ref} className="bg-[#F8FAFC] section-padding">
      <div className="content-max">
        <div className="text-center mb-16">
          <div className="venture-reveal flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#D4A853]" />
            <span className="eyebrow">Our Ventures</span>
          </div>
          <h2 className="venture-reveal text-[#1A3A5C] mb-4" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', lineHeight: 1.2 }}>
            A Portfolio Built Around Solving Problems
          </h2>
          <p className="venture-reveal text-[#64748B] max-w-2xl mx-auto leading-relaxed">
            Nueve Technologies creates and develops independent technology businesses that address high-impact challenges across multiple industries.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {ventures.map((v) => (
            <div key={v.name} className="venture-reveal group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="h-56 overflow-hidden">
                <img
                  src={v.image}
                  alt={`${v.name} product preview`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <span className="text-xs font-semibold uppercase tracking-wider mb-2 inline-block" style={{ color: v.color }}>{v.tag}</span>
                <h3 className="text-xl font-semibold text-[#1C1917] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{v.name}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

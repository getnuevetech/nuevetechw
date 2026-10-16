import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const areas = [
  { title: 'Financial Technology', desc: 'Modern payment experiences, collaborative financial tools, merchant technologies, and digital transaction platforms.', icon: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#1A3A5C" strokeWidth="1.5"><rect x="4" y="10" width="32" height="20" rx="3" /><line x1="4" y1="18" x2="36" y2="18" /><circle cx="28" cy="25" r="2" /></svg>
  )},
  { title: 'Business Automation', desc: 'Software that removes repetitive manual processes, improves operational efficiency, and enables organizations to focus on higher-value work.', icon: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#1A3A5C" strokeWidth="1.5"><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="22" y="6" width="12" height="12" rx="2" /><rect x="6" y="22" width="12" height="12" rx="2" /><rect x="22" y="22" width="12" height="12" rx="2" /><path d="M18 12H22M12 18V22M28 18V22M18 28H22" /></svg>
  )},
  { title: 'Artificial Intelligence', desc: 'Practical AI solutions that automate decision-making, streamline workflows, and enhance productivity.', icon: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#1A3A5C" strokeWidth="1.5"><circle cx="20" cy="12" r="4" /><circle cx="10" cy="28" r="4" /><circle cx="30" cy="28" r="4" /><line x1="20" y1="16" x2="10" y2="24" /><line x1="20" y1="16" x2="30" y2="24" /><line x1="14" y1="28" x2="26" y2="28" /></svg>
  )},
  { title: 'Digital Platforms', desc: 'Scalable marketplaces and digital ecosystems that connect people, businesses, and services in meaningful ways.', icon: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#1A3A5C" strokeWidth="1.5"><circle cx="20" cy="14" r="6" /><path d="M8 34C8 26 13 20 20 20C27 20 32 26 32 34" /></svg>
  )},
];

export default function WhatWeBuildSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll('.wwb-reveal');
    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
    tl.fromTo(items, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power2.out' });
    return () => { tl.kill(); };
  }, []);

  return (
    <section id="what-we-build" ref={ref} className="bg-white section-padding">
      <div className="content-max">
        <div className="text-center mb-16">
          <div className="wwb-reveal flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#D4A853]" />
            <span className="eyebrow">What We Build</span>
          </div>
          <h2 className="wwb-reveal text-[#1A3A5C] mb-4" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', lineHeight: 1.2 }}>
            Technology Designed Around People
          </h2>
          <p className="wwb-reveal text-[#64748B] max-w-2xl mx-auto leading-relaxed">
            Our products are not created because technology exists. They are created because people deserve better experiences.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((a) => (
            <div key={a.title} className="wwb-reveal bg-[#F8FAFC] rounded-lg p-8 hover:shadow-md transition-shadow">
              <div className="mb-5">{a.icon}</div>
              <h3 className="text-lg font-semibold text-[#1C1917] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{a.title}</h3>
              <p className="text-sm text-[#64748B] leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
        <div className="wwb-reveal mt-12 text-center">
          <p className="text-sm text-[#94A3B8] italic">Every product begins with understanding people — not technology.</p>
        </div>
      </div>
    </section>
  );
}

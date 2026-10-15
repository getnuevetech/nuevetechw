import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll('.about-reveal');
    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 75%', toggleActions: 'play none none none' } });
    tl.fromTo(items, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power2.out' });
    return () => { tl.kill(); };
  }, []);

  return (
    <section id="about" ref={ref} className="bg-[#F8FAFC] section-padding">
      <div className="content-max">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="about-reveal">
            <img src="/images/about-tech.jpg" alt="Modern technology workspace" className="w-full rounded-lg shadow-lg object-cover" style={{ aspectRatio: '16/10' }} />
          </div>
          <div>
            <div className="about-reveal flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[#D4A853]" />
              <span className="eyebrow">About Nueve</span>
            </div>
            <h2 className="about-reveal text-[#1A3A5C] mb-6" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', lineHeight: 1.2 }}>
              Building Companies That Solve Real Problems
            </h2>
            <p className="about-reveal text-[#64748B] leading-relaxed mb-4">
              Nueve Technologies LLC is more than a software company. We are a technology venture company dedicated to creating businesses that solve meaningful, everyday problems through intelligent technology.
            </p>
            <p className="about-reveal text-[#64748B] leading-relaxed mb-4">
              Every successful product begins with a simple question: <em className="text-[#1A3A5C] font-medium">Why are people still doing this manually?</em>
            </p>
            <p className="about-reveal text-[#64748B] leading-relaxed mb-4">
              Instead of accepting inefficient processes, we challenge assumptions, redesign workflows, and build technology that allows people to spend less time managing tasks and more time living their lives.
            </p>
            <p className="about-reveal text-[#64748B] leading-relaxed">
              Rather than concentrating on a single product, Nueve Technologies develops a growing portfolio of independent technology ventures, each focused on solving a specific problem while benefiting from the shared innovation, leadership, and experience of the parent company.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

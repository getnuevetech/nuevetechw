import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FounderSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll('.founder-reveal');
    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 70%' } });
    tl.fromTo(items, { y: 25, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power2.out' });
    return () => { tl.kill(); };
  }, []);

  return (
    <section id="founder" ref={ref} className="bg-[#F8FAFC] section-padding">
      <div className="content-max">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-2 founder-reveal">
            <img src="/images/founder-story.jpg" alt="Founder" className="w-full rounded-lg shadow-lg object-cover" style={{ aspectRatio: '3/4' }} />
          </div>
          <div className="lg:col-span-3">
            <div className="founder-reveal flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[#D4A853]" />
              <span className="eyebrow">Founder's Story</span>
            </div>
            <h2 className="founder-reveal text-[#1A3A5C] mb-8" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', lineHeight: 1.2 }}>
              Building Solutions Through Experience
            </h2>

            <div className="space-y-5">
              <p className="founder-reveal text-[#64748B] leading-relaxed">
                Nueve Technologies was founded on years of practical experience across software engineering, hardware systems, network infrastructure, technical support, retail technology, business operations, and process automation.
              </p>
              <p className="founder-reveal text-[#64748B] leading-relaxed">
                The entrepreneurial journey began with <strong className="text-[#1A3A5C]">LEKS Computers</strong>, an independent computer repair and technology services company built from a desire to create opportunity rather than wait for it.
              </p>
              <p className="founder-reveal text-[#64748B] leading-relaxed">
                After relocating to Texas, additional businesses were established providing IT services, hardware support, and security system solutions. Working within the retail technology industry further shaped the vision — rather than accepting inefficient manual workflows, the focus became restructuring operations and automating repetitive business processes.
              </p>

              <div className="founder-reveal bg-white rounded-lg p-6 border-l-4 border-[#D4A853] my-8">
                <p className="text-[#1A3A5C] text-lg italic leading-relaxed" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  "Technology should not require people to work harder. Technology should work harder for people."
                </p>
              </div>

              <p className="founder-reveal text-[#64748B] leading-relaxed">
                Over more than a decade, ideas were continuously documented, refined, and evaluated through one common lens: <em className="text-[#1A3A5C] font-medium">How can technology eliminate unnecessary work?</em>
              </p>
              <p className="founder-reveal text-[#64748B] leading-relaxed">
                Nueve Technologies was created to transform those ideas into scalable businesses capable of improving how people work, collaborate, and live.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

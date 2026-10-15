import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { trpc } from '@/providers/trpc';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    submitMutation.mutate(form);
  };

  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll('.contact-reveal');
    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
    tl.fromTo(items, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power2.out' });
    return () => { tl.kill(); };
  }, []);

  const partners = [
    'Investors', 'Strategic Partners', 'Payment Providers', 'Technology Companies',
    'Merchants', 'Product Innovators', 'Enterprise Customers', 'Industry Specialists',
  ];

  return (
    <section id="contact" ref={ref} className="bg-white section-padding">
      <div className="content-max">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <div className="contact-reveal flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[#D4A853]" />
              <span className="eyebrow">Partner With Us</span>
            </div>
            <h2 className="contact-reveal text-[#1A3A5C] mb-4" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', lineHeight: 1.2 }}>
              Building Better Together
            </h2>
            <p className="contact-reveal text-[#64748B] leading-relaxed mb-8">
              Innovation grows through collaboration. Nueve Technologies welcomes opportunities to work with organizations and individuals who share a passion for solving meaningful problems through technology.
            </p>

            <div className="contact-reveal mb-8">
              <h4 className="text-sm font-semibold text-[#1C1917] mb-3">We partner with:</h4>
              <div className="flex flex-wrap gap-2">
                {partners.map((p) => (
                  <span key={p} className="px-3 py-1.5 bg-[#F8FAFC] text-xs font-medium text-[#64748B] rounded-md border border-[#E2E8F0]">{p}</span>
                ))}
              </div>
            </div>

            <div className="contact-reveal space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E8F0FE] flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A3A5C" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8] uppercase tracking-wider">General Inquiries</p>
                  <a href="mailto:info@nuevetech.io" className="text-sm font-medium text-[#1A3A5C] hover:text-[#D4A853] transition-colors">info@nuevetech.io</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E8F0FE] flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A3A5C" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27,6.96 12,12.01 20.73,6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8] uppercase tracking-wider">Business Development</p>
                  <a href="mailto:partnerships@nuevetech.io" className="text-sm font-medium text-[#1A3A5C] hover:text-[#D4A853] transition-colors">partnerships@nuevetech.io</a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-reveal">
            {submitted ? (
              <div className="bg-[#F8FAFC] rounded-lg p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-[#E8F0FE] flex items-center justify-center mx-auto mb-6">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1A3A5C" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                </div>
                <h3 className="text-xl font-semibold text-[#1C1917] mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Message Sent</h3>
                <p className="text-sm text-[#64748B]">Thank you for reaching out. We'll get back to you soon.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-sm text-[#1A3A5C] font-medium hover:text-[#D4A853] transition-colors">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[#F8FAFC] rounded-lg p-8">
                <h3 className="text-lg font-semibold text-[#1C1917] mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Send us a message</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#64748B] mb-1.5">Name *</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-md border border-[#E2E8F0] bg-white text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]/20 focus:border-[#1A3A5C] transition-all" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#64748B] mb-1.5">Email *</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 rounded-md border border-[#E2E8F0] bg-white text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]/20 focus:border-[#1A3A5C] transition-all" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#64748B] mb-1.5">Subject</label>
                    <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full px-4 py-2.5 rounded-md border border-[#E2E8F0] bg-white text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]/20 focus:border-[#1A3A5C] transition-all" placeholder="What's this about?" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#64748B] mb-1.5">Message *</label>
                    <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-2.5 rounded-md border border-[#E2E8F0] bg-white text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]/20 focus:border-[#1A3A5C] transition-all resize-none" placeholder="Tell us about your inquiry..." />
                  </div>
                  <button type="submit" disabled={submitMutation.isPending} className="btn-primary w-full justify-center disabled:opacity-50">
                    {submitMutation.isPending ? 'Sending...' : 'Start a Conversation'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

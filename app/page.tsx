'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { DesignGallery } from '../components/DesignGallery';
import { CommandPalette } from '../components/CommandPalette';

const contactChannels = [
  {
    name: 'Email',
    value: 'kinaraurasae@gmail.com',
    href: 'mailto:kinaraurasae@gmail.com',
  },
  {
    name: 'WhatsApp',
    value: '+62 895-2229-5080',
    href: 'https://wa.me/6289522295080',
  },
  {
    name: 'LinkedIn',
    value: 'kinar-aurasae',
    href: 'https://www.linkedin.com/in/kinar-aurasae-a851b62aa/',
  },
  {
    name: 'GitHub',
    value: 'kinzx',
    href: 'https://github.com/kinzx',
  },
  {
    name: 'Instagram',
    value: '@ka.sae_',
    href: 'https://www.instagram.com/ka.sae_/',
  },
];

export default function Home() {
  const contactRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    const subject = encodeURIComponent(formState.subject || `Message from ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`,
    );
    window.location.href = `mailto:kinaraurasae@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  useEffect(() => {
    const contact = contactRef.current;
    if (
      !contact ||
      (typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return;
    }

    const elements = contact.querySelectorAll('.contact-reveal');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        gsap.fromTo(
          elements,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.08, ease: 'power3.out' },
        );
        observer.disconnect();
      },
      { threshold: 0.15 },
    );
    observer.observe(contact);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="flex min-h-screen flex-col">
      <CommandPalette />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <DesignGallery />

      <footer
        ref={contactRef}
        id="contact"
        className="relative min-h-screen w-full overflow-hidden bg-[#FAFAFA] px-6 text-[#111111]"
      >
        <div className="relative z-10 mx-auto flex min-h-screen max-w-[90rem] flex-col justify-between py-20">
          <div className="w-full">
            <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end lg:mb-12">
              <div>
                <p className="font-mono text-xs tracking-[0.22em] text-black/50 uppercase">
                  Get in touch
                </p>
                <h2 className="contact-reveal mt-3 font-serif text-5xl font-bold tracking-tight text-black sm:text-6xl md:text-7xl">
                  Contact
                </h2>
              </div>
              <p className="max-w-xl font-serif text-base text-black/75 sm:text-lg">
                Have a project, or idea in mind? Send a message and I&apos;ll reply as soon as I
                can.
              </p>
            </div>
            <div className="grid w-full items-start gap-8 lg:grid-cols-12 lg:gap-10">
              {/* Direct channels align with form */}
              <div className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
                {contactChannels.map((c) => {
                  return (
                    <motion.a
                      key={c.name}
                      href={c.href}
                      target="_blank"
                      rel="noreferrer"
                      className="contact-reveal group rounded-2xl border border-black/15 bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-[transform,border-color,box-shadow] hover:-translate-y-1 hover:border-black hover:shadow-[0_14px_30px_rgba(0,0,0,0.1)]"
                    >
                      <p className="font-mono text-xs text-black/55 uppercase">{c.name}</p>
                      <p className="mt-1 font-serif text-sm font-semibold text-black group-hover:underline">
                        {c.value}
                      </p>
                    </motion.a>
                  );
                })}
              </div>

              {/* Contact form aligned alongside channels */}
              <div className="contact-reveal rounded-2xl border border-black/10 bg-white p-6 shadow-[0_12px_36px_rgba(0,0,0,0.08)] sm:p-8 md:p-10 lg:col-span-8">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="contact-name"
                        className="font-mono text-xs font-semibold tracking-wider text-black/80 uppercase"
                      >
                        NAME <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full rounded-xl border border-black/20 bg-neutral-50 px-4 py-3 font-sans text-sm text-black transition-colors outline-none focus:border-black focus:bg-white"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="contact-email"
                        className="font-mono text-xs font-semibold tracking-wider text-black/80 uppercase"
                      >
                        EMAIL <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-black/20 bg-neutral-50 px-4 py-3 font-sans text-sm text-black transition-colors outline-none focus:border-black focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-subject"
                      className="font-mono text-xs font-semibold tracking-wider text-black/80 uppercase"
                    >
                      SUBJECT
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="What is this about?"
                      className="w-full rounded-xl border border-black/20 bg-neutral-50 px-4 py-3 font-sans text-sm text-black transition-colors outline-none focus:border-black focus:bg-white"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-message"
                      className="font-mono text-xs font-semibold tracking-wider text-black/80 uppercase"
                    >
                      MESSAGE <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell me about your project, role, or just say hi."
                      className="w-full resize-y rounded-xl border border-black/20 bg-neutral-50 px-4 py-3 font-sans text-sm text-black transition-colors outline-none focus:border-black focus:bg-white"
                    />
                  </div>

                  <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-full bg-black px-7 py-3.5 font-mono text-xs font-semibold tracking-wider text-white uppercase shadow-md transition-[transform,background-color,box-shadow] hover:bg-neutral-800 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 active:scale-95"
                    >
                      <Send className="h-4 w-4" />
                      <span>Send message</span>
                    </button>

                    {submitted && (
                      <p className="flex items-center gap-2 font-mono text-xs text-emerald-700">
                        <CheckCircle2 className="h-4 w-4" />
                        Email client opened.
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 pt-16 sm:flex-row sm:items-end">
            <div>
              <p className="font-serif text-6xl font-bold tracking-tight text-black sm:text-7xl md:text-8xl">
                @2026
              </p>
              <p className="mt-2 font-mono text-sm tracking-wider text-black/60">kinaraura.sae</p>
            </div>

            <a
              href="#intro"
              className="group flex h-16 w-16 flex-col items-center justify-center gap-0.5 rounded-full border-2 border-black bg-white font-mono text-[10px] tracking-wider text-black shadow-lg transition-[transform,background-color,color] hover:-translate-y-2 hover:bg-black hover:text-white focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              aria-label="Back to top"
            >
              <span className="text-2xl leading-none transition-transform group-hover:-translate-y-0.5">
                &uarr;
              </span>
              <span>TOP</span>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

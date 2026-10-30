'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ProjectsSection } from '../components/ProjectsSection';
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

  return (
    <main className="flex min-h-screen flex-col">
      <CommandPalette />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />

      <footer
        id="contact"
        className="relative min-h-screen w-full overflow-hidden bg-[#FAFAFA] px-6 text-[#111111] lg:pr-14 lg:pl-60"
      >
        <div className="relative z-10 mx-auto flex min-h-screen max-w-[90rem] flex-col justify-between py-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-serif text-5xl font-bold tracking-tight text-black sm:text-6xl md:text-7xl">
                Contact
              </h2>
              <p className="mt-4 max-w-2xl font-serif text-base text-black/75 sm:text-lg">
                Have a project, or idea in mind? Send a message and I&apos;ll reply as soon as
                I can.
              </p>
            </motion.div>

            {/* Contact Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 rounded-2xl border-2 border-black/15 bg-white p-6 shadow-sm sm:p-8 md:p-10"
            >
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
                    className="inline-flex items-center gap-2 rounded-xl bg-black px-7 py-3.5 font-mono text-xs font-semibold tracking-wider text-white uppercase shadow-md transition-all hover:bg-neutral-800 hover:shadow-lg active:scale-95"
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
            </motion.div>

            {/* Direct Channels */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {contactChannels.map((c, index) => {
                const fromLeft = index % 2 === 0;
                return (
                  <motion.a
                    key={c.name}
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, x: fromLeft ? -40 : 40, y: 15 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{
                      duration: 0.55,
                      delay: index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group rounded-2xl border-2 border-black/15 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-black hover:shadow-md"
                  >
                    <p className="font-mono text-xs text-black/55 uppercase">{c.name}</p>
                    <p className="mt-1 font-serif text-sm font-semibold text-black group-hover:underline">
                      {c.value}
                    </p>
                  </motion.a>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between gap-6 pt-16 sm:flex-row sm:items-end"
          >
            <div>
              <p className="font-serif text-6xl font-bold tracking-tight text-black sm:text-7xl md:text-8xl">
                @2026
              </p>
              <p className="mt-2 font-mono text-sm tracking-wider text-black/60">kinaraura.sae</p>
            </div>

            <a
              href="#intro"
              className="flex h-24 w-14 flex-col items-center justify-center gap-2 rounded-full border-2 border-black bg-white font-serif text-xs text-black shadow-lg transition-transform hover:-translate-y-2"
              aria-label="Back to top"
            >
              <span className="text-3xl leading-none">&uarr;</span>
              <span>Back</span>
            </a>
          </motion.div>
        </div>
      </footer>
    </main>
  );
}

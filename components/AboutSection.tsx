'use client';

import { motion } from 'framer-motion';

const skills = ['Interface', 'Frontend', 'Motion', 'Systems'];
const work = ['Selected Work', 'Case Study', 'Prototype', 'Archive'];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-[220vh] w-full overflow-hidden bg-[#f4f4f4] px-6 py-24 text-[#111111] md:px-8"
    >
      <div className="sticky top-0 mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-14 py-24">
        <div className="max-w-4xl">
          <p className="mb-5 font-mono text-xs tracking-widest text-black/45 uppercase">
            About / approach
          </p>
          <h2 className="font-serif text-5xl leading-tight font-bold text-black sm:text-7xl md:text-8xl">
            Minimal, sharp, and built to move.
          </h2>
        </div>

        <div className="h-px bg-black/30" />

        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <p className="max-w-2xl font-serif text-2xl leading-relaxed text-black/75 md:text-3xl">
            Personal portfolio for profile, selected work, and contact, shaped with restrained
            motion and high-contrast monochrome.
          </p>

          <div className="relative aspect-square w-full max-w-sm justify-self-center rounded-full border border-black/25 bg-[radial-gradient(circle_at_35%_35%,#ffffff,#d9d9d9_40%,#111111_41%,#111111_44%,#f4f4f4_45%)]">
            <div className="absolute inset-8 rounded-full border border-black/20" />
            <div className="absolute inset-16 rounded-full bg-black" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {skills.map((skill) => (
            <div
              key={skill}
              className="border-t border-black/20 py-4 font-mono text-sm tracking-widest text-black/60 uppercase"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      <div id="work" className="absolute right-0 bottom-20 left-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, -520] }}
          transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
          className="flex w-max gap-8 font-serif text-5xl font-bold whitespace-nowrap text-black/18 sm:text-7xl md:text-8xl"
        >
          {[...work, ...work].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const skills = ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Docker', 'CI/CD'];
const work = ['Case Study', 'Prototype', 'Archive', 'Interface'];
const roles = ['DevOps', 'Web Developer', 'Designer'];

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const aboutY = useTransform(scrollYProgress, [0, 0.45], [90, -40]);
  const cardY = useTransform(scrollYProgress, [0.1, 0.55], [80, -80]);

  return (
    <section
      ref={ref}
      id="profile"
      className="relative w-full overflow-hidden bg-[#f4f4f4] text-[#111111]"
    >
      <div className="mx-auto min-h-screen w-full max-w-[90rem] px-6 py-24 md:pl-60 md:pr-10 lg:pr-14">
        <motion.div style={{ y: aboutY }} className="grid min-h-screen content-center gap-12">
          <div>
            <p className="mb-5 font-serif text-sm italic text-black/55">PORTOFOLIO / approach</p>
            <h2 className="font-serif text-5xl leading-none font-bold text-black sm:text-7xl lg:text-8xl">
              Hello I&apos;m Kinar Aurasae
            </h2>
            <div className="mt-6 h-px bg-black/55" />
          </div>

          <div className="grid gap-12 lg:grid-cols-[1fr_25rem] lg:items-start">
            <div>
              <p className="mb-5 font-mono text-[0.65rem] tracking-widest text-black/70 uppercase">
                {roles.join(', ')}
              </p>
              <p className="max-w-2xl font-serif text-base leading-6 text-black/80">
                Saya membangun antarmuka web yang rapi, cepat, dan mudah dipakai. Fokus saya ada
                di frontend, motion yang terasa halus, deployment yang stabil, dan detail kecil
                yang membuat portfolio terasa hidup tanpa kehilangan kesan minimal.
              </p>
            </div>

            <motion.div
              style={{ y: cardY }}
              className="rounded-[2rem] bg-[#d8d8d8] p-6 shadow-2xl shadow-black/10"
            >
              <div className="grid aspect-[4/5] place-items-center rounded-[1.4rem] bg-[radial-gradient(circle_at_35%_20%,#ffffff,#bdbdbd_38%,#6d6d6d_68%,#2d2d2d)]">
                <span className="font-serif text-7xl font-bold text-white/90">K</span>
              </div>
              <div className="mt-6 grid gap-4">
                {roles.slice(0, 2).map((role) => (
                  <div key={role} className="flex items-center gap-3">
                    <span className="h-7 w-7 rounded-full bg-white" />
                    <span className="font-mono text-[0.6rem] tracking-widest text-black/75 uppercase">
                      {role}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="mx-auto grid max-w-[90rem] gap-5 px-6 pb-24 md:grid-cols-3 md:pl-60 md:pr-10 lg:pr-14">
        {skills.map((skill) => (
          <motion.div
            key={skill}
            whileHover={{ y: -6 }}
            className="border-t border-black/30 py-5 font-mono text-xs tracking-widest text-black/70 uppercase"
          >
            {skill}
          </motion.div>
        ))}
      </div>

      <div className="overflow-hidden border-y border-black/45 bg-[#f4f4f4] px-6 py-16 md:pl-60">
        <motion.div
          animate={{ x: [0, -520] }}
          transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
          className="flex w-max gap-8 font-serif text-6xl font-bold whitespace-nowrap text-black/14 sm:text-8xl md:text-9xl"
        >
          {[...work, ...work].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </motion.div>
      </div>

      <div id="work" className="bg-[#050505] px-6 py-24 text-white md:pl-60 md:pr-10 lg:pr-14">
        {[1, 2].map((item) => (
          <motion.article
            key={item}
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.45 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative mx-auto flex min-h-[34rem] max-w-[86rem] flex-col justify-end border-b border-white/85 pb-16"
          >
            <motion.span
              style={{ y: item === 1 ? aboutY : cardY }}
              className="absolute top-0 left-[12%] font-serif text-[18rem] leading-none font-bold text-white sm:text-[24rem] md:text-[31rem]"
            >
              {item}
            </motion.span>
            <div className="relative z-10 flex items-end justify-between gap-8">
              <p className="font-serif text-sm italic text-white/85">Next GeneGeneration</p>
              <span className="h-11 w-11 rounded-full bg-white/90" />
            </div>
          </motion.article>
        ))}

        <div className="relative mx-auto grid min-h-[32rem] max-w-[86rem] place-items-center border-l border-white/10">
          <p className="font-mono text-xs tracking-[0.25em] text-white/70 uppercase">
            Contact / Portfolio Details Coming Soon
          </p>
        </div>
      </div>
    </section>
  );
}

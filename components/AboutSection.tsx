'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const skills = ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Docker', 'CI/CD'];
const work = ['Case Study', 'Prototype', 'Archive', 'Interface'];
const roles = ['DevOps', 'Web Developer', 'Designer'];
const projects = [
  {
    number: '1',
    title: 'Next GeneGeneration',
    description: 'Landing page gelap dengan motion, section portfolio, dan navigasi scroll.',
    tags: ['Next.js', 'Motion', 'UI'],
  },
  {
    number: '2',
    title: 'Portfolio Gallery',
    description: 'Kumpulan eksperimen card, layout editorial, dan halaman profile personal.',
    tags: ['React', 'Tailwind', 'Design'],
  },
];

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
        {projects.map((project) => (
          <motion.article
            key={project.number}
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.45 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative mx-auto grid min-h-[48rem] max-w-[86rem] content-start gap-10 overflow-hidden border-b border-white/85 py-20"
          >
            <motion.span
              className="relative z-0 font-serif text-[14rem] leading-[0.75] font-bold text-white sm:text-[20rem] md:text-[26rem]"
            >
              {project.number}
            </motion.span>
            <div className="relative z-10 flex items-end justify-between gap-8">
              <div className="bg-[#050505]/70 pr-4 backdrop-blur-sm">
                <p className="font-serif text-sm italic text-white/85">{project.title}</p>
                <p className="mt-3 max-w-md text-sm leading-6 text-white/55">
                  {project.description}
                </p>
              </div>
              <span className="h-11 w-11 rounded-full bg-white/90" />
            </div>
            {project.number === '1' ? (
              <motion.div
                whileHover={{ y: -8 }}
                className="relative z-10 grid min-h-[24rem] overflow-hidden  p-7 text-white md:grid-cols-[0.8fr_1.2fr] md:p-10"
              >
                <div className="relative z-10 flex flex-col justify-between gap-12">
                  <div className="flex items-center gap-10">
                    <h3 className="text-4xl font-light tracking-tight md:text-5xl">
                      Agile Technology
                    </h3>
                    <span className="hidden h-px w-32 bg-white/80 md:block" />
                  </div>
                  <p className="max-w-xs text-base leading-6 text-white/75">
                    Developed a modern, clean look for the tech startup&apos;s new mobile app.
                  </p>
                </div>

                <div className="relative mt-10 min-h-[18rem] md:mt-0">
                  <p className="absolute top-0 right-0 font-serif text-4xl italic text-white/90">
                    User Interface
                  </p>
                  <div className="absolute right-0 bottom-0 h-56 w-full max-w-[34rem] rounded-[1.6rem] border-[0.45rem] border-[#2c2c2c] bg-[#bfe5ff] shadow-2xl">
                    <div className="absolute right-0 bottom-0 left-0 h-20 rounded-b-[1.1rem] bg-[#789900]" />
                    <div className="absolute top-10 left-8 h-8 w-20 rounded-full bg-white/80" />
                    <div className="absolute top-[-2rem] left-[19%] h-52 w-44 rotate-2 bg-white shadow-xl" />
                    <div className="absolute top-[2.5rem] left-[27%] h-24 w-24 rounded-full border-[1.1rem] border-[#111]" />
                    <div className="absolute top-[-1rem] right-8 h-52 w-44 rotate-3 bg-black p-5 shadow-xl">
                      <p className="text-xl text-white/80">Sign Up Now !</p>
                      <div className="mt-5 rounded-lg bg-white p-4 text-black">
                        <p className="text-xs font-bold">Hello</p>
                        <div className="mt-4 space-y-3">
                          <span className="block h-px bg-black/15" />
                          <span className="block h-px bg-black/15" />
                          <span className="block h-px bg-black/15" />
                        </div>
                        <span className="mt-5 block rounded-full bg-black py-2 text-center text-[0.55rem] text-white">
                          CREATE
                        </span>
                      </div>
                    </div>
                    <span className="absolute bottom-9 left-[-0.5rem] rotate-6 rounded-md bg-[#5157ff] px-3 py-1 font-serif text-lg text-white ring-2 ring-white">
                      kinzx
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="relative z-10 grid gap-4 md:grid-cols-3">
                {project.tags.map((tag) => (
                  <motion.div
                    key={tag}
                    whileHover={{ y: -6 }}
                    className="border border-white/20 bg-white/5 p-5 backdrop-blur-sm"
                  >
                    <p className="font-mono text-[0.65rem] tracking-widest text-white/45 uppercase">
                      {tag}
                    </p>
                    <p className="mt-10 font-serif text-2xl text-white">{project.title}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.article>
        ))}

        {/* <div className="relative mx-auto grid min-h-[32rem] max-w-[86rem] place-items-center">
          <p className="font-mono text-xs tracking-[0.25em] text-white/70 uppercase">
            Contact / Portfolio Details Coming Soon
          </p>
        </div> */}
      </div>
    </section>
  );
}

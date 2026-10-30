'use client';

import Image from 'next/image';
import { type ReactElement, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const socials = [
  {
    src: '/asset/s2/linkedin.png',
    alt: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kinar-aurasae-a851b62aa/',
  },
  {
    src: '/asset/s2/github.png',
    alt: 'GitHub',
    href: 'https://github.com/kinzx',
  },
  {
    src: '/asset/s2/instagram.png',
    alt: 'Instagram',
    href: 'https://www.instagram.com/ka.sae_/',
  },
  {
    src: '/asset/s2/whatsapp.png',
    alt: 'WhatsApp',
    href: 'https://wa.me/6289522295080',
  },
];

const skills = [
  { name: 'Design', level: 87 },
  { name: 'Code', level: 68 },
  { name: 'Devops', level: 72 },
];

interface ToolItem {
  id: string;
  name: string;
  icon: ReactElement;
}

// Generate realistic contribution matrix (52 weeks x 7 days) matching user mockup
const WEEKS_COUNT = 52;
const MONTHS_LABELS = [
  { label: 'Oct', col: 0 },
  { label: 'Nov', col: 4 },
  { label: 'Dec', col: 8 },
  { label: 'Jan', col: 13 },
  { label: 'Feb', col: 17 },
  { label: 'Mar', col: 21 },
  { label: 'Apr', col: 26 },
  { label: 'May', col: 30 },
  { label: 'Jun', col: 35 },
  { label: 'Jul', col: 39 },
  { label: 'Aug', col: 43 },
  { label: 'Sep', col: 48 },
];

const CONTRIBUTION_LEVELS = [
  'bg-neutral-100 dark:bg-neutral-200/60', // 0
  'bg-[#9be9a8]', // 1
  'bg-[#40c463]', // 2
  'bg-[#30a14e]', // 3
  'bg-[#216e39]', // 4
];

// Seeded pattern to match the screenshot density (high activity around Jan, Jun-Aug)
const CONTRIBUTION_MATRIX: number[][] = Array.from({ length: 7 }, (_, dayIndex) => {
  return Array.from({ length: WEEKS_COUNT }, (_, weekIndex) => {
    // Sparse periods
    if (
      weekIndex < 2 ||
      (weekIndex >= 5 && weekIndex <= 7) ||
      weekIndex === 16 ||
      weekIndex >= 50
    ) {
      return (weekIndex + dayIndex) % 7 === 0 ? 1 : 0;
    }
    // High density around Jan (weeks 12-15) and Summer (weeks 34-44)
    if (weekIndex >= 12 && weekIndex <= 15) {
      const v = (weekIndex * 3 + dayIndex * 5) % 5;
      return v === 0 ? 3 : v;
    }
    if (weekIndex >= 34 && weekIndex <= 44) {
      const v = (weekIndex * 7 + dayIndex * 3) % 5;
      return v === 0 ? 4 : v === 1 ? 3 : v;
    }
    // Medium activity elsewhere
    if ((weekIndex * 13 + dayIndex * 7) % 3 === 0) {
      return ((weekIndex + dayIndex) % 3) + 1;
    }
    return 0;
  });
});

const TOOLS_LIST: ToolItem[] = [
  {
    id: 'affinity',
    name: 'Affinity',
    icon: (
      <div className="relative h-10 w-10 overflow-hidden rounded-xl shadow-sm">
        <Image src="/asset/affinity_icon.jpeg.png" alt="Affinity" fill className="object-cover" />
      </div>
    ),
  },
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    icon: (
      <svg
        viewBox="0 0 100 100"
        className="h-10 w-10 drop-shadow-sm"
        aria-label="Visual Studio Code"
        role="img"
      >
        <path
          fill="#0065A9"
          d="M97 14.3 74.6 3.3 29.7 44.6 12.6 31.2 3 36.8v26.4l9.6 5.6 17.5-13.8 44.4 41.7L97 85.7V14.3z"
        />
        <path
          fill="#007ACC"
          d="M74.1 3.3 29.7 44.6 12.6 31.2 3 36.8v26.4l9.6 5.6 17.5-13.8 43.9 41.7 22.9-11V14.3L74.1 3.3zm.5 67L50 48.7l24.6-21.6V70.3z"
        />
        <path
          fill="#1F9CF0"
          d="M74.6 96.7c6.2 2.5 22.4-11 22.4-11V14.3s-16.2-13.5-22.4-11c4.8 3 4.8 90.4 0 93.4z"
        />
      </svg>
    ),
  },
  {
    id: 'figma',
    name: 'Figma',
    icon: (
      <svg viewBox="0 0 38 57" className="h-10 w-auto drop-shadow-sm" aria-label="Figma" role="img">
        <path fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0Z" />
        <path fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0Z" />
        <path fill="#ff7262" d="M19 0v19H9.5a9.5 9.5 0 0 1 0-19H19Z" />
        <path fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5Z" />
        <path fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5Z" />
      </svg>
    ),
  },
  {
    id: 'figcraft',
    name: 'Figcraft',
    icon: (
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white shadow-sm">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m16 8-8 8M8 8h8v8" />
        </svg>
      </div>
    ),
  },
  {
    id: 'canva',
    name: 'Canva',
    icon: (
      <div
        className="grid h-10 w-10 place-items-center rounded-xl font-serif text-xl font-black text-white italic shadow-sm"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #00c4cc 0%, #7d2ae8 100%)',
        }}
      >
        C
      </div>
    ),
  },
  {
    id: 'photoshop',
    name: 'Photoshop',
    icon: (
      <div className="grid h-10 w-10 place-items-center rounded-xl border border-[#31a8ff]/40 bg-[#001e36] font-sans text-base font-bold tracking-tight text-[#31a8ff] shadow-sm">
        Ps
      </div>
    ),
  },
  {
    id: 'aftereffects',
    name: 'After Effects',
    icon: (
      <div className="relative h-10 w-10 overflow-hidden rounded-xl shadow-sm">
        <Image
          src="/asset/Adobe-After-Effects-Icon-PNG 1.png"
          alt="Adobe After Effects"
          fill
          className="object-contain"
        />
      </div>
    ),
  },
  {
    id: 'premiere',
    name: 'Adobe Premiere',
    icon: (
      <div className="grid h-10 w-10 place-items-center rounded-xl border border-[#ff61f6]/40 bg-[#260026] font-sans text-base font-bold tracking-tight text-[#ff61f6] shadow-sm">
        Pr
      </div>
    ),
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: (
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#181717] text-white shadow-sm">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      </div>
    ),
  },
  {
    id: 'docker',
    name: 'Docker',
    icon: (
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#2496ED] text-white shadow-sm">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 00.186-.186V9.006a.186.186 0 00-.186-.186h-2.118a.186.186 0 00-.186.186v1.887c0 .102.083.185.186.185m-2.929 0h2.119a.185.185 0 00.185-.186V9.006a.185.185 0 00-.185-.186H8.1a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.186V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 00.185-.186V9.006a.185.185 0 00-.185-.186H2.208a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m21.655-.42c-.205-.152-.777-.286-1.554-.085-.18-.844-.664-1.503-1.282-1.897l-.271-.173-.185.263c-.567.809-.769 1.942-.485 2.809-.545.242-1.32.327-1.88.337H.403a.394.394 0 00-.392.428c.189 2.148 1.127 4.16 2.659 5.698 1.946 1.956 4.697 3.033 7.848 3.033 6.168 0 11.233-3.666 13.064-9.673.473-.082.887-.318 1.173-.668.046-.057.085-.119.117-.184l.036-.076-.036-.076a.715.715 0 00-.285-.246" />
        </svg>
      </div>
    ),
  },
];

export function AboutSection() {
  const [totalContributions, setTotalContributions] = useState<number>(323);
  const [heatmapMatrix, setHeatmapMatrix] = useState<number[][]>(CONTRIBUTION_MATRIX);

  useEffect(() => {
    let isMounted = true;
    async function fetchRealContributions() {
      try {
        const res = await fetch('https://github-contributions-api.jogruber.de/v4/kinzx?y=last');
        if (!res.ok) return;
        const data = await res.json();
        if (!isMounted || !data?.contributions || !Array.isArray(data.contributions)) return;

        if (typeof data.total?.lastYear === 'number') {
          setTotalContributions(data.total.lastYear);
        }

        // Build 7 rows x 52+ weeks from real contribution dates
        const daysCount = data.contributions.length;
        const weeks = Math.ceil(daysCount / 7);
        const matrix: number[][] = Array.from({ length: 7 }, () => Array(weeks).fill(0));

        data.contributions.forEach((day: { level?: number }, idx: number) => {
          const col = Math.floor(idx / 7);
          const row = idx % 7;
          if (row < 7 && col < weeks) {
            matrix[row][col] = Math.min(4, Math.max(0, day.level ?? 0));
          }
        });

        setHeatmapMatrix(matrix);
      } catch {
        // Fallback to pre-calculated 323 matrix
      }
    }

    fetchRealContributions();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="profile"
      className="relative w-full overflow-hidden bg-[#f4f4f4] px-6 py-20 text-[#111111] md:pr-10 md:pl-60 lg:pr-14"
    >
      <div className="relative mx-auto w-full max-w-[90rem]">
        {/* Intro profile & portrait with alternating lateral scroll motion */}
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0"
          >
            <p className="font-serif text-xs tracking-[0.18em] text-black/60 uppercase italic">
              Portofolio
            </p>
            <h2 className="mt-4 font-serif text-4xl font-bold text-black sm:text-5xl lg:text-6xl">
              Hello/Holla.
              <br />
              I&apos;m Kinar Aurasae
            </h2>

            <div className="mt-7 h-0.5 w-full bg-black/60" />

            <p className="mt-7 font-sans text-xs font-bold tracking-[0.14em] text-black uppercase">
              DEVOPS, WEB DEVELOPER &amp; DESIGNER
            </p>
            <p className="mt-4 max-w-2xl font-serif text-base leading-relaxed text-black/90">
              Perkenalkan nama saya Kinar Aurasae, saya adalah Designer sekaligus Web Developer
              dengan membangun web antarmuka yang rapi, cepat dan mudah digunakan. Fokus saya adalah
              pada frontend, motion yang terasa halus, deployment yang stabil, dan detail kecil yang
              membuat portofolio terasa hidup.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                {socials.map((s) => (
                  <a
                    key={s.alt}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-12 w-12 place-items-center rounded-full border-2 border-black/20 bg-white transition-all hover:scale-105 hover:border-black"
                    aria-label={s.alt}
                  >
                    <Image src={s.src} alt={s.alt} width={20} height={20} className="opacity-80" />
                  </a>
                ))}
              </div>

              <a
                href="#work"
                className="flex h-16 items-center gap-3 rounded-full border-2 border-black pr-3 pl-7 transition-colors hover:bg-black hover:text-white"
              >
                <span className="font-serif text-base italic">Look websites</span>
                <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-current">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path
                      d="M7 17 17 7M9 7h8v8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-64 sm:max-w-72"
          >
            <div className="absolute -inset-3 rounded-[2rem] border-4 border-dashed border-black/80" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-[#d8d8d8]">
              <Image
                src="/kinar-profile.jpg"
                alt="Kinar Aurasae"
                fill
                priority
                sizes="(min-width: 1024px) 18rem, 80vw"
                className="object-cover object-top"
              />
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-6 -right-6 font-serif text-6xl text-red-500 select-none"
            >
              ✱
            </span>
          </motion.div>
        </div>

        {/* Skills & Tools with lateral motion */}
        <div className="mt-20 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-serif text-xl text-black/45">01</span>
              <h3 className="font-serif text-3xl font-bold text-black sm:text-4xl">
                My Skill&apos;s
              </h3>
            </div>
            <div className="mt-4 h-0.5 w-full bg-black/60" />

            <div className="mt-7 space-y-6">
              {skills.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between font-serif text-base font-bold text-black">
                    <span>{s.name}</span>
                    <span className="font-mono text-xs text-black/60">{s.level}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-black/20">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.9, ease: 'easeOut' }}
                      className="h-full rounded-full bg-black"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* My Tool's Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0"
          >
            <h3 className="font-serif text-3xl font-bold text-black sm:text-4xl">My Tool&apos;s</h3>
            <div className="mt-4 h-0.5 w-full bg-black/60" />

            <div className="mt-7 rounded-3xl border-2 border-dashed border-black/30 bg-white/70 p-6 shadow-sm backdrop-blur-sm sm:p-7">
              <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-5">
                {TOOLS_LIST.map((tool) => (
                  <div
                    key={tool.id}
                    className="group flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-neutral-200/90 bg-white p-3.5 text-center shadow-xs transition-all hover:-translate-y-1 hover:border-black hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 items-center justify-center transition-transform group-hover:scale-105">
                      {tool.icon}
                    </div>
                    <span className="line-clamp-2 min-h-[2rem] font-sans text-[0.72rem] leading-tight font-medium text-neutral-700 transition-colors group-hover:text-black">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* GitHub Contributions: Full-Width melintang kiri ke kanan */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 w-full"
        >
          <div className="rounded-3xl border border-neutral-200/90 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <p className="font-mono text-xs font-bold tracking-wider text-neutral-600 uppercase">
                  GITHUB CONTRIBUTIONS
                </p>
                <p className="mt-1 font-sans text-sm text-neutral-500">
                  {totalContributions.toLocaleString()} contributions in the last year
                </p>
              </div>
              <a
                href="https://github.com/kinzx"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-neutral-700 transition-colors hover:text-black"
              >
                <span>View GitHub</span>
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </a>
            </div>

            {/* Heatmap Grid full-width scrollable */}
            <div className="mt-6 overflow-x-auto pb-2">
              <div className="min-w-[780px]">
                {/* Months header */}
                <div className="mb-2 flex pl-8 text-[0.68rem] text-neutral-400">
                  {MONTHS_LABELS.map((m) => (
                    <span
                      key={m.label + m.col}
                      style={{ marginLeft: `${m.col === 0 ? 0 : 38}px` }}
                      className="inline-block"
                    >
                      {m.label}
                    </span>
                  ))}
                </div>

                {/* Days rows & grid */}
                <div className="flex items-start gap-3">
                  <div className="flex flex-col justify-between pt-0.5 text-[0.65rem] leading-none text-neutral-400 select-none">
                    <span className="h-3.5 leading-3.5"></span>
                    <span className="h-3.5 leading-3.5">Mon</span>
                    <span className="h-3.5 leading-3.5"></span>
                    <span className="h-3.5 leading-3.5">Wed</span>
                    <span className="h-3.5 leading-3.5"></span>
                    <span className="h-3.5 leading-3.5">Fri</span>
                    <span className="h-3.5 leading-3.5"></span>
                  </div>

                  <div className="grid grid-flow-col grid-rows-7 gap-1.5">
                    {heatmapMatrix.map((row, dayIdx) =>
                      row.map((level, weekIdx) => (
                        <span
                          key={`${dayIdx}-${weekIdx}`}
                          className={`h-3 w-3 rounded-[2.5px] transition-colors sm:h-3.5 sm:w-3.5 ${
                            CONTRIBUTION_LEVELS[level] ?? CONTRIBUTION_LEVELS[0]
                          }`}
                          title={`Contribution activity`}
                        />
                      )),
                    )}
                  </div>
                </div>

                {/* Legend footer */}
                <div className="mt-4 flex items-center justify-end gap-1.5 text-[0.68rem] text-neutral-400">
                  <span>Less</span>
                  <span className="h-3 w-3 rounded-[2px] bg-neutral-100" />
                  <span className="h-3 w-3 rounded-[2px] bg-[#9be9a8]" />
                  <span className="h-3 w-3 rounded-[2px] bg-[#40c463]" />
                  <span className="h-3 w-3 rounded-[2px] bg-[#30a14e]" />
                  <span className="h-3 w-3 rounded-[2px] bg-[#216e39]" />
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

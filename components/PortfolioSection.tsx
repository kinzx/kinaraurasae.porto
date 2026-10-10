'use client';

import Image from 'next/image';

const socials = [
  { src: '/asset/s2/linkedin.png', alt: 'LinkedIn', label: 'in' },
  { src: '/asset/s2/github.png', alt: 'GitHub', label: 'GitHub' },
  { src: '/asset/s2/instagram.png', alt: 'Instagram', label: 'Instagram' },
];

const skills = [
  { name: 'Design', level: 87 },
  { name: 'Code', level: 68 },
  { name: 'Devops', level: 72 },
];

const TOOL_ICONS: Record<string, JSX.Element> = {
  figma: (
    // Figma official SVG
    <svg viewBox="0 0 38 57" className="h-11 w-auto" aria-label="Figma" role="img">
      <path fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0Z" />
      <path fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0Z" />
      <path fill="#ff7262" d="M19 0v19H9.5a9.5 9.5 0 0 1 0-19H19Z" />
      <path fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5Z" />
      <path fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5Z" />
    </svg>
  ),
  vscode: (
    // VS Code official SVG
    <svg viewBox="0 0 100 100" className="h-11 w-11" aria-label="Visual Studio Code" role="img">
      <mask id="vsc-mask">
        <path fill="#fff" d="M74.1 3.3 29.7 44.6 12.6 31.2 3 36.8v26.4l9.6 5.6 17.5-13.8 43.9 41.7 22.9-11V14.3L74.1 3.3zm.5 67L50 48.7l24.6-21.6V70.3z" />
      </mask>
      <path fill="#0065A9" d="M97 14.3 74.6 3.3 29.7 44.6 12.6 31.2 3 36.8v26.4l9.6 5.6 17.5-13.8 44.4 41.7L97 85.7V14.3z" />
      <path fill="#007ACC" mask="url(#vsc-mask)" d="M97 14.3 74.6 3.3 29.7 44.6 12.6 31.2 3 36.8v26.4l9.6 5.6 17.5-13.8 44.4 41.7L97 85.7V14.3z" />
      <path fill="#1F9CF0" mask="url(#vsc-mask)" d="M74.6 96.7c6.2 2.5 22.4-11 22.4-11V14.3s-16.2-13.5-22.4-11c4.8 3 4.8 90.4 0 93.4z" />
    </svg>
  ),
  illustrator: (
    // Adobe Illustrator
    <span
      className="grid h-11 w-11 place-items-center rounded-[0.55rem] font-serif text-xl font-bold leading-none"
      style={{ background: '#300' , color: '#ff9a00' }}
      aria-label="Adobe Illustrator"
    >
      Ai
    </span>
  ),
  aftereffects: (
    // Adobe After Effects
    <span
      className="grid h-11 w-11 place-items-center rounded-[0.55rem] font-serif text-xl font-bold leading-none"
      style={{ background: '#1a0040', color: '#9999ff' }}
      aria-label="Adobe After Effects"
    >
      Ae
    </span>
  ),
};

function ToolIcon({ name }: { name: string }) {
  return TOOL_ICONS[name] ?? (
    <span className="grid h-11 w-11 place-items-center rounded-[0.55rem] bg-black/10 font-mono text-xs">{name}</span>
  );
}

export function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="relative w-full overflow-hidden bg-[#f4f3f1] px-6 py-20 text-[#111111] md:pl-60 md:pr-10 lg:pr-14"
    >
      {/* Decorative doodles */}
      <Image
        src="/asset/s2/asterisk.png"
        alt=""
        width={924}
        height={956}
        className="pointer-events-none absolute top-14 left-0 w-10 opacity-70 select-none md:w-14"
      />
      <Image
        src="/asset/s2/doodle-square.png"
        alt=""
        width={125}
        height={152}
        className="pointer-events-none absolute top-1/3 right-6 w-14 opacity-80 select-none lg:w-20"
      />
      <Image
        src="/asset/s2/doodle-triangle.png"
        alt=""
        width={248}
        height={231}
        className="pointer-events-none absolute right-16 bottom-24 w-20 opacity-80 select-none lg:w-28"
      />

      <div className="relative mx-auto w-full max-w-[90rem]">
        {/* ── Top: intro + portrait ───────────────────────────── */}
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start lg:gap-14">
          <div className="min-w-0 pl-6 sm:pl-10 md:pl-0">
            <p className="font-serif text-xs tracking-[0.18em] text-black/70 uppercase italic">
              Portofolio
            </p>
            <h2 className="mt-4 font-serif text-[2.6rem] leading-[1.05] font-bold text-black sm:text-[3.4rem] lg:text-[4.1rem]">
              Hello/Holla.
              <br />
              I&apos;m Kinar Aurasae
            </h2>

            <div className="mt-8 h-0.5 w-full bg-black" />

            <p className="mt-8 font-sans text-xs font-bold tracking-[0.14em] text-black uppercase">
              DevOps, Web Developer &amp; Designer
            </p>
            <p className="mt-4 max-w-xl font-serif text-base leading-relaxed font-medium text-black/90">
              Perkenalkan nama saya Kinar Aurasae, saya adalah Designer sekaligus Web Developer
              dengan membangun web antarmuka yang rapi, cepat dan mudah digunakan. Fokus saya adalah
              pada frontend, motion yang terasa halus, deployment yang stabil, dan detail kecil
              yang membuat portofolio terasa hidup.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex h-16 items-center gap-7 rounded-full bg-[#111111] px-7">
                {socials.map((s) => (
                  <a key={s.alt} href="#" aria-label={s.alt} className="block h-5 w-5">
                    <Image
                      src={s.src}
                      alt={s.alt}
                      width={38}
                      height={38}
                      className="h-5 w-5 brightness-0 invert"
                    />
                  </a>
                ))}
              </div>

              <a
                href="#work"
                className="flex h-16 items-center gap-3 rounded-full border-2 border-black pr-3 pl-7 transition-colors hover:bg-black hover:text-white"
              >
                <span className="font-serif text-lg italic">Look websites</span>
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
          </div>

          {/* Portrait */}
          <div className="relative mx-auto w-full max-w-64 sm:max-w-72">
            <div className="absolute -inset-3 rounded-[1.6rem] border-2 border-dashed border-black/70" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem] bg-[#d8d8d8]">
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
              className="pointer-events-none absolute -top-6 -right-6 select-none text-[5rem] leading-none text-red-500"
            >
              ✱
            </span>
          </div>
        </div>

        {/* ── Bottom: skills + tools ──────────────────────────── */}
        <div className="mt-24 grid gap-14 md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] md:gap-16">
          <div className="min-w-0">
            <div className="flex items-baseline gap-5">
              <span className="font-serif text-2xl text-black/45">01</span>
              <h3 className="font-serif text-4xl font-bold text-black sm:text-5xl">My Skill&apos;s</h3>
            </div>
            <div className="mt-5 h-0.5 w-full bg-black" />

            <div className="mt-8 space-y-7">
              {skills.map((s) => (
                <div key={s.name}>
                  <p className="font-serif text-base font-bold text-black">{s.name}</p>
                  <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-[#a0a0a0]">
                    <div className="h-full rounded-full bg-black" style={{ width: `${s.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="font-serif text-4xl font-bold text-black sm:text-5xl">My Tool&apos;s</h3>
            <div className="mt-5 h-0.5 w-full bg-black" />

            <div className="mt-8 rounded-[1.1rem] border-2 border-dashed border-black/35 p-6">
              <div className="flex flex-wrap items-center gap-6">
                <ToolIcon name="figma" />
                <ToolIcon name="vscode" />
                <ToolIcon name="illustrator" />
                <ToolIcon name="aftereffects" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
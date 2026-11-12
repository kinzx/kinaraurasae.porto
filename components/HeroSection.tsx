'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import type { MouseEvent } from 'react';

const floaters = [
  { mark: '*', className: 'left-[9%] top-[19%] text-6xl', delay: 0 },
  { mark: '+', className: 'right-[15%] top-[18%] text-5xl', delay: 0.8 },
  { mark: '01', className: 'left-[17%] bottom-[23%] text-4xl', delay: 1.4 },
  { mark: '/', className: 'right-[11%] bottom-[22%] text-7xl', delay: 0.4 },
];

export function HeroSection() {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 45, damping: 22 });
  const y = useSpring(rawY, { stiffness: 45, damping: 22 });

  const move = (event: MouseEvent<HTMLElement>) => {
    rawX.set((event.clientX - window.innerWidth / 2) * 0.03);
    rawY.set((event.clientY - window.innerHeight / 2) * 0.03);
  };

  return (
    <section
      id="intro"
      onMouseMove={move}
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-[#050505] px-6 pt-16 text-white"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-y-0 left-1/2 w-px bg-white/10" />
        <div className="absolute top-1/2 right-0 left-0 h-px bg-white/10" />
        {floaters.map((item) => (
          <motion.span
            key={item.className}
            className={`absolute font-serif text-white/15 ${item.className}`}
            animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
            transition={{
              delay: item.delay,
              duration: 7,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
          >
            {item.mark}
          </motion.span>
        ))}
      </div>

      <motion.div
        style={{ x, y }}
        className="relative z-10 flex cursor-default flex-col items-center gap-6 text-center"
      >
        <span className="rounded-full border border-[#FFB200]/40 px-4 py-1.5 font-mono text-xs tracking-widest text-[#FFB200] uppercase">
          WELCOME TO MY
        </span>
        <h1 className="font-serif text-6xl leading-none font-bold text-white sm:text-8xl md:text-9xl lg:text-[10rem]">
          Portfolio.
        </h1>
        <p className="font-mono text-xs tracking-widest text-white/60 uppercase">
          DEVOPS, WEB DEVELOPER & DESIGNER
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="#work"
            className="rounded-full bg-white px-6 py-3 font-serif text-xs font-semibold text-black transition-opacity hover:opacity-85"
          >
            Lihat Proyek
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/20 bg-white/5 px-6 py-3 font-serif text-xs font-semibold text-white transition-colors hover:bg-white/15"
          >
            Hubungi Saya
          </a>
        </div>
      </motion.div>
    </section>
  );
}

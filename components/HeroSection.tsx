'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';

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

  const move = (event: React.MouseEvent<HTMLElement>) => {
    rawX.set((event.clientX - window.innerWidth / 2) * 0.03);
    rawY.set((event.clientY - window.innerHeight / 2) * 0.03);
  };

  return (
    <section
      onMouseMove={move}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#050505] px-6 text-white"
    >
      <nav className="absolute top-6 right-6 left-6 z-20 flex justify-between font-mono text-xs font-medium tracking-widest text-white/70 uppercase md:top-8 md:right-8 md:left-8">
        <div className="flex gap-5 md:gap-8">
          <a href="#work" className="transition-opacity hover:opacity-60">
            Work
          </a>
          <a href="#about" className="transition-opacity hover:opacity-60">
            About
          </a>
        </div>
        <div className="flex gap-5 md:gap-8">
          <a href="#contact" className="transition-opacity hover:opacity-60">
            Hello
          </a>
          <span>*</span>
        </div>
      </nav>

      <div className="absolute right-6 bottom-6 left-6 z-20 flex justify-between font-mono text-xs font-medium tracking-widest text-white/45 uppercase md:right-8 md:bottom-8 md:left-8">
        <span>Portfolio</span>
        <span>Scroll</span>
      </div>

      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-y-0 left-1/2 w-px bg-white/10" />
        <div className="absolute top-1/2 right-0 left-0 h-px bg-white/10" />
        {floaters.map((item) => (
          <motion.span
            key={item.className}
            className={`absolute font-serif text-white/14 ${item.className}`}
            animate={{ y: [0, -34, 0], rotate: [0, 12, 0] }}
            transition={{
              delay: item.delay,
              duration: 8,
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
        className="relative z-10 flex cursor-default flex-col items-center gap-5 text-center"
        animate={{ scale: [1, 1.015, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <p className="font-mono text-xs tracking-widest text-white/45 uppercase">
          Monochrome Portfolio
        </p>
        <h1 className="font-serif text-6xl leading-none font-bold text-white sm:text-8xl md:text-9xl lg:text-[10rem]">
          Kinar.
        </h1>
        <p className="max-w-lg text-sm leading-7 text-white/58 md:text-base">
          A quiet, scroll-led portfolio frame for selected work, profile, and contact.
        </p>
      </motion.div>
    </section>
  );
}

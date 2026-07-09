'use client';

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  type Transition,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'framer-motion';
import { useState, type MouseEvent } from 'react';
import { AiChat } from './AiChat';

const floaters = [
  { mark: '*', className: 'left-[9%] top-[19%] text-6xl', delay: 0 },
  { mark: '+', className: 'right-[15%] top-[18%] text-5xl', delay: 0.8 },
  { mark: '01', className: 'left-[17%] bottom-[23%] text-4xl', delay: 1.4 },
  { mark: '/', className: 'right-[11%] bottom-[22%] text-7xl', delay: 0.4 },
];

const navLinks = [
  { label: 'intro', href: '#intro' },
  { label: 'profile', href: '#profile' },
  { label: 'work', href: '#work' },
  { label: 'contact', href: '#contact' },
];
const navTransition: Transition = {
  type: 'spring',
  stiffness: 280,
  damping: 34,
  mass: 0.8,
};

export function HeroSection() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('intro');
  const { scrollY } = useScroll();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 45, damping: 22 });
  const y = useSpring(rawY, { stiffness: 45, damping: 22 });

  // Scroll state drives the nav morph: top name pill before 100px,
  // editorial sidebar on desktop and compact bottom nav on mobile after it.
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 100);
    const active = [...navLinks]
      .reverse()
      .find(({ href }) => {
        const section = document.querySelector(href);
        return section && section.getBoundingClientRect().top <= window.innerHeight * 0.45;
      });
    if (active) setActiveLink(active.label);
  });

  const move = (event: MouseEvent<HTMLElement>) => {
    rawX.set((event.clientX - window.innerWidth / 2) * 0.03);
    rawY.set((event.clientY - window.innerHeight / 2) * 0.03);
  };

  return (
    <section
      id="intro"
      onMouseMove={move}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#050505] px-6 text-white"
    >
      <LayoutGroup>
        <AnimatePresence mode="popLayout" initial={false}>
          {!isScrolled ? (
            <motion.nav
              key="top-nav"
              layoutId="nav-shell"
              transition={navTransition}
              className="fixed top-6 left-1/2 z-30 flex -translate-x-1/2 items-center justify-center rounded-full border border-white/10 bg-[#050505]/50 px-5 py-3 font-mono text-xs tracking-widest text-white/75 uppercase backdrop-blur-md will-change-transform"
            >
              {/* layoutId keeps the brand visually connected during the nav morph. */}
              <motion.a layoutId="nav-brand" href="#intro" className="whitespace-nowrap">
                kinar.aurasae
              </motion.a>
            </motion.nav>
          ) : (
            <motion.nav
              key="morphed-nav"
              layoutId="nav-shell"
              transition={navTransition}
              className="fixed right-4 bottom-4 left-4 z-30 flex items-center justify-between rounded-full border border-white/10 bg-[#050505]/82 px-5 py-3 font-mono text-[0.68rem] tracking-widest text-white/72 uppercase shadow-2xl shadow-black/40 backdrop-blur-md will-change-transform md:top-0 md:right-auto md:bottom-0 md:left-0 md:w-44 md:flex-col md:items-start md:justify-start md:gap-14 md:rounded-none md:border-y-0 md:border-l-0 md:bg-black/95 md:px-6 md:py-7"
            >
              <motion.a layoutId="nav-brand" href="#intro" className="whitespace-nowrap text-white">
                kinar.aurasae
              </motion.a>
              <div className="relative flex gap-3 md:ml-1 md:flex-col md:gap-6">
                <span className="absolute top-2 bottom-2 left-[0.34rem] hidden w-px bg-white/25 md:block" />
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setActiveLink(link.label)}
                    className="relative flex items-center transition-opacity hover:opacity-60 md:pl-7"
                  >
                    {activeLink === link.label && (
                      <motion.span
                        layoutId="sidebar-active-dot"
                        transition={navTransition}
                        className="absolute top-1/2 left-0 hidden h-3 w-3 -translate-y-1/2 rounded-full bg-white md:block"
                      />
                    )}
                    {link.label}
                  </a>
                ))}
              </div>
              <AiChat />
            </motion.nav>
          )}
        </AnimatePresence>
      </LayoutGroup>

      <div className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2">
        <motion.a
          href="#profile"
          aria-label="Scroll to profile"
          className="flex h-24 w-14 flex-col items-center justify-center gap-2 rounded-full bg-white font-serif text-xs text-black shadow-2xl shadow-black/35"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity }}
          whileHover={{ y: -8 }}
          onClick={() => setActiveLink('profile')}
        >
          <span>Scroll</span>
          <span className="text-5xl leading-none">&darr;</span>
        </motion.a>
      </div>

      <div
        className={`absolute right-6 bottom-6 left-6 z-20 flex justify-between font-mono text-xs font-medium tracking-widest text-white/45 uppercase transition-[left,opacity,transform] duration-500 md:right-8 md:bottom-8 ${
          isScrolled ? 'translate-y-[-4.5rem] opacity-40 md:left-48' : 'md:left-8'
        }`}
      >
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
          Welcome to my
        </p>
        <h1 className="font-serif text-6xl leading-none font-bold text-white sm:text-8xl md:text-9xl lg:text-[10rem]">
          Portfolio.
        </h1>
        <p className="max-w-lg text-sm leading-7 text-white/58 md:text-base">
          A quiet, scroll-led portfolio frame for selected work, profile, and contact.
        </p>
      </motion.div>
    </section>
  );
}

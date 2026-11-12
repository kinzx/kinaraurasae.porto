'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { MagnifyingGlass, List, X, CaretDown, Hexagon } from '@phosphor-icons/react';

const navLinks = [
  { label: 'intro', href: '#intro' },
  { label: 'profile', href: '#profile' },
  { label: 'projects', href: '#work' },
  { label: 'contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('intro');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  // Pengganti window.addEventListener('scroll') yang dilarang taste skill §5.D
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 20);
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#intro';
      const link = navLinks.find((l) => l.href === hash);
      if (link) setActiveLink(link.label);
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openSearch = () => {
    window.dispatchEvent(new CustomEvent('open-search-palette'));
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-6 right-0 left-0 z-50 flex justify-center px-4"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Pill wrapper */}
      <div
        className={`flex h-14 w-full max-w-3xl items-center justify-between rounded-full border px-2 transition-all duration-300 ${
          isScrolled
            ? 'border-black/5 bg-white/95 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl'
            : 'border-white/30 bg-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-md'
        }`}
      >
        {/* Logo mark: pill circle dengan ikon custom */}
        <a
          href="#intro"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('#intro');
          }}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E2C275] text-black"
          aria-label="Kinar Aurasae, Home"
        >
          <Hexagon weight="bold" className="h-5 w-5" />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex md:items-center md:gap-1">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
                setActiveLink(link.label);
              }}
              className="relative rounded-full px-4 py-2 font-sans text-sm font-medium text-black/70 transition-colors hover:text-black"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <motion.button
            onClick={openSearch}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex h-9 items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 text-black/65 transition-colors hover:bg-white hover:text-black"
            aria-label="Search portfolio (Command K)"
          >
            <MagnifyingGlass weight="bold" className="h-4 w-4" />
            <span className="hidden font-mono text-xs sm:inline">Search...</span>
            <kbd className="hidden rounded border border-black/10 bg-black/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-black/55 sm:inline">
              Ctrl K
            </kbd>
          </motion.button>

          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            className="flex h-9 w-9 items-center justify-center rounded-full text-black/60 transition-colors hover:bg-black/5 hover:text-black md:hidden"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X weight="bold" className="h-4 w-4" />
            ) : (
              <List weight="bold" className="h-4 w-4" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu (di luar pill wrapper, muncul di bawahnya) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 right-4 left-4 mx-auto max-w-3xl overflow-hidden rounded-2xl border border-black/5 bg-white/95 p-2 shadow-xl backdrop-blur-xl md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                  setActiveLink(link.label);
                }}
                className={`block rounded-xl px-4 py-3 font-sans text-sm font-medium transition-colors ${
                  activeLink === link.label
                    ? 'bg-black/5 text-black'
                    : 'text-black/70 hover:bg-black/5'
                }`}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

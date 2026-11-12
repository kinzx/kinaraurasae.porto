'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const designs = [
  'image 150.png',
  'image 151.png',
  'image 152.png',
  'image 153.png',
  'image 154.png',
  'image 155.png',
  'image 156.png',
  'image 157.png',
  'image 159.png',
];

const getOffset = (index: number, activeIndex: number) => {
  const distance = index - activeIndex;
  const wrappedDistance = ((distance + designs.length / 2) % designs.length) - designs.length / 2;

  return {
    x: wrappedDistance * 92,
    y: Math.abs(wrappedDistance) * 8,
    rotate: wrappedDistance * 4,
    scale: wrappedDistance === 0 ? 1 : Math.max(0.72, 1 - Math.abs(wrappedDistance) * 0.08),
    opacity:
      Math.abs(wrappedDistance) > 3 ? 0 : Math.max(0.35, 1 - Math.abs(wrappedDistance) * 0.2),
    zIndex: designs.length - Math.abs(wrappedDistance),
  };
};

export function DesignGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selectedIndex !== null && !dialog.open) dialog.showModal();
    if (selectedIndex === null && dialog.open) dialog.close();
  }, [selectedIndex]);

  return (
    <section
      id="designs"
      className="relative overflow-hidden bg-[#050505] px-6 py-28 text-white"
      aria-labelledby="design-gallery-title"
    >
      <div className="mx-auto max-w-[90rem]">
        <div className="max-w-2xl">
          <p className="font-mono text-xs tracking-widest text-[#FFB200] uppercase">Design work</p>
          <h2
            id="design-gallery-title"
            className="mt-3 font-serif text-5xl font-bold tracking-tight md:text-7xl"
          >
            Visual experiments.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
            Kumpulan eksplorasi visual, layout, dan interface yang saya kerjakan.
          </p>
        </div>

        {reduceMotion ? (
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {designs.map((design, index) => (
              <button
                key={design}
                type="button"
                aria-label={`Open design ${index + 1}`}
                onClick={() => setSelectedIndex(index)}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left focus-visible:ring-2 focus-visible:ring-[#FFB200]"
              >
                <Image
                  src={`/asset/${design}`}
                  alt={`Design exploration ${index + 1}`}
                  width={1200}
                  height={1500}
                  loading="lazy"
                  className="h-auto w-full object-cover"
                />
              </button>
            ))}
          </div>
        ) : (
          <div className="relative mt-16 flex min-h-[34rem] items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a] px-4 py-12 sm:min-h-[42rem]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,178,0,0.09),transparent_42%)]" />

            <div className="relative flex h-[27rem] w-full max-w-5xl items-center justify-center sm:h-[34rem]">
              {designs.map((design, index) => {
                const position = getOffset(index, activeIndex);
                const isActive = index === activeIndex;

                return (
                  <motion.button
                    key={design}
                    type="button"
                    aria-label={`Show design ${index + 1}`}
                    aria-pressed={isActive}
                    onClick={() => {
                      setActiveIndex(index);
                      setSelectedIndex(index);
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.18}
                    onDragEnd={(_, info) => {
                      if (Math.abs(info.offset.x) < 40) return;
                      setActiveIndex((current) =>
                        info.offset.x < 0
                          ? (current + 1) % designs.length
                          : (current - 1 + designs.length) % designs.length,
                      );
                    }}
                    animate={position}
                    transition={{ type: 'spring', stiffness: 180, damping: 24 }}
                    className={`absolute aspect-[3/4] w-[min(62vw,18rem)] cursor-grab touch-pan-y overflow-hidden rounded-2xl border bg-[#111111] text-left shadow-2xl shadow-black/50 transition-[border-color,box-shadow] outline-none focus-visible:ring-2 focus-visible:ring-[#FFB200] active:cursor-grabbing sm:w-[min(34vw,22rem)] ${
                      isActive ? 'border-[#FFB200]/70 shadow-[#FFB200]/10' : 'border-white/15'
                    }`}
                  >
                    <Image
                      src={`/asset/${design}`}
                      alt={`Design exploration ${index + 1}`}
                      fill
                      sizes="(min-width: 640px) 22rem, 62vw"
                      loading={isActive ? 'eager' : 'lazy'}
                      className="object-cover"
                    />
                    <span className="absolute right-3 bottom-3 left-3 font-mono text-[10px] tracking-widest text-white/70 uppercase">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <div className="absolute right-6 bottom-6 left-6 flex items-center justify-between sm:right-10 sm:left-10">
              <span className="font-mono text-xs tracking-widest text-white/45 uppercase">
                Click any design
              </span>
              <div className="flex gap-1.5" aria-label="Select design">
                {designs.map((design, index) => (
                  <button
                    key={design}
                    type="button"
                    aria-label={`Select design ${index + 1}`}
                    aria-pressed={index === activeIndex}
                    onClick={() => setActiveIndex(index)}
                    className={`h-1.5 rounded-full transition-[width,background-color] ${
                      index === activeIndex
                        ? 'w-8 bg-[#FFB200]'
                        : 'w-1.5 bg-white/25 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.p
            key={activeIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-5 text-right font-mono text-xs tracking-widest text-white/40 uppercase"
          >
            {String(activeIndex + 1).padStart(2, '0')} / {String(designs.length).padStart(2, '0')}
          </motion.p>
        </AnimatePresence>
      </div>

      <dialog
        ref={dialogRef}
        aria-label={`Design ${selectedIndex === null ? '' : selectedIndex + 1}`}
        onClose={() => setSelectedIndex(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setSelectedIndex(null);
        }}
        className="fixed inset-0 m-auto max-h-[92dvh] max-w-[96vw] overflow-visible border-0 bg-transparent p-0 text-white backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        {selectedIndex !== null && (
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (Math.abs(info.offset.x) < 50) return;
              const nextIndex =
                (selectedIndex + (info.offset.x < 0 ? 1 : -1) + designs.length) % designs.length;
              setSelectedIndex(nextIndex);
              setActiveIndex(nextIndex);
            }}
            className="relative flex h-[88dvh] w-[min(92vw,80rem)] touch-pan-y items-center justify-center"
          >
            <button
              type="button"
              autoFocus
              aria-label="Close design preview"
              onClick={() => setSelectedIndex(null)}
              className="absolute top-3 right-3 z-10 rounded-full border border-white/20 bg-black/70 px-4 py-2 font-mono text-xs tracking-widest uppercase hover:bg-white hover:text-black focus-visible:ring-2 focus-visible:ring-[#FFB200]"
            >
              Close
            </button>
            <button
              type="button"
              aria-label="Previous design"
              onClick={() => {
                const nextIndex = (selectedIndex - 1 + designs.length) % designs.length;
                setSelectedIndex(nextIndex);
                setActiveIndex(nextIndex);
              }}
              className="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/70 px-3 py-2 text-xl hover:bg-white hover:text-black focus-visible:ring-2 focus-visible:ring-[#FFB200] sm:left-4"
            >
              ‹
            </button>
            <Image
              src={`/asset/${designs[selectedIndex]}`}
              alt={`Design exploration ${selectedIndex + 1}`}
              fill
              sizes="92vw"
              className="pointer-events-none object-contain"
              priority
            />
            <button
              type="button"
              aria-label="Next design"
              onClick={() => {
                const nextIndex = (selectedIndex + 1) % designs.length;
                setSelectedIndex(nextIndex);
                setActiveIndex(nextIndex);
              }}
              className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/70 px-3 py-2 text-xl hover:bg-white hover:text-black focus-visible:ring-2 focus-visible:ring-[#FFB200] sm:right-4"
            >
              ›
            </button>
          </motion.div>
        )}
      </dialog>
    </section>
  );
}

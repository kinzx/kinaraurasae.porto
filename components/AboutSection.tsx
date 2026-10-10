'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
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
    </section>
  );
}

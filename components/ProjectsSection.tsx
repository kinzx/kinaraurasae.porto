'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProjectItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  githubUrl?: string;
  figmaUrl?: string;
  demoUrl?: string;
}

const projects: ProjectItem[] = [
  {
    id: 'unitrade',
    number: '01',
    title: 'UniTrade',
    description:
      'UniTrade adalah marketplace C2C berbasis Odoo 17 untuk mahasiswa Yogyakarta. Platform ini membantu user terdaftar membeli produk, menyimpan wishlist, chat dengan seller, melakukan pembayaran, dan memberi review. Verifikasi seller menggunakan KTM.',
    tags: ['Odoo 17', 'Python', 'PostgreSQL', 'Tailwind CSS'],
    image: '/asset/Rectangle 73.png',
    githubUrl: 'https://github.com/Rezkydesyafa/sakoo-finance-bot',
    figmaUrl:
      'https://www.figma.com/design/WFxsRLUF5BBclmR8oauhpK/Kelompok-1-Teh-Poci-A1?node-id=1-2&t=oVmCRM0H8uK4pSSJ-1',
  },
  {
    id: 'teh-poci',
    number: '02',
    title: 'WEB UMKM Teh Poci',
    description:
      'Eksplorasi antarmuka digital modern untuk UMKM Teh Poci. Mengedepankan visual segar, katalog produk interaktif, dan kemudahan navigasi bagi pelanggan lokal.',
    tags: ['UI/UX', 'Figma', 'Next.js', 'Tailwind CSS'],
    image: '/asset/image 125.png',
    figmaUrl:
      'https://www.figma.com/design/WFxsRLUF5BBclmR8oauhpK/Kelompok-1-Teh-Poci-A1?node-id=1-2&t=oVmCRM0H8uK4pSSJ-1',
  },
  {
    id: 'sakoo',
    number: '03',
    title: 'Sakoo Finance Bot',
    description:
      'Personal finance assistant berbasis WhatsApp, Telegram, dan Web Dashboard. Terintegrasi dengan FastAPI, Celery, WAHA, PostgreSQL, Redis, dan Docker Compose.',
    tags: ['FastAPI', 'Next.js', 'Docker', 'PostgreSQL', 'Redis'],
    image: '/asset/image 148.png',
    githubUrl: 'https://github.com/Rezkydesyafa/sakoo-finance-bot',
    demoUrl: 'https://sakoo.lab-sigma.web.id/',
  },
  {
    id: 'qr-maker',
    number: '04',
    title: 'Qr-Maker',
    description:
      'Aplikasi web praktis untuk membuat QR Code secara instan dengan tema dark mode elegan, clean, dan fokus pada kecepatan alur kerja developer.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Docker'],
    image: '/asset/image 147.png',
    githubUrl: 'https://github.com/kinzx/Qr-maker',
  },
];

export function ProjectsSection() {
  return (
    <section
      id="work"
      className="relative w-full overflow-hidden bg-[#050505] px-6 py-24 text-white lg:pr-14 lg:pl-60"
    >
      <div className="mx-auto max-w-[90rem]">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-3"
        >
          <p className="font-mono text-xs tracking-widest text-white/50 uppercase">Selected Work</p>
          <h2 className="font-serif text-5xl font-bold tracking-tight text-white md:text-6xl">
            Projects.
          </h2>
          <div className="mt-4 h-px w-full bg-white/15" />
        </motion.div>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          {projects.map((project, index) => {
            const fromLeft = index % 2 === 0;
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, x: fromLeft ? -60 : 60, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0c0c0c] p-7 transition-colors hover:border-white/30"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl font-bold text-white/30">
                      {project.number}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[0.7rem] text-white/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="relative mt-6 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-white/5">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 45vw, 90vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="mt-6 font-serif text-3xl font-bold text-white">{project.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    {project.description}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3 pt-4">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-serif text-xs font-semibold text-black transition-opacity hover:opacity-85"
                    >
                      Live Demo &rarr;
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 font-serif text-xs text-white transition-colors hover:bg-white/15"
                    >
                      GitHub
                    </a>
                  )}
                  {project.figmaUrl && (
                    <a
                      href={project.figmaUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 font-serif text-xs text-white transition-colors hover:bg-white/15"
                    >
                      Figma
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

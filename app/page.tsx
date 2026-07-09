import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <AboutSection />

      <footer
        id="contact"
        className="relative min-h-screen overflow-hidden bg-[#050505] px-6 text-[#111111] md:pl-60"
      >
        <div className="absolute bottom-0 left-0 h-[113vw] max-h-[58rem] min-h-[34rem] w-[112vw] max-w-[58rem] min-w-[34rem] -translate-x-1/3 translate-y-1/4 rounded-full bg-[#f4f4f4] md:left-60" />
        <div className="relative z-10 flex min-h-screen max-w-lg flex-col justify-between py-24">
          <div className="max-w-md pt-10">
            <h2 className="font-serif text-3xl font-bold">kinaraurasae.</h2>
            <p className="mt-7 font-serif text-base leading-5">
              Portfolio pribadi untuk karya web, eksperimen antarmuka, motion, dan deployment.
              Terbuka untuk kolaborasi frontend, desain web, dan sistem yang butuh tampil rapi.
            </p>
          </div>
          <div>
            <p className="font-serif text-6xl italic text-black/85 md:text-7xl">@2026</p>
            <p className="mt-6 text-lg">kinaraurasae.</p>
          </div>
        </div>
        <div className="absolute top-28 right-12 hidden h-80 w-px bg-white/80 md:block" />
        <a
          href="#"
          className="absolute right-8 bottom-8 z-20 flex h-28 w-14 flex-col items-center justify-center gap-3 rounded-full bg-[#f4f4f4] font-serif text-xs text-black transition-transform hover:-translate-y-2"
          aria-label="Back to top"
        >
          <span className="text-4xl leading-none">&uarr;</span>
          Back
        </a>
      </footer>
    </main>
  );
}

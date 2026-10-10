import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { PortfolioSection } from '../components/PortfolioSection';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <PortfolioSection />
      <AboutSection />

      <footer
        id="contact"
        className="relative min-h-screen overflow-hidden bg-[#f4f4f4] px-6 text-[#111111] lg:bg-[#050505] lg:pl-60"
      >
        {/* ponytail: the circle only covers the lower half, so dark-on-light type
            drifts onto black below ~1024px. Mobile uses a solid light panel instead;
            restore the circle shape only if the footer grows a light backdrop. */}
        <div className="absolute bottom-0 left-0 hidden h-[113vw] max-h-[58rem] min-h-[34rem] w-[112vw] max-w-[58rem] min-w-[34rem] -translate-x-1/3 translate-y-1/4 rounded-full bg-[#f4f4f4] lg:block lg:left-60" />
        <div className="relative z-10 flex min-h-screen max-w-lg flex-col justify-between py-24">
          {/* ponytail: the light circle only reaches the lower half, so at lg the
              top block sits on black and needs light type; below lg the whole
              footer is a light panel and the dark type stays correct. */}
          <div className="max-w-md pt-10">
            <h2 className="font-serif text-3xl font-bold text-[#111111] lg:text-[#f4f4f4]">
              kinaraurasae.
            </h2>
            <p className="mt-7 font-serif text-base leading-5 text-[#111111] lg:text-[#f4f4f4]/70">
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
          className="absolute right-8 bottom-8 z-20 flex h-28 w-14 flex-col items-center justify-center gap-3 rounded-full bg-[#111111] font-serif text-xs text-white transition-transform hover:-translate-y-2 lg:bg-[#f4f4f4] lg:text-black"
          aria-label="Back to top"
        >
          <span className="text-4xl leading-none">&uarr;</span>
          Back
        </a>
      </footer>
    </main>
  );
}

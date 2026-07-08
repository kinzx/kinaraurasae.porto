import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <AboutSection />

      <footer
        id="contact"
        className="flex min-h-screen items-center justify-center border-t border-white/10 bg-[#050505] px-6 text-center text-white"
      >
        <p className="font-mono text-sm tracking-widest text-white/60 uppercase">
          Contact / portfolio details coming soon test
        </p>
      </footer>
    </main>
  );
}

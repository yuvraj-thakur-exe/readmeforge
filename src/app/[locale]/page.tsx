'use client';

import { Link } from '#/i18n/navigation';
import { TopNav } from '#/components/navigation/TopNav';
import { HeroSection } from '#/components/landing/HeroSection';
import { ParticleBackground } from '#/components/landing/ParticleBackground';
import { KineticMarquee } from '#/components/landing/KineticMarquee';
import { CyberMonkeyMascot } from '#/components/mascot/CyberMonkeyMascot';
import { KineticStickerDock } from '#/components/mascot/KineticStickerDock';
import { DeviceShowcase } from '#/components/showcase/DeviceShowcase';
import { ProfileTransformationDeck } from '#/components/showcase/ProfileTransformationDeck';
import { DesignTokensPlayground } from '#/components/showcase/DesignTokensPlayground';
import { TelemetryArsenalGrid } from '#/components/showcase/TelemetryArsenalGrid';
import { TemplateGallery } from '#/components/landing/TemplateGallery';
import { LandingDetails } from '#/components/landing/LandingDetails';
import { MonoForgeMonkeyIcon } from '#/components/common/MonoForgeLogo';
import { Github, BookOpen, BarChart3, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#faf9f6] text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 selection:bg-amber-500/20 selection:text-amber-900 dark:selection:text-amber-200 overflow-x-hidden font-sans transition-colors duration-200">
      {/* Subtle ambient lighting - Warm Porcelain & Amber with clean accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[450px] bg-gradient-to-b from-amber-400/[0.04] dark:from-neutral-800/20 via-transparent to-transparent blur-3xl opacity-60" />
        <div className="absolute top-[25%] -left-60 w-[500px] h-[500px] bg-amber-400/[0.03] dark:bg-amber-500/[0.03] blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-[50%] -right-60 w-[500px] h-[500px] bg-cyan-400/[0.03] dark:bg-cyan-500/[0.03] blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-[75%] -left-60 w-[500px] h-[500px] bg-emerald-400/[0.03] dark:bg-emerald-500/[0.03] blur-[140px] rounded-full pointer-events-none" />
      </div>

      <TopNav />

      {/* High-Impact Kinetic Marquee (NoMonkey inspiration) */}
      <KineticMarquee speed="fast" />

      {/* Hero with interactive particles */}
      <div className="relative overflow-hidden border-b border-neutral-200/90 dark:border-neutral-800/80">
        <ParticleBackground />
        <HeroSection />
      </div>

      {/* 1. Cyber Monkey Mascot Spotlight (NoMonkey inspiration) */}
      <section className="relative z-10 border-b border-neutral-200/90 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-950/70 backdrop-blur-md py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5 font-mono text-xs text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider">
                <span>[01 // SIGNATURE MASCOT ENGINE]</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400" />
                <span className="text-neutral-500">INSPIRED BY NOMONKEY.WORK</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
                Zero Monkey Business. Pure Precision Craft.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl mt-1">
                Meet our interactive Cyber Monkey companion. Eyes track your cursor in real time, with toggleable cyber visor, studio beats, and 1-click Camo SVG embedding.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              <span>INTERACTIVE // 60FPS KEYFRAMES</span>
            </div>
          </div>

          <CyberMonkeyMascot />
        </div>
      </section>

      {/* 2. Tactile Sticker Vault (NoMonkey inspiration) */}
      <section className="relative z-10 border-b border-neutral-200/90 dark:border-neutral-800/80 bg-neutral-50/70 dark:bg-neutral-900/30 backdrop-blur-md py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <KineticStickerDock />
        </div>
      </section>

      {/* 3. Device Prototype Matrix (NoMonkey & Poulo inspiration) */}
      <section className="relative z-10 border-b border-neutral-200/90 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-950/70 backdrop-blur-md py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <DeviceShowcase />
        </div>
      </section>

      {/* 4. Transformation Deck Before & After (Poulo inspiration) */}
      <section className="relative z-10 border-b border-neutral-200/90 dark:border-neutral-800/80 bg-neutral-50/70 dark:bg-neutral-900/30 backdrop-blur-md py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <ProfileTransformationDeck />
        </div>
      </section>

      {/* 5. Design Tokens Playground (Marco Madonna inspiration) */}
      <section className="relative z-10 border-b border-neutral-200/90 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-950/70 backdrop-blur-md py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <DesignTokensPlayground />
        </div>
      </section>

      {/* 6. Telemetry Arsenal Encyclopedia (Scraped 40+ Plugins) */}
      <section className="relative z-10 border-b border-neutral-200/90 dark:border-neutral-800/80 bg-neutral-50/70 dark:bg-neutral-900/30 backdrop-blur-md py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <TelemetryArsenalGrid />
        </div>
      </section>

      {/* 7. Telemetry Studio Showcase Banner Strip */}
      <div className="relative z-10 border-b border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/80 backdrop-blur-md py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/70 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-amber-500 dark:text-amber-400 shadow-sm">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                  Developer Telemetry Studio
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                  47+ Plugins Loaded
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Generate 3D isometric commit calendars, coding habits, LeetCode stats, and language charts via SVG or GitHub Actions.
              </p>
            </div>
          </div>

          <Link
            href="/telemetry"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs transition-colors shrink-0 active:scale-95 shadow-sm"
          >
            <span>Open Telemetry Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 8. Curated Star Archetype Starters */}
      <div className="relative z-10 border-b border-neutral-200/90 dark:border-neutral-800/80 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-md">
        <TemplateGallery />
      </div>

      {/* 9. Extended Product Story, Capabilities, Safeguards & FAQ */}
      <div className="relative z-10 border-b border-neutral-200/90 dark:border-neutral-800/80 bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-md">
        <LandingDetails />
      </div>

      {/* Bottom Kinetic Marquee (Reverse Direction) */}
      <KineticMarquee speed="normal" reverse={true} />

      {/* Footer */}
      <footer className="relative z-10 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 py-10 px-4 text-xs text-neutral-600 dark:text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-1 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-amber-500 dark:text-amber-400 shadow-sm">
              <MonoForgeMonkeyIcon className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-neutral-900 dark:text-neutral-200">Mono<span className="text-amber-500 dark:text-amber-400">Forge</span></span>
            <span className="text-neutral-500 hidden md:inline">— Forge an elite GitHub profile that demands attention.</span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="/telemetry"
              className="hover:text-amber-600 dark:hover:text-amber-300 flex items-center gap-1.5 transition-colors font-medium text-amber-600 dark:text-amber-400"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Telemetry Studio</span>
            </Link>
            <Link
              href="/info"
              className="hover:text-emerald-600 dark:hover:text-emerald-300 flex items-center gap-1.5 transition-colors font-medium text-emerald-600 dark:text-emerald-400"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Guide Hub</span>
            </Link>
            <a
              href="https://github.com/yuvraj-thakur-exe/MONOFORGE"
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-900 dark:hover:text-white flex items-center gap-1 transition-colors font-mono"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

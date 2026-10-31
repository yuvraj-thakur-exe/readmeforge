'use client';

import { TopNav } from '#/components/navigation/TopNav';
import { StudioAudioToggle } from '#/components/studio/StudioAudioToggle';
import { NomokeyHero } from '#/components/studio/NomokeyHero';
import { LivePlaygroundBar } from '#/components/studio/LivePlaygroundBar';
import { HowItWorks } from '#/components/studio/HowItWorks';
import { NomokeyMarquee } from '#/components/studio/NomokeyMarquee';
import { StudioBento } from '#/components/studio/StudioBento';
import { TransformationShowcase } from '#/components/studio/TransformationShowcase';
import { NomokeyStickerBoard } from '#/components/studio/NomokeyStickerBoard';
import { CuratedArchetypes } from '#/components/studio/CuratedArchetypes';
import { NomokeyManifesto } from '#/components/studio/NomokeyManifesto';
import { FinalCta } from '#/components/studio/FinalCta';
import { MonoForgeMonkeyIcon } from '#/components/common/MonoForgeLogo';
import { Link } from '#/i18n/navigation';
import { Github, BarChart3, Code2, Sparkles, BookOpen, Film } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-white text-neutral-900 selection:bg-[#ffe600] selection:text-neutral-950 overflow-x-hidden font-sans transition-colors duration-200">
      {/* Floating Lo-Fi Audio Ambience Player */}
      <StudioAudioToggle />

      {/* Navigation Header */}
      <TopNav />

      {/* High-Impact Top Kinetic Marquee */}
      <NomokeyMarquee speed="fast" />

      {/* Flagship Centerpiece: Nomokey Hero with Geometric Monkey Companion */}
      <NomokeyHero />

      {/* Interactive Handle Live Sandbox */}
      <LivePlaygroundBar />

      {/* 6-Step How It Works Guide */}
      <HowItWorks />

      {/* Studio Bento Grid: Telemetry, Monaco IDE, Vector Camo Engines */}
      <StudioBento />

      {/* Transformation Showcase: Night & Day Before/After (Poulo style) */}
      <TransformationShowcase />

      {/* Tactile Sticker Deck (Nomokey style) */}
      <NomokeyStickerBoard />

      {/* Curated Signature Profile Starters (Marco Madonna style) */}
      <CuratedArchetypes />

      {/* The MonoForge Manifesto & Technical FAQ */}
      <NomokeyManifesto />

      {/* Final Conversion CTA: Build a profile worth exploring */}
      <FinalCta />

      {/* Reverse Amber Marquee Footer Strip */}
      <NomokeyMarquee reverse={true} theme="amber" speed="normal" />

      {/* High-Fashion Studio Editorial Footer */}
      <footer className="relative z-10 border-t-2 border-neutral-900 bg-white py-12 px-4 sm:px-6 text-xs text-neutral-700">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-xl bg-white border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] overflow-hidden">
                <MonoForgeMonkeyIcon className="w-8 h-8" />
              </div>
              <div>
                <span className="font-black text-lg tracking-tight text-neutral-950 uppercase font-sans">
                  MONO<span className="text-amber-500">FORGE</span>
                </span>
                <p className="text-[11px] font-mono text-neutral-600">
                  Zero Monkey Business. Pure Precision Profile Engineering.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-bold">
              <Link
                href="/wizard"
                className="hover:text-amber-600 transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>VISUAL STUDIO</span>
              </Link>
              <Link
                href="/developer"
                className="hover:text-cyan-600 transition-colors flex items-center gap-1.5"
              >
                <Code2 className="w-3.5 h-3.5 text-cyan-500" />
                <span>/DEVELOPER IDE</span>
              </Link>
              <Link
                href="/telemetry"
                className="hover:text-amber-600 transition-colors flex items-center gap-1.5"
              >
                <BarChart3 className="w-3.5 h-3.5 text-amber-500" />
                <span>47+ TELEMETRY</span>
              </Link>
              <Link
                href="/animator"
                className="hover:text-purple-600 transition-colors flex items-center gap-1.5"
              >
                <Film className="w-3.5 h-3.5 text-purple-500" />
                <span>SVG ANIMATOR</span>
              </Link>
              <Link
                href="/info"
                className="hover:text-emerald-600 transition-colors flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                <span>GUIDE HUB</span>
              </Link>
              <a
                href="https://github.com/monoforge/MONOFORGE"
                target="_blank"
                rel="noreferrer"
                className="hover:text-neutral-950 transition-colors flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB REPO</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-neutral-500">
            <span>
              &copy; {new Date().getFullYear()} MONOFORGE &bull; 100% Free &amp; Open Source under MIT License.
            </span>
            <span>
              Zero Monkey Business. Built for developers who take their craft seriously.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

'use client';

import { TopNav } from '#/components/navigation/TopNav';
import { StudioCursor } from '#/components/studio/StudioCursor';
import { StudioAudioToggle } from '#/components/studio/StudioAudioToggle';
import { NomokeyHero } from '#/components/studio/NomokeyHero';
import { NomokeyMarquee } from '#/components/studio/NomokeyMarquee';
import { StudioBento } from '#/components/studio/StudioBento';
import { TransformationShowcase } from '#/components/studio/TransformationShowcase';
import { NomokeyStickerBoard } from '#/components/studio/NomokeyStickerBoard';
import { CuratedArchetypes } from '#/components/studio/CuratedArchetypes';
import { NomokeyManifesto } from '#/components/studio/NomokeyManifesto';
import { MonoForgeMonkeyIcon } from '#/components/common/MonoForgeLogo';
import { Link } from '#/i18n/navigation';
import { Github, BarChart3, Code2, Sparkles, BookOpen } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#faf8f5] text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 selection:bg-amber-400 selection:text-neutral-950 overflow-x-hidden font-sans transition-colors duration-200">
      {/* Magnetic Cursor Follower */}
      <StudioCursor />

      {/* Floating Lo-Fi Audio Ambience Player */}
      <StudioAudioToggle />

      {/* Navigation Header */}
      <TopNav />

      {/* High-Impact Top Kinetic Marquee */}
      <NomokeyMarquee speed="fast" />

      {/* Flagship Centerpiece: Nomokey Hero with Geometric Monkey Companion */}
      <NomokeyHero />

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

      {/* Reverse Amber Marquee Footer Strip */}
      <NomokeyMarquee reverse={true} theme="amber" speed="normal" />

      {/* High-Fashion Studio Editorial Footer */}
      <footer className="relative z-10 border-t-2 border-neutral-900 dark:border-neutral-100 bg-white dark:bg-neutral-950 py-12 px-4 sm:px-6 text-xs text-neutral-600 dark:text-neutral-400">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-neutral-950 text-white dark:bg-neutral-100 dark:text-neutral-950 border border-neutral-900">
                <MonoForgeMonkeyIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="font-black text-lg tracking-tight text-neutral-950 dark:text-white uppercase font-sans">
                  MONO<span className="text-amber-500">FORGE</span>
                </span>
                <p className="text-[11px] font-mono text-neutral-500">
                  Zero Monkey Business. Pure Precision Profile Engineering.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-bold">
              <Link
                href="/wizard"
                className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>VISUAL STUDIO</span>
              </Link>
              <Link
                href="/developer"
                className="hover:text-cyan-500 transition-colors flex items-center gap-1.5"
              >
                <Code2 className="w-3.5 h-3.5 text-cyan-500" />
                <span>/DEVELOPER IDE</span>
              </Link>
              <Link
                href="/telemetry"
                className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
              >
                <BarChart3 className="w-3.5 h-3.5 text-amber-500" />
                <span>47+ TELEMETRY</span>
              </Link>
              <Link
                href="/info"
                className="hover:text-emerald-500 transition-colors flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                <span>GUIDE HUB</span>
              </Link>
              <a
                href="https://github.com/yuvraj-thakur-exe/MONOFORGE"
                target="_blank"
                rel="noreferrer"
                className="hover:text-neutral-950 dark:hover:text-white transition-colors flex items-center gap-1.5"
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
              Deployed live on <a href="https://monoforge-studio.vercel.app" className="underline hover:text-amber-500">monoforge-studio.vercel.app</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

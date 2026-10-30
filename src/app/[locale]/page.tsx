'use client';

import { Link } from '#/i18n/navigation';
import { TopNav } from '#/components/navigation/TopNav';
import { HeroSection } from '#/components/landing/HeroSection';
import { ParticleBackground } from '#/components/landing/ParticleBackground';
import { TemplateGallery } from '#/components/landing/TemplateGallery';
import { LandingDetails } from '#/components/landing/LandingDetails';
import { Flame, Github, BookOpen, BarChart3, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-neutral-950 text-neutral-100 selection:bg-amber-500/20 selection:text-amber-200 overflow-x-hidden">
      {/* Refined subtle ambient background lighting - UI/UX Pro carbon aesthetic */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[450px] bg-gradient-to-b from-neutral-800/20 via-neutral-900/10 to-transparent blur-3xl opacity-60" />
        <div className="absolute top-[25%] -left-60 w-[500px] h-[500px] bg-amber-500/[0.03] blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-[60%] -right-60 w-[500px] h-[500px] bg-neutral-800/10 blur-[140px] rounded-full pointer-events-none" />
      </div>

      <TopNav />

      {/* Hero with interactive particles */}
      <div className="relative overflow-hidden border-b border-neutral-800/80">
        <ParticleBackground />
        <HeroSection />
      </div>

      {/* Metrics Studio Showcase Strip */}
      <div className="relative z-10 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-neutral-800 bg-neutral-950/70 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-neutral-100">
                  Developer Telemetry Studio
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  47+ Plugins
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Generate 3D isometric commit calendars, coding habits, LeetCode stats, and language charts via SVG or GitHub Actions.
              </p>
            </div>
          </div>

          <Link
            href="/telemetry"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs transition-colors shrink-0 active:scale-95 shadow-sm"
          >
            <span>Open Telemetry Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Curated Star Archetype Starters */}
      <div className="relative z-10 border-b border-neutral-800/80 bg-neutral-950/60 backdrop-blur-md">
        <TemplateGallery />
      </div>

      {/* Extended Product Story, Capabilities, Safeguards & FAQ */}
      <div className="relative z-10 border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md">
        <LandingDetails />
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-neutral-800 bg-neutral-950 py-10 px-4 text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <span className="font-bold text-neutral-200">ReadmeForge</span>
            <span className="text-neutral-500 hidden md:inline">— Forge a GitHub profile that gets noticed.</span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="/telemetry"
              className="hover:text-amber-300 flex items-center gap-1.5 transition-colors font-medium text-amber-400"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Telemetry Studio</span>
            </Link>
            <Link
              href="/info"
              className="hover:text-emerald-300 flex items-center gap-1.5 transition-colors font-medium text-emerald-400/90"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Info, Install &amp; Templates</span>
            </Link>
            <a
              href="https://github.com/yuvraj-thakur-exe/readmeforge"
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-200 flex items-center gap-1.5 transition-colors font-medium"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repository</span>
            </a>
            <a
              href="/LICENSE.md"
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-200 transition-colors font-medium"
            >
              MIT License
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

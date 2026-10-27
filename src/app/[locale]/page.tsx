'use client';

import { Link } from '#/i18n/navigation';
import { TopNav } from '#/components/navigation/TopNav';
import { HeroSection } from '#/components/landing/HeroSection';
import { ParticleBackground } from '#/components/landing/ParticleBackground';
import { TemplateGallery } from '#/components/landing/TemplateGallery';
import { LandingDetails } from '#/components/landing/LandingDetails';
import { Flame, Github, BookOpen } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-neutral-950 text-neutral-100 selection:bg-violet-500 selection:text-white overflow-x-hidden">
      {/* Ambient background lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] bg-gradient-to-b from-violet-600/15 via-cyan-500/10 to-transparent blur-3xl opacity-75" />
        <div className="absolute top-[30%] -left-60 w-[700px] h-[700px] bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-[65%] -right-60 w-[700px] h-[700px] bg-fuchsia-600/10 blur-[140px] rounded-full pointer-events-none" />
      </div>

      <TopNav />

      {/* Hero with interactive particles */}
      <div className="relative overflow-hidden border-b border-white/[0.08]">
        <ParticleBackground />
        <HeroSection />
      </div>

      {/* Curated Star Archetype Starters */}
      <div className="relative z-10 border-b border-white/[0.08] bg-neutral-950/60 backdrop-blur-md">
        <TemplateGallery />
      </div>

      {/* Extended Product Story, Capabilities, Safeguards & FAQ */}
      <div className="relative z-10 border-b border-white/[0.08] bg-neutral-950/80 backdrop-blur-md">
        <LandingDetails />
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.08] bg-neutral-950/90 backdrop-blur-xl py-10 px-4 text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 shadow-md">
              <Flame className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-neutral-200">ReadmeForge</span>
            <span className="text-neutral-500 hidden md:inline">— Forge a GitHub profile that gets noticed.</span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="/info"
              className="hover:text-emerald-300 flex items-center gap-1.5 transition-colors font-medium text-emerald-400/90"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Info, Install &amp; Templates</span>
            </Link>
            <a
              href="https://github.com/yuvrajlaptop2008-byte/readmeforge"
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-200 flex items-center gap-1.5 transition-colors font-medium"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repository</span>
            </a>
            <a
              href="https://github.com/yuvrajlaptop2008-byte/readmeforge/blob/main/LICENSE.md"
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

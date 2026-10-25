'use client';

import { TopNav } from '#/components/navigation/TopNav';
import { HeroSection } from '#/components/landing/HeroSection';
import { ParticleBackground } from '#/components/landing/ParticleBackground';
import { TemplateGallery } from '#/components/landing/TemplateGallery';
import { LandingDetails } from '#/components/landing/LandingDetails';
import { WizardContainer } from '#/components/wizard/WizardContainer';
import { Flame, Github } from 'lucide-react';

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

      {/* 6-Step Visual Wizard Builder */}
      <main id="wizard-builder" className="relative z-10 flex-1 max-w-[1600px] w-full mx-auto py-10 px-2 sm:px-4">
        <div className="px-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-violet-500/15 border border-violet-500/30 text-violet-400 shadow-md shadow-violet-950/40">
                <Flame className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-extrabold text-neutral-100 tracking-tight">
                    Interactive Profile Studio
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30 font-semibold">
                    Live Keystroke Sync
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mt-0.5">
                  6-Step visual wizard paired with Monaco IDE engine and instant Markdown preview
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>100% Client-Side Private</span>
            </div>
          </div>
        </div>
        <WizardContainer />
      </main>

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

          <div className="flex items-center gap-5">
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

'use client';

import React from 'react';
import { TopNav } from '#/components/navigation/TopNav';
import { HeroSection } from '#/components/landing/HeroSection';
import { ParticleBackground } from '#/components/landing/ParticleBackground';
import { TemplateGallery } from '#/components/landing/TemplateGallery';
import { WizardContainer } from '#/components/wizard/WizardContainer';
import { Flame, Heart, Github } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-palette-base text-palette-contrast selection:bg-violet-500 selection:text-white">
      <TopNav />

      {/* Hero with interactive particles */}
      <div className="relative overflow-hidden border-b border-palette-line/40">
        <ParticleBackground />
        <HeroSection />
      </div>

      {/* Curated 10+ Star Archetype Starters */}
      <div className="border-b border-palette-line/40 bg-neutral-950/40">
        <TemplateGallery />
      </div>

      {/* 6-Step Visual Wizard Builder */}
      <main id="wizard-builder" className="flex-1 max-w-[1600px] w-full mx-auto py-8">
        <div className="px-4 mb-4">
          <div className="flex items-center gap-2 pb-2 border-b border-palette-line/50">
            <Flame className="w-5 h-5 text-violet-400" />
            <h2 className="text-lg font-bold">Interactive Profile Studio</h2>
            <span className="text-xs text-palette-contrast/60 ml-2">
              Step-by-step customization with real-time markdown preview
            </span>
          </div>
        </div>
        <WizardContainer />
      </main>

      {/* Footer */}
      <footer className="border-t border-palette-line bg-neutral-950/80 py-8 px-4 text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-gradient-to-tr from-violet-600 to-cyan-400">
              <Flame className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-neutral-200">ReadmeForge</span>
            <span className="text-neutral-500">— Forge a GitHub profile that gets noticed.</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/readmeforge/readmeforge"
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-200 flex items-center gap-1 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://github.com/readmeforge/readmeforge/blob/main/LICENSE.md"
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-200 transition-colors"
            >
              MIT License
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

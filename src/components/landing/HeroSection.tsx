'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';
import { Wand2, Terminal, FileUp, Sparkles, Flame, Github } from 'lucide-react';
import { ResumeUpload } from '#/components/enrichment/ResumeUpload';
import { importReadmeFromMarkdown } from '#/lib/parser/import-readme';
import { useReadmeStore } from '#/store/useReadmeStore';

export const HeroSection: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const setEntireConfig = useReadmeStore(state => state.setEntireConfig);

  const handleImportSubmit = () => {
    if (!importText.trim()) return;
    const { config } = importReadmeFromMarkdown(importText);
    setEntireConfig(config);
    setIsImportOpen(false);
    document.getElementById('wizard-builder')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-16 pb-12 px-4 max-w-5xl mx-auto text-center space-y-8 z-10">
      {/* Spark Brand Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/60 border border-violet-800/80 text-violet-300 text-xs font-medium shadow-sm backdrop-blur-md">
        <Flame className="w-4 h-4 text-cyan-400" />
        <span>Next-Generation Profile README Studio</span>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
      </div>

      {/* Main Title & Typewriter Subtitle */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-neutral-100">
          Forge a GitHub profile that{' '}
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            gets noticed.
          </span>
        </h1>

        <div className="text-lg sm:text-xl font-medium text-neutral-300 min-h-[36px] flex items-center justify-center font-mono">
          <TypeAnimation
            sequence={[
              'Turn your GitHub profile into an iconic developer portfolio.',
              2000,
              'Dynamic stats, trophies, typing lines, and snake games.',
              2000,
              'Split-screen Monaco IDE with real-time JSON validation.',
              2000,
              'Zero config required — from blank slate to 3,000+ stars.',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <a
          href="#wizard-builder"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold shadow-lg shadow-violet-900/30 transition-all hover:scale-[1.02]"
        >
          <Wand2 className="w-4 h-4" />
          <span>Launch Visual Wizard</span>
        </a>

        <Link
          href="/developer"
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 font-medium transition-all"
        >
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>/developer IDE</span>
        </Link>

        <button
          type="button"
          onClick={() => setIsImportOpen(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 font-medium transition-all"
        >
          <FileUp className="w-4 h-4 text-violet-400" />
          <span>Import README</span>
        </button>

        <button
          type="button"
          onClick={() => setIsResumeOpen(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 font-medium transition-all"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Resume & AI Enrich</span>
        </button>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 max-w-4xl mx-auto text-left">
        <div className="p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800/80">
          <span className="text-xs font-semibold text-neutral-200 block">6-Step Wizard</span>
          <span className="text-[11px] text-neutral-400">Animated live preview as you type</span>
        </div>
        <div className="p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800/80">
          <span className="text-xs font-semibold text-neutral-200 block">Monaco Editor</span>
          <span className="text-[11px] text-neutral-400">Raw JSON mode with Zod validation</span>
        </div>
        <div className="p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800/80">
          <span className="text-xs font-semibold text-neutral-200 block">8+ OSS Plugins</span>
          <span className="text-[11px] text-neutral-400">Stats, trophies, snakes, and counters</span>
        </div>
        <div className="p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800/80">
          <span className="text-xs font-semibold text-neutral-200 block">Direct GitHub Push</span>
          <span className="text-[11px] text-neutral-400">Diff preview before every commit</span>
        </div>
      </div>

      {/* Resume Upload Modal */}
      <ResumeUpload
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Import Modal */}
      {isImportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl p-5 space-y-4 text-left">
            <h3 className="text-sm font-semibold text-neutral-100 flex items-center gap-2">
              <FileUp className="w-4 h-4 text-violet-400" />
              Paste Existing GitHub README.md
            </h3>
            <textarea
              rows={8}
              value={importText}
              onChange={e => setImportText(e.target.value)}
              placeholder="# Hi there 👋\n\n- 🔭 I'm currently working on..."
              className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-mono text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-violet-500"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsImportOpen(false)}
                className="px-3 py-1.5 rounded text-xs text-neutral-400 hover:text-neutral-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleImportSubmit}
                className="px-4 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium"
              >
                Parse & Import
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;

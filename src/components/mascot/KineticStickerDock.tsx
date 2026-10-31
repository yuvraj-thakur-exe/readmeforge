'use client';

import React, { useState } from 'react';
import { useReadmeStore } from '#/store/useReadmeStore';
import { Copy, Check, Plus, Sparkles, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StickerItem {
  id: string;
  name: string;
  subtitle: string;
  badgeText: string;
  category: 'framework' | 'language' | 'system' | 'mascot';
  color: string;
  borderColor: string;
  textColor: string;
  markdownSnippet: string;
}

const STICKERS: StickerItem[] = [
  {
    id: 'nextjs',
    name: 'Next.js 16',
    subtitle: 'App Router • Turbopack',
    badgeText: 'NEXT.JS',
    category: 'framework',
    color: 'from-neutral-900 to-neutral-800',
    borderColor: 'border-neutral-700 hover:border-neutral-400',
    textColor: 'text-neutral-100',
    markdownSnippet: '<img src="https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16" />',
  },
  {
    id: 'react',
    name: 'React 19',
    subtitle: 'Server Actions • Concurrent',
    badgeText: 'REACT',
    category: 'framework',
    color: 'from-cyan-950/40 to-neutral-900',
    borderColor: 'border-cyan-800/60 hover:border-cyan-400',
    textColor: 'text-cyan-300',
    markdownSnippet: '<img src="https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" />',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    subtitle: 'Strict • Zero-Any Guarantee',
    badgeText: 'TYPESCRIPT',
    category: 'language',
    color: 'from-blue-950/40 to-neutral-900',
    borderColor: 'border-blue-800/60 hover:border-blue-400',
    textColor: 'text-blue-300',
    markdownSnippet: '<img src="https://img.shields.io/badge/TypeScript%205-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />',
  },
  {
    id: 'rust',
    name: 'Rust Core',
    subtitle: 'Zero Cost • Memory Safe',
    badgeText: 'RUST',
    category: 'language',
    color: 'from-orange-950/40 to-neutral-900',
    borderColor: 'border-orange-800/60 hover:border-orange-400',
    textColor: 'text-orange-300',
    markdownSnippet: '<img src="https://img.shields.io/badge/Rust-DEA584?style=for-the-badge&logo=rust&logoColor=black" alt="Rust" />',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    subtitle: 'Design System • Utility First',
    badgeText: 'TAILWIND',
    category: 'framework',
    color: 'from-teal-950/40 to-neutral-900',
    borderColor: 'border-teal-800/60 hover:border-teal-400',
    textColor: 'text-teal-300',
    markdownSnippet: '<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />',
  },
  {
    id: 'docker',
    name: 'Docker Engine',
    subtitle: 'Containers • Microservices',
    badgeText: 'DOCKER',
    category: 'system',
    color: 'from-sky-950/40 to-neutral-900',
    borderColor: 'border-sky-800/60 hover:border-sky-400',
    textColor: 'text-sky-300',
    markdownSnippet: '<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />',
  },
  {
    id: 'cyber-monkey',
    name: 'Cyber Monkey',
    subtitle: 'Official MonoForge Mascot',
    badgeText: 'MONOFORGE',
    category: 'mascot',
    color: 'from-amber-950/50 to-neutral-900',
    borderColor: 'border-amber-600/60 hover:border-amber-400',
    textColor: 'text-amber-300',
    markdownSnippet: '<p align="center"><img src="/assets/cyber-monkey-mascot.svg" width="480" alt="MonoForge Cyber Monkey Mascot" /></p>',
  },
];

export const KineticStickerDock: React.FC = () => {
  const [selectedSticker, setSelectedSticker] = useState<StickerItem>(STICKERS[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [injectedId, setInjectedId] = useState<string | null>(null);
  const addSection = useReadmeStore(state => state.addSection);

  const handleCopyMarkdown = (sticker: StickerItem) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(sticker.markdownSnippet);
      setCopiedId(sticker.id);
      try {
        confetti({
          particleCount: 20,
          spread: 45,
          origin: { y: 0.8 },
          colors: ['#f59e0b', '#10b981', '#06b6d4'],
        });
      } catch {
        // Ignored
      }
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleInjectToProfile = (sticker: StickerItem) => {
    // Inject a custom skills section or badge into the zustand store
    addSection('skills', {
      content: {
        category: sticker.category,
        highlight: sticker.name,
      },
    });
    setInjectedId(sticker.id);
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10b981', '#f59e0b', '#38bdf8'],
      });
    } catch {
      // Ignored
    }
    setTimeout(() => setInjectedId(null), 2200);
  };

  return (
    <div className="w-full rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-950/80 p-5 sm:p-7 shadow-xl dark:shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-200 dark:border-neutral-800/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
            <span>[NOMONKEY DOCK // TACTILE STICKERS]</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400" />
            <span className="text-neutral-500">100% CAMO SAFE</span>
          </div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            Interactive Tactile Sticker Vault
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
            Inspired by NoMonkey's tactile studio aesthetic. Click any sticker to inspect, copy Camo markdown, or inject into your active profile store.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-mono text-neutral-700 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>ZERO RUNTIME JS IN MARKDOWN</span>
        </div>
      </div>

      {/* Main Grid: Stickers Carousel / Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
        {STICKERS.map(sticker => {
          const isSelected = selectedSticker.id === sticker.id;
          return (
            <button
              key={sticker.id}
              type="button"
              onClick={() => setSelectedSticker(sticker)}
              className={`group relative flex flex-col items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-200 active:scale-95 shadow-sm ${
                isSelected
                  ? `bg-gradient-to-b ${sticker.color} ${sticker.borderColor} ring-2 ring-amber-400/50 shadow-md -translate-y-1`
                  : 'bg-white dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700'
              }`}
            >
              <div className="w-full flex items-center justify-between mb-2">
                <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-950/60 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800">
                  {sticker.badgeText}
                </span>
                <Sparkles className={`w-3 h-3 ${isSelected ? 'text-amber-500 dark:text-amber-400' : 'text-neutral-400 dark:text-neutral-600 group-hover:text-neutral-600 dark:group-hover:text-neutral-400'}`} />
              </div>

              <div className="my-2 text-center">
                <span className={`block font-bold text-xs sm:text-sm ${isSelected ? sticker.textColor : 'text-neutral-800 dark:text-neutral-200'}`}>
                  {sticker.name}
                </span>
                <span className="block text-[10px] text-neutral-500 dark:text-neutral-400 font-mono mt-0.5 truncate max-w-[90px]">
                  {sticker.subtitle}
                </span>
              </div>

              <div className="w-full pt-2 border-t border-neutral-200 dark:border-neutral-800/60 flex items-center justify-center">
                <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-500 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                  {isSelected ? '● ACTIVE' : 'SELECT'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Sticker Inspection Bar */}
      <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              Selected: {selectedSticker.name}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
              {selectedSticker.subtitle}
            </span>
          </div>
          <code className="block text-[11px] font-mono text-neutral-700 dark:text-neutral-400 bg-white dark:bg-neutral-950 p-2 rounded border border-neutral-200 dark:border-neutral-800 select-all overflow-x-auto shadow-inner">
            {selectedSticker.markdownSnippet}
          </code>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Copy Markdown */}
          <button
            type="button"
            onClick={() => handleCopyMarkdown(selectedSticker)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-semibold transition-all active:scale-95 shadow-sm"
          >
            {copiedId === selectedSticker.id ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-300 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Copy Snippet</span>
              </>
            )}
          </button>

          {/* Inject directly into Zustand Store */}
          <button
            type="button"
            onClick={() => handleInjectToProfile(selectedSticker)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold transition-all shadow-md active:scale-95"
          >
            {injectedId === selectedSticker.id ? (
              <>
                <Check className="w-3.5 h-3.5 text-neutral-950" />
                <span>Added to Profile!</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-neutral-950" />
                <span>Inject to Profile</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default KineticStickerDock;

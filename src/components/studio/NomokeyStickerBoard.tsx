'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Copy, Check } from 'lucide-react';

interface StickerItem {
  id: string;
  name: string;
  emoji: string;
  bgColor: string;
  textColor: string;
  rotation: string;
  markdown: string;
}

const STICKERS: StickerItem[] = [
  {
    id: 'banana-engine',
    name: 'ZERO MONKEY BUSINESS',
    emoji: '🍌',
    bgColor: 'bg-amber-400',
    textColor: 'text-neutral-950',
    rotation: '-rotate-3',
    markdown: '[![Zero Monkey Business](https://img.shields.io/badge/MonoForge-Zero_Monkey_Business-f59e0b?style=for-the-badge&logo=shield)](https://monoforge-studio.vercel.app)',
  },
  {
    id: 'camo-certified',
    name: '60FPS CAMO CERTIFIED',
    emoji: '⚡',
    bgColor: 'bg-cyan-400',
    textColor: 'text-neutral-950',
    rotation: 'rotate-2',
    markdown: '[![60fps Camo Certified](https://img.shields.io/badge/Camo_CDN-60fps_GPU_SVG-06b6d4?style=for-the-badge&logo=fastapi)](https://monoforge-studio.vercel.app)',
  },
  {
    id: 'night-owl',
    name: 'NIGHT OWL DEV',
    emoji: '🦉',
    bgColor: 'bg-neutral-950',
    textColor: 'text-white',
    rotation: '-rotate-2',
    markdown: '[![Night Owl Dev](https://img.shields.io/badge/Telemetry-Night_Owl_89%25-10b981?style=for-the-badge&logo=github)](https://monoforge-studio.vercel.app/telemetry)',
  },
  {
    id: 'pixel-crafter',
    name: 'PIXEL CRAFTSMAN',
    emoji: '👾',
    bgColor: 'bg-emerald-400',
    textColor: 'text-neutral-950',
    rotation: 'rotate-4',
    markdown: '[![Pixel Craftsman](https://img.shields.io/badge/Vector-Pixel_Craftsman-10b981?style=for-the-badge&logo=gamepad)](https://monoforge-studio.vercel.app/animator)',
  },
  {
    id: 'zero-js',
    name: 'ZERO RUNTIME JS',
    emoji: '🛡️',
    bgColor: 'bg-white',
    textColor: 'text-neutral-950',
    rotation: '-rotate-1',
    markdown: '[![Zero Runtime JS](https://img.shields.io/badge/Performance-Zero_Runtime_JS-18181b?style=for-the-badge&logo=html5)](https://monoforge-studio.vercel.app)',
  },
  {
    id: 'monaco-ide',
    name: 'AST-SAFE MONACO',
    emoji: '⚔️',
    bgColor: 'bg-amber-500',
    textColor: 'text-white',
    rotation: 'rotate-3',
    markdown: '[![AST-Safe Monaco](https://img.shields.io/badge/IDE-Monaco_Raw_Mode-d97706?style=for-the-badge&logo=visualstudiocode)](https://monoforge-studio.vercel.app/developer)',
  },
];

export function NomokeyStickerBoard() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopySticker = (sticker: StickerItem) => {
    navigator.clipboard.writeText(sticker.markdown);
    setCopiedId(sticker.id);
    (window as unknown as { __monoforge_playClick?: (freq?: number) => void }).__monoforge_playClick?.(1100);
    toast.success(`Copied "${sticker.name}" markdown sticker!`, {
      description: 'Paste directly into your GitHub README.md profile',
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="relative bg-white border-b-2 border-neutral-900 py-16 sm:py-24 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-neutral-900 pb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-neutral-950 mb-2">
              <span className="px-2 py-0.5 rounded bg-[#ffe600] text-neutral-950 font-black border border-neutral-900">
                [ 05 // TACTILE STICKER DECK ]
              </span>
              <span>CLICK TO COPY BADGE MARKDOWN</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 uppercase font-sans">
              THE MONKEY STICKER VAULT.
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-neutral-700 max-w-sm">
            Collect, click, and drop these tactile developer stamps straight into your GitHub profile. 100% Camo CDN ready.
          </p>
        </div>

        {/* Sticker Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {STICKERS.map((sticker) => (
            <button
              type="button"
              key={sticker.id}
              onClick={() => handleCopySticker(sticker)}
              className={`text-left w-full cursor-pointer p-6 rounded-2xl border-2 border-neutral-900 ${sticker.bgColor} ${sticker.textColor} ${sticker.rotation} shadow-[4px_4px_0px_#18181b] hover:shadow-[1px_1px_0px_#18181b] hover:translate-x-[3px] hover:translate-y-[3px] transition-all select-none group relative overflow-hidden focus:outline-hidden focus:ring-4 focus:ring-[#ffe600] btn-tactile`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl filter drop-shadow-sm">{sticker.emoji}</span>
                <span className="p-1.5 rounded-lg bg-neutral-900/10 dark:bg-white/20 border border-neutral-900/20 dark:border-white/20 text-xs font-mono font-bold flex items-center gap-1">
                  {copiedId === sticker.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>CLICK TO COPY</span>
                    </>
                  )}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black tracking-tight font-sans uppercase">
                {sticker.name}
              </h3>

              <div className="mt-4 pt-3 border-t border-neutral-900/15 dark:border-white/15 flex items-center justify-between text-[11px] font-mono opacity-80">
                <span>SHIELDS.IO // CAMO COMPLIANT</span>
                <span className="font-bold underline decoration-1">1-CLICK</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { useReadmeStore } from '#/store/useReadmeStore';
import {
  Palette,
  Sparkles,
  Copy,
  Check,
  Layers,
} from 'lucide-react';

interface ColorToken {
  id: string;
  name: string;
  hex: string;
  accentClass: string;
}

const COLOR_TOKENS: ColorToken[] = [
  { id: 'amber', name: 'Solar Amber', hex: '#f59e0b', accentClass: 'from-amber-500/20 to-amber-600/10' },
  { id: 'emerald', name: 'Matrix Emerald', hex: '#10b981', accentClass: 'from-emerald-500/20 to-emerald-600/10' },
  { id: 'cyan', name: 'Cyber Cyan', hex: '#06b6d4', accentClass: 'from-cyan-500/20 to-cyan-600/10' },
  { id: 'orange', name: 'Tangerine Neon', hex: '#f97316', accentClass: 'from-orange-500/20 to-orange-600/10' },
  { id: 'slate', name: 'Obsidian Carbon', hex: '#38bdf8', accentClass: 'from-sky-500/20 to-sky-600/10' },
];

const BADGE_STYLES = [
  { id: 'for-the-badge', label: 'FOR-THE-BADGE', desc: 'Heavy bold caps (High Impact)' },
  { id: 'flat', label: 'Flat Modern', desc: 'Minimal clean line' },
  { id: 'plastic', label: 'Plastic 3D', desc: 'Glossy convex highlight' },
  { id: 'flat-square', label: 'Flat Square', desc: 'Sharp developer square' },
] as const;

const MASCOT_OPTIONS = [
  { id: 'cyber-monkey', label: 'Cyber Monkey', icon: '🐵', asset: '/assets/cyber-monkey-mascot.svg' },
  { id: 'peeking-cat', label: 'Peeking Cat', icon: '🐱', asset: '/assets/peeking-cat-header.svg' },
  { id: 'dev-desk', label: 'Dev at Desk', icon: '👨‍💻', asset: '/assets/developer-desk.svg' },
  { id: 'unicorn', label: 'Coding Unicorn', icon: '🦄', asset: '/assets/coding-unicorn.svg' },
];

export function DesignTokensPlayground() {
  const store = useReadmeStore();
  const [selectedColor, setSelectedColor] = useState<ColorToken>(COLOR_TOKENS[0]);
  const [badgeStyle, setBadgeStyle] = useState<(typeof BADGE_STYLES)[number]['id']>('for-the-badge');
  const [selectedMascot, setSelectedMascot] = useState(MASCOT_OPTIONS[0]);
  const [borderBeam, setBorderBeam] = useState(true);
  const [copied, setCopied] = useState(false);

  // Derived Markdown for token preview
  const previewMarkdown = useMemo(() => {
    const hexClean = selectedColor.hex.replace('#', '');
    return `<!-- MonoForge Profile Tokens: ${selectedColor.name} &bull; ${badgeStyle} -->
<div align="center">
  <img src="https://img.shields.io/badge/Architecture-Clean-10B981?style=${badgeStyle}&logo=github" alt="Clean Arch" />
  <img src="https://img.shields.io/badge/Telemetry-47+_Plugins-${hexClean}?style=${badgeStyle}&logo=githubactions&logoColor=white" alt="Telemetry" />
  <img src="https://img.shields.io/badge/Engine-MonoForge-090d16?style=${badgeStyle}&logo=typescript&logoColor=white" alt="Engine" />
</div>

<p align="center">
  <img src="${selectedMascot.asset}" alt="${selectedMascot.label}" width="100%" />
</p>`;
  }, [selectedColor, badgeStyle, selectedMascot]);

  const handleCopy = () => {
    navigator.clipboard.writeText(previewMarkdown);
    setCopied(true);
    toast.success('Copied custom token profile snippet to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyToStore = () => {
    store.updateSettings({
      accentColor: selectedColor.hex,
      badgeStyle,
    });
    toast.success(`Applied ${selectedColor.name} and ${badgeStyle} to global store!`);
  };

  return (
    <div className="space-y-6">
      {/* Editorial Header (Marco Madonna craft) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-xs text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider">
            <span>[03 // DESIGN TOKENS PLAYGROUND]</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400" />
            <span className="text-neutral-500">INSPIRED BY MARCO MADONNA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
            Interactive Tokens &amp; Theme Engine
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl mt-1">
            Fine-tune your personal brand tokens in real time. Switch color accents, badge archetypes, mascots, and laser perimeter borders.
          </p>
        </div>

        {/* Global Store Sync CTA */}
        <button
          type="button"
          onClick={handleApplyToStore}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 text-xs font-semibold hover:bg-neutral-200 dark:hover:border-neutral-600 transition-colors self-start md:self-auto shadow-sm"
        >
          <Layers className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
          <span>Apply to Active Profile</span>
        </button>
      </div>

      {/* 2-Column Playground Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Token Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* 1. Primary Accent Color Swatches */}
          <div className="p-4 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 space-y-2.5 shadow-sm">
            <div className="flex items-center justify-between text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300">
              <span className="flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                ACCENT COLOR TOKEN
              </span>
              <span className="text-neutral-500 dark:text-neutral-400">{selectedColor.hex}</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {COLOR_TOKENS.map(col => {
                const isSelected = selectedColor.id === col.id;
                return (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => setSelectedColor(col)}
                    className={`h-11 rounded-lg border transition-all flex flex-col items-center justify-center gap-1 ${
                      isSelected
                        ? 'border-neutral-100 ring-2 ring-neutral-400/50 scale-105'
                        : 'border-neutral-800 hover:border-neutral-700'
                    }`}
                    style={{ backgroundColor: col.hex }}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-neutral-950 font-extrabold" />}
                  </button>
                );
              })}
            </div>
            <div className="text-[11px] font-mono text-neutral-400">
              Selected: <strong className="text-neutral-200">{selectedColor.name}</strong>
            </div>
          </div>

          {/* 2. Badge Archetype Selector */}
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 space-y-2.5">
            <span className="block text-xs font-mono font-semibold text-neutral-300">
              SHIELD BADGE GEOMETRY
            </span>
            <div className="grid grid-cols-2 gap-2">
              {BADGE_STYLES.map(b => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBadgeStyle(b.id)}
                  className={`p-2 rounded-lg border text-left transition-all ${
                    badgeStyle === b.id
                      ? 'border-amber-500/80 bg-amber-500/10 text-amber-200 ring-1 ring-amber-500/30'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <div className="font-mono text-xs font-bold text-neutral-200">{b.label}</div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">{b.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Mascot Companion Pick */}
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 space-y-2.5">
            <span className="block text-xs font-mono font-semibold text-neutral-300">
              VECTOR MASCOT COMPANION
            </span>
            <div className="grid grid-cols-2 gap-2">
              {MASCOT_OPTIONS.map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMascot(m)}
                  className={`p-2.5 rounded-lg border text-left flex items-center gap-2 transition-all ${
                    selectedMascot.id === m.id
                      ? 'border-amber-500/80 bg-amber-500/10 text-amber-200'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <span className="text-lg">{m.icon}</span>
                  <span className="font-semibold text-xs text-neutral-200">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Laser Perimeter Toggle */}
          <div className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/50 flex items-center justify-between">
            <div className="text-xs">
              <span className="font-semibold text-neutral-200 block font-mono">Laser Border Beams</span>
              <span className="text-[11px] text-neutral-500">60fps traveling dash perimeter</span>
            </div>
            <button
              type="button"
              onClick={() => setBorderBeam(b => !b)}
              className={`px-3 py-1 rounded-md text-xs font-mono font-semibold border transition-colors ${
                borderBeam
                  ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300'
                  : 'border-neutral-800 bg-neutral-950 text-neutral-500'
              }`}
            >
              {borderBeam ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>
        </div>

        {/* RIGHT: Live Visualized Canvas (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between p-6 rounded-2xl border border-neutral-800 bg-neutral-950 relative overflow-hidden shadow-2xl min-h-[460px]">
          {/* Laser Border Beam on Canvas */}
          {borderBeam && (
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl border-2"
              style={{
                borderColor: selectedColor.hex,
                boxShadow: `0 0 20px ${selectedColor.hex}20`,
              }}
            />
          )}

          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800/80 text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-1.5 text-neutral-200 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Live Token Output Canvas
              </span>
              <span className="text-emerald-400 font-bold">100% Camo Safe</span>
            </div>

            {/* Simulated Profile Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 py-3">
              <img
                src={`https://img.shields.io/badge/Architecture-Clean-10B981?style=${badgeStyle}&logo=github`}
                alt="Architecture"
                className="h-6"
              />
              <img
                src={`https://img.shields.io/badge/Telemetry-47+_Plugins-${selectedColor.hex.replace('#', '')}?style=${badgeStyle}&logo=githubactions&logoColor=white`}
                alt="Telemetry"
                className="h-6"
              />
              <img
                src={`https://img.shields.io/badge/Engine-MonoForge-090d16?style=${badgeStyle}&logo=typescript&logoColor=white`}
                alt="Engine"
                className="h-6"
              />
              <img
                src={`https://img.shields.io/badge/Mascot-${encodeURIComponent(selectedMascot.label)}-${selectedColor.hex.replace('#', '')}?style=${badgeStyle}`}
                alt="Mascot"
                className="h-6"
              />
            </div>

            {/* Rendered Mascot Preview */}
            <div className="my-4 p-4 rounded-xl border border-neutral-800/80 bg-neutral-900/60 flex items-center justify-center max-h-[220px] overflow-hidden">
              <img
                src={selectedMascot.asset}
                alt={selectedMascot.label}
                className="max-h-[190px] w-auto object-contain rounded"
              />
            </div>
          </div>

          {/* Quick Copy Footer */}
          <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-mono text-neutral-500">
              Tokens: <strong className="text-neutral-300">{selectedColor.id}</strong> &bull; <strong className="text-neutral-300">{badgeStyle}</strong>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-300 font-semibold hover:bg-amber-500/20 transition-colors shadow-sm"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Tokens Markdown'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

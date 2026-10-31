'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Link } from '#/i18n/navigation';
import {
  Laptop,
  Smartphone,
  Terminal,
  Copy,
  Check,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

interface ArchetypeDemo {
  id: string;
  name: string;
  tag: string;
  desc: string;
  previewSvg: string;
  archetypeId: string;
  markdownSnippet: string;
}

const DEMOS: ArchetypeDemo[] = [
  {
    id: 'wow-3d-city-cat',
    name: '#1 3D City & Peeking Cat',
    tag: 'MOST POPULAR',
    desc: '3D extruded contribution city, peeking kitten header, glowing polyglot stack, and annual commit heatmap.',
    previewSvg: '/assets/wow-profile-full.svg',
    archetypeId: 'wow-3d-city-cat',
    markdownSnippet: `<div align="center">
  <img src="/assets/peeking-cat-header.svg" alt="Peeking Cat Header" width="100%" />
</div>

<br/>

<div align="center">
  <img src="/assets/telemetry-isocalendar-3d.svg" alt="3D City Contributions" width="100%" />
</div>`,
  },
  {
    id: 'bento-signal-dashboard',
    name: '#5 Bento Signal Grid',
    tag: 'DARK GLASS',
    desc: 'Cinematic anime night sky silhouette, live profile signal cards (Stars, Commits, Repos, Followers with sparklines).',
    previewSvg: '/assets/bento-dashboard-full.svg',
    archetypeId: 'bento-signal-dashboard',
    markdownSnippet: `<div align="center">
  <img src="/assets/bento-dashboard-full.svg" alt="Bento Signal Dashboard" width="100%" />
</div>`,
  },
  {
    id: 'forge-telemetry-dashboard',
    name: 'Telemetry Studio Suite',
    tag: '47+ PLUGINS',
    desc: 'Native telemetry infographics: Lighthouse 4-pillar vitals, 3D calendar, languages donut, coding habits radar, and Spotify equalizer.',
    previewSvg: '/assets/about-me-telemetry.svg',
    archetypeId: 'forge-telemetry-dashboard',
    markdownSnippet: `<div align="center">
  <img src="/assets/about-me-telemetry.svg" alt="Telemetry Suite" width="100%" />
</div>`,
  },
  {
    id: 'cyber-monkey-hud',
    name: 'NoMonkey Workstation HUD',
    tag: 'AWWWARDS VIBE',
    desc: 'Interactive cyber chimp mascot at dual-monitor desk with real-time bash prompt and live GitHub commit metrics.',
    previewSvg: '/assets/monkey-code-hud.svg',
    archetypeId: 'constellation-devops-desk',
    markdownSnippet: `<p align="center">
  <img src="/assets/monkey-code-hud.svg" alt="NoMonkey Workstation HUD" width="100%" />
</p>`,
  },
];

export function DeviceShowcase() {
  const [device, setDevice] = useState<'macbook' | 'terminal' | 'mobile'>('macbook');
  const [activeDemoId, setActiveDemoId] = useState<string>('wow-3d-city-cat');
  const [copied, setCopied] = useState(false);

  const currentDemo = DEMOS.find(d => d.id === activeDemoId) || DEMOS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentDemo.markdownSnippet);
    setCopied(true);
    toast.success(`Copied ${currentDemo.name} Markdown snippet!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Editorial Section Header (Poulo / NoMonkey typography) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-xs text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider">
            <span>[02 // DEVICE PROTOTYPE MATRIX]</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400" />
            <span className="text-neutral-500">REAL GITHUB RENDERING</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
            Engineered for Every Screen &amp; Device
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl mt-1">
            Preview how your profile README renders across GitHub Web, Desktop, Mobile, and CLI environments with 100% pixel accuracy.
          </p>
        </div>

        {/* Device Switcher Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 self-start md:self-auto shadow-sm">
          {[
            { id: 'macbook' as const, label: 'MacBook Pro', icon: Laptop },
            { id: 'terminal' as const, label: 'Cyber Terminal', icon: Terminal },
            { id: 'mobile' as const, label: 'iPhone Mobile', icon: Smartphone },
          ].map(d => {
            const Icon = d.icon;
            const isSelected = device === d.id;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setDevice(d.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-amber-400 text-neutral-950 shadow-sm font-bold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{d.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Archetype Quick Selector Horizontal Reel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {DEMOS.map(demo => {
          const isSelected = demo.id === activeDemoId;
          return (
            <button
              key={demo.id}
              type="button"
              onClick={() => setActiveDemoId(demo.id)}
              className={`flex-shrink-0 text-left p-3 rounded-xl border transition-all max-w-[280px] shadow-sm ${
                isSelected
                  ? 'border-amber-500/80 bg-white dark:bg-neutral-900/90 ring-1 ring-amber-500/30'
                  : 'border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-950/60 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900/40 text-neutral-600 dark:text-neutral-400'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-semibold text-xs text-neutral-900 dark:text-neutral-100 line-clamp-1">{demo.name}</span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-amber-600 dark:text-amber-400 border border-neutral-200 dark:border-neutral-700">
                  {demo.tag}
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                {demo.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* DEVICE FRAME STAGE */}
      <div className="rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-950/90 p-4 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-xl dark:shadow-2xl min-h-[580px]">
        {/* Ambient Backlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-400/[0.04] dark:bg-amber-500/[0.04] blur-3xl pointer-events-none rounded-full" />

        {/* 1. MACBOOK PRO FRAME */}
        {device === 'macbook' && (
          <div className="w-full max-w-4xl transition-all duration-300">
            {/* Top Display Bezel */}
            <div className="rounded-t-2xl border border-neutral-300 dark:border-neutral-700/80 bg-neutral-100 dark:bg-neutral-900 p-2 sm:p-3 shadow-xl">
              {/* Camera Notch & Browser Title Bar */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block" />
                </div>
                <div className="px-4 py-0.5 rounded-md bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-700 dark:text-neutral-300 flex items-center gap-2 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>github.com/developer/developer</span>
                </div>
                <span className="text-[11px] text-neutral-400 dark:text-neutral-500 hidden sm:inline">README.md</span>
              </div>

              {/* Screen Inner Viewport */}
              <div className="rounded-lg bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-3 sm:p-5 max-h-[480px] overflow-y-auto scrollbar-thin shadow-inner flex flex-col items-center">
                <img
                  src={currentDemo.previewSvg}
                  alt={currentDemo.name}
                  className="w-full h-auto rounded shadow-sm border border-neutral-200 dark:border-neutral-800/60"
                />
              </div>
            </div>

            {/* Laptop Aluminum Base Stand */}
            <div className="relative mx-auto w-[104%] -left-[2%] h-4 rounded-b-xl bg-gradient-to-r from-neutral-300 via-neutral-200 to-neutral-300 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800 border-t border-neutral-400 dark:border-neutral-600 shadow-md flex justify-center">
              <div className="w-24 h-1.5 rounded-b-md bg-neutral-400 dark:bg-neutral-900" />
            </div>
          </div>
        )}

        {/* 2. CYBER CRT TERMINAL */}
        {device === 'terminal' && (
          <div className="w-full max-w-3xl rounded-xl border border-neutral-800 bg-neutral-950 font-mono shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900 border-b border-neutral-800 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-neutral-200">nomonkey@monoforge:~ (zsh)</span>
              </div>
              <span className="text-[11px] text-amber-400 font-bold">TTY1 // 60FPS</span>
            </div>

            <div className="p-4 sm:p-6 space-y-4 max-h-[480px] overflow-y-auto scrollbar-thin text-xs">
              <div className="space-y-1 text-neutral-300">
                <p className="text-amber-400 font-bold">
                  $ monoforge inspect --profile octocat --archetype {currentDemo.archetypeId}
                </p>
                <p className="text-neutral-400">[INFO] Loading Camo vector pipeline...</p>
                <p className="text-emerald-400">✓ Camo Proxy sanitizer: 0 &lt;foreignObject&gt; stripped</p>
                <p className="text-emerald-400">✓ GPU Compositor keyframes: 60fps verified</p>
              </div>

              <div className="p-2 rounded-lg border border-neutral-800/80 bg-neutral-900/50 flex justify-center">
                <img
                  src={currentDemo.previewSvg}
                  alt={currentDemo.name}
                  className="max-w-full h-auto rounded border border-neutral-800/60"
                />
              </div>

              <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-500 flex items-center justify-between">
                <span>Output file: README.md (Ready to push)</span>
                <span className="text-emerald-400 font-mono font-bold">NO MONKEY BUSINESS &bull; PASS</span>
              </div>
            </div>
          </div>
        )}

        {/* 3. IPHONE MOBILE PREVIEW */}
        {device === 'mobile' && (
          <div className="w-full max-w-[340px] rounded-[44px] border-[6px] border-neutral-800 bg-neutral-950 p-3 shadow-2xl relative">
            {/* Dynamic Island / Speaker Pill */}
            <div className="w-24 h-5 rounded-full bg-neutral-900 mx-auto mb-3 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-neutral-950 mr-2" />
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
            </div>

            {/* Mobile Viewport */}
            <div className="rounded-[32px] bg-neutral-900/80 border border-neutral-800 p-2.5 max-h-[500px] overflow-y-auto scrollbar-thin text-left space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-neutral-800 text-[11px] font-mono text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>GitHub Mobile App</span>
              </div>

              <img
                src={currentDemo.previewSvg}
                alt={currentDemo.name}
                className="w-full h-auto rounded-lg shadow-sm"
              />

              <div className="p-2 rounded bg-neutral-950 border border-neutral-800/80 text-[10px] text-neutral-400 font-mono">
                ✓ Responsive scale: 100% full-width on iOS/Android
              </div>
            </div>

            {/* Home Indicator Bar */}
            <div className="w-28 h-1 rounded-full bg-neutral-700 mx-auto mt-3" />
          </div>
        )}

        {/* Floating Quick Action Footer inside Stage */}
        <div className="w-full max-w-4xl mt-6 pt-4 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-neutral-400 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Active Archetype: <strong className="text-neutral-200">{currentDemo.name}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-200 font-semibold hover:bg-neutral-800 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Markdown'}</span>
            </button>
            <Link
              href="/wizard"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold transition-colors shadow-sm"
            >
              <span>Customize in Wizard</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

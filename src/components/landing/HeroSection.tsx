'use client';

import React, { useState, useMemo } from 'react';
import { Link } from '#/i18n/navigation';
import { KineticTypewriter } from '#/components/landing/KineticTypewriter';
import {
  Sparkle,
  Flame,
  Droplets,
  Zap,
  Download,
  Sliders,
  Square,
  Bot,
  Hammer,
  Footprints,
  Swords,
  Type,
  BookOpen,
  Terminal,
  Activity,
  Sparkles,
  Film,
} from 'lucide-react';
import { IdeIntegrationShelf } from '#/components/landing/IdeIntegrationShelf';
import { CopyButton } from '#/components/common/CopyButton';
import {
  ClaudeLogo,
  AntigravityLogo,
  VsCodeLogo,
  CursorLogo,
  NpmLogo,
  PnpmLogo,
  BashLogo,
} from '#/components/common/IdeLogos';
import { generateAnimatedSvg } from '#/lib/animator/presets';
import {
  AnimationConfig,
  AnimationPresetId,
  TextEffect,
  BackgroundEffect,
  FrameEffect,
  CharacterType,
  CharacterAction,
} from '#/lib/animator/types';

interface InstallOption {
  id: string;
  label: string;
  command: string;
  description: string;
  badge: string;
  icon: React.ReactNode;
}

const INSTALL_OPTIONS: InstallOption[] = [
  {
    id: 'pnpm',
    label: 'pnpm (Fastest)',
    icon: <PnpmLogo className="w-3.5 h-3.5" />,
    command: 'git clone https://github.com/yuvraj-thakur-exe/readmeforge.git && cd readmeforge && pnpm install && pnpm dev',
    description: 'Clone and launch locally with pnpm and Turbopack',
    badge: 'Recommended',
  },
  {
    id: 'npm',
    label: 'npm / npx',
    icon: <NpmLogo className="w-3.5 h-3.5" />,
    command: 'git clone https://github.com/yuvraj-thakur-exe/readmeforge.git && cd readmeforge && npm install && npm run dev',
    description: 'Standard Node.js setup with zero prerequisite package managers',
    badge: 'Universal',
  },
  {
    id: 'claude',
    label: 'Claude Code',
    icon: <ClaudeLogo className="w-3.5 h-3.5" />,
    command: 'git clone https://github.com/yuvraj-thakur-exe/readmeforge.git && cd readmeforge && claude',
    description: 'Clone and launch with Anthropic Claude Code agentic CLI',
    badge: 'AI Agent',
  },
  {
    id: 'antigravity',
    label: 'Antigravity IDE',
    icon: <AntigravityLogo className="w-3.5 h-3.5" />,
    command: 'git clone https://github.com/yuvraj-thakur-exe/readmeforge.git && cd readmeforge && agy',
    description: 'Clone and launch with Google DeepMind Antigravity studio',
    badge: 'DeepMind',
  },
  {
    id: 'cursor',
    label: 'Cursor IDE',
    icon: <CursorLogo className="w-3.5 h-3.5" />,
    command: 'git clone https://github.com/yuvraj-thakur-exe/readmeforge.git && cursor readmeforge',
    description: 'Open workspace in Cursor AI-first editor',
    badge: 'Editor',
  },
  {
    id: 'vscode',
    label: 'VS Code',
    icon: <VsCodeLogo className="w-3.5 h-3.5" />,
    command: 'git clone https://github.com/yuvraj-thakur-exe/readmeforge.git && code readmeforge',
    description: 'Visual Studio Code workspace with split-pane live preview',
    badge: 'Extension',
  },
  {
    id: 'docker',
    label: 'Docker',
    icon: <BashLogo className="w-3.5 h-3.5" />,
    command: 'git clone https://github.com/yuvraj-thakur-exe/readmeforge.git && cd readmeforge && docker build -t readmeforge . && docker run -p 3000:3000 readmeforge',
    description: 'Isolated containerized build running at http://localhost:3000',
    badge: 'Container',
  },
];

export const HeroSection: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('pnpm');
  const [showcaseTab, setShowcaseTab] = useState<'characters' | 'heroes' | 'typography' | 'customizer'>('characters');

  // Playground state for real-time visitor experimentation
  const [playgroundConfig, setPlaygroundConfig] = useState<AnimationConfig>({
    preset: 'fire',
    headline: 'FULL-STACK CLOUD ARCHITECT',
    subtitle: 'Building Distributed Systems, AI Agents & Real-Time Toolchains',
    tag: 'OPEN SOURCE CONTRIBUTOR',
    fontFamily: 'Fira Code',
    textEffect: 'glitch',
    backgroundEffect: 'fire',
    frameEffect: 'fire-border',
    svgEffect: 'animated-logo',
    threeDEffect: 'interactive-card',
    characterType: 'builder-crafter',
    characterAction: 'build',
    primaryColor: '#ff2a2a',
    secondaryColor: '#ff9900',
    accentColor: '#ffee55',
    backgroundColor: '#0a0505',
    textColor: '#ffffff',
    transparentBackground: false,
    width: 900,
    height: 240,
    duration: 3.5,
    direction: 'normal',
    repeat: 'infinite',
    alignment: 'center',
    reducedMotion: false,
  });

  // Generate live SVG
  const liveSvgMarkup = useMemo(() => generateAnimatedSvg(playgroundConfig), [playgroundConfig]);

  // Dedicated Kinetic Typography Studio state
  const [typographyPreset, setTypographyPreset] = useState<
    'neon' | 'glitch' | 'gradient' | 'typewriter' | 'wave' | 'matrix'
  >('neon');
  const [typographyText, setTypographyText] = useState('FULL-STACK CLOUD ARCHITECT');
  const [typographySubtitle, setTypographySubtitle] = useState('Distributed Systems & Real-Time AI Toolchains');
  const [typographyTag, setTypographyTag] = useState('OPEN SOURCE CONTRIBUTOR');

  const typographySvgMarkup = useMemo(() => {
    const configMap: Record<
      string,
      {
        preset: AnimationPresetId;
        textEffect: TextEffect;
        primaryColor: string;
        secondaryColor: string;
        accentColor: string;
        backgroundEffect: BackgroundEffect;
        frameEffect: FrameEffect;
      }
    > = {
      neon: {
        preset: 'neon',
        textEffect: 'scramble',
        primaryColor: '#22d3ee',
        secondaryColor: '#818cf8',
        accentColor: '#c084fc',
        backgroundEffect: 'grids',
        frameEffect: 'cyber-neon',
      },
      glitch: {
        preset: 'glitch',
        textEffect: 'glitch',
        primaryColor: '#06b6d4',
        secondaryColor: '#ec4899',
        accentColor: '#38bdf8',
        backgroundEffect: 'matrix',
        frameEffect: 'terminal-crt',
      },
      gradient: {
        preset: 'custom',
        textEffect: 'gradient',
        primaryColor: '#38bdf8',
        secondaryColor: '#ec4899',
        accentColor: '#22c55e',
        backgroundEffect: 'animated-gradient',
        frameEffect: 'glassmorphism',
      },
      typewriter: {
        preset: 'typing',
        textEffect: 'typing',
        primaryColor: '#38bdf8',
        secondaryColor: '#94a3b8',
        accentColor: '#22c55e',
        backgroundEffect: 'solid',
        frameEffect: 'terminal-crt',
      },
      wave: {
        preset: 'wave',
        textEffect: 'wave',
        primaryColor: '#fbbf24',
        secondaryColor: '#f59e0b',
        accentColor: '#fcd34d',
        backgroundEffect: 'stars',
        frameEffect: 'gold-metallic',
      },
      matrix: {
        preset: 'matrix',
        textEffect: 'reveal',
        primaryColor: '#4ade80',
        secondaryColor: '#22c55e',
        accentColor: '#86efac',
        backgroundEffect: 'matrix',
        frameEffect: 'terminal-crt',
      },
    };

    const activeSettings = configMap[typographyPreset] || configMap.neon;

    return generateAnimatedSvg({
      preset: activeSettings.preset,
      headline: typographyText,
      subtitle: typographySubtitle,
      tag: typographyTag,
      fontFamily: 'Fira Code',
      textEffect: activeSettings.textEffect,
      backgroundEffect: activeSettings.backgroundEffect,
      frameEffect: activeSettings.frameEffect,
      svgEffect: 'none',
      threeDEffect: 'none',
      characterType: 'none',
      characterAction: 'code',
      primaryColor: activeSettings.primaryColor,
      secondaryColor: activeSettings.secondaryColor,
      accentColor: activeSettings.accentColor,
      backgroundColor: '#0a0f1d',
      textColor: '#f8fafc',
      transparentBackground: false,
      width: 900,
      height: 220,
      duration: 3,
      direction: 'normal',
      repeat: 'infinite',
      alignment: 'center',
      reducedMotion: false,
    });
  }, [typographyPreset, typographyText, typographySubtitle, typographyTag]);

  const activeOption = INSTALL_OPTIONS.find(o => o.id === selectedTab) || INSTALL_OPTIONS[0];

  const applyPlaygroundPreset = (
    bg: BackgroundEffect,
    frame: FrameEffect,
    headline: string,
    pColor: string,
    sColor: string,
    aColor: string,
    bgColor: string,
    charType?: CharacterType,
    charAct?: CharacterAction
  ) => {
    setPlaygroundConfig(prev => ({
      ...prev,
      backgroundEffect: bg,
      frameEffect: frame,
      headline,
      primaryColor: pColor,
      secondaryColor: sColor,
      accentColor: aColor,
      backgroundColor: bgColor,
      characterType: charType ?? prev.characterType,
      characterAction: charAct ?? prev.characterAction,
    }));
  };

  return (
    <section className="relative pt-12 pb-16 px-4 max-w-6xl mx-auto text-center space-y-9 z-10">
      {/* Top Pill with Glow */}
      <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-violet-950/70 border border-violet-700/60 text-violet-200 text-xs font-semibold shadow-lg shadow-violet-950/40 backdrop-blur-md transition-all hover:border-violet-500 hover:scale-105 active:scale-95 cursor-default select-none">
        <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
        <span className="tracking-wide">NEXT-GEN PROFILE README STUDIO</span>
        <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400 animate-ping" />
      </div>

      {/* Main Title */}
      <div className="space-y-4 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-neutral-100 leading-tight">
          Forge a GitHub profile that{' '}
          <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(56,189,248,0.35)] animate-text-shimmer">
            gets noticed.
          </span>
        </h1>

        <div className="min-h-[48px] flex items-center justify-center">
          <KineticTypewriter />
        </div>
      </div>

      {/* High-Tech 1-Line Install Command Console with Official IDE Logos */}
      <div id="install-console-anchor" className="max-w-3xl mx-auto scroll-mt-24">
        <div className="rounded-2xl bg-neutral-950/90 border border-cyan-500/30 p-4 sm:p-5 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl relative overflow-hidden transition-all hover:border-cyan-500/50">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Console Header Tabs */}
          <div className="flex items-center justify-between gap-2 border-b border-neutral-800/80 pb-3 mb-3.5">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
              {INSTALL_OPTIONS.map(opt => {
                const isActive = opt.id === selectedTab;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setSelectedTab(opt.id);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 select-none ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm shadow-cyan-500/20 scale-100'
                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 border border-transparent'
                    } active:scale-95`}
                  >
                    <span className="shrink-0">{opt.icon}</span>
                    <span>{opt.label}</span>
                    {isActive && (
                      <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[9px] bg-cyan-950 border border-cyan-700/60 text-cyan-300 font-mono">
                        {opt.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-neutral-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              1-Line Ready
            </span>
          </div>

          {/* Command Terminal Bar */}
          <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 focus-within:border-cyan-500/60 transition-colors">
            <div className="flex items-center gap-2.5 overflow-x-auto font-mono text-xs sm:text-sm text-left scrollbar-none">
              <span className="text-emerald-400 font-extrabold select-none">❯</span>
              <code className="text-cyan-300 font-semibold tracking-wide whitespace-nowrap select-all">
                {activeOption.command}
              </code>
            </div>

            {/* Quick Animated Copy Button */}
            <CopyButton
              textToCopy={activeOption.command}
              label="Copy"
              copiedLabel="Copied!"
              variant="primary"
            />
          </div>

          {/* Description line below command */}
          <div className="flex items-center justify-between mt-2.5 px-1 text-[11px] text-neutral-400 text-left">
            <span>{activeOption.description}</span>
            <span className="hidden sm:inline text-neutral-500 font-mono">Press ↵ in terminal</span>
          </div>
        </div>
      </div>

      {/* Main Action Call-to-Actions (Download & Launch) */}
      <div className="flex flex-wrap items-center justify-center gap-3.5 pt-1">
        <Link
          href="/wizard"
          className="group flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-violet-900/40 transition-all hover:scale-105 hover:-translate-y-0.5 active:scale-95 select-none"
        >
          <Sparkles className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform duration-300" />
          <span>Launch Studio</span>
        </Link>

        <a
          href="#templates-shelf"
          className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 hover:border-cyan-500/50 text-neutral-100 font-semibold text-sm transition-all hover:scale-105 active:scale-95 select-none shadow-md"
        >
          <Sparkle className="w-4 h-4 text-cyan-400" />
          <span>Curated Archetypes</span>
        </a>

        <Link
          href="/animator"
          className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-fuchsia-950/40 hover:bg-fuchsia-900/60 border border-fuchsia-500/40 hover:border-fuchsia-400 text-fuchsia-200 font-semibold text-sm transition-all hover:scale-105 active:scale-95 select-none shadow-md"
        >
          <Film className="w-4 h-4 text-fuchsia-400" />
          <span>Vector Animator</span>
        </Link>

        <Link
          href="/info"
          className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 hover:border-emerald-500/50 text-neutral-100 font-semibold text-sm transition-all hover:scale-105 active:scale-95 select-none shadow-md"
        >
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>Guide &amp; Archetypes</span>
        </Link>

        <a
          href="https://github.com/yuvraj-thakur-exe/readmeforge/archive/refs/heads/main.zip"
          download
          className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 font-medium text-sm transition-all hover:scale-105 active:scale-95 select-none"
        >
          <Download className="w-4 h-4 text-neutral-400" />
          <span>Download (.ZIP)</span>
        </a>
      </div>

      {/* DYNAMIC ANIMATED SHOWCASE & INTERACTIVE FRAME STUDIO */}
      <div className="max-w-5xl mx-auto text-left pt-4">
        <div className="rounded-3xl border border-white/[0.1] bg-neutral-950/85 p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl space-y-4 relative overflow-hidden transition-all hover:border-white/[0.15]">
          <div className="absolute -top-32 -right-32 w-72 h-72 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Showcase Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
              <button
                type="button"
                onClick={() => setShowcaseTab('characters')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 duration-200 select-none ${
                  showcaseTab === 'characters'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-950/50 scale-100'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 border border-transparent'
                } active:scale-95`}
              >
                <Bot className="w-3.5 h-3.5 text-cyan-400" />
                <span>Roaming Characters</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] bg-cyan-500/20 text-cyan-300 font-mono font-bold">
                  60fps
                </span>
              </button>

              <button
                type="button"
                onClick={() => setShowcaseTab('heroes')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 duration-200 select-none ${
                  showcaseTab === 'heroes'
                    ? 'bg-red-500/20 text-red-300 border border-red-500/50 shadow-md shadow-red-950/50 scale-100'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 border border-transparent'
                } active:scale-95`}
              >
                <Swords className="w-3.5 h-3.5 text-red-400" />
                <span>Action Heroes</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] bg-red-500/20 text-red-300 font-mono font-bold">
                  Live
                </span>
              </button>

              <button
                type="button"
                onClick={() => setShowcaseTab('typography')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 duration-200 select-none ${
                  showcaseTab === 'typography'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50 shadow-md shadow-indigo-950/50 scale-100'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 border border-transparent'
                } active:scale-95`}
              >
                <Type className="w-3.5 h-3.5 text-indigo-400" />
                <span>Kinetic Typography</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] bg-indigo-500/20 text-indigo-300 font-mono font-bold">
                  6 Effects
                </span>
              </button>

              <button
                type="button"
                onClick={() => setShowcaseTab('customizer')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 duration-200 select-none ${
                  showcaseTab === 'customizer'
                    ? 'bg-violet-500/20 text-violet-300 border border-violet-500/50 shadow-md shadow-violet-950/50 scale-100'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 border border-transparent'
                } active:scale-95`}
              >
                <Sliders className="w-3.5 h-3.5 text-violet-400" />
                <span>Interactive Customizer</span>
              </button>
            </div>

            <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-neutral-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Pure Vector GPU Composited
            </span>
          </div>

          {/* Tab 1: Roaming Characters */}
          {showcaseTab === 'characters' && (
            <div className="space-y-3">
              <div className="relative group rounded-2xl overflow-hidden border border-cyan-500/30 bg-neutral-950 p-2 shadow-2xl transition-all">
                <img
                  src="/assets/animated-characters.svg"
                  alt="Multi-Language Playground with Dynamic Character Kinematics"
                  width={1000}
                  height={400}
                  // @ts-ignore - React 19 / Next 16 fetchPriority support
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  className="w-full h-auto rounded-xl shadow-sm"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-[11px] text-neutral-400 font-mono">
                <span>Multi-language code environment with free-roaming characters &bull; Zero JS required</span>
                <span className="text-cyan-400 font-semibold">Sub-16ms AST Verification</span>
              </div>
            </div>
          )}

          {/* Tab 2: Action Heroes Squad */}
          {showcaseTab === 'heroes' && (
            <div className="space-y-3">
              <div className="relative group rounded-2xl overflow-hidden border border-red-500/30 bg-neutral-950 p-2 shadow-2xl transition-all">
                <img
                  src="/assets/animated-heroes-squad.svg"
                  alt="Legendary Heroes Squad with Active Actions"
                  width={1000}
                  height={400}
                  className="w-full h-auto rounded-xl shadow-sm"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-[11px] text-neutral-400 font-mono">
                <span>Action-packed vector heroes &bull; Dual katana speed trails &bull; Squash &amp; stretch hopping</span>
                <span className="text-red-400 font-semibold">Hardware-Accelerated Kinematics</span>
              </div>
            </div>
          )}

          {/* Tab 3: Kinetic Typography */}
          {showcaseTab === 'typography' && (
            <div className="space-y-4">
              {/* Presets and Effect Pickers */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-neutral-800/80">
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  {[
                    { id: 'neon', label: 'Cyber Neon', icon: <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> },
                    { id: 'glitch', label: 'RGB Glitch', icon: <Zap className="w-3.5 h-3.5 text-pink-400" /> },
                    { id: 'gradient', label: 'Holo Shimmer', icon: <Droplets className="w-3.5 h-3.5 text-emerald-400" /> },
                    { id: 'typewriter', label: 'Typewriter', icon: <Terminal className="w-3.5 h-3.5 text-sky-400" /> },
                    { id: 'wave', label: 'Harmonic Wave', icon: <Activity className="w-3.5 h-3.5 text-amber-400" /> },
                    { id: 'matrix', label: 'Matrix Rain', icon: <Flame className="w-3.5 h-3.5 text-green-400" /> },
                  ].map(eff => (
                    <button
                      key={eff.id}
                      type="button"
                      onClick={() => setTypographyPreset(eff.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all select-none ${
                        typographyPreset === eff.id
                          ? 'bg-neutral-800 text-white border border-indigo-500/60 shadow-md shadow-indigo-950/40 scale-100'
                          : 'bg-neutral-900/60 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                      }`}
                    >
                      {eff.icon}
                      <span>{eff.label}</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  <CopyButton
                    textToCopy="[![Kinetic Typography](https://raw.githubusercontent.com/username/username/main/typography.svg)](https://readmeforge.dev)"
                    label="Copy SVG Snippet"
                    copiedLabel="Copied Markdown!"
                    variant="primary"
                  />
                </div>
              </div>

              {/* Real-Time Live Rendered Kinetic Typography SVG */}
              <div className="p-2 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-inner overflow-hidden">
                <div
                  className="w-full h-auto flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: typographySvgMarkup }}
                />
              </div>

              {/* Text Input Customization Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-3 rounded-xl bg-neutral-900/50 border border-neutral-800/80 text-left text-xs">
                <div className="sm:col-span-5">
                  <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
                    Main Headline
                  </label>
                  <input
                    type="text"
                    value={typographyText}
                    onChange={e => setTypographyText(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-100 font-mono text-xs focus:border-indigo-400 outline-none"
                    placeholder="FULL-STACK CLOUD ARCHITECT"
                  />
                </div>
                <div className="sm:col-span-5">
                  <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
                    Subtitle / Bio
                  </label>
                  <input
                    type="text"
                    value={typographySubtitle}
                    onChange={e => setTypographySubtitle(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-100 font-mono text-xs focus:border-indigo-400 outline-none"
                    placeholder="Distributed Systems & Real-Time AI Toolchains"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
                    Header Tag
                  </label>
                  <input
                    type="text"
                    value={typographyTag}
                    onChange={e => setTypographyTag(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-100 font-mono text-xs focus:border-indigo-400 outline-none"
                    placeholder="OPEN SOURCE"
                  />
                </div>
              </div>

              {/* Static Showcase Overview Card */}
              <div className="relative group rounded-2xl overflow-hidden border border-indigo-500/20 bg-neutral-950 p-2 shadow-2xl transition-all">
                <img
                  src="/assets/text-effects.svg"
                  alt="Kinetic Typography and Dynamic Text Effects Engine"
                  width={900}
                  height={220}
                  className="w-full h-auto rounded-xl shadow-sm"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-[11px] text-neutral-400 font-mono">
                <span>Cyber neon &bull; Holographic shimmer &bull; Chromatic glitch &bull; Matrix phosphor code rain</span>
                <span className="text-indigo-400 font-semibold">GitHub Camo Compliant &bull; 60 FPS GPU Motion</span>
              </div>
            </div>
          )}

          {/* Tab 4: Interactive Customizer */}
          {showcaseTab === 'customizer' && (
            <div className="space-y-4">
              {/* Presets and Controls */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs pb-1 border-b border-neutral-800/80">
                <button
                  type="button"
                  onClick={() =>
                    applyPlaygroundPreset(
                      'fire',
                      'fire-border',
                      'INFERNO CLOUD ARCHITECT',
                      '#ff2a2a',
                      '#ff9900',
                      '#ffee55',
                      '#0c0404',
                      'builder-crafter',
                      'build'
                    )
                  }
                  className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all flex items-center gap-1 border ${
                    playgroundConfig.backgroundEffect === 'fire'
                      ? 'border-orange-500 bg-orange-950/50 text-orange-300 shadow-sm'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Flame className="w-3 h-3 text-orange-400" />
                  <span>Fire Embers</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    applyPlaygroundPreset(
                      'water',
                      'glassmorphism',
                      'OCEANIC DATA ENGINEER',
                      '#00b4d8',
                      '#48cae4',
                      '#90e0ef',
                      '#02121e',
                      'wizard-mage',
                      'walk'
                    )
                  }
                  className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all flex items-center gap-1 border ${
                    playgroundConfig.backgroundEffect === 'water'
                      ? 'border-cyan-500 bg-cyan-950/50 text-cyan-300 shadow-sm'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Droplets className="w-3 h-3 text-cyan-400" />
                  <span>Water Ripples</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    applyPlaygroundPreset(
                      'grids',
                      'cyber-neon',
                      'CYBERPUNK DEV ENGINE',
                      '#6366f1',
                      '#38bdf8',
                      '#c084fc',
                      '#0a0d17',
                      'pixel-dev',
                      'walk'
                    )
                  }
                  className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all flex items-center gap-1 border ${
                    playgroundConfig.backgroundEffect === 'grids'
                      ? 'border-violet-500 bg-violet-950/50 text-violet-300 shadow-sm'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Zap className="w-3 h-3 text-cyan-400" />
                  <span>Cyber Neon</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    applyPlaygroundPreset(
                      'matrix',
                      'hologram',
                      'HACKER KERNEL CORE',
                      '#22c55e',
                      '#86efac',
                      '#4ade80',
                      '#051309',
                      'cyber-bot',
                      'code'
                    )
                  }
                  className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all flex items-center gap-1 border ${
                    playgroundConfig.backgroundEffect === 'matrix'
                      ? 'border-emerald-500 bg-emerald-950/50 text-emerald-300 shadow-sm'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Square className="w-3 h-3 text-emerald-400" />
                  <span>Holo Matrix</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    applyPlaygroundPreset(
                      'stars',
                      'gold-metallic',
                      'DISTINGUISHED FELLOW',
                      '#bf953f',
                      '#fcf6ba',
                      '#b38728',
                      '#09090b',
                      'ninja-coder',
                      'cheer'
                    )
                  }
                  className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all flex items-center gap-1 border ${
                    playgroundConfig.frameEffect === 'gold-metallic'
                      ? 'border-amber-500 bg-amber-950/50 text-amber-300 shadow-sm'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Sparkle className="w-3 h-3 text-amber-400" />
                  <span>Gold Bevel</span>
                </button>
              </div>

              {/* Interactive Controls Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
                <div className="sm:col-span-6">
                  <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
                    Customize Title Text
                  </label>
                  <input
                    type="text"
                    value={playgroundConfig.headline}
                    onChange={e =>
                      setPlaygroundConfig(prev => ({ ...prev, headline: e.target.value }))
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-100 font-mono text-xs focus:border-cyan-400 outline-none"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
                    Background FX
                  </label>
                  <select
                    value={playgroundConfig.backgroundEffect}
                    onChange={e =>
                      setPlaygroundConfig(prev => ({
                        ...prev,
                        backgroundEffect: e.target.value as BackgroundEffect,
                      }))
                    }
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-100 font-mono text-xs focus:border-cyan-400 outline-none capitalize"
                  >
                    <option value="fire">Fire Embers</option>
                    <option value="water">Water Ripples</option>
                    <option value="grids">Cyber Grid</option>
                    <option value="matrix">Matrix Stream</option>
                    <option value="particles">Particles</option>
                    <option value="stars">Starry Night</option>
                    <option value="animated-gradient">Fluid Gradient</option>
                    <option value="solid">Dark Solid</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
                    Frame &amp; Border
                  </label>
                  <select
                    value={playgroundConfig.frameEffect || 'cyber-neon'}
                    onChange={e =>
                      setPlaygroundConfig(prev => ({
                        ...prev,
                        frameEffect: e.target.value as FrameEffect,
                      }))
                    }
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-100 font-mono text-xs focus:border-cyan-400 outline-none capitalize"
                  >
                    <option value="cyber-neon">Cyber Neon</option>
                    <option value="fire-border">Fire Rim</option>
                    <option value="glassmorphism">Glass Sheen</option>
                    <option value="terminal-crt">Terminal CRT</option>
                    <option value="hologram">Hologram HUD</option>
                    <option value="gold-metallic">Metallic Gold</option>
                    <option value="none">No Frame</option>
                  </select>
                </div>

                {/* Character & Action Controls */}
                <div className="sm:col-span-6">
                  <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1 flex items-center gap-1">
                    <Bot className="w-3 h-3 text-emerald-400" />
                    <span>Vector Character</span>
                  </label>
                  <select
                    value={playgroundConfig.characterType || 'builder-crafter'}
                    onChange={e =>
                      setPlaygroundConfig(prev => ({
                        ...prev,
                        characterType: e.target.value as CharacterType,
                      }))
                    }
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-100 font-mono text-xs focus:border-cyan-400 outline-none capitalize"
                  >
                    <option value="demon-slayer">Demon Slayer (Flame Mark &amp; Katana)</option>
                    <option value="night-coder">Night Coder (2 AM Hoodie &amp; Glow Laptop)</option>
                    <option value="builder-crafter">Builder Crafter (Hardhat &amp; Vest)</option>
                    <option value="pixel-dev">Pixel Dev (Hoodie &amp; Visor)</option>
                    <option value="cyber-bot">Cyber Bot (Thruster &amp; Antenna)</option>
                    <option value="ninja-coder">Ninja Coder (Mask &amp; Ribbon)</option>
                    <option value="wizard-mage">Wizard Mage (Hat &amp; Magic Staff)</option>
                    <option value="none">No Character</option>
                  </select>
                </div>

                <div className="sm:col-span-6">
                  <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1 flex items-center gap-1">
                    {playgroundConfig.characterAction === 'build' ? (
                      <Hammer className="w-3 h-3 text-amber-400" />
                    ) : (
                      <Footprints className="w-3 h-3 text-cyan-400" />
                    )}
                    <span>Character Action</span>
                  </label>
                  <select
                    value={playgroundConfig.characterAction || 'build'}
                    onChange={e =>
                      setPlaygroundConfig(prev => ({
                        ...prev,
                        characterAction: e.target.value as CharacterAction,
                      }))
                    }
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-100 font-mono text-xs focus:border-cyan-400 outline-none capitalize"
                  >
                    <option value="build">Build (Stack Tech Blocks &amp; Sparks)</option>
                    <option value="walk">Walk (Patrol Ground Baseline)</option>
                    <option value="code">Code (Floating Terminal HUD)</option>
                    <option value="construct">Construct (Weld Circuit Truss)</option>
                    <option value="cheer">Cheer (Victory Jump &amp; Confetti)</option>
                  </select>
                </div>
              </div>

              {/* Real-Time SVG Render Output */}
              <div className="p-2 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-inner overflow-hidden">
                <div
                  className="w-full h-auto flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: liveSvgMarkup }}
                />
              </div>

              {/* Playground Bottom Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                <span className="text-[11px] text-neutral-400 font-mono">
                  Pure Vector SVG &bull; GitHub Camo Sanitizer Compliant &bull; No JS Required
                </span>

                <div className="flex items-center gap-2">
                  <CopyButton
                    textToCopy="[![Dynamic Header](https://raw.githubusercontent.com/username/username/main/header.svg)](https://readmeforge.dev)"
                    label="Copy Snippet"
                    copiedLabel="Copied Markdown!"
                    variant="primary"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Official IDE Ecosystem Bar, Supported Platforms & Community Badges */}
      <IdeIntegrationShelf
        selectedTab={selectedTab}
        onSelectTab={setSelectedTab}
      />
    </section>
  );
};

export default HeroSection;

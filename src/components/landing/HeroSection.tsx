'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';
import {
  Wand2,
  Terminal,
  FileUp,
  Sparkles,
  Flame,
  Droplets,
  Copy,
  Check,
  Download,
  Sparkle,
  Zap,
  Package,
  Terminal as TerminalIcon,
  Sliders,
  Square,
  Bot,
  Hammer,
  Footprints,
} from 'lucide-react';
import { ResumeUpload } from '#/components/enrichment/ResumeUpload';
import { importReadmeFromMarkdown } from '#/lib/parser/import-readme';
import { useReadmeStore } from '#/store/useReadmeStore';
import {
  ClaudeLogo,
  AntigravityLogo,
  VsCodeLogo,
  CursorLogo,
  WindsurfLogo,
  NeovimLogo,
} from '#/components/common/IdeLogos';
import { generateAnimatedSvg } from '#/lib/animator/presets';
import {
  AnimationConfig,
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
    id: 'npx',
    label: 'NPX Instant',
    icon: <Zap className="w-3.5 h-3.5 text-cyan-400" />,
    command: 'npx readmeforge@latest',
    description: 'Instant zero-install execution in your local browser',
    badge: 'Fastest',
  },
  {
    id: 'claude',
    label: 'Claude Code',
    icon: <ClaudeLogo className="w-3.5 h-3.5" />,
    command: 'claude mcp add readmeforge -- npx -y readmeforge',
    description: 'Mount as native Model Context Protocol (MCP) tool in Anthropic Claude Code',
    badge: 'AI Agent',
  },
  {
    id: 'antigravity',
    label: 'Antigravity IDE',
    icon: <AntigravityLogo className="w-3.5 h-3.5" />,
    command: 'agy add plugin readmeforge',
    description: 'Native agent integration for Google DeepMind Antigravity studio',
    badge: 'DeepMind',
  },
  {
    id: 'cursor',
    label: 'Cursor IDE',
    icon: <CursorLogo className="w-3.5 h-3.5" />,
    command: 'cursor --install-extension readmeforge',
    description: 'AI-first code editor extension for real-time README preview & generation',
    badge: 'Editor',
  },
  {
    id: 'vscode',
    label: 'VS Code',
    icon: <VsCodeLogo className="w-3.5 h-3.5" />,
    command: 'code --install-extension readmeforge',
    description: 'Visual Studio Code native extension with split-pane live preview',
    badge: 'Extension',
  },
  {
    id: 'pnpm',
    label: 'PNPM / CLI',
    icon: <Package className="w-3.5 h-3.5 text-amber-400" />,
    command: 'pnpm dlx readmeforge',
    description: 'High-performance standalone package runner',
    badge: 'Lightweight',
  },
  {
    id: 'curl',
    label: 'Bash / Curl',
    icon: <TerminalIcon className="w-3.5 h-3.5 text-blue-400" />,
    command: 'curl -fsSL https://git.new/readmeforge | bash',
    description: 'Automated 1-line shell installer with auto-dependency check',
    badge: 'Unix',
  },
];

export const HeroSection: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('npx');
  const [copied, setCopied] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const setEntireConfig = useReadmeStore(state => state.setEntireConfig);

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

  const [copiedSnippet, setCopiedSnippet] = useState(false);

  // Generate live SVG
  const liveSvgMarkup = useMemo(() => generateAnimatedSvg(playgroundConfig), [playgroundConfig]);

  const activeOption = INSTALL_OPTIONS.find(o => o.id === selectedTab) || INSTALL_OPTIONS[0];

  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText(activeOption.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleCopyMarkdown = async () => {
    const snippet = `[![Dynamic Header](https://raw.githubusercontent.com/username/username/main/header.svg)](https://readmeforge.dev)`;
    try {
      await navigator.clipboard.writeText(snippet);
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    } catch {
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    }
  };

  const handleImportSubmit = () => {
    if (!importText.trim()) return;
    const { config } = importReadmeFromMarkdown(importText);
    setEntireConfig(config);
    setIsImportOpen(false);
    document.getElementById('wizard-builder')?.scrollIntoView({ behavior: 'smooth' });
  };

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
          <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(56,189,248,0.35)]">
            gets noticed.
          </span>
        </h1>

        <div className="text-base sm:text-xl font-medium text-neutral-300 min-h-[40px] flex items-center justify-center font-mono">
          <span className="text-cyan-400 mr-2 font-bold">❯</span>
          <TypeAnimation
            sequence={[
              'Turn your GitHub profile into an iconic developer portfolio.',
              2200,
              'Dynamic fire embers, fluid water ripples, and cyber frame effects.',
              2200,
              'Native toolchain in Claude Code, Google Antigravity & Cursor.',
              2200,
              'Split-screen Monaco IDE with real-time JSON validation.',
              2200,
              'Zero config required — from blank slate to profile-ready Markdown.',
              2200,
            ]}
            wrapper="span"
            speed={55}
            repeat={Infinity}
            className="text-neutral-200 font-semibold"
          />
        </div>
      </div>

      {/* High-Tech 1-Line Install Command Console with Official IDE Logos */}
      <div className="max-w-3xl mx-auto">
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
                      setCopied(false);
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

            {/* Quick Copy Button */}
            <button
              type="button"
              onClick={handleCopyCommand}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold font-sans transition-all duration-200 shrink-0 select-none shadow-md ${
                copied
                  ? 'bg-emerald-600 text-white shadow-emerald-900/40 scale-105'
                  : 'bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white shadow-cyan-900/30 hover:scale-105'
              } active:scale-95`}
              title="Copy 1-line command to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
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
        <a
          href="#wizard-builder"
          className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-violet-900/40 transition-all hover:scale-105 hover:-translate-y-0.5 active:scale-95 select-none"
        >
          <Wand2 className="w-4 h-4 text-cyan-200 animate-spin-slow" />
          <span>Launch Visual Wizard</span>
        </a>

        <a
          href="https://github.com/yuvrajlaptop2008-byte/readmeforge/archive/refs/heads/main.zip"
          download
          className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 hover:border-emerald-500/50 text-neutral-100 font-semibold text-sm transition-all hover:scale-105 active:scale-95 select-none shadow-md"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Download (.ZIP)</span>
        </a>

        <Link
          href="/developer"
          className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-cyan-500/40 text-neutral-200 font-medium text-sm transition-all hover:scale-105 active:scale-95 select-none"
        >
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>/developer IDE</span>
        </Link>

        <Link
          href="/animator"
          className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-fuchsia-500/40 text-neutral-200 font-medium text-sm transition-all hover:scale-105 active:scale-95 select-none"
        >
          <Sparkle className="w-4 h-4 text-fuchsia-400" />
          <span>Animation Studio</span>
        </Link>

        <button
          type="button"
          onClick={() => setIsImportOpen(true)}
          className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 font-medium text-sm transition-all hover:scale-105 active:scale-95 select-none"
        >
          <FileUp className="w-4 h-4 text-violet-400" />
          <span>Import README</span>
        </button>

        <button
          type="button"
          onClick={() => setIsResumeOpen(true)}
          className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 font-medium text-sm transition-all hover:scale-105 active:scale-95 select-none"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>AI Resume</span>
        </button>
      </div>

      {/* LIVE INTERACTIVE EFFECTS & FRAME PLAYGROUND (Maximizes User Engagement) */}
      <div className="max-w-4xl mx-auto text-left pt-4">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950/80 p-5 shadow-2xl backdrop-blur-md space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400 animate-spin-slow" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-neutral-200">
                Live Interactive Effects &amp; Frame Forge
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-300 font-mono border border-cyan-800/50">
                60 FPS Vector
              </span>
            </div>

            {/* Quick Presets Bar */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
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
          <div className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 shadow-inner overflow-hidden">
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
              <Link
                href="/animator"
                className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-medium text-xs transition-colors flex items-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>Open Full Studio</span>
              </Link>

              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-all shadow-md flex items-center gap-1.5"
              >
                {copiedSnippet ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Copied Markdown!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Official IDE Ecosystem Bar with Vector Logos */}
      <div className="pt-2 max-w-4xl mx-auto space-y-3">
        {/* Verified IDE & AI Agent Integration Shelf */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-left">
          <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center gap-2 transition-colors hover:border-orange-500/40">
            <ClaudeLogo className="w-4 h-4 shrink-0" />
            <div>
              <div className="text-[11px] font-bold text-neutral-200">Claude Code</div>
              <div className="text-[9px] text-orange-400 font-mono">Anthropic MCP</div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center gap-2 transition-colors hover:border-emerald-500/40">
            <AntigravityLogo className="w-4 h-4 shrink-0" />
            <div>
              <div className="text-[11px] font-bold text-neutral-200">Antigravity</div>
              <div className="text-[9px] text-emerald-400 font-mono">DeepMind IDE</div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center gap-2 transition-colors hover:border-sky-500/40">
            <VsCodeLogo className="w-4 h-4 shrink-0" />
            <div>
              <div className="text-[11px] font-bold text-neutral-200">VS Code</div>
              <div className="text-[9px] text-sky-400 font-mono">Split Preview</div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center gap-2 transition-colors hover:border-cyan-500/40">
            <CursorLogo className="w-4 h-4 shrink-0" />
            <div>
              <div className="text-[11px] font-bold text-neutral-200">Cursor</div>
              <div className="text-[9px] text-cyan-400 font-mono">AI Generator</div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center gap-2 transition-colors hover:border-teal-500/40">
            <WindsurfLogo className="w-4 h-4 shrink-0" />
            <div>
              <div className="text-[11px] font-bold text-neutral-200">Windsurf</div>
              <div className="text-[9px] text-teal-400 font-mono">Codeium Flow</div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center gap-2 transition-colors hover:border-green-500/40">
            <NeovimLogo className="w-4 h-4 shrink-0" />
            <div>
              <div className="text-[11px] font-bold text-neutral-200">Neovim</div>
              <div className="text-[9px] text-green-400 font-mono">Terminal CLI</div>
            </div>
          </div>
        </div>

        {/* Vector SVG Badge Suite */}
        <div className="p-1 rounded-xl bg-neutral-950/60 border border-neutral-800/80 shadow-inner">
          <img
            src="/assets/agent-suite.svg"
            alt="Supported Platforms: Claude Code, Google Antigravity, VS Code, Cursor, and Zero Telemetry"
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Fun Community Badges */}
        <div className="p-1 rounded-xl bg-neutral-950/60 border border-neutral-800/80 shadow-inner">
          <img
            src="/assets/developer-fun-badges.svg"
            alt="Developer Community Badges: Works on My Machine, Coffee to Code Engine, Friday Deployer"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>

      {/* Resume Upload Modal */}
      <ResumeUpload
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Import Modal */}
      {isImportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl p-6 space-y-4 text-left">
            <h3 className="text-sm font-bold text-neutral-100 flex items-center gap-2">
              <FileUp className="w-4 h-4 text-violet-400" />
              Paste Existing GitHub README.md
            </h3>
            <textarea
              rows={8}
              value={importText}
              onChange={e => setImportText(e.target.value)}
              placeholder="# Developer Profile&#10;&#10;- Working on: Distributed systems..."
              className="w-full p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs font-mono text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-violet-500 leading-relaxed"
            />
            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsImportOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-400 hover:text-neutral-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleImportSubmit}
                className="px-5 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
              >
                Parse &amp; Import
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;

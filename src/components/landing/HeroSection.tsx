'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';
import {
  Wand2,
  Terminal,
  FileUp,
  Sparkles,
  Flame,
  Copy,
  Check,
  Download,
  Sparkle,
  Zap,
  Bot,
  Rocket,
  Package,
  Terminal as TerminalIcon,
} from 'lucide-react';
import { ResumeUpload } from '#/components/enrichment/ResumeUpload';
import { importReadmeFromMarkdown } from '#/lib/parser/import-readme';
import { useReadmeStore } from '#/store/useReadmeStore';

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
    icon: <Bot className="w-3.5 h-3.5 text-purple-400" />,
    command: 'claude mcp add readmeforge -- npx -y readmeforge',
    description: 'Mount as native Model Context Protocol (MCP) tool in Anthropic Claude Code',
    badge: 'AI Agent',
  },
  {
    id: 'antigravity',
    label: 'Antigravity IDE',
    icon: <Rocket className="w-3.5 h-3.5 text-emerald-400" />,
    command: 'agy add plugin readmeforge',
    description: 'Native agent integration for Google DeepMind Antigravity studio',
    badge: 'DeepMind',
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

  const activeOption = INSTALL_OPTIONS.find(o => o.id === selectedTab) || INSTALL_OPTIONS[0];

  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText(activeOption.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleImportSubmit = () => {
    if (!importText.trim()) return;
    const { config } = importReadmeFromMarkdown(importText);
    setEntireConfig(config);
    setIsImportOpen(false);
    document.getElementById('wizard-builder')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-12 pb-16 px-4 max-w-6xl mx-auto text-center space-y-9 z-10">
      {/* Top Pill with Glow */}
      <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-violet-950/70 border border-violet-700/60 text-violet-200 text-xs font-semibold shadow-lg shadow-violet-950/40 backdrop-blur-md transition-all hover:border-violet-500 hover:scale-105 active:scale-95 cursor-default select-none">
        <Flame className="w-4 h-4 text-cyan-400 animate-pulse" />
        <span className="tracking-wide">NEXT-GEN PROFILE README STUDIO</span>
        <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400 animate-ping" />
      </div>

      {/* Main Title with Iridescent Shimmer Text Effect */}
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
              'Dynamic stats, trophies, typing lines, and contribution snakes.',
              2200,
              'Install with a single command in Claude Code & Antigravity.',
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

      {/* High-Tech 1-Line Install Command Console */}
      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl bg-neutral-950/90 border border-cyan-500/30 p-4 sm:p-5 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl relative overflow-hidden transition-all hover:border-cyan-500/50">
          {/* Subtle Ambient Laser Glow */}
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
        {/* Launch Wizard Button */}
        <a
          href="#wizard-builder"
          className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-violet-900/40 transition-all hover:scale-105 hover:-translate-y-0.5 active:scale-95 select-none"
        >
          <Wand2 className="w-4 h-4 text-cyan-200 animate-spin-slow" />
          <span>Launch Visual Wizard</span>
        </a>

        {/* Download Repo ZIP Button */}
        <a
          href="https://github.com/yuvrajlaptop2008-byte/readmeforge/archive/refs/heads/main.zip"
          download
          className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 hover:border-emerald-500/50 text-neutral-100 font-semibold text-sm transition-all hover:scale-105 active:scale-95 select-none shadow-md"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Download (.ZIP)</span>
        </a>

        {/* Developer IDE */}
        <Link
          href="/developer"
          className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-cyan-500/40 text-neutral-200 font-medium text-sm transition-all hover:scale-105 active:scale-95 select-none"
        >
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>/developer IDE</span>
        </Link>

        {/* Animation Studio */}
        <Link
          href="/animator"
          className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-fuchsia-500/40 text-neutral-200 font-medium text-sm transition-all hover:scale-105 active:scale-95 select-none"
        >
          <Sparkle className="w-4 h-4 text-fuchsia-400" />
          <span>Animation Studio</span>
        </Link>

        {/* Import README */}
        <button
          type="button"
          onClick={() => setIsImportOpen(true)}
          className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 font-medium text-sm transition-all hover:scale-105 active:scale-95 select-none"
        >
          <FileUp className="w-4 h-4 text-violet-400" />
          <span>Import README</span>
        </button>

        {/* Resume Enrich */}
        <button
          type="button"
          onClick={() => setIsResumeOpen(true)}
          className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 font-medium text-sm transition-all hover:scale-105 active:scale-95 select-none"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>AI Resume</span>
        </button>
      </div>

      {/* Verified Ecosystem Badges Showcase */}
      <div className="pt-2 max-w-4xl mx-auto space-y-3">
        <div className="p-1 rounded-xl bg-neutral-950/60 border border-neutral-800/80 shadow-inner">
          <img
            src="/assets/agent-suite.svg"
            alt="Supported Platforms: Claude Code, Google Antigravity, Turbopack, and Zero Telemetry"
            className="w-full h-auto rounded-lg"
          />
        </div>
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

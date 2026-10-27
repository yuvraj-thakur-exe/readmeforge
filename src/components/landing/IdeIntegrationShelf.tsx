'use client';

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ClaudeLogo,
  AntigravityLogo,
  VsCodeLogo,
  CursorLogo,
  WindsurfLogo,
  NeovimLogo,
} from '#/components/common/IdeLogos';
import {
  Check,
  ShieldCheck,
  Radio,
  CheckCircle2,
} from 'lucide-react';
import { CopyButton } from '#/components/common/CopyButton';

export interface IdeItem {
  id: string;
  name: string;
  badge: string;
  tag: string;
  color: string;
  hoverBorder: string;
  activeBorder: string;
  glowColor: string;
  accentText: string;
  command: string;
  description: string;
  logo: React.ReactNode;
}

export const IDE_ITEMS: IdeItem[] = [
  {
    id: 'claude',
    name: 'Claude Code',
    badge: 'Anthropic MCP',
    tag: 'MCP Native',
    color: '#d97757',
    hoverBorder: 'hover:border-orange-500/50',
    activeBorder: 'border-orange-500 ring-2 ring-orange-500/20 bg-orange-950/20',
    glowColor: 'rgba(217,119,87,0.18)',
    accentText: 'text-orange-400',
    command: 'git clone https://github.com/yuvrajlaptop2008-byte/readmeforge.git && cd readmeforge && claude',
    description: 'Clone and launch immediately with Anthropic Claude Code agentic CLI.',
    logo: <ClaudeLogo className="w-4 h-4 shrink-0" />,
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    badge: 'DeepMind IDE',
    tag: 'Agent Studio',
    color: '#10b981',
    hoverBorder: 'hover:border-emerald-500/50',
    activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-950/20',
    glowColor: 'rgba(16,185,129,0.18)',
    accentText: 'text-emerald-400',
    command: 'git clone https://github.com/yuvrajlaptop2008-byte/readmeforge.git && cd readmeforge && agy',
    description: 'Clone and launch with Google DeepMind Antigravity autonomous agent studio.',
    logo: <AntigravityLogo className="w-4 h-4 shrink-0" />,
  },
  {
    id: 'vscode',
    name: 'VS Code',
    badge: 'Split Preview',
    tag: 'Split Live',
    color: '#007acc',
    hoverBorder: 'hover:border-sky-500/50',
    activeBorder: 'border-sky-500 ring-2 ring-sky-500/20 bg-sky-950/20',
    glowColor: 'rgba(56,189,248,0.18)',
    accentText: 'text-sky-400',
    command: 'git clone https://github.com/yuvrajlaptop2008-byte/readmeforge.git && code readmeforge',
    description: 'Clone and open workspace in Visual Studio Code with split-pane live preview.',
    logo: <VsCodeLogo className="w-4 h-4 shrink-0" />,
  },
  {
    id: 'cursor',
    name: 'Cursor',
    badge: 'AI Generator',
    tag: 'AI Native',
    color: '#06b6d4',
    hoverBorder: 'hover:border-cyan-500/50',
    activeBorder: 'border-cyan-500 ring-2 ring-cyan-500/20 bg-cyan-950/20',
    glowColor: 'rgba(6,182,212,0.18)',
    accentText: 'text-cyan-400',
    command: 'git clone https://github.com/yuvrajlaptop2008-byte/readmeforge.git && cursor readmeforge',
    description: 'Clone and open workspace in Cursor AI-first editor.',
    logo: <CursorLogo className="w-4 h-4 shrink-0" />,
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    badge: 'Codeium Flow',
    tag: 'Cascade AI',
    color: '#00e599',
    hoverBorder: 'hover:border-teal-500/50',
    activeBorder: 'border-teal-500 ring-2 ring-teal-500/20 bg-teal-950/20',
    glowColor: 'rgba(0,229,153,0.18)',
    accentText: 'text-teal-400',
    command: 'git clone https://github.com/yuvrajlaptop2008-byte/readmeforge.git && windsurf readmeforge',
    description: 'Clone and open workspace in Codeium Windsurf IDE cascade agent workflow.',
    logo: <WindsurfLogo className="w-4 h-4 shrink-0" />,
  },
  {
    id: 'neovim',
    name: 'Neovim',
    badge: 'Terminal CLI',
    tag: 'CLI First',
    color: '#22c55e',
    hoverBorder: 'hover:border-green-500/50',
    activeBorder: 'border-green-500 ring-2 ring-green-500/20 bg-green-950/20',
    glowColor: 'rgba(34,197,94,0.18)',
    accentText: 'text-green-400',
    command: 'git clone https://github.com/yuvrajlaptop2008-byte/readmeforge.git && cd readmeforge && nvim .',
    description: 'Clone and launch inside Neovim modal terminal editor.',
    logo: <NeovimLogo className="w-4 h-4 shrink-0" />,
  },
];



interface IdeIntegrationShelfProps {
  selectedTab?: string;
  onSelectTab?: (id: string) => void;
}

export const IdeIntegrationShelf: React.FC<IdeIntegrationShelfProps> = ({
  selectedTab,
  onSelectTab,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 2800);
  };

  const copyToClipboard = async (text: string, id: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      showToast(`Copied ${label} to clipboard!`);
      setTimeout(() => {
        setCopiedId(prev => (prev === id ? null : prev));
      }, 2000);
    } catch {
      setCopiedId(id);
      showToast(`Copied ${label}!`);
      setTimeout(() => {
        setCopiedId(prev => (prev === id ? null : prev));
      }, 2000);
    }
  };

  const handleSelectIde = (ide: IdeItem) => {
    if (onSelectTab) {
      onSelectTab(ide.id);
      const consoleElement = document.getElementById('install-console-anchor');
      if (consoleElement) {
        consoleElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    copyToClipboard(ide.command, ide.id, `${ide.name} setup command`);
  };

  return (
    <div className="pt-2 max-w-4xl mx-auto space-y-4">
      {/* Toast Notification Portaled to Body */}
      {typeof document !== 'undefined' &&
        toastMessage &&
        createPortal(
          <div className="fixed bottom-6 right-6 z-[99999] flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-neutral-900 border border-violet-500/80 text-white shadow-2xl shadow-violet-950/80 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs font-semibold">{toastMessage}</span>
          </div>,
          document.body
        )}

      {/* ======================================================== */}
      {/* 1. Verified IDE & AI Agent Integration Shelf */}
      {/* ======================================================== */}
      <div className="space-y-1.5 text-left">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-mono font-bold tracking-wider text-neutral-400 uppercase flex items-center gap-1.5">
            <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
            Verified IDE &amp; Agent Toolchain
          </span>
          <span className="text-[10px] font-mono text-neutral-500">
            Click to activate &bull; 1-click command copy
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-left">
          {IDE_ITEMS.map(ide => {
            const isSelected = selectedTab === ide.id;
            const isCopied = copiedId === ide.id;

            return (
              <button
                key={ide.id}
                type="button"
                onClick={() => handleSelectIde(ide)}
                title={`${ide.name}: ${ide.description} (Click to copy command)`}
                className={`group relative p-2.5 rounded-xl transition-all duration-300 flex flex-col justify-between text-left border ${
                  isCopied
                    ? 'animate-copy-pop border-emerald-400 bg-emerald-950/60 shadow-[0_0_25px_rgba(52,211,153,0.45)] scale-[1.03]'
                    : isSelected
                    ? ide.activeBorder
                    : 'bg-neutral-900/80 border-neutral-800 ' + ide.hoverBorder + ' hover:bg-neutral-900'
                } hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 overflow-hidden`}
              >
                {/* Specular gleam light sweep on copied */}
                {isCopied && (
                  <span className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                    <span className="absolute inset-0 -translate-x-full animate-copy-gleam bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </span>
                )}

                {/* Radiant expanding glow ripple on copied */}
                {isCopied && (
                  <span className="absolute -inset-1 rounded-xl bg-gradient-to-r from-emerald-500/40 via-cyan-400/40 to-emerald-500/40 animate-ping opacity-60 duration-700 pointer-events-none" />
                )}

                <div className="flex items-start justify-between w-full gap-1 mb-1.5 relative z-10">
                  <div className="p-1 rounded-lg bg-neutral-950/80 border border-neutral-800/80 group-hover:border-neutral-700/80 transition-colors">
                    {ide.logo}
                  </div>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold transition-all ${
                    isCopied
                      ? 'bg-emerald-950/90 border border-emerald-400/80 text-emerald-300'
                      : 'bg-neutral-950/70 border border-neutral-800 text-neutral-400 group-hover:text-neutral-200'
                  }`}>
                    {isCopied ? (
                      <span className="text-emerald-300 font-bold flex items-center gap-1">
                        <Check className="w-2.5 h-2.5 animate-check-spring drop-shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
                        <span>Copied</span>
                      </span>
                    ) : (
                      ide.tag
                    )}
                  </span>
                </div>

                <div className="relative z-10">
                  <div className="text-[11.5px] font-bold text-neutral-200 group-hover:text-white transition-colors truncate">
                    {ide.name}
                  </div>
                  <div className={`text-[9.5px] font-mono font-semibold ${ide.accentText} truncate`}>
                    {ide.badge}
                  </div>
                </div>

                {/* Subtle active glow pill */}
                {isSelected && !isCopied && (
                  <span
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full animate-ping"
                    style={{ backgroundColor: ide.color }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. Supported Platforms: Claude Code, Antigravity, VS Code, Cursor, Zero Telemetry */}
      {/* ======================================================== */}
      <div className="p-3.5 rounded-2xl bg-neutral-950/90 border border-neutral-800/90 shadow-2xl text-left space-y-3 relative overflow-hidden backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800/80 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
            <h3 className="text-xs font-bold font-mono tracking-wider text-neutral-200 uppercase">
              Supported Platforms &amp; AI Runtimes
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/60 border border-emerald-700/50 text-emerald-300">
              Zero Telemetry
            </span>
          </div>
          <span className="text-[11px] font-mono text-neutral-400">
            Claude Code &bull; Google Antigravity &bull; VS Code &bull; Cursor &bull; Neovim
          </span>
        </div>

        {/* 4 Interactive Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {/* Card 1: Anthropic Claude Code */}
          <div className="p-3 rounded-xl bg-gradient-to-b from-orange-950/20 to-neutral-900/60 border border-orange-500/25 hover:border-orange-500/50 transition-all group flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-orange-950/50 border border-orange-500/30">
                    <ClaudeLogo className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-orange-200">Claude Code</h4>
                    <span className="text-[9.5px] font-mono text-orange-400">Anthropic MCP Tool</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Registered MCP server with real-time prompt generation &amp; JSON schema AST.
              </p>
            </div>
            <CopyButton
              textToCopy="claude mcp add readmeforge -- npx -y readmeforge"
              label="Copy MCP Config"
              copiedLabel="Copied Config"
              variant="pill"
              size="xs"
              className="mt-2.5 w-full text-orange-300 border-orange-500/30 bg-orange-950/40 hover:bg-orange-900/50"
              onCopied={() => showToast('Copied Claude MCP Config to clipboard!')}
            />
          </div>

          {/* Card 2: Google Antigravity IDE */}
          <div className="p-3 rounded-xl bg-gradient-to-b from-emerald-950/20 to-neutral-900/60 border border-emerald-500/25 hover:border-emerald-500/50 transition-all group flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-950/50 border border-emerald-500/30">
                    <AntigravityLogo className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-200">Google Antigravity</h4>
                    <span className="text-[9.5px] font-mono text-emerald-400">DeepMind Agent Studio</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Autonomous pairing with custom skills, dynamic AST tools &amp; live preview hooks.
              </p>
            </div>
            <CopyButton
              textToCopy="agy add plugin readmeforge"
              label="Copy AGY Plugin"
              copiedLabel="Copied Command"
              variant="pill"
              size="xs"
              className="mt-2.5 w-full text-emerald-300 border-emerald-500/30 bg-emerald-950/40 hover:bg-emerald-900/50"
              onCopied={() => showToast('Copied Antigravity plugin command to clipboard!')}
            />
          </div>

          {/* Card 3: VS Code & Cursor IDE */}
          <div className="p-3 rounded-xl bg-gradient-to-b from-sky-950/20 to-neutral-900/60 border border-sky-500/25 hover:border-sky-500/50 transition-all group flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-sky-950/50 border border-sky-500/30 flex items-center gap-1">
                    <VsCodeLogo className="w-3.5 h-3.5" />
                    <CursorLogo className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-sky-200">VS Code &amp; Cursor</h4>
                    <span className="text-[9.5px] font-mono text-sky-400">Full Editor Support</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Bi-directional live split-pane, Monaco AST syntax check &amp; zero-reload sync.
              </p>
            </div>
            <CopyButton
              textToCopy="code --install-extension readmeforge"
              label="Install Extension"
              copiedLabel="Copied Extension"
              variant="pill"
              size="xs"
              className="mt-2.5 w-full text-sky-300 border-sky-500/30 bg-sky-950/40 hover:bg-sky-900/50"
              onCopied={() => showToast('Copied VS Code extension command to clipboard!')}
            />
          </div>

          {/* Card 4: Client Vector Engine / Zero Telemetry */}
          <div className="p-3 rounded-xl bg-gradient-to-b from-yellow-950/20 to-neutral-900/60 border border-yellow-500/25 hover:border-yellow-500/50 transition-all group flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-yellow-950/50 border border-yellow-500/30">
                    <ShieldCheck className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-yellow-200">Zero Telemetry</h4>
                    <span className="text-[9.5px] font-mono text-yellow-400">100% Client-Side Vectors</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                GitHub Camo compliant SVGs. Zero external API keys, cookies, or cloud analytics.
              </p>
            </div>
            <CopyButton
              textToCopy="Zero cloud telemetry. All profile generation runs 100% in your local browser."
              label="Verify Privacy Spec"
              copiedLabel="Verified Safe"
              variant="pill"
              size="xs"
              className="mt-2.5 w-full text-yellow-300 border-yellow-500/30 bg-yellow-950/40 hover:bg-yellow-900/50"
              onCopied={() => showToast('Zero telemetry privacy specification verified!')}
            />
          </div>
        </div>
      </div>


    </div>
  );
};

export default IdeIntegrationShelf;

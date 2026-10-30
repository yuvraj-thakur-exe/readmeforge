'use client';

import { Suspense, useEffect, useState } from 'react';
import { Link } from '#/i18n/navigation';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useReadmeStore } from '#/store/useReadmeStore';
import { LivePreview } from '#/components/developer/LivePreview';
import { PluginPanel } from '#/components/developer/PluginPanel';
import { ExportBar } from '#/components/developer/ExportBar';
import { GitHubSyncModal } from '#/components/sync/GitHubSyncModal';
import { CyberMonkeyCopilot } from '#/components/mascot/CyberMonkeyCopilot';
import {
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  Flame,
  Wand2,
  BookOpen,
  Eye,
  FileCode2,
} from 'lucide-react';

const Editor = dynamic(
  () => import('#/components/developer/Editor').then(mod => mod.Editor),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full bg-[#18181b] text-neutral-400 text-xs font-mono">
        Loading Monaco Editor...
      </div>
    ),
  }
);

function LocalizedDeveloperContent() {
  const searchParams = useSearchParams();
  const config = useReadmeStore(state => state.config);
  const setEntireConfig = useReadmeStore(state => state.setEntireConfig);
  const updateSettings = useReadmeStore(state => state.updateSettings);

  const [showPluginPanel, setShowPluginPanel] = useState<boolean>(true);
  const [showCopilot, setShowCopilot] = useState<boolean>(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview' | 'plugins' | 'copilot'>('editor');

  // Decode config from URL if provided (?config=base64)
  useEffect(() => {
    const configParam = searchParams?.get('config');
    if (configParam) {
      try {
        const decoded = decodeURIComponent(escape(atob(configParam)));
        setEntireConfig(decoded);
      } catch {
        // Ignore invalid URL param
      }
    }
  }, [searchParams, setEntireConfig]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500/20 selection:text-amber-200">
      {/* Top Studio Header */}
      <header className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-neutral-900 border-b border-neutral-800 z-10 shrink-0 gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group">
            <div className="p-1.5 rounded-lg bg-neutral-800 border border-neutral-700 group-hover:border-amber-400 transition-colors">
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-neutral-100">
              ReadmeForge
            </span>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300">
              /developer
            </span>
          </Link>

          <div className="h-4 w-px bg-neutral-800 mx-1 hidden sm:block" />

          {/* Desktop Plugin Drawer Toggle */}
          <button
            type="button"
            onClick={() => setShowPluginPanel(prev => !prev)}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs transition-colors ${
              showPluginPanel
                ? 'bg-neutral-800 text-amber-300 border border-amber-500/40'
                : 'bg-neutral-800/60 text-neutral-400 hover:text-neutral-200'
            }`}
            title="Toggle Arsenal & Templates Drawer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Arsenal &amp; Presets</span>
            {showPluginPanel ? (
              <ChevronLeft className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
          </button>

          {/* Cyber Monkey Co-Pilot Toggle */}
          <button
            type="button"
            onClick={() => setShowCopilot(prev => !prev)}
            className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
              showCopilot
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                : 'bg-neutral-800/60 text-neutral-400 hover:text-amber-300'
            }`}
            title="Toggle Cyber Monkey Co-Pilot Assistant"
          >
            <span>🐵</span>
            <span>Co-Pilot</span>
          </button>
        </div>

        {/* Mobile View Switcher */}
        <div className="flex md:hidden items-center bg-neutral-950 border border-neutral-800 rounded-md p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setMobileTab('editor')}
            className={`px-2 py-1 rounded flex items-center gap-1 ${
              mobileTab === 'editor'
                ? 'bg-amber-500 text-neutral-950 font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <FileCode2 className="w-3 h-3" />
            <span>Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('preview')}
            className={`px-2 py-1 rounded flex items-center gap-1 ${
              mobileTab === 'preview'
                ? 'bg-amber-500 text-neutral-950 font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('plugins')}
            className={`px-2 py-1 rounded flex items-center gap-1 ${
              mobileTab === 'plugins'
                ? 'bg-amber-500 text-neutral-950 font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Arsenal</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('copilot')}
            className={`px-2 py-1 rounded flex items-center gap-1 ${
              mobileTab === 'copilot'
                ? 'bg-amber-500 text-neutral-950 font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <span>🐵</span>
          </button>
        </div>

        {/* Quick Design Token Pickers (Marco Madonna style) */}
        <div className="hidden xl:flex items-center gap-2 bg-neutral-950/80 px-2.5 py-1 rounded-lg border border-neutral-800 text-xs">
          <span className="text-[10px] font-mono text-neutral-400 font-semibold uppercase">Style:</span>
          {/* Badge Style Switcher */}
          <div className="flex items-center gap-1">
            {(['for-the-badge', 'flat', 'flat-square'] as const).map(style => (
              <button
                key={style}
                type="button"
                onClick={() => updateSettings({ badgeStyle: style })}
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                  config.settings?.badgeStyle === style
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {style.replace('for-the-', '')}
              </button>
            ))}
          </div>

          <div className="h-3 w-px bg-neutral-800" />

          {/* Alignment */}
          <div className="flex items-center gap-1">
            {(['left', 'center'] as const).map(align => (
              <button
                key={align}
                type="button"
                onClick={() => updateSettings({ align })}
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono capitalize transition-colors ${
                  config.settings?.align === align
                    ? 'bg-cyan-500 text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {align}
              </button>
            ))}
          </div>
        </div>

        {/* Global Navigation Shortcuts */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/telemetry"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-neutral-800/80 hover:bg-neutral-800 text-amber-300 text-xs font-semibold transition-colors border border-neutral-700/60"
            title="Telemetry Arsenal Studio"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Telemetry</span>
          </Link>

          <Link
            href="/animator"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 text-xs transition-colors"
            title="Animated SVG & Characters Studio"
          >
            <Wand2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Animator</span>
          </Link>

          <Link
            href="/info"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 text-xs transition-colors"
            title="Documentation & Archetypes Hub"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>Guide</span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold transition-all shadow-sm active:scale-95"
            title="Switch to Visual Showcase"
          >
            <span>Home Showcase</span>
          </Link>
        </div>
      </header>

      {/* Main Split Workspace */}
      <main className="flex-1 flex min-h-0 overflow-hidden p-2 sm:p-2.5 gap-2 sm:gap-2.5 bg-neutral-950">
        {/* Left: Plugin & Template Drawer */}
        <aside
          className={`shrink-0 h-full ${
            showPluginPanel ? 'md:block md:w-72 lg:w-80' : 'md:hidden'
          } ${mobileTab === 'plugins' ? 'block w-full' : 'hidden md:block'}`}
        >
          <PluginPanel />
        </aside>

        {/* Center: Monaco JSON Editor */}
        <section
          className={`flex-1 min-w-[280px] h-full ${
            mobileTab === 'editor' ? 'block' : 'hidden md:block'
          }`}
        >
          <Editor />
        </section>

        {/* Optional Right Drawer: Cyber Monkey Co-Pilot */}
        {showCopilot && (
          <aside className="hidden lg:block w-72 shrink-0 h-full overflow-y-auto">
            <CyberMonkeyCopilot />
          </aside>
        )}

        {/* Mobile Co-Pilot Tab */}
        {mobileTab === 'copilot' && (
          <div className="block md:hidden w-full h-full overflow-y-auto">
            <CyberMonkeyCopilot />
          </div>
        )}

        {/* Right: Live Markdown Preview */}
        <section
          className={`flex-1 min-w-[280px] h-full ${
            mobileTab === 'preview' ? 'block' : 'hidden lg:block'
          }`}
        >
          <LivePreview />
        </section>
      </main>

      {/* Bottom Export Bar */}
      <footer className="shrink-0">
        <ExportBar onOpenSync={() => setIsSyncModalOpen(true)} />
      </footer>

      {/* GitHub Sync Modal */}
      <GitHubSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
      />
    </div>
  );
}

export default function LocalizedDeveloperPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen bg-neutral-950 text-neutral-400 text-sm font-mono">
          Loading Developer Mode...
        </div>
      }
    >
      <LocalizedDeveloperContent />
    </Suspense>
  );
}

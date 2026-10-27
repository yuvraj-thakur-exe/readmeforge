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
      <div className="flex items-center justify-center h-full bg-[#1e1e1e] text-neutral-500 text-xs font-mono">
        Loading Monaco Editor...
      </div>
    ),
  }
);

function LocalizedDeveloperContent() {
  const searchParams = useSearchParams();
  const setEntireConfig = useReadmeStore(state => state.setEntireConfig);
  const [showPluginPanel, setShowPluginPanel] = useState<boolean>(true);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview' | 'plugins'>('editor');

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
    <div className="flex flex-col h-screen overflow-hidden bg-neutral-950 text-neutral-100">
      {/* Top Navigation */}
      <header className="flex items-center justify-between px-3 sm:px-4 py-2 bg-neutral-900 border-b border-neutral-800 z-10 shrink-0 gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group">
            <div className="p-1 rounded-md bg-gradient-to-tr from-violet-600 to-cyan-400 group-hover:scale-105 transition-transform">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent hidden xs:inline">
              ReadmeForge
            </span>
            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-violet-950/80 border border-violet-800 text-violet-300">
              /developer
            </span>
          </Link>

          <div className="h-4 w-px bg-neutral-800 mx-1 hidden sm:block" />

          {/* Desktop Plugin Drawer Toggle */}
          <button
            type="button"
            onClick={() => setShowPluginPanel(prev => !prev)}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors ${
              showPluginPanel
                ? 'bg-neutral-800 text-violet-300 border border-violet-700/50'
                : 'bg-neutral-800/60 text-neutral-400 hover:text-neutral-200'
            }`}
            title="Toggle plugin drawer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Plugins & Presets</span>
            {showPluginPanel ? (
              <ChevronLeft className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
          </button>
        </div>

        {/* Mobile View Switcher (visible on small/medium screens) */}
        <div className="flex md:hidden items-center bg-neutral-950 border border-neutral-800 rounded-md p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setMobileTab('editor')}
            className={`px-2 py-1 rounded flex items-center gap-1 ${
              mobileTab === 'editor'
                ? 'bg-violet-600 text-white font-medium'
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
                ? 'bg-violet-600 text-white font-medium'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Preview</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('plugins')}
            className={`px-2 py-1 rounded flex items-center gap-1 ${
              mobileTab === 'plugins'
                ? 'bg-violet-600 text-white font-medium'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>Arsenal</span>
          </button>
        </div>

        {/* Global Navigation Shortcuts */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/animator"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-neutral-800/70 hover:bg-neutral-800 text-neutral-300 text-xs transition-colors"
            title="Animated SVG & Characters Studio"
          >
            <Wand2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Animator</span>
          </Link>

          <Link
            href="/info"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-neutral-800/70 hover:bg-neutral-800 text-neutral-300 text-xs transition-colors"
            title="Information, Documentation & Archetypes Hub"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>Guide</span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition-colors"
            title="Switch to Visual Wizard"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="hidden xs:inline">Visual Wizard</span>
          </Link>
        </div>
      </header>

      {/* Main Split Workspace */}
      <main className="flex-1 flex min-h-0 overflow-hidden p-2 sm:p-2.5 gap-2 sm:gap-2.5">
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

'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useReadmeStore } from '#/store/useReadmeStore';
import { LivePreview } from '#/components/developer/LivePreview';
import { PluginPanel } from '#/components/developer/PluginPanel';
import { ExportBar } from '#/components/developer/ExportBar';
import {
  Wand2,
  Code2,
  Layers,
  ChevronLeft,
  ChevronRight,
  Flame,
} from 'lucide-react';

const Editor = dynamic(
  () => import('#/components/developer/Editor').then(mod => mod.Editor),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full bg-[#1e1e1e] text-neutral-500 text-xs font-mono">
        Loading Editor...
      </div>
    ),
  }
);

function DeveloperContent() {
  const searchParams = useSearchParams();
  const setEntireConfig = useReadmeStore(state => state.setEntireConfig);
  const [showPluginPanel, setShowPluginPanel] = useState<boolean>(true);

  // Decode config from URL if provided (?config=base64)
  useEffect(() => {
    const configParam = searchParams.get('config');
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
    <div className="flex flex-col h-screen overflow-hidden bg-neutral-950">
      {/* Top Navigation */}
      <header className="flex items-center justify-between px-4 py-2.5 bg-neutral-900 border-b border-neutral-800 z-10 shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-1 rounded-md bg-gradient-to-tr from-violet-600 to-cyan-400 group-hover:scale-105 transition-transform">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
              ReadmeForge
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-violet-950/80 border border-violet-800 text-violet-300 ml-1">
              /developer
            </span>
          </Link>

          <div className="h-4 w-px bg-neutral-800 mx-1 hidden sm:block" />

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
            <span>Plugins</span>
            {showPluginPanel ? (
              <ChevronLeft className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition-colors"
          >
            <Wand2 className="w-3.5 h-3.5 text-violet-400" />
            <span>Visual Wizard</span>
          </Link>
        </div>
      </header>

      {/* Main Split Workspace */}
      <main className="flex-1 flex min-h-0 overflow-hidden p-2.5 gap-2.5">
        {/* Left: Plugin Drawer (Collapsible) */}
        {showPluginPanel && (
          <aside className="w-72 lg:w-80 shrink-0 h-full hidden md:block">
            <PluginPanel />
          </aside>
        )}

        {/* Center: Monaco JSON Editor */}
        <section className="flex-1 min-w-[320px] h-full">
          <Editor />
        </section>

        {/* Right: Live Markdown Preview */}
        <section className="flex-1 min-w-[320px] h-full hidden lg:block">
          <LivePreview />
        </section>
      </main>

      {/* Bottom Export Bar */}
      <footer className="shrink-0">
        <ExportBar />
      </footer>
    </div>
  );
}

export default function DeveloperPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen bg-neutral-950 text-neutral-400 text-sm font-mono">
          Loading Developer Mode...
        </div>
      }
    >
      <DeveloperContent />
    </Suspense>
  );
}

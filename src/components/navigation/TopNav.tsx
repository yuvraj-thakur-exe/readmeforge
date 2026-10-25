'use client';

import Link from 'next/link';
import { Terminal, Github, Sparkles, Star } from 'lucide-react';
import { ThemeToggle } from '#/components/theme/ThemeToggle';
import { CommandPalette } from './CommandPalette';

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-neutral-950/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between h-14 px-4 md:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <img
              src="/logo-icon.svg"
              alt="ReadmeForge Logo"
              className="w-8 h-8 rounded-xl shadow-md group-hover:scale-105 transition-transform duration-200"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-neutral-950 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-tight bg-gradient-to-r from-violet-400 via-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
                ReadmeForge
              </span>
              <span className="px-1.5 py-0.2 rounded text-[9px] bg-violet-500/20 text-violet-300 font-mono border border-violet-500/30 font-semibold">
                v5.8
              </span>
            </div>
            <span className="text-[10px] text-neutral-400 hidden sm:inline -mt-0.5">
              Forge a GitHub profile that gets noticed
            </span>
          </div>
        </Link>

        {/* Center / Action Navigation */}
        <div className="flex items-center gap-2.5">
          <CommandPalette />

          <Link
            href="/animator"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-cyan-500/30 bg-cyan-950/20 hover:bg-cyan-950/40 hover:border-cyan-400/60 text-cyan-200 transition-all duration-200 shadow-sm active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Animator</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] bg-cyan-400/20 text-cyan-200 font-mono font-bold">
              NEW
            </span>
          </Link>

          <Link
            href="/developer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-violet-500/30 bg-violet-950/20 hover:bg-violet-950/40 hover:border-violet-400/60 text-violet-200 transition-all duration-200 shadow-sm active:scale-95"
          >
            <Terminal className="w-3.5 h-3.5 text-violet-400" />
            <span>/developer</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] bg-violet-400/20 text-violet-200 font-mono font-bold">
              RAW
            </span>
          </Link>

          <ThemeToggle />

          <a
            href="https://github.com/yuvrajlaptop2008-byte/readmeforge"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900/90 border border-neutral-700/80 hover:border-neutral-500 hover:bg-neutral-800 text-neutral-200 transition-all duration-200 shadow-sm active:scale-95"
          >
            <Github className="w-3.5 h-3.5 text-neutral-300" />
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/40" />
            <span className="hidden sm:inline">Star</span>
          </a>
        </div>
      </div>
    </header>
  );
}

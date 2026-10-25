'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Terminal, Github } from 'lucide-react';
import { ThemeToggle } from '#/components/theme/ThemeToggle';
import { CommandPalette } from './CommandPalette';

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-palette-line bg-palette-base/80 backdrop-blur-md">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between h-14 px-4 md:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <img
            src="/logo-icon.svg"
            alt="ReadmeForge Logo"
            className="w-8 h-8 rounded-lg shadow-sm group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              ReadmeForge
            </span>
            <span className="text-[10px] text-palette-contrast/60 hidden sm:inline -mt-0.5">
              Forge a GitHub profile that gets noticed
            </span>
          </div>
        </Link>

        {/* Center / Action Navigation */}
          <CommandPalette />

          <Link
            href="/developer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-palette-line bg-palette-soft/60 hover:border-violet-500/50 text-palette-contrast transition-all shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5 text-violet-400" />
            <span>/developer</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] bg-violet-500/15 text-violet-300 font-mono">
              RAW
            </span>
          </Link>

          <ThemeToggle />

          <a
            href="https://github.com/readmeforge/readmeforge"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-palette-soft border border-palette-line hover:border-palette-contrast/40 text-palette-contrast transition-all"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Star</span>
          </a>
        </div>
      </div>
    </header>
  );
}

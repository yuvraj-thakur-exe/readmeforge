'use client';

import { Link, usePathname } from '#/i18n/navigation';
import { Github, Star, BookOpen, Sparkles, BarChart3 } from 'lucide-react';
import { ThemeToggle } from '#/components/theme/ThemeToggle';

export function TopNav() {
  const pathname = usePathname();
  const isWizard = pathname?.includes('/wizard') || pathname?.includes('/canvas');
  const isTelemetry = pathname?.includes('/telemetry');
  const isInfo = pathname?.includes('/info');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-xl shadow-sm">
      <div className="max-w-[1720px] mx-auto flex items-center justify-between h-14 px-4 md:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <img
              src="/logo-icon.svg"
              alt="ReadmeForge Logo"
              width={32}
              height={32}
              className="w-8 h-8 rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-200"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-neutral-950" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-neutral-100 group-hover:text-amber-300 transition-colors">
              ReadmeForge
            </span>
            <span className="text-[10px] text-neutral-400 hidden sm:inline -mt-0.5">
              Profile &amp; Telemetry Studio
            </span>
          </div>
        </Link>

        {/* Action Navigation */}
        <nav aria-label="Main Navigation" className="flex items-center gap-1.5 sm:gap-2">
          {/* Visual Studio / Wizard */}
          <Link
            href="/wizard"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-200 active:scale-95 ${
              isWizard
                ? 'bg-neutral-100 text-neutral-950 border-neutral-100 shadow-sm font-bold'
                : 'border-neutral-800 bg-neutral-900/80 hover:bg-neutral-800 hover:border-neutral-700 text-neutral-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
            <span className="hidden sm:inline">Studio</span>
            <span className="sm:hidden text-[11px]">Studio</span>
          </Link>

          {/* Telemetry Studio */}
          <Link
            href="/telemetry"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-200 active:scale-95 ${
              isTelemetry
                ? 'bg-amber-400 text-neutral-950 border-amber-400 shadow-sm font-bold'
                : 'border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 hover:border-amber-500/50 text-amber-300'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Telemetry</span>
            <span className="sm:hidden text-[11px]">Telemetry</span>
          </Link>

          {/* Info & Guide */}
          <Link
            href="/info"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-200 active:scale-95 ${
              isInfo
                ? 'bg-emerald-500 text-neutral-950 border-emerald-500 shadow-sm font-bold'
                : 'border-neutral-800 bg-neutral-900/80 hover:bg-neutral-800 hover:border-neutral-700 text-neutral-300'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Guide</span>
            <span className="sm:hidden text-[11px]">Guide</span>
          </Link>

          <div className="h-4 w-px bg-neutral-800 mx-1 hidden sm:block" />

          <ThemeToggle />

          <a
            href="https://github.com/yuvraj-thakur-exe/readmeforge"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 text-neutral-200 transition-all duration-200 active:scale-95"
          >
            <Github className="w-3.5 h-3.5 text-neutral-300" />
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="hidden lg:inline">Star</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

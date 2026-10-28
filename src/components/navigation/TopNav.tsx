'use client';

import { Link, usePathname } from '#/i18n/navigation';
import { Github, Star, BookOpen, Sparkles, Film } from 'lucide-react';
import { ThemeToggle } from '#/components/theme/ThemeToggle';

export function TopNav() {
  const pathname = usePathname();
  const isWizard = pathname?.includes('/wizard') || pathname?.includes('/canvas');
  const isAnimator = pathname?.includes('/animator');
  const isInfo = pathname?.includes('/info');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-neutral-950/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between h-14 px-4 md:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <img
              src="/logo-icon.svg"
              alt="ReadmeForge Logo"
              width={32}
              height={32}
              className="w-8 h-8 rounded-xl shadow-md group-hover:scale-105 transition-transform duration-200"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-neutral-950 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-tight bg-gradient-to-r from-violet-400 via-cyan-300 to-fuchsia-400 bg-clip-text text-transparent group-hover:brightness-110 transition-all">
              ReadmeForge
            </span>
            <span className="text-[10px] text-neutral-400 hidden sm:inline -mt-0.5">
              Forge a GitHub profile that gets noticed
            </span>
          </div>
        </Link>

        {/* Action Navigation */}
        <nav aria-label="Main Navigation" className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Visual Studio / Wizard */}
          <Link
            href="/wizard"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-200 shadow-sm active:scale-95 ${
              isWizard
                ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white border-violet-500 shadow-violet-900/40 shadow-md'
                : 'border-cyan-500/30 bg-cyan-950/20 hover:bg-cyan-950/40 hover:border-cyan-400/60 text-cyan-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Studio</span>
            <span className="sm:hidden text-[11px]">Studio</span>
          </Link>

          {/* Animator */}
          <Link
            href="/animator"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-200 shadow-sm active:scale-95 ${
              isAnimator
                ? 'bg-fuchsia-600 text-white border-fuchsia-500 shadow-fuchsia-900/40 shadow-md'
                : 'border-fuchsia-500/30 bg-fuchsia-950/20 hover:bg-fuchsia-950/40 hover:border-fuchsia-400/60 text-fuchsia-200'
            }`}
          >
            <Film className="w-3.5 h-3.5 text-fuchsia-400" />
            <span className="hidden sm:inline">Animator</span>
            <span className="sm:hidden text-[11px]">Anim</span>
          </Link>

          {/* Info & Guide */}
          <Link
            href="/info"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-200 shadow-sm active:scale-95 ${
              isInfo
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-900/40 shadow-md'
                : 'border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-950/40 hover:border-emerald-400/60 text-emerald-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Info &amp; Guide</span>
            <span className="sm:hidden text-[11px]">Info</span>
          </Link>

          <div className="h-4 w-px bg-white/10 mx-1 hidden sm:block" />

          <ThemeToggle />

          <a
            href="https://github.com/yuvraj-thakur-exe/readmeforge"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900/90 border border-neutral-700/80 hover:border-neutral-500 hover:bg-neutral-800 text-neutral-200 transition-all duration-200 shadow-sm active:scale-95"
          >
            <Github className="w-3.5 h-3.5 text-neutral-300" />
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/40" />
            <span className="hidden lg:inline">Star</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

'use client';

import { Link, usePathname } from '#/i18n/navigation';
import { Github, Star, BookOpen, Sparkles, BarChart3, Code2, Volume2, VolumeX } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ThemeToggle } from '#/components/theme/ThemeToggle';
import { MonoForgeMonkeyIcon } from '#/components/common/MonoForgeLogo';

export function TopNav() {
  const pathname = usePathname();
  const isWizard = pathname?.includes('/wizard') || pathname?.includes('/canvas');
  const isDeveloper = pathname?.includes('/developer');
  const isTelemetry = pathname?.includes('/telemetry');
  const isInfo = pathname?.includes('/info');

  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMuted(localStorage.getItem('monoforge-audio-mute') === 'true');
    }
  }, []);

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('monoforge-audio-mute', next ? 'true' : 'false');
      if (!next) {
        (window as unknown as { __monoforge_playClick?: (freq?: number) => void }).__monoforge_playClick?.(1200);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-neutral-900  bg-white  backdrop-blur-xl shadow-xs">
      <div className="max-w-[1720px] mx-auto flex items-center justify-between h-14 px-3 sm:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group" data-cursor-label="HOME">
          <div className="relative p-1.5 rounded-xl bg-[#ffe600] text-neutral-950 border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] group-hover:scale-105 transition-transform duration-200">
            <MonoForgeMonkeyIcon className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-950" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-neutral-950 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-sm tracking-tight text-neutral-950  uppercase">
              MONO<span className="text-[#ffe600] dark:text-[#ffe600] bg-neutral-950  px-1 rounded ml-0.5 border border-neutral-900">FORGE</span>
            </span>
            <span className="text-[9px] text-neutral-500 font-mono font-bold hidden sm:inline uppercase">
              ICONIC README STUDIO
            </span>
          </div>
        </Link>

        {/* Action Navigation */}
        <nav aria-label="Main Navigation" className="flex items-center gap-1.5 sm:gap-2">
          {/* Visual Studio */}
          <Link
            href="/wizard"
            data-cursor-label="STUDIO"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-lg border-2 transition-all btn-tactile ${
              isWizard
                ? 'bg-[#ffe600] text-neutral-950 font-black border-neutral-900 shadow-[3px_3px_0px_#18181b]'
                : 'border-neutral-900  bg-white  text-neutral-800  hover:bg-[#ffe600] hover:text-neutral-950 shadow-[2px_2px_0px_#18181b]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden md:inline">VISUAL STUDIO</span>
            <span className="md:hidden">STUDIO</span>
          </Link>

          {/* Developer Raw Mode */}
          <Link
            href="/developer"
            data-cursor-label="DEV IDE"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-lg border-2 transition-all btn-tactile ${
              isDeveloper
                ? 'bg-[#ffe600] text-neutral-950 font-black border-neutral-900 shadow-[3px_3px_0px_#18181b]'
                : 'border-neutral-900  bg-white  text-neutral-800  hover:bg-[#ffe600] hover:text-neutral-950 shadow-[2px_2px_0px_#18181b]'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">&lt;/&gt; DEVELOPER IDE</span>
            <span className="md:hidden">DEV</span>
          </Link>

          {/* Telemetry Studio */}
          <Link
            href="/telemetry"
            data-cursor-label="STATS"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-lg border-2 transition-all btn-tactile ${
              isTelemetry
                ? 'bg-[#ffe600] text-neutral-950 font-black border-neutral-900 shadow-[3px_3px_0px_#18181b]'
                : 'border-neutral-900  bg-white  text-neutral-800  hover:bg-[#ffe600] hover:text-neutral-950 shadow-[2px_2px_0px_#18181b]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">47+ TELEMETRY</span>
            <span className="md:hidden">STATS</span>
          </Link>

          {/* Info & Guide Hub */}
          <Link
            href="/info"
            data-cursor-label="GUIDE"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-lg border-2 transition-all btn-tactile ${
              isInfo
                ? 'bg-[#ffe600] text-neutral-950 font-black border-neutral-900 shadow-[3px_3px_0px_#18181b]'
                : 'border-neutral-900  bg-white  text-neutral-800  hover:bg-[#ffe600] hover:text-neutral-950 shadow-[2px_2px_0px_#18181b]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden md:inline">GUIDE HUB</span>
            <span className="md:hidden">GUIDE</span>
          </Link>

          <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-800 mx-1 hidden sm:block" />

          {/* Audio Synthesizer Toggle */}
          <button
            type="button"
            onClick={toggleMute}
            className="p-1.5 rounded-lg border-2 border-neutral-900  bg-white  text-neutral-900  hover:bg-[#ffe600] hover:text-neutral-950 transition-colors shadow-[2px_2px_0px_#18181b] btn-tactile"
            title={isMuted ? 'Unmute Audio & Tactile Sound FX' : 'Mute Audio & Tactile Sound FX'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-500" />}
          </button>

          <ThemeToggle />

          {/* GitHub Star Pill */}
          <a
            href="https://github.com/yuvraj-thakur-exe/MONOFORGE"
            target="_blank"
            rel="noreferrer"
            data-cursor-label="STAR"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-lg bg-neutral-950 text-white   border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b]  hover:bg-[#ffe600] hover:text-neutral-950 transition-all btn-tactile"
          >
            <Github className="w-3.5 h-3.5" />
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="hidden lg:inline">STAR</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default TopNav;

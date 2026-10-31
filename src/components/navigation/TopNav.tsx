'use client';

import { Link, usePathname } from '#/i18n/navigation';
import {
  Github,
  Star,
  BookOpen,
  Sparkles,
  BarChart3,
  Code2,
  Film,
  Volume2,
  VolumeX,
  Menu,
  X,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { ThemeToggle } from '#/components/theme/ThemeToggle';
import { MonoForgeMonkeyIcon } from '#/components/common/MonoForgeLogo';

export function TopNav() {
  const pathname = usePathname();
  const isWizard = pathname?.includes('/wizard') || pathname?.includes('/canvas');
  const isDeveloper = pathname?.includes('/developer');
  const isTelemetry = pathname?.includes('/telemetry');
  const isInfo = pathname?.includes('/info');
  const isAnimator = pathname?.includes('/animator');

  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMuted(localStorage.getItem('monoforge-audio-mute') === 'true');
    }
  }, []);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

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
    <header className="sticky top-0 z-50 w-full border-b-2 border-neutral-900 bg-white backdrop-blur-xl shadow-xs">
      <div className="max-w-[1720px] mx-auto flex items-center justify-between h-14 px-3 sm:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group" data-cursor-label="HOME">
          <div className="relative p-1 rounded-xl bg-white border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] group-hover:scale-105 transition-transform duration-200 overflow-hidden">
            <MonoForgeMonkeyIcon className="w-6 h-6 sm:w-7 sm:h-7" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-sm tracking-tight text-neutral-950 uppercase">
              MONO<span className="text-[#ffe600] bg-neutral-950 px-1 rounded ml-0.5 border border-neutral-900">FORGE</span>
            </span>
            <span className="text-[9px] text-neutral-500 font-mono font-bold hidden sm:inline uppercase">
              ICONIC README STUDIO
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1.5 sm:gap-2">
          {/* Visual Studio */}
          <Link
            href="/wizard"
            data-cursor-label="STUDIO"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-lg border-2 transition-all btn-tactile ${
              isWizard
                ? 'bg-[#ffe600] text-neutral-950 font-black border-neutral-900 shadow-[3px_3px_0px_#18181b]'
                : 'border-neutral-900 bg-white text-neutral-800 hover:bg-[#ffe600] hover:text-neutral-950 shadow-[2px_2px_0px_#18181b]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>VISUAL STUDIO</span>
          </Link>

          {/* Developer Raw Mode */}
          <Link
            href="/developer"
            data-cursor-label="DEV IDE"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-lg border-2 transition-all btn-tactile ${
              isDeveloper
                ? 'bg-[#ffe600] text-neutral-950 font-black border-neutral-900 shadow-[3px_3px_0px_#18181b]'
                : 'border-neutral-900 bg-white text-neutral-800 hover:bg-[#ffe600] hover:text-neutral-950 shadow-[2px_2px_0px_#18181b]'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>&lt;/&gt; DEVELOPER IDE</span>
          </Link>

          {/* Telemetry Studio */}
          <Link
            href="/telemetry"
            data-cursor-label="STATS"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-lg border-2 transition-all btn-tactile ${
              isTelemetry
                ? 'bg-[#ffe600] text-neutral-950 font-black border-neutral-900 shadow-[3px_3px_0px_#18181b]'
                : 'border-neutral-900 bg-white text-neutral-800 hover:bg-[#ffe600] hover:text-neutral-950 shadow-[2px_2px_0px_#18181b]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>47+ TELEMETRY</span>
          </Link>

          {/* SVG Animator Studio */}
          <Link
            href="/animator"
            data-cursor-label="ANIMATE"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-lg border-2 transition-all btn-tactile ${
              isAnimator
                ? 'bg-[#ffe600] text-neutral-950 font-black border-neutral-900 shadow-[3px_3px_0px_#18181b]'
                : 'border-neutral-900 bg-white text-neutral-800 hover:bg-[#ffe600] hover:text-neutral-950 shadow-[2px_2px_0px_#18181b]'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">SVG ANIMATOR</span>
            <span className="xl:hidden">ANIMATE</span>
          </Link>

          {/* Info & Guide Hub */}
          <Link
            href="/animator"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between p-3 rounded-xl border-2 font-mono text-xs font-black transition-all ${
              isAnimator
                ? 'bg-[#ffe600] text-neutral-950 border-neutral-900 shadow-[2px_2px_0px_#18181b]'
                : 'bg-white text-neutral-800 border-neutral-900 hover:bg-[#ffe600]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Film className="w-4 h-4" />
              <span>SVG ANIMATOR</span>
            </span>
            <span className="text-[10px] text-neutral-500">60FPS</span>
          </Link>

          <Link
            href="/info"
            data-cursor-label="GUIDE"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-lg border-2 transition-all btn-tactile ${
              isInfo
                ? 'bg-[#ffe600] text-neutral-950 font-black border-neutral-900 shadow-[3px_3px_0px_#18181b]'
                : 'border-neutral-900 bg-white text-neutral-800 hover:bg-[#ffe600] hover:text-neutral-950 shadow-[2px_2px_0px_#18181b]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>GUIDE HUB</span>
          </Link>

          <div className="h-4 w-px bg-neutral-300 mx-1" />

          {/* Audio Synthesizer Toggle */}
          <button
            type="button"
            onClick={toggleMute}
            className="p-1.5 rounded-lg border-2 border-neutral-900 bg-white text-neutral-900 hover:bg-[#ffe600] hover:text-neutral-950 transition-colors shadow-[2px_2px_0px_#18181b] btn-tactile cursor-pointer"
            title={isMuted ? 'Unmute Audio & Tactile Sound FX' : 'Mute Audio & Tactile Sound FX'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-500" />}
          </button>

          <ThemeToggle />

          {/* GitHub Star Pill */}
          <a
            href="https://github.com/monoforge/MONOFORGE"
            target="_blank"
            rel="noreferrer"
            data-cursor-label="STAR"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-lg bg-neutral-950 text-white border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] hover:bg-[#ffe600] hover:text-neutral-950 transition-all btn-tactile"
          >
            <Github className="w-3.5 h-3.5" />
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="hidden lg:inline">STAR</span>
          </a>
        </nav>

        {/* Mobile Right Controls: Mute + Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-1.5">
          <button
            type="button"
            onClick={toggleMute}
            className="p-1.5 rounded-lg border-2 border-neutral-900 bg-white text-neutral-900 hover:bg-[#ffe600] transition-colors shadow-2xs btn-tactile"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-500" />}
          </button>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg border-2 border-neutral-900 bg-[#ffe600] text-neutral-950 font-black shadow-[2px_2px_0px_#18181b] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Slide-down with full touch targets) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-neutral-900 bg-white p-4 space-y-2.5 animate-in slide-in-from-top-2 duration-150">
          <Link
            href="/wizard"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between p-3 rounded-xl border-2 font-mono text-xs font-black transition-all ${
              isWizard
                ? 'bg-[#ffe600] text-neutral-950 border-neutral-900 shadow-[2px_2px_0px_#18181b]'
                : 'bg-white text-neutral-800 border-neutral-900 hover:bg-[#ffe600]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>VISUAL STUDIO</span>
            </span>
            <span className="text-[10px] text-neutral-500">WIZARD</span>
          </Link>

          <Link
            href="/developer"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between p-3 rounded-xl border-2 font-mono text-xs font-black transition-all ${
              isDeveloper
                ? 'bg-[#ffe600] text-neutral-950 border-neutral-900 shadow-[2px_2px_0px_#18181b]'
                : 'bg-white text-neutral-800 border-neutral-900 hover:bg-[#ffe600]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              <span>&lt;/&gt; DEVELOPER IDE</span>
            </span>
            <span className="text-[10px] text-neutral-500">RAW MODE</span>
          </Link>

          <Link
            href="/telemetry"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between p-3 rounded-xl border-2 font-mono text-xs font-black transition-all ${
              isTelemetry
                ? 'bg-[#ffe600] text-neutral-950 border-neutral-900 shadow-[2px_2px_0px_#18181b]'
                : 'bg-white text-neutral-800 border-neutral-900 hover:bg-[#ffe600]'
            }`}
          >
            <span className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span>47+ TELEMETRY</span>
            </span>
            <span className="text-[10px] text-neutral-500">METRICS</span>
          </Link>

          <Link
            href="/animator"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between p-3 rounded-xl border-2 font-mono text-xs font-black transition-all ${
              isAnimator
                ? 'bg-[#ffe600] text-neutral-950 border-neutral-900 shadow-[2px_2px_0px_#18181b]'
                : 'bg-white text-neutral-800 border-neutral-900 hover:bg-[#ffe600]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Film className="w-4 h-4" />
              <span>SVG ANIMATOR</span>
            </span>
            <span className="text-[10px] text-neutral-500">60FPS</span>
          </Link>

          <Link
            href="/info"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between p-3 rounded-xl border-2 font-mono text-xs font-black transition-all ${
              isInfo
                ? 'bg-[#ffe600] text-neutral-950 border-neutral-900 shadow-[2px_2px_0px_#18181b]'
                : 'bg-white text-neutral-800 border-neutral-900 hover:bg-[#ffe600]'
            }`}
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>GUIDE HUB</span>
            </span>
            <span className="text-[10px] text-neutral-500">DOCS</span>
          </Link>

          <a
            href="https://github.com/monoforge/MONOFORGE"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 text-white border-2 border-neutral-900 font-mono text-xs font-bold shadow-[2px_2px_0px_#18181b]"
          >
            <span className="flex items-center gap-2">
              <Github className="w-4 h-4" />
              <span>STAR MONOFORGE ON GITHUB</span>
            </span>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </a>
        </div>
      )}
    </header>
  );
}

export default TopNav;

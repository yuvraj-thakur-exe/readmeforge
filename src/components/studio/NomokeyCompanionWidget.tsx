'use client';

import { useState, useEffect, useRef } from 'react';
import { Link } from '#/i18n/navigation';
import { Sparkles, Code2, X, ChevronUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

const MONKEY_PROVERBS = [
  'Zero monkey business. Pure Camo-safe SVG keyframes.',
  'Your GitHub profile is your 24/7 technical handshake.',
  'Monaco IDE AST schema validation: 100% green.',
  'A banana a day keeps merge conflicts away! 🍌',
  '47+ telemetry engines loaded. Ready to forge.',
  'Clean code, crisp commits, 60fps animations.',
];

export function NomokeyCompanionWidget() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [proverbIdx, setProverbIdx] = useState(0);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const [bananaCount, setBananaCount] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
        setShowScrollTop(window.scrollY > 400);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!widgetRef.current) return;
      const rect = widgetRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const angle = Math.atan2(deltaY, deltaX);
      const dist = Math.min(Math.hypot(deltaX, deltaY) / 30, 4);

      setPupilPos({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const feedBanana = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBananaCount((prev) => prev + 1);
    setProverbIdx((prev) => (prev + 1) % MONKEY_PROVERBS.length);

    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { x: 0.9, y: 0.85 },
        colors: ['#ffe600', '#f59e0b', '#10b981', '#06b6d4'],
      });
    } catch {
      // ignore
    }

    toast.success(`🍌 Fed banana #${bananaCount + 1}! Monkey energy charged!`);
    (window as unknown as { __monoforge_playClick?: (freq?: number) => void }).__monoforge_playClick?.(1300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Kinetic Top Scroll Bar with Sliding Monkey Icon */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-neutral-100 z-[9999] pointer-events-none">
        <div
          className="h-full bg-[#ffe600] transition-all duration-75 relative"
          style={{ width: `${scrollProgress}%` }}
        >
          {scrollProgress > 3 && (
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-5 h-5 rounded-full bg-white border-2 border-neutral-900 shadow-xs flex items-center justify-center p-0.5 overflow-hidden"
            >
              <img
                src="/assets/monoforge-monkey-logo.jpg"
                alt="Scroll Tracker"
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>
      </div>

      {/* 2. Floating Interactive Monkey Companion Dock (Bottom-Right) */}
      <aside aria-label="MonoForge Companion" className="fixed bottom-5 right-5 z-[80] flex flex-col items-end gap-2 pointer-events-auto">
        {/* Scroll To Top Pill */}
        {showScrollTop && (
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
            className="p-2 rounded-xl bg-white text-neutral-950 border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] hover:bg-[#ffe600] transition-all hover:-translate-y-0.5 cursor-pointer"
            title="Scroll to top"
          >
            <ChevronUp className="w-4 h-4 text-neutral-950" />
          </button>
        )}

        {/* Pop-up Interactive Speech Balloon */}
        {isOpen && (
          <div className="w-72 sm:w-80 p-4 rounded-2xl bg-white border-2 border-neutral-900 shadow-[6px_6px_0px_#18181b] text-neutral-950 space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-center justify-between pb-2 border-b-2 border-neutral-900 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-black text-neutral-950 uppercase">MONKEY COMPANION</span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md hover:bg-neutral-100 text-neutral-500 hover:text-neutral-950 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-[#fffde6] border border-neutral-900 text-xs font-mono text-neutral-900 leading-relaxed font-bold">
              &ldquo;{MONKEY_PROVERBS[proverbIdx]}&rdquo;
            </div>

            <div className="flex items-center justify-between gap-2 pt-1 text-xs font-mono font-bold">
              <button
                type="button"
                onClick={feedBanana}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#ffe600] hover:bg-[#ffdf00] text-neutral-950 border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
              >
                <span>🍌 FEED ({bananaCount})</span>
              </button>

              <div className="flex items-center gap-1.5">
                <Link
                  href="/wizard"
                  className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] flex items-center gap-1 cursor-pointer"
                  title="Open Visual Studio"
                >
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>STUDIO</span>
                </Link>
                <Link
                  href="/developer"
                  className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] flex items-center gap-1 cursor-pointer"
                  title="Open /developer IDE"
                >
                  <Code2 className="w-3 h-3" />
                  <span>IDE</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Floating Companion Avatar Button */}
        <div
          ref={widgetRef}
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative p-1 rounded-2xl bg-white text-neutral-950 border-2 border-neutral-900 shadow-[4px_4px_0px_#18181b] hover:shadow-[2px_2px_0px_#18181b] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer group select-none"
          title="Click to interact with MonoForge Monkey"
        >
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 overflow-hidden rounded-xl bg-white flex items-center justify-center">
            <img
              src="/assets/monoforge-monkey-logo.jpg"
              alt="MonoForge Official Monkey"
              style={{ transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)` }}
              className="w-full h-full object-contain pointer-events-none group-hover:scale-110 transition-transform duration-200"
            />
          </div>

          {/* Active online pulse ring */}
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-neutral-900 animate-pulse" />

          {/* Floating mini speech indicator on hover */}
          {!isOpen && (
            <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-2.5 py-1 rounded-xl bg-[#ffe600] text-neutral-950 text-[10px] font-mono font-black border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              PSST! CLICK ME 🍌
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default NomokeyCompanionWidget;


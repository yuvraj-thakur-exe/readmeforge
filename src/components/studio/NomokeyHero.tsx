'use client';

import { useState, useEffect, useRef } from 'react';
import { Link } from '#/i18n/navigation';
import {
  Sparkles,
  Code2,
  BarChart3,
  Terminal,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  Cpu,
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

const MONKEY_QUOTES = [
  'Zero monkey business. Pure precision profile engineering.',
  'Compiling 60fps Camo SVGs directly for GitHub Camo CDN.',
  'Monaco IDE split-preview ready. AST-safe schema enforced.',
  '47+ telemetry engines loaded: 3D commit spheres, habit radars, leetcode.',
  'Zero external server dependency. 100% self-hosted & open-source.',
  'Banana battery charged to 100%. Ready to deploy.',
];

type StudioMode = 'clean' | 'cyber' | 'lofi' | 'hyperspeed';

export function NomokeyHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [headTilt, setHeadTilt] = useState({ rotate: 0, translateY: 0 });
  const [activeMode, setActiveMode] = useState<StudioMode>('cyber');
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [copiedCli, setCopiedCli] = useState(false);
  const [sparkEffect, setSparkEffect] = useState(false);
  const [bananaFuel, setBananaFuel] = useState<number>(75);

  const clickBanana = () => {
    setBananaFuel((prev) => {
      const next = prev >= 100 ? 25 : prev + 25;
      if (next === 100) {
        try {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ffe600', '#f59e0b', '#06b6d4', '#10b981'],
          });
        } catch {
          // ignore
        }
        toast.success('🍌 BANANA BATTERY CHARGED TO 100%! MAXIMUM POWER!');
      } else {
        toast(`🍌 Banana Fuel: ${next}% Charged`);
      }
      return next;
    });
    setQuoteIdx((prev) => (prev + 1) % MONKEY_QUOTES.length);
    setSparkEffect(true);
    setTimeout(() => setSparkEffect(false), 500);
  };

  // Mouse coordinate tracking relative to the monkey face center
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const maxPupilDist = 8;
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(Math.hypot(deltaX, deltaY) / 25, maxPupilDist);

      setPupilOffset({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });

      setHeadTilt({
        rotate: Math.max(-6, Math.min(6, deltaX / 80)),
        translateY: Math.max(-4, Math.min(4, deltaY / 100)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const triggerQuote = () => {
    setQuoteIdx((prev) => (prev + 1) % MONKEY_QUOTES.length);
    setSparkEffect(true);
    setTimeout(() => setSparkEffect(false), 500);
  };

  const copyCliCommand = () => {
    navigator.clipboard.writeText('npx monoforge generate --username octocat');
    setCopiedCli(true);
    toast.success('CLI command copied to clipboard!');
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <section className="relative overflow-hidden bg-white bg-white text-neutral-900 text-neutral-950 pt-8 pb-16 md:pt-14 md:pb-24 px-4 sm:px-6 transition-colors duration-300">
      {/* Subtle fine technical grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(#18181b 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Warm Ambient Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#ffe600]/[0.10] dark:bg-[#ffe600]/[0.04] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Pre-header Studio Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border-2 border-neutral-900 border-neutral-900 bg-white bg-white shadow-[2px_2px_0px_#18181b]  text-xs font-mono font-bold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>EST. 2026 // MONOFORGE STUDIO</span>
            <span className="text-[#ffe600] font-black">✦</span>
            <span className="text-neutral-500 text-neutral-600 hidden sm:inline">ZERO MONKEY BUSINESS</span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 text-neutral-600">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% Camo Compliant</span>
            </span>
            <span className="text-neutral-300 dark:text-neutral-700">&bull;</span>
            <span className="inline-flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-cyan-500" />
              <span>47+ Plugins</span>
            </span>
          </div>
        </div>

        {/* Main Grid: Headline + Interactive Monkey Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Bold Typographic Statement (Nomokey + Poulo style) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 rounded-lg bg-[#ffe600] text-neutral-950 border-2 border-neutral-900 font-mono text-xs font-black tracking-widest uppercase shadow-[2px_2px_0px_#18181b]">
                ⚔️ THE NEXT-GEN GITHUB PROFILE ENGINE
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.98] uppercase font-sans text-neutral-950 text-neutral-950">
                WE DON&apos;T <br className="hidden sm:inline" />
                <span className="relative inline-block text-neutral-950 text-neutral-950 bg-[#ffe600] px-2 rounded-lg border-2 border-neutral-900 shadow-[3px_3px_0px_#18181b] rotate-[-1deg]">
                  MONKEY
                </span>{' '}
                AROUND.
                <br />
                <span className="text-neutral-900 text-neutral-950">
                  WE FORGE ICONS.
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-neutral-700 text-neutral-800 max-w-xl font-normal leading-relaxed">
              Ditch the generic bullet points. Craft high-impact GitHub profile READMEs with 60fps Camo SVGs, 47+ telemetry engines, and a split-screen Monaco IDE. Built for developers who take their craft seriously.
            </p>

            {/* Action Buttons: Tactile Neo-Brutalist Style */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              {/* Primary Studio Action */}
              <Link
                href="/wizard"
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#ffe600] hover:bg-[#ffdf00] text-neutral-950 font-black text-sm tracking-wide border-2 border-neutral-900 shadow-[4px_4px_0px_#18181b] hover:shadow-[2px_2px_0px_#18181b] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150"
              >
                <Sparkles className="w-4 h-4 text-neutral-950 group-hover:rotate-12 transition-transform" />
                <span>Launch Visual Studio</span>
                <ArrowRight className="w-4 h-4 text-neutral-950 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Raw Mode Monaco Action */}
              <Link
                href="/developer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white bg-white text-neutral-900 text-neutral-950 font-bold text-sm tracking-wide border-2 border-neutral-900 border-neutral-900 shadow-[3px_3px_0px_#18181b] dark:shadow-[3px_3px_0px_#f4f4f5] hover:shadow-[1px_1px_0px_#18181b] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-150"
              >
                <Code2 className="w-4 h-4 text-neutral-900 text-neutral-950" />
                <span>/developer Raw Mode</span>
              </Link>

              {/* Telemetry Hub */}
              <Link
                href="/telemetry"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-900 dark:text-amber-300 font-mono text-xs font-bold border border-amber-500/40 transition-colors"
              >
                <BarChart3 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>47+ Telemetry</span>
              </Link>
            </div>

            {/* Quick Terminal Copy Bar */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 p-1.5 pl-3 rounded-lg bg-neutral-100 bg-white border border-neutral-300 border-neutral-900 text-xs font-mono text-neutral-700 text-neutral-800 max-w-full overflow-hidden">
                <Terminal className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="text-neutral-400 select-none">$</span>
                <span className="truncate font-semibold">npx monoforge generate --username &lt;you&gt;</span>
                <button
                  type="button"
                  onClick={copyCliCommand}
                  aria-label="Copy CLI command"
                  className="p-1.5 ml-2 rounded bg-white dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-300 border-neutral-900 text-neutral-800 text-neutral-900 transition-colors shrink-0"
                >
                  {copiedCli ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: The Interactive Geometric Monkey Companion */}
          <div className="lg:col-span-5 relative" ref={containerRef}>
            {/* Playful Floating Tactile Stickers (Nomokey Style) */}
            <div className="absolute -top-6 -left-4 z-20 hidden sm:block rotate-[-6deg] animate-bounce-slow">
              <div className="px-3 py-1.5 rounded-lg bg-[#ffe600] text-neutral-950 border-2 border-neutral-950 font-mono text-[11px] font-black uppercase tracking-wider shadow-[3px_3px_0px_#18181b]">
                ✦ 100% ZERO JS
              </div>
            </div>

            <div className="absolute -bottom-4 -right-2 z-20 rotate-[5deg]">
              <div className="px-3 py-1.5 rounded-lg bg-[#ffe600] text-neutral-950 border-2 border-neutral-950 font-mono text-[11px] font-black uppercase tracking-wider shadow-[3px_3px_0px_#18181b]">
                ⚡ 60FPS CAMO SVG
              </div>
            </div>

            {/* Interactive Workstation Card */}
            <div className="relative rounded-2xl border-2 border-neutral-900 border-neutral-900 bg-white bg-white p-6 sm:p-7 shadow-[6px_6px_0px_#18181b]  overflow-hidden transition-all duration-200">
              {/* Studio Card Header: Mode Switcher */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-200 border-neutral-900">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 border border-neutral-900" />
                  <span className="w-3 h-3 rounded-full bg-[#ffe600] border border-neutral-900" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 border border-neutral-900" />
                  <span className="text-[11px] font-mono font-black text-neutral-900 text-neutral-950 ml-1">
                    MONKEY_CORE.v2
                  </span>
                </div>

                {/* Mode Selector Pills */}
                <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg border border-neutral-200 border-neutral-900 text-[10px] font-mono font-bold">
                  <button
                    type="button"
                    onClick={() => setActiveMode('clean')}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      activeMode === 'clean' ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900' : 'text-neutral-500'
                    }`}
                  >
                    CLEAN
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMode('cyber')}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      activeMode === 'cyber' ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900' : 'text-neutral-500'
                    }`}
                  >
                    CYBER
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMode('lofi')}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      activeMode === 'lofi' ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900' : 'text-neutral-500'
                    }`}
                  >
                    LO-FI
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMode('hyperspeed')}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      activeMode === 'hyperspeed' ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900' : 'text-neutral-500'
                    }`}
                  >
                    WARP
                  </button>
                </div>
              </div>

              {/* Interactive Banana Battery (Click to Feed & Celebrate!) */}
              <div
                onClick={clickBanana}
                className="cursor-pointer flex items-center justify-between p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border-2 border-neutral-900 border-neutral-900 text-xs font-mono font-bold hover:border-[#ffe600] transition-all mb-4 group select-none shadow-2xs"
                title="Click to feed monkey & recharge battery!"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg group-hover:scale-125 transition-transform">🍌</span>
                  <span className="text-[11px] font-black uppercase text-neutral-900 text-neutral-950">
                    BANANA BATTERY
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-20 h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden border border-neutral-400 dark:border-neutral-600">
                    <div
                      className="h-full bg-[#ffe600] transition-all duration-300"
                      style={{ width: `${bananaFuel}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-black text-amber-600 dark:text-amber-400">
                    {bananaFuel}%
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-700 text-neutral-800 group-hover:bg-[#ffe600] group-hover:text-neutral-950 transition-colors">
                    FEED ⚡
                  </span>
                </div>
              </div>

              {/* Speech Bubble: Click to cycle quotes */}
              <div
                onClick={triggerQuote}
                className="cursor-pointer mb-5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 border-neutral-900/80 text-xs font-mono text-neutral-800 text-neutral-900 relative group transition-all hover:border-amber-500"
                title="Click to hear more monkey wisdom"
              >
                <div className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold shrink-0">💬</span>
                  <p className="flex-1 italic tracking-tight select-none">
                    &ldquo;{MONKEY_QUOTES[quoteIdx]}&rdquo;
                  </p>
                  <span className="text-[10px] font-bold text-neutral-400 group-hover:text-amber-500 shrink-0">
                    CLICK ↻
                  </span>
                </div>
                {/* Speech Bubble Arrow pointing to the monkey */}
                <div className="absolute -bottom-2 left-12 w-3 h-3 bg-neutral-50 dark:bg-neutral-800 border-b border-r border-neutral-200 border-neutral-900 rotate-45" />
              </div>

              {/* The Monkey Companion Canvas */}
              <div
                className="relative mx-auto flex items-center justify-center p-6 rounded-xl bg-[#faf9f6] bg-white border-2 border-neutral-900/10 border-neutral-900 select-none overflow-hidden"
                style={{ minHeight: '280px' }}
                onClick={triggerQuote}
              >
                {/* Mode Specific Background Effects */}
                {activeMode === 'cyber' && (
                  <>
                    <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] opacity-10 pointer-events-none" style={{ backgroundSize: '16px 16px' }} />
                    <div className="absolute top-2 left-2 text-[9px] font-mono text-amber-500/80">HUD // LOCK_ON: TRUE</div>
                    <div className="absolute top-2 right-2 text-[9px] font-mono text-cyan-500/80">FPS: 60 // CAMO: PASS</div>
                    <div className="absolute bottom-2 left-2 text-[9px] font-mono text-neutral-400">POS_X: {Math.round(pupilOffset.x * 10)} / POS_Y: {Math.round(pupilOffset.y * 10)}</div>
                  </>
                )}

                {activeMode === 'hyperspeed' && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-pulse" />
                    <div className="absolute top-2/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse delay-100" />
                    <div className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse delay-200" />
                  </div>
                )}

                {/* THE GEOMETRIC MONKEY (Official Uploaded Identity) */}
                <div
                  className="relative transition-transform duration-100 ease-out will-change-transform cursor-pointer"
                  style={{
                    transform: `rotate(${headTilt.rotate}deg) translateY(${headTilt.translateY}px) scale(${sparkEffect ? 1.06 : 1})`,
                  }}
                >
                  {/* The Vector SVG with Dynamic Eye Pupils */}
                  <svg
                    width="200"
                    height="200"
                    viewBox="0 0 1024 1024"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-sm"
                  >
                    {/* Left Outer Ear */}
                    <path
                      d="M 270 370 C 130 370 130 540 270 540"
                      stroke="currentColor"
                      strokeWidth="38"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-neutral-900 text-neutral-950"
                    />

                    {/* Right Outer Ear */}
                    <path
                      d="M 754 370 C 894 370 894 540 754 540"
                      stroke="currentColor"
                      strokeWidth="38"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-neutral-900 text-neutral-950"
                    />

                    {/* Outer Hexagonal Head */}
                    <polygon
                      points="512,180 754,320 754,600 512,740 270,600 270,320"
                      stroke="currentColor"
                      strokeWidth="38"
                      strokeLinejoin="miter"
                      fill={activeMode === 'clean' ? 'transparent' : 'currentColor'}
                      className={
                        activeMode === 'clean'
                          ? 'text-neutral-900 text-neutral-950'
                          : 'text-neutral-900/5 text-neutral-950/5 stroke-neutral-900 dark:stroke-neutral-100'
                      }
                    />

                    {/* Inner Facial Mask Polygon */}
                    <polygon
                      points="512,370 635,320 710,510 635,630 512,700 389,630 314,510 389,320"
                      stroke="currentColor"
                      strokeWidth="38"
                      strokeLinejoin="miter"
                      fill="none"
                      className="text-neutral-900 text-neutral-950"
                    />

                    {/* Nose & Muzzle Geometry */}
                    <path
                      d="M 455 505 L 512 550 L 569 505"
                      stroke="currentColor"
                      strokeWidth="38"
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                      fill="none"
                      className="text-neutral-900 text-neutral-950"
                    />
                    <line
                      x1="512"
                      y1="550"
                      x2="512"
                      y2="630"
                      stroke="currentColor"
                      strokeWidth="38"
                      strokeLinecap="square"
                      className="text-neutral-900 text-neutral-950"
                    />

                    {/* Mouth Line */}
                    <line
                      x1="432"
                      y1="640"
                      x2="592"
                      y2="640"
                      stroke="currentColor"
                      strokeWidth="38"
                      strokeLinecap="square"
                      className="text-neutral-900 text-neutral-950"
                    />

                    {/* Left Eye Base & Pupil */}
                    <circle
                      cx={425 + pupilOffset.x}
                      cy={445 + pupilOffset.y}
                      r="32"
                      fill={activeMode === 'cyber' ? '#f59e0b' : activeMode === 'hyperspeed' ? '#10b981' : 'currentColor'}
                      className={
                        activeMode === 'cyber'
                          ? ''
                          : activeMode === 'hyperspeed'
                          ? ''
                          : 'text-neutral-900 text-neutral-950'
                      }
                    />

                    {/* Right Eye Base & Pupil */}
                    <circle
                      cx={599 + pupilOffset.x}
                      cy={445 + pupilOffset.y}
                      r="32"
                      fill={activeMode === 'cyber' ? '#f59e0b' : activeMode === 'hyperspeed' ? '#10b981' : 'currentColor'}
                      className={
                        activeMode === 'cyber'
                          ? ''
                          : activeMode === 'hyperspeed'
                          ? ''
                          : 'text-neutral-900 text-neutral-950'
                      }
                    />

                    {/* Mode Specific Overlays */}
                    {activeMode === 'cyber' && (
                      <>
                        {/* Cyber Visor Line */}
                        <line
                          x1="350"
                          y1="445"
                          x2="674"
                          y2="445"
                          stroke="#06b6d4"
                          strokeWidth="8"
                          strokeDasharray="16 8"
                          className="opacity-70 animate-pulse"
                        />
                        {/* Corner Target Crosshairs */}
                        <circle cx="512" cy="512" r="260" stroke="#f59e0b" strokeWidth="4" strokeDasharray="30 20" className="opacity-40" />
                      </>
                    )}

                    {activeMode === 'lofi' && (
                      <>
                        {/* Lo-Fi Headphone band over head */}
                        <path
                          d="M 250 400 C 250 120 774 120 774 400"
                          stroke="#06b6d4"
                          strokeWidth="28"
                          strokeLinecap="round"
                          fill="none"
                        />
                        <rect x="230" y="380" width="40" height="90" rx="16" fill="#06b6d4" />
                        <rect x="754" y="380" width="40" height="90" rx="16" fill="#06b6d4" />
                      </>
                    )}
                  </svg>
                </div>
              </div>

              {/* Studio Bottom Bar */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-neutral-200 border-neutral-900 text-[11px] font-mono text-neutral-500 text-neutral-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>INTERACTIVE COMPANION</span>
                </span>
                <span className="font-bold text-neutral-900 text-neutral-950">
                  {activeMode.toUpperCase()} MODE ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

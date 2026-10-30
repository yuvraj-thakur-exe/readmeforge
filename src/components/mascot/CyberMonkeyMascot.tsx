'use client';

import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import {
  Zap,
  Eye,
  Download,
  Copy,
  Check,
  Headphones,
  Flame,
} from 'lucide-react';

const MONKEY_QUOTES = [
  'Zero monkey business. 100% precision profile engineering.',
  'Compiling Camo-safe SVG keyframes at 60fps.',
  'Commit streaks looking sharp today!',
  'No spaghetti code allowed in this repository.',
  'Banana battery charged to 100%. Ready to deploy.',
  'Your GitHub profile is about to get star-bombed.',
];

export function CyberMonkeyMascot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [headTilt, setHeadTilt] = useState({ rotate: 0, translateY: 0 });
  const [showVisor, setShowVisor] = useState(true);
  const [showHeadphones, setShowHeadphones] = useState(true);
  const [fuelLevel, setFuelLevel] = useState(4); // 1-4 bars
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [reactionSpark, setReactionSpark] = useState(false);

  // Mouse coordinate tracking relative to the mascot center
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Normalize within bounds
      const maxPupilDist = 10;
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(Math.hypot(deltaX, deltaY) / 20, maxPupilDist);

      const px = Math.cos(angle) * distance;
      const py = Math.sin(angle) * distance;

      setPupilOffset({ x: px, y: py });
      setHeadTilt({
        rotate: Math.max(-8, Math.min(8, deltaX / 60)),
        translateY: Math.max(-6, Math.min(6, deltaY / 80)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const triggerQuote = () => {
    setCurrentQuoteIndex(prev => (prev + 1) % MONKEY_QUOTES.length);
    setReactionSpark(true);
    setTimeout(() => setReactionSpark(false), 800);
  };

  const handleCopyMarkdown = () => {
    const markdown = `<!-- MonoForge Cyber Monkey Mascot (100% Camo Safe) -->
<p align="center">
  <img src="https://raw.githubusercontent.com/yuvraj-thakur-exe/MONOFORGE/main/public/assets/cyber-monkey-mascot.svg" alt="MonoForge Cyber Monkey Mascot" width="460" />
</p>`;
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    toast.success('Copied Cyber Monkey SVG snippet to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSvg = () => {
    const a = document.createElement('a');
    a.href = '/assets/cyber-monkey-mascot.svg';
    a.download = 'cyber-monkey-mascot.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success('Downloaded cyber-monkey-mascot.svg!');
  };

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-4 sm:p-6 shadow-xl dark:shadow-2xl backdrop-blur-md overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-400/[0.06] dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-cyan-400/[0.06] dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-neutral-200 dark:border-neutral-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-amber-500 dark:text-amber-400 shadow-sm">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 font-mono tracking-wide">
                CYBER MONKEY MASCOT
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                Awwwards Nominee Vibe
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
              Interactive cursor-following chimp inspired by NoMonkey.work &bull; 60fps GPU Vector
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadSvg}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-950 text-xs font-semibold text-neutral-800 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-neutral-100 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
            <span>SVG Asset</span>
          </button>
          <button
            type="button"
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-400/60 bg-amber-50 dark:bg-amber-500/10 text-xs font-semibold text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-colors shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy to README'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Stage & Customization Drawer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* LEFT / CENTER: Interactive Vector Mascot (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 rounded-xl border border-neutral-200 dark:border-neutral-800/80 bg-neutral-50/70 dark:bg-neutral-950/80 relative min-h-[380px]">
          {/* Reaction Speech Bubble */}
          <div
            onClick={triggerQuote}
            className={`cursor-pointer transition-all duration-300 transform mb-2 px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 text-xs font-mono text-neutral-800 dark:text-neutral-200 shadow-sm flex items-center gap-2 max-w-sm text-center ${
              reactionSpark ? 'scale-105 border-amber-500 ring-2 ring-amber-500/30' : 'hover:border-neutral-400 dark:hover:border-neutral-700'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span>&ldquo;{MONKEY_QUOTES[currentQuoteIndex]}&rdquo;</span>
          </div>

          {/* Interactive SVG Render Canvas */}
          <div className="relative w-full max-w-[360px] aspect-square flex items-center justify-center">
            <svg
              viewBox="0 0 500 500"
              className="w-full h-full select-none"
              style={{
                transform: `rotate(${headTilt.rotate}deg) translateY(${headTilt.translateY}px)`,
                transition: 'transform 0.08s ease-out',
              }}
            >
              <defs>
                <linearGradient id="fur-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#382e26" />
                  <stop offset="50%" stopColor="#261e18" />
                  <stop offset="100%" stopColor="#18130f" />
                </linearGradient>

                <linearGradient id="skin-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#e2ba99" />
                  <stop offset="100%" stopColor="#ba825a" />
                </linearGradient>

                <radialGradient id="iris-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="80%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#022c22" />
                </radialGradient>
              </defs>

              {/* Ears */}
              <ellipse cx="140" cy="240" rx="42" ry="48" fill="url(#fur-grad)" />
              <ellipse cx="145" cy="240" rx="28" ry="32" fill="url(#skin-grad)" />
              <circle cx="115" cy="230" r="4" fill="#38bdf8" />
              <circle cx="112" cy="250" r="4" fill="#f59e0b" />

              <ellipse cx="360" cy="240" rx="42" ry="48" fill="url(#fur-grad)" />
              <ellipse cx="355" cy="240" rx="28" ry="32" fill="url(#skin-grad)" />
              <circle cx="385" cy="230" r="4" fill="#38bdf8" />
              <circle cx="388" cy="250" r="4" fill="#f59e0b" />

              {/* Head Silhouette */}
              <ellipse cx="250" cy="230" rx="115" ry="110" fill="url(#fur-grad)" stroke="#111827" strokeWidth="2" />

              {/* Hair Tufts */}
              <path d="M 235 125 C 245 95, 260 95, 270 125 Z" fill="#382e26" />
              <path d="M 220 130 C 230 105, 245 105, 255 130 Z" fill="#261e18" />

              {/* Face Plate */}
              <path
                d="M 250 185 C 210 150, 160 180, 175 240 C 185 280, 215 295, 250 295 C 285 295, 315 280, 325 240 C 340 180, 290 150, 250 185 Z"
                fill="url(#skin-grad)"
              />

              {/* Muzzle & Snout */}
              <ellipse cx="250" cy="295" rx="72" ry="48" fill="url(#skin-grad)" />
              <ellipse cx="250" cy="305" rx="58" ry="32" fill="#ba825a" opacity="0.3" />

              {/* Nostrils */}
              <ellipse cx="240" cy="280" rx="5" ry="7" fill="#451a03" transform="rotate(-12 240 280)" />
              <ellipse cx="260" cy="280" rx="5" ry="7" fill="#451a03" transform="rotate(12 260 280)" />

              {/* Smirk */}
              <path d="M 220 310 Q 250 330 280 310" fill="none" stroke="#451a03" strokeWidth="4" strokeLinecap="round" />

              {/* EYES WITH REAL CURSOR TRACKING */}
              {/* Left Eye */}
              <g transform="translate(205, 210)">
                <ellipse cx="0" cy="0" rx="24" ry="28" fill="#ffffff" stroke="#1f2937" strokeWidth="2" />
                <ellipse cx={pupilOffset.x} cy={pupilOffset.y} rx="14" ry="16" fill="url(#iris-grad)" />
                <circle cx={pupilOffset.x + 1} cy={pupilOffset.y} r="8" fill="#04070d" />
                <circle cx={pupilOffset.x - 4} cy={pupilOffset.y - 5} r="4" fill="#ffffff" />
                <circle cx={pupilOffset.x + 5} cy={pupilOffset.y + 4} r="2" fill="#ffffff" />
                <path d="M -22 -10 Q 0 -22 22 -10" fill="none" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
              </g>

              {/* Right Eye */}
              <g transform="translate(295, 210)">
                <ellipse cx="0" cy="0" rx="24" ry="28" fill="#ffffff" stroke="#1f2937" strokeWidth="2" />
                <ellipse cx={pupilOffset.x} cy={pupilOffset.y} rx="14" ry="16" fill="url(#iris-grad)" />
                <circle cx={pupilOffset.x + 1} cy={pupilOffset.y} r="8" fill="#04070d" />
                <circle cx={pupilOffset.x - 4} cy={pupilOffset.y - 5} r="4" fill="#ffffff" />
                <circle cx={pupilOffset.x + 5} cy={pupilOffset.y + 4} r="2" fill="#ffffff" />
                <path d="M -22 -10 Q 0 -22 22 -10" fill="none" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
              </g>

              {/* Cyber Visor Monocle (Toggleable) */}
              {showVisor && (
                <g transform="translate(295, 210)">
                  <polygon points="-32,-26 36,-22 32,30 -28,32" fill="#06b6d4" opacity="0.35" />
                  <polygon points="-32,-26 36,-22 32,30 -28,32" fill="none" stroke="#38bdf8" strokeWidth="2" />
                  <line x1="-28" y1="2" x2="-18" y2="2" stroke="#38bdf8" strokeWidth="1.5" />
                  <line x1="22" y1="2" x2="32" y2="2" stroke="#38bdf8" strokeWidth="1.5" />
                  <line x1="2" y1="-22" x2="2" y2="-12" stroke="#38bdf8" strokeWidth="1.5" />
                  <line x1="2" y1="18" x2="2" y2="28" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="-20" y="-10" fill="#38bdf8" fontFamily="monospace" fontSize="6" fontWeight="bold">LOCK: 100%</text>
                  <path d="M 36 -10 L 80 -2" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
                </g>
              )}

              {/* Studio DJ Headphones (Toggleable) */}
              {showHeadphones && (
                <g>
                  <path d="M 115 195 C 115 80, 385 80, 385 195" fill="none" stroke="#111827" strokeWidth="18" strokeLinecap="round" />
                  <path d="M 125 180 C 135 95, 365 95, 375 180" fill="none" stroke="#374151" strokeWidth="5" strokeLinecap="round" />
                  <path d="M 140 160 C 155 110, 345 110, 360 160" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 4" />

                  {/* Left Ear Cushion */}
                  <rect x="96" y="185" width="38" height="90" rx="16" fill="#1f2937" stroke="#374151" strokeWidth="2" />
                  <rect x="102" y="195" width="26" height="70" rx="10" fill="#0d1117" />
                  <rect x="110" y="215" width="4" height="24" rx="2" fill="#06b6d4" />
                  <rect x="118" y="222" width="4" height="18" rx="2" fill="#f59e0b" />

                  {/* Right Ear Cushion */}
                  <rect x="366" y="185" width="38" height="90" rx="16" fill="#1f2937" stroke="#374151" strokeWidth="2" />
                  <rect x="372" y="195" width="26" height="70" rx="10" fill="#0d1117" />
                  <rect x="378" y="220" width="4" height="20" rx="2" fill="#f59e0b" />
                  <rect x="386" y="212" width="4" height="28" rx="2" fill="#10b981" />
                </g>
              )}

              {/* Torso & Collar */}
              <path d="M 160 360 C 145 390, 130 435, 120 450 L 380 450 C 370 435, 355 390, 340 360 Z" fill="#111827" stroke="#1f2937" strokeWidth="2" />
              <line x1="250" y1="360" x2="250" y2="450" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
            </svg>
          </div>

          <span className="text-[10px] text-neutral-500 font-mono mt-2">
            Move mouse anywhere to guide the chimp&apos;s gaze &bull; Click quote bubble to cycle witty thoughts
          </span>
        </div>

        {/* RIGHT: Mascot Controls & Specs (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Banana Battery Power Widget */}
          <div className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/60 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-200 flex items-center gap-1.5 font-mono">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                BANANA POWER METER
              </span>
              <span className="text-amber-400 font-mono font-bold">{fuelLevel * 25}%</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[1, 2, 3, 4].map(idx => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFuelLevel(idx)}
                  className={`h-6 rounded-md transition-all border ${
                    fuelLevel >= idx
                      ? 'bg-amber-400 border-amber-300 shadow-sm shadow-amber-400/20'
                      : 'bg-neutral-900 border-neutral-800'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Gear Toggles */}
          <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60 space-y-2.5">
            <span className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 font-mono">
              GEAR &amp; WEARABLES
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setShowVisor(v => !v)}
                className={`p-2.5 rounded-lg border text-left transition-colors flex items-center justify-between ${
                  showVisor
                    ? 'border-cyan-500/60 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-800 dark:text-cyan-200 shadow-sm'
                    : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 text-neutral-500'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                  <span className="font-mono text-xs">Cyber Visor</span>
                </div>
                <span>{showVisor ? 'ON' : 'OFF'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowHeadphones(h => !h)}
                className={`p-2.5 rounded-lg border text-left transition-colors flex items-center justify-between ${
                  showHeadphones
                    ? 'border-amber-500/60 bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-200 shadow-sm'
                    : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 text-neutral-500'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Headphones className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                  <span className="font-mono text-xs">Studio Beats</span>
                </div>
                <span>{showHeadphones ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>

          {/* Technical Specs List (Poulo / NoMonkey style) */}
          <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60 space-y-2 font-mono text-[11px]">
            <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800/80 pb-1.5">
              <span>ENGINE:</span>
              <span className="text-neutral-800 dark:text-neutral-200 font-bold">Pure Camo Vector</span>
            </div>
            <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800/80 pb-1.5">
              <span>JAVASCRIPT IN SVG:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">0.00% (Pure CSS Keyframes)</span>
            </div>
            <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800/80 pb-1.5">
              <span>FOREIGN OBJECTS:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">0 (Zero Sanitize Stripping)</span>
            </div>
            <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400">
              <span>FRAME RATE:</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">60 FPS Hardware Composited</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { Sparkles, Terminal, Flame, Zap, Cpu, Code2 } from 'lucide-react';

interface MarqueeItem {
  icon: React.ReactNode;
  label: string;
  tag: string;
  accent: string;
}

const MARQUEE_ITEMS: MarqueeItem[] = [
  {
    icon: <Zap className="w-3.5 h-3.5" />,
    label: 'ZERO RUNTIME JAVASCRIPT',
    tag: '100% GITHUB CAMO SAFE',
    accent: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  },
  {
    icon: <Terminal className="w-3.5 h-3.5" />,
    label: '47+ TELEMETRY ENGINES',
    tag: 'SCRAPED ARSENAL LOADED',
    accent: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
  },
  {
    icon: <Cpu className="w-3.5 h-3.5" />,
    label: '60FPS GPU KEYFRAME SVGS',
    tag: 'ZERO FOREIGN OBJECT',
    accent: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  },
  {
    icon: <Flame className="w-3.5 h-3.5" />,
    label: 'NO MONKEY BUSINESS',
    tag: 'PURE PRECISION CRAFT',
    accent: 'text-amber-300 border-amber-400/30 bg-amber-400/10',
  },
  {
    icon: <Code2 className="w-3.5 h-3.5" />,
    label: 'NEXT.js 16 + TURBOPACK',
    tag: 'SSR & APP ROUTER READY',
    accent: 'text-cyan-300 border-cyan-400/30 bg-cyan-400/10',
  },
  {
    icon: <Sparkles className="w-3.5 h-3.5" />,
    label: 'CONFIRMATION-GATED GITHUB PUSH',
    tag: 'ZERO SILENT COMMITS',
    accent: 'text-emerald-300 border-emerald-400/30 bg-emerald-400/10',
  },
];

interface KineticMarqueeProps {
  speed?: 'normal' | 'fast' | 'slow';
  reverse?: boolean;
  className?: string;
}

export const KineticMarquee: React.FC<KineticMarqueeProps> = ({
  speed = 'normal',
  reverse = false,
  className = '',
}) => {
  const animClass = reverse ? 'animate-marquee-reverse' : 'animate-marquee';
  const durationStyle =
    speed === 'fast' ? { animationDuration: '22s' } :
    speed === 'slow' ? { animationDuration: '45s' } :
    { animationDuration: '32s' };

  return (
    <div
      className={`relative w-full overflow-hidden py-3 bg-neutral-950 border-y border-neutral-800/80 select-none ${className}`}
      aria-label="Product Highlights Marquee"
    >
      {/* Edge gradient masks for smooth fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />

      <div
        className={`flex w-max items-center gap-6 ${animClass} hover:[animation-play-state:paused]`}
        style={durationStyle}
      >
        {/* Double array for infinite seamless looping */}
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
          <div
            key={`${item.label}-${idx}`}
            className="flex items-center gap-3 shrink-0 px-4 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 backdrop-blur-sm transition-transform hover:scale-105 cursor-default"
          >
            <div className={`p-1 rounded-full ${item.accent}`}>
              {item.icon}
            </div>
            <span className="text-xs font-mono font-bold tracking-wider text-neutral-200">
              {item.label}
            </span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${item.accent}`}>
              {item.tag}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-700 mx-1" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KineticMarquee;

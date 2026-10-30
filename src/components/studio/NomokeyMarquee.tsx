'use client';

import { MonoForgeMonkeyIcon } from '#/components/common/MonoForgeLogo';

interface NomokeyMarqueeProps {
  reverse?: boolean;
  speed?: 'slow' | 'normal' | 'fast';
  theme?: 'light' | 'dark' | 'amber';
}

const ITEMS = [
  { text: 'ZERO MONKEY BUSINESS', badge: '100% CRAFT' },
  { text: '47+ TELEMETRY ENGINES', badge: 'NATIVE' },
  { text: '60FPS CAMO KEYFRAMES', badge: 'GPU SAFE' },
  { text: 'AST-SAFE MONACO IDE', badge: '/DEVELOPER' },
  { text: '3D ISOMETRIC CALENDARS', badge: 'SVG' },
  { text: 'ZERO RUNTIME JAVASCRIPT', badge: 'PURE CSS' },
  { text: '1-CLICK GITHUB SYNC', badge: 'AUTOMATED' },
  { text: 'LEETCODE & HABIT RADARS', badge: 'LIVE STATS' },
];

export function NomokeyMarquee({ reverse = false, speed = 'normal', theme = 'light' }: NomokeyMarqueeProps) {
  const themeClasses =
    theme === 'amber'
      ? 'bg-[#ffe600] text-neutral-950 border-y-2 border-neutral-900 font-black'
      : theme === 'dark'
      ? 'bg-neutral-900 text-neutral-100 border-y-2 border-neutral-800'
      : 'bg-white dark:bg-neutral-900 text-neutral-950 dark:text-neutral-100 border-y-2 border-neutral-900 dark:border-neutral-800';

  return (
    <div className={`relative w-full overflow-hidden border-y py-3 select-none ${themeClasses}`}>
      <div className="flex w-max will-change-transform">
        <div
          className={`flex shrink-0 items-center gap-8 ${
            reverse ? 'animate-marquee-reverse' : 'animate-marquee'
          }`}
          style={{ animationDuration: speed === 'fast' ? '18s' : '28s' }}
        >
          {ITEMS.map((item, idx) => (
            <div key={`track1-${idx}`} className="flex items-center gap-4 text-xs sm:text-sm font-black tracking-wider uppercase font-mono">
              <span className="text-amber-500 font-bold">✦</span>
              <div className="p-1 rounded bg-neutral-900/5 dark:bg-white/10 border border-neutral-900/10 dark:border-white/10">
                <MonoForgeMonkeyIcon className="w-4 h-4 text-neutral-900 dark:text-neutral-100" />
              </div>
              <span className="tracking-widest">{item.text}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950">
                {item.badge}
              </span>
            </div>
          ))}
        </div>

        <div
          className={`flex shrink-0 items-center gap-8 ${
            reverse ? 'animate-marquee-reverse' : 'animate-marquee'
          }`}
          style={{ animationDuration: speed === 'fast' ? '18s' : '28s' }}
          aria-hidden="true"
        >
          {ITEMS.map((item, idx) => (
            <div key={`track2-${idx}`} className="flex items-center gap-4 text-xs sm:text-sm font-black tracking-wider uppercase font-mono">
              <span className="text-amber-500 font-bold">✦</span>
              <div className="p-1 rounded bg-neutral-900/5 dark:bg-white/10 border border-neutral-900/10 dark:border-white/10">
                <MonoForgeMonkeyIcon className="w-4 h-4 text-neutral-900 dark:text-neutral-100" />
              </div>
              <span className="tracking-widest">{item.text}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950">
                {item.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

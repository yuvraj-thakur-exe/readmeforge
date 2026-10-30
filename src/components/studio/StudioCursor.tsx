'use client';

import { useEffect, useState } from 'react';

export function StudioCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop devices with fine pointer
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, select, [role="button"], .interactive-cursor');
        setIsHovered(Boolean(interactive));
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out will-change-transform hidden md:block"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 flex items-center justify-center ${
          isHovered
            ? 'w-10 h-10 bg-amber-500/15 border-amber-500 scale-110 shadow-[0_0_20px_rgba(245,158,11,0.25)] backdrop-blur-[1px]'
            : 'w-4 h-4 bg-neutral-900/10 dark:bg-white/10 border-neutral-900/30 dark:border-white/30'
        }`}
      >
        {isHovered && (
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
        )}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';

export function StudioCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isClicking, setIsClicking] = useState(false);

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on desktop devices with fine pointer
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Instantly position the center sharp dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check hovered element for context-aware cursor labels
      const target = e.target as HTMLElement | null;
      if (target) {
        if (target.closest('[data-cursor-label]')) {
          const el = target.closest('[data-cursor-label]') as HTMLElement;
          setHoverLabel(el.getAttribute('data-cursor-label') || 'VIEW');
        } else if (target.closest('button[title*="feed"], [data-banana]')) {
          setHoverLabel('FEED 🍌');
        } else if (target.closest('button[title*="Copy"], [data-copy]')) {
          setHoverLabel('COPY');
        } else if (target.closest('a[href*="developer"], button[title*="Monaco"]')) {
          setHoverLabel('CODE ⚡');
        } else if (target.closest('a[href*="wizard"], button[title*="Visual"]')) {
          setHoverLabel('FORGE');
        } else if (target.closest('.interactive-sticker, [data-draggable]')) {
          setHoverLabel('GRAB');
        } else if (target.closest('button, a, [role="button"], input, select, textarea, .tab-pill, .btn-tactile')) {
          setHoverLabel('CLICK');
        } else {
          setHoverLabel(null);
        }
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth Lerp loop for the trailing magnetic ring (NoMonkey / Poulo physics)
    let lastTime = performance.now();
    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 16.67, 2.0);
      lastTime = time;

      // Lerp factor: 0.16 for responsive spring trailing
      const lerpFactor = 0.16 * dt;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Instant Center Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[10000] will-change-transform hidden md:block"
        style={{ transform: `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)` }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-transform duration-100 ${
            hoverLabel ? 'scale-0' : 'scale-100 bg-neutral-950'
          }`}
        />
      </div>

      {/* 2. Magnetic Spring Ring with Dynamic Hover Label */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform hidden md:block"
        style={{ transform: `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)` }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-200 ease-out flex items-center justify-center font-mono font-black select-none ${
            hoverLabel
              ? 'w-14 h-14 bg-[#ffe600] border-neutral-950 text-neutral-950 shadow-[3px_3px_0px_#18181b] scale-110'
              : isClicking
              ? 'w-7 h-7 bg-[#ffe600] border-neutral-950 scale-90'
              : 'w-8 h-8 bg-transparent border-neutral-900 scale-100 shadow-2xs'
          }`}
        >
          {hoverLabel && (
            <span className="text-[9px] tracking-tighter uppercase text-center animate-in zoom-in-50 duration-150 leading-none px-1">
              {hoverLabel}
            </span>
          )}
        </div>
      </div>
    </>
  );
}

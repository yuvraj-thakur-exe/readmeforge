'use client';

import { useCallback, useState, useEffect } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

export const ParticleBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const win = window as any;
    const schedule = win.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 1200));
    const handle = schedule(() => {
      setMounted(true);
    });

    return () => {
      if (win.cancelIdleCallback) {
        win.cancelIdleCallback(handle);
      } else {
        clearTimeout(handle);
      }
    };
  }, []);

  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: { value: 'transparent' } },
          fpsLimit: 60,
          particles: {
            color: { value: ['#8b5cf6', '#06b6d4', '#ec4899'] },
            links: {
              color: '#8b5cf6',
              distance: 120,
              enable: true,
              opacity: 0.15,
              width: 1,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: { default: 'bounce' },
              random: true,
              speed: 0.8,
              straight: false,
            },
            number: {
              density: { enable: true, area: 900 },
              value: 35,
            },
            opacity: { value: 0.3 },
            shape: { type: 'circle' },
            size: { value: { min: 1, max: 2.5 } },
          },
          detectRetina: true,
        }}
        className="w-full h-full"
      />
    </div>
  );
};

export default ParticleBackground;

'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vRot: number;
  alpha: number;
  life: number;
  maxLife: number;
  shape: 'circle' | 'rect' | 'star';
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export function ClickEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Play gentle mechanical click tone via Web Audio API
  const playTactileClick = (freq = 950, type: OscillatorType = 'triangle') => {
    try {
      if (typeof window === 'undefined') return;
      // Respect sound toggle if stored as false
      const soundEnabled = localStorage.getItem('monoforge-audio-mute') !== 'true';
      if (!soundEnabled) return;

      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Pitch sweep down for tactile mechanical "thock"
      const now = ctx.currentTime;
      const jitter = (Math.random() - 0.5) * 80;
      osc.type = type;
      osc.frequency.setValueAtTime(freq + jitter, now);
      osc.frequency.exponentialRampToValueAtTime(Math.max(120, (freq + jitter) * 0.4), now + 0.035);

      // Volume envelope: instant attack, fast exponential decay
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // AudioContext unavailable or blocked by autoplay policy
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Resize canvas to full window
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Global tactile trigger helper on window
    (window as unknown as { __monoforge_playClick?: (freq?: number) => void }).__monoforge_playClick = playTactileClick;

    // Handle Pointer Down (Mouse & Touch Clicks)
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else if (e.touches && e.touches[0]) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        return;
      }

      // Check if clicked element or its parent is interactive
      const target = e.target as HTMLElement | null;
      const isInteractive = target?.closest(
        'button, a, input, select, textarea, [role="button"], .clickable, .tab-pill, .rubber-hover, .btn-tactile'
      );

      // Audio feedback
      if (isInteractive) {
        playTactileClick(1100, 'triangle');
      } else {
        playTactileClick(850, 'sine');
      }

      // Spawn expanding ripple ring
      ripplesRef.current.push({
        x: clientX,
        y: clientY,
        radius: 6,
        maxRadius: isInteractive ? 42 : 28,
        alpha: 0.8,
      });

      // Spawn tactile spark particles
      const count = isInteractive ? 10 : 6;
      const colors = ['#FFE600', '#18181B', '#FFD000', '#FFFFFF'];
      const shapes: Array<'circle' | 'rect' | 'star'> = ['circle', 'rect', 'star'];

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const speed = 2.5 + Math.random() * 4.5;
        const maxLife = 24 + Math.floor(Math.random() * 14);

        particlesRef.current.push({
          x: clientX,
          y: clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 3 + Math.random() * 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.25,
          alpha: 1,
          life: 0,
          maxLife,
          shape: shapes[Math.floor(Math.random() * shapes.length)],
        });
      }
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    // Animation render loop
    let lastTime = performance.now();
    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 16.67, 2.0);
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw and update ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const rip = ripplesRef.current[i];
        rip.radius += (rip.maxRadius - rip.radius) * 0.18 * dt;
        rip.alpha *= Math.pow(0.88, dt);

        if (rip.alpha < 0.02 || rip.radius >= rip.maxRadius - 1) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 230, 0, ${rip.alpha})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Delicate inner contour
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius * 0.65, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(24, 24, 27, ${rip.alpha * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // 2. Draw and update particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.life += dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 0.15 * dt; // gravity
        p.vx *= Math.pow(0.94, dt); // air resistance
        p.rotation += p.vRot * dt;
        p.alpha = Math.max(0, 1 - p.life / p.maxLife);

        if (p.life >= p.maxLife || p.alpha <= 0.01) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size * 1.5, p.size);
        } else if (p.shape === 'star') {
          // 4-point spark
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size * 0.3, -p.size * 0.3);
          ctx.lineTo(p.size, 0);
          ctx.lineTo(p.size * 0.3, p.size * 0.3);
          ctx.lineTo(0, p.size);
          ctx.lineTo(-p.size * 0.3, p.size * 0.3);
          ctx.lineTo(-p.size, 0);
          ctx.lineTo(-p.size * 0.3, -p.size * 0.3);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handlePointerDown);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      aria-hidden="true"
    />
  );
}

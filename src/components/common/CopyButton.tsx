'use client';

import React, { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Copy, Check, Sparkles } from 'lucide-react';

export interface CopyButtonProps {
  textToCopy: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'pill' | 'badge';
  size?: 'xs' | 'sm' | 'md';
  onCopied?: () => void;
  showConfetti?: boolean;
  iconOnly?: boolean;
  title?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  textToCopy,
  label = 'Copy',
  copiedLabel = 'Copied!',
  className = '',
  variant = 'secondary',
  size = 'sm',
  onCopied,
  showConfetti = true,
  iconOnly = false,
  title,
}) => {
  const [copied, setCopied] = useState(false);
  const [isPressing, setIsPressing] = useState(false);

  const triggerLogicalConfetti = useCallback(
    (target: HTMLElement | null) => {
      if (!showConfetti || !target || typeof window === 'undefined') return;
      try {
        const rect = target.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        confetti({
          particleCount: 22,
          spread: 55,
          origin: { x, y },
          colors: ['#34d399', '#38bdf8', '#818cf8', '#f43f5e', '#fbbf24'],
          disableForReducedMotion: true,
          zIndex: 99999,
        });
      } catch {
        // Fallback for non-browser or test runner
      }
    },
    [showConfetti]
  );

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const target = e.currentTarget;
    triggerLogicalConfetti(target);
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch {
        // Fallback for non-browser or test runner
      }
    }
    setCopied(true);
    onCopied?.();
    setTimeout(() => setCopied(false), 2200);
  };

  // Base style variants
  const variantStyles = {
    primary: copied
      ? 'bg-gradient-to-r from-emerald-600 to-teal-500 border-emerald-400 text-white shadow-[0_0_25px_rgba(52,211,153,0.55)]'
      : 'bg-amber-500 hover:bg-amber-400 border-amber-500/60 text-neutral-950 font-bold shadow-md shadow-amber-950/20 hover:shadow-amber-500/30',
    secondary: copied
      ? 'bg-emerald-950/90 border-emerald-400/80 text-emerald-200 shadow-[0_0_20px_rgba(52,211,153,0.4)]'
      : 'bg-neutral-900/90 hover:bg-neutral-800 border-neutral-700/70 hover:border-neutral-600 text-neutral-200 hover:text-white shadow-sm',
    ghost: copied
      ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
      : 'bg-transparent hover:bg-neutral-800/60 border-transparent text-neutral-400 hover:text-neutral-200',
    pill: copied
      ? 'bg-emerald-950/80 border-emerald-400/80 text-emerald-200 shadow-[0_0_15px_rgba(52,211,153,0.35)]'
      : 'bg-neutral-900/80 hover:bg-neutral-800/90 border-neutral-800 hover:border-amber-500/50 text-neutral-300 hover:text-white',
    badge: copied
      ? 'bg-emerald-950/95 border-emerald-400 text-emerald-200 shadow-[0_0_18px_rgba(52,211,153,0.4)]'
      : 'bg-neutral-950/80 hover:bg-neutral-900 border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white',
  };

  const sizeStyles = {
    xs: iconOnly ? 'p-1.5 rounded-lg' : 'px-2 py-1 text-[10px] rounded-lg gap-1',
    sm: iconOnly ? 'p-2 rounded-xl' : 'px-3 py-1.5 text-xs rounded-xl gap-1.5',
    md: iconOnly ? 'p-2.5 rounded-xl' : 'px-4 py-2 text-sm rounded-xl gap-2',
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      onMouseDown={() => setIsPressing(true)}
      onMouseUp={() => setIsPressing(false)}
      onMouseLeave={() => setIsPressing(false)}
      title={title || (copied ? copiedLabel : `${label} (${textToCopy.slice(0, 40)}...)`)}
      className={`group relative inline-flex items-center justify-center font-medium select-none border transition-all duration-300 ease-out active:scale-95 overflow-hidden ${
        isPressing ? 'scale-95' : 'scale-100'
      } ${copied ? 'animate-copy-pop border-emerald-400/90' : 'hover:-translate-y-0.5'} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {/* Specular Gleam Sweep Wave on Copied */}
      {copied && (
        <span className="absolute inset-0 overflow-hidden pointer-events-none">
          <span className="absolute inset-0 -translate-x-full animate-copy-gleam bg-gradient-to-r from-transparent via-white/35 to-transparent" />
        </span>
      )}

      {/* Radiant Expanding Glow Ripple on Copied */}
      {copied && (
        <span className="absolute -inset-1 rounded-xl bg-gradient-to-r from-emerald-500/40 via-cyan-400/40 to-emerald-500/40 animate-ping opacity-75 duration-700 pointer-events-none" />
      )}

      {/* Kinetic Icon with Pop & Spring on Copied */}
      <span className="relative flex items-center justify-center shrink-0">
        {copied ? (
          <Check className="w-3.5 h-3.5 text-emerald-300 animate-check-spring drop-shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
        ) : (
          <Copy className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6" />
        )}
      </span>

      {/* Kinetic Text Roll / Slide */}
      {!iconOnly && (
        <span className="overflow-hidden leading-none font-mono relative z-10">
          {copied ? (
            <span className="inline-flex items-center gap-1.5 text-emerald-200 font-bold tracking-wide animate-in fade-in slide-in-from-bottom-1 duration-200">
              <span>{copiedLabel}</span>
              <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" />
            </span>
          ) : (
            <span className="inline-block transition-colors">{label}</span>
          )}
        </span>
      )}
    </button>
  );
};

export default CopyButton;

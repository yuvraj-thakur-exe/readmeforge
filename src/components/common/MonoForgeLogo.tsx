'use client';

import React from 'react';

interface MonoForgeLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  iconOnly?: boolean;
}

export const MonoForgeMonkeyIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 1000 1000"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="48"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* Left Ear */}
    <path d="M 230 400 C 130 400 90 470 90 540 C 90 610 130 680 230 680" />
    {/* Right Ear */}
    <path d="M 770 400 C 870 400 910 470 910 540 C 910 610 870 680 770 680" />
    {/* Outer Hexagon */}
    <polygon points="340,160 660,160 840,380 840,680 660,880 340,880 160,680 160,380" fill="none" />
    {/* Inner Facial Mask */}
    <path d="M 500 370 L 380 290 L 270 420 L 360 540 L 360 720 L 500 810 L 640 720 L 640 540 L 730 420 L 620 290 Z" fill="none" />
    {/* Eyes */}
    <circle cx="400" cy="480" r="46" fill="currentColor" stroke="none" />
    <circle cx="600" cy="480" r="46" fill="currentColor" stroke="none" />
    {/* Nose & Mouth */}
    <path d="M 430 525 L 500 585 L 570 525" />
    <line x1="500" y1="585" x2="500" y2="700" />
    <path d="M 410 730 L 500 700 L 590 730" />
  </svg>
);

export const MonoForgeLogo: React.FC<MonoForgeLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = false,
  iconOnly = false,
}) => {
  const iconSize =
    size === 'sm' ? 'w-5 h-5' :
    size === 'lg' ? 'w-8 h-8' :
    'w-6 h-6';

  const textSize =
    size === 'sm' ? 'text-xs' :
    size === 'lg' ? 'text-xl' :
    'text-sm';

  return (
    <div className={`flex items-center gap-2 group ${className}`}>
      {/* Hexagonal Monkey Badge */}
      <div className="p-1 rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400 group-hover:border-amber-500/50 transition-colors shadow-sm">
        <MonoForgeMonkeyIcon className={iconSize} />
      </div>

      {!iconOnly && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-extrabold tracking-tight text-neutral-100 ${textSize}`}>
              Mono<span className="text-amber-400">Forge</span>
            </span>
          </div>
          {showTagline && (
            <span className="text-[9px] font-mono text-neutral-500 tracking-wider uppercase mt-0.5">
              Profile &amp; Telemetry
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default MonoForgeLogo;


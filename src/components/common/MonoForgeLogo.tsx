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
    viewBox="0 0 1024 1024"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="32"
    strokeLinecap="square"
    strokeLinejoin="miter"
    strokeMiterlimit="4"
    aria-hidden="true"
  >
    {/* Left Ear */}
    <path d="M 273 374 C 185 374 168 410 168 452 C 168 494 185 521 250 521" strokeLinecap="round" fill="none" />
    {/* Right Ear */}
    <path d="M 748 374 C 836 374 854 410 854 452 C 854 494 836 521 771 521" strokeLinecap="round" fill="none" />
    {/* Outer Polygonal Head */}
    <polygon points="512,195 719,310 774,493 594,733 430,733 250,493 305,310" fill="none" />
    {/* Inner Facial Mask / Brow Contour */}
    <path d="M 512 393 L 622 342 L 696 415 L 650 545 L 644 650 M 512 393 L 400 342 L 327 415 L 373 545 L 379 650" fill="none" />
    {/* Eyes */}
    <circle cx="424" cy="459" r="31" fill="currentColor" stroke="none" />
    <circle cx="598" cy="459" r="31" fill="currentColor" stroke="none" />
    {/* Nose & Philtrum */}
    <path d="M 453 507 L 512 558 L 571 507" fill="none" />
    <line x1="512" y1="558" x2="512" y2="626" />
    {/* Mouth */}
    <path d="M 432 651 L 512 626 L 592 651" fill="none" />
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
      <div className="p-1 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-amber-500 dark:text-amber-400 group-hover:border-amber-500 transition-colors shadow-sm">
        <MonoForgeMonkeyIcon className={iconSize} />
      </div>

      {!iconOnly && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100 ${textSize}`}>
              Mono<span className="text-amber-500 dark:text-amber-400">Forge</span>
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


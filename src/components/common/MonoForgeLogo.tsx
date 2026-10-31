'use client';

import React from 'react';

interface MonoForgeLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  iconOnly?: boolean;
}

export const MonoForgeMonkeyIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <img
    src="/assets/monoforge-monkey-logo.jpg"
    alt="MonoForge Monkey Logo"
    className={`${className} object-contain rounded-md`}
  />
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
      {/* Exact Monkey Badge */}
      <div className="p-0.5 rounded-lg bg-white border-2 border-neutral-900 group-hover:border-[#ffe600] transition-colors shadow-xs overflow-hidden">
        <MonoForgeMonkeyIcon className={iconSize} />
      </div>

      {!iconOnly && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-extrabold tracking-tight text-neutral-950 ${textSize}`}>
              Mono<span className="text-amber-500">Forge</span>
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

import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * Official Anthropic Claude Spark / Sunburst Logo (14-Point Radial Spoke Burst)
 */
export const ClaudeLogo: React.FC<LogoProps> = ({ className = 'w-4 h-4', size }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="3.2" fill="#D97757" />
    <path
      d="M12 2 L12 6 M12 18 L12 22 M2 12 L6 12 M18 12 L22 12 M4.93 4.93 L7.76 7.76 M16.24 16.24 L19.07 19.07 M4.93 19.07 L7.76 16.24 M16.24 7.76 L19.07 4.93"
      stroke="#D97757"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M3.5 8.2 L7.2 9.8 M16.8 14.2 L20.5 15.8 M8.2 3.5 L9.8 7.2 M14.2 16.8 L15.8 20.5"
      stroke="#D97757"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Official Google Antigravity Orbital Gyroscopic Ring Logo
 */
export const AntigravityLogo: React.FC<LogoProps> = ({ className = 'w-4 h-4', size }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="3" fill="#34D399" />
    <ellipse
      cx="12"
      cy="12"
      rx="9.5"
      ry="4"
      stroke="#10B981"
      strokeWidth="1.8"
      transform="rotate(-30 12 12)"
    />
    <ellipse
      cx="12"
      cy="12"
      rx="9.5"
      ry="4"
      stroke="#38BDF8"
      strokeWidth="1.5"
      transform="rotate(45 12 12)"
    />
    <circle cx="18" cy="8" r="1.4" fill="#67E8F9" />
  </svg>
);

/**
 * Official Microsoft Visual Studio Code Folded Ribbon Logo
 */
export const VsCodeLogo: React.FC<LogoProps> = ({ className = 'w-4 h-4', size }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.5 2.5 L6.5 10.5 L2 7.5 L2 16.5 L6.5 13.5 L17.5 21.5 L22 19 L22 5 Z"
      fill="#007ACC"
      fillOpacity="0.2"
    />
    <path
      d="M17.5 2.5 L6.5 10.5 L2 7.5 L2 16.5 L6.5 13.5 L17.5 21.5 L22 19 L22 5 Z"
      stroke="#007ACC"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path d="M6.5 10.5 L17.5 5 M6.5 13.5 L17.5 19" stroke="#38BDF8" strokeWidth="1.5" />
  </svg>
);

/**
 * Official Cursor Isometric 3D Wireframe Cube Logo
 */
export const CursorLogo: React.FC<LogoProps> = ({ className = 'w-4 h-4', size }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Top Face */}
    <path d="M12 2 L20.5 7 L12 12 L3.5 7 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.6" />
    {/* Left Face */}
    <path d="M3.5 7 L12 12 L12 22 L3.5 17 Z" fill="#0f172a" stroke="#0284c7" strokeWidth="1.6" />
    {/* Right Face */}
    <path d="M12 12 L20.5 7 L20.5 17 L12 22 Z" fill="#090d16" stroke="#38bdf8" strokeWidth="1.6" />
    {/* Glowing Center Vertex */}
    <circle cx="12" cy="12" r="1.5" fill="#67e8f9" />
  </svg>
);

/**
 * Official Windsurf Codeium Logo (Dynamic Surf/Wind Crest Wave)
 */
export const WindsurfLogo: React.FC<LogoProps> = ({ className = 'w-4 h-4', size }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 15 C6 15 8 13 11 9 C13 6 16 5 21 6 C17 8 15 11 13 15 C10 20 7 20 3 15 Z"
      fill="#00E599"
      fillOpacity="0.25"
      stroke="#00E599"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path d="M7 16 C11 16 14 12 18 10" stroke="#6ee7b7" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * Official Neovim Logo
 */
export const NeovimLogo: React.FC<LogoProps> = ({ className = 'w-4 h-4', size }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 20 L4 4 L8.5 4 L8.5 15 L4 20 Z" fill="#57A143" />
    <path d="M20 4 L20 20 L15.5 20 L15.5 9 L20 4 Z" fill="#57A143" />
    <path d="M8.5 4 L17 19 L15.5 20 L7 5 L8.5 4 Z" fill="#019833" />
    <path d="M8.5 4 L15.5 20" stroke="#81A1C1" strokeWidth="1.6" />
  </svg>
);

/**
 * Official NPM / NPX Vector Block Logo
 */
export const NpmLogo: React.FC<LogoProps> = ({ className = 'w-4 h-4', size }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" rx="4" fill="#CB3837" />
    <path d="M4 6 H20 V18 H13 V10 H9 V18 H4 Z" fill="#FFFFFF" />
  </svg>
);

/**
 * Official PNPM Quad-Block Isometric Logo
 */
export const PnpmLogo: React.FC<LogoProps> = ({ className = 'w-4 h-4', size }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3" y="3" width="8" height="8" rx="2" fill="#F69220" />
    <rect x="13" y="3" width="8" height="8" rx="2" fill="#F9AD34" />
    <rect x="13" y="13" width="8" height="8" rx="2" fill="#F69220" />
    <rect x="3" y="13" width="8" height="8" rx="2" fill="#4B5563" />
  </svg>
);

/**
 * POSIX Bash / Shell Terminal Prompt Logo
 */
export const BashLogo: React.FC<LogoProps> = ({ className = 'w-4 h-4', size }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="3" width="20" height="18" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
    <path d="M6 8 L10 12 L6 16" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="12" y1="16" x2="17" y2="16" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/**
 * Official Windows PowerShell Shell Symbol Logo
 */
export const PowerShellLogo: React.FC<LogoProps> = ({ className = 'w-4 h-4', size }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" rx="4" fill="#0F172A" stroke="#3B82F6" strokeWidth="1.2" />
    <path d="M6 7 L13 12 L6 17" stroke="#60A5FA" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="13" y1="17" x2="18" y2="17" stroke="#93C5FD" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);


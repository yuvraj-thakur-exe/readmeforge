import { AnimationConfig } from './types';

/**
 * Escapes characters for safe inclusion in SVG XML text nodes and attributes.
 */
export function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Computes X coordinate and text-anchor based on alignment setting.
 */
function getAlignmentMetrics(alignment: string, width: number) {
  switch (alignment) {
    case 'left':
      return { x: 45, anchor: 'start' };
    case 'right':
      return { x: width - 45, anchor: 'end' };
    case 'center':
    default:
      return { x: width / 2, anchor: 'middle' };
  }
}

/**
 * Generates standalone, GitHub-sanitizer-compliant animated SVG code.
 */
export function generateAnimatedSvg(config: AnimationConfig): string {
  const {
    preset,
    headline,
    subtitle,
    tag,
    fontFamily,
    primaryColor,
    secondaryColor,
    accentColor,
    backgroundColor,
    textColor,
    transparentBackground,
    width,
    height,
    duration,
    direction,
    repeat,
    alignment,
  } = config;

  const escHeadline = escapeXml(headline);
  const escSubtitle = escapeXml(subtitle);
  const escTag = escapeXml(tag);
  const { x, anchor } = getAlignmentMetrics(alignment, width);

  const bgRect = transparentBackground
    ? ''
    : `<rect width="${width}" height="${height}" rx="16" fill="${backgroundColor}" />`;

  const commonStyle = `
    font-family: '${fontFamily}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, monospace;
    animation-duration: ${duration}s;
    animation-direction: ${direction};
    animation-iteration-count: ${repeat};
  `;

  switch (preset) {
    case 'glitch': {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="glitchGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${primaryColor}" />
      <stop offset="100%" stop-color="${secondaryColor}" />
    </linearGradient>
  </defs>
  <style>
    .svg-root { ${commonStyle} }
    @keyframes glitchAnim {
      0%, 100% { transform: translate(0); filter: drop-shadow(-2px 0 ${primaryColor}) drop-shadow(2px 0 ${secondaryColor}); }
      15% { transform: translate(-3px, 2px); filter: drop-shadow(3px 0 #ef4444) drop-shadow(-3px 0 #06b6d4); }
      30% { transform: translate(2px, -2px); filter: drop-shadow(-2px 0 ${accentColor}); }
      45% { transform: translate(-2px, -1px); }
      60% { transform: translate(3px, 1px); filter: drop-shadow(2px 0 ${primaryColor}); }
      75% { transform: translate(-1px, 2px); }
    }
    @keyframes scanSlice {
      0% { transform: translateY(-10px); opacity: 0; }
      50% { opacity: 0.7; }
      100% { transform: translateY(${height + 10}px); opacity: 0; }
    }
    .headline-text {
      font-size: 36px;
      font-weight: 900;
      letter-spacing: 2px;
      fill: ${textColor};
      animation: glitchAnim ${duration}s ${direction} ${repeat} ease-in-out;
    }
    .sub-text {
      font-size: 15px;
      fill: ${secondaryColor};
      letter-spacing: 1px;
    }
    .tag-badge {
      font-size: 11px;
      font-weight: 700;
      fill: ${primaryColor};
      letter-spacing: 2px;
    }
    .scan-beam {
      animation: scanSlice ${duration * 0.8}s linear infinite;
    }
  </style>
  <g class="svg-root">
    ${bgRect}
    <rect x="2" y="2" width="${width - 4}" height="${height - 4}" rx="14" fill="none" stroke="${primaryColor}" stroke-opacity="0.3" stroke-width="1.5" />
    <line x1="0" y1="0" x2="${width}" y2="0" stroke="${secondaryColor}" stroke-width="2" class="scan-beam" />
    <g transform="translate(0, 0)">
      ${tag ? `<text x="${x}" y="65" text-anchor="${anchor}" class="tag-badge">► ${escTag}</text>` : ''}
      <text x="${x}" y="${tag ? 130 : 115}" text-anchor="${anchor}" class="headline-text">${escHeadline}</text>
      ${subtitle ? `<text x="${x}" y="${tag ? 180 : 165}" text-anchor="${anchor}" class="sub-text">${escSubtitle}</text>` : ''}
    </g>
  </g>
</svg>`;
    }

    case 'typing': {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <style>
    .svg-root { ${commonStyle} }
    @keyframes blinkCursor {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }
    @keyframes clipReveal {
      0% { clip-path: inset(0 100% 0 0); }
      70%, 100% { clip-path: inset(0 0 0 0); }
    }
    .type-line {
      font-size: 34px;
      font-weight: 800;
      fill: ${textColor};
      animation: clipReveal ${duration}s steps(32) ${direction} ${repeat};
    }
    .cursor-caret {
      fill: ${primaryColor};
      animation: blinkCursor 0.8s infinite;
    }
    .sub-type {
      font-size: 14px;
      fill: ${secondaryColor};
      font-family: monospace;
    }
    .shell-tag {
      font-size: 12px;
      fill: #10b981;
      font-family: monospace;
      font-weight: bold;
    }
  </style>
  <g class="svg-root">
    ${bgRect}
    <rect x="0" y="0" width="${width}" height="32" rx="16" fill="rgba(255,255,255,0.05)" />
    <circle cx="20" cy="16" r="4.5" fill="#ef4444" />
    <circle cx="35" cy="16" r="4.5" fill="#f59e0b" />
    <circle cx="50" cy="16" r="4.5" fill="#10b981" />
    <text x="${width - 25}" y="20" font-size="11" fill="rgba(255,255,255,0.4)" text-anchor="end">zsh</text>

    ${tag ? `<text x="${x}" y="75" text-anchor="${anchor}" class="shell-tag">$ ${escTag}</text>` : ''}
    <g class="type-line">
      <text x="${x}" y="${tag ? 140 : 120}" text-anchor="${anchor}">${escHeadline}</text>
    </g>
    <rect x="${x + (anchor === 'middle' ? (escHeadline.length * 9.5) : escHeadline.length * 19) + 4}" y="${tag ? 112 : 92}" width="4" height="32" class="cursor-caret" />
    ${subtitle ? `<text x="${x}" y="${tag ? 195 : 175}" text-anchor="${anchor}" class="sub-type">&gt; ${escSubtitle}</text>` : ''}
  </g>
</svg>`;
    }

    case 'wave': {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${primaryColor}" />
      <stop offset="50%" stop-color="${secondaryColor}" />
      <stop offset="100%" stop-color="${accentColor}" />
    </linearGradient>
  </defs>
  <style>
    .svg-root { ${commonStyle} }
    @keyframes waveDash {
      0% { stroke-dashoffset: 0; }
      100% { stroke-dashoffset: -1200; }
    }
    @keyframes textFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    .wave-line-1 {
      stroke: url(#waveGrad);
      stroke-width: 2.5;
      fill: none;
      stroke-dasharray: 40 20;
      animation: waveDash ${duration * 2}s linear infinite;
    }
    .wave-line-2 {
      stroke: ${secondaryColor};
      stroke-width: 1.5;
      fill: none;
      opacity: 0.4;
      stroke-dasharray: 20 15;
      animation: waveDash ${duration * 3}s linear infinite reverse;
    }
    .wave-headline {
      font-size: 38px;
      font-weight: 900;
      letter-spacing: 1.5px;
      fill: ${textColor};
      animation: textFloat ${duration}s ease-in-out infinite;
    }
    .wave-sub {
      font-size: 15px;
      fill: ${secondaryColor};
    }
  </style>
  <g class="svg-root">
    ${bgRect}
    <path d="M 0 ${height * 0.78} Q ${width * 0.25} ${height * 0.68}, ${width * 0.5} ${height * 0.78} T ${width} ${height * 0.78}" class="wave-line-1" />
    <path d="M 0 ${height * 0.84} Q ${width * 0.25} ${height * 0.92}, ${width * 0.5} ${height * 0.84} T ${width} ${height * 0.84}" class="wave-line-2" />
    ${tag ? `<text x="${x}" y="70" text-anchor="${anchor}" font-size="12" font-weight="700" fill="${accentColor}" letter-spacing="2">✦ ${escTag} ✦</text>` : ''}
    <text x="${x}" y="${tag ? 135 : 120}" text-anchor="${anchor}" class="wave-headline">${escHeadline}</text>
    ${subtitle ? `<text x="${x}" y="${tag ? 185 : 170}" text-anchor="${anchor}" class="wave-sub">${escSubtitle}</text>` : ''}
  </g>
</svg>`;
    }

    case 'matrix': {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <style>
    .svg-root { ${commonStyle} }
    @keyframes rainDrop {
      0% { transform: translateY(-60px); opacity: 0; }
      20% { opacity: 0.9; }
      80% { opacity: 0.8; }
      100% { transform: translateY(${height + 60}px); opacity: 0; }
    }
    .matrix-stream {
      font-family: monospace;
      font-size: 13px;
      fill: #22c55e;
      opacity: 0.35;
    }
    .c1 { animation: rainDrop ${duration}s linear infinite 0.2s; }
    .c2 { animation: rainDrop ${duration * 1.2}s linear infinite 0.7s; }
    .c3 { animation: rainDrop ${duration * 0.9}s linear infinite 1.2s; }
    .c4 { animation: rainDrop ${duration * 1.1}s linear infinite 0.4s; }
    .c5 { animation: rainDrop ${duration * 1.3}s linear infinite 1.6s; }
    .matrix-title {
      font-size: 36px;
      font-weight: 900;
      fill: #4ade80;
      letter-spacing: 3px;
      filter: drop-shadow(0 0 10px rgba(34, 197, 94, 0.6));
    }
    .matrix-sub {
      font-size: 14px;
      fill: #86efac;
      letter-spacing: 1px;
    }
  </style>
  <g class="svg-root">
    ${bgRect}
    <!-- Matrix Columns -->
    <text x="${width * 0.1}" y="0" class="matrix-stream c1">0 1 0 1 1 0 1 0 1</text>
    <text x="${width * 0.28}" y="0" class="matrix-stream c2">F O R G E 0 1 0 1</text>
    <text x="${width * 0.52}" y="0" class="matrix-stream c3">A R I A 1 0 1 0 0</text>
    <text x="${width * 0.75}" y="0" class="matrix-stream c4">1 0 1 1 0 1 0 1 0</text>
    <text x="${width * 0.9}" y="0" class="matrix-stream c5">0 0 1 0 1 1 0 1 1</text>

    <rect x="2" y="2" width="${width - 4}" height="${height - 4}" rx="14" fill="none" stroke="#22c55e" stroke-opacity="0.25" stroke-width="1.5" />
    ${tag ? `<text x="${x}" y="65" text-anchor="${anchor}" font-size="11" font-weight="bold" fill="#86efac" letter-spacing="3">[ SYSTEM: ${escTag} ]</text>` : ''}
    <text x="${x}" y="${tag ? 130 : 115}" text-anchor="${anchor}" class="matrix-title">${escHeadline}</text>
    ${subtitle ? `<text x="${x}" y="${tag ? 180 : 165}" text-anchor="${anchor}" class="matrix-sub">&lt; ${escSubtitle} /&gt;</text>` : ''}
  </g>
</svg>`;
    }

    case 'neon': {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="neonBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${primaryColor}" />
      <stop offset="50%" stop-color="${secondaryColor}" />
      <stop offset="100%" stop-color="${accentColor}" />
    </linearGradient>
    <filter id="neonFilter" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="5" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  <style>
    .svg-root { ${commonStyle} }
    @keyframes neonPulse {
      0%, 100% { filter: drop-shadow(0 0 8px ${primaryColor}) drop-shadow(0 0 18px ${secondaryColor}); opacity: 0.95; }
      50% { filter: drop-shadow(0 0 16px ${primaryColor}) drop-shadow(0 0 35px ${secondaryColor}); opacity: 1; }
    }
    @keyframes borderChase {
      0% { stroke-dashoffset: 0; }
      100% { stroke-dashoffset: 2800; }
    }
    .neon-border {
      stroke: url(#neonBorder);
      stroke-width: 2.5;
      fill: none;
      stroke-dasharray: 180 360;
      animation: borderChase ${duration * 3}s linear infinite;
    }
    .neon-title {
      font-size: 40px;
      font-weight: 900;
      letter-spacing: 3px;
      fill: #ffffff;
      animation: neonPulse ${duration}s ease-in-out infinite;
    }
    .neon-sub {
      font-size: 15px;
      fill: ${secondaryColor};
      letter-spacing: 1px;
    }
  </style>
  <g class="svg-root">
    ${bgRect}
    <rect x="3" y="3" width="${width - 6}" height="${height - 6}" rx="14" class="neon-border" />
    ${tag ? `<text x="${x}" y="65" text-anchor="${anchor}" font-size="12" font-weight="800" fill="${accentColor}" letter-spacing="3">⚡ ${escTag} ⚡</text>` : ''}
    <text x="${x}" y="${tag ? 135 : 120}" text-anchor="${anchor}" class="neon-title">${escHeadline}</text>
    ${subtitle ? `<text x="${x}" y="${tag ? 185 : 170}" text-anchor="${anchor}" class="neon-sub">${escSubtitle}</text>` : ''}
  </g>
</svg>`;
    }

    case 'particle': {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <style>
    .svg-root { ${commonStyle} }
    @keyframes floatParticle {
      0% { transform: translateY(0) scale(0.6); opacity: 0.1; }
      50% { transform: translateY(-35px) scale(1.2); opacity: 0.9; }
      100% { transform: translateY(-70px) scale(0.4); opacity: 0; }
    }
    .p1 { animation: floatParticle ${duration}s ease-out infinite 0.2s; }
    .p2 { animation: floatParticle ${duration * 1.3}s ease-out infinite 0.9s; }
    .p3 { animation: floatParticle ${duration * 0.9}s ease-out infinite 1.5s; }
    .p4 { animation: floatParticle ${duration * 1.1}s ease-out infinite 0.4s; }
    .p5 { animation: floatParticle ${duration * 1.2}s ease-out infinite 1.8s; }
    .particle-title {
      font-size: 38px;
      font-weight: 900;
      letter-spacing: 2px;
      fill: ${textColor};
    }
    .particle-sub {
      font-size: 15px;
      fill: ${secondaryColor};
    }
  </style>
  <g class="svg-root">
    ${bgRect}
    <!-- Particle Sparks -->
    <circle cx="${width * 0.2}" cy="${height * 0.7}" r="3" fill="${primaryColor}" class="p1" />
    <circle cx="${width * 0.38}" cy="${height * 0.75}" r="3.5" fill="${secondaryColor}" class="p2" />
    <circle cx="${width * 0.55}" cy="${height * 0.68}" r="2.5" fill="${accentColor}" class="p3" />
    <circle cx="${width * 0.72}" cy="${height * 0.72}" r="3" fill="${primaryColor}" class="p4" />
    <circle cx="${width * 0.85}" cy="${height * 0.78}" r="3.5" fill="${secondaryColor}" class="p5" />

    ${tag ? `<text x="${x}" y="65" text-anchor="${anchor}" font-size="12" font-weight="700" fill="${primaryColor}" letter-spacing="2">✨ ${escTag} ✨</text>` : ''}
    <text x="${x}" y="${tag ? 135 : 120}" text-anchor="${anchor}" class="particle-title">${escHeadline}</text>
    ${subtitle ? `<text x="${x}" y="${tag ? 185 : 170}" text-anchor="${anchor}" class="particle-sub">${escSubtitle}</text>` : ''}
  </g>
</svg>`;
    }

    case 'terminal': {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <style>
    .svg-root { ${commonStyle} }
    @keyframes termBlink {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }
    .term-headline {
      font-size: 32px;
      font-weight: 800;
      fill: ${textColor};
      font-family: monospace;
    }
    .term-prompt {
      font-size: 13px;
      fill: #38bdf8;
      font-family: monospace;
      font-weight: bold;
    }
    .term-sub {
      font-size: 14px;
      fill: #94a3b8;
      font-family: monospace;
    }
    .term-cursor {
      fill: #38bdf8;
      animation: termBlink 0.9s infinite;
    }
  </style>
  <g class="svg-root">
    ${bgRect}
    <!-- Window Bar -->
    <rect x="0" y="0" width="${width}" height="32" rx="16" fill="rgba(255,255,255,0.08)" />
    <circle cx="20" cy="16" r="4.5" fill="#ef4444" />
    <circle cx="36" cy="16" r="4.5" fill="#f59e0b" />
    <circle cx="52" cy="16" r="4.5" fill="#10b981" />
    <text x="${width / 2}" y="20" font-size="11" fill="rgba(255,255,255,0.4)" text-anchor="middle" font-family="monospace">bash - 900x280</text>

    <text x="${x}" y="70" text-anchor="${anchor}" class="term-prompt">user@github:~$ ${tag ? escTag : 'whoami'}</text>
    <text x="${x}" y="${tag ? 135 : 120}" text-anchor="${anchor}" class="term-headline">${escHeadline}</text>
    <rect x="${x + (anchor === 'middle' ? (escHeadline.length * 9) : escHeadline.length * 18) + 4}" y="${tag ? 110 : 95}" width="8" height="26" class="term-cursor" />
    ${subtitle ? `<text x="${x}" y="${tag ? 185 : 170}" text-anchor="${anchor}" class="term-sub">stdout: ${escSubtitle}</text>` : ''}
  </g>
</svg>`;
    }

    case '3d-banner': {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="bevel3d" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${primaryColor}" />
      <stop offset="100%" stop-color="${secondaryColor}" />
    </linearGradient>
  </defs>
  <style>
    .svg-root { ${commonStyle} }
    @keyframes bob3d {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-7px) rotate(0.4deg); }
    }
    .box-3d {
      animation: bob3d ${duration}s ease-in-out infinite;
    }
    .title-3d {
      font-size: 38px;
      font-weight: 900;
      letter-spacing: 2px;
      fill: ${textColor};
      filter: drop-shadow(0 4px 12px rgba(0,0,0,0.6));
    }
    .sub-3d {
      font-size: 15px;
      fill: ${secondaryColor};
      letter-spacing: 1px;
    }
  </style>
  <g class="svg-root">
    ${bgRect}
    <g class="box-3d">
      <rect x="20" y="20" width="${width - 40}" height="${height - 40}" rx="14" fill="rgba(255,255,255,0.02)" stroke="url(#bevel3d)" stroke-width="2" />
      ${tag ? `<text x="${x}" y="75" text-anchor="${anchor}" font-size="12" font-weight="800" fill="${accentColor}" letter-spacing="2">🧊 ${escTag} 🧊</text>` : ''}
      <text x="${x}" y="${tag ? 140 : 125}" text-anchor="${anchor}" class="title-3d">${escHeadline}</text>
      ${subtitle ? `<text x="${x}" y="${tag ? 190 : 175}" text-anchor="${anchor}" class="sub-3d">${escSubtitle}</text>` : ''}
    </g>
  </g>
</svg>`;
    }

    case 'minimal':
    default: {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <style>
    .svg-root { ${commonStyle} }
    @keyframes subtleFade {
      0%, 100% { opacity: 0.85; }
      50% { opacity: 1; }
    }
    .min-headline {
      font-size: 34px;
      font-weight: 700;
      letter-spacing: 1px;
      fill: ${textColor};
      animation: subtleFade ${duration}s ease-in-out infinite;
    }
    .min-sub {
      font-size: 14px;
      fill: ${secondaryColor};
      letter-spacing: 0.5px;
    }
    .min-tag {
      font-size: 11px;
      font-weight: 600;
      fill: ${primaryColor};
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }
  </style>
  <g class="svg-root">
    ${bgRect}
    <rect x="15" y="15" width="${width - 30}" height="${height - 30}" rx="8" fill="none" stroke="${primaryColor}" stroke-opacity="0.2" stroke-width="1" />
    ${tag ? `<text x="${x}" y="70" text-anchor="${anchor}" class="min-tag">${escTag}</text>` : ''}
    <text x="${x}" y="${tag ? 135 : 120}" text-anchor="${anchor}" class="min-headline">${escHeadline}</text>
    ${subtitle ? `<text x="${x}" y="${tag ? 180 : 165}" text-anchor="${anchor}" class="min-sub">${escSubtitle}</text>` : ''}
  </g>
</svg>`;
    }
  }
}

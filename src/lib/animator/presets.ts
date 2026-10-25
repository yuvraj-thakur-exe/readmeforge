import {
  AnimationConfig,
  TextEffect,
  BackgroundEffect,
  SvgEffect,
  ThreeDEffect,
} from './types';

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
      return { x: 50, anchor: 'start' };
    case 'right':
      return { x: width - 50, anchor: 'end' };
    case 'center':
    default:
      return { x: width / 2, anchor: 'middle' };
  }
}

/**
 * Generates background layer SVG markup and associated styles.
 */
function renderBackgroundLayer(
  bgEffect: BackgroundEffect,
  width: number,
  height: number,
  primaryColor: string,
  secondaryColor: string,
  accentColor: string,
  backgroundColor: string,
  transparent: boolean,
  duration: number
): { defs: string; style: string; markup: string } {
  if (transparent) {
    return { defs: '', style: '', markup: '' };
  }

  switch (bgEffect) {
    case 'particles': {
      return {
        defs: '',
        style: `
          @keyframes bgFloatParticle {
            0% { transform: translateY(0) scale(0.6); opacity: 0.1; }
            50% { transform: translateY(-40px) scale(1.3); opacity: 0.9; }
            100% { transform: translateY(-80px) scale(0.4); opacity: 0; }
          }
          .p-bg-1 { animation: bgFloatParticle ${duration}s ease-out infinite 0.2s; }
          .p-bg-2 { animation: bgFloatParticle ${duration * 1.3}s ease-out infinite 0.9s; }
          .p-bg-3 { animation: bgFloatParticle ${duration * 0.9}s ease-out infinite 1.5s; }
          .p-bg-4 { animation: bgFloatParticle ${duration * 1.1}s ease-out infinite 0.4s; }
        `,
        markup: `
          <rect width="${width}" height="${height}" rx="16" fill="${backgroundColor}" />
          <circle cx="${width * 0.15}" cy="${height * 0.75}" r="3" fill="${primaryColor}" class="p-bg-1" />
          <circle cx="${width * 0.35}" cy="${height * 0.8}" r="4" fill="${secondaryColor}" class="p-bg-2" />
          <circle cx="${width * 0.65}" cy="${height * 0.7}" r="2.5" fill="${accentColor}" class="p-bg-3" />
          <circle cx="${width * 0.85}" cy="${height * 0.78}" r="3.5" fill="${primaryColor}" class="p-bg-4" />
        `,
      };
    }

    case 'grids': {
      return {
        defs: `
          <pattern id="cyberGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${primaryColor}" stroke-opacity="0.12" stroke-width="1" />
          </pattern>
          <linearGradient id="gridScanner" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="${primaryColor}" stop-opacity="0" />
            <stop offset="50%" stop-color="${secondaryColor}" stop-opacity="0.35" />
            <stop offset="100%" stop-color="${primaryColor}" stop-opacity="0" />
          </linearGradient>
        `,
        style: `
          @keyframes gridScan {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          .grid-scanner { animation: gridScan ${duration * 1.5}s linear infinite; }
        `,
        markup: `
          <rect width="${width}" height="${height}" rx="16" fill="${backgroundColor}" />
          <rect width="${width}" height="${height}" rx="16" fill="url(#cyberGrid)" />
          <rect width="${width}" height="${height}" rx="16" fill="url(#gridScanner)" class="grid-scanner" />
        `,
      };
    }

    case 'stars': {
      return {
        defs: '',
        style: `
          @keyframes starTwinkle {
            0%, 100% { opacity: 0.2; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.4); }
          }
          .s1 { animation: starTwinkle ${duration * 0.8}s ease-in-out infinite 0.1s; }
          .s2 { animation: starTwinkle ${duration * 1.2}s ease-in-out infinite 0.6s; }
          .s3 { animation: starTwinkle ${duration}s ease-in-out infinite 1.1s; }
        `,
        markup: `
          <rect width="${width}" height="${height}" rx="16" fill="${backgroundColor}" />
          <circle cx="${width * 0.12}" cy="${height * 0.25}" r="2" fill="#ffffff" class="s1" />
          <circle cx="${width * 0.28}" cy="${height * 0.65}" r="1.5" fill="${secondaryColor}" class="s2" />
          <circle cx="${width * 0.45}" cy="${height * 0.2}" r="2" fill="#ffffff" class="s3" />
          <circle cx="${width * 0.72}" cy="${height * 0.3}" r="1.5" fill="${accentColor}" class="s1" />
          <circle cx="${width * 0.88}" cy="${height * 0.7}" r="2.5" fill="#ffffff" class="s2" />
        `,
      };
    }

    case 'animated-gradient': {
      return {
        defs: `
          <linearGradient id="fluidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${backgroundColor}" />
            <stop offset="50%" stop-color="${primaryColor}" stop-opacity="0.3" />
            <stop offset="100%" stop-color="${secondaryColor}" stop-opacity="0.25" />
          </linearGradient>
        `,
        style: `
          @keyframes fluidShift {
            0%, 100% { opacity: 0.7; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
          }
          .fluid-bg { animation: fluidShift ${duration * 1.4}s ease-in-out infinite; transform-origin: center; }
        `,
        markup: `
          <rect width="${width}" height="${height}" rx="16" fill="${backgroundColor}" />
          <rect width="${width}" height="${height}" rx="16" fill="url(#fluidGrad)" class="fluid-bg" />
        `,
      };
    }

    case 'matrix': {
      return {
        defs: '',
        style: `
          @keyframes matrixStream {
            0% { transform: translateY(-50px); opacity: 0; }
            20% { opacity: 0.8; }
            80% { opacity: 0.8; }
            100% { transform: translateY(${height + 50}px); opacity: 0; }
          }
          .m-char { font-family: monospace; font-size: 11px; fill: #22c55e; opacity: 0.35; }
          .mc1 { animation: matrixStream ${duration}s linear infinite 0.2s; }
          .mc2 { animation: matrixStream ${duration * 1.2}s linear infinite 0.7s; }
          .mc3 { animation: matrixStream ${duration * 0.9}s linear infinite 1.2s; }
        `,
        markup: `
          <rect width="${width}" height="${height}" rx="16" fill="${backgroundColor}" />
          <text x="${width * 0.15}" y="0" class="m-char mc1">0 1 0 1 1 0 1</text>
          <text x="${width * 0.45}" y="0" class="m-char mc2">1 0 1 0 0 1 0</text>
          <text x="${width * 0.8}" y="0" class="m-char mc3">0 0 1 1 0 1 1</text>
        `,
      };
    }

    case 'solid':
    default: {
      return {
        defs: '',
        style: '',
        markup: `<rect width="${width}" height="${height}" rx="16" fill="${backgroundColor}" />`,
      };
    }
  }
}

/**
 * Generates text effect SVG markup and associated styles.
 */
function renderTextLayer(
  effect: TextEffect,
  headline: string,
  subtitle: string,
  tag: string,
  x: number,
  anchor: string,
  textColor: string,
  primaryColor: string,
  secondaryColor: string,
  accentColor: string,
  duration: number
): { defs: string; style: string; markup: string } {
  const escHeadline = escapeXml(headline);
  const escSubtitle = escapeXml(subtitle);
  const escTag = escapeXml(tag);

  switch (effect) {
    case 'typing': {
      return {
        defs: '',
        style: `
          @keyframes typingClip {
            0% { clip-path: inset(0 100% 0 0); }
            70%, 100% { clip-path: inset(0 0 0 0); }
          }
          @keyframes blinkCaret {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
          }
          .type-text {
            font-size: 34px;
            font-weight: 800;
            fill: ${textColor};
            animation: typingClip ${duration}s steps(30) infinite;
          }
          .type-caret {
            fill: ${primaryColor};
            animation: blinkCaret 0.8s infinite;
          }
        `,
        markup: `
          ${tag ? `<text x="${x}" y="70" text-anchor="${anchor}" font-size="12" font-weight="700" fill="${primaryColor}">$ ${escTag}</text>` : ''}
          <g class="type-text">
            <text x="${x}" y="${tag ? 135 : 120}" text-anchor="${anchor}">${escHeadline}</text>
          </g>
          <rect x="${x + (anchor === 'middle' ? (escHeadline.length * 9) : escHeadline.length * 18) + 4}" y="${tag ? 108 : 93}" width="4" height="30" class="type-caret" />
          ${subtitle ? `<text x="${x}" y="${tag ? 185 : 170}" text-anchor="${anchor}" font-size="14" fill="${secondaryColor}">&gt; ${escSubtitle}</text>` : ''}
        `,
      };
    }

    case 'scramble': {
      return {
        defs: '',
        style: `
          @keyframes scrambleFlicker {
            0%, 100% { opacity: 1; filter: none; }
            20% { opacity: 0.7; filter: blur(1px); }
            40% { opacity: 0.9; }
            60% { opacity: 0.6; filter: blur(0.5px); }
            80% { opacity: 0.95; }
          }
          .scramble-title {
            font-size: 36px;
            font-weight: 900;
            fill: ${textColor};
            letter-spacing: 2.5px;
            animation: scrambleFlicker ${duration * 0.8}s steps(6) infinite;
          }
        `,
        markup: `
          ${tag ? `<text x="${x}" y="65" text-anchor="${anchor}" font-size="11" font-weight="700" fill="${accentColor}" letter-spacing="3">[ DECRYPT: ${escTag} ]</text>` : ''}
          <text x="${x}" y="${tag ? 130 : 115}" text-anchor="${anchor}" class="scramble-title">${escHeadline}</text>
          ${subtitle ? `<text x="${x}" y="${tag ? 180 : 165}" text-anchor="${anchor}" font-size="14" fill="${secondaryColor}">&lt; ${escSubtitle} /&gt;</text>` : ''}
        `,
      };
    }

    case 'gradient': {
      return {
        defs: `
          <linearGradient id="textShimmer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="${primaryColor}" />
            <stop offset="50%" stop-color="${secondaryColor}" />
            <stop offset="100%" stop-color="${accentColor}" />
          </linearGradient>
        `,
        style: `
          @keyframes textPulse {
            0%, 100% { filter: drop-shadow(0 0 6px ${primaryColor}); opacity: 0.9; }
            50% { filter: drop-shadow(0 0 18px ${secondaryColor}); opacity: 1; }
          }
          .shimmer-title {
            font-size: 38px;
            font-weight: 900;
            fill: url(#textShimmer);
            letter-spacing: 2px;
            animation: textPulse ${duration}s ease-in-out infinite;
          }
        `,
        markup: `
          ${tag ? `<text x="${x}" y="65" text-anchor="${anchor}" font-size="12" font-weight="800" fill="${accentColor}" letter-spacing="2">✦ ${escTag} ✦</text>` : ''}
          <text x="${x}" y="${tag ? 135 : 120}" text-anchor="${anchor}" class="shimmer-title">${escHeadline}</text>
          ${subtitle ? `<text x="${x}" y="${tag ? 185 : 170}" text-anchor="${anchor}" font-size="15" fill="${secondaryColor}">${escSubtitle}</text>` : ''}
        `,
      };
    }

    case 'glitch': {
      return {
        defs: '',
        style: `
          @keyframes textGlitch {
            0%, 100% { transform: translate(0); filter: drop-shadow(-2px 0 ${primaryColor}) drop-shadow(2px 0 ${secondaryColor}); }
            15% { transform: translate(-3px, 2px); filter: drop-shadow(3px 0 #ef4444) drop-shadow(-3px 0 #06b6d4); }
            30% { transform: translate(2px, -2px); filter: drop-shadow(-2px 0 ${accentColor}); }
            45% { transform: translate(-2px, -1px); }
            60% { transform: translate(3px, 1px); filter: drop-shadow(2px 0 ${primaryColor}); }
            75% { transform: translate(-1px, 2px); }
          }
          .glitch-title {
            font-size: 38px;
            font-weight: 900;
            letter-spacing: 2px;
            fill: ${textColor};
            animation: textGlitch ${duration}s ease-in-out infinite;
          }
        `,
        markup: `
          ${tag ? `<text x="${x}" y="65" text-anchor="${anchor}" font-size="11" font-weight="700" fill="${primaryColor}" letter-spacing="2">► ${escTag}</text>` : ''}
          <text x="${x}" y="${tag ? 130 : 115}" text-anchor="${anchor}" class="glitch-title">${escHeadline}</text>
          ${subtitle ? `<text x="${x}" y="${tag ? 180 : 165}" text-anchor="${anchor}" font-size="15" fill="${secondaryColor}">${escSubtitle}</text>` : ''}
        `,
      };
    }

    case 'wave': {
      return {
        defs: '',
        style: `
          @keyframes textWaveMotion {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          .wave-title {
            font-size: 38px;
            font-weight: 900;
            letter-spacing: 1.5px;
            fill: ${textColor};
            animation: textWaveMotion ${duration}s ease-in-out infinite;
          }
        `,
        markup: `
          ${tag ? `<text x="${x}" y="65" text-anchor="${anchor}" font-size="12" font-weight="700" fill="${accentColor}" letter-spacing="2">🌊 ${escTag} 🌊</text>` : ''}
          <text x="${x}" y="${tag ? 135 : 120}" text-anchor="${anchor}" class="wave-title">${escHeadline}</text>
          ${subtitle ? `<text x="${x}" y="${tag ? 185 : 170}" text-anchor="${anchor}" font-size="15" fill="${secondaryColor}">${escSubtitle}</text>` : ''}
        `,
      };
    }

    case 'reveal':
    default: {
      return {
        defs: '',
        style: `
          @keyframes curtainReveal {
            0% { opacity: 0; transform: translateY(12px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .reveal-title {
            font-size: 36px;
            font-weight: 800;
            fill: ${textColor};
            letter-spacing: 1px;
            animation: curtainReveal ${duration * 0.6}s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `,
        markup: `
          ${tag ? `<text x="${x}" y="65" text-anchor="${anchor}" font-size="11" font-weight="600" fill="${primaryColor}" letter-spacing="2" text-transform="uppercase">${escTag}</text>` : ''}
          <text x="${x}" y="${tag ? 130 : 115}" text-anchor="${anchor}" class="reveal-title">${escHeadline}</text>
          ${subtitle ? `<text x="${x}" y="${tag ? 180 : 165}" text-anchor="${anchor}" font-size="14" fill="${secondaryColor}">${escSubtitle}</text>` : ''}
        `,
      };
    }
  }
}

/**
 * Generates SVG decorative/vector effect overlay markup.
 */
function renderSvgEffectOverlay(
  effect: SvgEffect,
  width: number,
  height: number,
  primaryColor: string,
  secondaryColor: string,
  duration: number
): { defs: string; style: string; markup: string } {
  switch (effect) {
    case 'line-drawing': {
      return {
        defs: `
          <linearGradient id="drawGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="${primaryColor}" />
            <stop offset="100%" stop-color="${secondaryColor}" />
          </linearGradient>
        `,
        style: `
          @keyframes pathDraw {
            0% { stroke-dashoffset: 1200; }
            100% { stroke-dashoffset: 0; }
          }
          .drawing-line {
            stroke: url(#drawGrad);
            stroke-width: 2.5;
            fill: none;
            stroke-dasharray: 1200;
            animation: pathDraw ${duration * 1.5}s ease-in-out infinite alternate;
          }
        `,
        markup: `
          <path d="M 30 ${height - 35} Q ${width / 2} ${height - 15}, ${width - 30} ${height - 35}" class="drawing-line" />
        `,
      };
    }

    case 'path-morphing': {
      return {
        defs: '',
        style: `
          @keyframes morphPulse {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.4; }
            50% { transform: scale(1.15) rotate(180deg); opacity: 0.8; }
          }
          .morph-poly {
            animation: morphPulse ${duration * 2}s ease-in-out infinite;
            transform-origin: 60px 60px;
          }
        `,
        markup: `
          <g transform="translate(40, 30)">
            <polygon points="20,0 40,35 0,35" fill="none" stroke="${primaryColor}" stroke-width="2" class="morph-poly" />
          </g>
        `,
      };
    }

    case 'animated-logo': {
      return {
        defs: '',
        style: `
          @keyframes spinLogo {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .spin-ring {
            animation: spinLogo ${duration * 2.5}s linear infinite;
            transform-origin: ${width - 65}px 65px;
          }
        `,
        markup: `
          <g class="spin-ring">
            <circle cx="${width - 65}" cy="65" r="24" fill="none" stroke="${secondaryColor}" stroke-width="2" stroke-dasharray="12 6" />
            <circle cx="${width - 65}" cy="65" r="14" fill="${primaryColor}" fill-opacity="0.3" stroke="${primaryColor}" stroke-width="1.5" />
          </g>
        `,
      };
    }

    case 'none':
    default:
      return { defs: '', style: '', markup: '' };
  }
}

/**
 * Generates 3D effect overlay markup.
 */
function renderThreeDOverlay(
  effect: ThreeDEffect,
  width: number,
  height: number,
  primaryColor: string,
  secondaryColor: string,
  duration: number
): { defs: string; style: string; markup: string } {
  switch (effect) {
    case 'rotating-cube': {
      return {
        defs: '',
        style: `
          @keyframes cubeBob {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(3deg); }
          }
          .cube-group {
            animation: cubeBob ${duration}s ease-in-out infinite;
            transform-origin: 70px ${height / 2}px;
          }
        `,
        markup: `
          <g class="cube-group">
            <polygon points="70,${height/2 - 25} 100,${height/2 - 10} 70,${height/2 + 5} 40,${height/2 - 10}" fill="${primaryColor}" fill-opacity="0.25" stroke="${primaryColor}" stroke-width="1.5" />
            <polygon points="40,${height/2 - 10} 70,${height/2 + 5} 70,${height/2 + 35} 40,${height/2 + 20}" fill="${secondaryColor}" fill-opacity="0.4" stroke="${secondaryColor}" stroke-width="1.5" />
            <polygon points="100,${height/2 - 10} 70,${height/2 + 5} 70,${height/2 + 35} 100,${height/2 + 20}" fill="${primaryColor}" fill-opacity="0.15" stroke="${primaryColor}" stroke-width="1.5" />
          </g>
        `,
      };
    }

    case 'interactive-card': {
      return {
        defs: `
          <linearGradient id="cardBevel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${primaryColor}" stop-opacity="0.6" />
            <stop offset="100%" stop-color="${secondaryColor}" stop-opacity="0.2" />
          </linearGradient>
        `,
        style: `
          @keyframes cardFloat {
            0%, 100% { transform: translateY(0px); filter: drop-shadow(0 6px 14px rgba(0,0,0,0.5)); }
            50% { transform: translateY(-6px); filter: drop-shadow(0 14px 24px rgba(0,0,0,0.7)); }
          }
          .card-frame { animation: cardFloat ${duration}s ease-in-out infinite; }
        `,
        markup: `
          <rect x="10" y="10" width="${width - 20}" height="${height - 20}" rx="14" fill="none" stroke="url(#cardBevel)" stroke-width="1.5" class="card-frame" />
        `,
      };
    }

    case 'particle-environment': {
      return {
        defs: '',
        style: `
          @keyframes tunnelZoom {
            0% { transform: scale(0.3); opacity: 0; }
            50% { opacity: 0.8; }
            100% { transform: scale(1.6); opacity: 0; }
          }
          .tunnel-ring { animation: tunnelZoom ${duration * 1.5}s ease-out infinite; transform-origin: center; }
        `,
        markup: `
          <g>
            <circle cx="${width / 2}" cy="${height / 2}" r="60" fill="none" stroke="${primaryColor}" stroke-width="1.5" stroke-opacity="0.3" class="tunnel-ring" />
            <circle cx="${width / 2}" cy="${height / 2}" r="110" fill="none" stroke="${secondaryColor}" stroke-width="1" stroke-opacity="0.2" class="tunnel-ring" style="animation-delay: 0.7s;" />
          </g>
        `,
      };
    }

    case 'none':
    default:
      return { defs: '', style: '', markup: '' };
  }
}

/**
 * Generates standalone, GitHub-sanitizer-compliant animated SVG code.
 */
export function generateAnimatedSvg(config: AnimationConfig): string {
  const {
    headline,
    subtitle,
    tag,
    fontFamily,
    textEffect,
    backgroundEffect,
    svgEffect,
    threeDEffect,
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
    reducedMotion,
  } = config;

  const { x, anchor } = getAlignmentMetrics(alignment, width);

  // Render individual layers
  const bg = renderBackgroundLayer(
    backgroundEffect,
    width,
    height,
    primaryColor,
    secondaryColor,
    accentColor,
    backgroundColor,
    transparentBackground,
    duration
  );

  const txt = renderTextLayer(
    textEffect,
    headline,
    subtitle,
    tag,
    x,
    anchor,
    textColor,
    primaryColor,
    secondaryColor,
    accentColor,
    duration
  );

  const svgFx = renderSvgEffectOverlay(
    svgEffect,
    width,
    height,
    primaryColor,
    secondaryColor,
    duration
  );

  const threeD = renderThreeDOverlay(
    threeDEffect,
    width,
    height,
    primaryColor,
    secondaryColor,
    duration
  );

  // Global & Accessibility Styles
  const globalStyles = `
    .svg-root {
      font-family: '${fontFamily}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, monospace;
      animation-duration: ${duration}s;
      animation-direction: ${direction};
      animation-iteration-count: ${repeat};
    }
    ${reducedMotion ? `* { animation: none !important; transition: none !important; }` : ''}
    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; transition: none !important; }
    }
  `;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    ${bg.defs}
    ${txt.defs}
    ${svgFx.defs}
    ${threeD.defs}
  </defs>
  <style>
    ${globalStyles}
    ${bg.style}
    ${txt.style}
    ${svgFx.style}
    ${threeD.style}
  </style>
  <g class="svg-root">
    ${bg.markup}
    ${threeD.markup}
    ${svgFx.markup}
    ${txt.markup}
  </g>
</svg>`;
}

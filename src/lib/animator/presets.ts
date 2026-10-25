import {
  AnimationConfig,
  TextEffect,
  BackgroundEffect,
  FrameEffect,
  SvgEffect,
  ThreeDEffect,
  CharacterType,
  CharacterAction,
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
    case 'fire': {
      return {
        defs: `
          <linearGradient id="fireBaseGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#ff1a1a" stop-opacity="0.85" />
            <stop offset="25%" stop-color="#ff6600" stop-opacity="0.6" />
            <stop offset="60%" stop-color="#ffb703" stop-opacity="0.25" />
            <stop offset="100%" stop-color="#ffee32" stop-opacity="0" />
          </linearGradient>
          <radialGradient id="fireCenterAura" cx="50%" cy="85%" r="65%">
            <stop offset="0%" stop-color="#ff7b00" stop-opacity="0.45" />
            <stop offset="50%" stop-color="#d00000" stop-opacity="0.2" />
            <stop offset="100%" stop-color="${backgroundColor}" stop-opacity="0" />
          </radialGradient>
        `,
        style: `
          @keyframes emberRise {
            0% { transform: translateY(0) translateX(0) scale(0.6); opacity: 0; }
            15% { opacity: 0.95; }
            70% { opacity: 0.8; }
            100% { transform: translateY(-${height * 0.85}px) translateX(24px) scale(0.2); opacity: 0; }
          }
          @keyframes emberRiseAlt {
            0% { transform: translateY(0) translateX(0) scale(0.7); opacity: 0; }
            20% { opacity: 0.9; }
            80% { opacity: 0.7; }
            100% { transform: translateY(-${height * 0.9}px) translateX(-28px) scale(0.15); opacity: 0; }
          }
          @keyframes flameTongue {
            0%, 100% { transform: scaleY(1) skewX(0deg); opacity: 0.8; }
            50% { transform: scaleY(1.22) skewX(2deg); opacity: 0.95; }
          }
          .ember1 { animation: emberRise ${duration * 0.8}s ease-out infinite 0.1s; }
          .ember2 { animation: emberRiseAlt ${duration * 1.1}s ease-out infinite 0.4s; }
          .ember3 { animation: emberRise ${duration * 0.9}s ease-out infinite 0.9s; }
          .ember4 { animation: emberRiseAlt ${duration * 1.3}s ease-out infinite 1.3s; }
          .ember5 { animation: emberRise ${duration * 0.7}s ease-out infinite 0.6s; }
          .flame-wave { animation: flameTongue ${duration * 0.75}s ease-in-out infinite; transform-origin: center bottom; }
        `,
        markup: `
          <rect width="${width}" height="${height}" rx="16" fill="${backgroundColor}" />
          <rect width="${width}" height="${height}" rx="16" fill="url(#fireCenterAura)" />
          <path d="M 0 ${height} Q ${width * 0.12} ${height - 45} ${width * 0.25} ${height} Q ${width * 0.38} ${height - 65} ${width * 0.5} ${height} Q ${width * 0.62} ${height - 50} ${width * 0.75} ${height} Q ${width * 0.88} ${height - 70} ${width} ${height} L ${width} ${height} L 0 ${height} Z" fill="url(#fireBaseGrad)" class="flame-wave" />
          <circle cx="${width * 0.18}" cy="${height * 0.88}" r="3.5" fill="#ffee32" class="ember1" />
          <circle cx="${width * 0.32}" cy="${height * 0.92}" r="4" fill="#ff7b00" class="ember2" />
          <circle cx="${width * 0.48}" cy="${height * 0.85}" r="3" fill="#ffb703" class="ember3" />
          <circle cx="${width * 0.68}" cy="${height * 0.9}" r="4.5" fill="#ffee32" class="ember4" />
          <circle cx="${width * 0.82}" cy="${height * 0.86}" r="3" fill="#ff5400" class="ember5" />
        `,
      };
    }

    case 'water': {
      return {
        defs: `
          <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="${backgroundColor}" />
            <stop offset="45%" stop-color="#032539" stop-opacity="0.8" />
            <stop offset="80%" stop-color="#006989" stop-opacity="0.6" />
            <stop offset="100%" stop-color="#00a7b5" stop-opacity="0.4" />
          </linearGradient>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.4" />
            <stop offset="50%" stop-color="#2dd4bf" stop-opacity="0.6" />
            <stop offset="100%" stop-color="#818cf8" stop-opacity="0.35" />
          </linearGradient>
        `,
        style: `
          @keyframes waveDrift1 {
            0% { transform: translateX(0); }
            50% { transform: translateX(-35px); }
            100% { transform: translateX(0); }
          }
          @keyframes waveDrift2 {
            0% { transform: translateX(0); }
            50% { transform: translateX(40px); }
            100% { transform: translateX(0); }
          }
          @keyframes waterDropRipple {
            0% { r: 3; opacity: 0.9; stroke-width: 2.5; }
            100% { r: 55; opacity: 0; stroke-width: 0.5; }
          }
          .wave-1 { animation: waveDrift1 ${duration * 1.5}s ease-in-out infinite; }
          .wave-2 { animation: waveDrift2 ${duration * 1.8}s ease-in-out infinite 0.4s; }
          .ripple-1 { animation: waterDropRipple ${duration * 1.2}s ease-out infinite 0.2s; }
          .ripple-2 { animation: waterDropRipple ${duration * 1.4}s ease-out infinite 1.1s; }
        `,
        markup: `
          <rect width="${width}" height="${height}" rx="16" fill="${backgroundColor}" />
          <rect width="${width}" height="${height}" rx="16" fill="url(#oceanGrad)" />
          <g class="wave-1">
            <path d="M -50 ${height * 0.72} Q ${width * 0.25} ${height * 0.62} ${width * 0.5} ${height * 0.72} T ${width + 50} ${height * 0.72} L ${width + 50} ${height} L -50 ${height} Z" fill="url(#waveGrad)" />
          </g>
          <g class="wave-2" opacity="0.6">
            <path d="M -50 ${height * 0.78} Q ${width * 0.25} ${height * 0.86} ${width * 0.5} ${height * 0.78} T ${width + 50} ${height * 0.78} L ${width + 50} ${height} L -50 ${height} Z" fill="#38bdf8" fill-opacity="0.3" />
          </g>
          <circle cx="${width * 0.28}" cy="${height * 0.68}" r="3" fill="none" stroke="#67e8f9" class="ripple-1" />
          <circle cx="${width * 0.74}" cy="${height * 0.75}" r="3" fill="none" stroke="#38bdf8" class="ripple-2" />
        `,
      };
    }

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
 * Generates frame and border overlay SVG markup and associated styles.
 */
function renderFrameLayer(
  frameEffect: FrameEffect | undefined,
  width: number,
  height: number,
  primaryColor: string,
  secondaryColor: string,
  accentColor: string,
  duration: number
): { defs: string; style: string; markup: string } {
  if (!frameEffect || frameEffect === 'none') {
    return { defs: '', style: '', markup: '' };
  }

  const pad = 3;
  const fWidth = width - pad * 2;
  const fHeight = height - pad * 2;
  const rx = 14;

  switch (frameEffect) {
    case 'cyber-neon': {
      return {
        defs: `
          <linearGradient id="neonFrameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${primaryColor}" />
            <stop offset="50%" stop-color="${secondaryColor}" />
            <stop offset="100%" stop-color="${accentColor}" />
          </linearGradient>
          <filter id="neonFrameGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        `,
        style: `
          @keyframes neonDash {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: 1400; }
          }
          @keyframes bracketPulse {
            0%, 100% { opacity: 0.7; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.02); }
          }
          .neon-border-track {
            stroke: url(#neonFrameGrad);
            stroke-width: 2;
            fill: none;
            stroke-dasharray: 120 240;
            animation: neonDash ${duration * 2}s linear infinite;
            filter: url(#neonFrameGlow);
          }
          .neon-bracket {
            stroke: ${secondaryColor};
            stroke-width: 2.5;
            fill: none;
            animation: bracketPulse ${duration}s ease-in-out infinite;
          }
        `,
        markup: `
          <rect x="${pad}" y="${pad}" width="${fWidth}" height="${fHeight}" rx="${rx}" class="neon-border-track" />
          <path d="M ${pad + 1} ${pad + 26} L ${pad + 1} ${pad + 1} L ${pad + 26} ${pad + 1}" class="neon-bracket" />
          <path d="M ${width - pad - 26} ${pad + 1} L ${width - pad - 1} ${pad + 1} L ${width - pad - 1} ${pad + 26}" class="neon-bracket" />
          <path d="M ${pad + 1} ${height - pad - 26} L ${pad + 1} ${height - pad - 1} L ${pad + 26} ${height - pad - 1}" class="neon-bracket" />
          <path d="M ${width - pad - 26} ${height - pad - 1} L ${width - pad - 1} ${height - pad - 1} L ${width - pad - 1} ${height - pad - 26}" class="neon-bracket" />
        `,
      };
    }

    case 'glassmorphism': {
      return {
        defs: `
          <linearGradient id="glassSheenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="rgba(255,255,255,0)" />
            <stop offset="50%" stop-color="rgba(255,255,255,0.4)" />
            <stop offset="100%" stop-color="rgba(255,255,255,0)" />
          </linearGradient>
          <clipPath id="glassClip">
            <rect x="${pad}" y="${pad}" width="${fWidth}" height="${fHeight}" rx="${rx}" />
          </clipPath>
        `,
        style: `
          @keyframes glassSlide {
            0% { transform: translateX(-${width}px) skewX(-25deg); }
            50%, 100% { transform: translateX(${width * 1.5}px) skewX(-25deg); }
          }
          .glass-sheen {
            animation: glassSlide ${duration * 1.8}s ease-in-out infinite;
          }
        `,
        markup: `
          <rect x="${pad}" y="${pad}" width="${fWidth}" height="${fHeight}" rx="${rx}" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.8" />
          <rect x="${pad + 3}" y="${pad + 3}" width="${fWidth - 6}" height="${fHeight - 6}" rx="${rx - 2}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          <g clip-path="url(#glassClip)">
            <rect x="0" y="0" width="${width * 0.35}" height="${height}" fill="url(#glassSheenGrad)" class="glass-sheen" opacity="0.6" />
          </g>
        `,
      };
    }

    case 'terminal-crt': {
      return {
        defs: `
          <pattern id="crtScanlines" width="100%" height="4" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="100%" y2="0" stroke="rgba(0,0,0,0.3)" stroke-width="1.5" />
          </pattern>
        `,
        style: `
          @keyframes crtFlicker {
            0%, 100% { opacity: 0.95; }
            50% { opacity: 0.85; }
          }
          .crt-frame { animation: crtFlicker 0.15s infinite; }
        `,
        markup: `
          <rect x="${pad}" y="${pad}" width="${fWidth}" height="${fHeight}" rx="18" fill="none" stroke="#334155" stroke-width="3" />
          <rect x="${pad + 4}" y="${pad + 4}" width="${fWidth - 8}" height="${fHeight - 8}" rx="14" fill="url(#crtScanlines)" class="crt-frame" pointer-events="none" />
          <circle cx="${pad + 12}" cy="${pad + 12}" r="3" fill="#64748b" />
          <circle cx="${width - pad - 12}" cy="${pad + 12}" r="3" fill="#64748b" />
          <circle cx="${pad + 12}" cy="${height - pad - 12}" r="3" fill="#64748b" />
          <circle cx="${width - pad - 12}" cy="${height - pad - 12}" r="3" fill="#64748b" />
        `,
      };
    }

    case 'hologram': {
      return {
        defs: `
          <linearGradient id="holoLaserGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#00f5d4" stop-opacity="0" />
            <stop offset="50%" stop-color="#00f5d4" stop-opacity="0.7" />
            <stop offset="100%" stop-color="#00f5d4" stop-opacity="0" />
          </linearGradient>
        `,
        style: `
          @keyframes holoScan {
            0% { transform: translateY(0); }
            50% { transform: translateY(${height - 10}px); }
            100% { transform: translateY(0); }
          }
          .holo-laser { animation: holoScan ${duration * 1.2}s ease-in-out infinite; }
        `,
        markup: `
          <rect x="${pad}" y="${pad}" width="${fWidth}" height="${fHeight}" rx="8" fill="none" stroke="#00f5d4" stroke-opacity="0.3" stroke-width="1.2" stroke-dasharray="6 4" />
          <line x1="${width / 2 - 15}" y1="${pad}" x2="${width / 2 + 15}" y2="${pad}" stroke="#00f5d4" stroke-width="2" />
          <line x1="${width / 2 - 15}" y1="${height - pad}" x2="${width / 2 + 15}" y2="${height - pad}" stroke="#00f5d4" stroke-width="2" />
          <line x1="${pad}" y1="${height / 2 - 15}" x2="${pad}" y2="${height / 2 + 15}" stroke="#00f5d4" stroke-width="2" />
          <line x1="${width - pad}" y1="${height / 2 - 15}" x2="${width - pad}" y2="${height / 2 + 15}" stroke="#00f5d4" stroke-width="2" />
          <text x="${pad + 12}" y="${pad + 16}" font-family="monospace" font-size="9" fill="#00f5d4" opacity="0.8">SYS.RDY // 60FPS</text>
          <text x="${width - pad - 80}" y="${height - pad - 8}" font-family="monospace" font-size="9" fill="#00f5d4" opacity="0.8">HUD.V4 // LAT</text>
          <line x1="${pad}" y1="0" x2="${width - pad}" y2="0" stroke="url(#holoLaserGrad)" stroke-width="2" class="holo-laser" />
        `,
      };
    }

    case 'gold-metallic': {
      return {
        defs: `
          <linearGradient id="goldFrameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#bf953f" />
            <stop offset="25%" stop-color="#fcf6ba" />
            <stop offset="50%" stop-color="#b38728" />
            <stop offset="75%" stop-color="#fbf5b7" />
            <stop offset="100%" stop-color="#aa771c" />
          </linearGradient>
        `,
        style: `
          @keyframes goldSparkle {
            0%, 100% { opacity: 0.3; transform: scale(0.8) rotate(0deg); }
            50% { opacity: 1; transform: scale(1.4) rotate(45deg); }
          }
          .gold-star-1 { animation: goldSparkle ${duration * 0.9}s ease-in-out infinite 0.2s; transform-origin: ${pad + 18}px ${pad + 18}px; }
          .gold-star-2 { animation: goldSparkle ${duration * 0.9}s ease-in-out infinite 0.7s; transform-origin: ${width - pad - 18}px ${height - pad - 18}px; }
        `,
        markup: `
          <rect x="${pad}" y="${pad}" width="${fWidth}" height="${fHeight}" rx="${rx}" fill="none" stroke="url(#goldFrameGrad)" stroke-width="2.5" />
          <rect x="${pad + 3}" y="${pad + 3}" width="${fWidth - 6}" height="${fHeight - 6}" rx="${rx - 2}" fill="none" stroke="#d4af37" stroke-opacity="0.3" stroke-width="1" />
          <path d="M ${pad + 18} ${pad + 13} L ${pad + 18} ${pad + 23} M ${pad + 13} ${pad + 18} L ${pad + 23} ${pad + 18}" stroke="#fff" stroke-width="1.8" class="gold-star-1" />
          <path d="M ${width - pad - 18} ${height - pad - 23} L ${width - pad - 18} ${height - pad - 13} M ${width - pad - 23} ${height - pad - 18} L ${width - pad - 13} ${height - pad - 18}" stroke="#fff" stroke-width="1.8" class="gold-star-2" />
        `,
      };
    }

    case 'fire-border': {
      return {
        defs: `
          <linearGradient id="fireBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ff1e00" />
            <stop offset="33%" stop-color="#ff8800" />
            <stop offset="66%" stop-color="#ffee00" />
            <stop offset="100%" stop-color="#ff1e00" />
          </linearGradient>
        `,
        style: `
          @keyframes fireEdgePulse {
            0%, 100% { stroke-width: 2; opacity: 0.8; }
            50% { stroke-width: 3.5; opacity: 1; }
          }
          .fire-frame {
            stroke: url(#fireBorderGrad);
            fill: none;
            animation: fireEdgePulse ${duration * 0.6}s ease-in-out infinite;
          }
        `,
        markup: `
          <rect x="${pad}" y="${pad}" width="${fWidth}" height="${fHeight}" rx="${rx}" class="fire-frame" />
        `,
      };
    }

    default:
      return { defs: '', style: '', markup: '' };
  }
}

/**
 * Renders avatar body vector based on CharacterType.
 */
function renderAvatarBody(
  type: CharacterType,
  _primaryColor: string,
  _secondaryColor: string,
  accentColor: string,
  action: CharacterAction
): string {
  // Arm & tool configurations based on active action
  let armsAndTools = '';
  switch (action) {
    case 'build':
      armsAndTools = `
        <line x1="-8" y1="-8" x2="-14" y2="0" stroke="#475569" stroke-width="3" stroke-linecap="round" />
        <g class="char-hammer-arm">
          <line x1="8" y1="-10" x2="20" y2="-4" stroke="#475569" stroke-width="3" stroke-linecap="round" />
          <line x1="18" y1="-6" x2="28" y2="0" stroke="#78350f" stroke-width="2.5" />
          <rect x="25" y="-7" width="7" height="13" rx="1.5" fill="#94a3b8" stroke="#cbd5e1" stroke-width="0.8" />
        </g>
      `;
      break;
    case 'code':
      armsAndTools = `
        <g class="char-typing-arms">
          <line x1="-8" y1="-8" x2="4" y2="-4" stroke="#475569" stroke-width="2.5" stroke-linecap="round" />
          <line x1="8" y1="-8" x2="16" y2="-2" stroke="#475569" stroke-width="2.5" stroke-linecap="round" />
          <circle cx="4" cy="-4" r="2" fill="#fed7aa" />
          <circle cx="16" cy="-2" r="2" fill="#fed7aa" />
        </g>
      `;
      break;
    case 'construct':
      armsAndTools = `
        <line x1="-8" y1="-8" x2="-12" y2="2" stroke="#475569" stroke-width="3" stroke-linecap="round" />
        <g class="char-torch-arm">
          <line x1="8" y1="-10" x2="22" y2="-8" stroke="#475569" stroke-width="3" stroke-linecap="round" />
          <line x1="22" y1="-8" x2="29" y2="-8" stroke="#0ea5e9" stroke-width="2.5" />
          <polygon points="29,-10 33,-8 29,-6" fill="#e0f2fe" />
        </g>
      `;
      break;
    case 'cheer':
      armsAndTools = `
        <g class="char-cheer-arms">
          <line x1="-8" y1="-10" x2="-16" y2="-26" stroke="#475569" stroke-width="3" stroke-linecap="round" />
          <line x1="8" y1="-10" x2="16" y2="-26" stroke="#475569" stroke-width="3" stroke-linecap="round" />
          <circle cx="-16" cy="-27" r="2" fill="#fed7aa" />
          <circle cx="16" cy="-27" r="2" fill="#fed7aa" />
        </g>
      `;
      break;
    case 'walk':
    default:
      armsAndTools = `
        <rect x="-13" y="-12" width="4" height="11" rx="2" fill="#475569" class="char-arm-l" />
        <rect x="9" y="-12" width="4" height="11" rx="2" fill="#475569" class="char-arm-r" />
      `;
      break;
  }

  // Legs for biped characters
  const bipedLegs =
    action === 'walk'
      ? `
        <rect x="-6" y="0" width="4" height="12" rx="2" fill="#1e293b" class="char-leg-l" />
        <rect x="2" y="0" width="4" height="12" rx="2" fill="#1e293b" class="char-leg-r" />
      `
      : `
        <rect x="-6" y="0" width="4" height="12" rx="2" fill="#1e293b" />
        <rect x="2" y="0" width="4" height="12" rx="2" fill="#1e293b" />
      `;

  switch (type) {
    case 'cyber-bot': {
      return `
        <g class="char-bobber">
          <!-- Bot Antenna -->
          <line x1="0" y1="-36" x2="0" y2="-43" stroke="#38bdf8" stroke-width="1.5" />
          <circle cx="0" cy="-44" r="2.5" fill="#f43f5e" class="bot-antenna" />
          <!-- Bot Dome Head -->
          <ellipse cx="0" cy="-27" rx="12" ry="9" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5" />
          <!-- Glowing Visor -->
          <rect x="-8" y="-30" width="16" height="5" rx="2.5" fill="#06b6d4" />
          <circle cx="-3" cy="-27.5" r="1.2" fill="#fff" />
          <circle cx="3" cy="-27.5" r="1.2" fill="#fff" />
          <!-- Chassis Torso -->
          <rect x="-10" y="-18" width="20" height="16" rx="4" fill="#1e293b" stroke="#0ea5e9" stroke-width="1.5" />
          <!-- Reactor Core -->
          <circle cx="0" cy="-10" r="3.5" fill="${accentColor}" class="bot-core" />
          <!-- Arms / Tools -->
          ${armsAndTools}
          <!-- Hover Thruster Flame -->
          <path d="M -5 -2 L 5 -2 L 2 3 L -2 3 Z" fill="#475569" />
          <ellipse cx="0" cy="5" rx="5" ry="3" fill="#38bdf8" class="bot-thruster" />
        </g>
      `;
    }

    case 'builder-crafter': {
      return `
        <g class="char-bobber">
          <!-- Yellow Hardhat -->
          <path d="M -12 -30 C -12 -40 12 -40 12 -30 Z" fill="#eab308" />
          <rect x="-14" y="-30" width="28" height="3" rx="1.5" fill="#ca8a04" />
          <!-- Face -->
          <rect x="-8" y="-27" width="16" height="11" rx="2.5" fill="#fed7aa" />
          <circle cx="-3" cy="-22" r="1.2" fill="#1e293b" />
          <circle cx="3" cy="-22" r="1.2" fill="#1e293b" />
          <!-- High-Vis Vest -->
          <rect x="-10" y="-16" width="20" height="16" rx="3" fill="#f97316" />
          <rect x="-5" y="-16" width="10" height="16" fill="#22c55e" />
          <line x1="-10" y1="-8" x2="10" y2="-8" stroke="#ffffff" stroke-width="1.8" stroke-opacity="0.9" />
          <!-- Toolbelt -->
          <rect x="-11" y="-2" width="22" height="3" rx="1" fill="#78350f" />
          <rect x="-2" y="-3" width="4" height="5" rx="1" fill="#eab308" />
          <!-- Arms & Legs -->
          ${armsAndTools}
          ${bipedLegs}
        </g>
      `;
    }

    case 'ninja-coder': {
      return `
        <g class="char-bobber">
          <!-- Ninja Head & Mask -->
          <circle cx="0" cy="-25" r="9.5" fill="#0f172a" />
          <rect x="-8" y="-32" width="16" height="5" rx="1" fill="#334155" />
          <line x1="-4" y1="-29.5" x2="4" y2="-29.5" stroke="#00f5d4" stroke-width="1.4" />
          <path d="M -8 -25 C -8 -19 8 -19 8 -25 Z" fill="#1e293b" />
          <!-- Cyan Cyber Eyes -->
          <line x1="-5" y1="-26" x2="-2" y2="-26" stroke="#00f5d4" stroke-width="1.5" />
          <line x1="2" y1="-26" x2="5" y2="-26" stroke="#00f5d4" stroke-width="1.5" />
          <!-- Fluttering Headband Ribbon -->
          <path d="M 8 -30 Q 18 -34 26 -27" fill="none" stroke="#ef4444" stroke-width="2.2" stroke-linecap="round" class="ninja-ribbon" />
          <!-- Dark Tunic -->
          <polygon points="0,-16 -10,-14 -7,0 7,0 10,-14" fill="#090d16" stroke="#00f5d4" stroke-width="1" />
          <!-- Arms & Legs -->
          ${armsAndTools}
          ${bipedLegs}
        </g>
      `;
    }

    case 'wizard-mage': {
      return `
        <g class="char-bobber">
          <!-- Wizard Hat -->
          <polygon points="0,-48 -12,-30 12,-30" fill="#4f46e5" stroke="#818cf8" stroke-width="1" />
          <ellipse cx="0" cy="-30" rx="15" ry="3.5" fill="#3730a3" />
          <circle cx="0" cy="-39" r="1.8" fill="#facc15" />
          <!-- Face & Beard -->
          <circle cx="0" cy="-23" r="7.5" fill="#fed7aa" />
          <path d="M -6 -22 Q 0 -8 0 0 Q 0 -8 6 -22 Z" fill="#e2e8f0" />
          <!-- Robe -->
          <path d="M -9 -15 L -14 0 L 14 0 L 9 -15 Z" fill="#312e81" stroke="#c084fc" stroke-width="1" />
          <!-- Crystal Staff -->
          <line x1="12" y1="-6" x2="19" y2="-34" stroke="#78350f" stroke-width="2.2" stroke-linecap="round" />
          <circle cx="20" cy="-36" r="4.5" fill="#a855f7" class="wizard-orb" />
          <circle cx="20" cy="-36" r="7.5" fill="#c084fc" opacity="0.35" class="wizard-orb-glow" />
          <!-- Arms & Legs -->
          ${armsAndTools}
          ${bipedLegs}
        </g>
      `;
    }

    case 'pixel-dev':
    default: {
      return `
        <g class="char-bobber">
          <!-- Headphones Headband -->
          <path d="M -10 -31 C -10 -38 10 -38 10 -31" fill="none" stroke="#38bdf8" stroke-width="2" />
          <rect x="-12" y="-31" width="3" height="8" rx="1.5" fill="#38bdf8" />
          <rect x="9" y="-31" width="3" height="8" rx="1.5" fill="#38bdf8" />
          <!-- Head / Hair -->
          <rect x="-9" y="-33" width="18" height="15" rx="3" fill="#334155" />
          <!-- Face -->
          <rect x="-7" y="-29" width="14" height="9" rx="1.5" fill="#fed7aa" />
          <!-- Cyber Visor / Glasses -->
          <rect x="-6" y="-28" width="12" height="3.5" rx="1" fill="#00f5d4" />
          <!-- Hoodie Body -->
          <rect x="-10" y="-17" width="20" height="17" rx="3" fill="#1e1b4b" stroke="#6366f1" stroke-width="1" />
          <!-- Code symbol on chest < / > -->
          <path d="M -3 -9 L -6 -6 L -3 -3 M 3 -9 L 6 -6 L 3 -3" stroke="#a5b4fc" stroke-width="1.2" fill="none" stroke-linecap="round" />
          <!-- Arms & Legs -->
          ${armsAndTools}
          ${bipedLegs}
        </g>
      `;
    }
  }
}

/**
 * Generates character layer SVG markup, styles, and action animations.
 */
function renderCharacterLayer(
  characterType: CharacterType | undefined,
  characterAction: CharacterAction | undefined,
  width: number,
  height: number,
  primaryColor: string,
  secondaryColor: string,
  accentColor: string,
  duration: number
): { defs: string; style: string; markup: string } {
  if (!characterType || characterType === 'none') {
    return { defs: '', style: '', markup: '' };
  }

  const action = characterAction || 'walk';
  const groundY = height - 36;
  const avatar = renderAvatarBody(characterType, primaryColor, secondaryColor, accentColor, action);

  const style = `
    /* Ground baseline runner */
    .char-ground-line { stroke: ${primaryColor}; opacity: 0.35; stroke-dasharray: 6 5; }

    /* Character Walk Patrol */
    @keyframes charPatrolWalk {
      0% { transform: translateX(60px) scaleX(1); }
      47% { transform: translateX(${width - 90}px) scaleX(1); }
      50% { transform: translateX(${width - 90}px) scaleX(-1); }
      97% { transform: translateX(60px) scaleX(-1); }
      100% { transform: translateX(60px) scaleX(1); }
    }
    @keyframes legWalkLeft {
      0%, 100% { transform: rotate(-24deg); }
      50% { transform: rotate(24deg); }
    }
    @keyframes legWalkRight {
      0%, 100% { transform: rotate(24deg); }
      50% { transform: rotate(-24deg); }
    }
    @keyframes charWalkBob {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
    .char-walk-carrier {
      animation: charPatrolWalk ${duration * 2.8}s ease-in-out infinite;
    }
    .char-leg-l {
      transform-origin: -4px 0px;
      animation: legWalkLeft ${duration * 0.4}s ease-in-out infinite;
    }
    .char-leg-r {
      transform-origin: 4px 0px;
      animation: legWalkRight ${duration * 0.4}s ease-in-out infinite;
    }
    .char-arm-l {
      transform-origin: -12px -12px;
      animation: legWalkRight ${duration * 0.4}s ease-in-out infinite;
    }
    .char-arm-r {
      transform-origin: 10px -12px;
      animation: legWalkLeft ${duration * 0.4}s ease-in-out infinite;
    }
    .char-bobber {
      animation: charWalkBob ${duration * 0.4}s ease-in-out infinite;
    }

    /* Cyber Bot Hover & Glowing Effects */
    @keyframes botThrusterPulse {
      0%, 100% { transform: scale(1) translateY(0); opacity: 0.7; }
      50% { transform: scale(1.3) translateY(2px); opacity: 1; }
    }
    .bot-thruster {
      transform-origin: 0px 5px;
      animation: botThrusterPulse ${duration * 0.25}s ease-in-out infinite;
    }
    @keyframes botAntennaBlink {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; fill: #ef4444; }
    }
    .bot-antenna {
      animation: botAntennaBlink ${duration * 0.3}s infinite;
    }
    @keyframes botCorePulse {
      0%, 100% { opacity: 0.7; transform: scale(0.9); }
      50% { opacity: 1; transform: scale(1.15); }
    }
    .bot-core {
      transform-origin: 0px -10px;
      animation: botCorePulse ${duration * 0.5}s ease-in-out infinite;
    }

    /* Ninja Ribbon Flutter */
    @keyframes ribbonFlutter {
      0%, 100% { transform: rotate(0deg) skewY(0deg); }
      50% { transform: rotate(8deg) skewY(4deg); }
    }
    .ninja-ribbon {
      transform-origin: 8px -30px;
      animation: ribbonFlutter ${duration * 0.3}s ease-in-out infinite;
    }

    /* Wizard Orb Pulsation */
    @keyframes orbPulsate {
      0%, 100% { transform: scale(0.9); opacity: 0.7; }
      50% { transform: scale(1.2); opacity: 1; }
    }
    .wizard-orb {
      transform-origin: 20px -36px;
      animation: orbPulsate ${duration * 0.5}s ease-in-out infinite;
    }
    .wizard-orb-glow {
      transform-origin: 20px -36px;
      animation: orbPulsate ${duration * 0.5}s ease-in-out infinite 0.1s;
    }

    /* Build Action Animations */
    @keyframes hammerStrikeMotion {
      0%, 100% { transform: rotate(-35deg); }
      42% { transform: rotate(45deg); }
      50% { transform: rotate(38deg); }
      68% { transform: rotate(-35deg); }
    }
    .char-hammer-arm {
      transform-origin: 8px -10px;
      animation: hammerStrikeMotion ${duration * 0.6}s ease-in-out infinite;
    }
    @keyframes strikeSparkBurst {
      0%, 38% { opacity: 0; transform: scale(0.2); }
      43% { opacity: 1; transform: scale(1.4); }
      60% { opacity: 0; transform: scale(2.2); }
      100% { opacity: 0; }
    }
    .build-spark {
      transform-origin: ${width - 120}px ${groundY - 20}px;
      animation: strikeSparkBurst ${duration * 0.6}s ease-out infinite;
    }
    @keyframes blockDropSnap {
      0% { transform: translateY(-30px); opacity: 0; }
      35% { transform: translateY(0); opacity: 1; }
      45% { transform: scale(1.08); }
      55% { transform: scale(1); }
      100% { transform: translateY(0); opacity: 1; }
    }
    .build-top-block {
      transform-origin: ${width - 96}px ${groundY - 52}px;
      animation: blockDropSnap ${duration * 1.8}s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
    }
    @keyframes craneSway {
      0%, 100% { transform: rotate(-2deg); }
      50% { transform: rotate(2deg); }
    }
    .crane-cable {
      transform-origin: ${width - 96}px ${groundY - 80}px;
      animation: craneSway ${duration * 1.2}s ease-in-out infinite;
    }

    /* Code Action Animations */
    @keyframes typingHandsMotion {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }
    .char-typing-arms {
      animation: typingHandsMotion ${duration * 0.25}s ease-in-out infinite;
    }
    @keyframes terminalCursorBlink {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }
    .cursor-blink {
      animation: terminalCursorBlink 0.8s infinite;
    }
    @keyframes codeStreamRise {
      0% { transform: translateY(0); opacity: 0; }
      30% { opacity: 0.9; }
      80% { opacity: 0.7; }
      100% { transform: translateY(-24px); opacity: 0; }
    }
    .code-particle-1 { animation: codeStreamRise ${duration * 0.7}s ease-out infinite 0.1s; }
    .code-particle-2 { animation: codeStreamRise ${duration * 0.8}s ease-out infinite 0.4s; }

    /* Construct Action Animations */
    @keyframes weldFlashPulsing {
      0%, 100% { opacity: 0.15; transform: scale(0.6); }
      25%, 30%, 70%, 75% { opacity: 1; transform: scale(1.5); }
    }
    .weld-flash {
      transform-origin: ${width - 98}px ${groundY - 32}px;
      animation: weldFlashPulsing ${duration * 0.4}s ease-in-out infinite;
    }
    @keyframes sparkShower {
      0% { transform: translate(0, 0) scale(1); opacity: 1; }
      100% { transform: translate(14px, 22px) scale(0.1); opacity: 0; }
    }
    .weld-spark-1 { animation: sparkShower ${duration * 0.35}s ease-out infinite 0.05s; }
    .weld-spark-2 { animation: sparkShower ${duration * 0.4}s ease-out infinite 0.2s; }
    .weld-spark-3 { animation: sparkShower ${duration * 0.3}s ease-out infinite 0.15s; }

    /* Cheer Action Animations */
    @keyframes cheerJumpCycle {
      0%, 100% { transform: translateY(0); }
      35% { transform: translateY(-22px) rotate(2deg); }
      50% { transform: translateY(-18px) rotate(-2deg); }
      70% { transform: translateY(0); }
    }
    .char-cheer-carrier {
      animation: cheerJumpCycle ${duration * 0.7}s ease-in-out infinite;
    }
    @keyframes cheerWaveArms {
      0%, 100% { transform: rotate(-10deg); }
      50% { transform: rotate(10deg); }
    }
    .char-cheer-arms {
      transform-origin: 0px -10px;
      animation: cheerWaveArms ${duration * 0.35}s ease-in-out infinite;
    }
    @keyframes confettiFall {
      0% { transform: translateY(-16px) rotate(0deg); opacity: 1; }
      100% { transform: translateY(30px) rotate(360deg); opacity: 0; }
    }
    .confetti-1 { animation: confettiFall ${duration * 0.8}s ease-out infinite 0.1s; }
    .confetti-2 { animation: confettiFall ${duration * 0.9}s ease-out infinite 0.3s; }
    .confetti-3 { animation: confettiFall ${duration * 0.7}s ease-out infinite 0.5s; }
    .confetti-4 { animation: confettiFall ${duration * 0.85}s ease-out infinite 0.2s; }
  `;

  // Baseline ground runner markup
  const groundTrack = `
    <line x1="25" y1="${groundY + 12}" x2="${width - 25}" y2="${groundY + 12}" class="char-ground-line" />
    <circle cx="25" cy="${groundY + 12}" r="2.5" fill="${secondaryColor}" opacity="0.6" />
    <circle cx="${width - 25}" cy="${groundY + 12}" r="2.5" fill="${secondaryColor}" opacity="0.6" />
  `;

  let actionMarkup = '';
  switch (action) {
    case 'build':
      actionMarkup = `
        <!-- Character at Build Site -->
        <g transform="translate(${width - 170}, ${groundY})">
          ${avatar}
        </g>
        <!-- Building Construction Zone -->
        <g class="construction-site">
          <!-- Scaffolding Cable -->
          <line x1="${width - 96}" y1="${groundY - 80}" x2="${width - 96}" y2="${groundY - 50}" stroke="#94a3b8" stroke-dasharray="3 3" stroke-width="1" class="crane-cable" />
          <polygon points="${width - 100},${groundY - 80} ${width - 92},${groundY - 80} ${width - 96},${groundY - 76}" fill="#f59e0b" />
          <!-- Modular Stacked Tech Blocks -->
          <rect x="${width - 110}" y="${groundY - 14}" width="28" height="14" rx="2" fill="#0284c7" stroke="#38bdf8" stroke-width="1" />
          <text x="${width - 96}" y="${groundY - 4}" font-family="monospace" font-size="7" fill="#e0f2fe" text-anchor="middle">&lt;DATA&gt;</text>
          <rect x="${width - 110}" y="${groundY - 29}" width="28" height="14" rx="2" fill="#6366f1" stroke="#818cf8" stroke-width="1" />
          <text x="${width - 96}" y="${groundY - 19}" font-family="monospace" font-size="7" fill="#ede9fe" text-anchor="middle">API.v2</text>
          <rect x="${width - 110}" y="${groundY - 44}" width="28" height="14" rx="2" fill="#059669" stroke="#34d399" stroke-width="1" />
          <text x="${width - 96}" y="${groundY - 34}" font-family="monospace" font-size="7" fill="#d1fae5" text-anchor="middle">CLOUD</text>
          <!-- Top Descending Block with Golden Halo -->
          <g class="build-top-block">
            <rect x="${width - 110}" y="${groundY - 59}" width="28" height="14" rx="2" fill="#d97706" stroke="#fbbf24" stroke-width="1" />
            <text x="${width - 96}" y="${groundY - 49}" font-family="monospace" font-size="7" fill="#fef3c7" text-anchor="middle">CORE</text>
          </g>
          <!-- Hammer Strike Sparks -->
          <g class="build-spark">
            <circle cx="${width - 120}" cy="${groundY - 20}" r="5" fill="#ffee55" opacity="0.9" />
            <line x1="${width - 120}" y1="${groundY - 20}" x2="${width - 128}" y2="${groundY - 26}" stroke="#ffee55" stroke-width="1.5" />
            <line x1="${width - 120}" y1="${groundY - 20}" x2="${width - 114}" y2="${groundY - 28}" stroke="#ffee55" stroke-width="1.5" />
            <line x1="${width - 120}" y1="${groundY - 20}" x2="${width - 125}" y2="${groundY - 12}" stroke="#ffee55" stroke-width="1.5" />
          </g>
          <!-- Progress Badge -->
          <rect x="${width - 125}" y="${groundY - 76}" width="58" height="13" rx="6.5" fill="#0f172a" stroke="#22c55e" stroke-width="1" />
          <text x="${width - 96}" y="${groundY - 67}" font-family="monospace" font-size="8" fill="#22c55e" font-weight="bold" text-anchor="middle">BUILD: OK</text>
        </g>
      `;
      break;

    case 'code':
      actionMarkup = `
        <!-- Character at Terminal -->
        <g transform="translate(${width - 145}, ${groundY})">
          ${avatar}
        </g>
        <!-- Floating Holographic Workstation HUD -->
        <g class="coding-terminal">
          <rect x="${width - 105}" y="${groundY - 50}" width="50" height="36" rx="4" fill="#020617" fill-opacity="0.88" stroke="#38bdf8" stroke-width="1.2" />
          <circle cx="${width - 100}" cy="${groundY - 44}" r="1.5" fill="#f43f5e" />
          <circle cx="${width - 95}" cy="${groundY - 44}" r="1.5" fill="#eab308" />
          <circle cx="${width - 90}" cy="${groundY - 44}" r="1.5" fill="#22c55e" />
          <line x1="${width - 100}" y1="${groundY - 36}" x2="${width - 72}" y2="${groundY - 36}" stroke="#22c55e" stroke-width="2" />
          <line x1="${width - 100}" y1="${groundY - 28}" x2="${width - 62}" y2="${groundY - 28}" stroke="#38bdf8" stroke-width="2" />
          <line x1="${width - 100}" y1="${groundY - 20}" x2="${width - 80}" y2="${groundY - 20}" stroke="#c084fc" stroke-width="2" />
          <rect x="${width - 78}" y="${groundY - 22}" width="3" height="5" fill="#00f5d4" class="cursor-blink" />
          <circle cx="${width - 85}" cy="${groundY - 54}" r="1.5" fill="#38bdf8" class="code-particle-1" />
          <circle cx="${width - 72}" cy="${groundY - 52}" r="1.5" fill="#00f5d4" class="code-particle-2" />
        </g>
      `;
      break;

    case 'construct':
      actionMarkup = `
        <!-- Character Welding -->
        <g transform="translate(${width - 165}, ${groundY})">
          ${avatar}
        </g>
        <!-- Structural Circuit Truss -->
        <g class="construction-truss">
          <line x1="${width - 98}" y1="${groundY}" x2="${width - 98}" y2="${groundY - 65}" stroke="#475569" stroke-width="2.5" />
          <line x1="${width - 78}" y1="${groundY}" x2="${width - 78}" y2="${groundY - 65}" stroke="#475569" stroke-width="2.5" />
          <line x1="${width - 98}" y1="${groundY - 14}" x2="${width - 78}" y2="${groundY - 32}" stroke="#0ea5e9" stroke-width="1.5" />
          <line x1="${width - 78}" y1="${groundY - 14}" x2="${width - 98}" y2="${groundY - 32}" stroke="#0ea5e9" stroke-width="1.5" />
          <line x1="${width - 98}" y1="${groundY - 32}" x2="${width - 78}" y2="${groundY - 50}" stroke="#0ea5e9" stroke-width="1.5" />
          <!-- Intense Arc Flash -->
          <circle cx="${width - 98}" cy="${groundY - 32}" r="7" fill="#67e8f9" class="weld-flash" />
          <circle cx="${width - 98}" cy="${groundY - 32}" r="2" fill="#ffffff" />
          <!-- Falling Sparks -->
          <circle cx="${width - 96}" cy="${groundY - 30}" r="1.2" fill="#38bdf8" class="weld-spark-1" />
          <circle cx="${width - 94}" cy="${groundY - 28}" r="1.2" fill="#67e8f9" class="weld-spark-2" />
          <circle cx="${width - 92}" cy="${groundY - 26}" r="1" fill="#ffee55" class="weld-spark-3" />
        </g>
      `;
      break;

    case 'cheer':
      actionMarkup = `
        <!-- Jumping Celebrating Character -->
        <g class="char-cheer-carrier" transform="translate(${width - 130}, ${groundY})">
          ${avatar}
        </g>
        <!-- Victory Star / Trophy -->
        <polygon points="${width - 130},${groundY - 48} ${width - 128},${groundY - 44} ${width - 123},${groundY - 44} ${width - 127},${groundY - 41} ${width - 125},${groundY - 37} ${width - 130},${groundY - 40} ${width - 135},${groundY - 37} ${width - 133},${groundY - 41} ${width - 137},${groundY - 44} ${width - 132},${groundY - 44}" fill="#facc15" stroke="#eab308" stroke-width="0.5" />
        <!-- Confetti Flakes -->
        <rect x="${width - 146}" y="${groundY - 30}" width="3" height="3" fill="#38bdf8" class="confetti-1" />
        <rect x="${width - 114}" y="${groundY - 35}" width="3" height="3" fill="#f43f5e" class="confetti-2" />
        <rect x="${width - 138}" y="${groundY - 40}" width="2.5" height="2.5" fill="#22c55e" class="confetti-3" />
        <rect x="${width - 122}" y="${groundY - 42}" width="2.5" height="2.5" fill="#fbbf24" class="confetti-4" />
      `;
      break;

    case 'walk':
    default:
      actionMarkup = `
        <g class="char-walk-carrier" transform="translate(60, ${groundY})">
          ${avatar}
        </g>
      `;
      break;
  }

  const markup = `
    <g class="char-layer">
      ${groundTrack}
      ${actionMarkup}
    </g>
  `;

  return { defs: '', style, markup };
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
    frameEffect,
    characterType,
    characterAction,
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

  const char = renderCharacterLayer(
    characterType,
    characterAction,
    width,
    height,
    primaryColor,
    secondaryColor,
    accentColor,
    duration
  );

  const frame = renderFrameLayer(
    frameEffect,
    width,
    height,
    primaryColor,
    secondaryColor,
    accentColor,
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
    ${char.defs}
    ${frame.defs}
  </defs>
  <style>
    ${globalStyles}
    ${bg.style}
    ${txt.style}
    ${svgFx.style}
    ${threeD.style}
    ${char.style}
    ${frame.style}
  </style>
  <g class="svg-root">
    ${bg.markup}
    ${threeD.markup}
    ${svgFx.markup}
    ${txt.markup}
    ${char.markup}
    ${frame.markup}
  </g>
</svg>`;
}


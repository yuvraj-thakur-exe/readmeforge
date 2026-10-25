import {
  AnimationConfig,
  TextEffect,
  BackgroundEffect,
  FrameEffect,
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
    ${frame.defs}
  </defs>
  <style>
    ${globalStyles}
    ${bg.style}
    ${txt.style}
    ${svgFx.style}
    ${threeD.style}
    ${frame.style}
  </style>
  <g class="svg-root">
    ${bg.markup}
    ${threeD.markup}
    ${svgFx.markup}
    ${txt.markup}
    ${frame.markup}
  </g>
</svg>`;
}


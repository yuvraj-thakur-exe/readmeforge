/**
 * ReadmeForge - Standalone Telemetry SVG Generation Engine
 * Generates standalone, 100% GitHub Camo-compliant animated SVGs.
 * Zero foreignObject, zero external scripts, GPU-accelerated keyframe animations, UI/UX Pro carbon/obsidian styling.
 */

export interface IsocalendarOptions {
  username?: string;
  streak?: number;
  maxStreak?: number;
  commits?: number;
  average?: number;
  highestDay?: number;
}

export interface LanguagesOptions {
  username?: string;
  languages?: Array<{ name: string; color: string; percent: number; bytes: string }>;
  totalBytes?: string;
  uniqueCount?: number;
}

export interface HabitsOptions {
  username?: string;
  hours?: number[];
  indentStyle?: string;
  charsPerLine?: number;
  peakHour?: number;
  mostActiveDay?: string;
  eveningPct?: number;
}

export interface AchievementsOptions {
  username?: string;
  achievements?: Array<{
    rank: 'S' | 'A' | 'B' | 'X';
    title: string;
    description: string;
    category: string;
    accentColor: string;
    progress: number;
  }>;
}

export interface TerminalOptions {
  username?: string;
  repos?: number;
  stars?: number;
  forks?: number;
  commits?: number;
  velocity?: string;
  uptime?: string;
}

export interface PageSpeedOptions {
  url?: string;
  perf?: number;
  a11y?: number;
  best?: number;
  seo?: number;
  fcp?: string;
  lcp?: string;
  cls?: string;
  tbt?: string;
}

export interface MusicOptions {
  track?: string;
  artist?: string;
  album?: string;
  progressPct?: number;
  duration?: string;
}

export interface LeetCodeOptions {
  username?: string;
  solved?: number;
  total?: number;
  easy?: { solved: number; total: number };
  medium?: { solved: number; total: number };
  hard?: { solved: number; total: number };
  ranking?: string;
  contestRating?: number;
}

/**
 * Escapes characters for safe inclusion in SVG XML text nodes.
 */
function esc(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// ==========================================
// 1. ISOCALENDAR 3D COMMIT VOXEL GRID
// ==========================================
export function generateIsocalendarSvg(options: IsocalendarOptions = {}): string {
  const user = esc(options.username || 'octocat');
  const streak = options.streak ?? 42;
  const maxStreak = options.maxStreak ?? 189;
  const commits = options.commits ?? 2847;
  const average = options.average ?? 7.8;
  const highestDay = options.highestDay ?? 36;

  const weeks = 26;
  const daysPerWeek = 7;
  const size = 16;
  const weekSpacing = 17;
  const daySpacing = 10;

  const voxels: string[] = [];
  const basePalette = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];

  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < daysPerWeek; d++) {
      const seed = Math.sin((w + 1) * 0.45) * Math.cos((d + 1) * 0.8) + Math.sin(w * 0.15) * 0.5;
      const normalized = Math.max(0, Math.min(1, (seed + 0.9) / 2.1));
      const level = Math.floor(normalized * 4);
      const heightVal = Math.round(normalized * size * 1.8);

      const color = basePalette[level];
      const isoX = 140 + w * weekSpacing - d * daySpacing;
      const isoY = 160 + w * (weekSpacing * 0.5) + d * (daySpacing * 0.5) - heightVal;

      voxels.push(`
        <g class="voxel" transform="translate(${isoX.toFixed(1)}, ${isoY.toFixed(1)})">
          <polygon points="0,0 8.5,-4.5 17,0 8.5,4.5" fill="${color}" stroke="#0d1117" stroke-width="0.5" />
          <polygon points="0,0 8.5,4.5 8.5,${(4.5 + heightVal).toFixed(1)} 0,${heightVal.toFixed(1)}" fill="${color}" filter="url(#dim-left)" stroke="#0d1117" stroke-width="0.5" />
          <polygon points="8.5,4.5 17,0 17,${heightVal.toFixed(1)} 8.5,${(4.5 + heightVal).toFixed(1)}" fill="${color}" filter="url(#dim-right)" stroke="#0d1117" stroke-width="0.5" />
        </g>
      `);
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 370" width="800" height="370" fill="none">
  <defs>
    <linearGradient id="iso-card-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d1117" />
      <stop offset="100%" stop-color="#161b22" />
    </linearGradient>
    <filter id="dim-left">
      <feComponentTransfer>
        <feFuncR type="linear" slope="0.75" />
        <feFuncG type="linear" slope="0.75" />
        <feFuncB type="linear" slope="0.75" />
      </feComponentTransfer>
    </filter>
    <filter id="dim-right">
      <feComponentTransfer>
        <feFuncR type="linear" slope="0.55" />
        <feFuncG type="linear" slope="0.55" />
        <feFuncB type="linear" slope="0.55" />
      </feComponentTransfer>
    </filter>
  </defs>

  <style>
    .font-base { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
    .pulse-glow { animation: pulseGlow 3s ease-in-out infinite; }
    @keyframes pulseGlow {
      0%, 100% { opacity: 0.85; filter: drop-shadow(0 0 2px #10b981); }
      50% { opacity: 1; filter: drop-shadow(0 0 8px #34d399); }
    }
    .wave-float { animation: waveFloat 6s ease-in-out infinite; }
    @keyframes waveFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; }
    }
  </style>

  <!-- Container Box -->
  <rect x="1" y="1" width="798" height="368" rx="14" fill="url(#iso-card-bg)" stroke="#30363d" stroke-width="1.5" />

  <!-- Card Header -->
  <g transform="translate(28, 36)">
    <circle cx="8" cy="8" r="6" fill="#10b981" class="pulse-glow" />
    <text x="24" y="13" fill="#f0f6fc" font-size="16" font-weight="700" class="font-base">
      Isometric Contribution Landscape
    </text>
    <text x="315" y="13" fill="#8b949e" font-size="13" class="font-mono">
      @${user}
    </text>
    <rect x="700" y="-3" width="72" height="22" rx="6" fill="#21262d" stroke="#30363d" />
    <text x="736" y="12" fill="#58a6ff" font-size="10" font-weight="600" text-anchor="middle" class="font-mono">
      26 WEEKS
    </text>
  </g>

  <!-- Top Telemetry Ribbon -->
  <g transform="translate(28, 70)">
    <rect x="0" y="0" width="138" height="48" rx="8" fill="#161b22" stroke="#21262d" />
    <text x="14" y="20" fill="#8b949e" font-size="10" font-weight="600" class="font-mono">CURRENT STREAK</text>
    <text x="14" y="40" fill="#34d399" font-size="18" font-weight="800" class="font-mono">${streak} <tspan font-size="11" font-weight="500" fill="#8b949e">days 🔥</tspan></text>

    <rect x="148" y="0" width="138" height="48" rx="8" fill="#161b22" stroke="#21262d" />
    <text x="162" y="20" fill="#8b949e" font-size="10" font-weight="600" class="font-mono">BEST STREAK</text>
    <text x="162" y="40" fill="#f0f6fc" font-size="18" font-weight="800" class="font-mono">${maxStreak} <tspan font-size="11" font-weight="500" fill="#8b949e">days</tspan></text>

    <rect x="296" y="0" width="138" height="48" rx="8" fill="#161b22" stroke="#21262d" />
    <text x="310" y="20" fill="#8b949e" font-size="10" font-weight="600" class="font-mono">TOTAL COMMITS</text>
    <text x="310" y="40" fill="#fbbf24" font-size="18" font-weight="800" class="font-mono">${commits.toLocaleString()}</text>

    <rect x="444" y="0" width="144" height="48" rx="8" fill="#161b22" stroke="#21262d" />
    <text x="458" y="20" fill="#8b949e" font-size="10" font-weight="600" class="font-mono">DAILY AVERAGE</text>
    <text x="458" y="40" fill="#f0f6fc" font-size="18" font-weight="800" class="font-mono">~${average} <tspan font-size="11" font-weight="500" fill="#8b949e">/ day</tspan></text>

    <rect x="598" y="0" width="146" height="48" rx="8" fill="#161b22" stroke="#21262d" />
    <text x="612" y="20" fill="#8b949e" font-size="10" font-weight="600" class="font-mono">PEAK DAY</text>
    <text x="612" y="40" fill="#58a6ff" font-size="18" font-weight="800" class="font-mono">${highestDay} <tspan font-size="11" font-weight="500" fill="#8b949e">commits</tspan></text>
  </g>

  <!-- 3D Isometric Voxel Mesh -->
  <g class="wave-float">
    ${voxels.join('')}
  </g>

  <!-- Footer Legend -->
  <g transform="translate(28, 345)">
    <text x="0" y="0" fill="#8b949e" font-size="11" class="font-mono">ReadmeForge Isometric Telemetry</text>
    <g transform="translate(620, -10)">
      <text x="-40" y="9" fill="#8b949e" font-size="10" class="font-mono">Less</text>
      <rect x="0" y="0" width="10" height="10" rx="2" fill="#161b22" stroke="#30363d" />
      <rect x="15" y="0" width="10" height="10" rx="2" fill="#0e4429" />
      <rect x="30" y="0" width="10" height="10" rx="2" fill="#006d32" />
      <rect x="45" y="0" width="10" height="10" rx="2" fill="#26a641" />
      <rect x="60" y="0" width="10" height="10" rx="2" fill="#39d353" />
      <text x="76" y="9" fill="#8b949e" font-size="10" class="font-mono">More</text>
    </g>
  </g>
</svg>`;
}

// ==========================================
// 2. LANGUAGES MULTI-RING DONUT & METRICS
// ==========================================
export function generateLanguagesDonutSvg(options: LanguagesOptions = {}): string {
  const user = esc(options.username || 'octocat');
  const languages = options.languages || [
    { name: 'TypeScript', color: '#3178c6', percent: 42.6, bytes: '2.14 MB' },
    { name: 'Rust', color: '#dea584', percent: 24.8, bytes: '1.25 MB' },
    { name: 'Python', color: '#3572A5', percent: 16.4, bytes: '824 KB' },
    { name: 'Go', color: '#00ADD8', percent: 10.2, bytes: '512 KB' },
    { name: 'Tailwind CSS', color: '#38bdf8', percent: 6.0, bytes: '302 KB' },
  ];
  const totalBytes = options.totalBytes || '5.03 MB';
  const uniqueCount = options.uniqueCount || 28;

  const r = 70;
  const circ = 2 * Math.PI * r;
  let accumulatedAngle = 0;

  const donutRings = languages.map((lang) => {
    const dashLength = (lang.percent / 100) * circ;
    const offset = -accumulatedAngle;
    accumulatedAngle += dashLength;
    return `
      <circle
        cx="145" cy="180" r="${r}"
        fill="transparent"
        stroke="${lang.color}"
        stroke-width="22"
        stroke-dasharray="${dashLength.toFixed(1)} ${circ.toFixed(1)}"
        stroke-dashoffset="${offset.toFixed(1)}"
        class="donut-segment"
      />
    `;
  });

  const langRows = languages.map((lang, index) => {
    const yPos = 80 + index * 48;
    return `
      <g transform="translate(300, ${yPos})">
        <circle cx="6" cy="6" r="5" fill="${lang.color}" />
        <text x="20" y="10" fill="#f0f6fc" font-size="14" font-weight="600" class="font-base">${esc(lang.name)}</text>
        <text x="320" y="10" fill="#8b949e" font-size="12" class="font-mono">${lang.bytes}</text>
        <text x="430" y="10" fill="${lang.color}" font-size="13" font-weight="700" text-anchor="end" class="font-mono">${lang.percent.toFixed(1)}%</text>

        <rect x="20" y="20" width="410" height="6" rx="3" fill="#21262d" />
        <rect x="20" y="20" width="${(lang.percent * 4.1).toFixed(1)}" height="6" rx="3" fill="${lang.color}" />
      </g>
    `;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 360" width="800" height="360" fill="none">
  <defs>
    <linearGradient id="lang-card-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d1117" />
      <stop offset="100%" stop-color="#161b22" />
    </linearGradient>
  </defs>

  <style>
    .font-base { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
    .donut-segment {
      transform-origin: 145px 180px;
      transform: rotate(-90deg);
      transition: stroke-dasharray 0.8s ease;
    }
    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; }
    }
  </style>

  <rect x="1" y="1" width="798" height="358" rx="14" fill="url(#lang-card-bg)" stroke="#30363d" stroke-width="1.5" />

  <g transform="translate(28, 36)">
    <text x="0" y="13" fill="#f0f6fc" font-size="16" font-weight="700" class="font-base">
      Polyglot Language Telemetry
    </text>
    <text x="240" y="13" fill="#8b949e" font-size="13" class="font-mono">
      @${user}
    </text>
    <rect x="670" y="-3" width="102" height="22" rx="6" fill="#21262d" stroke="#30363d" />
    <text x="721" y="12" fill="#58a6ff" font-size="10" font-weight="600" text-anchor="middle" class="font-mono">
      ${uniqueCount} LANGUAGES
    </text>
  </g>

  <g>
    <circle cx="145" cy="180" r="${r}" fill="none" stroke="#161b22" stroke-width="22" />
    ${donutRings.join('')}

    <text x="145" y="172" fill="#f0f6fc" font-size="18" font-weight="800" text-anchor="middle" class="font-mono">
      ${totalBytes}
    </text>
    <text x="145" y="194" fill="#8b949e" font-size="10" font-weight="600" text-anchor="middle" class="font-mono">
      CODE ANALYZED
    </text>
  </g>

  <g>
    ${langRows.join('')}
  </g>

  <g transform="translate(28, 335)">
    <text x="0" y="0" fill="#8b949e" font-size="11" class="font-mono">ReadmeForge • Depth Code Telemetry &amp; Byte Distribution</text>
  </g>
</svg>`;
}

// ==========================================
// 3. CODING HABITS & 24H RADAR CLOCK
// ==========================================
export function generateHabitsRadarSvg(options: HabitsOptions = {}): string {
  const user = esc(options.username || 'octocat');
  const indentStyle = esc(options.indentStyle || '2 Spaces (LF)');
  const charsPerLine = options.charsPerLine ?? 68.4;
  const peakHour = options.peakHour ?? 22;
  const mostActiveDay = esc(options.mostActiveDay || 'Tuesday');
  const eveningPct = options.eveningPct ?? 72;

  const defaultHours = [
    2, 1, 0, 0, 0, 1, 3, 6, 12, 18, 22, 28, 25, 29, 34, 38, 42, 48, 52, 60, 68, 75, 48, 16
  ];
  const hours = options.hours || defaultHours;
  const maxCommitVal = Math.max(...hours, 1);

  const cx = 155;
  const cy = 180;
  const innerR = 42;
  const maxBarLength = 48;

  const radialSlices = hours.map((val, h) => {
    const angleDeg = (h / 24) * 360 - 90;
    const angleRad = (angleDeg * Math.PI) / 180;
    const barLength = (val / maxCommitVal) * maxBarLength;

    const x1 = cx + innerR * Math.cos(angleRad);
    const y1 = cy + innerR * Math.sin(angleRad);
    const x2 = cx + (innerR + barLength) * Math.cos(angleRad);
    const y2 = cy + (innerR + barLength) * Math.sin(angleRad);

    const isPeak = h >= 18 && h <= 23;
    const strokeColor = isPeak ? '#fbbf24' : '#10b981';

    return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${strokeColor}" stroke-width="3" stroke-linecap="round" opacity="0.85" />`;
  });

  const weekdays = [
    { day: 'Mon', count: 184, pct: 75 },
    { day: 'Tue', count: 246, pct: 100 },
    { day: 'Wed', count: 210, pct: 85 },
    { day: 'Thu', count: 195, pct: 79 },
    { day: 'Fri', count: 168, pct: 68 },
    { day: 'Sat', count: 98, pct: 40 },
    { day: 'Sun', count: 112, pct: 45 },
  ];

  const weekdayBars = weekdays.map((item, idx) => {
    const y = 85 + idx * 32;
    return `
      <g transform="translate(320, ${y})">
        <text x="0" y="12" fill="#8b949e" font-size="12" font-weight="600" class="font-mono">${item.day}</text>
        <rect x="40" y="2" width="220" height="12" rx="4" fill="#21262d" />
        <rect x="40" y="2" width="${(item.pct * 2.2).toFixed(1)}" height="12" rx="4" fill="${item.pct === 100 ? '#f59e0b' : '#38bdf8'}" />
        <text x="270" y="12" fill="#f0f6fc" font-size="11" font-weight="700" class="font-mono">${item.count}</text>
      </g>
    `;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 360" width="800" height="360" fill="none">
  <defs>
    <linearGradient id="habits-card-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d1117" />
      <stop offset="100%" stop-color="#161b22" />
    </linearGradient>
  </defs>

  <style>
    .font-base { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
    .radar-sweep {
      transform-origin: 155px 180px;
      animation: radarRotate 8s linear infinite;
    }
    @keyframes radarRotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; }
    }
  </style>

  <rect x="1" y="1" width="798" height="358" rx="14" fill="url(#habits-card-bg)" stroke="#30363d" stroke-width="1.5" />

  <g transform="translate(28, 36)">
    <text x="0" y="13" fill="#f0f6fc" font-size="16" font-weight="700" class="font-base">
      Coding Habits &amp; 24-Hour Rhythm
    </text>
    <text x="280" y="13" fill="#8b949e" font-size="13" class="font-mono">
      @${user}
    </text>
    <rect x="660" y="-3" width="112" height="22" rx="6" fill="#21262d" stroke="#30363d" />
    <text x="716" y="12" fill="#fbbf24" font-size="10" font-weight="600" text-anchor="middle" class="font-mono">
      NIGHT OWL 🦉
    </text>
  </g>

  <g>
    <circle cx="${cx}" cy="${cy}" r="92" stroke="#21262d" stroke-width="1" stroke-dasharray="2 3" />
    <circle cx="${cx}" cy="${cy}" r="68" stroke="#21262d" stroke-width="1" stroke-dasharray="2 3" />
    <circle cx="${cx}" cy="${cy}" r="${innerR}" fill="#161b22" stroke="#30363d" stroke-width="1" />

    <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - 90}" stroke="#f59e0b" stroke-width="1.5" opacity="0.6" class="radar-sweep" />
    ${radialSlices.join('')}

    <text x="${cx}" y="${cy - 4}" fill="#f0f6fc" font-size="13" font-weight="700" text-anchor="middle" class="font-mono">${peakHour}:00</text>
    <text x="${cx}" y="${cy + 10}" fill="#8b949e" font-size="9" text-anchor="middle" class="font-mono">PEAK HOUR</text>
  </g>

  <g>
    ${weekdayBars.join('')}
  </g>

  <g transform="translate(620, 85)">
    <rect x="0" y="0" width="152" height="66" rx="8" fill="#161b22" stroke="#21262d" />
    <text x="12" y="20" fill="#8b949e" font-size="10" font-weight="600" class="font-mono">INDENTATION</text>
    <text x="12" y="44" fill="#34d399" font-size="13" font-weight="700" class="font-mono">${indentStyle}</text>

    <rect x="0" y="78" width="152" height="66" rx="8" fill="#161b22" stroke="#21262d" />
    <text x="12" y="98" fill="#8b949e" font-size="10" font-weight="600" class="font-mono">LINE LENGTH</text>
    <text x="12" y="122" fill="#58a6ff" font-size="13" font-weight="700" class="font-mono">~${charsPerLine} chars</text>

    <rect x="0" y="156" width="152" height="66" rx="8" fill="#161b22" stroke="#21262d" />
    <text x="12" y="176" fill="#8b949e" font-size="10" font-weight="600" class="font-mono">PEAK TIMING</text>
    <text x="12" y="200" fill="#fbbf24" font-size="13" font-weight="700" class="font-mono">${eveningPct}% Evening</text>
  </g>

  <g transform="translate(28, 335)">
    <text x="0" y="0" fill="#8b949e" font-size="11" class="font-mono">ReadmeForge • Most active day: ${mostActiveDay} • Activity Telemetry</text>
  </g>
</svg>`;
}

// ==========================================
// 4. GAMIFIED ACHIEVEMENTS RACK
// ==========================================
export function generateAchievementsRackSvg(options: AchievementsOptions = {}): string {
  const user = esc(options.username || 'octocat');
  const achievements = options.achievements || [
    {
      rank: 'S',
      title: 'Code Titan',
      description: 'Over 1,000+ pull requests merged across open-source repos',
      category: 'COMMUNITY',
      accentColor: '#f59e0b',
      progress: 1.0,
    },
    {
      rank: 'S',
      title: 'Century Streak',
      description: 'Pushed code for 100+ consecutive days without breaks',
      category: 'CONSISTENCY',
      accentColor: '#fbbf24',
      progress: 1.0,
    },
    {
      rank: 'A',
      title: 'Polyglot Master',
      description: 'Shipped production code in 10+ distinct languages',
      category: 'VERSATILITY',
      accentColor: '#10b981',
      progress: 0.85,
    },
    {
      rank: 'A',
      title: 'Lightning Reviewer',
      description: 'Reviewed and approved PRs in less than 30 minutes',
      category: 'COLLABORATION',
      accentColor: '#38bdf8',
      progress: 0.9,
    },
    {
      rank: 'B',
      title: 'Bug Sentry',
      description: 'Identified and fixed 50+ closed security/bug reports',
      category: 'RELIABILITY',
      accentColor: '#a78bfa',
      progress: 0.65,
    },
    {
      rank: 'X',
      title: 'Deep Core Architect',
      description: 'Secret milestone: Architected core framework runtime',
      category: 'SECRET TIER',
      accentColor: '#ec4899',
      progress: 1.0,
    },
  ];

  const badgeCards = achievements.map((ach, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const x = 28 + col * 250;
    const y = 75 + row * 125;

    return `
      <g transform="translate(${x}, ${y})">
        <rect x="0" y="0" width="238" height="112" rx="10" fill="#161b22" stroke="${ach.rank === 'S' || ach.rank === 'X' ? ach.accentColor : '#30363d'}" stroke-width="1.2" />

        <circle cx="34" cy="40" r="22" fill="#0d1117" stroke="${ach.accentColor}" stroke-width="2" />
        <circle cx="34" cy="40" r="17" fill="none" stroke="${ach.accentColor}" stroke-width="1" stroke-dasharray="2 2" />
        <text x="34" y="47" fill="${ach.accentColor}" font-size="18" font-weight="900" text-anchor="middle" class="font-mono">
          ${ach.rank}
        </text>

        <text x="66" y="28" fill="${ach.accentColor}" font-size="9" font-weight="700" letter-spacing="0.5" class="font-mono">
          ${esc(ach.category)}
        </text>
        <text x="66" y="46" fill="#f0f6fc" font-size="13" font-weight="700" class="font-base">
          ${esc(ach.title)}
        </text>

        <text x="14" y="78" fill="#8b949e" font-size="10" class="font-base">
          ${esc(ach.description.slice(0, 36))}...
        </text>

        <rect x="14" y="94" width="210" height="4" rx="2" fill="#21262d" />
        <rect x="14" y="94" width="${(ach.progress * 210).toFixed(1)}" height="4" rx="2" fill="${ach.accentColor}" />
      </g>
    `;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 360" width="800" height="360" fill="none">
  <defs>
    <linearGradient id="ach-card-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d1117" />
      <stop offset="100%" stop-color="#161b22" />
    </linearGradient>
  </defs>

  <style>
    .font-base { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
    .shimmer-gold {
      animation: goldGleam 4s ease-in-out infinite;
    }
    @keyframes goldGleam {
      0%, 100% { filter: drop-shadow(0 0 1px #f59e0b); }
      50% { filter: drop-shadow(0 0 6px #fbbf24); }
    }
    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; }
    }
  </style>

  <rect x="1" y="1" width="798" height="358" rx="14" fill="url(#ach-card-bg)" stroke="#30363d" stroke-width="1.5" />

  <g transform="translate(28, 36)">
    <text x="0" y="13" fill="#f0f6fc" font-size="16" font-weight="700" class="font-base">
      Achievements Showcase &amp; Medals
    </text>
    <text x="270" y="13" fill="#8b949e" font-size="13" class="font-mono">
      @${user}
    </text>
    <rect x="670" y="-3" width="102" height="22" rx="6" fill="#21262d" stroke="#30363d" />
    <text x="721" y="12" fill="#f59e0b" font-size="10" font-weight="700" text-anchor="middle" class="font-mono shimmer-gold">
      RANK S TIER 🏆
    </text>
  </g>

  <g>
    ${badgeCards.join('')}
  </g>

  <g transform="translate(28, 342)">
    <text x="0" y="0" fill="#8b949e" font-size="11" class="font-mono">ReadmeForge • Gamified Repository Milestones &amp; Secret Badges</text>
  </g>
</svg>`;
}

// ==========================================
// 5. CYBER TERMINAL & TELEMETRY HUD
// ==========================================
export function generateTerminalHudSvg(options: TerminalOptions = {}): string {
  const user = esc(options.username || 'octocat');
  const repos = options.repos ?? 84;
  const stars = options.stars ?? 1482;
  const forks = options.forks ?? 320;
  const commits = options.commits ?? 2847;
  const velocity = esc(options.velocity || '94.2 commits / month');
  const uptime = esc(options.uptime || '99.8%');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 360" width="800" height="360" fill="none">
  <defs>
    <linearGradient id="term-bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0a0e14" />
      <stop offset="100%" stop-color="#040608" />
    </linearGradient>
    <pattern id="scanlines" width="100" height="4" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="100" y2="0" stroke="#000000" stroke-width="1.2" opacity="0.3" />
    </pattern>
  </defs>

  <style>
    .font-mono { font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace; }
    .cursor-blink { animation: blink 1s step-end infinite; }
    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; }
    }
  </style>

  <rect x="1" y="1" width="798" height="358" rx="12" fill="url(#term-bg)" stroke="#30363d" stroke-width="1.5" />
  <rect x="1" y="1" width="798" height="38" rx="12" fill="#161b22" />
  <rect x="1" y="26" width="798" height="13" fill="#161b22" />

  <circle cx="24" cy="20" r="6" fill="#f85149" />
  <circle cx="44" cy="20" r="6" fill="#d29922" />
  <circle cx="64" cy="20" r="6" fill="#2ea043" />

  <text x="400" y="24" fill="#8b949e" font-size="12" font-weight="600" text-anchor="middle" class="font-mono">
    readmeforge@${user}: ~ (telemetry-hud)
  </text>

  <rect x="2" y="40" width="796" height="316" fill="url(#scanlines)" pointer-events="none" />

  <g transform="translate(28, 72)" class="font-mono">
    <text x="0" y="0" font-size="13">
      <tspan fill="#34d399">developer@readmeforge</tspan><tspan fill="#8b949e">:</tspan><tspan fill="#58a6ff">~</tspan><tspan fill="#f0f6fc">$ readmeforge telemetry --user ${user} --deep</tspan>
    </text>

    <g transform="translate(0, 24)">
      <text x="0" y="0" fill="#fbbf24" font-size="12">[SYSTEM DIAGNOSTICS &amp; ENGINE STATS]</text>
      <text x="0" y="20" fill="#8b949e" font-size="12">Kernel ........ ReadmeForge Telemetry Engine v3.35.0 (x86_64-linux)</text>
      <text x="0" y="40" fill="#8b949e" font-size="12">Repository .... ${user}/${user}</text>
      <text x="0" y="60" fill="#8b949e" font-size="12">Active Streak . 42 consecutive solar days [STATUS: GREEN]</text>
      <text x="0" y="80" fill="#8b949e" font-size="12">Velocity ...... ${velocity}</text>
      <text x="0" y="100" fill="#8b949e" font-size="12">Service Uptime. ${uptime} (Continuous Deployment)</text>
    </g>

    <g transform="translate(0, 150)">
      <rect x="0" y="0" width="170" height="58" rx="6" fill="#161b22" stroke="#30363d" />
      <text x="14" y="22" fill="#8b949e" font-size="10">TOTAL REPOSITORIES</text>
      <text x="14" y="46" fill="#f0f6fc" font-size="18" font-weight="700">${repos}</text>

      <rect x="185" y="0" width="170" height="58" rx="6" fill="#161b22" stroke="#30363d" />
      <text x="199" y="22" fill="#8b949e" font-size="10">STARS EARNED</text>
      <text x="199" y="46" fill="#f59e0b" font-size="18" font-weight="700">★ ${stars.toLocaleString()}</text>

      <rect x="370" y="0" width="170" height="58" rx="6" fill="#161b22" stroke="#30363d" />
      <text x="384" y="22" fill="#8b949e" font-size="10">FORKS FORGED</text>
      <text x="384" y="46" fill="#58a6ff" font-size="18" font-weight="700">⑂ ${forks.toLocaleString()}</text>

      <rect x="555" y="0" width="185" height="58" rx="6" fill="#161b22" stroke="#30363d" />
      <text x="569" y="22" fill="#8b949e" font-size="10">TOTAL COMMITS</text>
      <text x="569" y="46" fill="#34d399" font-size="18" font-weight="700">${commits.toLocaleString()}</text>
    </g>

    <g transform="translate(0, 240)">
      <text x="0" y="0" font-size="13">
        <tspan fill="#34d399">developer@readmeforge</tspan><tspan fill="#8b949e">:</tspan><tspan fill="#58a6ff">~</tspan><tspan fill="#f0f6fc">$ </tspan>
      </text>
      <rect x="235" y="-12" width="8" height="15" fill="#34d399" class="cursor-blink" />
    </g>
  </g>
</svg>`;
}

// ==========================================
// 6. LIGHTHOUSE PAGESPEED AUDIT GAUGES
// ==========================================
export function generatePageSpeedAuditSvg(options: PageSpeedOptions = {}): string {
  const url = esc(options.url || 'readmeforge.dev');
  const perf = options.perf ?? 100;
  const a11y = options.a11y ?? 100;
  const best = options.best ?? 100;
  const seo = options.seo ?? 100;

  const fcp = esc(options.fcp || '0.6s');
  const lcp = esc(options.lcp || '0.9s');
  const cls = esc(options.cls || '0.00');
  const tbt = esc(options.tbt || '0 ms');

  const gauges = [
    { label: 'Performance', score: perf, color: '#10b981' },
    { label: 'Accessibility', score: a11y, color: '#10b981' },
    { label: 'Best Practices', score: best, color: '#10b981' },
    { label: 'SEO', score: seo, color: '#10b981' },
  ];

  const r = 36;
  const circ = 2 * Math.PI * r;

  const gaugeRender = gauges.map((g, idx) => {
    const x = 70 + idx * 180;
    const dashLength = (g.score / 100) * circ;
    return `
      <g transform="translate(${x}, 130)">
        <circle cx="45" cy="45" r="${r}" stroke="#21262d" stroke-width="8" fill="none" />
        <circle
          cx="45" cy="45" r="${r}"
          stroke="${g.color}"
          stroke-width="8"
          fill="none"
          stroke-dasharray="${dashLength.toFixed(1)} ${circ.toFixed(1)}"
          stroke-linecap="round"
          transform="rotate(-90 45 45)"
        />
        <text x="45" y="52" fill="#f0f6fc" font-size="20" font-weight="800" text-anchor="middle" class="font-mono">${g.score}</text>
        <text x="45" y="105" fill="#8b949e" font-size="12" font-weight="600" text-anchor="middle" class="font-base">${g.label}</text>
      </g>
    `;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 320" width="800" height="320" fill="none">
  <defs>
    <linearGradient id="speed-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d1117" />
      <stop offset="100%" stop-color="#161b22" />
    </linearGradient>
  </defs>

  <style>
    .font-base { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
  </style>

  <rect x="1" y="1" width="798" height="318" rx="14" fill="url(#speed-bg)" stroke="#30363d" stroke-width="1.5" />

  <g transform="translate(28, 36)">
    <text x="0" y="13" fill="#f0f6fc" font-size="16" font-weight="700" class="font-base">
      PageSpeed &amp; Web Vitals Audit
    </text>
    <text x="240" y="13" fill="#8b949e" font-size="13" class="font-mono">
      ${url}
    </text>
    <rect x="670" y="-3" width="102" height="22" rx="6" fill="#0e4429" stroke="#26a641" />
    <text x="721" y="12" fill="#39d353" font-size="10" font-weight="700" text-anchor="middle" class="font-mono">
      ALL GREEN ⚡
    </text>
  </g>

  <g>
    ${gaugeRender.join('')}
  </g>

  <g transform="translate(28, 260)">
    <rect x="0" y="0" width="744" height="36" rx="6" fill="#161b22" stroke="#21262d" />
    <text x="20" y="23" fill="#8b949e" font-size="11" class="font-mono">FCP: <tspan fill="#34d399" font-weight="700">${fcp}</tspan></text>
    <text x="180" y="23" fill="#8b949e" font-size="11" class="font-mono">LCP: <tspan fill="#34d399" font-weight="700">${lcp}</tspan></text>
    <text x="340" y="23" fill="#8b949e" font-size="11" class="font-mono">CLS: <tspan fill="#34d399" font-weight="700">${cls}</tspan></text>
    <text x="500" y="23" fill="#8b949e" font-size="11" class="font-mono">TBT: <tspan fill="#34d399" font-weight="700">${tbt}</tspan></text>
    <text x="660" y="23" fill="#58a6ff" font-size="11" font-weight="700" class="font-mono">PASS ✓</text>
  </g>
</svg>`;
}

// ==========================================
// 7. MUSIC EQUALIZER & NOW PLAYING CARD
// ==========================================
export function generateMusicPlayerSvg(options: MusicOptions = {}): string {
  const track = esc(options.track || 'Cyberpunk Code Symphony');
  const artist = esc(options.artist || 'Lo-Fi Terminal Beats');
  const duration = esc(options.duration || '3:42');

  const eqBars = Array.from({ length: 18 }).map((_, i) => {
    const x = i * 14;
    const animDelay = (i * 0.12).toFixed(2);
    return `
      <rect
        x="${x}" y="0" width="6" height="40" rx="3"
        fill="#34d399"
        class="eq-bar"
        style="animation-delay: -${animDelay}s;"
      />
    `;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 240" width="800" height="240" fill="none">
  <defs>
    <linearGradient id="music-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d1117" />
      <stop offset="100%" stop-color="#161b22" />
    </linearGradient>
  </defs>

  <style>
    .font-base { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
    .disc-spin {
      transform-origin: 100px 120px;
      animation: spin 10s linear infinite;
    }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .eq-bar {
      transform-origin: bottom;
      animation: eqBounce 1.2s ease-in-out infinite alternate;
    }
    @keyframes eqBounce {
      0% { transform: scaleY(0.15); opacity: 0.5; }
      50% { transform: scaleY(0.9); opacity: 1; }
      100% { transform: scaleY(0.3); opacity: 0.7; }
    }
    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; }
    }
  </style>

  <rect x="1" y="1" width="798" height="238" rx="14" fill="url(#music-bg)" stroke="#30363d" stroke-width="1.5" />

  <g class="disc-spin">
    <circle cx="100" cy="120" r="62" fill="#090d12" stroke="#21262d" stroke-width="2" />
    <circle cx="100" cy="120" r="50" fill="none" stroke="#161b22" stroke-width="1" stroke-dasharray="2 3" />
    <circle cx="100" cy="120" r="38" fill="none" stroke="#161b22" stroke-width="1" stroke-dasharray="2 3" />
    <circle cx="100" cy="120" r="24" fill="#10b981" />
    <circle cx="100" cy="120" r="7" fill="#090d12" />
  </g>

  <g transform="translate(190, 72)">
    <text x="0" y="0" fill="#10b981" font-size="11" font-weight="700" letter-spacing="1" class="font-mono">NOW PLAYING • SPOTIFY / LAST.FM</text>
    <text x="0" y="28" fill="#f0f6fc" font-size="20" font-weight="800" class="font-base">${track}</text>
    <text x="0" y="52" fill="#8b949e" font-size="14" class="font-base">${artist}</text>
  </g>

  <g transform="translate(500, 110)">
    ${eqBars.join('')}
  </g>

  <g transform="translate(190, 160)">
    <rect x="0" y="0" width="560" height="4" rx="2" fill="#21262d" />
    <rect x="0" y="0" width="360" height="4" rx="2" fill="#10b981" />
    <text x="0" y="24" fill="#8b949e" font-size="11" class="font-mono">2:18</text>
    <text x="560" y="24" fill="#8b949e" font-size="11" text-anchor="end" class="font-mono">${duration}</text>
  </g>
</svg>`;
}

// ==========================================
// 8. LEETCODE ALGORITHMIC MASTERY DASHBOARD
// ==========================================
export function generateLeetCodeStatsSvg(options: LeetCodeOptions = {}): string {
  const user = esc(options.username || 'octocat');
  const solved = options.solved ?? 742;
  const total = options.total ?? 3100;
  const easy = options.easy || { solved: 280, total: 820 };
  const medium = options.medium || { solved: 360, total: 1720 };
  const hard = options.hard || { solved: 102, total: 730 };
  const ranking = esc(options.ranking || 'Top 1.8%');
  const rating = options.contestRating ?? 2148;

  const r = 50;
  const circ = 2 * Math.PI * r;
  const solvedDash = ((solved / total) * circ).toFixed(1);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 320" width="800" height="320" fill="none">
  <defs>
    <linearGradient id="leet-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d1117" />
      <stop offset="100%" stop-color="#161b22" />
    </linearGradient>
  </defs>

  <style>
    .font-base { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
  </style>

  <rect x="1" y="1" width="798" height="318" rx="14" fill="url(#leet-bg)" stroke="#30363d" stroke-width="1.5" />

  <g transform="translate(28, 36)">
    <text x="0" y="13" fill="#f0f6fc" font-size="16" font-weight="700" class="font-base">
      LeetCode Algorithmic Mastery
    </text>
    <text x="260" y="13" fill="#8b949e" font-size="13" class="font-mono">
      @${user}
    </text>
    <rect x="650" y="-3" width="122" height="22" rx="6" fill="#21262d" stroke="#30363d" />
    <text x="711" y="12" fill="#fbbf24" font-size="10" font-weight="700" text-anchor="middle" class="font-mono">
      GUARDIAN (${rating})
    </text>
  </g>

  <g transform="translate(130, 165)">
    <circle cx="0" cy="0" r="${r}" stroke="#21262d" stroke-width="12" fill="none" />
    <circle
      cx="0" cy="0" r="${r}"
      stroke="#fbbf24"
      stroke-width="12"
      fill="none"
      stroke-dasharray="${solvedDash} ${circ.toFixed(1)}"
      stroke-linecap="round"
      transform="rotate(-90)"
    />
    <text x="0" y="4" fill="#f0f6fc" font-size="22" font-weight="800" text-anchor="middle" class="font-mono">${solved}</text>
    <text x="0" y="24" fill="#8b949e" font-size="10" text-anchor="middle" class="font-mono">SOLVED / ${total}</text>
  </g>

  <g transform="translate(260, 95)">
    <g transform="translate(0, 0)">
      <text x="0" y="14" fill="#34d399" font-size="13" font-weight="700" class="font-mono">Easy</text>
      <text x="360" y="14" fill="#f0f6fc" font-size="13" font-weight="700" text-anchor="end" class="font-mono">${easy.solved} <tspan fill="#8b949e" font-size="11">/ ${easy.total}</tspan></text>
      <rect x="0" y="24" width="360" height="6" rx="3" fill="#21262d" />
      <rect x="0" y="24" width="${((easy.solved / easy.total) * 360).toFixed(1)}" height="6" rx="3" fill="#34d399" />
    </g>

    <g transform="translate(0, 50)">
      <text x="0" y="14" fill="#fbbf24" font-size="13" font-weight="700" class="font-mono">Medium</text>
      <text x="360" y="14" fill="#f0f6fc" font-size="13" font-weight="700" text-anchor="end" class="font-mono">${medium.solved} <tspan fill="#8b949e" font-size="11">/ ${medium.total}</tspan></text>
      <rect x="0" y="24" width="360" height="6" rx="3" fill="#21262d" />
      <rect x="0" y="24" width="${((medium.solved / medium.total) * 360).toFixed(1)}" height="6" rx="3" fill="#fbbf24" />
    </g>

    <g transform="translate(0, 100)">
      <text x="0" y="14" fill="#f87171" font-size="13" font-weight="700" class="font-mono">Hard</text>
      <text x="360" y="14" fill="#f0f6fc" font-size="13" font-weight="700" text-anchor="end" class="font-mono">${hard.solved} <tspan fill="#8b949e" font-size="11">/ ${hard.total}</tspan></text>
      <rect x="0" y="24" width="360" height="6" rx="3" fill="#21262d" />
      <rect x="0" y="24" width="${((hard.solved / hard.total) * 360).toFixed(1)}" height="6" rx="3" fill="#f87171" />
    </g>
  </g>

  <g transform="translate(650, 95)">
    <rect x="0" y="0" width="122" height="135" rx="8" fill="#161b22" stroke="#21262d" />
    <text x="61" y="32" fill="#8b949e" font-size="10" font-weight="600" text-anchor="middle" class="font-mono">GLOBAL RANK</text>
    <text x="61" y="60" fill="#f0f6fc" font-size="16" font-weight="800" text-anchor="middle" class="font-mono">${ranking}</text>

    <line x1="16" y1="78" x2="106" y2="78" stroke="#30363d" />

    <text x="61" y="98" fill="#8b949e" font-size="10" font-weight="600" text-anchor="middle" class="font-mono">CONTEST TIER</text>
    <text x="61" y="120" fill="#fbbf24" font-size="14" font-weight="800" text-anchor="middle" class="font-mono">Guardian</text>
  </g>

  <g transform="translate(28, 295)">
    <text x="0" y="0" fill="#8b949e" font-size="11" class="font-mono">ReadmeForge • Continuous LeetCode Problem Telemetry</text>
  </g>
</svg>`;
}


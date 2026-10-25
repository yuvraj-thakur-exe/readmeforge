export type AnimationPresetId =
  | 'glitch'
  | 'typing'
  | 'wave'
  | 'matrix'
  | 'neon'
  | 'particle'
  | 'terminal'
  | '3d-banner'
  | 'minimal'
  | 'fire'
  | 'water'
  | 'custom';

export type TextEffect =
  | 'typing'
  | 'scramble'
  | 'gradient'
  | 'glitch'
  | 'wave'
  | 'reveal';

export type BackgroundEffect =
  | 'fire'
  | 'water'
  | 'particles'
  | 'grids'
  | 'stars'
  | 'animated-gradient'
  | 'matrix'
  | 'solid';

export type FrameEffect =
  | 'none'
  | 'cyber-neon'
  | 'glassmorphism'
  | 'terminal-crt'
  | 'hologram'
  | 'gold-metallic'
  | 'fire-border';

export type SvgEffect =
  | 'none'
  | 'line-drawing'
  | 'path-morphing'
  | 'animated-logo';

export type ThreeDEffect =
  | 'none'
  | 'rotating-cube'
  | 'interactive-card'
  | 'particle-environment';

export type CharacterType =
  | 'none'
  | 'pixel-dev'
  | 'cyber-bot'
  | 'builder-crafter'
  | 'ninja-coder'
  | 'wizard-mage'
  | 'blue-bot'
  | 'blue-bean'
  | 'ninja-turtle'
  | 'red-dragon'
  | 'purple-monster'
  | 'chibi-deadpool'
  | 'pink-wyvern'
  | 'insectoid-warrior'
  | 'dragonborn-paladin';

export type CharacterAction =
  | 'walk'
  | 'build'
  | 'code'
  | 'construct'
  | 'cheer';

export type FontFamily =
  | 'Fira Code'
  | 'JetBrains Mono'
  | 'Inter'
  | 'Press Start 2P'
  | 'Orbitron'
  | 'system-ui';

export type AnimationDirection = 'normal' | 'reverse' | 'alternate';

export type RepeatMode = 'infinite' | '1' | '2' | '3';

export type TextAlignment = 'left' | 'center' | 'right';

export interface AnimationConfig {
  preset: AnimationPresetId;
  headline: string;
  subtitle: string;
  tag: string;
  fontFamily: FontFamily;
  // Specific Effect Layers
  textEffect: TextEffect;
  backgroundEffect: BackgroundEffect;
  frameEffect?: FrameEffect;
  svgEffect: SvgEffect;
  threeDEffect: ThreeDEffect;
  characterType?: CharacterType;
  characterAction?: CharacterAction;
  // Color Palette
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  transparentBackground: boolean;
  // Layout & Dimensions
  width: number;
  height: number;
  duration: number; // in seconds
  direction: AnimationDirection;
  repeat: RepeatMode;
  alignment: TextAlignment;
  // Accessibility & Compliance
  reducedMotion: boolean; // Accessible prefers-reduced-motion fallback
}

export interface ValidationResult {
  isValid: boolean;
  isGitHubSafe: boolean;
  sizeBytes: number;
  checks: {
    name: string;
    passed: boolean;
    message: string;
  }[];
}

export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  preset: 'neon',
  headline: 'FULL-STACK ARCHITECT',
  subtitle: 'Building Intelligent Developer Tools & Cloud Systems',
  tag: 'OPEN TO COLLABORATION',
  fontFamily: 'Fira Code',
  textEffect: 'gradient',
  backgroundEffect: 'grids',
  frameEffect: 'cyber-neon',
  characterType: 'none',
  characterAction: 'walk',
  svgEffect: 'animated-logo',
  threeDEffect: 'interactive-card',
  primaryColor: '#6366f1',
  secondaryColor: '#38bdf8',
  accentColor: '#c084fc',
  backgroundColor: '#0a0d17',
  textColor: '#ffffff',
  transparentBackground: false,
  width: 900,
  height: 280,
  duration: 3.5,
  direction: 'normal',
  repeat: 'infinite',
  alignment: 'center',
  reducedMotion: false,
};

export interface PresetMetadata {
  id: AnimationPresetId;
  name: string;
  description: string;
  category: 'cyber' | 'retro' | 'typography' | 'modern';
  icon: string;
}

export const PRESET_METADATA: PresetMetadata[] = [
  {
    id: 'fire',
    name: 'Inferno Flame',
    description: 'Blazing dynamic ember particles, glowing heat gradient, and animated fire rim.',
    category: 'cyber',
    icon: 'flame',
  },
  {
    id: 'water',
    name: 'Oceanic Ripple',
    description: 'Fluid undulating water wave layers, caustic aqua ripples, and droplet expanding rings.',
    category: 'modern',
    icon: 'droplets',
  },
  {
    id: 'glitch',
    name: 'Glitch Cyberpunk',
    description: 'Chromatic aberration RGB split with jitter and horizontal displacement slice lines.',
    category: 'cyber',
    icon: 'zap',
  },
  {
    id: 'typing',
    name: 'Terminal Typewriter',
    description: 'Character-stepped typewriter effect with flashing shell cursor.',
    category: 'typography',
    icon: 'terminal',
  },
  {
    id: 'wave',
    name: 'Oscillating Wave',
    description: 'Fluid sinusoidal wave shimmer along text and animated baseline grid.',
    category: 'modern',
    icon: 'activity',
  },
  {
    id: 'matrix',
    name: 'Matrix Digital Rain',
    description: 'Falling green phosphor stream code background with terminal overlay.',
    category: 'retro',
    icon: 'cpu',
  },
  {
    id: 'neon',
    name: 'Neon Forge',
    description: 'High-voltage electric tube glow with chasing border and subtle voltage flicker.',
    category: 'cyber',
    icon: 'sparkles',
  },
  {
    id: 'particle',
    name: 'Particle Embers',
    description: 'Rising luminous energy sparks and ambient glowing orbs.',
    category: 'modern',
    icon: 'flame',
  },
  {
    id: 'terminal',
    name: 'Hacker Shell',
    description: 'Classic command-line interface window with prompt prefix and status badge.',
    category: 'retro',
    icon: 'code',
  },
  {
    id: '3d-banner',
    name: '3D Isometric Banner',
    description: 'Dimensional depth layering with metallic bevel and floating bobbing motion.',
    category: 'modern',
    icon: 'box',
  },
  {
    id: 'minimal',
    name: 'Minimal Modernist',
    description: 'Clean typographic layout with subtle fade-in, refined borders, and airy spacing.',
    category: 'typography',
    icon: 'layers',
  },
];

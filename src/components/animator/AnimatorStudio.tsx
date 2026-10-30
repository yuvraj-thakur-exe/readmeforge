'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Sparkles,
  Download,
  Copy,
  Check,
  ShieldCheck,
  Smartphone,
  Monitor,
  Sun,
  Moon,
  AlertTriangle,
  RotateCcw,
  FileCode,
  Sliders,
  Eye,
  ArrowLeft,
  Upload,
  Layers,
  ChevronDown,
  ExternalLink,
  Share2,
  Accessibility,
  Boxes,
  Compass,
  Code2,
  Film,
  ChevronUp,
  Flame,
  Droplets,
  Zap,
  Terminal,
  Activity,
  Cpu,
  Square,
  Bot,
  Hammer,
  Footprints,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  AnimationConfig,
  AnimationPresetId,
  DEFAULT_ANIMATION_CONFIG,
  PRESET_METADATA,
  FontFamily,
  AnimationDirection,
  RepeatMode,
  TextAlignment,
  TextEffect,
  BackgroundEffect,
  FrameEffect,
  SvgEffect,
  ThreeDEffect,
  CharacterType,
  CharacterAction,
} from '#/lib/animator/types';
import { generateAnimatedSvg } from '#/lib/animator/presets';
import { validateSvg } from '#/lib/animator/validator';
import {
  generateMarkdownSnippet,
  downloadSvgFile,
  downloadAnimationConfigJson,
  decodeConfigFromBase64,
  generateHostedDemoUrl,
} from '#/lib/animator/export-utils';

function renderPresetIcon(iconName: string) {
  switch (iconName) {
    case 'flame':
      return <Flame className="w-4 h-4 text-orange-400" />;
    case 'droplets':
      return <Droplets className="w-4 h-4 text-cyan-400" />;
    case 'zap':
      return <Zap className="w-4 h-4 text-yellow-400" />;
    case 'terminal':
      return <Terminal className="w-4 h-4 text-blue-400" />;
    case 'activity':
      return <Activity className="w-4 h-4 text-indigo-400" />;
    case 'cpu':
      return <Cpu className="w-4 h-4 text-emerald-400" />;
    case 'sparkles':
      return <Sparkles className="w-4 h-4 text-fuchsia-400" />;
    case 'code':
      return <Code2 className="w-4 h-4 text-sky-400" />;
    case 'box':
      return <Boxes className="w-4 h-4 text-amber-400" />;
    case 'layers':
    default:
      return <Layers className="w-4 h-4 text-neutral-400" />;
  }
}

export function AnimatorStudio() {
  const searchParams = useSearchParams();
  const [config, setConfig] = useState<AnimationConfig>(DEFAULT_ANIMATION_CONFIG);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [previewTheme, setPreviewTheme] = useState<'dark' | 'light'>('dark');
  const [isMobileView, setIsMobileView] = useState(false);
  const [simulateError, setSimulateError] = useState(false);
  const [markdownTab, setMarkdownTab] = useState<'relative' | 'githubRaw' | 'dataUri' | 'hostedDemo'>('relative');
  const [activeTab, setActiveTab] = useState<'layers' | 'presets' | 'uiMotion'>('layers');
  const [showEcosystem, setShowEcosystem] = useState(false);
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(50);
  const [showGifModal, setShowGifModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Restore state from hosted demo link `?c=<base64>`
  useEffect(() => {
    const compressed = searchParams.get('c');
    if (compressed) {
      const decoded = decodeConfigFromBase64(compressed);
      if (decoded && decoded.headline) {
        setConfig(prev => ({ ...prev, ...decoded }));
      }
    }
  }, [searchParams]);

  // Real-time generated SVG
  const svgCode = useMemo(() => generateAnimatedSvg(config), [config]);

  // Real-time GitHub Sanitizer validation
  const validation = useMemo(() => validateSvg(svgCode), [svgCode]);

  // Markdown Snippets & Hosted Demo URL
  const snippets = useMemo(() => generateMarkdownSnippet(config), [config]);
  const hostedUrl = useMemo(() => generateHostedDemoUrl(config), [config]);

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
      try {
        confetti({ particleCount: 25, spread: 50, origin: { y: 0.85 } });
      } catch {
        // Ignored
      }
    } catch {
      // Clipboard write failed
    }
  };

  const handlePresetSelect = (preset: AnimationPresetId) => {
    setConfig(prev => {
      switch (preset) {
        case 'fire':
          return {
            ...prev,
            preset,
            textEffect: 'glitch',
            backgroundEffect: 'fire',
            frameEffect: 'fire-border',
            svgEffect: 'animated-logo',
            threeDEffect: 'interactive-card',
            primaryColor: '#ff2a2a',
            secondaryColor: '#ff9900',
            accentColor: '#ffee55',
            backgroundColor: '#0d0404',
          };
        case 'water':
          return {
            ...prev,
            preset,
            textEffect: 'wave',
            backgroundEffect: 'water',
            frameEffect: 'glassmorphism',
            svgEffect: 'line-drawing',
            threeDEffect: 'none',
            primaryColor: '#00b4d8',
            secondaryColor: '#48cae4',
            accentColor: '#90e0ef',
            backgroundColor: '#02121e',
          };
        case 'matrix':
          return {
            ...prev,
            preset,
            textEffect: 'scramble',
            backgroundEffect: 'matrix',
            frameEffect: 'hologram',
            svgEffect: 'none',
            threeDEffect: 'none',
            primaryColor: '#22c55e',
            secondaryColor: '#86efac',
            accentColor: '#4ade80',
            backgroundColor: '#051309',
          };
        case 'glitch':
          return {
            ...prev,
            preset,
            textEffect: 'glitch',
            backgroundEffect: 'grids',
            svgEffect: 'line-drawing',
            threeDEffect: 'interactive-card',
            primaryColor: '#ef4444',
            secondaryColor: '#06b6d4',
            accentColor: '#f43f5e',
            backgroundColor: '#09090b',
          };
        case 'typing':
          return {
            ...prev,
            preset,
            textEffect: 'typing',
            backgroundEffect: 'solid',
            svgEffect: 'none',
            threeDEffect: 'none',
            primaryColor: '#38bdf8',
            secondaryColor: '#94a3b8',
            accentColor: '#10b981',
            backgroundColor: '#0f172a',
          };
        case 'wave':
          return {
            ...prev,
            preset,
            textEffect: 'wave',
            backgroundEffect: 'animated-gradient',
            svgEffect: 'line-drawing',
            threeDEffect: 'none',
            primaryColor: '#818cf8',
            secondaryColor: '#38bdf8',
            accentColor: '#c084fc',
            backgroundColor: '#0a0d17',
          };
        case 'particle':
          return {
            ...prev,
            preset,
            textEffect: 'gradient',
            backgroundEffect: 'particles',
            svgEffect: 'animated-logo',
            threeDEffect: 'particle-environment',
            primaryColor: '#38bdf8',
            secondaryColor: '#c084fc',
            accentColor: '#facc15',
            backgroundColor: '#0a0c16',
          };
        case 'terminal':
          return {
            ...prev,
            preset,
            textEffect: 'typing',
            backgroundEffect: 'solid',
            svgEffect: 'none',
            threeDEffect: 'interactive-card',
            primaryColor: '#38bdf8',
            secondaryColor: '#94a3b8',
            accentColor: '#10b981',
            backgroundColor: '#030712',
          };
        case '3d-banner':
          return {
            ...prev,
            preset,
            textEffect: 'reveal',
            backgroundEffect: 'grids',
            svgEffect: 'path-morphing',
            threeDEffect: 'rotating-cube',
            primaryColor: '#6366f1',
            secondaryColor: '#38bdf8',
            accentColor: '#c084fc',
            backgroundColor: '#0f172a',
          };
        case 'minimal':
          return {
            ...prev,
            preset,
            textEffect: 'reveal',
            backgroundEffect: 'solid',
            svgEffect: 'none',
            threeDEffect: 'none',
            primaryColor: '#94a3b8',
            secondaryColor: '#cbd5e1',
            accentColor: '#e2e8f0',
            backgroundColor: '#0f172a',
          };
        case 'metrics-isocalendar':
          return {
            ...prev,
            preset,
            primaryColor: '#10b981',
            secondaryColor: '#34d399',
            accentColor: '#fbbf24',
            backgroundColor: '#0d1117',
          };
        case 'metrics-languages':
          return {
            ...prev,
            preset,
            primaryColor: '#3178c6',
            secondaryColor: '#dea584',
            accentColor: '#38bdf8',
            backgroundColor: '#0d1117',
          };
        case 'metrics-habits':
          return {
            ...prev,
            preset,
            primaryColor: '#f59e0b',
            secondaryColor: '#34d399',
            accentColor: '#38bdf8',
            backgroundColor: '#0d1117',
          };
        case 'metrics-achievements':
          return {
            ...prev,
            preset,
            primaryColor: '#f59e0b',
            secondaryColor: '#10b981',
            accentColor: '#ec4899',
            backgroundColor: '#0d1117',
          };
        case 'neon':
        default:
          return {
            ...prev,
            preset,
            textEffect: 'gradient',
            backgroundEffect: 'grids',
            svgEffect: 'animated-logo',
            threeDEffect: 'interactive-card',
            primaryColor: '#6366f1',
            secondaryColor: '#38bdf8',
            accentColor: '#c084fc',
            backgroundColor: '#0a0d17',
          };
      }
    });
  };

  const handleLoadConfig = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      try {
        const loaded = JSON.parse(event.target?.result as string);
        if (loaded && loaded.headline) {
          setConfig(prev => ({ ...prev, ...loaded }));
        }
      } catch {
        // Parse error ignored
      }
    };
    reader.readAsText(file);
  };

  const setSizePreset = (w: number, h: number) => {
    setConfig(prev => ({ ...prev, width: w, height: h }));
  };

  return (
    <div className="min-h-screen bg-palette-base text-palette-contrast pb-20">
      {/* Studio Topbar */}
      <div className="sticky top-14 z-30 border-b border-palette-line bg-palette-base/90 backdrop-blur-md px-4 py-3">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-1.5 rounded-lg border border-palette-line hover:border-palette-contrast/40 text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
              <h1 className="font-extrabold text-base tracking-tight">Animation &amp; Motion Studio</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                SVG &bull; 3D &bull; a11y Compliant
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setConfig(DEFAULT_ANIMATION_CONFIG)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-palette-line text-xs font-medium hover:border-neutral-700 bg-palette-soft/50 text-neutral-400 hover:text-white transition-colors"
              title="Reset to default settings"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={() => handleCopy(hostedUrl, 'demoLink')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/20 text-cyan-300 text-xs font-medium hover:bg-cyan-950/40 transition-colors"
              title="Copy shareable hosted demo link"
            >
              {copiedKey === 'demoLink' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Demo</span>
                </>
              )}
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleLoadConfig}
              accept=".json"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-palette-line text-xs font-medium hover:border-neutral-700 bg-palette-soft/50 transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-neutral-400" />
              <span>Load JSON</span>
            </button>
            <button
              type="button"
              onClick={() => downloadAnimationConfigJson(config)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-palette-line text-xs font-medium hover:border-neutral-700 bg-palette-soft/50 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-neutral-400" />
              <span>Save Config</span>
            </button>
            <button
              type="button"
              onClick={() => downloadSvgFile(config)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold text-xs transition-all shadow-md shadow-violet-950/50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download SVG</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Studio Content Grid */}
      <div className="max-w-[1600px] mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Effect Layers & Precise Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Navigation Mode Tabs: Layers vs Presets vs UI Motion */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-palette-soft/40 border border-palette-line text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('layers')}
              className={`flex-1 py-1.5 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'layers'
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Layer Controls</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('presets')}
              className={`flex-1 py-1.5 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'presets'
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Presets Shelf</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('uiMotion')}
              className={`flex-1 py-1.5 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'uiMotion'
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>UI Motion</span>
            </button>
          </div>

          {/* TAB 1: Layer Controls (Text, Background, SVG, 3D Effects) */}
          {activeTab === 'layers' && (
            <div className="p-5 rounded-xl border border-palette-line bg-palette-soft/30 space-y-5">
              {/* Effect Selectors Grid */}
              <div className="space-y-4">
                {/* 1. Text Effects */}
                <div>
                  <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                    Text Effect
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['typing', 'scramble', 'gradient', 'glitch', 'wave', 'reveal'] as TextEffect[]).map(eff => (
                      <button
                        key={eff}
                        type="button"
                        onClick={() => setConfig(prev => ({ ...prev, textEffect: eff }))}
                        className={`py-1.5 px-2 rounded-lg text-[11px] font-mono capitalize border transition-all ${
                          config.textEffect === eff
                            ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300 font-bold'
                            : 'border-palette-line bg-palette-base/60 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {eff}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Background Effects */}
                <div>
                  <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-violet-400" />
                      Background Style
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 capitalize">{config.backgroundEffect.replace('-', ' ')}</span>
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {(['fire', 'water', 'particles', 'grids', 'stars', 'animated-gradient', 'matrix', 'solid'] as BackgroundEffect[]).map(bg => (
                      <button
                        key={bg}
                        type="button"
                        onClick={() => setConfig(prev => ({ ...prev, backgroundEffect: bg }))}
                        className={`py-1.5 px-1.5 rounded-lg text-[10.5px] font-mono capitalize border transition-all flex items-center justify-center gap-1 ${
                          config.backgroundEffect === bg
                            ? bg === 'fire'
                              ? 'border-orange-500 bg-orange-950/40 text-orange-300 font-bold'
                              : bg === 'water'
                              ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300 font-bold'
                              : 'border-violet-500 bg-violet-950/40 text-violet-300 font-bold'
                            : 'border-palette-line bg-palette-base/60 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {bg === 'fire' && <Flame className="w-3 h-3 text-orange-400 shrink-0" />}
                        {bg === 'water' && <Droplets className="w-3 h-3 text-cyan-400 shrink-0" />}
                        <span className="truncate">{bg.replace('-', ' ')}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Frame & Cyber Border Effect */}
                <div>
                  <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Square className="w-3.5 h-3.5 text-cyan-400" />
                      Frame &amp; Border Effect
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 capitalize">{(config.frameEffect || 'cyber-neon').replace('-', ' ')}</span>
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {(['none', 'cyber-neon', 'glassmorphism', 'terminal-crt', 'hologram', 'gold-metallic', 'fire-border'] as FrameEffect[]).map(fe => (
                      <button
                        key={fe}
                        type="button"
                        onClick={() => setConfig(prev => ({ ...prev, frameEffect: fe }))}
                        className={`py-1.5 px-1 rounded-lg text-[10px] font-mono capitalize border transition-all truncate text-center ${
                          (config.frameEffect || 'cyber-neon') === fe
                            ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300 font-bold'
                            : 'border-palette-line bg-palette-base/60 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {fe === 'none' ? 'No Frame' : fe.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. SVG & 3D Overlays */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5 text-fuchsia-400" />
                      SVG Line/Path
                    </label>
                    <select
                      value={config.svgEffect}
                      onChange={e => setConfig(prev => ({ ...prev, svgEffect: e.target.value as SvgEffect }))}
                      className="w-full px-2 py-1.5 text-xs rounded-lg bg-palette-base border border-palette-line text-white"
                    >
                      <option value="none">None</option>
                      <option value="line-drawing">Line Drawing</option>
                      <option value="path-morphing">Path Morphing</option>
                      <option value="animated-logo">Animated Logo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <Boxes className="w-3.5 h-3.5 text-amber-400" />
                      3D Perspective
                    </label>
                    <select
                      value={config.threeDEffect}
                      onChange={e => setConfig(prev => ({ ...prev, threeDEffect: e.target.value as ThreeDEffect }))}
                      className="w-full px-2 py-1.5 text-xs rounded-lg bg-palette-base border border-palette-line text-white"
                    >
                      <option value="none">None</option>
                      <option value="rotating-cube">Rotating Cube</option>
                      <option value="interactive-card">Card Bevel</option>
                      <option value="particle-environment">Warp Tunnel</option>
                    </select>
                  </div>
                </div>

                {/* 4. Animated Characters & Actions */}
                <div className="space-y-2 pt-2 border-t border-palette-line/40">
                  <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Bot className="w-3.5 h-3.5 text-emerald-400" />
                      Vector Character &amp; Action
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 capitalize">
                      {(config.characterType || 'none').replace('-', ' ')} &bull; {config.characterAction || 'walk'}
                    </span>
                  </label>

                  {/* Character Model Selector */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
                    {(['none', 'demon-slayer', 'night-coder', 'pixel-dev', 'cyber-bot', 'builder-crafter', 'ninja-coder', 'wizard-mage'] as CharacterType[]).map(char => (
                      <button
                        key={char}
                        type="button"
                        onClick={() => setConfig(prev => ({ ...prev, characterType: char }))}
                        className={`py-1.5 px-1 rounded-lg text-[10px] font-mono capitalize border transition-all truncate text-center ${
                          (config.characterType || 'none') === char
                            ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 font-bold'
                            : 'border-palette-line bg-palette-base/60 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {char === 'none' ? 'No Avatar' : char.replace('-', ' ')}
                      </button>
                    ))}
                  </div>

                  {/* Action Selector (only when character is not 'none') */}
                  {(config.characterType && config.characterType !== 'none') && (
                    <div className="pt-1.5">
                      <div className="text-[10px] font-medium text-neutral-400 mb-1 flex items-center gap-1">
                        <Footprints className="w-3 h-3 text-cyan-400" />
                        <span>Character Action Animation</span>
                      </div>
                      <div className="grid grid-cols-5 gap-1">
                        {(['walk', 'build', 'code', 'construct', 'cheer'] as CharacterAction[]).map(act => (
                          <button
                            key={act}
                            type="button"
                            onClick={() => setConfig(prev => ({ ...prev, characterAction: act }))}
                            className={`py-1 px-1 rounded-md text-[10px] font-mono capitalize border transition-all text-center flex items-center justify-center gap-1 ${
                              (config.characterAction || 'walk') === act
                                ? 'border-cyan-500 bg-cyan-950/50 text-cyan-300 font-bold'
                                : 'border-palette-line bg-palette-base/60 text-neutral-400 hover:text-white'
                            }`}
                          >
                            {act === 'build' && <Hammer className="w-2.5 h-2.5 text-amber-400" />}
                            {act === 'walk' && <Footprints className="w-2.5 h-2.5 text-cyan-400" />}
                            <span>{act}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Text Fields */}
              <div className="space-y-3 pt-3 border-t border-palette-line/50">
                <div>
                  <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                    Main Headline
                  </label>
                  <input
                    type="text"
                    value={config.headline}
                    onChange={e => setConfig(prev => ({ ...prev, headline: e.target.value }))}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-palette-base border border-palette-line text-white focus:outline-none focus:border-cyan-500/80"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                    Subtitle / Mission
                  </label>
                  <input
                    type="text"
                    value={config.subtitle}
                    onChange={e => setConfig(prev => ({ ...prev, subtitle: e.target.value }))}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-palette-base border border-palette-line text-white focus:outline-none focus:border-cyan-500/80"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                    Tag / Prompt / Role Prefix
                  </label>
                  <input
                    type="text"
                    value={config.tag}
                    onChange={e => setConfig(prev => ({ ...prev, tag: e.target.value }))}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-palette-base border border-palette-line text-white focus:outline-none focus:border-cyan-500/80"
                  />
                </div>
              </div>

              {/* Typography & Dimensions */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-palette-line/50">
                <div>
                  <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                    Font Family
                  </label>
                  <select
                    value={config.fontFamily}
                    onChange={e => setConfig(prev => ({ ...prev, fontFamily: e.target.value as FontFamily }))}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-palette-base border border-palette-line text-white"
                  >
                    <option value="Fira Code">Fira Code</option>
                    <option value="JetBrains Mono">JetBrains Mono</option>
                    <option value="Inter">Inter</option>
                    <option value="Press Start 2P">Press Start 2P</option>
                    <option value="Orbitron">Orbitron</option>
                    <option value="system-ui">System UI</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                    Alignment
                  </label>
                  <div className="grid grid-cols-3 gap-1 bg-palette-base p-1 rounded-lg border border-palette-line text-center text-xs">
                    {(['left', 'center', 'right'] as TextAlignment[]).map(align => (
                      <button
                        key={align}
                        type="button"
                        onClick={() => setConfig(prev => ({ ...prev, alignment: align }))}
                        className={`py-1 rounded capitalize font-medium text-[11px] ${
                          config.alignment === align
                            ? 'bg-violet-600 text-white shadow-sm'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        {align}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamics & Accessibility Controls */}
              <div className="space-y-3 pt-3 border-t border-palette-line/50">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-medium text-neutral-400">Duration / Speed</span>
                  <span className="font-mono text-cyan-400 font-bold">{config.duration.toFixed(1)}s</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="8.0"
                  step="0.1"
                  value={config.duration}
                  onChange={e => setConfig(prev => ({ ...prev, duration: parseFloat(e.target.value) }))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />

                {/* Dimensions Presets */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-medium text-neutral-400">Dimensions ({config.width}×{config.height})</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      { label: 'Ultra (900×280)', w: 900, h: 280 },
                      { label: 'Banner (800×200)', w: 800, h: 200 },
                      { label: 'Compact (600×180)', w: 600, h: 180 },
                    ].map(dp => (
                      <button
                        key={dp.label}
                        type="button"
                        onClick={() => setSizePreset(dp.w, dp.h)}
                        className={`py-1 px-1 rounded text-[10px] font-mono border transition-colors ${
                          config.width === dp.w && config.height === dp.h
                            ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300'
                            : 'border-palette-line/60 bg-palette-base/60 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {dp.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Loop Count & Direction Controls */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="block text-[10px] font-medium text-neutral-400 mb-1">Repeat / Loop</label>
                    <select
                      value={config.repeat}
                      onChange={e => setConfig(prev => ({ ...prev, repeat: e.target.value as RepeatMode }))}
                      className="w-full px-2 py-1 text-[11px] rounded bg-palette-base border border-palette-line text-white font-mono"
                    >
                      <option value="infinite">Infinite (Loop)</option>
                      <option value="1">1 Cycle</option>
                      <option value="2">2 Cycles</option>
                      <option value="3">3 Cycles</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-neutral-400 mb-1">Direction</label>
                    <select
                      value={config.direction}
                      onChange={e => setConfig(prev => ({ ...prev, direction: e.target.value as AnimationDirection }))}
                      className="w-full px-2 py-1 text-[11px] rounded bg-palette-base border border-palette-line text-white font-mono"
                    >
                      <option value="normal">Normal</option>
                      <option value="reverse">Reverse</option>
                      <option value="alternate">Alternate</option>
                    </select>
                  </div>
                </div>

                {/* Accessibility Toggle */}
                <div className="p-3 rounded-lg border border-palette-line/60 bg-palette-base/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Accessibility className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="text-xs font-semibold text-neutral-200 block">
                        Accessibility &bull; Reduced Motion
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        Respects prefers-reduced-motion for motion sensitivity
                      </span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.reducedMotion}
                    onChange={e => setConfig(prev => ({ ...prev, reducedMotion: e.target.checked }))}
                    className="w-4 h-4 rounded text-emerald-500 focus:ring-0 bg-neutral-900 border-neutral-700 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Presets Shelf */}
          {activeTab === 'presets' && (
            <div className="p-4 rounded-xl border border-palette-line bg-palette-soft/40 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-palette-contrast/70 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Select Curated Preset Archetype
              </span>

              <div className="grid grid-cols-3 gap-2">
                {PRESET_METADATA.map(p => {
                  const isSelected = config.preset === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handlePresetSelect(p.id)}
                      className={`p-2.5 rounded-lg text-left transition-all border text-xs flex flex-col justify-between ${
                        isSelected
                          ? 'border-cyan-500/80 bg-cyan-950/30 text-white shadow-sm ring-1 ring-cyan-500/40'
                          : 'border-palette-line/70 bg-palette-soft/20 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                      }`}
                    >
                      <div className="mb-2">{renderPresetIcon(p.icon)}</div>
                      <div className="font-bold tracking-tight text-[11px] truncate w-full text-neutral-200">
                        {p.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: UI Motion Showcase (Springs, Hover, Panels, Parallax) */}
          {activeTab === 'uiMotion' && (
            <div className="p-4 rounded-xl border border-palette-line bg-palette-soft/40 space-y-4 text-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-palette-contrast/80 flex items-center gap-1.5">
                <Boxes className="w-3.5 h-3.5 text-violet-400" />
                UI Motion &amp; Scroll Effects Laboratory
              </span>

              {/* 1. Spring Transition Card */}
              <div className="p-3.5 rounded-lg border border-palette-line/60 bg-palette-base/60 space-y-2">
                <span className="font-semibold text-neutral-200 block text-[11px]">
                  1. Damped Spring Physics &bull; Hover Card
                </span>
                <div className="p-4 rounded-lg bg-gradient-to-r from-violet-950/40 to-cyan-950/40 border border-violet-500/30 hover:scale-[1.02] hover:-translate-y-1 transition-transform duration-300 ease-out cursor-pointer text-center">
                  <span className="font-bold text-white text-xs">Hover Me for Spring Lift</span>
                  <div className="text-[10px] text-cyan-300 font-mono mt-0.5">scale(1.02) translateY(-4px)</div>
                </div>
              </div>

              {/* 2. Specular Shimmer Hover */}
              <div className="p-3.5 rounded-lg border border-palette-line/60 bg-palette-base/60 space-y-2">
                <span className="font-semibold text-neutral-200 block text-[11px]">
                  2. Specular Glare &bull; Magnetic Glow
                </span>
                <button
                  type="button"
                  className="w-full py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] text-white font-bold transition-all text-xs"
                >
                  Glow Button Hover
                </button>
              </div>

              {/* 3. Animated Panels & Collapsible Drawers */}
              <div className="p-3.5 rounded-lg border border-palette-line/60 bg-palette-base/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-neutral-200 block text-[11px]">
                    3. Animated Panels &bull; Spring Expand
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsPanelExpanded(prev => !prev)}
                    className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-mono"
                  >
                    <span>{isPanelExpanded ? 'Collapse' : 'Expand'}</span>
                    {isPanelExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out border rounded-lg ${
                    isPanelExpanded
                      ? 'max-h-40 border-cyan-500/40 bg-cyan-950/20 p-3'
                      : 'max-h-0 border-transparent p-0'
                  }`}
                >
                  <p className="text-[11px] text-neutral-300 leading-relaxed">
                    Zero layout-shift collapsible drawer with spring-interpolated height transitions and dynamic child staggering.
                  </p>
                  <div className="mt-2 flex items-center gap-2 font-mono text-[10px] text-cyan-400">
                    <span className="px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800">grid-template-rows</span>
                    <span className="px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800">spring-damped</span>
                  </div>
                </div>
              </div>

              {/* 4. Drag & Drop Tactile Shelf Preview */}
              <div className="p-3.5 rounded-lg border border-palette-line/60 bg-palette-base/60 space-y-2">
                <span className="font-semibold text-neutral-200 block text-[11px]">
                  4. Reorderable Widget Drag &bull; Drop
                </span>
                <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[10px]">
                  <div className="p-2 rounded bg-neutral-950 border border-neutral-800 text-neutral-400 cursor-grab active:cursor-grabbing hover:border-violet-500 transition-colors">
                    :: 📊 Stats
                  </div>
                  <div className="p-2 rounded bg-neutral-950 border border-neutral-800 text-neutral-400 cursor-grab active:cursor-grabbing hover:border-violet-500 transition-colors">
                    :: 🐍 Snake
                  </div>
                  <div className="p-2 rounded bg-neutral-950 border border-neutral-800 text-neutral-400 cursor-grab active:cursor-grabbing hover:border-violet-500 transition-colors">
                    :: 🏆 Trophy
                  </div>
                </div>
              </div>

              {/* 5. Scroll Effects Laboratory */}
              <div className="p-3.5 rounded-lg border border-palette-line/60 bg-palette-base/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-neutral-200 block text-[11px]">
                    5. Scroll Effects (Reveal &bull; Parallax &bull; Pinned &bull; Sequence)
                  </span>
                  <span className="font-mono text-cyan-400 text-[10px]">{scrollProgress}% Scrolled</span>
                </div>

                {/* Simulated Scroll Scrub Control */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={scrollProgress}
                  onChange={e => setScrollProgress(parseInt(e.target.value, 10))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />

                {/* Interactive Simulated Scroll Canvas */}
                <div className="relative h-28 rounded-lg bg-neutral-950 border border-neutral-800 overflow-hidden p-2 text-[10px]">
                  {/* Sticky / Pinned Section Anchor */}
                  <div className="sticky top-0 z-10 px-2 py-1 bg-violet-950/80 backdrop-blur border border-violet-500/40 rounded flex items-center justify-between">
                    <span className="font-bold text-violet-200">Pinned Section Anchor</span>
                    <span className="font-mono text-[9px] text-violet-300">sticky-top</span>
                  </div>

                  {/* Parallax Background Grid (moves slowly: -0.2x) */}
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      transform: `translateY(-${(scrollProgress * 0.2).toFixed(1)}px)`,
                      backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
                      backgroundSize: '12px 12px',
                    }}
                  />

                  {/* Scroll Reveal Card (fades in as progress > 30%) */}
                  <div
                    className="mt-3 p-2 rounded border border-neutral-700 bg-neutral-900/90 transition-all duration-150"
                    style={{
                      opacity: Math.min(1, Math.max(0.1, scrollProgress / 60)),
                      transform: `translateY(${Math.max(0, 20 - scrollProgress * 0.3)}px)`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-300 font-bold">Scroll-Reveal Element</span>
                      <span className="font-mono text-neutral-400 text-[9px]">
                        opacity: {(Math.min(1, Math.max(0.1, scrollProgress / 60))).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Scroll-Linked Progress Bar Sequence */}
                  <div className="mt-2 w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-500 transition-all duration-75"
                      style={{ width: `${scrollProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Compatibility Preview & Reliability Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Live Preview Container with Simulation Toolbar */}
          <div className="rounded-xl border border-palette-line bg-palette-soft/40 overflow-hidden shadow-2xl">
            {/* Simulation Header */}
            <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-neutral-900/90 border-b border-palette-line text-xs">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-white">Live Compatibility Preview</span>
                <span className="font-mono text-[10px] text-neutral-400">
                  ({config.width}×{config.height})
                </span>
              </div>

              {/* Simulation Controls */}
              <div className="flex items-center gap-2">
                {/* Dark / Light GitHub Simulator */}
                <button
                  type="button"
                  onClick={() => setPreviewTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-neutral-700 bg-neutral-950 text-[11px] font-medium text-neutral-300 hover:text-white transition-colors"
                  title="Toggle GitHub Theme Background"
                >
                  {previewTheme === 'dark' ? <Moon className="w-3 h-3 text-cyan-400" /> : <Sun className="w-3 h-3 text-amber-400" />}
                  <span>{previewTheme === 'dark' ? 'GitHub Dark' : 'GitHub Light'}</span>
                </button>

                {/* Mobile / Desktop Toggle */}
                <button
                  type="button"
                  onClick={() => setIsMobileView(prev => !prev)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md border text-[11px] font-medium transition-colors ${
                    isMobileView
                      ? 'border-cyan-500 bg-cyan-950 text-cyan-300'
                      : 'border-neutral-700 bg-neutral-950 text-neutral-400 hover:text-white'
                  }`}
                  title="Toggle Mobile Viewport Simulation"
                >
                  {isMobileView ? <Smartphone className="w-3 h-3" /> : <Monitor className="w-3 h-3" />}
                  <span>{isMobileView ? 'Mobile (375px)' : 'Desktop'}</span>
                </button>

                {/* Simulate Loading Failure Toggle */}
                <button
                  type="button"
                  onClick={() => setSimulateError(prev => !prev)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md border text-[11px] font-medium transition-colors ${
                    simulateError
                      ? 'border-amber-500 bg-amber-950 text-amber-300'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-500 hover:text-neutral-300'
                  }`}
                  title="Simulate image loading failure or broken link"
                >
                  <AlertTriangle className="w-3 h-3" />
                  <span>{simulateError ? 'Fallback Active' : 'Test Fallback'}</span>
                </button>
              </div>
            </div>

            {/* Preview Stage */}
            <div
              className={`p-6 sm:p-10 flex items-center justify-center transition-colors min-h-[340px] overflow-auto ${
                previewTheme === 'dark' ? 'bg-[#0d1117]' : 'bg-[#ffffff]'
              }`}
            >
              <div
                style={{
                  maxWidth: isMobileView ? '375px' : '100%',
                  width: '100%',
                  transition: 'max-width 0.3s ease',
                }}
                className="flex items-center justify-center"
              >
                {simulateError ? (
                  <div className="w-full p-8 rounded-xl border border-dashed border-amber-500/50 bg-amber-950/20 text-center space-y-2">
                    <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
                    <div className="font-bold text-sm text-amber-200">
                      Fallback Alt Text Simulation
                    </div>
                    <div className="text-xs text-amber-400/80 font-mono">
                      alt="{config.headline}"
                    </div>
                    <p className="text-[11px] text-neutral-400 max-w-[360px] mx-auto">
                      If image rendering fails or client blocks images, GitHub displays the accessible alt tag above.
                    </p>
                  </div>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: svgCode }}
                    className="w-full flex justify-center drop-shadow-xl"
                  />
                )}
              </div>
            </div>
          </div>

          {/* GitHub Sanitizer & Reliability Inspection Card */}
          <div className="p-4 rounded-xl border border-palette-line bg-palette-soft/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-palette-contrast/80 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Reliability Controls &amp; GitHub Sanitizer Verification
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  validation.isGitHubSafe
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-red-950 text-red-300 border border-red-800'
                }`}
              >
                {validation.isGitHubSafe ? '100% GitHub Compliant' : 'Sanitizer Warning'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {validation.checks.map(chk => (
                <div
                  key={chk.name}
                  className="p-2.5 rounded-lg border border-palette-line/60 bg-palette-base/60 flex items-start gap-2"
                >
                  <span className="mt-0.5">
                    {chk.passed ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    )}
                  </span>
                  <div>
                    <div className="font-semibold text-neutral-200 text-[11px]">{chk.name}</div>
                    <div className="text-[10px] text-neutral-400">{chk.message}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Asset Export Suite */}
          <div className="p-5 rounded-xl border border-palette-line bg-palette-soft/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-palette-contrast/80 flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-violet-400" />
                Asset Export &amp; Markdown Snippets
              </span>

              {/* Tab Selector */}
              <div className="flex items-center gap-1 bg-palette-base p-0.5 rounded-lg border border-palette-line text-[11px]">
                <button
                  type="button"
                  onClick={() => setMarkdownTab('relative')}
                  className={`px-2.5 py-1 rounded font-medium ${
                    markdownTab === 'relative'
                      ? 'bg-violet-600 text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Local Asset
                </button>
                <button
                  type="button"
                  onClick={() => setMarkdownTab('githubRaw')}
                  className={`px-2.5 py-1 rounded font-medium ${
                    markdownTab === 'githubRaw'
                      ? 'bg-violet-600 text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  GitHub Raw
                </button>
                <button
                  type="button"
                  onClick={() => setMarkdownTab('dataUri')}
                  className={`px-2.5 py-1 rounded font-medium ${
                    markdownTab === 'dataUri'
                      ? 'bg-violet-600 text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Data URI
                </button>
                <button
                  type="button"
                  onClick={() => setMarkdownTab('hostedDemo')}
                  className={`px-2.5 py-1 rounded font-medium ${
                    markdownTab === 'hostedDemo'
                      ? 'bg-violet-600 text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Hosted Demo
                </button>
              </div>
            </div>

            {/* Code Box */}
            <div className="relative rounded-lg bg-neutral-950 border border-palette-line p-3 font-mono text-xs overflow-x-auto text-neutral-300">
              <pre className="whitespace-pre-wrap break-all max-h-36 overflow-y-auto">
                {markdownTab === 'relative'
                  ? snippets.relative
                  : markdownTab === 'githubRaw'
                  ? snippets.githubRaw
                  : markdownTab === 'dataUri'
                  ? snippets.dataUri
                  : snippets.hostedDemo}
              </pre>

              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    markdownTab === 'relative'
                      ? snippets.relative
                      : markdownTab === 'githubRaw'
                      ? snippets.githubRaw
                      : markdownTab === 'dataUri'
                      ? snippets.dataUri
                      : snippets.hostedDemo,
                    'markdown'
                  )
                }
                className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[11px] flex items-center gap-1 transition-colors"
              >
                {copiedKey === 'markdown' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Export Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleCopy(svgCode, 'svg')}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-palette-line bg-palette-base hover:border-neutral-700 text-xs font-medium text-neutral-200 transition-colors"
              >
                {copiedKey === 'svg' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied SVG</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Raw SVG</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => downloadSvgFile(config)}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-cyan-500/50 bg-cyan-950/20 hover:bg-cyan-950/40 text-cyan-300 text-xs font-medium transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save .svg</span>
              </button>

              <button
                type="button"
                onClick={() => downloadAnimationConfigJson(config)}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-palette-line bg-palette-base hover:border-neutral-700 text-xs font-medium text-neutral-200 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save .json</span>
              </button>

              <button
                type="button"
                onClick={() => setShowGifModal(prev => !prev)}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
                  showGifModal
                    ? 'border-amber-500 bg-amber-950/40 text-amber-300'
                    : 'border-palette-line bg-palette-base hover:border-amber-500/50 text-neutral-200'
                }`}
              >
                <Film className="w-3.5 h-3.5 text-amber-400" />
                <span>GIF / WebP</span>
              </button>
            </div>

            {/* Headless GIF & WebP Export Drawer */}
            {showGifModal && (
              <div className="mt-3 p-3.5 rounded-lg border border-amber-500/40 bg-amber-950/20 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-[11px]">
                    <Film className="w-4 h-4" />
                    <span>Headless GIF &amp; WebP Render Engine</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400/80">PIL + NumPy 24fps</span>
                </div>
                <p className="text-[11px] text-neutral-300">
                  Generate optimized 24-frame looping WebP and GIF animations with cybernetic ember particles and holographic scanline sweeps for GitHub READMEs.
                </p>
                <div className="p-2 rounded bg-neutral-950 border border-neutral-800 font-mono text-[10px] text-cyan-300 flex items-center justify-between">
                  <code>python scripts/animate_hero.py</code>
                  <button
                    type="button"
                    onClick={() => handleCopy('python scripts/animate_hero.py', 'gif-cmd')}
                    className="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[9px]"
                  >
                    {copiedKey === 'gif-cmd' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="text-[10px] text-neutral-400">
                  Outputs: <code className="text-neutral-200">public/assets/hero-animated.gif</code> &bull; <code className="text-neutral-200">public/assets/hero-animated.webp</code>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Cross-Platform Animation & Motion Ecosystem Reference */}
      <div className="max-w-[1600px] mx-auto px-4 mt-8">
        <div className="rounded-xl border border-palette-line bg-palette-soft/30 overflow-hidden">
          <button
            type="button"
            onClick={() => setShowEcosystem(prev => !prev)}
            className="w-full flex items-center justify-between p-4 bg-palette-soft/60 hover:bg-palette-soft transition-colors text-left"
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-cyan-400" />
              <div>
                <span className="font-bold text-xs uppercase tracking-wider text-white">
                  🌐 Cross-Platform Animation &amp; Motion Ecosystem Reference
                </span>
                <span className="text-[11px] text-neutral-400 block sm:inline sm:ml-2">
                  (Libraries &amp; Frameworks for Web, Mobile, Games, Math &amp; Portable Assets)
                </span>
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-neutral-400 transition-transform ${
                showEcosystem ? 'rotate-180' : ''
              }`}
            />
          </button>

          {showEcosystem && (
            <div className="p-4 sm:p-6 space-y-4 border-t border-palette-line text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  {
                    lang: 'JavaScript / TypeScript',
                    libs: 'Motion, GSAP, Anime.js, Three.js, PixiJS',
                    desc: 'Micro-interactions, 3D WebGL scenes, 2D canvas particle graphics.',
                  },
                  {
                    lang: 'HTML / CSS',
                    libs: 'CSS Keyframes, Web Animations API, Animate.css',
                    desc: 'Lightweight zero-dependency transitions, portable SVG animations.',
                  },
                  {
                    lang: 'React / Next.js',
                    libs: 'Motion (Framer), GSAP, shadcn/ui, Aceternity UI, Magic UI',
                    desc: 'Production UI components, glowing borders, smooth layout springs.',
                  },
                  {
                    lang: 'Vue & Svelte',
                    libs: 'Motion, GSAP, Anime.js, Built-in Svelte Transitions',
                    desc: 'Reactive component transitions, route animations, tween stores.',
                  },
                  {
                    lang: 'Python',
                    libs: 'Manim (3Blue1Brown), Pygame, Pillow',
                    desc: 'Programmatic mathematical video animations, 2D game loops, particle renderers.',
                    link: 'https://www.manim.community/',
                  },
                  {
                    lang: 'Flutter / Dart',
                    libs: 'Flutter Animation APIs, Rive Runtime',
                    desc: 'Cross-platform mobile motion, interactive vector state machines.',
                    link: 'https://docs.flutter.dev/ui/animations',
                  },
                  {
                    lang: 'React Native',
                    libs: 'React Native Reanimated, Gesture Handler, Rive',
                    desc: '60+ FPS native thread mobile UI gestures and physics-driven springs.',
                    link: 'https://docs.swmansion.com/react-native-reanimated/',
                  },
                  {
                    lang: 'C# / Unity',
                    libs: 'Unity Animator, DOTween',
                    desc: '3D game character kinematics, procedural UI tweening.',
                  },
                  {
                    lang: 'C++',
                    libs: 'SFML, SDL, Qt Animation Framework',
                    desc: 'Native desktop interfaces, high-performance game rendering loops.',
                  },
                  {
                    lang: 'Java / Kotlin',
                    libs: 'Android Animation APIs, Lottie Runtimes',
                    desc: 'Native Android material transitions, vector JSON animations.',
                  },
                  {
                    lang: 'Swift (iOS / macOS)',
                    libs: 'SwiftUI Animations, Core Animation',
                    desc: 'Fluid spring animations, declarative view transitions, Metal shaders.',
                    link: 'https://developer.apple.com/xcode/swiftui/',
                  },
                  {
                    lang: 'Rust',
                    libs: 'Bevy, macroquad',
                    desc: 'Data-driven ECS game loops, high-performance WebAssembly graphics.',
                    link: 'https://bevy.org/',
                  },
                  {
                    lang: 'SVG / GIF / Video',
                    libs: 'Portable SVG (@keyframes), Animated WebP, Manim MP4/GIF',
                    desc: 'Portable visual outputs for GitHub READMEs, docs, and multi-platform showcases.',
                  },
                ].map(item => (
                  <div
                    key={item.lang}
                    className="p-3 rounded-lg border border-palette-line/60 bg-palette-base/60 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-200 text-xs">{item.lang}</span>
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 text-[10px]"
                        >
                          <span>Docs</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                    <div className="font-mono text-[11px] text-cyan-300/90">{item.libs}</div>
                    <div className="text-[10px] text-neutral-400">{item.desc}</div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-palette-line/40 flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-400">
                <span>
                  📚 <b>Official References:</b>{' '}
                  <a href="https://www.manim.community/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">Manim</a> &bull;{' '}
                  <a href="https://docs.flutter.dev/ui/animations" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">Flutter animations</a> &bull;{' '}
                  <a href="https://docs.swmansion.com/react-native-reanimated/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">React Native Reanimated</a> &bull;{' '}
                  <a href="https://bevy.org/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">Bevy</a> &bull;{' '}
                  <a href="https://developer.apple.com/xcode/swiftui/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">SwiftUI</a>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

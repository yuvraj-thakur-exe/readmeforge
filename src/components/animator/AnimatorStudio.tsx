'use client';

import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
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
} from '#/lib/animator/types';
import { generateAnimatedSvg } from '#/lib/animator/presets';
import { validateSvg } from '#/lib/animator/validator';
import {
  generateMarkdownSnippet,
  downloadSvgFile,
  downloadAnimationConfigJson,
} from '#/lib/animator/export-utils';

export function AnimatorStudio() {
  const [config, setConfig] = useState<AnimationConfig>(DEFAULT_ANIMATION_CONFIG);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [previewTheme, setPreviewTheme] = useState<'dark' | 'light'>('dark');
  const [isMobileView, setIsMobileView] = useState(false);
  const [simulateError, setSimulateError] = useState(false);
  const [markdownTab, setMarkdownTab] = useState<'relative' | 'githubRaw' | 'dataUri'>('relative');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Real-time generated SVG
  const svgCode = useMemo(() => generateAnimatedSvg(config), [config]);

  // Real-time GitHub Sanitizer validation
  const validation = useMemo(() => validateSvg(svgCode), [svgCode]);

  // Markdown Snippets
  const snippets = useMemo(() => generateMarkdownSnippet(config), [config]);

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
    setConfig(prev => ({
      ...prev,
      preset,
      // Adjust palette defaults for distinct theme vibes
      ...(preset === 'matrix'
        ? { primaryColor: '#22c55e', secondaryColor: '#86efac', accentColor: '#4ade80', backgroundColor: '#051309' }
        : preset === 'glitch'
        ? { primaryColor: '#ef4444', secondaryColor: '#06b6d4', accentColor: '#f43f5e', backgroundColor: '#09090b' }
        : preset === 'neon'
        ? { primaryColor: '#6366f1', secondaryColor: '#38bdf8', accentColor: '#c084fc', backgroundColor: '#0a0d17' }
        : preset === 'minimal'
        ? { primaryColor: '#94a3b8', secondaryColor: '#cbd5e1', accentColor: '#e2e8f0', backgroundColor: '#0f172a' }
        : {}),
    }));
  };

  const handleLoadConfig = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      try {
        const loaded = JSON.parse(event.target?.result as string);
        if (loaded && loaded.preset && loaded.headline) {
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
              <h1 className="font-extrabold text-base tracking-tight">Animation Studio</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                SVG &bull; GitHub Compatible
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
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
        {/* Left Column: Preset Selector & Precise Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Preset Cards Drawer */}
          <div className="p-4 rounded-xl border border-palette-line bg-palette-soft/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-palette-contrast/70 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Animation Presets
              </span>
              <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase">
                {config.preset}
              </span>
            </div>

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
                    <div className="text-base mb-1">{p.icon}</div>
                    <div className="font-bold tracking-tight text-[11px] truncate w-full">
                      {p.name.split(' ')[0]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Precise Controls Panel */}
          <div className="p-5 rounded-xl border border-palette-line bg-palette-soft/30 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-palette-line/60">
              <span className="text-xs font-bold uppercase tracking-wider text-palette-contrast/80 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-violet-400" />
                Precise Controls
              </span>
              <button
                type="button"
                onClick={() => setConfig(DEFAULT_ANIMATION_CONFIG)}
                className="text-[11px] text-neutral-400 hover:text-neutral-200 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* 1. Text Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                  Main Headline
                </label>
                <input
                  type="text"
                  value={config.headline}
                  onChange={e => setConfig(prev => ({ ...prev, headline: e.target.value }))}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-palette-base border border-palette-line text-white focus:outline-none focus:border-cyan-500/80"
                  placeholder="e.g. ⚡ FULL-STACK ARCHITECT"
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
                  placeholder="e.g. Building Intelligent Systems"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                  Tag / Prompt / Role Prefix (Optional)
                </label>
                <input
                  type="text"
                  value={config.tag}
                  onChange={e => setConfig(prev => ({ ...prev, tag: e.target.value }))}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-palette-base border border-palette-line text-white focus:outline-none focus:border-cyan-500/80"
                  placeholder="e.g. OPEN TO COLLABORATION"
                />
              </div>
            </div>

            {/* 2. Typography & Layout */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-palette-line/50">
              <div>
                <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                  Font Family
                </label>
                <select
                  value={config.fontFamily}
                  onChange={e => setConfig(prev => ({ ...prev, fontFamily: e.target.value as FontFamily }))}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-palette-base border border-palette-line text-white focus:outline-none focus:border-cyan-500/80"
                >
                  <option value="Fira Code">Fira Code (Monospace)</option>
                  <option value="JetBrains Mono">JetBrains Mono</option>
                  <option value="Inter">Inter (Modern Sans)</option>
                  <option value="Press Start 2P">Press Start 2P (Retro 8-bit)</option>
                  <option value="Orbitron">Orbitron (Cyberpunk)</option>
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

            {/* 3. Dimensions & Aspect Presets */}
            <div className="space-y-2 pt-2 border-t border-palette-line/50">
              <label className="block text-[11px] font-medium text-neutral-400">
                Dimensions & Aspect Presets
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: 'Banner (900×280)', w: 900, h: 280 },
                  { label: 'Header (800×200)', w: 800, h: 200 },
                  { label: 'Card (600×240)', w: 600, h: 240 },
                  { label: 'Badge (400×120)', w: 400, h: 120 },
                  { label: 'Square (500×500)', w: 500, h: 500 },
                ].map(preset => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setSizePreset(preset.w, preset.h)}
                    className={`px-2 py-1 rounded text-[10px] font-mono border transition-colors ${
                      config.width === preset.w && config.height === preset.h
                        ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300'
                        : 'border-palette-line bg-palette-base text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-[10px] text-neutral-500 font-mono">Width (px)</span>
                  <input
                    type="number"
                    value={config.width}
                    onChange={e => setConfig(prev => ({ ...prev, width: Number(e.target.value) || 100 }))}
                    className="w-full px-2.5 py-1 text-xs rounded-lg bg-palette-base border border-palette-line text-white"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 font-mono">Height (px)</span>
                  <input
                    type="number"
                    value={config.height}
                    onChange={e => setConfig(prev => ({ ...prev, height: Number(e.target.value) || 50 }))}
                    className="w-full px-2.5 py-1 text-xs rounded-lg bg-palette-base border border-palette-line text-white"
                  />
                </div>
              </div>
            </div>

            {/* 4. Colors & Transparency */}
            <div className="space-y-3 pt-2 border-t border-palette-line/50">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-neutral-400">Palette & Theme</span>
                <label className="flex items-center gap-1.5 text-[11px] text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.transparentBackground}
                    onChange={e => setConfig(prev => ({ ...prev, transparentBackground: e.target.checked }))}
                    className="rounded bg-neutral-900 border-neutral-700 text-cyan-500 focus:ring-0"
                  />
                  <span>Transparent BG</span>
                </label>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <span className="text-[10px] text-neutral-400 block mb-1">Primary</span>
                  <div className="flex items-center gap-1.5 p-1 rounded-lg bg-palette-base border border-palette-line">
                    <input
                      type="color"
                      value={config.primaryColor}
                      onChange={e => setConfig(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
                    />
                    <input
                      type="text"
                      value={config.primaryColor}
                      onChange={e => setConfig(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="w-full text-[10px] font-mono bg-transparent text-white uppercase focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-neutral-400 block mb-1">Secondary</span>
                  <div className="flex items-center gap-1.5 p-1 rounded-lg bg-palette-base border border-palette-line">
                    <input
                      type="color"
                      value={config.secondaryColor}
                      onChange={e => setConfig(prev => ({ ...prev, secondaryColor: e.target.value }))}
                      className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
                    />
                    <input
                      type="text"
                      value={config.secondaryColor}
                      onChange={e => setConfig(prev => ({ ...prev, secondaryColor: e.target.value }))}
                      className="w-full text-[10px] font-mono bg-transparent text-white uppercase focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-neutral-400 block mb-1">Accent</span>
                  <div className="flex items-center gap-1.5 p-1 rounded-lg bg-palette-base border border-palette-line">
                    <input
                      type="color"
                      value={config.accentColor}
                      onChange={e => setConfig(prev => ({ ...prev, accentColor: e.target.value }))}
                      className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
                    />
                    <input
                      type="text"
                      value={config.accentColor}
                      onChange={e => setConfig(prev => ({ ...prev, accentColor: e.target.value }))}
                      className="w-full text-[10px] font-mono bg-transparent text-white uppercase focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Animation Dynamics */}
            <div className="space-y-3 pt-2 border-t border-palette-line/50">
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

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-[10px] text-neutral-400 block mb-1">Direction</span>
                  <select
                    value={config.direction}
                    onChange={e => setConfig(prev => ({ ...prev, direction: e.target.value as AnimationDirection }))}
                    className="w-full px-2.5 py-1 text-xs rounded-lg bg-palette-base border border-palette-line text-white"
                  >
                    <option value="normal">Normal</option>
                    <option value="reverse">Reverse</option>
                    <option value="alternate">Alternate (Ping-Pong)</option>
                  </select>
                </div>

                <div>
                  <span className="text-[10px] text-neutral-400 block mb-1">Repeat Mode</span>
                  <select
                    value={config.repeat}
                    onChange={e => setConfig(prev => ({ ...prev, repeat: e.target.value as RepeatMode }))}
                    className="w-full px-2.5 py-1 text-xs rounded-lg bg-palette-base border border-palette-line text-white"
                  >
                    <option value="infinite">Infinite Loop</option>
                    <option value="1">Play Once (1x)</option>
                    <option value="2">Play Twice (2x)</option>
                    <option value="3">Play 3 Times (3x)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
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
                    <p className="text-[11px] text-neutral-400 max-w-sm mx-auto">
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

            <p className="text-[11px] text-neutral-400 pt-1 border-t border-palette-line/40">
              💡 <b>Reliability Invariant:</b> Generated animations rely entirely on native CSS <code>@keyframes</code> embedded inside valid SVG definitions. Zero external scripts, zero trackers, and zero external webfonts ensure zero-downtime rendering on GitHub.
            </p>
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
                  Local / Repo
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
                  Raw GitHub
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
              </div>
            </div>

            {/* Code Box */}
            <div className="relative rounded-lg bg-neutral-950 border border-palette-line p-3 font-mono text-xs overflow-x-auto text-neutral-300">
              <pre className="whitespace-pre-wrap break-all max-h-36 overflow-y-auto">
                {markdownTab === 'relative'
                  ? snippets.relative
                  : markdownTab === 'githubRaw'
                  ? snippets.githubRaw
                  : snippets.dataUri}
              </pre>

              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    markdownTab === 'relative'
                      ? snippets.relative
                      : markdownTab === 'githubRaw'
                      ? snippets.githubRaw
                      : snippets.dataUri,
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
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

              <Link
                href="/developer"
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-palette-line bg-palette-base hover:border-violet-500/50 text-xs font-medium text-neutral-200 transition-colors"
              >
                <span>/developer &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

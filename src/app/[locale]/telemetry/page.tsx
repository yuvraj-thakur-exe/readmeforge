'use client';

import { useState, useMemo } from 'react';
import { TopNav } from '#/components/navigation/TopNav';
import {
  buildTelemetryActionWorkflow,
  buildTelemetryEmbedUrl,
  buildTelemetryMarkdownSnippet,
} from '#/lib/forge-telemetry/builder';
import {
  ForgeTelemetryConfig,
  TelemetryTemplate,
  TelemetryOutputMode,
} from '#/lib/forge-telemetry/types';
import {
  TELEMETRY_PLUGINS_CATALOG,
  TELEMETRY_CATEGORIES,
} from '#/lib/forge-telemetry/catalog';
import {
  BarChart3,
  Calendar,
  Code2,
  Clock,
  Trophy,
  Copy,
  Check,
  ExternalLink,
  Terminal,
  Sparkles,
  Globe,
  Eye,
  CheckCircle2,
  Download,
  FileText as FileTextIcon,
  Music,
  Search,
  Filter,
} from 'lucide-react';
import { toast } from 'sonner';

export default function TelemetryStudioPage() {
  // Primary State
  const [username, setUsername] = useState('octocat');
  const [template, setTemplate] = useState<TelemetryTemplate>('classic');
  const [outputMode, setOutputMode] = useState<TelemetryOutputMode>('direct_svg');
  const [activeTab, setActiveTab] = useState<'preview' | 'markdown' | 'action' | 'url'>('preview');
  const [selectedPluginPreset, setSelectedPluginPreset] = useState<
    'isocalendar' | 'languages' | 'habits' | 'achievements' | 'terminal' | 'pagespeed' | 'music' | 'leetcode' | 'full'
  >('isocalendar');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Dynamic Plugin Configuration Map
  const [enabledPlugins, setEnabledPlugins] = useState<Record<string, boolean>>({
    isocalendar: true,
    languages: true,
    habits: true,
    achievements: true,
    leetcode: false,
    topics: false,
    wakatime: false,
    pagespeed: false,
    music: false,
    terminal: false,
  });

  const [pluginOptions, setPluginOptions] = useState<Record<string, string | number | boolean>>({
    'isocalendar.duration': 'half-year',
    'languages.limit': 8,
    'languages.indepth': false,
    'habits.from': 200,
    'habits.days': 14,
    'habits.facts': true,
    'habits.charts': true,
    'achievements.threshold': 'B',
    'achievements.secrets': false,
    'achievements.display': 'compact',
    'topics.mode': 'starred',
    'topics.limit': 15,
  });

  // Base switches
  const [baseHeader, setBaseHeader] = useState(true);
  const [baseActivity, setBaseActivity] = useState(true);
  const [baseCommunity, setBaseCommunity] = useState(true);
  const [baseRepositories, setBaseRepositories] = useState(true);

  // Filtered plugins catalog
  const filteredPlugins = useMemo(() => {
    return TELEMETRY_PLUGINS_CATALOG.filter(plugin => {
      const matchesCategory = selectedCategory === 'all' || plugin.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plugin.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plugin.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Unified Config Object
  const telemetryConfig: ForgeTelemetryConfig = useMemo(() => {
    return {
      username: username.trim() || 'octocat',
      template,
      outputMode,
      base: {
        header: baseHeader,
        activity: baseActivity,
        community: baseCommunity,
        repositories: baseRepositories,
        metadata: true,
      },
      isocalendar: {
        enabled: enabledPlugins.isocalendar,
        duration: (pluginOptions['isocalendar.duration'] as 'half-year' | 'full-year') || 'half-year',
      },
      languages: {
        enabled: enabledPlugins.languages,
        limit: Number(pluginOptions['languages.limit']) || 8,
        indepth: Boolean(pluginOptions['languages.indepth']),
      },
      habits: {
        enabled: enabledPlugins.habits,
        from: Number(pluginOptions['habits.from']) || 200,
        days: Number(pluginOptions['habits.days']) || 14,
        facts: pluginOptions['habits.facts'] !== false,
        charts: pluginOptions['habits.charts'] !== false,
      },
      achievements: {
        enabled: enabledPlugins.achievements,
        threshold: (pluginOptions['achievements.threshold'] as 'C' | 'B' | 'A' | 'S' | 'X') || 'B',
        secrets: Boolean(pluginOptions['achievements.secrets']),
        display: 'compact',
      },
      leetcode: {
        enabled: enabledPlugins.leetcode,
        user: String(pluginOptions['leetcode.user'] || username.trim() || 'octocat'),
      },
      topics: {
        enabled: enabledPlugins.topics,
        limit: Number(pluginOptions['topics.limit']) || 15,
      },
      wakatime: {
        enabled: enabledPlugins.wakatime,
        days: 7,
      },
    };
  }, [
    username,
    template,
    outputMode,
    baseHeader,
    baseActivity,
    baseCommunity,
    baseRepositories,
    enabledPlugins,
    pluginOptions,
  ]);

  // Derived outputs (100% native, zero external dependencies)
  const embedUrl = useMemo(() => buildTelemetryEmbedUrl(telemetryConfig), [telemetryConfig]);
  const actionWorkflow = useMemo(() => buildTelemetryActionWorkflow(telemetryConfig), [telemetryConfig]);
  const markdownSnippet = useMemo(() => buildTelemetryMarkdownSnippet(telemetryConfig, 'center'), [telemetryConfig]);

  const activeSvgUrl = useMemo(() => {
    if (selectedPluginPreset === 'full') return embedUrl;
    const cleanUser = encodeURIComponent(username.trim() || 'octocat');
    return `/api/telemetry/svg?plugin=${selectedPluginPreset}&user=${cleanUser}`;
  }, [selectedPluginPreset, username, embedUrl]);

  const activeMarkdownSnippet = useMemo(() => {
    if (selectedPluginPreset === 'full') return markdownSnippet;
    const cleanUser = username.trim() || 'octocat';
    return `<!-- MonoForge Standalone Telemetry: ${selectedPluginPreset.toUpperCase()} -->
<p align="center">
  <img src="https://raw.githubusercontent.com/${cleanUser}/${cleanUser}/main/public/assets/telemetry-${selectedPluginPreset}.svg" alt="${cleanUser}'s MonoForge Telemetry" width="100%" />
</p>

<!-- Native dynamic API route: -->
<!-- <img src="https://github.com/yuvraj-thakur-exe/MONOFORGE/api/telemetry/svg?plugin=${selectedPluginPreset}&user=${cleanUser}" alt="${cleanUser}'s MonoForge Telemetry" /> -->`;
  }, [selectedPluginPreset, username, markdownSnippet]);

  const handleCopy = (text: string, key: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadSvg = async () => {
    try {
      const res = await fetch(activeSvgUrl);
      const text = await res.text();
      const blob = new Blob([text], { type: 'image/svg+xml;charset=utf-8' });
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `monoforge-telemetry-${selectedPluginPreset}-${username || 'octocat'}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
      toast.success(`Downloaded telemetry-${selectedPluginPreset}.svg!`);
    } catch {
      toast.error('Failed to download SVG');
    }
  };

  const templates: Array<{ id: TelemetryTemplate; label: string; desc: string }> = [
    { id: 'classic', label: 'Classic', desc: 'Standard balanced card format' },
    { id: 'terminal', label: 'Terminal', desc: 'Sleek CLI command-line aesthetic' },
    { id: 'repository', label: 'Repository', desc: 'Repository-centric statistics' },
    { id: 'markdown', label: 'Markdown', desc: 'Lightweight native tables' },
    { id: 'community', label: 'Community', desc: 'Spotlight on discussions & PRs' },
  ];

  const svgPresets = [
    { id: 'isocalendar' as const, label: '3D Isometric', desc: 'Voxel activity landscape', icon: Calendar, tag: '3D' },
    { id: 'languages' as const, label: 'Languages Donut', desc: 'Multi-ring polyglot breakdown', icon: Code2, tag: 'DONUT' },
    { id: 'habits' as const, label: '24h Habits Radar', desc: 'Activity clock & weekdays', icon: Clock, tag: 'RADAR' },
    { id: 'achievements' as const, label: 'Achievements Rack', desc: 'S-Rank trophy badges', icon: Trophy, tag: 'S-TIER' },
    { id: 'terminal' as const, label: 'Terminal HUD', desc: 'Cyberpunk CRT scanline console', icon: Terminal, tag: 'HUD' },
    { id: 'pagespeed' as const, label: 'PageSpeed Audit', desc: 'Lighthouse 4-pillar web vitals', icon: Sparkles, tag: '100%' },
    { id: 'music' as const, label: 'Music Equalizer', desc: 'Spotify now-playing visualizer', icon: Music, tag: 'AUDIO' },
    { id: 'leetcode' as const, label: 'LeetCode Mastery', desc: 'Problem solving radar gauge', icon: BarChart3, tag: 'ALGO' },
    { id: 'full' as const, label: 'Full Action Suite', desc: 'All-in-one GitHub Action', icon: Globe, tag: 'ACTION' },
  ];

  const togglePlugin = (pluginId: string) => {
    setEnabledPlugins(prev => ({
      ...prev,
      [pluginId]: !prev[pluginId],
    }));
  };

  const updatePluginOption = (key: string, value: string | number | boolean) => {
    setPluginOptions(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleTabSwitch = (tab: 'preview' | 'markdown' | 'action' | 'url') => {
    setActiveTab(tab);
    if (tab === 'action') {
      setOutputMode('action');
    } else {
      setOutputMode('direct_svg');
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 selection:bg-[#ffe600] selection:text-neutral-950">
      <TopNav />

      {/* Main Container */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-100">
                MonoForge Telemetry
              </h1>
              <span className="px-2 py-0.5 text-[11px] font-mono font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                47+ Plugins &bull; 100% Native
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl">
              High-performance GitHub profile infographics &amp; developer telemetry. Live preview, customizable templates, and 1-click GitHub Actions or standalone SVG embeds. Zero external proxies.
            </p>
          </div>

          {/* Quick preset profile buttons */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-500 hidden sm:inline">Try samples:</span>
            {['octocat', 'torvalds', 'developer'].map(handle => (
              <button
                key={handle}
                type="button"
                onClick={() => setUsername(handle)}
                className={`px-2.5 py-1 rounded-md border text-xs font-mono transition-colors ${
                  username === handle
                    ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                    : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                }`}
              >
                @{handle}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Responsive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* LEFT: Configuration Engine & Plugin Drawer (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* User Target Card */}
            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-300">
                <span>Target GitHub Account</span>
                <span className="text-[11px] font-mono text-emerald-400/90 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Self-Hosted Engine
                </span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  data-testid="github-username-input"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Enter GitHub handle (e.g. torvalds)"
                  className="w-full pl-3 pr-24 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-sm font-mono text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-amber-500/60 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setUsername('octocat')}
                  className="absolute right-2 top-1.5 px-2 py-1 text-[11px] rounded bg-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Template Selector Cards */}
            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 space-y-2.5">
              <label className="block text-xs font-semibold text-neutral-300">
                Visual Template Theme
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {templates.map(tpl => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => setTemplate(tpl.id)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      template === tpl.id
                        ? 'border-amber-500/80 bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/30'
                        : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                    }`}
                  >
                    <div className="font-semibold text-xs text-neutral-200">{tpl.label}</div>
                    <div className="text-[10px] text-neutral-500 mt-0.5 line-clamp-1">{tpl.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Core GitHub Base Sections */}
            <div className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/50 space-y-2">
              <span className="text-xs font-semibold text-neutral-300">
                Core Base Sections
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: 'Header', val: baseHeader, set: setBaseHeader },
                  { label: 'Activity', val: baseActivity, set: setBaseActivity },
                  { label: 'Community', val: baseCommunity, set: setBaseCommunity },
                  { label: 'Repositories', val: baseRepositories, set: setBaseRepositories },
                ].map(b => (
                  <button
                    key={b.label}
                    type="button"
                    onClick={() => b.set(!b.val)}
                    className={`px-2 py-1.5 rounded-md border text-[11px] font-mono transition-colors text-center ${
                      b.val
                        ? 'border-amber-500/60 bg-amber-500/15 text-amber-300'
                        : 'border-neutral-800 bg-neutral-950 text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    {b.val ? '✓ ' : '✕ '} {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Plugin Search & Category Filter Drawer */}
            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-300">
                <span className="flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-amber-400" />
                  Plugins &amp; Telemetry Modules ({TELEMETRY_PLUGINS_CATALOG.length})
                </span>
                <span className="text-[10px] text-neutral-500 font-mono">
                  {Object.values(enabledPlugins).filter(Boolean).length} Active
                </span>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search 47+ plugins (e.g. languages, radar, leetcode)..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-amber-500/60"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                {TELEMETRY_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex-shrink-0 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-amber-400 text-neutral-950'
                        : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Scrollable Plugin Cards List */}
              <div className="space-y-2 max-h-[440px] overflow-y-auto pr-1 scrollbar-thin">
                {filteredPlugins.map(plugin => {
                  const isEnabled = Boolean(enabledPlugins[plugin.id]);
                  return (
                    <div
                      key={plugin.id}
                      className={`p-3 rounded-lg border transition-all ${
                        isEnabled
                          ? 'border-amber-500/40 bg-neutral-950/80 ring-1 ring-amber-500/20'
                          : 'border-neutral-800/80 bg-neutral-950/40 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isEnabled}
                            onChange={() => togglePlugin(plugin.id)}
                            className="rounded border-neutral-700 text-amber-500 focus:ring-0 bg-neutral-900 cursor-pointer"
                          />
                          <span className="font-semibold text-xs text-neutral-200">{plugin.name}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-800/80 text-neutral-400 font-mono">
                            {plugin.category}
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-neutral-400 mt-1 pl-6 leading-relaxed">
                        {plugin.description}
                      </p>

                      {/* Configurable Sub-options */}
                      {isEnabled && plugin.inputs.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-neutral-800/60 pl-6 space-y-2">
                          {plugin.inputs.map(input => {
                            const optionKey = `${plugin.id}.${input.name}`;
                            const currentVal = pluginOptions[optionKey] ?? input.default;

                            return (
                              <div key={input.name} className="flex items-center justify-between text-[11px]">
                                <span className="text-neutral-400">{input.description}</span>
                                {input.type === 'boolean' && (
                                  <input
                                    type="checkbox"
                                    checked={Boolean(currentVal)}
                                    onChange={e => updatePluginOption(optionKey, e.target.checked)}
                                    className="rounded border-neutral-700 text-amber-500 bg-neutral-900"
                                  />
                                )}
                                {input.type === 'number' && (
                                  <input
                                    type="number"
                                    value={Number(currentVal) || 0}
                                    min={input.min}
                                    max={input.max}
                                    onChange={e => updatePluginOption(optionKey, Number(e.target.value))}
                                    className="w-16 px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 font-mono text-neutral-200 text-right"
                                  />
                                )}
                                {input.type === 'select' && input.values && (
                                  <select
                                    value={String(currentVal)}
                                    onChange={e => updatePluginOption(optionKey, e.target.value)}
                                    className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-200 font-mono text-[11px]"
                                  >
                                    {input.values.map(val => (
                                      <option key={val} value={val}>{val}</option>
                                    ))}
                                  </select>
                                )}
                                {input.type === 'text' && (
                                  <input
                                    type="text"
                                    value={String(currentVal || '')}
                                    placeholder={input.name}
                                    onChange={e => updatePluginOption(optionKey, e.target.value)}
                                    className="w-32 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-200 font-mono text-[11px]"
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: Live Preview Stage & Export Panel (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Visualizer Preset Switcher Row */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-neutral-400 font-mono px-1">
                <span className="flex items-center gap-1.5 text-neutral-300 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Standalone Vector Visualizers (100% Native Pure SVG)
                </span>
                <span className="text-[11px] text-emerald-400/90 font-mono">
                  GitHub Camo Proxy Safe
                </span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                {svgPresets.map(preset => {
                  const Icon = preset.icon;
                  const isSelected = selectedPluginPreset === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setSelectedPluginPreset(preset.id)}
                      className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        isSelected
                          ? 'border-amber-500/70 bg-amber-500/15 text-amber-200 shadow-sm ring-1 ring-amber-500/30'
                          : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 hover:border-neutral-700'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 text-amber-400/90" />
                      <span>{preset.label}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-800/80 text-neutral-400 font-mono">
                        {preset.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Output View Tabs */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <div className="flex items-center gap-1.5">
                {[
                  { key: 'preview', label: 'Live Preview', icon: Eye },
                  { key: 'markdown', label: 'Markdown', icon: FileTextIcon },
                  { key: 'action', label: 'Action YAML', icon: Terminal },
                  { key: 'url', label: 'API Endpoint', icon: Globe },
                ].map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.key}
                      data-testid={`tab-${tab.key}`}
                      type="button"
                      onClick={() => handleTabSwitch(tab.key as typeof activeTab)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        activeTab === tab.key
                          ? 'border-amber-500/50 bg-amber-500/10 text-amber-300 shadow-sm'
                          : 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-1.5 text-xs text-emerald-400/90 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">60fps Keyframes Ready</span>
              </div>
            </div>

            {/* Stage Body */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 overflow-hidden min-h-[520px] flex flex-col justify-between shadow-lg">
              {/* TAB 1: Live Interactive SVG Preview */}
              {activeTab === 'preview' && (
                <div className="p-4 sm:p-6 flex-1 flex flex-col items-center justify-center">
                  <div className="w-full max-w-2xl mx-auto rounded-lg border border-neutral-800/80 bg-neutral-950 p-3 sm:p-4 shadow-inner flex flex-col items-center">
                    <div className="w-full flex items-center justify-between pb-2 mb-3 border-b border-neutral-800 text-[11px] font-mono text-neutral-400">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        telemetry-{selectedPluginPreset}.svg ({selectedPluginPreset === 'full' ? template : 'Vector SVG'})
                      </span>
                      <div className="flex items-center gap-3">
                        {selectedPluginPreset !== 'full' && (
                          <button
                            type="button"
                            onClick={handleDownloadSvg}
                            className="hover:text-amber-300 flex items-center gap-1 transition-colors"
                          >
                            <Download className="w-3 h-3 text-neutral-400" />
                            Download
                          </button>
                        )}
                        <a
                          href={activeSvgUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-amber-300 flex items-center gap-1 transition-colors"
                        >
                          Open Raw <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {/* Rendered SVG Preview */}
                    <div className="relative w-full flex justify-center py-2 overflow-x-auto">
                      <img
                        key={activeSvgUrl}
                        src={activeSvgUrl}
                        alt={`${username}'s MonoForge Telemetry`}
                        className="max-w-full h-auto rounded shadow-md border border-neutral-800/50"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (selectedPluginPreset !== 'full' && !target.src.includes(`/assets/`)) {
                            target.src = `/assets/telemetry-${selectedPluginPreset}.svg`;
                          }
                        }}
                      />
                    </div>

                    {/* Badge footer info */}
                    <div className="w-full pt-3 mt-2 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                      <span>✓ GitHub Camo safe (0 &lt;foreignObject&gt;)</span>
                      <span className="text-amber-400/90 font-bold">MonoForge Native Engine</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Markdown Embed Code */}
              {activeTab === 'markdown' && (
                <div className="p-4 sm:p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-neutral-800 text-xs text-neutral-400 font-mono">
                    <span>Copy-paste this directly into your GitHub profile README.md</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(activeMarkdownSnippet, 'markdown', 'Markdown Snippet')}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs transition-colors"
                    >
                      {copiedKey === 'markdown' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'markdown' ? 'Copied' : 'Copy Snippet'}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-lg bg-neutral-950 border border-neutral-800/80 font-mono text-xs text-amber-200/90 overflow-x-auto leading-relaxed">
                    {activeMarkdownSnippet}
                  </pre>
                </div>
              )}

              {/* TAB 3: GitHub Actions Workflow */}
              {activeTab === 'action' && (
                <div className="p-4 sm:p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-neutral-800 text-xs text-neutral-400 font-mono">
                    <span>File: .github/workflows/monoforge-telemetry.yml</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(actionWorkflow, 'action', 'Workflow YAML')}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs transition-colors"
                    >
                      {copiedKey === 'action' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'action' ? 'Copied' : 'Copy Workflow YAML'}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-lg bg-neutral-950 border border-neutral-800/80 font-mono text-xs text-neutral-300 overflow-x-auto max-h-[460px] leading-relaxed">
                    {actionWorkflow}
                  </pre>
                </div>
              )}

              {/* TAB 4: Direct URL / cURL */}
              {activeTab === 'url' && (
                <div className="p-4 sm:p-6 flex-1 flex flex-col space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1 font-mono">
                      Direct SVG Endpoint (Native Server)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={activeSvgUrl}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300"
                      />
                      <button
                        type="button"
                        onClick={() => handleCopy(activeSvgUrl, 'url', 'Embed URL')}
                        className="px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium flex items-center gap-1"
                      >
                        {copiedKey === 'url' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Copy</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1 font-mono">
                      cURL Command
                    </label>
                    <pre className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 font-mono text-xs text-amber-300/90 overflow-x-auto">
                      curl -s "https://github.com/yuvraj-thakur-exe/MONOFORGE{activeSvgUrl}" -o telemetry-{selectedPluginPreset}.svg
                    </pre>
                  </div>
                </div>
              )}

              {/* Bottom Quick-Action Bar */}
              <div className="p-3 sm:p-4 border-t border-neutral-800 bg-neutral-950/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-neutral-500 font-mono">
                  Engine: <span className="text-neutral-300">@monoforge/telemetry</span> &bull; Module: <span className="text-amber-400 font-bold">{selectedPluginPreset}</span>
                </span>
                <div className="flex items-center gap-2">
                  {selectedPluginPreset !== 'full' && (
                    <button
                      type="button"
                      onClick={handleDownloadSvg}
                      className="px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-200 font-semibold hover:bg-neutral-700 transition-colors flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Download .svg</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleCopy(activeMarkdownSnippet, 'bottom_md', 'Markdown Snippet')}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold hover:bg-amber-500/20 transition-colors flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Markdown</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopy(actionWorkflow, 'bottom_action', 'Workflow YAML')}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-200 font-semibold hover:bg-neutral-700 transition-colors flex items-center gap-1.5"
                  >
                    <Terminal className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Copy Action YAML</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

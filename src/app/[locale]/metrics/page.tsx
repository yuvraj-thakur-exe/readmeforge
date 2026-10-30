'use client';

import { useState, useMemo } from 'react';
import { TopNav } from '#/components/navigation/TopNav';
import {
  buildMetricsActionWorkflow,
  buildMetricsEmbedUrl,
  buildMetricsMarkdownSnippet,
} from '#/lib/forge-metrics/builder';
import {
  ForgeMetricsConfig,
  MetricsTemplate,
  MetricsOutputMode,
} from '#/lib/forge-metrics/types';
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
  Layers,
  Sparkles,
  Globe,
  Hash,
  Eye,
  Sliders,
  CheckCircle2,
  Download,
  FileText as FileTextIcon,
  Music,
} from 'lucide-react';
import { toast } from 'sonner';

export default function MetricsStudioPage() {
  // Primary State
  const [username, setUsername] = useState('octocat');
  const [template, setTemplate] = useState<MetricsTemplate>('classic');
  const [outputMode, setOutputMode] = useState<MetricsOutputMode>('direct_svg');
  const [activeTab, setActiveTab] = useState<'preview' | 'markdown' | 'action' | 'url'>('preview');
  const [selectedSvgPlugin, setSelectedSvgPlugin] = useState<
    'isocalendar' | 'languages' | 'habits' | 'achievements' | 'terminal' | 'pagespeed' | 'music' | 'leetcode' | 'full'
  >('isocalendar');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Plugin Toggles & Config
  const [baseHeader, setBaseHeader] = useState(true);
  const [baseActivity, setBaseActivity] = useState(true);
  const [baseCommunity, setBaseCommunity] = useState(true);
  const [baseRepositories, setBaseRepositories] = useState(true);

  // Isocalendar
  const [isocalendarEnabled, setIsocalendarEnabled] = useState(true);
  const [isocalendarDuration, setIsocalendarDuration] = useState<'half-year' | 'full-year'>('half-year');

  // Languages
  const [languagesEnabled, setLanguagesEnabled] = useState(true);
  const [languagesLimit, setLanguagesLimit] = useState(8);
  const [languagesIndepth, setLanguagesIndepth] = useState(false);

  // Habits
  const [habitsEnabled, setHabitsEnabled] = useState(true);
  const [habitsDays, setHabitsDays] = useState(14);
  const [habitsFacts, setHabitsFacts] = useState(true);

  // Achievements
  const [achievementsEnabled, setAchievementsEnabled] = useState(true);
  const [achievementsThreshold, setAchievementsThreshold] = useState<'C' | 'B' | 'A' | 'S' | 'X'>('B');
  const [achievementsSecrets, setAchievementsSecrets] = useState(false);

  // LeetCode
  const [leetcodeEnabled, setLeetcodeEnabled] = useState(false);
  const [leetcodeUser, setLeetcodeUser] = useState('');

  // Topics
  const [topicsEnabled, setTopicsEnabled] = useState(false);
  const [topicsLimit, setTopicsLimit] = useState(12);

  // Active accordion section
  const [activeSection, setActiveSection] = useState<'base' | 'calendar' | 'languages' | 'habits' | 'achievements' | 'leetcode' | 'topics'>('base');

  // Build the unified config
  const metricsConfig: ForgeMetricsConfig = useMemo(() => {
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
        enabled: isocalendarEnabled,
        duration: isocalendarDuration,
      },
      languages: {
        enabled: languagesEnabled,
        limit: languagesLimit,
        indepth: languagesIndepth,
      },
      habits: {
        enabled: habitsEnabled,
        days: habitsDays,
        facts: habitsFacts,
        charts: true,
      },
      achievements: {
        enabled: achievementsEnabled,
        threshold: achievementsThreshold,
        secrets: achievementsSecrets,
        display: 'compact',
      },
      leetcode: {
        enabled: leetcodeEnabled,
        user: leetcodeUser || username,
      },
      topics: {
        enabled: topicsEnabled,
        limit: topicsLimit,
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
    isocalendarEnabled,
    isocalendarDuration,
    languagesEnabled,
    languagesLimit,
    languagesIndepth,
    habitsEnabled,
    habitsDays,
    habitsFacts,
    achievementsEnabled,
    achievementsThreshold,
    achievementsSecrets,
    leetcodeEnabled,
    leetcodeUser,
    topicsEnabled,
    topicsLimit,
  ]);

  // Derived outputs
  const embedUrl = useMemo(() => buildMetricsEmbedUrl(metricsConfig), [metricsConfig]);
  const actionWorkflow = useMemo(() => buildMetricsActionWorkflow(metricsConfig), [metricsConfig]);
  const markdownSnippet = useMemo(() => buildMetricsMarkdownSnippet(metricsConfig, 'center'), [metricsConfig]);

  const activeSvgUrl = useMemo(() => {
    if (selectedSvgPlugin === 'full') return embedUrl;
    const cleanUser = encodeURIComponent(username.trim() || 'octocat');
    return `/api/metrics/svg?plugin=${selectedSvgPlugin}&user=${cleanUser}`;
  }, [selectedSvgPlugin, username, embedUrl]);

  const activeMarkdownSnippet = useMemo(() => {
    if (selectedSvgPlugin === 'full') return markdownSnippet;
    const cleanUser = username.trim() || 'octocat';
    return `<!-- ReadmeForge Standalone Telemetry: ${selectedSvgPlugin.toUpperCase()} -->
<p align="center">
  <img src="https://raw.githubusercontent.com/${cleanUser}/${cleanUser}/main/public/assets/metrics-${selectedSvgPlugin}.svg" alt="${cleanUser}'s ReadmeForge Metrics" width="100%" />
</p>

<!-- Or embed via dynamic API route: -->
<!-- <img src="https://readmeforge.dev/api/metrics/svg?plugin=${selectedSvgPlugin}&user=${cleanUser}" alt="${cleanUser}'s ReadmeForge Metrics" /> -->`;
  }, [selectedSvgPlugin, username, markdownSnippet]);

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
      a.download = `readmeforge-${selectedSvgPlugin}-${username || 'octocat'}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
      toast.success(`Downloaded readmeforge-${selectedSvgPlugin}.svg!`);
    } catch {
      toast.error('Failed to download SVG');
    }
  };

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

  const templates: Array<{ id: MetricsTemplate; label: string; desc: string }> = [
    { id: 'classic', label: 'Classic', desc: 'Standard balanced card format' },
    { id: 'terminal', label: 'Terminal', desc: 'Sleek CLI command-line aesthetic' },
    { id: 'repository', label: 'Repository', desc: 'Repository-centric statistics' },
    { id: 'markdown', label: 'Markdown', desc: 'Lightweight native tables' },
    { id: 'community', label: 'Community', desc: 'Spotlight on discussions & PRs' },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-amber-500/30 selection:text-amber-200">
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
                ReadmeForge Metrics
              </h1>
              <span className="px-2 py-0.5 text-[11px] font-mono font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                47+ Plugins
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl">
              High-performance GitHub profile infographics &amp; telemetry engine. Live preview, customizable templates, and 1-click GitHub Actions or SVG embeds.
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
                    ? 'border-amber-500/40 bg-amber-500/10 text-amber-300'
                    : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                }`}
              >
                @{handle}
              </button>
            ))}
          </div>
        </div>

        {/* Studio Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* LEFT: Controls & Plugin Drawer (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* 1. Profile Handle & Output Mode */}
            <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 shadow-sm space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                  GitHub Username
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500 text-sm font-mono">
                    @
                  </span>
                  <input
                    type="text"
                    data-testid="github-username-input"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="octocat"
                    className="w-full pl-8 pr-3 py-2 text-sm font-mono rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40 transition-colors"
                  />
                </div>
              </div>

              {/* Template Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Card Template
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                  {templates.map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTemplate(t.id)}
                      className={`px-2 py-2 rounded-lg border text-xs font-medium text-center transition-all ${
                        template === t.id
                          ? 'border-amber-500/50 bg-amber-500/10 text-amber-300 font-semibold shadow-sm'
                          : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Output Mode Switcher */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Rendering Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOutputMode('direct_svg')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-medium transition-all ${
                      outputMode === 'direct_svg'
                        ? 'border-amber-500/50 bg-amber-500/10 text-amber-300'
                        : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Direct SVG Link</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOutputMode('action')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-medium transition-all ${
                      outputMode === 'action'
                        ? 'border-amber-500/50 bg-amber-500/10 text-amber-300'
                        : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>GitHub Actions</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Plugin Arsenal Accordion */}
            <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800/80">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-400" />
                  Plugin Arsenal Configuration
                </span>
                <span className="text-[11px] font-mono text-neutral-500">
                  Select &amp; Tune
                </span>
              </div>

              {/* Accordion Navigation Pills */}
              <div className="flex flex-wrap gap-1 pb-2">
                {[
                  { key: 'base', label: 'Base', icon: Layers },
                  { key: 'calendar', label: '3D Calendar', icon: Calendar },
                  { key: 'languages', label: 'Languages', icon: Code2 },
                  { key: 'habits', label: 'Habits', icon: Clock },
                  { key: 'achievements', label: 'Achievements', icon: Trophy },
                  { key: 'leetcode', label: 'LeetCode', icon: Sparkles },
                  { key: 'topics', label: 'Topics', icon: Hash },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setActiveSection(item.key as typeof activeSection)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                        activeSection === item.key
                          ? 'border-neutral-600 bg-neutral-800 text-neutral-100 font-semibold shadow-sm'
                          : 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
                      }`}
                    >
                      <Icon className="w-3 h-3 text-amber-400/80" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Accordion Content Panel */}
              <div className="p-3.5 rounded-lg bg-neutral-950/80 border border-neutral-800/80 text-xs space-y-3">
                {/* Section: Base Content */}
                {activeSection === 'base' && (
                  <div className="space-y-3">
                    <p className="text-neutral-400 text-xs">
                      Core GitHub account telemetry, header, and contribution summaries.
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'Header & Bio', checked: baseHeader, set: setBaseHeader },
                        { label: 'Recent Activity', checked: baseActivity, set: setBaseActivity },
                        { label: 'Community Stats', checked: baseCommunity, set: setBaseCommunity },
                        { label: 'Repositories', checked: baseRepositories, set: setBaseRepositories },
                      ].map(item => (
                        <label
                          key={item.label}
                          className="flex items-center gap-2 p-2 rounded-md bg-neutral-900 border border-neutral-800/70 cursor-pointer hover:border-neutral-700"
                        >
                          <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={e => item.set(e.target.checked)}
                            className="rounded border-neutral-700 text-amber-500 focus:ring-0 bg-neutral-950"
                          />
                          <span className="text-neutral-300 font-medium">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section: 3D Isometric Calendar */}
                {activeSection === 'calendar' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-neutral-200">Enable 3D Isometric Calendar</span>
                      <input
                        type="checkbox"
                        checked={isocalendarEnabled}
                        onChange={e => setIsocalendarEnabled(e.target.checked)}
                        className="rounded border-neutral-700 text-amber-500 focus:ring-0 bg-neutral-950"
                      />
                    </div>
                    {isocalendarEnabled && (
                      <div>
                        <label className="block text-neutral-400 mb-1">Calendar Time Span</label>
                        <select
                          value={isocalendarDuration}
                          onChange={e => setIsocalendarDuration(e.target.value as 'half-year' | 'full-year')}
                          className="w-full p-2 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-200 focus:outline-none"
                        >
                          <option value="half-year">Half-Year (Past 180 Days)</option>
                          <option value="full-year">Full-Year (Past 365 Days)</option>
                        </select>
                      </div>
                    )}
                  </div>
                )}

                {/* Section: Languages */}
                {activeSection === 'languages' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-neutral-200">Enable Languages Breakdown</span>
                      <input
                        type="checkbox"
                        checked={languagesEnabled}
                        onChange={e => setLanguagesEnabled(e.target.checked)}
                        className="rounded border-neutral-700 text-amber-500 focus:ring-0 bg-neutral-950"
                      />
                    </div>
                    {languagesEnabled && (
                      <>
                        <div>
                          <div className="flex justify-between text-neutral-400 mb-1">
                            <span>Languages Display Limit</span>
                            <span className="font-mono text-amber-400 font-bold">{languagesLimit}</span>
                          </div>
                          <input
                            type="range"
                            min={4}
                            max={16}
                            value={languagesLimit}
                            onChange={e => setLanguagesLimit(Number(e.target.value))}
                            className="w-full accent-amber-400 cursor-pointer"
                          />
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer pt-1">
                          <input
                            type="checkbox"
                            checked={languagesIndepth}
                            onChange={e => setLanguagesIndepth(e.target.checked)}
                            className="rounded border-neutral-700 text-amber-500 focus:ring-0 bg-neutral-950"
                          />
                          <span className="text-neutral-300">Indepth byte analysis (requires token in action mode)</span>
                        </label>
                      </>
                    )}
                  </div>
                )}

                {/* Section: Habits */}
                {activeSection === 'habits' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-neutral-200">Enable Coding Habits &amp; Rhythms</span>
                      <input
                        type="checkbox"
                        checked={habitsEnabled}
                        onChange={e => setHabitsEnabled(e.target.checked)}
                        className="rounded border-neutral-700 text-amber-500 focus:ring-0 bg-neutral-950"
                      />
                    </div>
                    {habitsEnabled && (
                      <>
                        <div>
                          <div className="flex justify-between text-neutral-400 mb-1">
                            <span>Activity Analysis Window (Days)</span>
                            <span className="font-mono text-amber-400 font-bold">{habitsDays} days</span>
                          </div>
                          <input
                            type="range"
                            min={7}
                            max={30}
                            value={habitsDays}
                            onChange={e => setHabitsDays(Number(e.target.value))}
                            className="w-full accent-amber-400 cursor-pointer"
                          />
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={habitsFacts}
                            onChange={e => setHabitsFacts(e.target.checked)}
                            className="rounded border-neutral-700 text-amber-500 focus:ring-0 bg-neutral-950"
                          />
                          <span className="text-neutral-300">Display commit rhythm facts &amp; hours breakdown</span>
                        </label>
                      </>
                    )}
                  </div>
                )}

                {/* Section: Achievements */}
                {activeSection === 'achievements' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-neutral-200">Enable GitHub Achievements</span>
                      <input
                        type="checkbox"
                        checked={achievementsEnabled}
                        onChange={e => setAchievementsEnabled(e.target.checked)}
                        className="rounded border-neutral-700 text-amber-500 focus:ring-0 bg-neutral-950"
                      />
                    </div>
                    {achievementsEnabled && (
                      <>
                        <div>
                          <label className="block text-neutral-400 mb-1">Minimum Rank Threshold</label>
                          <select
                            value={achievementsThreshold}
                            onChange={e => setAchievementsThreshold(e.target.value as 'C' | 'B' | 'A' | 'S' | 'X')}
                            className="w-full p-2 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-200 focus:outline-none"
                          >
                            <option value="C">Rank C — Bronze &amp; All Badges</option>
                            <option value="B">Rank B — Silver Standard</option>
                            <option value="A">Rank A — High Achievement</option>
                            <option value="S">Rank S — Elite Gold Only</option>
                            <option value="X">Rank X — Mastery Tier</option>
                          </select>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={achievementsSecrets}
                            onChange={e => setAchievementsSecrets(e.target.checked)}
                            className="rounded border-neutral-700 text-amber-500 focus:ring-0 bg-neutral-950"
                          />
                          <span className="text-neutral-300">Reveal secret milestone achievements</span>
                        </label>
                      </>
                    )}
                  </div>
                )}

                {/* Section: LeetCode */}
                {activeSection === 'leetcode' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-neutral-200">Enable LeetCode Statistics</span>
                      <input
                        type="checkbox"
                        checked={leetcodeEnabled}
                        onChange={e => setLeetcodeEnabled(e.target.checked)}
                        className="rounded border-neutral-700 text-amber-500 focus:ring-0 bg-neutral-950"
                      />
                    </div>
                    {leetcodeEnabled && (
                      <div>
                        <label className="block text-neutral-400 mb-1">LeetCode Username Override</label>
                        <input
                          type="text"
                          value={leetcodeUser}
                          onChange={e => setLeetcodeUser(e.target.value)}
                          placeholder={username || 'leetcode_handle'}
                          className="w-full p-2 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-200 font-mono focus:outline-none"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Section: Topics */}
                {activeSection === 'topics' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-neutral-200">Enable Starred Topics</span>
                      <input
                        type="checkbox"
                        checked={topicsEnabled}
                        onChange={e => setTopicsEnabled(e.target.checked)}
                        className="rounded border-neutral-700 text-amber-500 focus:ring-0 bg-neutral-950"
                      />
                    </div>
                    {topicsEnabled && (
                      <div>
                        <div className="flex justify-between text-neutral-400 mb-1">
                          <span>Max Topics to Display</span>
                          <span className="font-mono text-amber-400 font-bold">{topicsLimit}</span>
                        </div>
                        <input
                          type="range"
                          min={6}
                          max={24}
                          value={topicsLimit}
                          onChange={e => setTopicsLimit(Number(e.target.value))}
                          className="w-full accent-amber-400 cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                )}
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
                  Standalone Vector Visualizers (lowlighter/metrics &bull; pure SVG)
                </span>
                <span className="text-[11px] text-emerald-400/90 font-mono">
                  GitHub Camo Proxy Safe
                </span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                {svgPresets.map(preset => {
                  const Icon = preset.icon;
                  const isSelected = selectedSvgPlugin === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setSelectedSvgPlugin(preset.id)}
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
                      onClick={() => setActiveTab(tab.key as typeof activeTab)}
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
                        metrics-{selectedSvgPlugin}.svg ({selectedSvgPlugin === 'full' ? template : 'Vector SVG'})
                      </span>
                      <div className="flex items-center gap-3">
                        {selectedSvgPlugin !== 'full' && (
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
                        alt={`${username}'s ReadmeForge Metrics`}
                        className="max-w-full h-auto rounded shadow-md border border-neutral-800/50"
                        onError={(e) => {
                          // Fallback to local static asset if API endpoint or remote proxy has latency
                          const target = e.currentTarget;
                          if (selectedSvgPlugin !== 'full' && !target.src.includes(`/assets/`)) {
                            target.src = `/assets/metrics-${selectedSvgPlugin}.svg`;
                          }
                        }}
                      />
                    </div>

                    {/* Badge footer info */}
                    <div className="w-full pt-3 mt-2 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                      <span>✓ GitHub Camo safe (0 &lt;foreignObject&gt;)</span>
                      <span className="text-amber-400/90 font-bold">ReadmeForge Engine</span>
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
                    <span>File: .github/workflows/readmeforge-metrics.yml</span>
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
                      Direct SVG Endpoint
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
                      curl -s "{activeSvgUrl}" -o metrics-{selectedSvgPlugin}.svg
                    </pre>
                  </div>
                </div>
              )}

              {/* Bottom Quick-Action Bar */}
              <div className="p-3 sm:p-4 border-t border-neutral-800 bg-neutral-950/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-neutral-500 font-mono">
                  Engine: <span className="text-neutral-300">@readmeforge/metrics</span> &bull; Preset: <span className="text-amber-400 font-bold">{selectedSvgPlugin}</span>
                </span>
                <div className="flex items-center gap-2">
                  {selectedSvgPlugin !== 'full' && (
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



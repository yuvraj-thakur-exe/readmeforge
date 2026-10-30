'use client';

import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { Link } from '#/i18n/navigation';
import {
  TELEMETRY_PLUGINS_CATALOG,
  TELEMETRY_CATEGORIES,
} from '#/lib/forge-telemetry/catalog';
import {
  Search,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const STANDALONE_PREVIEWS = [
  { id: 'isocalendar', title: '3D Isometric Calendar', svg: '/assets/telemetry-isocalendar-3d.svg', tag: '3D VOXEL' },
  { id: 'languages', title: 'Languages Donut', svg: '/assets/telemetry-languages-donut.svg', tag: 'POLYGLOT' },
  { id: 'habits', title: 'Coding Habits Radar', svg: '/assets/telemetry-habits-radar.svg', tag: '24H CLOCK' },
  { id: 'achievements', title: 'Achievements Rack', svg: '/assets/telemetry-achievements-rack.svg', tag: 'S-RANK' },
  { id: 'terminal', title: 'Terminal HUD', svg: '/assets/telemetry-terminal-hud.svg', tag: 'CYBER CRT' },
  { id: 'pagespeed', title: 'PageSpeed Audit', svg: '/assets/telemetry-pagespeed-audit.svg', tag: 'LIGHTHOUSE' },
  { id: 'music', title: 'Music Equalizer', svg: '/assets/telemetry-music-player.svg', tag: 'SPOTIFY' },
  { id: 'leetcode', title: 'LeetCode Mastery', svg: '/assets/telemetry-leetcode-stats.svg', tag: 'ALGO' },
];

export function TelemetryArsenalGrid() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return TELEMETRY_PLUGINS_CATALOG.filter(plugin => {
      const matchCat = selectedCat === 'all' || plugin.category === selectedCat;
      const matchSearch =
        searchQuery === '' ||
        plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plugin.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plugin.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [searchQuery, selectedCat]);

  const handleCopy = (pluginId: string, name: string) => {
    const yaml = `plugin_${pluginId}: yes`;
    navigator.clipboard.writeText(yaml);
    setCopiedKey(pluginId);
    toast.success(`Copied configuration key for ${name}!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Editorial Header (Poulo style) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-xs text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider">
            <span>[04 // TELEMETRY ARSENAL ENCYCLOPEDIA]</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400" />
            <span className="text-neutral-500">47+ SELF-HOSTED PLUGINS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
            Scraped &amp; Native Plugin Catalog
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl mt-1">
            Every infographic module extracted, typed, and rendered natively. Zero external proxies or servers.
          </p>
        </div>

        <Link
          href="/telemetry"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs transition-colors self-start md:self-auto shadow-sm"
        >
          <span>Open Full Telemetry Studio</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Standalone Vector Asset Showcase Carousel */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-semibold text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
          Featured Standalone Vector Infographics (Zero Actions &bull; 100% Camo Safe)
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {STANDALONE_PREVIEWS.map(item => (
            <div
              key={item.id}
              className="group p-2.5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 hover:border-amber-400 dark:hover:border-amber-500/50 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all flex flex-col justify-between shadow-sm"
            >
              <div className="flex items-center justify-between text-[9px] font-mono mb-2">
                <span className="text-neutral-800 dark:text-neutral-400 font-bold line-clamp-1">{item.title}</span>
                <span className="px-1 py-0.2 rounded bg-neutral-100 dark:bg-neutral-800 text-amber-700 dark:text-amber-400 font-bold">{item.tag}</span>
              </div>
              <div className="p-1 rounded bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800/80 flex items-center justify-center aspect-[4/3] overflow-hidden my-1 shadow-inner">
                <img
                  src={item.svg}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <a
                href={item.svg}
                download
                className="mt-1 text-[10px] text-center text-neutral-500 dark:text-neutral-500 group-hover:text-amber-600 dark:group-hover:text-amber-300 font-mono transition-colors"
              >
                Download .svg &darr;
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Filter Controls Bar */}
      <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-thin">
          {TELEMETRY_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCat(cat.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCat === cat.id
                  ? 'bg-amber-400 text-neutral-950 shadow-sm font-bold'
                  : 'bg-neutral-100 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 border border-neutral-200 dark:border-neutral-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search 47+ plugins..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-neutral-200 placeholder:text-neutral-400 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
      </div>

      {/* 40+ Plugin Cards Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map(plugin => {
          const isCopied = copiedKey === plugin.id;
          return (
            <div
              key={plugin.id}
              className="p-4 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-950/70 hover:border-amber-400 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition-all flex flex-col justify-between space-y-3 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-neutral-100">{plugin.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                      {plugin.category}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400/90 font-semibold">
                    plugin_{plugin.id}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {plugin.description}
                </p>

                {/* Sub-inputs counter */}
                {plugin.inputs.length > 0 && (
                  <div className="mt-2 text-[10px] text-neutral-500 font-mono">
                    {plugin.inputs.length} configurable options &bull; default: {String(plugin.inputs[0]?.default ?? 'enabled')}
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="pt-2 border-t border-neutral-900 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => handleCopy(plugin.id, plugin.name)}
                  className="flex items-center gap-1.5 text-neutral-400 hover:text-amber-300 font-mono transition-colors"
                >
                  {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{isCopied ? 'Copied Key' : 'Copy Key'}</span>
                </button>

                <Link
                  href="/telemetry"
                  className="flex items-center gap-1 text-[11px] text-neutral-500 hover:text-neutral-200 transition-colors font-mono"
                >
                  <span>Studio</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

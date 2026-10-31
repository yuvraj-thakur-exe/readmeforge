'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useReadmeStore } from '#/store/useReadmeStore';
import { ReadmeConfig } from '#/lib/plugins/types';
import { buildMarkdown } from '#/lib/buildMarkdown';
import confetti from 'canvas-confetti';
import {
  Check,
  LayoutTemplate,
  Sparkles,
  Copy,
  Eye,
  X,
  Search,
  Code,
  CheckCheck,
  RefreshCw,
  Trash2,
  Layers,
} from 'lucide-react';

export { TEMPLATES, type TemplateItem } from '#/lib/templates/catalog';
import { TEMPLATES, type TemplateItem } from '#/lib/templates/catalog';

const KEYWORDS = [
  'stand out from day one',
  'level up your GitHub branding',
  'demand recruiter attention',
  'showcase clean architectures',
  'impress open-source peers',
];

const TEMPLATE_PREVIEWS: Record<string, string> = {
  'wow-3d-city-cat': '/assets/wow-profile-full.svg',
  'bento-signal-dashboard': '/assets/bento-dashboard-full.svg',
  'isometric-terminal-connect': '/assets/isometric-terminal.svg',
  'minimal-light-unicorn': '/assets/coding-unicorn.svg',
  'neon-craftsman-owl': '/assets/owl-confetti.svg',
  'constellation-devops-desk': '/assets/developer-desk.svg',
  'terminal-matrix-digital-rain': '/assets/terminal_animated.svg',
  'cyberpunk': '/assets/snake.svg',
  'gaming-retro-arcade': '/assets/pacman.svg',
  'demon-slayer-dark': '/assets/profile/slayer-night-coder-header.svg',
  'forge-telemetry-dashboard': '/assets/about-me-telemetry.svg',
  'minimalist': '/assets/text-effects.svg',
  'fullstack': '/assets/bento-dashboard-header.svg',
  'cloud-architect': '/assets/roaming-bot.svg',
  'ai-ml': '/assets/characters/blue-bot.svg',
  'oss-maintainer': '/assets/octocat-coffee.svg',
  'mobile-dev': '/assets/characters/dragonborn-paladin.svg',
  'security-researcher': '/assets/characters/chibi-deadpool.svg',
  'creative-frontend': '/assets/digital-hands-divider.svg',
  'cs-student': '/assets/characters/blue-bean.svg',
  'pinterest-lofi-aesthetic': '/assets/profile/pixel-retro-pc.png',
  'data-engineer-streaming': '/assets/breakout.svg',
  'game-dev-3d-graphics': '/assets/galaga.svg',
  'web3-solidity-defi': '/assets/characters/red-dragon.svg',
};

function renderModuleVisual(sec: { id: string; type: string; props?: Record<string, any> }) {
  const content = sec.props?.content || {};
  switch (sec.type) {
    case 'snk':
      return (
        <div className="p-4 rounded-xl bg-white border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-neutral-950">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>GITHUB CONTRIBUTION GRID SNAKE</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#ffe600] border border-neutral-900 font-black">
              ANIMATED SVG
            </span>
          </div>
          <div className="h-16 rounded-lg bg-neutral-50 border border-neutral-900/20 p-2 flex items-center justify-between overflow-hidden">
            <div className="flex gap-1">
              {[...Array(14)].map((_, i) => (
                <div key={i} className="flex flex-col gap-1">
                  {[...Array(4)].map((_, j) => (
                    <div
                      key={j}
                      className={`w-2.5 h-2.5 rounded-xs ${
                        (i + j) % 3 === 0 ? 'bg-emerald-500' : (i + j) % 5 === 0 ? 'bg-emerald-300' : 'bg-neutral-200'
                      }`}
                    />
                  ))}
                </div>
              ))}
            </div>
            <span className="text-xs font-mono font-black text-emerald-600 pr-2">🐍 eating dots...</span>
          </div>
        </div>
      );
    case 'pie-chart':
      return (
        <div className="p-4 rounded-xl bg-white border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-neutral-950">
            <span>{content.title || 'Top Languages Breakdown'}</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-100 text-cyan-950 border border-neutral-900 font-bold">
              DONUT CHART
            </span>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <div className="w-10 h-10 rounded-full border-4 border-amber-400 border-t-cyan-500 border-r-emerald-500 shrink-0" />
            <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
              <span className="px-1.5 py-0.5 rounded bg-neutral-100 border border-neutral-300 text-neutral-800 font-bold">TypeScript 58%</span>
              <span className="px-1.5 py-0.5 rounded bg-neutral-100 border border-neutral-300 text-neutral-800 font-bold">Rust 24%</span>
              <span className="px-1.5 py-0.5 rounded bg-neutral-100 border border-neutral-300 text-neutral-800 font-bold">WebGL 18%</span>
            </div>
          </div>
        </div>
      );
    case 'activity-graph':
      return (
        <div className="p-4 rounded-xl bg-white border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-neutral-950">
            <span>{content.title || 'Annual Contribution Activity Graph'}</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-950 border border-neutral-900 font-bold">
              ACTIVITY METRICS
            </span>
          </div>
          <div className="h-12 flex items-end gap-1.5 pt-1 px-1">
            {[40, 65, 30, 85, 95, 60, 45, 80, 100, 70, 90, 50, 75, 88].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-[#ffe600] border border-neutral-900 rounded-t-xs"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      );
    case 'github-profile-trophy':
      return (
        <div className="p-4 rounded-xl bg-white border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-neutral-950">
            <span>🏆 GitHub Achievements &amp; Trophies</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-950 border border-neutral-900 font-bold">
              RANK AAA
            </span>
          </div>
          <div className="flex items-center gap-2 pt-1 overflow-x-auto">
            {['🥇 Multi-Language', '⚡ Fast PR Master', '⭐ 1K Stars', '🔥 365 Streak'].map((trophy, i) => (
              <span key={i} className="px-2 py-1 rounded-lg bg-neutral-50 border border-neutral-900 text-[10px] font-mono font-bold whitespace-nowrap">
                {trophy}
              </span>
            ))}
          </div>
        </div>
      );
    case 'github-readme-stats':
      return (
        <div className="p-4 rounded-xl bg-white border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-neutral-950">
            <span>📊 Verified GitHub Statistics</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#ffe600] text-neutral-950 border border-neutral-900 font-black">
              LIVE METRICS
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center pt-1 font-mono text-xs">
            <div className="p-1.5 rounded bg-neutral-50 border border-neutral-300">
              <span className="text-[9px] text-neutral-500 block">TOTAL COMMITS</span>
              <span className="font-black text-neutral-950">2,847</span>
            </div>
            <div className="p-1.5 rounded bg-neutral-50 border border-neutral-300">
              <span className="text-[9px] text-neutral-500 block">PULL REQUESTS</span>
              <span className="font-black text-amber-600">142</span>
            </div>
            <div className="p-1.5 rounded bg-neutral-50 border border-neutral-300">
              <span className="text-[9px] text-neutral-500 block">STARS EARNED</span>
              <span className="font-black text-emerald-600">890</span>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="p-4 rounded-xl bg-white border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="font-mono text-xs font-black text-neutral-950 uppercase">{sec.type}</span>
            <p className="text-[10px] text-neutral-600 font-mono">Module ID: {sec.id}</p>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 border border-neutral-300 font-mono font-bold">
            Configured
          </span>
        </div>
      );
  }
}

export const TemplateGallery: React.FC = () => {
  const setEntireConfig = useReadmeStore(state => state.setEntireConfig);

  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [copiedMarkdown, setCopiedMarkdown] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Interactive Preview & Customize Modal State
  const [previewTemplate, setPreviewTemplate] = useState<TemplateItem | null>(null);
  const [previewConfig, setPreviewConfig] = useState<ReadmeConfig | null>(null);
  const [previewTab, setPreviewTab] = useState<'visual' | 'markdown' | 'prompt' | 'plugins'>('visual');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Dynamic Keyword Text Animation
  const [keywordIdx, setKeywordIdx] = useState<number>(0);
  const [fadeKeyword, setFadeKeyword] = useState<boolean>(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFadeKeyword(false);
      setTimeout(() => {
        setKeywordIdx(prev => (prev + 1) % KEYWORDS.length);
        setFadeKeyword(true);
      }, 250);
    }, 3200);

    return () => clearInterval(timer);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const categories = useMemo(() => {
    const set = new Set<string>();
    TEMPLATES.forEach(t => {
      if (t.category) set.add(t.category);
    });
    return ['all', ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    return TEMPLATES.filter(tmpl => {
      const matchesCat = activeCategory === 'all' || tmpl.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCat;

      const matchesSearch =
        tmpl.name.toLowerCase().includes(q) ||
        tmpl.description.toLowerCase().includes(q) ||
        tmpl.category.toLowerCase().includes(q) ||
        tmpl.config.sections.some(s => s.type.toLowerCase().includes(q));

      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Copy AI prompt to clipboard with tactile confetti
  const handleCopyPrompt = (template: TemplateItem) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(template.prompt);
      setCopiedPromptId(template.id);
      showToast(`AI prompt for "${template.name}" copied to clipboard!`);

      try {
        confetti({
          particleCount: 22,
          spread: 55,
          origin: { y: 0.8 },
          colors: ['#ffe600', '#f59e0b', '#06b6d4', '#10b981'],
        });
      } catch {
        // Ignored
      }

      setTimeout(() => {
        setCopiedPromptId(null);
      }, 2200);
    }
  };

  // Open Preview Modal
  const handleOpenPreview = (template: TemplateItem) => {
    setPreviewTemplate(template);
    setPreviewConfig(JSON.parse(JSON.stringify(template.config)));
    setPreviewTab('visual');
  };

  // Remove a plugin from the active preview
  const handleRemovePluginFromPreview = (sectionId: string) => {
    if (!previewConfig) return;
    setPreviewConfig({
      ...previewConfig,
      sections: previewConfig.sections.filter(s => s.id !== sectionId),
    });
    showToast('Plugin removed from preview');
  };

  // Reset plugins in preview to original template state
  const handleResetPreviewPlugins = () => {
    if (!previewTemplate) return;
    setPreviewConfig(JSON.parse(JSON.stringify(previewTemplate.config)));
    showToast('All plugins restored to template default');
  };

  // Apply directly from preview modal
  const handleApplyFromPreview = () => {
    if (!previewConfig || !previewTemplate) return;
    setEntireConfig(previewConfig);
    const md = buildMarkdown(previewConfig);
    setPreviewTemplate(null);
    setPreviewConfig(null);
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(md);
      showToast(`Customized "${previewTemplate.name}" applied & Markdown copied!`);
    } else {
      showToast(`Customized "${previewTemplate.name}" applied to profile!`);
    }
    try {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    } catch {
      // Ignored
    }
  };

  // Merge directly from preview modal
  const handleMergeFromPreview = () => {
    if (!previewConfig || !previewTemplate) return;
    const current = useReadmeStore.getState().config;
    setEntireConfig({
      ...current,
      sections: [...current.sections, ...previewConfig.sections],
    });
    setPreviewTemplate(null);
    setPreviewConfig(null);
    showToast(`Plugins from "${previewTemplate.name}" merged into your profile!`);
    try {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    } catch {
      // Ignored
    }
  };

  // Generated Markdown for preview
  const previewMarkdown = useMemo(() => {
    if (!previewConfig) return '';
    try {
      return buildMarkdown(previewConfig);
    } catch {
      return '# README Preview';
    }
  }, [previewConfig]);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto space-y-8 relative font-sans text-neutral-950">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border-2 border-neutral-900 text-neutral-950 text-xs font-bold shadow-[4px_4px_0px_#18181b] animate-in fade-in slide-in-from-bottom-2">
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header with Dynamic Text Animation */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-neutral-900 text-neutral-950 text-xs font-mono font-bold shadow-[2px_2px_0px_#18181b]">
          <LayoutTemplate className="w-3.5 h-3.5 text-amber-500" />
          <span>CURATED STARTERS &amp; ARCHETYPES</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-neutral-600 font-mono font-black">{TEMPLATES.length} READY-TO-SHIP</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-neutral-950 tracking-tight uppercase font-sans">
          CURATED STARTER ARCHETYPES
        </h2>

        {/* Animated Subtitle */}
        <p className="text-sm font-mono text-neutral-700 max-w-2xl mx-auto leading-relaxed">
          One-click apply clean, structured templates designed to{' '}
          <span
            className={`font-black text-neutral-950 bg-[#ffe600] px-2 py-0.5 rounded border border-neutral-900 shadow-2xs transition-opacity duration-300 ${
              fadeKeyword ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {KEYWORDS[keywordIdx]}
          </span>
          .
        </p>

        {/* Search Bar */}
        <div className="pt-3 max-w-md mx-auto">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by archetype, stack, or keyword..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border-2 border-neutral-900 text-xs font-mono font-bold text-neutral-950 placeholder:text-neutral-400 focus:outline-hidden focus:border-[#ffe600] shadow-[2px_2px_0px_#18181b] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-neutral-500 hover:text-neutral-900 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map(cat => {
          const count = cat === 'all' ? TEMPLATES.length : TEMPLATES.filter(t => t.category === cat).length;
          const isActive = activeCategory === cat;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-black border-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#ffe600] text-neutral-950 border-neutral-900 shadow-[2px_2px_0px_#18181b]'
                  : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-900 hover:text-neutral-950'
              }`}
            >
              <span className="capitalize">{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isActive ? 'bg-neutral-950 text-white' : 'bg-neutral-100 text-neutral-700'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {filtered.map(tmpl => {
          const isCopied = copiedPromptId === tmpl.id;

          return (
            <div
              key={tmpl.id}
              className="p-6 rounded-2xl bg-white border-2 border-neutral-900 shadow-[4px_4px_0px_#18181b] hover:shadow-[2px_2px_0px_#18181b] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-lg bg-neutral-100 text-neutral-900 border border-neutral-900 font-bold">
                    {tmpl.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-neutral-900"
                      style={{ backgroundColor: tmpl.accent }}
                    />
                    <span className="text-[10px] font-mono text-neutral-500 uppercase font-bold">{tmpl.accent}</span>
                  </div>
                </div>

                <h3 className="text-lg font-black text-neutral-950 group-hover:text-amber-600 transition-colors uppercase font-sans">
                  {tmpl.name}
                </h3>

                <p className="text-xs text-neutral-700 mt-2 line-clamp-2 leading-relaxed font-mono">
                  {tmpl.description}
                </p>

                {/* Visual Preview Window Box */}
                <div
                  onClick={() => handleOpenPreview(tmpl)}
                  className="my-4 rounded-xl border-2 border-neutral-900 bg-neutral-50 p-3 hover:bg-[#fffde6] cursor-pointer transition-all group/preview relative overflow-hidden shadow-2xs"
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-200">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-400 border border-neutral-900" />
                      <span className="w-2 h-2 rounded-full bg-[#ffe600] border border-neutral-900" />
                      <span className="w-2 h-2 rounded-full bg-emerald-400 border border-neutral-900" />
                      <span className="ml-1 text-[10px] font-mono text-neutral-600 font-bold">
                        {tmpl.config.settings.user.github || 'developer'} / README.md
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-950 font-black flex items-center gap-1 bg-[#ffe600] px-1.5 py-0.5 rounded border border-neutral-900 shadow-2xs">
                      <Eye className="w-3 h-3" /> Preview
                    </span>
                  </div>

                  {TEMPLATE_PREVIEWS[tmpl.id] ? (
                    <div className="relative rounded-lg overflow-hidden border border-neutral-900 bg-white max-h-48 group-hover/preview:scale-[1.01] transition-transform">
                      <img
                        src={TEMPLATE_PREVIEWS[tmpl.id]}
                        alt={`${tmpl.name} Visual Preview`}
                        className="w-full h-40 object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2 p-2.5 rounded-lg bg-white border border-neutral-900 font-mono">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs border border-neutral-900 shadow-2xs"
                          style={{
                            backgroundColor: tmpl.accent,
                            color: '#ffffff',
                          }}
                        >
                          {tmpl.config.settings.user.name?.[0] || 'D'}
                        </div>
                        <div className="overflow-hidden flex-1">
                          <p className="text-xs font-bold text-neutral-950 truncate">
                            {tmpl.config.settings.user.name || 'Developer'}
                          </p>
                          <p className="text-[10px] text-neutral-600 truncate">
                            {tmpl.config.settings.user.role || 'Software Engineer'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => handleCopyPrompt(tmpl)}
                  title="Copy AI Prompt"
                  className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-black border-2 border-neutral-900 transition-all cursor-pointer ${
                    isCopied
                      ? 'bg-emerald-400 text-neutral-950 shadow-[2px_2px_0px_#18181b]'
                      : 'bg-[#ffe600] hover:bg-[#ffdf00] text-neutral-950 shadow-[2px_2px_0px_#18181b] active:translate-x-[1px] active:translate-y-[1px]'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <CheckCheck className="w-3.5 h-3.5 text-neutral-950" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Copy AI Prompt</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenPreview(tmpl)}
                  title="Preview Template"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold bg-white hover:bg-neutral-100 border-2 border-neutral-900 text-neutral-950 shadow-[2px_2px_0px_#18181b] transition-all cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 space-y-3 bg-white border-2 border-neutral-900 rounded-2xl p-8">
          <p className="text-sm font-mono text-neutral-600">No archetypes matched your search &quot;{searchQuery}&quot;.</p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-[#ffe600] text-neutral-950 font-mono text-xs font-black border-2 border-neutral-900 shadow-2xs hover:bg-[#ffdf00]"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* ========================================================
          FULL INTERACTIVE PREVIEW & CUSTOMIZE MODAL
          ======================================================== */}
      {mounted && previewTemplate && previewConfig && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white border-2 border-neutral-900 rounded-3xl shadow-[8px_8px_0px_#18181b] flex flex-col overflow-hidden text-neutral-950">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b-2 border-neutral-900">
              <div className="flex items-center gap-3">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-neutral-900"
                  style={{ backgroundColor: previewTemplate.accent }}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-neutral-950 uppercase font-sans">
                      {previewTemplate.name}
                    </h3>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-2xs">
                      {previewTemplate.category}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 font-mono line-clamp-1">{previewTemplate.description}</p>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  setPreviewTemplate(null);
                  setPreviewConfig(null);
                }}
                className="p-1.5 rounded-xl border-2 border-neutral-900 bg-white hover:bg-[#ffe600] text-neutral-950 transition-colors shadow-2xs cursor-pointer"
                title="Close preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs Bar */}
            <div className="flex items-center gap-2 px-6 py-2.5 bg-neutral-50 border-b-2 border-neutral-900 text-xs font-mono font-bold overflow-x-auto">
              <button
                type="button"
                onClick={() => setPreviewTab('visual')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 transition-all cursor-pointer ${
                  previewTab === 'visual'
                    ? 'bg-[#ffe600] text-neutral-950 border-neutral-900 shadow-[2px_2px_0px_#18181b] font-black'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Visual Preview</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewTab('markdown')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 transition-all cursor-pointer ${
                  previewTab === 'markdown'
                    ? 'bg-[#ffe600] text-neutral-950 border-neutral-900 shadow-[2px_2px_0px_#18181b] font-black'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-900'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Markdown Output</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewTab('prompt')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 transition-all cursor-pointer ${
                  previewTab === 'prompt'
                    ? 'bg-[#ffe600] text-neutral-950 border-neutral-900 shadow-[2px_2px_0px_#18181b] font-black'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Generator Prompt</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewTab('plugins')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 transition-all cursor-pointer ${
                  previewTab === 'plugins'
                    ? 'bg-[#ffe600] text-neutral-950 border-neutral-900 shadow-[2px_2px_0px_#18181b] font-black'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Manage Plugins ({previewConfig.sections.length})</span>
              </button>
            </div>

            {/* Modal Content Scroll Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-[#fafafa]">
              {/* TAB 1: Visual Simulated GitHub Profile */}
              {previewTab === 'visual' && (
                <div className="space-y-4">
                  {/* High-Fidelity Asset Banner if available */}
                  {TEMPLATE_PREVIEWS[previewTemplate.id] && (
                    <div className="rounded-2xl overflow-hidden border-2 border-neutral-900 bg-white p-3 shadow-[3px_3px_0px_#18181b] space-y-2">
                      <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-neutral-200">
                        <span className="text-xs font-mono text-neutral-950 font-black flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-amber-500" /> High-Fidelity Showcase
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-950 border border-neutral-900 font-bold">
                          100% Camo Compliant
                        </span>
                      </div>
                      <img
                        src={TEMPLATE_PREVIEWS[previewTemplate.id]}
                        alt={`${previewTemplate.name} Showcase`}
                        className="w-full h-auto object-contain rounded-lg max-h-[380px] mx-auto"
                      />
                    </div>
                  )}

                  {/* macOS Profile Header Box */}
                  <div className="rounded-2xl border-2 border-neutral-900 bg-white p-6 space-y-4 shadow-[4px_4px_0px_#18181b]">
                    <div className="flex items-center justify-between pb-3 border-b-2 border-neutral-900">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-400 border border-neutral-900" />
                        <span className="w-3 h-3 rounded-full bg-[#ffe600] border border-neutral-900" />
                        <span className="w-3 h-3 rounded-full bg-emerald-400 border border-neutral-900" />
                        <span className="ml-2 font-mono text-xs font-bold text-neutral-600">
                          {previewConfig.settings.user.github || 'developer'} / README.md
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-[#ffe600] text-neutral-950 border border-neutral-900 shadow-2xs">
                        ● 60FPS CAMO SAFE
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-2xl font-black text-neutral-950 font-sans tracking-tight">
                        Hi there, I&apos;m {previewConfig.settings.user.name} 👋
                      </h4>
                      <div>
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-[#ffe600] text-neutral-950 font-mono text-xs font-black border border-neutral-900 shadow-2xs">
                          {previewConfig.settings.user.role}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-800 font-mono pt-1 leading-relaxed max-w-2xl">
                        {previewConfig.settings.user.bio}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono font-bold">
                      {previewConfig.settings.user.location && (
                        <span className="px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-900 border border-neutral-900 shadow-2xs">
                          📍 Based in <b>{previewConfig.settings.user.location}</b>
                        </span>
                      )}
                      {previewConfig.settings.user.status && (
                        <span className="px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-900 border border-neutral-900 shadow-2xs">
                          🔭 Currently: <b>{previewConfig.settings.user.status}</b>
                        </span>
                      )}
                      {previewConfig.settings.user.pronouns && (
                        <span className="px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-900 border border-neutral-900 shadow-2xs">
                          💬 Pronouns: <b>{previewConfig.settings.user.pronouns}</b>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Plugins Simulated Cards */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-mono uppercase tracking-wider text-neutral-950 font-black">
                      Active Telemetry Modules &amp; SVGs ({previewConfig.sections.length})
                    </h5>

                    {previewConfig.sections.length === 0 ? (
                      <div className="p-6 rounded-2xl border-2 border-dashed border-neutral-900 text-center text-xs font-mono text-neutral-600 bg-white">
                        This archetype is ultra-minimalist and relies purely on clean bio, markdown lists, and typography.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {previewConfig.sections.map(sec => (
                          <div key={sec.id} className="relative group/sec">
                            {renderModuleVisual(sec)}
                            <button
                              type="button"
                              onClick={() => handleRemovePluginFromPreview(sec.id)}
                              className="absolute top-3 right-3 p-1 rounded-lg bg-red-100 hover:bg-red-500 hover:text-white text-red-700 border border-neutral-900 text-xs font-mono transition-colors shadow-2xs"
                              title="Remove plugin from this preview"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: Raw Markdown Source */}
              {previewTab === 'markdown' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-neutral-700">Generated Markdown Output</span>
                    <button
                      type="button"
                      onClick={() => {
                        if (typeof navigator !== 'undefined' && navigator.clipboard) {
                          navigator.clipboard.writeText(previewMarkdown);
                          setCopiedMarkdown(true);
                          showToast('Markdown copied to clipboard!');
                          try {
                            confetti({ particleCount: 25, spread: 50, origin: { y: 0.8 }, colors: ['#ffe600', '#10b981'] });
                          } catch {
                            // Ignored
                          }
                          setTimeout(() => setCopiedMarkdown(false), 2200);
                        }
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-neutral-900 bg-[#ffe600] text-neutral-950 font-mono text-xs font-black shadow-2xs hover:bg-[#ffdf00]"
                    >
                      {copiedMarkdown ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied Markdown!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Markdown</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-5 rounded-2xl bg-white border-2 border-neutral-900 text-xs text-neutral-900 font-mono overflow-x-auto whitespace-pre-wrap max-h-96 select-all leading-relaxed shadow-[3px_3px_0px_#18181b]">
                    {previewMarkdown}
                  </pre>
                </div>
              )}

              {/* TAB 3: AI Prompt */}
              {previewTab === 'prompt' && (
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-white border-2 border-neutral-900 shadow-[4px_4px_0px_#18181b] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-black uppercase text-neutral-950 font-mono">
                          AI Prompt for LLMs
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#ffe600] text-neutral-950 border border-neutral-900 font-bold">
                        Claude &bull; ChatGPT &bull; Gemini &bull; DeepSeek
                      </span>
                    </div>

                    <p className="text-xs text-neutral-800 leading-relaxed font-mono bg-neutral-50 p-4 rounded-xl border border-neutral-300 select-all">
                      {previewTemplate.prompt}
                    </p>

                    <button
                      type="button"
                      onClick={() => handleCopyPrompt(previewTemplate)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-mono font-black text-xs bg-[#ffe600] hover:bg-[#ffdf00] text-neutral-950 border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] active:translate-x-[1px] active:translate-y-[1px]"
                    >
                      {copiedPromptId === previewTemplate.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Prompt Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Prompt for AI</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 4: Manage Plugins */}
              {previewTab === 'plugins' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-mono font-black text-neutral-950 uppercase">
                        Active Plugins in this Archetype ({previewConfig.sections.length})
                      </h4>
                      <p className="text-[11px] font-mono text-neutral-600">
                        Remove plugins to customize before applying to your profile.
                      </p>
                    </div>
                    {previewConfig.sections.length < previewTemplate.config.sections.length && (
                      <button
                        type="button"
                        onClick={handleResetPreviewPlugins}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#ffe600] text-neutral-950 font-mono text-xs font-black border border-neutral-900 shadow-2xs hover:bg-[#ffdf00]"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Restore All Plugins</span>
                      </button>
                    )}
                  </div>

                  {previewConfig.sections.length === 0 ? (
                    <div className="p-8 rounded-2xl border-2 border-dashed border-neutral-900 text-center space-y-3 bg-white">
                      <p className="text-xs font-mono text-neutral-600">All plugins have been removed from this preview.</p>
                      <button
                        type="button"
                        onClick={handleResetPreviewPlugins}
                        className="px-4 py-2 rounded-xl bg-[#ffe600] text-neutral-950 font-mono text-xs font-black border-2 border-neutral-900 shadow-2xs hover:bg-[#ffdf00]"
                      >
                        Restore Plugins
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {previewConfig.sections.map((sec, idx) => (
                        <div
                          key={sec.id}
                          className="flex items-center justify-between p-3.5 rounded-xl bg-white border-2 border-neutral-900 shadow-2xs"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-neutral-100 border border-neutral-900 flex items-center justify-center font-mono text-[11px] text-neutral-950 font-black">
                              {idx + 1}
                            </span>
                            <div>
                              <span className="text-xs font-black text-neutral-950 font-mono uppercase">
                                {sec.type}
                              </span>
                              <p className="text-[10px] text-neutral-500 font-mono">
                                ID: {sec.id}
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemovePluginFromPreview(sec.id)}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-100 hover:bg-red-500 hover:text-white text-red-700 border border-neutral-900 text-xs font-mono transition-colors shadow-2xs"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-white border-t-2 border-neutral-900">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyPrompt(previewTemplate)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold border-2 border-neutral-900 bg-white hover:bg-neutral-100 text-neutral-950 shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Copy Prompt</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (typeof navigator !== 'undefined' && navigator.clipboard) {
                      navigator.clipboard.writeText(previewMarkdown);
                      setCopiedMarkdown(true);
                      showToast('Markdown copied to clipboard!');
                      setTimeout(() => setCopiedMarkdown(false), 2000);
                    }
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold border-2 border-neutral-900 bg-white hover:bg-neutral-100 text-neutral-950 shadow-2xs"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Markdown</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleMergeFromPreview}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 font-mono text-xs font-bold border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b]"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Add to My Profile</span>
                </button>

                <button
                  type="button"
                  onClick={handleApplyFromPreview}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#ffe600] hover:bg-[#ffdf00] text-neutral-950 font-mono text-xs font-black border-2 border-neutral-900 shadow-[3px_3px_0px_#18181b] active:translate-x-[1px] active:translate-y-[1px]"
                >
                  <Check className="w-4 h-4" />
                  <span>Apply Template</span>
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default TemplateGallery;

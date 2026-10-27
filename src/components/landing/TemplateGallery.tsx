'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useReadmeStore } from '#/store/useReadmeStore';
import { ReadmeConfig } from '#/lib/plugins/types';
import { buildMarkdown } from '#/lib/buildMarkdown';
import confetti from 'canvas-confetti';
import {
  Check,
  ArrowRight,
  LayoutTemplate,
  Sparkles,
  Copy,
  Eye,
  X,
  Plus,
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
  'metrics-telemetry-dashboard': '/assets/about-me-telemetry.svg',
};

export const TemplateGallery: React.FC = () => {
  const setEntireConfig = useReadmeStore(state => state.setEntireConfig);

  const [appliedId, setAppliedId] = useState<string | null>(null);
  const [mergedId, setMergedId] = useState<string | null>(null);
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

  // Apply template (replaces entire config & copies markdown)
  const handleApply = (template: TemplateItem) => {
    setEntireConfig(template.config);
    setAppliedId(template.id);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: [template.accent, '#8b5cf6', '#06b6d4'],
      });
    } catch {
      // Ignored
    }

    const md = buildMarkdown(template.config);
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(md);
      showToast(`Template "${template.name}" applied & Markdown copied!`);
    } else {
      showToast(`Template "${template.name}" applied to your profile!`);
    }

    setTimeout(() => {
      setAppliedId(null);
    }, 1500);
  };

  // Merge template (appends sections to existing user config)
  const handleMerge = (template: TemplateItem) => {
    const current = useReadmeStore.getState().config;
    const mergedSections = [...current.sections, ...template.config.sections];
    setEntireConfig({
      ...current,
      sections: mergedSections,
    });
    setMergedId(template.id);
    showToast(`${template.config.sections.length} plugin(s) from "${template.name}" added to your profile!`);

    try {
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#10b981', '#3b82f6', template.accent],
      });
    } catch {
      // Ignored
    }

    setTimeout(() => {
      setMergedId(null);
    }, 1500);
  };

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
          colors: ['#fbbf24', '#34d399', '#38bdf8', '#818cf8'],
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
    // Deep clone to allow removing plugins in preview without mutating constant
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
    <section className="py-14 px-4 max-w-7xl mx-auto space-y-8 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-neutral-900/95 border border-violet-500/50 text-white text-xs font-medium shadow-2xl backdrop-blur-md animate-fade-in">
          <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header with Dynamic Text Animation */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-violet-300 text-xs font-semibold backdrop-blur-md shadow-sm">
          <LayoutTemplate className="w-3.5 h-3.5 text-violet-400" />
          <span>Curated Starters & Archetypes</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-emerald-400 font-mono">{TEMPLATES.length} Ready-to-Ship</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-100 tracking-tight">
          Curated Starter Archetypes
        </h2>

        {/* Animated Subtitle */}
        <p className="text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          One-click apply clean, structured templates designed to{' '}
          <span
            className={`font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 transition-opacity duration-300 ${
              fadeKeyword ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {KEYWORDS[keywordIdx]}
          </span>
          .
        </p>

        {/* Search & Filter Bar */}
        <div className="pt-3 max-w-md mx-auto">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by archetype, tech stack, or keyword..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-neutral-500 hover:text-neutral-300"
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
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-900/30 scale-100'
                  : 'bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800'
              } active:scale-95`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-white/20 text-white' : 'bg-neutral-800 text-neutral-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
        {filtered.map(tmpl => {
          const isApplied = appliedId === tmpl.id;
          const isMerged = mergedId === tmpl.id;
          const isCopied = copiedPromptId === tmpl.id;

          return (
            <div
              key={tmpl.id}
              className="hover-lift relative p-6 rounded-2xl bg-neutral-900/70 hover:bg-neutral-900/95 border border-white/[0.08] hover:border-violet-500/50 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-[0_12px_40px_rgba(139,92,246,0.18)] overflow-hidden"
            >
              {/* Dynamic Accent Top Line */}
              <div
                className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-300 opacity-60 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(90deg, transparent, ${tmpl.accent}, transparent)`,
                }}
              />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-neutral-800/90 text-neutral-300 border border-neutral-700/60 font-semibold">
                    {tmpl.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full shadow-sm animate-pulse"
                      style={{ backgroundColor: tmpl.accent }}
                    />
                    <span className="text-[10px] font-mono text-neutral-500 uppercase">{tmpl.accent}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-neutral-100 group-hover:text-violet-300 transition-colors">
                  {tmpl.name}
                </h3>

                <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                  {tmpl.description}
                </p>

                {/* Visual Preview Window (Above) */}
                <div
                  onClick={() => handleOpenPreview(tmpl)}
                  className="my-3 rounded-xl border border-neutral-800/80 bg-neutral-950/80 p-2.5 hover:border-violet-500/50 cursor-pointer transition-all group/preview relative overflow-hidden shadow-inner"
                >
                  {/* macOS Window Controls */}
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800/60">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                      <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                      <span className="ml-1 text-[10px] font-mono text-neutral-500">
                        {tmpl.config.settings.user.github || 'developer'} / README.md
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-violet-400 opacity-80 group-hover/preview:opacity-100 transition-opacity flex items-center gap-1 bg-violet-950/40 px-1.5 py-0.5 rounded border border-violet-500/30">
                      <Eye className="w-3 h-3 text-cyan-400" /> Preview
                    </span>
                  </div>

                  {TEMPLATE_PREVIEWS[tmpl.id] ? (
                    <div className="relative rounded-lg overflow-hidden bg-neutral-950/90 border border-neutral-800/60 max-h-48 group-hover/preview:border-violet-500/30 transition-all">
                      <img
                        src={TEMPLATE_PREVIEWS[tmpl.id]}
                        alt={`${tmpl.name} Visual Preview`}
                        className="w-full h-44 object-cover object-top transition-transform duration-500 group-hover/preview:scale-[1.02]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent opacity-60 pointer-events-none" />
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-neutral-300 pointer-events-none">
                        <span className="bg-neutral-900/90 backdrop-blur-sm px-2 py-0.5 rounded border border-neutral-700/60 text-cyan-300">
                          {tmpl.category} Archetype
                        </span>
                        <span className="bg-neutral-900/90 backdrop-blur-sm px-2 py-0.5 rounded border border-neutral-700/60 text-neutral-400">
                          Click to inspect
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* High-Fidelity Simulated Profile Header */
                    <div className="space-y-2 p-2 rounded-lg bg-neutral-900/50 border border-neutral-800/60">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shadow-sm"
                          style={{
                            backgroundColor: `${tmpl.accent}25`,
                            color: tmpl.accent,
                            border: `1px solid ${tmpl.accent}60`,
                          }}
                        >
                          {tmpl.config.settings.user.name?.[0] || 'D'}
                        </div>
                        <div className="overflow-hidden flex-1">
                          <p className="text-xs font-bold text-neutral-100 truncate">
                            {tmpl.config.settings.user.name || 'Developer'}
                          </p>
                          <p className="text-[10px] font-mono text-neutral-400 truncate">
                            {tmpl.config.settings.user.role || 'Software Engineer'}
                          </p>
                        </div>
                      </div>

                      {/* Mini badges simulation */}
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {tmpl.config.sections.slice(0, 3).map(sec => (
                          <span
                            key={sec.id}
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-400"
                          >
                            {sec.type}
                          </span>
                        ))}
                        {tmpl.config.sections.length > 3 && (
                          <span className="text-[9px] font-mono px-1 py-0.5 text-neutral-500">
                            +{tmpl.config.sections.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* AI Prompt Drawer (Prompt Below to Make It) */}
                <div className="mt-2.5 p-2.5 rounded-xl bg-neutral-950/90 border border-neutral-800/80 hover:border-amber-500/30 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" /> Prompt to Make It
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyPrompt(tmpl);
                      }}
                      className="text-[10px] font-mono text-neutral-400 hover:text-amber-300 transition-colors flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 hover:border-amber-500/40"
                    >
                      {isCopied ? <CheckCheck className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-neutral-300 font-mono line-clamp-3 leading-relaxed bg-neutral-900/60 p-2 rounded-lg border border-neutral-800/60 select-all">
                    {tmpl.prompt}
                  </p>
                </div>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="pt-4 mt-5 border-t border-neutral-800/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-500 font-mono font-medium">
                    {tmpl.config.sections.length} plugin{tmpl.config.sections.length === 1 ? '' : 's'} configured
                  </span>

                  <div className="flex items-center gap-1.5">
                    {/* Copy Prompt Button */}
                    <button
                      type="button"
                      onClick={() => handleCopyPrompt(tmpl)}
                      title="Copy AI Prompt"
                      className={`relative p-1.5 rounded-lg border transition-all overflow-hidden ${
                        isCopied
                          ? 'animate-copy-pop bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.4)]'
                          : 'bg-neutral-800/90 hover:bg-neutral-700 text-neutral-400 hover:text-amber-300 border-neutral-700/50'
                      }`}
                    >
                      {/* Specular gleam on copied */}
                      {isCopied && (
                        <span className="absolute inset-0 overflow-hidden pointer-events-none">
                          <span className="absolute inset-0 -translate-x-full animate-copy-gleam bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                        </span>
                      )}
                      {isCopied ? (
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-300 animate-check-spring drop-shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
                      ) : (
                        <Sparkles className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {/* Preview Button */}
                    <button
                      type="button"
                      onClick={() => handleOpenPreview(tmpl)}
                      title="Preview Template"
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-800/90 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700/50 text-xs font-medium transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Preview</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {/* Merge into Current Profile */}
                  <button
                    type="button"
                    onClick={() => handleMerge(tmpl)}
                    title="Add sections to your current profile without replacing bio"
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 border border-neutral-700/60 text-neutral-300 hover:text-white transition-all active:scale-95"
                  >
                    {isMerged ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> Merged!
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Add to Profile</span>
                      </>
                    )}
                  </button>

                  {/* Apply Template */}
                  <button
                    type="button"
                    onClick={() => handleApply(tmpl)}
                    className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 duration-200 ${
                      isApplied
                        ? 'bg-emerald-600 text-white shadow-emerald-900/40'
                        : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-violet-900/30'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" /> Applied!
                      </>
                    ) : (
                      <>
                        <span>Apply</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 space-y-3">
          <p className="text-sm text-neutral-400">No archetypes matched your search query "{searchQuery}".</p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
        >
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-neutral-900 border border-neutral-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-neutral-950 border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full shadow-sm animate-pulse"
                  style={{ backgroundColor: previewTemplate.accent }}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-neutral-100">{previewTemplate.name}</h3>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-semibold border border-neutral-700">
                      {previewTemplate.category}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 line-clamp-1">{previewTemplate.description}</p>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  setPreviewTemplate(null);
                  setPreviewConfig(null);
                }}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                title="Close preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs Bar */}
            <div className="flex items-center gap-2 px-6 py-2.5 bg-neutral-950/60 border-b border-neutral-800 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setPreviewTab('visual')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  previewTab === 'visual'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Visual Preview</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewTab('markdown')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  previewTab === 'markdown'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Markdown Output</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewTab('prompt')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  previewTab === 'prompt'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>AI Generator Prompt</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewTab('plugins')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  previewTab === 'plugins'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Manage Plugins ({previewConfig.sections.length})</span>
              </button>
            </div>

            {/* Modal Content Scroll Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* TAB 1: Visual Simulated GitHub Profile */}
              {previewTab === 'visual' && (
                <div className="space-y-4">
                  {/* Dedicated Masterpiece Graphic Preview if Available */}
                  {TEMPLATE_PREVIEWS[previewTemplate.id] && (
                    <div className="rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 p-2 shadow-2xl space-y-2">
                      <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-neutral-800/80">
                        <span className="text-xs font-mono text-cyan-400 font-semibold flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5" /> High-Fidelity Archetype Showcase
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          Camo-Compliant 60fps
                        </span>
                      </div>
                      <img
                        src={TEMPLATE_PREVIEWS[previewTemplate.id]}
                        alt={`${previewTemplate.name} Masterpiece`}
                        className="w-full h-auto object-contain rounded-lg max-h-[550px] mx-auto"
                      />
                    </div>
                  )}

                  {/* macOS Profile Header Box */}
                  <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5 space-y-3 shadow-inner">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500/80" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <span className="w-3 h-3 rounded-full bg-green-500/80" />
                        <span className="ml-2 font-mono text-xs text-neutral-400">
                          {previewConfig.settings.user.github || 'developer'} / README.md
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        Live Preview
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xl font-bold text-neutral-100">
                        Hi there, I'm {previewConfig.settings.user.name} 👋
                      </h4>
                      <p className="text-sm font-semibold text-violet-400 font-mono">
                        {previewConfig.settings.user.role}
                      </p>
                      <p className="text-xs text-neutral-300 pt-1 leading-relaxed">
                        {previewConfig.settings.user.bio}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2 text-xs text-neutral-400 font-mono">
                      {previewConfig.settings.user.location && (
                        <span>📍 Based in <b>{previewConfig.settings.user.location}</b></span>
                      )}
                      {previewConfig.settings.user.status && (
                        <span>🔭 <b>{previewConfig.settings.user.status}</b></span>
                      )}
                      {previewConfig.settings.user.pronouns && (
                        <span>💬 Pronouns: <b>{previewConfig.settings.user.pronouns}</b></span>
                      )}
                    </div>
                  </div>

                  {/* Plugins Simulated Cards */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                      Included Profile Modules ({previewConfig.sections.length})
                    </h5>

                    {previewConfig.sections.length === 0 ? (
                      <div className="p-4 rounded-xl border border-dashed border-neutral-800 text-center text-xs text-neutral-500">
                        This archetype is ultra-minimalist and relies purely on clean bio, markdown lists, and typography.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {previewConfig.sections.map(sec => (
                          <div
                            key={sec.id}
                            className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-between"
                          >
                            <div className="space-y-0.5">
                              <span className="font-mono text-xs font-bold text-violet-300">
                                {sec.type}
                              </span>
                              <p className="text-[10px] text-neutral-500 font-mono">
                                ID: {sec.id}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemovePluginFromPreview(sec.id)}
                              className="p-1 rounded text-neutral-500 hover:text-red-400 hover:bg-neutral-800 transition-colors"
                              title="Remove plugin from this preview"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* AI Prompt to Make It (Directly below preview) */}
                  <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Prompt to Make It
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyPrompt(previewTemplate)}
                        className="text-xs font-mono text-amber-200 hover:text-white transition-colors flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-900/60 border border-amber-600/50 hover:bg-amber-800/80"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Prompt</span>
                      </button>
                    </div>
                    <p className="text-xs text-neutral-200 font-mono leading-relaxed bg-neutral-950/90 p-3 rounded-lg border border-neutral-800 select-all">
                      {previewTemplate.prompt}
                    </p>
                    <p className="text-[11px] text-neutral-400">
                      💡 Tip: Copy and paste this prompt directly into Google Antigravity, Claude Code, Cursor, or ChatGPT to generate your customized GitHub README.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: Raw Markdown Source */}
              {previewTab === 'markdown' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400 font-mono">Generated Markdown Output</span>
                    <button
                      type="button"
                      onClick={() => {
                        if (typeof navigator !== 'undefined' && navigator.clipboard) {
                          navigator.clipboard.writeText(previewMarkdown);
                          setCopiedMarkdown(true);
                          showToast('Markdown copied to clipboard!');
                          try {
                            confetti({ particleCount: 25, spread: 50, origin: { y: 0.8 }, colors: ['#34d399', '#38bdf8'] });
                          } catch {
                            // Ignored
                          }
                          setTimeout(() => setCopiedMarkdown(false), 2200);
                        }
                      }}
                      className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all overflow-hidden ${
                        copiedMarkdown
                          ? 'animate-copy-pop bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.4)]'
                          : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-700'
                      }`}
                    >
                      {copiedMarkdown && (
                        <span className="absolute inset-0 overflow-hidden pointer-events-none">
                          <span className="absolute inset-0 -translate-x-full animate-copy-gleam bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                        </span>
                      )}
                      {copiedMarkdown ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-300 animate-check-spring" />
                          <span>Copied Markdown!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Copy Markdown</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 font-mono overflow-x-auto whitespace-pre-wrap max-h-80 select-all leading-relaxed">
                    {previewMarkdown}
                  </pre>
                </div>
              )}

              {/* TAB 3: AI Prompt */}
              {previewTab === 'prompt' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-violet-950/30 via-neutral-950 to-neutral-950 border border-violet-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold text-neutral-100">AI Prompt for LLMs</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                        Claude • ChatGPT • Gemini • DeepSeek
                      </span>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed font-sans bg-neutral-900/80 p-3 rounded-lg border border-neutral-800">
                      {previewTemplate.prompt}
                    </p>

                      <button
                        type="button"
                        onClick={() => handleCopyPrompt(previewTemplate)}
                        className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 overflow-hidden ${
                          copiedPromptId === previewTemplate.id
                            ? 'animate-copy-pop bg-emerald-500 text-neutral-950 shadow-[0_0_20px_rgba(52,211,153,0.5)]'
                            : 'bg-amber-500 hover:bg-amber-400 text-neutral-950'
                        }`}
                      >
                        {copiedPromptId === previewTemplate.id && (
                          <span className="absolute inset-0 overflow-hidden pointer-events-none">
                            <span className="absolute inset-0 -translate-x-full animate-copy-gleam bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                          </span>
                        )}
                        {copiedPromptId === previewTemplate.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 animate-check-spring" />
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
                      <h4 className="text-xs font-bold text-neutral-200">
                        Active Plugins in this Archetype ({previewConfig.sections.length})
                      </h4>
                      <p className="text-[11px] text-neutral-400">
                        Remove or toggle plugins to customize before applying to your profile.
                      </p>
                    </div>
                    {previewConfig.sections.length < previewTemplate.config.sections.length && (
                      <button
                        type="button"
                        onClick={handleResetPreviewPlugins}
                        className="flex items-center gap-1 px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300"
                      >
                        <RefreshCw className="w-3 h-3 text-cyan-400" />
                        <span>Restore All Plugins</span>
                      </button>
                    )}
                  </div>

                  {previewConfig.sections.length === 0 ? (
                    <div className="p-6 rounded-xl border border-dashed border-neutral-800 text-center space-y-2">
                      <p className="text-xs text-neutral-400">All plugins have been removed from this preview.</p>
                      <button
                        type="button"
                        onClick={handleResetPreviewPlugins}
                        className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold"
                      >
                        Restore Plugins
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {previewConfig.sections.map((sec, idx) => (
                        <div
                          key={sec.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-neutral-800 flex items-center justify-center font-mono text-[11px] text-neutral-400 font-bold">
                              {idx + 1}
                            </span>
                            <div>
                              <span className="text-xs font-bold text-violet-300 font-mono">
                                {sec.type}
                              </span>
                              <p className="text-[10px] text-neutral-500 font-mono">
                                {JSON.stringify(sec.props.content).slice(0, 70)}...
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemovePluginFromPreview(sec.id)}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs transition-colors"
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
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-neutral-950 border-t border-neutral-800">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyPrompt(previewTemplate)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all overflow-hidden ${
                    copiedPromptId === previewTemplate.id
                      ? 'animate-copy-pop bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.35)]'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border-neutral-700/60'
                  }`}
                >
                  {copiedPromptId === previewTemplate.id && (
                    <span className="absolute inset-0 overflow-hidden pointer-events-none">
                      <span className="absolute inset-0 -translate-x-full animate-copy-gleam bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    </span>
                  )}
                  {copiedPromptId === previewTemplate.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-amber-300 animate-check-spring" />
                      <span>Prompt Copied!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (typeof navigator !== 'undefined' && navigator.clipboard) {
                      navigator.clipboard.writeText(previewMarkdown);
                      setCopiedMarkdown(true);
                      showToast('Markdown copied to clipboard!');
                      try {
                        confetti({ particleCount: 25, spread: 50, origin: { y: 0.8 }, colors: ['#34d399', '#38bdf8'] });
                      } catch {
                        // Ignored
                      }
                      setTimeout(() => setCopiedMarkdown(false), 2200);
                    }
                  }}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all overflow-hidden ${
                    copiedMarkdown
                      ? 'animate-copy-pop bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.4)]'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border-neutral-700/60'
                  }`}
                >
                  {copiedMarkdown && (
                    <span className="absolute inset-0 overflow-hidden pointer-events-none">
                      <span className="absolute inset-0 -translate-x-full animate-copy-gleam bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    </span>
                  )}
                  {copiedMarkdown ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300 animate-check-spring" />
                      <span>Copied Markdown!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Copy Markdown</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2">
                {/* Append to existing profile */}
                <button
                  type="button"
                  onClick={handleMergeFromPreview}
                  title="Add sections from this template without overwriting your profile bio"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 text-xs font-bold transition-all active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Add to My Profile</span>
                </button>

                {/* Apply entire template */}
                <button
                  type="button"
                  onClick={handleApplyFromPreview}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-violet-900/40 transition-all active:scale-95"
                >
                  <Check className="w-3.5 h-3.5" />
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

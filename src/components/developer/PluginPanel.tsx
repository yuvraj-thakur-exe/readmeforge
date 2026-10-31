'use client';

import React, { useState, useMemo } from 'react';
import { pluginRegistry, getAllCategories } from '#/lib/plugins/registry';
import { Plugin } from '#/lib/plugins/types';
import { TEMPLATES, TemplateItem } from '#/components/landing/TemplateGallery';
import { useReadmeStore } from '#/store/useReadmeStore';
import {
  Search,
  Plus,
  Sparkles,
  Check,
  LayoutTemplate,
  FileCode2,
  Copy,
  ExternalLink,
  Bot,
  Sliders,
} from 'lucide-react';

interface PluginPanelProps {
  className?: string;
  onPluginInserted?: (pluginId: string) => void;
}

export const PluginPanel: React.FC<PluginPanelProps> = ({
  className = '',
  onPluginInserted,
}) => {
  const config = useReadmeStore(state => state.config);
  const addSection = useReadmeStore(state => state.addSection);
  const setEntireConfig = useReadmeStore(state => state.setEntireConfig);

  const [panelTab, setPanelTab] = useState<'plugins' | 'templates' | 'schema'>('plugins');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [insertedPluginId, setInsertedPluginId] = useState<string | null>(null);
  const [appliedTemplateId, setAppliedTemplateId] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const categories = useMemo(() => ['all', ...getAllCategories()], []);

  const templateCategories = useMemo(() => {
    const set = new Set<string>();
    TEMPLATES.forEach(t => set.add(t.category));
    return ['all', ...Array.from(set)];
  }, []);

  const filteredPlugins = useMemo(() => {
    return pluginRegistry.filter(plugin => {
      const matchesSearch =
        plugin.name.toLowerCase().includes(search.toLowerCase()) ||
        plugin.description.toLowerCase().includes(search.toLowerCase()) ||
        Boolean(plugin.tags?.some(t => t.toLowerCase().includes(search.toLowerCase())));

      const matchesCategory =
        selectedCategory === 'all' || plugin.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter(tmpl => {
      const matchesSearch =
        tmpl.name.toLowerCase().includes(search.toLowerCase()) ||
        tmpl.description.toLowerCase().includes(search.toLowerCase()) ||
        tmpl.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' ||
        tmpl.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const handleInsert = (plugin: Plugin) => {
    const defaultProps: Record<string, unknown> = {};
    const pluginAny = plugin as any;
    if (pluginAny.schema && typeof pluginAny.schema.parse === 'function') {
      try {
        const parsed = pluginAny.schema.parse({});
        Object.assign(defaultProps, parsed);
      } catch {
        // Fall back to empty props
      }
    }

    addSection(plugin.id, defaultProps);

    setInsertedPluginId(plugin.id);
    onPluginInserted?.(plugin.id);

    setTimeout(() => {
      setInsertedPluginId(null);
    }, 1800);
  };

  const handleApplyTemplate = (tmpl: TemplateItem) => {
    setEntireConfig(tmpl.config);
    setAppliedTemplateId(tmpl.id);
    setTimeout(() => {
      setAppliedTemplateId(null);
    }, 2000);
  };

  const handleCopyAiPrompt = async () => {
    const prompt = `You are an expert GitHub profile README architect. Below is a MonoForge configuration JSON object conforming to the official schema. Modify or enrich it according to the user request. Output ONLY valid JSON with zero conversational filler or markdown code blocks:

${JSON.stringify(config, null, 2)}`;

    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className={`flex flex-col h-full bg-white rounded-2xl border-2 border-neutral-900 overflow-hidden shadow-[4px_4px_0px_#18181b] ${className}`}>
      {/* Tab Switcher */}
      <div className="flex items-center border-b-2 border-neutral-900 bg-white p-1.5 gap-1 text-xs font-mono">
        <button
          type="button"
          onClick={() => {
            setPanelTab('plugins');
            setSelectedCategory('all');
          }}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
            panelTab === 'plugins'
              ? 'bg-[#ffe600] text-neutral-950 border-2 border-neutral-900 font-black shadow-[2px_2px_0px_#18181b]'
              : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>PLUGINS ({pluginRegistry.length})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setPanelTab('templates');
            setSelectedCategory('all');
          }}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
            panelTab === 'templates'
              ? 'bg-[#ffe600] text-neutral-950 border-2 border-neutral-900 font-black shadow-[2px_2px_0px_#18181b]'
              : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950'
          }`}
        >
          <LayoutTemplate className="w-3.5 h-3.5" />
          <span>TEMPLATES ({TEMPLATES.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setPanelTab('schema')}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
            panelTab === 'schema'
              ? 'bg-[#ffe600] text-neutral-950 border-2 border-neutral-900 font-black shadow-[2px_2px_0px_#18181b]'
              : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          <span>AI &amp; Schema</span>
        </button>
      </div>

      {/* PLUGINS TAB */}
      {panelTab === 'plugins' && (
        <>
          <div className="p-3 bg-neutral-50 border-b-2 border-neutral-900 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-neutral-700 font-mono font-bold">
                {filteredPlugins.length} plugins matching
              </span>
              <span className="text-[10px] text-amber-700 font-mono font-black uppercase">1-click insert</span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-neutral-500 select-none" />
              <input
                type="text"
                placeholder="Search badges, stats, widgets..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white border-2 border-neutral-900 rounded-lg text-xs font-mono font-bold text-neutral-950 placeholder:text-neutral-400 focus:outline-hidden focus:border-[#ffe600] shadow-2xs"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded capitalize whitespace-nowrap transition-colors border cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#ffe600] text-neutral-950 font-black border-neutral-900 shadow-2xs'
                      : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Plugin Cards List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-[#fafafa]">
            {filteredPlugins.length === 0 ? (
              <div className="text-center py-8 text-neutral-500 font-mono text-xs">
                No plugins match &quot;{search}&quot;
              </div>
            ) : (
              filteredPlugins.map(plugin => {
                const isJustInserted = insertedPluginId === plugin.id;

                return (
                  <div
                    key={plugin.id}
                    className="p-3.5 bg-white hover:bg-[#fffde6] border-2 border-neutral-900 rounded-xl transition-all flex flex-col justify-between shadow-[2px_2px_0px_#18181b] hover:shadow-[1px_1px_0px_#18181b] group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-black text-neutral-950 flex items-center gap-1.5 font-sans">
                            {plugin.name}
                            <span className="text-[10px] font-mono px-1.5 py-0.2 bg-neutral-100 text-neutral-800 border border-neutral-300 rounded">
                              v{plugin.version}
                            </span>
                          </h4>
                          <p className="text-[11px] text-neutral-700 mt-1 line-clamp-2 font-mono">
                            {plugin.description}
                          </p>
                        </div>
                      </div>

                      {/* Tags */}
                      {plugin.tags && plugin.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {plugin.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="text-[10px] px-1.5 py-0.5 bg-neutral-100 border border-neutral-300 text-neutral-800 rounded font-mono font-bold"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-neutral-200">
                      <span className="text-[10px] text-neutral-500 font-mono font-bold">
                        type: {plugin.id}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleInsert(plugin)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold border-2 border-neutral-900 shadow-2xs transition-all cursor-pointer ${
                          isJustInserted
                            ? 'bg-emerald-500 text-neutral-950 font-black'
                            : 'bg-white hover:bg-[#ffe600] text-neutral-950'
                        }`}
                      >
                        {isJustInserted ? (
                          <>
                            <Check className="w-3 h-3 text-neutral-950" /> Added
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3 text-neutral-950" /> Insert
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}

      {/* TEMPLATES TAB */}
      {panelTab === 'templates' && (
        <>
          <div className="p-3 bg-neutral-50 border-b-2 border-neutral-900 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-neutral-700 font-mono font-bold">
                {filteredTemplates.length} archetypes
              </span>
              <span className="text-[10px] text-cyan-700 font-mono font-black uppercase">Production Ready</span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-neutral-500 select-none" />
              <input
                type="text"
                placeholder="Search templates (e.g. minimalist, cyberpunk)..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white border-2 border-neutral-900 rounded-lg text-xs font-mono font-bold text-neutral-950 placeholder:text-neutral-400 focus:outline-hidden focus:border-[#ffe600] shadow-2xs"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
              {templateCategories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded capitalize whitespace-nowrap transition-colors border cursor-pointer ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-[#ffe600] text-neutral-950 font-black border-neutral-900 shadow-2xs'
                      : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-[#fafafa]">
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-8 text-neutral-500 font-mono text-xs">
                No templates match &quot;{search}&quot;
              </div>
            ) : (
              filteredTemplates.map(tmpl => {
                const isApplied = appliedTemplateId === tmpl.id;

                return (
                  <div
                    key={tmpl.id}
                    className="p-3.5 bg-white hover:bg-[#fffde6] border-2 border-neutral-900 rounded-xl transition-all flex flex-col justify-between shadow-[2px_2px_0px_#18181b] hover:shadow-[1px_1px_0px_#18181b] group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-black text-neutral-950 flex items-center gap-1.5 font-sans">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block border border-neutral-900"
                            style={{ backgroundColor: tmpl.accent }}
                          />
                          {tmpl.name}
                        </h4>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-neutral-100 border border-neutral-300 text-neutral-800 rounded font-bold">
                          {tmpl.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-700 mt-1 leading-relaxed font-mono">
                        {tmpl.description}
                      </p>
                      <div className="mt-2 text-[10px] font-mono font-bold text-neutral-500">
                        {tmpl.config.sections.length} sections · {tmpl.config.settings.badgeStyle} badges
                      </div>
                    </div>

                    <div className="flex items-center justify-end mt-3 pt-2.5 border-t border-neutral-200">
                      <button
                        type="button"
                        onClick={() => handleApplyTemplate(tmpl)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border-2 border-neutral-900 shadow-2xs transition-all cursor-pointer ${
                          isApplied
                            ? 'bg-emerald-500 text-neutral-950 font-black'
                            : 'bg-white hover:bg-[#ffe600] text-neutral-950'
                        }`}
                      >
                        {isApplied ? (
                          <>
                            <Check className="w-3 h-3 text-neutral-950" /> Archetype Applied!
                          </>
                        ) : (
                          <>
                            <Sliders className="w-3 h-3 text-neutral-950" /> Load Preset
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}

      {/* SCHEMA & AI TAB */}
      {panelTab === 'schema' && (
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs bg-[#fafafa]">
          {/* AI Context Card */}
          <div className="p-3.5 bg-white border-2 border-neutral-900 rounded-xl shadow-[2px_2px_0px_#18181b] space-y-2.5">
            <div className="flex items-center gap-2 text-neutral-950 font-black">
              <Bot className="w-4 h-4 text-amber-500" />
              <span>AI Agent Pairing</span>
            </div>
            <p className="text-[11px] text-neutral-700 leading-relaxed font-mono">
              Use this pre-engineered prompt with Claude Code, Cursor, ChatGPT, or Antigravity to generate custom sections or rewrite your profile safely.
            </p>
            <button
              type="button"
              onClick={handleCopyAiPrompt}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#ffe600] hover:bg-[#ffdf00] text-neutral-950 font-black border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] transition-all text-xs cursor-pointer"
            >
              {copiedPrompt ? (
                <>
                  <Check className="w-3.5 h-3.5 text-neutral-950" /> Prompt Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-950" /> Copy Agent Prompt with Config
                </>
              )}
            </button>
          </div>

          {/* Machine Links */}
          <div className="space-y-1.5">
            <h4 className="text-[11px] font-black text-neutral-950 uppercase tracking-wider font-mono">
              Machine Endpoints
            </h4>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="/llms.txt"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-[#fffde6] border-2 border-neutral-900 text-neutral-950 font-mono text-[11px] font-bold shadow-2xs transition-colors"
              >
                <span>/llms.txt</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-700" />
              </a>
              <a
                href="/llms-full.txt"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-[#fffde6] border-2 border-neutral-900 text-neutral-950 font-mono text-[11px] font-bold shadow-2xs transition-colors"
              >
                <span>/llms-full.txt</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-700" />
              </a>
              <a
                href="/api/schema"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-[#fffde6] border-2 border-neutral-900 text-neutral-950 font-mono text-[11px] font-bold shadow-2xs transition-colors"
              >
                <span>/api/schema (Draft-07)</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-700" />
              </a>
            </div>
          </div>

          {/* Schema Structure Overview */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-black text-neutral-950 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <FileCode2 className="w-3.5 h-3.5 text-amber-500" />
              <span>Config Schema Shape</span>
            </h4>
            <div className="bg-white p-3 rounded-xl border-2 border-neutral-900 font-mono text-[10px] text-neutral-800 leading-relaxed space-y-1 shadow-2xs">
              <div><span className="text-amber-600 font-bold">version</span>: string (&quot;1.0.0&quot;)</div>
              <div><span className="text-amber-600 font-bold">title</span>: string</div>
              <div><span className="text-amber-600 font-bold">settings</span>: &#123; user, theme, accentColor, badgeStyle, align &#125;</div>
              <div><span className="text-amber-600 font-bold">sections</span>: Array&lt;&#123; id, type, props &#125;&gt;</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PluginPanel;

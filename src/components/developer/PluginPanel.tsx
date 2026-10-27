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
        selectedCategory === 'all' || tmpl.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const handleInsert = (plugin: Plugin) => {
    const initialProps = {
      content: plugin.defaultConfig ?? {},
      styles: {},
      state: 'default',
    };

    addSection(plugin.id, initialProps);
    setInsertedPluginId(plugin.id);
    onPluginInserted?.(plugin.id);

    setTimeout(() => {
      setInsertedPluginId(null);
    }, 1500);
  };

  const handleApplyTemplate = (template: TemplateItem) => {
    setEntireConfig(template.config);
    setAppliedTemplateId(template.id);
    setTimeout(() => {
      setAppliedTemplateId(null);
    }, 2000);
  };

  const handleCopyAiPrompt = async () => {
    const prompt = `Act as a senior developer personal branding expert.
I am configuring my GitHub Profile README using ReadmeForge (https://readmeforge.vercel.app).

Machine-readable JSON schema is at: https://readmeforge.vercel.app/api/schema
Developer documentation: https://readmeforge.vercel.app/llms.txt

Here is my current profile configuration in ReadmeForge JSON format:
\`\`\`json
${JSON.stringify(config, null, 2)}
\`\`\`

Please update or enhance this JSON configuration:
1. Ensure all settings and sections follow the ReadmeForge JSON schema.
2. Incorporate modern developer badges, clean stat cards, and relevant skill tags.
3. Return ONLY valid, parseable JSON representing the complete ReadmeConfig object.`;

    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className={`flex flex-col h-full bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden ${className}`}>
      {/* Tab Switcher */}
      <div className="flex items-center border-b border-neutral-800 bg-neutral-950 px-2 pt-2 gap-1 text-xs font-medium">
        <button
          type="button"
          onClick={() => {
            setPanelTab('plugins');
            setSelectedCategory('all');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md transition-colors ${
            panelTab === 'plugins'
              ? 'bg-neutral-900 text-violet-400 border-t-2 border-violet-500 font-semibold'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Plugins ({pluginRegistry.length})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setPanelTab('templates');
            setSelectedCategory('all');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md transition-colors ${
            panelTab === 'templates'
              ? 'bg-neutral-900 text-violet-400 border-t-2 border-violet-500 font-semibold'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <LayoutTemplate className="w-3.5 h-3.5" />
          <span>Templates ({TEMPLATES.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setPanelTab('schema')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md transition-colors ${
            panelTab === 'schema'
              ? 'bg-neutral-900 text-violet-400 border-t-2 border-violet-500 font-semibold'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Bot className="w-3.5 h-3.5 text-cyan-400" />
          <span>AI & Schema</span>
        </button>
      </div>

      {/* PLUGINS TAB */}
      {panelTab === 'plugins' && (
        <>
          <div className="p-3 bg-neutral-950 border-b border-neutral-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-neutral-400 font-mono">
                {filteredPlugins.length} plugins matching
              </span>
              <span className="text-[10px] text-neutral-500">1-click insert</span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-neutral-500" />
              <input
                type="text"
                placeholder="Search badges, stats, widgets..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded capitalize whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-violet-600 text-white font-medium'
                      : 'bg-neutral-800/80 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Plugin Cards List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
            {filteredPlugins.length === 0 ? (
              <div className="text-center py-8 text-neutral-500 text-xs">
                No plugins match &quot;{search}&quot;
              </div>
            ) : (
              filteredPlugins.map(plugin => {
                const isJustInserted = insertedPluginId === plugin.id;

                return (
                  <div
                    key={plugin.id}
                    className="p-3 bg-neutral-950/70 hover:bg-neutral-950 border border-neutral-800/80 hover:border-neutral-700 rounded-lg transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-semibold text-neutral-100 flex items-center gap-1.5">
                            {plugin.name}
                            <span className="text-[10px] font-mono px-1.5 py-0.2 bg-neutral-800 text-neutral-400 rounded">
                              v{plugin.version}
                            </span>
                          </h4>
                          <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2">
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
                              className="text-[10px] px-1.5 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-400 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-neutral-800/60">
                      <span className="text-[10px] text-neutral-500 font-mono">
                        type: {plugin.id}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleInsert(plugin)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-all ${
                          isJustInserted
                            ? 'bg-emerald-600 text-white'
                            : 'bg-violet-600 hover:bg-violet-500 text-white'
                        }`}
                      >
                        {isJustInserted ? (
                          <>
                            <Check className="w-3 h-3" /> Added
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" /> Insert
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
          <div className="p-3 bg-neutral-950 border-b border-neutral-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-neutral-400 font-mono">
                {filteredTemplates.length} archetypes
              </span>
              <span className="text-[10px] text-violet-400">Production Ready</span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-neutral-500" />
              <input
                type="text"
                placeholder="Search templates (e.g. minimalist, cyberpunk)..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1 bg-neutral-900 border border-neutral-800 rounded text-xs text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
              {templateCategories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded capitalize whitespace-nowrap transition-colors ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-violet-600 text-white font-medium'
                      : 'bg-neutral-800/80 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-8 text-neutral-500 text-xs">
                No templates match &quot;{search}&quot;
              </div>
            ) : (
              filteredTemplates.map(tmpl => {
                const isApplied = appliedTemplateId === tmpl.id;

                return (
                  <div
                    key={tmpl.id}
                    className="p-3 bg-neutral-950/70 hover:bg-neutral-950 border border-neutral-800/80 hover:border-neutral-700 rounded-lg transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-semibold text-neutral-100 flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full inline-block"
                            style={{ backgroundColor: tmpl.accent }}
                          />
                          {tmpl.name}
                        </h4>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-neutral-800 text-neutral-400 rounded">
                          {tmpl.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                        {tmpl.description}
                      </p>
                      <div className="mt-2 text-[10px] font-mono text-neutral-500">
                        {tmpl.config.sections.length} sections · {tmpl.config.settings.badgeStyle} badges
                      </div>
                    </div>

                    <div className="flex items-center justify-end mt-3 pt-2.5 border-t border-neutral-800/60">
                      <button
                        type="button"
                        onClick={() => handleApplyTemplate(tmpl)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-all ${
                          isApplied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-violet-600/80 hover:bg-violet-600 text-white'
                        }`}
                      >
                        {isApplied ? (
                          <>
                            <Check className="w-3 h-3" /> Archetype Applied!
                          </>
                        ) : (
                          <>
                            <Sliders className="w-3 h-3" /> Load Preset
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
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
          {/* AI Context Card */}
          <div className="p-3 bg-neutral-950 border border-violet-900/40 rounded-lg space-y-2.5">
            <div className="flex items-center gap-2 text-violet-300 font-semibold">
              <Bot className="w-4 h-4 text-violet-400" />
              <span>AI Agent Pairing</span>
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Use this pre-engineered prompt with Claude 3.7, Cursor, ChatGPT, or Antigravity to generate custom sections or rewrite your profile safely.
            </p>
            <button
              type="button"
              onClick={handleCopyAiPrompt}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors text-xs"
            >
              {copiedPrompt ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Prompt Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy Agent Prompt with Config
                </>
              )}
            </button>
          </div>

          {/* Machine Links */}
          <div className="space-y-1.5">
            <h4 className="text-[11px] font-semibold text-neutral-300 uppercase tracking-wider">
              Machine Endpoints
            </h4>
            <div className="grid grid-cols-1 gap-1.5">
              <a
                href="/llms.txt"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2 rounded bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-colors"
              >
                <span className="font-mono text-[11px]">/llms.txt</span>
                <ExternalLink className="w-3 h-3 text-neutral-500" />
              </a>
              <a
                href="/llms-full.txt"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2 rounded bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-colors"
              >
                <span className="font-mono text-[11px]">/llms-full.txt</span>
                <ExternalLink className="w-3 h-3 text-neutral-500" />
              </a>
              <a
                href="/api/schema"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2 rounded bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-colors"
              >
                <span className="font-mono text-[11px]">/api/schema (Draft-07)</span>
                <ExternalLink className="w-3 h-3 text-neutral-500" />
              </a>
            </div>
          </div>

          {/* Schema Structure Overview */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
              <FileCode2 className="w-3.5 h-3.5 text-violet-400" />
              <span>Config Schema Shape</span>
            </h4>
            <div className="bg-neutral-950 p-2.5 rounded border border-neutral-800 font-mono text-[10px] text-neutral-400 leading-relaxed space-y-1">
              <div><span className="text-violet-400">version</span>: string (&quot;1.0.0&quot;)</div>
              <div><span className="text-violet-400">title</span>: string</div>
              <div><span className="text-violet-400">settings</span>: &#123; user, theme, accentColor, badgeStyle, align &#125;</div>
              <div><span className="text-violet-400">sections</span>: Array&lt;&#123; id, type, props &#125;&gt;</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PluginPanel;

'use client';

import React, { useState, useMemo } from 'react';
import { pluginRegistry, getAllCategories } from '#/lib/plugins/registry';
import { Plugin, PluginCategory } from '#/lib/plugins/types';
import { useReadmeStore } from '#/store/useReadmeStore';
import { Search, Plus, Sparkles, Check, ExternalLink } from 'lucide-react';

interface PluginPanelProps {
  className?: string;
  onPluginInserted?: (pluginId: string) => void;
}

export const PluginPanel: React.FC<PluginPanelProps> = ({
  className = '',
  onPluginInserted,
}) => {
  const addSection = useReadmeStore(state => state.addSection);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [insertedPluginId, setInsertedPluginId] = useState<string | null>(null);

  const categories = useMemo(() => ['all', ...getAllCategories()], []);

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

  const handleInsert = (plugin: Plugin) => {
    // Generate default initial props from schema if available
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

  return (
    <div className={`flex flex-col h-full bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-3 bg-neutral-950 border-b border-neutral-800 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Plugin Registry
            </h3>
          </div>
          <span className="text-[11px] text-neutral-500 font-mono">
            {pluginRegistry.length} available
          </span>
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
                  <span className="text-[10px] text-neutral-500">
                    by {plugin.author}
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
    </div>
  );
};

export default PluginPanel;

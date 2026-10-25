import { Plugin, PluginCategory } from './types';
import { githubReadmeStatsPlugin } from './wrappers/github-readme-stats';
import { githubProfileTrophyPlugin } from './wrappers/github-profile-trophy';
import { readmeTypingSvgPlugin } from './wrappers/readme-typing-svg';
import { snkPlugin } from './wrappers/snk';
import { wakaReadmeStatsPlugin } from './wrappers/waka-readme-stats';
import { markdownBadgesPlugin } from './wrappers/markdown-badges';
import { visitorCounterPlugin } from './wrappers/visitor-counter';
import { portfolioContributionsPlugin } from './wrappers/portfolio-contributions';

export const pluginRegistry: Plugin[] = [
  readmeTypingSvgPlugin,
  githubReadmeStatsPlugin,
  githubProfileTrophyPlugin,
  snkPlugin,
  markdownBadgesPlugin,
  wakaReadmeStatsPlugin,
  visitorCounterPlugin,
  portfolioContributionsPlugin,
];

export const getPluginById = (id: string): Plugin | undefined => {
  return pluginRegistry.find(p => p.id === id);
};

export const getPluginsByCategory = (category: PluginCategory): Plugin[] => {
  return pluginRegistry.filter(p => p.category === category);
};

export const getAllCategories = (): PluginCategory[] => {
  const categories = new Set(pluginRegistry.map(p => p.category));
  return Array.from(categories);
};

import { Plugin, PluginCategory } from './types';
import { githubReadmeStatsPlugin } from './wrappers/github-readme-stats';
import { githubProfileTrophyPlugin } from './wrappers/github-profile-trophy';
import { readmeTypingSvgPlugin } from './wrappers/readme-typing-svg';
import { snkPlugin } from './wrappers/snk';
import { wakaReadmeStatsPlugin } from './wrappers/waka-readme-stats';
import { markdownBadgesPlugin } from './wrappers/markdown-badges';
import { visitorCounterPlugin } from './wrappers/visitor-counter';
import { portfolioContributionsPlugin } from './wrappers/portfolio-contributions';
import { githubAchievementsPlugin } from './wrappers/github-achievements';
import { activityGraphPlugin } from './wrappers/activity-graph';
import { pieChartPlugin } from './wrappers/pie-chart';

export const pluginRegistry: Plugin[] = [
  readmeTypingSvgPlugin,
  githubReadmeStatsPlugin,
  pieChartPlugin,
  activityGraphPlugin,
  githubProfileTrophyPlugin,
  githubAchievementsPlugin,
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

/**
 * ReadmeForge Metrics Engine Types
 * Provides comprehensive typing for the 47+ metrics plugins and rendering options.
 */

export type MetricsTemplate = 'classic' | 'terminal' | 'repository' | 'markdown' | 'community';

export type MetricsOutputMode = 'action' | 'direct_svg' | 'markdown_table';

export interface MetricsBaseConfig {
  header?: boolean;
  activity?: boolean;
  community?: boolean;
  repositories?: boolean;
  metadata?: boolean;
}

export interface MetricsIsocalendarConfig {
  enabled?: boolean;
  duration?: 'half-year' | 'full-year';
}

export interface MetricsLanguagesConfig {
  enabled?: boolean;
  ignored?: string[];
  limit?: number;
  sections?: Array<'most-used' | 'recently-used'>;
  details?: Array<'bytes' | 'percentage' | 'lines'>;
  indepth?: boolean;
}

export interface MetricsHabitsConfig {
  enabled?: boolean;
  from?: number; // number of events to analyze (default: 200)
  days?: number; // days of activity to analyze (default: 14)
  facts?: boolean;
  charts?: boolean;
  trim?: boolean;
}

export interface MetricsAchievementsConfig {
  enabled?: boolean;
  threshold?: 'C' | 'B' | 'A' | 'S' | 'X';
  secrets?: boolean;
  display?: 'compact' | 'detailed';
  limit?: number;
}

export interface MetricsLeetCodeConfig {
  enabled?: boolean;
  user?: string;
  sections?: Array<'solved' | 'skills' | 'recent'>;
}

export interface MetricsTopicsConfig {
  enabled?: boolean;
  mode?: 'starred' | 'mastered';
  sort?: 'stars' | 'activity' | 'random';
  limit?: number;
}

export interface MetricsWakaTimeConfig {
  enabled?: boolean;
  sections?: Array<'time' | 'projects' | 'languages' | 'editors'>;
  days?: number;
}

export interface ForgeMetricsConfig {
  username?: string;
  template?: MetricsTemplate;
  outputMode?: MetricsOutputMode;
  base?: MetricsBaseConfig;
  isocalendar?: MetricsIsocalendarConfig;
  languages?: MetricsLanguagesConfig;
  habits?: MetricsHabitsConfig;
  achievements?: MetricsAchievementsConfig;
  leetcode?: MetricsLeetCodeConfig;
  topics?: MetricsTopicsConfig;
  wakatime?: MetricsWakaTimeConfig;
  customPlugins?: Record<string, Record<string, unknown>>;
  timezone?: string;
  commitMessage?: string;
}


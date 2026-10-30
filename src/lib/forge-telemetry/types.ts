/**
 * ReadmeForge Telemetry Engine Types
 * Provides comprehensive typing for developer telemetry plugins and rendering options.
 */

export type TelemetryTemplate = 'classic' | 'terminal' | 'repository' | 'markdown' | 'community';

export type TelemetryOutputMode = 'action' | 'direct_svg' | 'markdown_table';

export interface TelemetryBaseConfig {
  header?: boolean;
  activity?: boolean;
  community?: boolean;
  repositories?: boolean;
  metadata?: boolean;
}

export interface TelemetryIsocalendarConfig {
  enabled?: boolean;
  duration?: 'half-year' | 'full-year';
}

export interface TelemetryLanguagesConfig {
  enabled?: boolean;
  ignored?: string[];
  limit?: number;
  sections?: Array<'most-used' | 'recently-used'>;
  details?: Array<'bytes' | 'percentage' | 'lines'>;
  indepth?: boolean;
}

export interface TelemetryHabitsConfig {
  enabled?: boolean;
  from?: number;
  days?: number;
  facts?: boolean;
  charts?: boolean;
  trim?: boolean;
}

export interface TelemetryAchievementsConfig {
  enabled?: boolean;
  threshold?: 'C' | 'B' | 'A' | 'S' | 'X';
  secrets?: boolean;
  display?: 'compact' | 'detailed';
  limit?: number;
}

export interface TelemetryLeetCodeConfig {
  enabled?: boolean;
  user?: string;
  sections?: Array<'solved' | 'skills' | 'recent'>;
}

export interface TelemetryTopicsConfig {
  enabled?: boolean;
  mode?: 'starred' | 'mastered';
  sort?: 'stars' | 'activity' | 'random';
  limit?: number;
}

export interface TelemetryWakaTimeConfig {
  enabled?: boolean;
  sections?: Array<'time' | 'projects' | 'languages' | 'editors'>;
  days?: number;
}

export interface ForgeTelemetryConfig {
  username?: string;
  template?: TelemetryTemplate;
  outputMode?: TelemetryOutputMode;
  base?: TelemetryBaseConfig;
  isocalendar?: TelemetryIsocalendarConfig;
  languages?: TelemetryLanguagesConfig;
  habits?: TelemetryHabitsConfig;
  achievements?: TelemetryAchievementsConfig;
  leetcode?: TelemetryLeetCodeConfig;
  topics?: TelemetryTopicsConfig;
  wakatime?: TelemetryWakaTimeConfig;
  customPlugins?: Record<string, Record<string, unknown>>;
  timezone?: string;
  commitMessage?: string;
}

export interface TelemetryPluginOption {
  name: string;
  type: 'boolean' | 'number' | 'select' | 'text';
  description: string;
  default?: string | number | boolean;
  min?: number;
  max?: number;
  values?: string[];
}

export interface TelemetryPluginEntry {
  id: string;
  name: string;
  category: 'core' | 'activity' | 'code' | 'social' | 'community' | 'media';
  description: string;
  iconName?: string;
  inputs: TelemetryPluginOption[];
}


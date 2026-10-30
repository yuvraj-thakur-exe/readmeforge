import { TelemetryPluginEntry } from './types';

export const TELEMETRY_CATEGORIES = [
  { id: 'all', label: 'All Plugins' },
  { id: 'core', label: 'Core Diagnostics' },
  { id: 'activity', label: 'Activity & Rhythms' },
  { id: 'code', label: 'Code & Languages' },
  { id: 'community', label: 'Community & PRs' },
  { id: 'social', label: 'Social & External' },
  { id: 'media', label: 'Media & Performance' },
] as const;

export const TELEMETRY_PLUGINS_CATALOG: TelemetryPluginEntry[] = [
  {
    id: 'isocalendar',
    name: '3D Isometric Calendar',
    category: 'activity',
    description: 'Renders an axonometric 3D commit voxel terrain showing commit streak, elevation, and density.',
    iconName: 'calendar',
    inputs: [
      { name: 'duration', type: 'select', description: 'Calendar time span', default: 'half-year', values: ['half-year', 'full-year'] },
    ],
  },
  {
    id: 'languages',
    name: 'Polyglot Languages',
    category: 'code',
    description: 'Displays language usage donut arcs, byte counts, percentages, and recently edited language metrics.',
    iconName: 'code',
    inputs: [
      { name: 'limit', type: 'number', description: 'Number of languages displayed', default: 8, min: 1, max: 24 },
      { name: 'indepth', type: 'boolean', description: 'Analyze commit-level language diffs', default: false },
    ],
  },
  {
    id: 'habits',
    name: 'Coding Habits & 24h Radar',
    category: 'activity',
    description: '24-hour activity rhythm dial, weekday histogram, indentation style, and commit timing facts.',
    iconName: 'clock',
    inputs: [
      { name: 'from', type: 'number', description: 'Number of recent events to analyze', default: 200, min: 50, max: 1000 },
      { name: 'days', type: 'number', description: 'Days of history to analyze', default: 14, min: 1, max: 60 },
      { name: 'facts', type: 'boolean', description: 'Display interesting coding facts', default: true },
      { name: 'charts', type: 'boolean', description: 'Display 24h hourly and daily charts', default: true },
    ],
  },
  {
    id: 'achievements',
    name: 'Gamified Achievements',
    category: 'core',
    description: 'Trophy showcase with Class S/A/B rank medals, golden glowing halos, and secret milestone achievements.',
    iconName: 'trophy',
    inputs: [
      { name: 'threshold', type: 'select', description: 'Minimum rank to display', default: 'B', values: ['C', 'B', 'A', 'S', 'X'] },
      { name: 'secrets', type: 'boolean', description: 'Display secret unlockable milestones', default: false },
      { name: 'display', type: 'select', description: 'Display mode', default: 'compact', values: ['compact', 'detailed'] },
      { name: 'limit', type: 'number', description: 'Maximum badges to show', default: 0, min: 0, max: 50 },
    ],
  },
  {
    id: 'leetcode',
    name: 'LeetCode Problem Mastery',
    category: 'code',
    description: 'Algorithmic problem breakdown (Easy, Medium, Hard), contest rating, and global rank badge.',
    iconName: 'activity',
    inputs: [
      { name: 'user', type: 'text', description: 'LeetCode username override' },
      { name: 'limit', type: 'number', description: 'Recent submissions limit', default: 5, min: 1, max: 20 },
    ],
  },
  {
    id: 'topics',
    name: 'Starred Topics & Tags',
    category: 'core',
    description: 'Displays starred GitHub topics and technologies with star icons and activity ranking.',
    iconName: 'hash',
    inputs: [
      { name: 'mode', type: 'select', description: 'Topic mode', default: 'starred', values: ['starred', 'mastered'] },
      { name: 'sort', type: 'select', description: 'Sort criteria', default: 'stars', values: ['stars', 'activity', 'random'] },
      { name: 'limit', type: 'number', description: 'Maximum topics to show', default: 15, min: 1, max: 50 },
    ],
  },
  {
    id: 'wakatime',
    name: 'WakaTime Developer Time',
    category: 'code',
    description: 'Tracks real-time coding hours, editor usage (VS Code, Neovim), and language time breakdowns.',
    iconName: 'clock',
    inputs: [
      { name: 'days', type: 'number', description: 'Tracked history window in days', default: 7, min: 1, max: 30 },
    ],
  },
  {
    id: 'pagespeed',
    name: 'Lighthouse PageSpeed Audit',
    category: 'media',
    description: 'Google Lighthouse 4-pillar audit gauges (Performance, Accessibility, Best Practices, SEO).',
    iconName: 'sparkles',
    inputs: [
      { name: 'url', type: 'text', description: 'Website URL to audit' },
    ],
  },
  {
    id: 'music',
    name: 'Music Player & Equalizer',
    category: 'media',
    description: 'Spotify and Last.fm now-playing card with rotating vinyl record and 18-band audio visualizer.',
    iconName: 'music',
    inputs: [
      { name: 'provider', type: 'select', description: 'Audio streaming provider', default: 'spotify', values: ['spotify', 'lastfm'] },
    ],
  },
  {
    id: 'terminal',
    name: 'Cyberpunk Terminal HUD',
    category: 'core',
    description: 'CRT scanline developer console with command-line prompts and real-time repo telemetry.',
    iconName: 'terminal',
    inputs: [],
  },
  {
    id: 'notable',
    name: 'Notable Contributions',
    category: 'community',
    description: 'Displays high-impact contributions to popular open-source repositories and organizations.',
    iconName: 'star',
    inputs: [
      { name: 'filter', type: 'select', description: 'Include forks or direct commits', default: 'all', values: ['all', 'only-stars'] },
    ],
  },
  {
    id: 'stargazers',
    name: 'Stargazer Curves & History',
    category: 'community',
    description: 'Visualizes repo star velocity, trajectory graphs, and stargazer community trends.',
    iconName: 'star',
    inputs: [
      { name: 'chart_type', type: 'select', description: 'Chart visualization mode', default: 'classic', values: ['classic', 'worldmap'] },
    ],
  },
  {
    id: 'activity',
    name: 'Recent Activity Feed',
    category: 'activity',
    description: 'Timeline of recent public commits, pull requests, issue reviews, and releases.',
    iconName: 'activity',
    inputs: [
      { name: 'limit', type: 'number', description: 'Maximum events to display', default: 5, min: 1, max: 20 },
    ],
  },
  {
    id: 'lines',
    name: 'Lines of Code History',
    category: 'code',
    description: 'Computes total added, removed, and net lines of code across all active repositories.',
    iconName: 'code',
    inputs: [
      { name: 'history', type: 'boolean', description: 'Display historical line trend graph', default: true },
    ],
  },
  {
    id: 'followup',
    name: 'Issue & PR Follow-up',
    category: 'community',
    description: 'Tracks open issues and pull requests created by or assigned to you with status badges.',
    iconName: 'check-circle',
    inputs: [
      { name: 'sections', type: 'select', description: 'Sections to include', default: 'all', values: ['all', 'user', 'repositories'] },
    ],
  },
  {
    id: 'discussions',
    name: 'GitHub Discussions',
    category: 'community',
    description: 'Displays participation in GitHub Discussions, answered questions, and community upvotes.',
    iconName: 'message-square',
    inputs: [],
  },
  {
    id: 'sponsors',
    name: 'GitHub Sponsors Spotlight',
    category: 'community',
    description: 'Renders active GitHub Sponsors avatar wall, tiers, and funding badges.',
    iconName: 'heart',
    inputs: [],
  },
  {
    id: 'stackoverflow',
    name: 'Stack Overflow Developer Stats',
    category: 'social',
    description: 'Showcases reputation points, top answers, and gold/silver/bronze badges from Stack Overflow.',
    iconName: 'help-circle',
    inputs: [
      { name: 'user', type: 'text', description: 'Stack Overflow user ID' },
    ],
  },
  {
    id: 'steam',
    name: 'Steam Gaming Activity',
    category: 'media',
    description: 'Displays recently played games, achievements unlocked, and total play hours on Steam.',
    iconName: 'gamepad-2',
    inputs: [
      { name: 'user', type: 'text', description: 'Steam Account ID or vanity URL' },
    ],
  },
  {
    id: 'projects',
    name: 'GitHub Projects V2',
    category: 'core',
    description: 'Showcases project boards, kanban roadmap progress, and milestone trackers.',
    iconName: 'kanban',
    inputs: [
      { name: 'limit', type: 'number', description: 'Maximum project boards', default: 4, min: 1, max: 10 },
    ],
  },
];

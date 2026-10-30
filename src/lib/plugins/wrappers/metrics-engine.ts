import { Plugin, UserSettings, resolveEffectiveUsername } from '../types';
import { buildMetricsActionWorkflow, buildMetricsEmbedUrl } from '../../forge-metrics/builder';
import { ForgeMetricsConfig, MetricsTemplate, MetricsOutputMode } from '../../forge-metrics/types';

export const metricsEnginePlugin: Plugin = {
  id: 'metrics-engine',
  name: 'ReadmeForge Metrics',
  description: 'Infographics generator with 47+ plugins (isometric calendar, languages, habits, achievements, leetcode, wakatime) rendered via GitHub Actions or SVG embed.',
  author: 'ReadmeForge',
  repository: 'https://github.com/yuvraj-thakur-exe/readmeforge',
  category: 'stats',
  icon: 'bar-chart-2',
  fields: [
    {
      name: 'username',
      label: 'GitHub Username Override (Leave blank to use profile)',
      type: 'text',
      defaultValue: '',
      placeholder: 'e.g. octocat or leave blank',
      required: false,
    },
    {
      name: 'template',
      label: 'Infographic Layout Template',
      type: 'select',
      defaultValue: 'classic',
      options: [
        { label: 'Classic Theme', value: 'classic' },
        { label: 'Terminal / CLI Theme', value: 'terminal' },
        { label: 'Repository Focus', value: 'repository' },
        { label: 'Markdown Native', value: 'markdown' },
        { label: 'Community Theme', value: 'community' },
      ],
      required: false,
    },
    {
      name: 'outputMode',
      label: 'Rendering & Deployment Mode',
      type: 'select',
      defaultValue: 'direct_svg',
      options: [
        { label: 'Direct SVG Embed (Instant URL)', value: 'direct_svg' },
        { label: 'GitHub Actions Workflow (Self-hosted)', value: 'action' },
      ],
      required: false,
    },
    {
      name: 'isocalendar',
      label: 'Include 3D Isometric Calendar',
      type: 'boolean',
      defaultValue: true,
      required: false,
    },
    {
      name: 'isocalendarDuration',
      label: 'Isometric Calendar Span',
      type: 'select',
      defaultValue: 'half-year',
      options: [
        { label: 'Half-Year (180 days)', value: 'half-year' },
        { label: 'Full-Year (365 days)', value: 'full-year' },
      ],
      required: false,
    },
    {
      name: 'languages',
      label: 'Include Languages Infographic',
      type: 'boolean',
      defaultValue: true,
      required: false,
    },
    {
      name: 'languagesLimit',
      label: 'Languages Limit',
      type: 'number',
      defaultValue: 8,
      required: false,
    },
    {
      name: 'habits',
      label: 'Include Coding Habits & Active Hours',
      type: 'boolean',
      defaultValue: true,
      required: false,
    },
    {
      name: 'achievements',
      label: 'Include GitHub Achievements & Trophies',
      type: 'boolean',
      defaultValue: true,
      required: false,
    },
    {
      name: 'achievementsThreshold',
      label: 'Achievements Quality Rank Threshold',
      type: 'select',
      defaultValue: 'B',
      options: [
        { label: 'Class C (All awards)', value: 'C' },
        { label: 'Class B (Bronze+)', value: 'B' },
        { label: 'Class A (Silver+)', value: 'A' },
        { label: 'Class S (Gold+)', value: 'S' },
        { label: 'Class X (Mastery only)', value: 'X' },
      ],
      required: false,
    },
    {
      name: 'leetcode',
      label: 'Include LeetCode Statistics',
      type: 'boolean',
      defaultValue: false,
      required: false,
    },
    {
      name: 'leetcodeUser',
      label: 'LeetCode Username',
      type: 'text',
      defaultValue: '',
      placeholder: 'e.g. leetcode_ninja',
      required: false,
    },
  ],
  defaultConfig: {
    username: '',
    template: 'classic',
    outputMode: 'direct_svg',
    isocalendar: true,
    isocalendarDuration: 'half-year',
    languages: true,
    languagesLimit: 8,
    habits: true,
    achievements: true,
    achievementsThreshold: 'B',
    leetcode: false,
    leetcodeUser: '',
  },
  renderMarkdown: (props: Record<string, unknown>, settings: UserSettings) => {
    const user = resolveEffectiveUsername(props, settings);
    const align = settings.align || 'center';
    const outputMode = (props.outputMode as MetricsOutputMode) || 'direct_svg';
    const template = (props.template as MetricsTemplate) || 'classic';

    const metricsConfig: ForgeMetricsConfig = {
      username: user,
      template,
      outputMode,
      base: {
        header: true,
        activity: true,
        community: true,
        repositories: true,
        metadata: true,
      },
      isocalendar: {
        enabled: Boolean(props.isocalendar),
        duration: (props.isocalendarDuration as 'half-year' | 'full-year') || 'half-year',
      },
      languages: {
        enabled: Boolean(props.languages),
        limit: Number(props.languagesLimit) || 8,
      },
      habits: {
        enabled: Boolean(props.habits),
      },
      achievements: {
        enabled: Boolean(props.achievements),
        threshold: (props.achievementsThreshold as 'C' | 'B' | 'A' | 'S' | 'X') || 'B',
      },
      leetcode: {
        enabled: Boolean(props.leetcode),
        user: (props.leetcodeUser as string) || user,
      },
    };

    if (outputMode === 'action') {
      const workflowYaml = buildMetricsActionWorkflow(metricsConfig);
      const markdown = `<div align="${align}">\n  <img src="github-metrics.svg" alt="${user}'s ReadmeForge Metrics" />\n</div>`;
      return {
        markdown,
        workflows: {
          '.github/workflows/readmeforge-metrics.yml': workflowYaml,
        },
      };
    }

    const embedUrl = buildMetricsEmbedUrl(metricsConfig);
    const markdown = `<div align="${align}">\n  <img src="${embedUrl}" alt="${user}'s ReadmeForge Metrics" />\n</div>`;

    return {
      markdown,
    };
  },
};


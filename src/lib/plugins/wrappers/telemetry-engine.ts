import { Plugin, UserSettings, resolveEffectiveUsername } from '../types';
import { buildTelemetryActionWorkflow, buildTelemetryEmbedUrl } from '../../forge-telemetry/builder';
import { ForgeTelemetryConfig, TelemetryTemplate, TelemetryOutputMode } from '../../forge-telemetry/types';

export const telemetryEnginePlugin: Plugin = {
  id: 'telemetry-engine',
  name: 'ReadmeForge Telemetry',
  description: 'Infographics generator with 47+ plugins (isometric calendar, languages, habits, achievements, leetcode, wakatime) rendered via GitHub Actions or native SVG.',
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
      label: 'Include Top Languages Breakdown',
      type: 'boolean',
      defaultValue: true,
      required: false,
    },
    {
      name: 'languagesLimit',
      label: 'Max Languages Displayed',
      type: 'number',
      defaultValue: 8,
      required: false,
    },
    {
      name: 'habits',
      label: 'Include Coding Habits & Rhythms',
      type: 'boolean',
      defaultValue: true,
      required: false,
    },
    {
      name: 'achievements',
      label: 'Include Gamified Achievements Showcase',
      type: 'boolean',
      defaultValue: true,
      required: false,
    },
    {
      name: 'achievementsThreshold',
      label: 'Achievements Minimum Rank',
      type: 'select',
      defaultValue: 'B',
      options: [
        { label: 'Rank C (Bronze+)', value: 'C' },
        { label: 'Rank B (Silver+)', value: 'B' },
        { label: 'Rank A (Gold+)', value: 'A' },
        { label: 'Rank S (Master Only)', value: 'S' },
        { label: 'Rank X (Secret Tier)', value: 'X' },
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
      label: 'LeetCode Username Override',
      type: 'text',
      defaultValue: '',
      placeholder: 'e.g. leetcode_handle',
      required: false,
    },
    {
      name: 'topics',
      label: 'Include Starred GitHub Topics',
      type: 'boolean',
      defaultValue: false,
      required: false,
    },
  ],
  defaultConfig: {
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
    topics: false,
  },
  renderMarkdown: (props: Record<string, unknown>, settings: UserSettings) => {
    const effectiveUser = resolveEffectiveUsername(props, settings);
    const user = effectiveUser || 'octocat';
    const template = (props.template as TelemetryTemplate) || 'classic';
    const outputMode = (props.outputMode as TelemetryOutputMode) || 'direct_svg';

    const config: ForgeTelemetryConfig = {
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
        enabled: props.isocalendar !== false,
        duration: (props.isocalendarDuration as 'half-year' | 'full-year') || 'half-year',
      },
      languages: {
        enabled: props.languages !== false,
        limit: Number(props.languagesLimit) || 8,
      },
      habits: {
        enabled: props.habits !== false,
        days: 14,
        facts: true,
        charts: true,
      },
      achievements: {
        enabled: props.achievements !== false,
        threshold: (props.achievementsThreshold as 'C' | 'B' | 'A' | 'S' | 'X') || 'B',
        display: 'compact',
      },
      leetcode: {
        enabled: Boolean(props.leetcode),
        user: typeof props.leetcodeUser === 'string' && props.leetcodeUser ? props.leetcodeUser : user,
      },
      topics: {
        enabled: Boolean(props.topics),
        limit: 12,
      },
    };

    if (outputMode === 'action') {
      const workflowYaml = buildTelemetryActionWorkflow(config);
      const markdown = `<!-- ReadmeForge Telemetry (GitHub Action Generated) -->
<div align="${settings.align || 'center'}">
  <img src="readmeforge-telemetry.svg" alt="${user}'s ReadmeForge Telemetry" />
</div>

<!-- Workflow file: .github/workflows/readmeforge-telemetry.yml -->`;
      return {
        markdown,
        workflows: {
          'readmeforge-telemetry.yml': workflowYaml,
        },
      };
    }

    const embedUrl = buildTelemetryEmbedUrl(config);
    return {
      markdown: `<div align="${settings.align || 'center'}">\n  <a href="https://github.com/${user}">\n    <img src="${embedUrl}" alt="${user}'s ReadmeForge Telemetry" width="100%" />\n  </a>\n</div>`,
    };
  },
};

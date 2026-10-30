import { ForgeTelemetryConfig } from './types';

/**
 * Builds the GitHub Action workflow YAML for ReadmeForge Telemetry engine.
 */
export function buildTelemetryActionWorkflow(config: ForgeTelemetryConfig): string {
  const username = config.username || '${{ github.repository_owner }}';
  const template = config.template || 'classic';
  const timezone = config.timezone || 'UTC';
  const commitMsg = config.commitMessage || 'Update ReadmeForge profile telemetry';

  const inputs: string[] = [
    `          user: ${username === '${{ github.repository_owner }}' ? '${{ github.repository_owner }}' : username}`,
    `          template: ${template}`,
    `          config_timezone: ${timezone}`,
    `          committer_message: "${commitMsg}"`,
  ];

  // Base configuration
  if (config.base) {
    const parts: string[] = [];
    if (config.base.header !== false) parts.push('header');
    if (config.base.activity !== false) parts.push('activity');
    if (config.base.community !== false) parts.push('community');
    if (config.base.repositories !== false) parts.push('repositories');
    if (config.base.metadata !== false) parts.push('metadata');
    inputs.push(`          base: ${parts.join(', ')}`);
  }

  // Isocalendar
  if (config.isocalendar?.enabled) {
    inputs.push('          plugin_isocalendar: yes');
    inputs.push(`          plugin_isocalendar_duration: ${config.isocalendar.duration || 'half-year'}`);
  }

  // Languages
  if (config.languages?.enabled) {
    inputs.push('          plugin_languages: yes');
    inputs.push(`          plugin_languages_limit: ${config.languages.limit || 8}`);
    if (config.languages.ignored?.length) {
      inputs.push(`          plugin_languages_ignored: ${config.languages.ignored.join(', ')}`);
    }
    if (config.languages.sections?.length) {
      inputs.push(`          plugin_languages_sections: ${config.languages.sections.join(', ')}`);
    }
    if (config.languages.indepth) {
      inputs.push('          plugin_languages_indepth: yes');
    }
  }

  // Habits
  if (config.habits?.enabled) {
    inputs.push('          plugin_habits: yes');
    inputs.push(`          plugin_habits_from: ${config.habits.from || 200}`);
    inputs.push(`          plugin_habits_days: ${config.habits.days || 14}`);
    inputs.push(`          plugin_habits_facts: ${config.habits.facts !== false ? 'yes' : 'no'}`);
    inputs.push(`          plugin_habits_charts: ${config.habits.charts !== false ? 'yes' : 'no'}`);
  }

  // Achievements
  if (config.achievements?.enabled) {
    inputs.push('          plugin_achievements: yes');
    inputs.push(`          plugin_achievements_threshold: ${config.achievements.threshold || 'B'}`);
    inputs.push(`          plugin_achievements_secrets: ${config.achievements.secrets ? 'yes' : 'no'}`);
    inputs.push(`          plugin_achievements_display: ${config.achievements.display || 'compact'}`);
    if (config.achievements.limit) {
      inputs.push(`          plugin_achievements_limit: ${config.achievements.limit}`);
    }
  }

  // LeetCode
  if (config.leetcode?.enabled) {
    inputs.push('          plugin_leetcode: yes');
    if (config.leetcode.user) {
      inputs.push(`          plugin_leetcode_user: ${config.leetcode.user}`);
    }
    if (config.leetcode.sections?.length) {
      inputs.push(`          plugin_leetcode_sections: ${config.leetcode.sections.join(', ')}`);
    }
  }

  // Topics
  if (config.topics?.enabled) {
    inputs.push('          plugin_topics: yes');
    inputs.push(`          plugin_topics_mode: ${config.topics.mode || 'starred'}`);
    inputs.push(`          plugin_topics_sort: ${config.topics.sort || 'stars'}`);
    inputs.push(`          plugin_topics_limit: ${config.topics.limit || 15}`);
  }

  // WakaTime
  if (config.wakatime?.enabled) {
    inputs.push('          plugin_wakatime: yes');
    inputs.push(`          plugin_wakatime_days: ${config.wakatime.days || 7}`);
    inputs.push('          plugin_wakatime_token: ${{ secrets.WAKATIME_TOKEN }}');
  }

  // Custom extra plugins
  if (config.customPlugins) {
    for (const [pluginName, pluginOpts] of Object.entries(config.customPlugins)) {
      inputs.push(`          plugin_${pluginName}: yes`);
      for (const [optKey, optVal] of Object.entries(pluginOpts)) {
        inputs.push(`          plugin_${pluginName}_${optKey}: ${String(optVal)}`);
      }
    }
  }

  return `name: ReadmeForge Telemetry
on:
  schedule:
    - cron: "0 0 * * *"
  workflow_dispatch:
  push:
    branches:
      - master
      - main

jobs:
  readmeforge-telemetry:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Generate ReadmeForge Telemetry
        uses: readmeforge/telemetry-action@v2
        with:
          filename: readmeforge-telemetry.svg
          token: \${{ secrets.TELEMETRY_TOKEN }}
${inputs.join('\n')}
`;
}

/**
 * Builds the direct image URL for ReadmeForge native telemetry (zero external dependencies).
 */
export function buildTelemetryEmbedUrl(config: ForgeTelemetryConfig, baseUrl = ''): string {
  const username = encodeURIComponent(config.username || 'octocat');
  const params = new URLSearchParams();

  params.set('user', username);

  if (config.template && config.template !== 'classic') {
    params.set('template', config.template);
  }

  if (config.isocalendar?.enabled) {
    params.set('plugin', 'isocalendar');
  } else if (config.languages?.enabled) {
    params.set('plugin', 'languages');
  } else if (config.habits?.enabled) {
    params.set('plugin', 'habits');
  } else if (config.achievements?.enabled) {
    params.set('plugin', 'achievements');
  } else if (config.leetcode?.enabled) {
    params.set('plugin', 'leetcode');
  } else {
    params.set('plugin', 'isocalendar');
  }

  const queryStr = params.toString();
  return baseUrl ? `${baseUrl}/api/telemetry/svg?${queryStr}` : `/api/telemetry/svg?${queryStr}`;
}

/**
 * Builds the embed markdown for README profiles (100% self-hosted).
 */
export function buildTelemetryMarkdownSnippet(config: ForgeTelemetryConfig, align: 'left' | 'center' | 'right' = 'center'): string {
  const user = config.username || 'octocat';
  const isAction = config.outputMode === 'action';

  const src = isAction
    ? `readmeforge-telemetry.svg`
    : `https://readmeforge.dev/api/telemetry/svg?plugin=isocalendar&user=${encodeURIComponent(user)}`;

  return `<div align="${align}">
  <img src="${src}" alt="${user}'s ReadmeForge Telemetry" />
</div>`;
}

import { describe, it, expect } from 'vitest';
import { buildMetricsActionWorkflow, buildMetricsEmbedUrl, buildMetricsMarkdownSnippet } from './builder';
import { ForgeMetricsConfig } from './types';

describe('ReadmeForge Metrics Engine - Builder', () => {
  it('generates a valid GitHub Actions workflow YAML with requested plugins', () => {
    const config: ForgeMetricsConfig = {
      username: 'yuvraj-thakur-exe',
      template: 'classic',
      timezone: 'Asia/Kolkata',
      commitMessage: 'Auto-update ReadmeForge profile telemetry',
      base: { header: true, activity: true, community: true },
      isocalendar: { enabled: true, duration: 'full-year' },
      languages: { enabled: true, limit: 10, sections: ['most-used'] },
      habits: { enabled: true, facts: true, charts: true },
      achievements: { enabled: true, threshold: 'A', display: 'compact' },
      leetcode: { enabled: true, user: 'yuvraj' },
    };

    const workflow = buildMetricsActionWorkflow(config);

    expect(workflow).toContain('name: ReadmeForge Metrics');
    expect(workflow).toContain('user: yuvraj-thakur-exe');
    expect(workflow).toContain('config_timezone: Asia/Kolkata');
    expect(workflow).toContain('plugin_isocalendar: yes');
    expect(workflow).toContain('plugin_isocalendar_duration: full-year');
    expect(workflow).toContain('plugin_languages: yes');
    expect(workflow).toContain('plugin_languages_limit: 10');
    expect(workflow).toContain('plugin_habits: yes');
    expect(workflow).toContain('plugin_achievements: yes');
    expect(workflow).toContain('plugin_achievements_threshold: A');
    expect(workflow).toContain('plugin_leetcode: yes');
    expect(workflow).toContain('plugin_leetcode_user: yuvraj');
  });

  it('builds a direct SVG URL with encoded query parameters', () => {
    const config: ForgeMetricsConfig = {
      username: 'octocat',
      template: 'terminal',
      isocalendar: { enabled: true, duration: 'half-year' },
      languages: { enabled: true, limit: 6 },
    };

    const url = buildMetricsEmbedUrl(config);
    expect(url).toContain('https://metrics.lecoq.io/octocat?');
    expect(url).toContain('template=terminal');
    expect(url).toContain('isocalendar=1');
    expect(url).toContain('isocalendar.duration=half-year');
    expect(url).toContain('languages=1');
    expect(url).toContain('languages.limit=6');
  });

  it('builds markdown snippet for README embedding', () => {
    const actionConfig: ForgeMetricsConfig = {
      username: 'octocat',
      outputMode: 'action',
    };
    const actionMd = buildMetricsMarkdownSnippet(actionConfig, 'center');
    expect(actionMd).toContain('<img src="github-metrics.svg" alt="octocat\'s ReadmeForge Metrics" />');

    const svgConfig: ForgeMetricsConfig = {
      username: 'octocat',
      outputMode: 'direct_svg',
    };
    const svgMd = buildMetricsMarkdownSnippet(svgConfig, 'left');
    expect(svgMd).toContain('https://metrics.lecoq.io/octocat');
  });
});


import { describe, it, expect } from 'vitest';
import {
  buildTelemetryActionWorkflow,
  buildTelemetryEmbedUrl,
  buildTelemetryMarkdownSnippet,
} from './builder';
import { ForgeTelemetryConfig } from './types';

describe('MonoForge Telemetry Engine - Builder', () => {
  it('generates a valid GitHub Actions workflow YAML without metrics naming in jobs', () => {
    const config: ForgeTelemetryConfig = {
      username: 'yuvraj-thakur-exe',
      template: 'classic',
      timezone: 'Asia/Kolkata',
      commitMessage: 'Auto-update MonoForge profile telemetry',
      base: { header: true, activity: true, community: true },
      isocalendar: { enabled: true, duration: 'full-year' },
      languages: { enabled: true, limit: 10, sections: ['most-used'] },
      habits: { enabled: true, facts: true, charts: true },
      achievements: { enabled: true, threshold: 'A', display: 'compact' },
      leetcode: { enabled: true, user: 'yuvraj' },
    };

    const workflow = buildTelemetryActionWorkflow(config);

    expect(workflow).toContain('name: MonoForge Telemetry');
    expect(workflow).toContain('filename: monoforge-telemetry.svg');
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

  it('builds a direct SVG URL pointing to native endpoint and never metrics.lecoq.io', () => {
    const config: ForgeTelemetryConfig = {
      username: 'octocat',
      template: 'terminal',
      isocalendar: { enabled: true, duration: 'half-year' },
    };

    const url = buildTelemetryEmbedUrl(config);
    expect(url).not.toContain('metrics.lecoq.io');
    expect(url).toContain('/api/telemetry/svg?');
    expect(url).toContain('user=octocat');
    expect(url).toContain('template=terminal');
    expect(url).toContain('plugin=isocalendar');
  });

  it('builds markdown snippet for README embedding without external server', () => {
    const actionConfig: ForgeTelemetryConfig = {
      username: 'octocat',
      outputMode: 'action',
    };
    const actionMd = buildTelemetryMarkdownSnippet(actionConfig, 'center');
    expect(actionMd).toContain('<img src="monoforge-telemetry.svg" alt="octocat\'s MonoForge Telemetry" />');

    const svgConfig: ForgeTelemetryConfig = {
      username: 'octocat',
      outputMode: 'direct_svg',
    };
    const svgMd = buildTelemetryMarkdownSnippet(svgConfig, 'left');
    expect(svgMd).toContain('https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=isocalendar&user=octocat');
    expect(svgMd).not.toContain('metrics.lecoq.io');
  });
});

import { describe, it, expect } from 'vitest';
import { telemetryEnginePlugin } from './telemetry-engine';
import { UserSettings } from '../types';

const defaultSettings: UserSettings = {
  user: { github: 'octocat' },
  theme: 'dark',
  accentColor: '#f59e0b',
  badgeStyle: 'for-the-badge',
  align: 'center',
};

describe('Plugin: telemetry-engine', () => {
  it('has valid metadata and fields', () => {
    expect(telemetryEnginePlugin.id).toBe('telemetry-engine');
    expect(telemetryEnginePlugin.name).toBe('ReadmeForge Telemetry');
    expect(telemetryEnginePlugin.category).toBe('stats');
    expect(telemetryEnginePlugin.fields.length).toBeGreaterThan(5);
  });

  it('renders direct SVG markdown using native endpoint', () => {
    const res = telemetryEnginePlugin.renderMarkdown(
      {
        username: 'monalisa',
        outputMode: 'direct_svg',
        isocalendar: true,
        languages: true,
      },
      defaultSettings
    ) as { markdown: string };

    expect(res.markdown).toContain('/api/telemetry/svg?');
    expect(res.markdown).toContain('monalisa');
    expect(res.markdown).not.toContain('metrics.lecoq.io');
  });

  it('renders action workflow YAML when action mode is selected', () => {
    const res = telemetryEnginePlugin.renderMarkdown(
      {
        username: 'octocat',
        outputMode: 'action',
        template: 'terminal',
      },
      defaultSettings
    ) as { markdown: string; workflows?: Record<string, string> };

    expect(res.markdown).toContain('readmeforge-telemetry.svg');
    expect(res.workflows?.['readmeforge-telemetry.yml']).toContain('name: ReadmeForge Telemetry');
    expect(res.workflows?.['readmeforge-telemetry.yml']).toContain('filename: readmeforge-telemetry.svg');
  });
});

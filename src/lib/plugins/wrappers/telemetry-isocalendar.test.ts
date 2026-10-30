import { describe, it, expect } from 'vitest';
import { telemetryIsocalendarPlugin } from './telemetry-isocalendar';
import { UserSettings } from '../types';

const defaultSettings: UserSettings = {
  user: { github: 'octocat' },
  theme: 'dark',
  accentColor: '#f59e0b',
  badgeStyle: 'for-the-badge',
  align: 'center',
};

describe('Plugin: telemetry-isocalendar', () => {
  it('has valid metadata and fields', () => {
    expect(telemetryIsocalendarPlugin.id).toBe('telemetry-isocalendar');
    expect(telemetryIsocalendarPlugin.name).toBe('3D Isometric Calendar');
    expect(telemetryIsocalendarPlugin.category).toBe('stats');
  });

  it('renders native 3D isometric calendar markdown', () => {
    const res = telemetryIsocalendarPlugin.renderMarkdown(
      {
        username: 'yuvraj',
        duration: 'full-year',
      },
      defaultSettings
    ) as { markdown: string };

    expect(res.markdown).toContain('/api/telemetry/svg?plugin=isocalendar');
    expect(res.markdown).toContain('user=yuvraj');
    expect(res.markdown).toContain('duration=full-year');
    expect(res.markdown).not.toContain('metrics.lecoq.io');
  });
});

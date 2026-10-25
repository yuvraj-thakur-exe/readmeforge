import { describe, it, expect } from 'vitest';
import { pieChartPlugin } from './pie-chart';
import { UserSettings } from '../types';

describe('pieChartPlugin', () => {
  const mockSettings: UserSettings = {
    user: {
      github: 'octocat',
      name: 'The Octocat',
    },
    theme: 'dark',
    accentColor: '#6366f1',
    badgeStyle: 'flat',
    align: 'center',
  };

  const getMarkdown = (output: ReturnType<typeof pieChartPlugin.renderMarkdown>) => {
    return typeof output === 'object' && output ? output.markdown : String(output);
  };

  it('renders top-langs donut chart by default', () => {
    const result = pieChartPlugin.renderMarkdown(
      pieChartPlugin.defaultConfig,
      mockSettings
    );
    const md = getMarkdown(result);
    expect(md).toContain('<div align="center">');
    expect(md).toContain('https://github-readme-stats.vercel.app/api/top-langs/?username=octocat');
    expect(md).toContain('layout=donut');
  });

  it('renders top-langs pie chart when configured', () => {
    const result = pieChartPlugin.renderMarkdown(
      { chartMode: 'top-langs-pie', theme: 'radical' },
      mockSettings
    );
    const md = getMarkdown(result);
    expect(md).toContain('layout=pie');
    expect(md).toContain('theme=radical');
  });

  it('renders native mermaid pie chart when selected', () => {
    const result = pieChartPlugin.renderMarkdown(
      { chartMode: 'mermaid', title: 'Engineering Focus' },
      mockSettings
    );
    const md = getMarkdown(result);
    expect(md).toContain('```mermaid');
    expect(md).toContain('pie title Engineering Focus');
    expect(md).toContain('"Frontend Architecture" : 35');
  });

  it('renders custom donut chart via QuickChart', () => {
    const result = pieChartPlugin.renderMarkdown(
      { chartMode: 'custom-donut', title: 'My Skills Breakdown' },
      mockSettings
    );
    const md = getMarkdown(result);
    expect(md).toContain('https://quickchart.io/chart?c=');
    expect(md).toContain('alt="My Skills Breakdown"');
  });
});

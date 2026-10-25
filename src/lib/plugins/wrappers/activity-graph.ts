import { Plugin, UserSettings } from '../types';

export const activityGraphPlugin: Plugin = {
  id: 'activity-graph',
  name: 'Contribution Activity Graph',
  description: 'High-availability visual activity graph and annual commit velocity heatmap.',
  author: '2016rshah',
  repository: 'https://github.com/2016rshah/githubchart-api',
  category: 'stats',
  icon: 'activity',
  fields: [
    {
      name: 'color',
      label: 'Graph Accent Color',
      type: 'select',
      defaultValue: '6366F1',
      options: [
        { label: 'ReadmeForge Violet (6366F1)', value: '6366F1' },
        { label: 'Cyan Cyberpunk (22D3EE)', value: '22D3EE' },
        { label: 'Emerald Matrix (10B981)', value: '10B981' },
        { label: 'Amber Solar (F59E0B)', value: 'F59E0B' },
        { label: 'Rose Neon (EC4899)', value: 'EC4899' },
        { label: 'GitHub Classic Green (2EA44F)', value: '2EA44F' },
      ],
      required: false,
    },
    {
      name: 'title',
      label: 'Custom Graph Title',
      type: 'text',
      defaultValue: 'Annual Contribution Activity',
      required: false,
    },
  ],
  defaultConfig: {
    color: '6366F1',
    title: 'Annual Contribution Activity',
  },
  renderMarkdown: (props: Record<string, unknown>, settings: UserSettings) => {
    const rawUser = (settings.user.github || 'username').trim();
    const user = encodeURIComponent(rawUser);
    const color = (props.color as string || '6366F1').replace(/^#/, '');
    const title = (props.title as string) || 'Annual Contribution Activity';
    const align = settings.align || 'center';

    const url = `https://ghchart.rshah.org/${color}/${user}`;

    return {
      markdown: `<div align="${align}">\n  <p><strong>${title}</strong></p>\n  <a href="https://github.com/${user}">\n    <img src="${url}" alt="${user}'s Contribution Activity Graph" width="100%" />\n  </a>\n</div>`,
    };
  },
};

import { Plugin, UserSettings } from '../types';

export const portfolioContributionsPlugin: Plugin = {
  id: 'portfolio-contributions',
  name: 'Portfolio Contributions Graph',
  description: 'Interactive visual contribution grid and activity chart.',
  author: 'SadanandPai',
  repository: 'https://github.com/SadanandPai/portfolio-contributions',
  category: 'stats',
  icon: 'grid',
  fields: [
    {
      name: 'theme',
      label: 'Graph Theme',
      type: 'select',
      defaultValue: 'github',
      options: [
        { label: 'GitHub Standard', value: 'github' },
        { label: 'GitHub Dark', value: 'github_dark' },
        { label: 'Dracula', value: 'dracula' },
        { label: 'Nord', value: 'nord' },
      ],
      required: false,
    },
    {
      name: 'chartType',
      label: 'Chart Display',
      type: 'select',
      defaultValue: 'calendar',
      options: [
        { label: 'Calendar Grid', value: 'calendar' },
        { label: 'Activity Line Graph', value: 'line' },
      ],
      required: false,
    },
  ],
  defaultConfig: {
    theme: 'github_dark',
    chartType: 'calendar',
  },
  renderMarkdown: (props: Record<string, unknown>, settings: UserSettings) => {
    const user = settings.user.github || 'username';
    const align = settings.align || 'left';
    const theme = (props.theme as string) || 'github_dark';

    const url = `https://github-contributions.vercel.app/api/v1/${user}?format=svg&theme=${theme}`;

    return {
      markdown: `<div align="${align}">\n  <img src="${url}" alt="${user} contribution chart" />\n</div>`,
    };
  },
};

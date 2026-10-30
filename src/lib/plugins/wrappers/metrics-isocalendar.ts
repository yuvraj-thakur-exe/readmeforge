import { Plugin, UserSettings, resolveEffectiveUsername } from '../types';

export const metricsIsocalendarPlugin: Plugin = {
  id: 'metrics-isocalendar',
  name: 'Isometric 3D Calendar',
  description: 'Isometric 3D commit calendar visualization powered by the ReadmeForge Metrics engine.',
  author: 'ReadmeForge',
  repository: 'https://github.com/yuvraj-thakur-exe/readmeforge',
  category: 'stats',
  icon: 'calendar',
  fields: [
    {
      name: 'username',
      label: 'GitHub Username Override',
      type: 'text',
      defaultValue: '',
      placeholder: 'e.g. octocat or leave blank',
      required: false,
    },
    {
      name: 'duration',
      label: 'Calendar Duration',
      type: 'select',
      defaultValue: 'half-year',
      options: [
        { label: 'Half-Year (180 days)', value: 'half-year' },
        { label: 'Full-Year (365 days)', value: 'full-year' },
      ],
      required: false,
    },
  ],
  defaultConfig: {
    username: '',
    duration: 'half-year',
  },
  renderMarkdown: (props: Record<string, unknown>, settings: UserSettings) => {
    const user = resolveEffectiveUsername(props, settings);
    const align = settings.align || 'center';
    const duration = (props.duration as string) || 'half-year';

    const url = `https://metrics.lecoq.io/${encodeURIComponent(user)}?base=0&isocalendar=1&isocalendar.duration=${duration}`;

    return {
      markdown: `<div align="${align}">\n  <img src="${url}" alt="${user}'s Isometric 3D Calendar" />\n</div>`,
    };
  },
};


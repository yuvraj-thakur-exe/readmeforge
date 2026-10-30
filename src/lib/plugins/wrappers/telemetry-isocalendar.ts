import { Plugin, UserSettings, resolveEffectiveUsername } from '../types';

export const telemetryIsocalendarPlugin: Plugin = {
  id: 'telemetry-isocalendar',
  name: '3D Isometric Calendar',
  description: 'Axonometric 3D projection of commit history, streak counters, and elevation terrain.',
  author: 'ReadmeForge',
  repository: 'https://github.com/yuvraj-thakur-exe/readmeforge',
  category: 'stats',
  icon: 'calendar',
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
      name: 'duration',
      label: 'Isometric Horizon Duration',
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
    duration: 'half-year',
  },
  renderMarkdown: (props: Record<string, unknown>, settings: UserSettings) => {
    const effectiveUser = resolveEffectiveUsername(props, settings);
    const user = effectiveUser || 'octocat';
    const duration = props.duration === 'full-year' ? 'full-year' : 'half-year';
    const url = `https://readmeforge.dev/api/telemetry/svg?plugin=isocalendar&user=${encodeURIComponent(user)}&duration=${duration}`;

    return {
      markdown: `<div align="${settings.align || 'center'}">\n  <img src="${url}" alt="${user}'s 3D Isometric Calendar" />\n</div>`,
    };
  },
};

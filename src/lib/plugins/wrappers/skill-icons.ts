import { Plugin, UserSettings } from '../types';

export const skillIconsPlugin: Plugin = {
  id: 'skill-icons',
  name: 'Skill Icons Grid',
  description: 'Clean, colorful developer skill icons grid from skillicons.dev supporting dark and light themes.',
  author: 'tandpfun',
  repository: 'https://github.com/tandpfun/skill-icons',
  category: 'techs',
  icon: 'cpu',
  fields: [
    {
      name: 'icons',
      label: 'Selected Skills (comma-separated)',
      type: 'text',
      defaultValue: 'js,ts,python,react,nextjs,tailwind,nodejs,docker,aws,git,linux',
      placeholder: 'js,ts,python,react,nextjs,tailwind,nodejs,docker,aws,git,linux',
      description: 'Comma-separated skill icon slugs from skillicons.dev',
      required: false,
    },
    {
      name: 'theme',
      label: 'Icon Theme',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Dark Mode', value: 'dark' },
        { label: 'Light Mode', value: 'light' },
      ],
      required: false,
    },
    {
      name: 'perLine',
      label: 'Icons Per Line',
      type: 'number',
      defaultValue: 15,
      placeholder: '15',
      required: false,
    },
  ],
  defaultConfig: {
    icons: 'js,ts,python,react,nextjs,tailwind,nodejs,docker,aws,git,linux',
    theme: 'dark',
    perLine: 15,
  },
  renderMarkdown: (props: Record<string, unknown>, settings: UserSettings) => {
    const align = settings.align || 'center';
    const rawIcons = String(props.icons ?? 'js,ts,python,react,nextjs,tailwind,nodejs,docker,aws,git,linux').trim();
    const cleanIcons = rawIcons
      .split(',')
      .map(s => s.trim().toLowerCase())
      .filter(Boolean)
      .join(',');

    const theme = (props.theme as string) || (settings.theme === 'light' ? 'light' : 'dark');
    const perLine = Number(props.perLine) || 15;

    const url = `https://skillicons.dev/icons?i=${cleanIcons}&theme=${theme}&perline=${perLine}`;

    return {
      markdown: `<div align="${align}">\n  <a href="https://skillicons.dev">\n    <img src="${url}" alt="Skills and Technologies" />\n  </a>\n</div>`,
    };
  },
};

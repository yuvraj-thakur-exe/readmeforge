import { Plugin, UserSettings } from '../types';

export const githubProfileTrophyPlugin: Plugin = {
  id: 'github-profile-trophy',
  name: 'GitHub Profile Trophy',
  description: 'Dynamic GitHub trophies and achievements card based on your GitHub activity.',
  author: 'ryo-ma',
  repository: 'https://github.com/ryo-ma/github-profile-trophy',
  category: 'trophy',
  icon: 'award',
  fields: [
    {
      name: 'theme',
      label: 'Trophy Theme',
      type: 'select',
      defaultValue: 'flat',
      options: [
        { label: 'Flat', value: 'flat' },
        { label: 'One Dark', value: 'onedark' },
        { label: 'Gruvbox', value: 'gruvbox' },
        { label: 'Dracula', value: 'dracula' },
        { label: 'Monokai', value: 'monokai' },
        { label: 'Discord', value: 'discord' },
      ],
      required: false,
    },
    {
      name: 'row',
      label: 'Rows Count',
      type: 'number',
      defaultValue: 1,
      required: false,
    },
    {
      name: 'column',
      label: 'Columns Count',
      type: 'number',
      defaultValue: 6,
      required: false,
    },
    {
      name: 'noBg',
      label: 'Transparent Background',
      type: 'boolean',
      defaultValue: true,
      required: false,
    },
    {
      name: 'noFrame',
      label: 'Hide Frame',
      type: 'boolean',
      defaultValue: false,
      required: false,
    },
  ],
  defaultConfig: {
    theme: 'flat',
    row: 1,
    column: 6,
    noBg: true,
    noFrame: false,
  },
  renderMarkdown: (props: Record<string, unknown>, settings: UserSettings) => {
    const rawUser = (settings.user.github || 'username').trim();
    const user = encodeURIComponent(rawUser);
    const theme = (props.theme as string) || 'flat';
    const row = props.row || 1;
    const column = props.column || 6;
    const noBg = props.noBg ? '&no-bg=true' : '';
    const noFrame = props.noFrame ? '&no-frame=true' : '';
    const align = settings.align || 'left';

    const url = `https://github-profile-trophy.vercel.app/?username=${user}&theme=${theme}&row=${row}&column=${column}${noBg}${noFrame}`;

    return {
      markdown: `<div align="${align}">\n  <a href="https://github.com/ryo-ma/github-profile-trophy">\n    <img src="${url}" alt="${user} trophies" />\n  </a>\n</div>`,
    };
  },
};

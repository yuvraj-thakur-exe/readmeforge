import { Plugin, UserSettings } from '../types';

export const githubReadmeStatsPlugin: Plugin = {
  id: 'github-readme-stats',
  name: 'GitHub Readme Stats',
  description: 'Dynamically generated GitHub stats and streak cards for your profile README.',
  author: 'anuraghazra',
  repository: 'https://github.com/anuraghazra/github-readme-stats',
  category: 'stats',
  icon: 'bar-chart-2',
  fields: [
    {
      name: 'showStats',
      label: 'Show Overall Stats Card',
      type: 'boolean',
      defaultValue: true,
      description: 'Display total stars, commits, PRs, and issues',
      required: false,
    },
    {
      name: 'showStreak',
      label: 'Show Streak Stats',
      type: 'boolean',
      defaultValue: true,
      description: 'Display your continuous contribution streak',
      required: false,
    },
    {
      name: 'showLanguages',
      label: 'Show Most Used Languages',
      type: 'boolean',
      defaultValue: true,
      description: 'Top programming languages card',
      required: false,
    },
    {
      name: 'theme',
      label: 'Card Theme',
      type: 'select',
      defaultValue: 'radical',
      options: [
        { label: 'Radical', value: 'radical' },
        { label: 'Tokyo Night', value: 'tokyonight' },
        { label: 'Dracula', value: 'dracula' },
        { label: 'GitHub Dark', value: 'github_dark' },
        { label: 'One Dark', value: 'onedark' },
        { label: 'Synthwave', value: 'synthwave' },
        { label: 'Nord', value: 'nord' },
      ],
      required: false,
    },
    {
      name: 'hideBorder',
      label: 'Hide Border',
      type: 'boolean',
      defaultValue: false,
      required: false,
    },
  ],
  defaultConfig: {
    showStats: true,
    showStreak: true,
    showLanguages: true,
    theme: 'radical',
    hideBorder: false,
  },
  renderMarkdown: (props: Record<string, unknown>, settings: UserSettings) => {
    const user = settings.user.github || 'username';
    const theme = (props.theme as string) || 'radical';
    const hideBorder = props.hideBorder ? '&hide_border=true' : '';
    const align = settings.align || 'left';

    const cards: string[] = [];

    if (props.showStats !== false) {
      cards.push(
        `<img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=${theme}${hideBorder}" alt="${user}'s GitHub Stats" />`
      );
    }

    if (props.showStreak) {
      cards.push(
        `<img src="https://github-readme-streak-stats.herokuapp.com/?user=${user}&theme=${theme}${hideBorder}" alt="${user}'s Streak Stats" />`
      );
    }

    if (props.showLanguages) {
      cards.push(
        `<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=compact&theme=${theme}${hideBorder}" alt="Top Languages" />`
      );
    }

    if (cards.length === 0) return '';

    return {
      markdown: `<div align="${align}">\n  ${cards.join('\n  &nbsp;&nbsp;\n  ')}\n</div>`,
    };
  },
};

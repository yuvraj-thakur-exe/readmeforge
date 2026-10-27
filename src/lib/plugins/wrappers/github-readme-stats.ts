import { Plugin, UserSettings, resolveEffectiveUsername } from '../types';

export const githubReadmeStatsPlugin: Plugin = {
  id: 'github-readme-stats',
  name: 'GitHub Readme Stats',
  description: 'Dynamically generated GitHub stats, streak cards, and language pie/donut charts for your profile README.',
  author: 'anuraghazra',
  repository: 'https://github.com/anuraghazra/github-readme-stats',
  category: 'stats',
  icon: 'bar-chart-2',
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
      description: 'Top programming languages card or pie/donut chart',
      required: false,
    },
    {
      name: 'languagesLayout',
      label: 'Languages Chart Style',
      type: 'select',
      defaultValue: 'donut',
      description: 'Select between Donut / Pie chart, Compact list, or standard layout',
      options: [
        { label: 'Donut Chart (Pie Style)', value: 'donut' },
        { label: 'Pie Chart', value: 'pie' },
        { label: 'Compact List', value: 'compact' },
        { label: 'Normal Bars', value: 'normal' },
      ],
      required: false,
    },
    {
      name: 'langsCount',
      label: 'Number of Languages to Show',
      type: 'number',
      defaultValue: 8,
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
    username: '',
    showStats: true,
    showStreak: true,
    showLanguages: true,
    languagesLayout: 'donut',
    langsCount: 8,
    theme: 'radical',
    hideBorder: false,
  },
  renderMarkdown: (props: Record<string, unknown>, settings: UserSettings) => {
    const effectiveUser = resolveEffectiveUsername(props, settings);
    const user = encodeURIComponent(effectiveUser);
    const theme = (props.theme as string) || 'radical';
    const hideBorder = props.hideBorder ? '&hide_border=true' : '';
    const align = settings.align || 'left';
    const layout = (props.languagesLayout as string) || 'donut';
    const count = props.langsCount || 8;

    const cards: string[] = [];

    if (props.showStats !== false) {
      cards.push(
        `<img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=${theme}${hideBorder}" alt="${effectiveUser}'s GitHub Stats" />`
      );
    }

    if (props.showStreak) {
      cards.push(
        `<img src="https://github-readme-streak-stats.herokuapp.com/?user=${user}&theme=${theme}${hideBorder}" alt="${effectiveUser}'s Streak Stats" />`
      );
    }

    if (props.showLanguages) {
      cards.push(
        `<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=${layout}&langs_count=${count}&theme=${theme}${hideBorder}" alt="${effectiveUser}'s Top Languages (${layout})" />`
      );
    }

    if (cards.length === 0) return '';

    return {
      markdown: `<div align="${align}">\n  ${cards.join('\n  &nbsp;&nbsp;\n  ')}\n</div>`,
    };
  },
};

import { Plugin, UserSettings, isPlaceholderUsername } from '../types';

export const wakaReadmeStatsPlugin: Plugin = {
  id: 'waka-readme-stats',
  name: 'WakaTime Stats',
  description: 'Display your weekly programming hours and language breakdown from WakaTime (requires a public WakaTime profile).',
  author: 'anmol098',
  repository: 'https://github.com/anmol098/waka-readme-stats',
  category: 'wakatime',
  icon: 'clock',
  fields: [
    {
      name: 'wakaUsername',
      label: 'WakaTime Username (Must have public profile on wakatime.com)',
      type: 'text',
      defaultValue: '',
      placeholder: 'Your wakatime.com username',
      required: true,
    },
    {
      name: 'compact',
      label: 'Compact Layout',
      type: 'boolean',
      defaultValue: false,
      required: false,
    },
    {
      name: 'theme',
      label: 'Theme',
      type: 'select',
      defaultValue: 'radical',
      options: [
        { label: 'Radical', value: 'radical' },
        { label: 'Tokyo Night', value: 'tokyonight' },
        { label: 'Dracula', value: 'dracula' },
        { label: 'Dark', value: 'dark' },
      ],
      required: false,
    },
  ],
  defaultConfig: {
    wakaUsername: '',
    compact: false,
    theme: 'radical',
  },
  renderMarkdown: (props: Record<string, unknown>, settings: UserSettings) => {
    const rawUser = (props.wakaUsername as string)?.trim();

    // WakaTime requires a dedicated public profile on wakatime.com.
    // If not provided or if it is octocat/username placeholder, do not render a broken card.
    if (!rawUser || isPlaceholderUsername(rawUser) || rawUser.toLowerCase() === 'octocat') {
      return '';
    }

    const user = encodeURIComponent(rawUser);
    const align = settings.align || 'left';
    const theme = (props.theme as string) || 'radical';
    const layout = props.compact ? '&layout=compact' : '';

    const url = `https://github-readme-stats.vercel.app/api/wakatime?username=${user}&theme=${theme}${layout}`;

    return {
      markdown: `<div align="${align}">\n  <a href="https://wakatime.com/@${user}">\n    <img src="${url}" alt="${rawUser}'s WakaTime Stats" />\n  </a>\n</div>`,
    };
  },
};

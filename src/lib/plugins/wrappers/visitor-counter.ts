import { Plugin, UserSettings } from '../types';

export const visitorCounterPlugin: Plugin = {
  id: 'visitor-counter',
  name: 'Profile Visitor Counter',
  description: 'Count profile views and display real-time hits badge.',
  author: 'istarkov',
  repository: 'https://github.com/istarkov/github-stats',
  category: 'widgets',
  icon: 'eye',
  fields: [
    {
      name: 'provider',
      label: 'Counter Provider',
      type: 'select',
      defaultValue: 'komarev',
      options: [
        { label: 'Komarev Profile Views', value: 'komarev' },
        { label: 'Hits Counter', value: 'hits' },
      ],
      required: false,
    },
    {
      name: 'color',
      label: 'Badge Color',
      type: 'color',
      defaultValue: '#8b5cf6',
      required: false,
    },
    {
      name: 'label',
      label: 'Badge Label',
      type: 'text',
      defaultValue: 'PROFILE VIEWS',
      required: false,
    },
  ],
  defaultConfig: {
    provider: 'komarev',
    color: '#8b5cf6',
    label: 'PROFILE VIEWS',
  },
  renderMarkdown: (props: Record<string, unknown>, settings: UserSettings) => {
    const user = settings.user.github || 'username';
    const align = settings.align || 'left';
    const color = ((props.color as string) || '#8b5cf6').replace('#', '');
    const label = encodeURIComponent((props.label as string) || 'PROFILE VIEWS');
    const style = settings.badgeStyle || 'for-the-badge';

    let url = `https://komarev.com/ghpvc/?username=${user}&label=${label}&color=${color}&style=${style}`;
    if (props.provider === 'hits') {
      url = `https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2F${user}&count_bg=%23${color}&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=${label}&edge_flat=false`;
    }

    return {
      markdown: `<div align="${align}">\n  <img src="${url}" alt="Profile Views" />\n</div>`,
    };
  },
};

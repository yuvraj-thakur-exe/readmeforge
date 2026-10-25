import { Plugin, UserSettings } from '../types';

const GITHUB_USERNAME_REGEX = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;
const HEX_COLOR_REGEX = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
const ALLOWED_BADGE_STYLES = new Set(['flat', 'flat-square', 'plastic', 'for-the-badge', 'social']);

export function sanitizeGitHubUsername(username?: string): string {
  if (!username) return 'username';
  const trimmed = username.trim();
  return GITHUB_USERNAME_REGEX.test(trimmed) ? trimmed : 'username';
}

export function sanitizeHexColor(color?: unknown, fallback = '8b5cf6'): string {
  if (typeof color !== 'string') return fallback;
  const match = color.trim().match(HEX_COLOR_REGEX);
  if (!match) return fallback;
  const hex = match[1];
  if (hex.length === 3) {
    return hex.split('').map(c => c + c).join('').toLowerCase();
  }
  return hex.toLowerCase();
}

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
    const rawUser = settings.user?.github || '';
    const safeUser = sanitizeGitHubUsername(rawUser);
    const encodedUser = encodeURIComponent(safeUser);

    const align = settings.align || 'left';
    const safeColor = sanitizeHexColor(props.color, '8b5cf6');
    const encodedColor = encodeURIComponent(safeColor);

    const rawLabel = typeof props.label === 'string' && props.label.trim() ? props.label.trim() : 'PROFILE VIEWS';
    const encodedLabel = encodeURIComponent(rawLabel);

    const requestedStyle = settings.badgeStyle || 'for-the-badge';
    const safeStyle = ALLOWED_BADGE_STYLES.has(requestedStyle) ? requestedStyle : 'for-the-badge';
    const encodedStyle = encodeURIComponent(safeStyle);

    let url = `https://komarev.com/ghpvc/?username=${encodedUser}&label=${encodedLabel}&color=${encodedColor}&style=${encodedStyle}`;
    if (props.provider === 'hits') {
      const targetRepoUrl = `https://github.com/${encodedUser}`;
      const encodedTargetUrl = encodeURIComponent(targetRepoUrl);
      url = `https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=${encodedTargetUrl}&count_bg=%23${encodedColor}&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=${encodedLabel}&edge_flat=false`;
    }

    return {
      markdown: `<div align="${align}">\n  <img src="${url}" alt="Profile Views" />\n</div>`,
    };
  },
};


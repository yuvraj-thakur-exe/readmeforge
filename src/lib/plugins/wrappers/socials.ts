import { Plugin } from '../types';
import { social_icons } from '#/resources/social_icons';

export const socialsPlugin: Plugin = {
  id: 'socials',
  name: 'Social Media & Dev Badges',
  version: '1.0.0',
  tags: ['socials', 'badges', 'links', 'shields'],
  description: 'Official shields.io badges and logos for LinkedIn, X/Twitter, Discord, YouTube, Gmail, HackerRank, GitHub, and 30+ dev platforms.',
  author: 'MonoForge',
  repository: 'https://github.com/badges/shields',
  category: 'socials',
  icon: 'Share2',
  fields: [
    {
      name: 'style',
      label: 'Badge Style',
      type: 'select',
      defaultValue: 'for-the-badge',
      options: [
        { label: 'For The Badge (Large)', value: 'for-the-badge' },
        { label: 'Flat', value: 'flat' },
        { label: 'Flat Square', value: 'flat-square' },
        { label: 'Plastic', value: 'plastic' },
      ],
    },
    {
      name: 'align',
      label: 'Alignment',
      type: 'select',
      defaultValue: 'center',
      options: [
        { label: 'Center', value: 'center' },
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
  ],
  defaultConfig: {
    socials: {
      linkedin: {
        message: 'LinkedIn',
        color: '0077B5',
        logo: 'linkedin',
        logoColor: 'white',
        link: 'https://linkedin.com',
      },
      twitter: {
        message: 'X',
        color: '000000',
        logo: 'x',
        logoColor: 'white',
        link: 'https://x.com',
      },
      discord: {
        message: 'Discord',
        color: '7289DA',
        logo: 'discord',
        logoColor: 'white',
        link: 'https://discord.com',
      },
      youtube: {
        message: 'YouTube',
        color: 'FF0000',
        logo: 'youtube',
        logoColor: 'white',
        link: 'https://youtube.com',
      },
      gmail: {
        message: 'Gmail',
        color: 'D14836',
        logo: 'gmail',
        logoColor: 'white',
        link: 'mailto:developer@gmail.com',
      },
      hackerrank: {
        message: 'HackerRank',
        color: '2EC866',
        logo: 'hackerrank',
        logoColor: 'white',
        link: 'https://hackerrank.com',
      },
    },
    styles: {
      style: 'for-the-badge',
      type: 'badge',
      height: 35,
    },
  },
  renderMarkdown: (props: Record<string, unknown>, settings) => {
    const rawContent = (props?.content as Record<string, unknown>) || props || {};
    const socialsObj = (rawContent.socials as Record<string, any>) || {};
    const entries = Object.entries(socialsObj);

    if (entries.length === 0) {
      return '';
    }

    const contentStyles = (rawContent.styles as Record<string, any>) || {};
    const topStyles = (props?.styles as Record<string, any>) || {};
    const badgeStyle = contentStyles.style || 'for-the-badge';
    const align = topStyles.align || settings?.align || 'center';

    const badgesHtml = entries
      .map(([key, rawVal]) => {
        const val = typeof rawVal === 'object' && rawVal !== null ? rawVal : {};
        const link = String(val.link || '').trim();

        // Find reference data from social_icons catalog if available
        const iconMeta = social_icons.find(
          item => item.name.toLowerCase() === key.toLowerCase() || item.short_name?.toLowerCase() === key.toLowerCase()
        );

        const message = String(val.message || iconMeta?.badge?.message || key).replace(/-/g, '--');
        const color = String(val.color || iconMeta?.badge?.color || '000000').replace('#', '');
        const logo = String(val.logo || iconMeta?.badge?.logo || key);
        const logoColor = String(val.logoColor || iconMeta?.badge?.logoColor || 'white');

        const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(message)}-${color}?style=${badgeStyle}&logo=${encodeURIComponent(
          logo
        )}&logoColor=${encodeURIComponent(logoColor)}`;

        const imgTag = `<img src="${badgeUrl}" alt="${message}" />`;

        if (link) {
          return `<a href="${link}" target="_blank" rel="noopener noreferrer">${imgTag}</a>`;
        }
        return imgTag;
      })
      .join('&nbsp;\n');

    return `<p align="${align}">\n${badgesHtml}\n</p>`;
  },
};

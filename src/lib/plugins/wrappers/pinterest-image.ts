import { Plugin, UserSettings } from '../types';
import { PINTEREST_PRESETS } from '#/lib/pinterest/resolver';

export const pinterestImagePlugin: Plugin = {
  id: 'pinterest-image',
  name: 'Pinterest Aesthetic Banner & Art',
  description: 'Embed high-resolution aesthetic Pinterest artworks, animated GIFs, anime banners, and visual media into your GitHub README.',
  author: 'ReadmeForge',
  repository: 'https://github.com/yuvrajlaptop2008-byte/ReadmeForge',
  category: 'widgets',
  icon: 'image',
  fields: [
    {
      name: 'preset',
      label: 'Aesthetic Artwork Preset',
      type: 'select',
      defaultValue: 'lofi-coder',
      options: [
        { label: 'Cozy Lo-Fi Midnight Coder (Animated GIF)', value: 'lofi-coder' },
        { label: 'Cyberpunk Neon City Skyline (Animated GIF)', value: 'cyberpunk-neon' },
        { label: 'Retro Pixel Sunset Horizon (Animated GIF)', value: 'pixel-sunset' },
        { label: 'Dark Synthwave Wireframe Grid (Animated GIF)', value: 'vaporwave-grid' },
        { label: 'Studio Ghibli Coding Sanctuary (Animated GIF)', value: 'ghibli-scenic' },
        { label: 'Speed Hacker Cat Typing (Animated GIF)', value: 'cat-typing' },
        { label: 'Custom Pinterest Pin / CDN Link', value: 'custom' },
      ],
      required: false,
    },
    {
      name: 'pinUrl',
      label: 'Custom Pinterest Image URL',
      type: 'text',
      defaultValue: '',
      placeholder: 'https://i.pinimg.com/originals/... or https://pinterest.com/pin/...',
      description: 'Paste direct Pinterest image URL or Pin link (used when Preset is set to Custom)',
      required: false,
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
      required: false,
    },
    {
      name: 'width',
      label: 'Image Width',
      type: 'text',
      defaultValue: '100%',
      placeholder: '100% or 600px',
      required: false,
    },
    {
      name: 'altText',
      label: 'Alt Description',
      type: 'text',
      defaultValue: 'Aesthetic Developer Visual Art',
      placeholder: 'Aesthetic Developer Visual Art',
      required: false,
    },
    {
      name: 'caption',
      label: 'Optional Caption',
      type: 'text',
      defaultValue: '✦ Turning coffee and midnight playlists into clean software architectures ✦',
      placeholder: '✦ Quote or caption beneath the artwork ✦',
      required: false,
    },
    {
      name: 'linkUrl',
      label: 'Click-Through Link URL',
      type: 'text',
      defaultValue: '',
      placeholder: 'https://github.com/... or https://pinterest.com/...',
      required: false,
    },
  ],
  defaultConfig: {
    preset: 'lofi-coder',
    pinUrl: '',
    align: 'center',
    width: '100%',
    altText: 'Aesthetic Developer Visual Art',
    caption: '✦ Turning coffee and midnight playlists into clean software architectures ✦',
    linkUrl: '',
  },
  renderMarkdown: (props: Record<string, unknown>, settings: UserSettings) => {
    const align = (props.align as string) || settings.align || 'center';
    const preset = (props.preset as string) || 'lofi-coder';
    const rawPinUrl = String(props.pinUrl ?? '').trim();
    const width = String(props.width ?? '100%').trim() || '100%';
    const altText = String(props.altText ?? 'Aesthetic Developer Visual Art').trim();
    const caption = String(props.caption ?? '').trim();
    const linkUrl = String(props.linkUrl ?? '').trim();

    let finalImageUrl = PINTEREST_PRESETS['lofi-coder'].url;

    if (preset !== 'custom' && PINTEREST_PRESETS[preset]) {
      finalImageUrl = PINTEREST_PRESETS[preset].url;
    } else if (rawPinUrl) {
      // Automatically upgrade Pinterest thumbnail CDN URLs to uncompressed /originals/
      finalImageUrl = rawPinUrl.replace(/\/\d+x\//, '/originals/');
    }

    const captionHtml = caption ? `\n  <br/>\n  <p align="${align}"><em>${caption}</em></p>` : '';
    const imgTag = `<img src="${finalImageUrl}" alt="${altText}" width="${width}" />`;
    const wrappedContent = linkUrl ? `<a href="${linkUrl}">\n    ${imgTag}\n  </a>` : imgTag;

    return {
      markdown: `<div align="${align}">\n  ${wrappedContent}${captionHtml}\n</div>`,
    };
  },
};

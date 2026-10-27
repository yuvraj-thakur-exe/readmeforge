import { Plugin, UserSettings } from '../types';

export const capsuleBannerPlugin: Plugin = {
  id: 'capsule-banner',
  name: 'Capsule Header Banner',
  description: 'Curved SVG header banners (waving neon, dark constellation, isometric cylinder) with dynamic gradients and text.',
  author: 'kyechan99',
  repository: 'https://github.com/kyechan99/capsule-render',
  category: 'header',
  icon: 'layout',
  fields: [
    {
      name: 'bannerType',
      label: 'Banner Shape',
      type: 'select',
      defaultValue: 'waving',
      options: [
        { label: 'Curved Neon Wave (Waving)', value: 'waving' },
        { label: 'Dark Constellation (Rect)', value: 'rect' },
        { label: 'Isometric Cylinder', value: 'cylinder' },
        { label: 'Soft Oval', value: 'soft' },
        { label: 'Diagonal Slice', value: 'slice' },
      ],
      required: false,
    },
    {
      name: 'text',
      label: 'Main Headline',
      type: 'text',
      defaultValue: 'HELLO WORLD',
      placeholder: 'HELLO WORLD',
      description: 'Primary headline rendered on the banner',
      required: false,
    },
    {
      name: 'desc',
      label: 'Subtitle / Description',
      type: 'text',
      defaultValue: 'WELCOME TO MY PROFILE',
      placeholder: 'WELCOME TO MY PROFILE',
      description: 'Secondary subtitle rendered beneath the headline',
      required: false,
    },
    {
      name: 'colorTheme',
      label: 'Gradient Color Theme',
      type: 'select',
      defaultValue: 'purple-neon',
      options: [
        { label: 'Purple Neon (Electric Violet)', value: 'purple-neon' },
        { label: 'Dark Constellation (Deep Space Navy)', value: 'dark-constellation' },
        { label: 'Cyber Cylinder (Indigo / Cyan)', value: 'cyber-cylinder' },
        { label: 'Ocean Horizon (Blue / Azure)', value: 'ocean' },
        { label: 'Fire & Ember (Orange / Crimson)', value: 'fire' },
      ],
      required: false,
    },
    {
      name: 'height',
      label: 'Banner Height (px)',
      type: 'number',
      defaultValue: 200,
      placeholder: '200',
      description: 'Vertical height of the SVG banner',
      required: false,
    },
  ],
  defaultConfig: {
    bannerType: 'waving',
    text: 'HELLO WORLD',
    desc: 'WELCOME TO MY PROFILE',
    colorTheme: 'purple-neon',
    height: 200,
  },
  renderMarkdown: (props: Record<string, unknown>, settings: UserSettings) => {
    const align = settings.align || 'center';
    const bannerType = (props.bannerType as string) || 'waving';
    const text = String(props.text ?? 'HELLO WORLD').trim() || 'HELLO WORLD';
    const desc = String(props.desc ?? '').trim();
    const colorTheme = (props.colorTheme as string) || 'purple-neon';
    const height = Number(props.height) || 200;

    let colorParam = '0:6a11cb,100:2575fc';
    if (colorTheme === 'dark-constellation') {
      colorParam = '0:090d16,100:111827';
    } else if (colorTheme === 'cyber-cylinder') {
      colorParam = '0:0b0f19,100:1e1b4b';
    } else if (colorTheme === 'ocean') {
      colorParam = '0:0052D4,50:4364F7,100:6FB1FC';
    } else if (colorTheme === 'fire') {
      colorParam = '0:f12711,100:f5af19';
    }

    const encodedText = encodeURIComponent(text);
    const encodedDesc = desc ? `&desc=${encodeURIComponent(desc)}` : '';
    const bannerUrl = `https://capsule-render.vercel.app/api?type=${bannerType}&color=${colorParam}&height=${height}&section=header&text=${encodedText}${encodedDesc}&fontSize=40&fontColor=ffffff&fontAlignY=42&descAlignY=64&descSize=16`;

    return {
      markdown: `<div align="${align}">\n  <img src="${bannerUrl}" alt="${text}" width="100%" />\n</div>`,
    };
  },
};

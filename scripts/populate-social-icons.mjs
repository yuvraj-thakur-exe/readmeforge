import fs from 'node:fs';
import path from 'node:path';

const PLATFORMS = [
  { name: 'behance', slug: 'behance', color: '#1769FF' },
  { name: 'bluesky', slug: 'bluesky', color: '#0285FF' },
  { name: 'codesandbox', slug: 'codesandbox', color: '#151515' },
  { name: 'codepen', slug: 'codepen', color: '#000000' },
  { name: 'devto', slug: 'devdotto', color: '#0A0A0A' },
  { name: 'discord', slug: 'discord', color: '#5865F2' },
  { name: 'dribbble', slug: 'dribbble', color: '#EA4C89' },
  { name: 'facebook', slug: 'facebook', color: '#1877F2' },
  { name: 'gitlab', slug: 'gitlab', color: '#FC6D26' },
  { name: 'gmail', slug: 'gmail', color: '#EA4335' },
  { name: 'hackerrank', slug: 'hackerrank', color: '#00EA64' },
  { name: 'instagram', slug: 'instagram', color: '#E4405F' },
  { name: 'itch', slug: 'itchdotio', color: '#FA5C5C' },
  { name: 'linkedin', slug: 'linkedin', color: '#0A66C2' },
  { name: 'linktree', slug: 'linktree', color: '#43E660' },
  { name: 'medium', slug: 'medium', color: '#000000' },
  { name: 'microsoft-outlook', slug: 'microsoftoutlook', color: '#0078D4' },
  { name: 'outlook', slug: 'microsoftoutlook', color: '#0078D4' },
  { name: 'patreon', slug: 'patreon', color: '#FF424D' },
  { name: 'paypal', slug: 'paypal', color: '#00457C' },
  { name: 'spotify', slug: 'spotify', color: '#1DB954' },
  { name: 'stackoverflow', slug: 'stackoverflow', color: '#F58025' },
  { name: 'telegram', slug: 'telegram', color: '#26A5E4' },
  { name: 'twitch', slug: 'twitch', color: '#9146FF' },
  { name: 'twitter', slug: 'x', color: '#000000' },
  { name: 'x', slug: 'x', color: '#000000' },
  { name: 'unsplash', slug: 'unsplash', color: '#000000' },
  { name: 'visualstudio', slug: 'visualstudiocode', color: '#007ACC' },
  { name: 'wechat', slug: 'wechat', color: '#07C160' },
  { name: 'whatsapp', slug: 'whatsapp', color: '#25D366' },
  { name: 'youtube', slug: 'youtube', color: '#FF0000' },
  { name: 'tutanota', slug: 'tuta', color: '#840010' },
  { name: 'matrix', slug: 'matrix', color: '#000000' },
  { name: 'ko-fi', slug: 'kofi', color: '#FF5E5B' },
  { name: 'signal', slug: 'signal', color: '#3A76F0' },
  { name: 'slack', slug: 'slack', color: '#4A154B' },
  { name: 'tryhackme', slug: 'tryhackme', color: '#88CC14' },
  { name: 'leetcode', slug: 'leetcode', color: '#FFA116' },
  { name: 'github', slug: 'github', color: '#181717' },
  { name: 'codeforces', slug: 'codeforces', color: '#1F8ACB' },
  { name: 'codechef', slug: 'codechef', color: '#5B4638' },
  { name: 'kaggle', slug: 'kaggle', color: '#20BEFF' },
  { name: 'hashnode', slug: 'hashnode', color: '#2962FF' },
  { name: 'reddit', slug: 'reddit', color: '#FF4500' },
  { name: 'threads', slug: 'threads', color: '#000000' },
  { name: 'tiktok', slug: 'tiktok', color: '#000000' },
  { name: 'mastodon', slug: 'mastodon', color: '#6364FF' },
];

const baseDir = path.resolve('public', 'assets', 'icons', 'social');

async function run() {
  console.log(`Populating official SVGs into ${baseDir}...`);

  for (const item of PLATFORMS) {
    const dir = path.join(baseDir, item.name);
    fs.mkdirSync(dir, { recursive: true });

    let svg = '';
    try {
      const res = await fetch(`https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${item.slug}.svg`);
      if (res.ok) {
        svg = await res.text();
      }
    } catch (err) {
      console.warn(`Failed fetching ${item.slug}:`, err.message);
    }

    if (!svg) {
      // Fallback valid SVG
      svg = `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="${item.color}"><title>${item.name}</title><circle cx="12" cy="12" r="10"/></svg>`;
    }

    // Set fill color to brand color or fill attribute
    if (!svg.includes('fill=')) {
      svg = svg.replace('<svg ', `<svg fill="${item.color}" `);
    }

    // Save default.svg and <item.name>.svg and mark.svg for github
    fs.writeFileSync(path.join(dir, 'default.svg'), svg, 'utf-8');
    fs.writeFileSync(path.join(dir, `${item.name}.svg`), svg, 'utf-8');
    if (item.name === 'github') {
      fs.writeFileSync(path.join(dir, 'mark.svg'), svg, 'utf-8');
    }
    if (item.name === 'twitter') {
      fs.writeFileSync(path.join(dir, 'x.svg'), svg, 'utf-8');
    }
    console.log(`✓ Generated ${item.name} (${item.slug})`);
  }

  console.log(`Successfully generated official SVG assets for all ${PLATFORMS.length} platforms!`);
}

run();

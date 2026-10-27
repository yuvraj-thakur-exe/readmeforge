import { Plugin, UserSettings, resolveEffectiveUsername } from '../types';

export const mascotBioPlugin: Plugin = {
  id: 'mascot-bio',
  name: 'Mascot Companion Bio',
  description: 'Two-column GitHub profile layout pairing structured bulleted bio points with an animated vector mascot sticker.',
  author: 'ReadmeForge',
  repository: 'https://github.com/yuvrajlaptop2008-byte/ReadmeForge',
  category: 'widgets',
  icon: 'user-check',
  fields: [
    {
      name: 'mascot',
      label: 'Companion Mascot Sticker',
      type: 'select',
      defaultValue: 'owl-confetti',
      options: [
        { label: 'Celebratory Owl with Confetti Cannon', value: 'owl-confetti' },
        { label: 'Cute Coding Unicorn at Laptop', value: 'coding-unicorn' },
        { label: 'DevOps Engineer at Dual-Monitor Desk', value: 'developer-desk' },
        { label: 'Octocat Holding Steaming Coffee', value: 'octocat-coffee' },
        { label: 'Floating Cyber Bot Companion', value: 'cyber-bot' },
      ],
      required: false,
    },
    {
      name: 'headline',
      label: 'Greeting Headline',
      type: 'text',
      defaultValue: "⚡ I'm a Digital Craftsman!",
      placeholder: "⚡ I'm a Digital Craftsman!",
      required: false,
    },
    {
      name: 'subtitle',
      label: 'Role / Subtitle',
      type: 'text',
      defaultValue: 'Full-Stack Software Engineer & Open Source Craftsman',
      placeholder: 'Full-Stack Software Engineer',
      required: false,
    },
    {
      name: 'bio',
      label: 'Short Bio Paragraph',
      type: 'textarea',
      defaultValue: 'Passionate about distributed architectures, high-performance web systems, and building delightful developer experiences.',
      required: false,
    },
    {
      name: 'bullets',
      label: 'Bullet Points (One per line)',
      type: 'textarea',
      defaultValue: '🌱 Student of continuous learning :)\n🔭 Currently architecting distributed systems & microservices\n👨‍💻 Dedicated open-source contributor and technical mentor\n✍️ Writing technical guides on software engineering\n📫 Reach out to collaborate on high-impact projects',
      required: false,
    },
    {
      name: 'showViewsBadge',
      label: 'Display Profile Views Badge',
      type: 'boolean',
      defaultValue: true,
      required: false,
    },
    {
      name: 'viewsBadgeColor',
      label: 'Views Badge Hex Color',
      type: 'text',
      defaultValue: '9333ea',
      placeholder: '9333ea',
      required: false,
    },
  ],
  defaultConfig: {
    mascot: 'owl-confetti',
    headline: "⚡ I'm a Digital Craftsman!",
    subtitle: 'Full-Stack Software Engineer & Open Source Craftsman',
    bio: 'Passionate about distributed architectures, high-performance web systems, and building delightful developer experiences.',
    bullets: '🌱 Student of continuous learning :)\n🔭 Currently architecting distributed systems & microservices\n👨‍💻 Dedicated open-source contributor and technical mentor\n✍️ Writing technical guides on software engineering\n📫 Reach out to collaborate on high-impact projects',
    showViewsBadge: true,
    viewsBadgeColor: '9333ea',
  },
  renderMarkdown: (props: Record<string, unknown>, settings: UserSettings) => {
    const username = resolveEffectiveUsername(props, settings);

    const mascot = (props.mascot as string) || 'owl-confetti';
    const headline = String(props.headline ?? "⚡ I'm a Digital Craftsman!").trim();
    const subtitle = String(props.subtitle ?? '').trim();
    const bio = String(props.bio ?? '').trim();
    const rawBullets = String(props.bullets ?? '');
    const showViews = props.showViewsBadge !== false;
    const viewsColor = String(props.viewsBadgeColor ?? '9333ea').replace('#', '').trim() || '9333ea';

    const bulletLines = rawBullets
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .map(line => `<li>${line}</li>`)
      .join('\n            ');

    const MASCOT_URLS: Record<string, string> = {
      'owl-confetti': 'https://raw.githubusercontent.com/yuvrajlaptop2008-byte/ReadmeForge/main/public/assets/owl-confetti.svg',
      'coding-unicorn': 'https://raw.githubusercontent.com/yuvrajlaptop2008-byte/ReadmeForge/main/public/assets/coding-unicorn.svg',
      'developer-desk': 'https://raw.githubusercontent.com/yuvrajlaptop2008-byte/ReadmeForge/main/public/assets/developer-desk.svg',
      'octocat-coffee': 'https://raw.githubusercontent.com/yuvrajlaptop2008-byte/ReadmeForge/main/public/assets/octocat-coffee.svg',
      'cyber-bot': 'https://raw.githubusercontent.com/yuvrajlaptop2008-byte/ReadmeForge/main/public/assets/characters/blue-bot.svg',
    };

    const mascotUrl = MASCOT_URLS[mascot] || MASCOT_URLS['owl-confetti'];

    const viewsHtml = showViews
      ? `\n          <br/>\n          <a href="https://github.com/${username}">\n            <img src="https://komarev.com/ghpvc/?username=${username}&label=PROFILE+VIEWS&color=${viewsColor}&style=for-the-badge" alt="Profile Views" />\n          </a>`
      : '';

    const bioHtml = bio ? `\n          <p>${bio}</p>` : '';
    const subtitleHtml = subtitle ? `\n          <p><em>${subtitle}</em></p>` : '';

    const tableHtml = `<table>
  <tr>
    <td valign="top" width="65%">
      <h3>${headline}</h3>${subtitleHtml}${bioHtml}
      <ul>
        ${bulletLines}
      </ul>${viewsHtml}
    </td>
    <td valign="top" width="35%" align="center">
      <img src="${mascotUrl}" alt="${mascot}" width="260" />
    </td>
  </tr>
</table>`;

    return {
      markdown: tableHtml,
    };
  },
};

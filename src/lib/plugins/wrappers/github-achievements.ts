import { Plugin, UserSettings, resolveEffectiveUsername } from '../types';

export const GITHUB_ACHIEVEMENT_LIST = [
  {
    id: 'pull-shark',
    name: 'Pull Shark',
    description: 'Co-authored or opened pull requests that have been merged.',
    image: 'https://raw.githubusercontent.com/Schweinepriester/github-profile-achievements/main/images/pull-shark-default.png',
  },
  {
    id: 'quickdraw',
    name: 'Quickdraw',
    description: 'Closed an issue or pull request within 5 minutes of opening.',
    image: 'https://raw.githubusercontent.com/Schweinepriester/github-profile-achievements/main/images/quickdraw-default.png',
  },
  {
    id: 'starstruck',
    name: 'Starstruck',
    description: 'Created a repository that has earned multiple stars.',
    image: 'https://raw.githubusercontent.com/Schweinepriester/github-profile-achievements/main/images/starstruck-default.png',
  },
  {
    id: 'galaxy-brain',
    name: 'Galaxy Brain',
    description: 'Provided 2 or more accepted answers in GitHub Discussions.',
    image: 'https://raw.githubusercontent.com/Schweinepriester/github-profile-achievements/main/images/galaxy-brain-default.png',
  },
  {
    id: 'pair-extraordinaire',
    name: 'Pair Extraordinaire',
    description: 'Co-authored a commit in a merged pull request.',
    image: 'https://raw.githubusercontent.com/Schweinepriester/github-profile-achievements/main/images/pair-extraordinaire-default.png',
  },
  {
    id: 'arctic-code-vault-contributor',
    name: 'Arctic Code Vault',
    description: 'Contributed code to repositories archived in the Arctic World Archive.',
    image: 'https://raw.githubusercontent.com/Schweinepriester/github-profile-achievements/main/images/arctic-code-vault-contributor-default.png',
  },
  {
    id: 'yolo',
    name: 'YOLO',
    description: 'Merged a pull request without code review.',
    image: 'https://raw.githubusercontent.com/Schweinepriester/github-profile-achievements/main/images/yolo-default.png',
  },
  {
    id: 'public-sponsor',
    name: 'Public Sponsor',
    description: 'Sponsored an open-source maintainer through GitHub Sponsors.',
    image: 'https://raw.githubusercontent.com/Schweinepriester/github-profile-achievements/main/images/public-sponsor-default.png',
  },
];

export const githubAchievementsPlugin: Plugin = {
  id: 'github-achievements',
  name: 'GitHub Earned Achievements',
  description: 'Showcase your official earned GitHub achievement badges (Pull Shark, Quickdraw, Starstruck, Galaxy Brain, Arctic Vault, and more).',
  author: 'ReadmeForge',
  repository: 'https://github.com/yuvrajlaptop2008-byte/readmeforge',
  category: 'badges',
  icon: 'award',
  fields: [
    {
      name: 'badgeSize',
      label: 'Badge Size (px)',
      type: 'number',
      defaultValue: 64,
      required: false,
    },
    {
      name: 'showLabels',
      label: 'Show Badge Titles',
      type: 'boolean',
      defaultValue: false,
      required: false,
    },
    {
      name: 'pullShark',
      label: 'Pull Shark Badge',
      type: 'boolean',
      defaultValue: true,
      required: false,
    },
    {
      name: 'quickdraw',
      label: 'Quickdraw Badge',
      type: 'boolean',
      defaultValue: true,
      required: false,
    },
    {
      name: 'starstruck',
      label: 'Starstruck Badge',
      type: 'boolean',
      defaultValue: true,
      required: false,
    },
    {
      name: 'galaxyBrain',
      label: 'Galaxy Brain Badge',
      type: 'boolean',
      defaultValue: true,
      required: false,
    },
    {
      name: 'pairExtraordinaire',
      label: 'Pair Extraordinaire Badge',
      type: 'boolean',
      defaultValue: true,
      required: false,
    },
    {
      name: 'arcticVault',
      label: 'Arctic Code Vault Badge',
      type: 'boolean',
      defaultValue: true,
      required: false,
    },
    {
      name: 'yolo',
      label: 'YOLO Badge',
      type: 'boolean',
      defaultValue: false,
      required: false,
    },
    {
      name: 'publicSponsor',
      label: 'Public Sponsor Badge',
      type: 'boolean',
      defaultValue: false,
      required: false,
    },
  ],
  defaultConfig: {
    badgeSize: 64,
    showLabels: false,
    pullShark: true,
    quickdraw: true,
    starstruck: true,
    galaxyBrain: true,
    pairExtraordinaire: true,
    arcticVault: true,
    yolo: false,
    publicSponsor: false,
  },
  renderMarkdown: (props: Record<string, unknown>, settings: UserSettings) => {
    const effectiveUser = resolveEffectiveUsername(props, settings);
    const user = encodeURIComponent(effectiveUser);
    const align = settings.align || 'left';
    const size = typeof props.badgeSize === 'number' ? props.badgeSize : 64;

    const selectedBadges: typeof GITHUB_ACHIEVEMENT_LIST = [];
    if (props.pullShark ?? true) selectedBadges.push(GITHUB_ACHIEVEMENT_LIST[0]);
    if (props.quickdraw ?? true) selectedBadges.push(GITHUB_ACHIEVEMENT_LIST[1]);
    if (props.starstruck ?? true) selectedBadges.push(GITHUB_ACHIEVEMENT_LIST[2]);
    if (props.galaxyBrain ?? true) selectedBadges.push(GITHUB_ACHIEVEMENT_LIST[3]);
    if (props.pairExtraordinaire ?? true) selectedBadges.push(GITHUB_ACHIEVEMENT_LIST[4]);
    if (props.arcticVault ?? true) selectedBadges.push(GITHUB_ACHIEVEMENT_LIST[5]);
    if (props.yolo) selectedBadges.push(GITHUB_ACHIEVEMENT_LIST[6]);
    if (props.publicSponsor) selectedBadges.push(GITHUB_ACHIEVEMENT_LIST[7]);

    if (selectedBadges.length === 0) {
      selectedBadges.push(GITHUB_ACHIEVEMENT_LIST[0], GITHUB_ACHIEVEMENT_LIST[1]);
    }

    const badgeElements = selectedBadges
      .map(
        b =>
          `  <a href="https://github.com/${user}?tab=achievements">\n    <img src="${b.image}" width="${size}" height="${size}" alt="${b.name}" />\n  </a>`
      )
      .join('\n');

    return {
      markdown: `<div align="${align}">\n${badgeElements}\n</div>`,
    };
  },
};

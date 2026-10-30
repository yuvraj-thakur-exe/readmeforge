const getAppUrl = (): string => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/+$/, '');
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`.replace(/\/+$/, '');
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/+$/, '');
  }
  return 'https://monoforge-studio.vercel.app';
};

const general = {
  name: 'MonoForge',
  tagline: 'Forge a GitHub profile that gets noticed.',
  urls: {
    app: getAppUrl(),
    sections: {
      music: {
        spotify: {
          profileBaseUrl: 'https://open.spotify.com/user',
          recentlyPlayedBaseUrl:
            'https://spotify-recently-played-readme.vercel.app/api',
        },
      },

      techs: {
        iconBaseUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons',
      },

      stats: {
        imageBaseUrl: 'https://github-readme-stats.vercel.app/api',
        streakBaseUrl: 'https://streak-stats.demolab.com',
        trophyBaseUrl: 'https://github-profile-repo.vercel.app',
        activityGraphBaseUrl:
          'https://github-readme-activity-graph.vercel.app/graph',
      },

      borders: {
        capsuleRenderBaseUrl: 'https://capsule-render.vercel.app/api',
      },

      socials: {
        iconBaseUrl:
          'https://raw.githubusercontent.com/yuvraj-thakur-exe/MONOFORGE/main/public/assets/icons/social',
        badgeBaseUrl: 'https://img.shields.io/static/v1',
      },

      profileViews: {
        laobi: 'https://visitor-badge.laobi.icu/badge',
        getloli: 'https://count.getloli.com',
      },

      activities: {
        mediumBaseUrl:
          'https://github-readme-medium-recent-article.vercel.app/medium',
      },
    },
  },

  storage: {
    prefix: '@monoforge',
  },

  settings: {
    initial: {
      user: {},
    },

    preview: {
      user: {
        github: 'octocat',
      },
    },
  },
};

export { general };

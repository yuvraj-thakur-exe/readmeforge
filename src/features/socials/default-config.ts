const defaultSocialsSectionConfig = {
  props: {
    content: {
      socials: {
        linkedin: {
          icon: 'default',
          message: 'LinkedIn',
          color: '0077B5',
          label: '',
          logo: 'linkedin',
          logoColor: 'white',
        },

        twitter: {
          icon: 'default',
          message: 'X',
          color: '000000',
          label: '',
          logo: 'x',
          logoColor: 'white',
        },

        discord: {
          icon: 'default',
          message: 'Discord',
          color: '7289DA',
          label: '',
          logo: 'discord',
          logoColor: 'white',
        },

        youtube: {
          icon: 'default',
          message: 'YouTube',
          color: 'FF0000',
          label: '',
          logo: 'youtube',
          logoColor: 'white',
        },
      },

      styles: {
        style: 'for-the-badge',
        type: 'badge',
        height: 35,
      },
    },

    styles: {
      align: 'left',
      spacing: 10,
    },
  },
};

export { defaultSocialsSectionConfig };

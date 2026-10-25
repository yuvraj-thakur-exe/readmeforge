import { actions } from '#/lib/command';

import { ShareModal } from '#/components/molecules/share-modal';

type LinkProps = {
  href: string;
  target: string;
  rel: string;
  prefetch?: boolean;
};

type ButtonProps = {
  onClick: () => void;
};

type NavItem = {
  label: string;
  props: LinkProps | ButtonProps;
};

const navItems: NavItem[] = [
  {
    label: 'Github',
    props: {
      href: 'https://github.com/yuvrajlaptop2008-byte/readmeforge',
      target: '_blank',
      rel: 'noreferrer',
    },
  },
  {
    label: 'Share',
    props: {
      onClick: () => actions.modal.open(ShareModal),
    },
  },

  {
    label: 'Privacy Policy',
    props: {
      href: '/privacy-policy',
      target: '_blank',
      rel: 'noreferrer',
      prefetch: false,
    },
  },
];

export { navItems };

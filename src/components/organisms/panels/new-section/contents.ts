import { actions } from '#/lib/command';
import { PanelsEnum } from '#/types';

const contents = [
  {
    icon: 'star',
    name: 'Star This Project',

    href: 'https://github.com/yuvraj-thakur-exe/readmeforge',
    target: '_blank',
    rel: 'noreferrer',
    className: 'text-inherit! palette-surface-orange',
  },
  {
    icon: 'git-fork',
    name: 'Fork on Github',

    href: 'https://github.com/yuvraj-thakur-exe/readmeforge/fork',
    target: '_blank',
    rel: 'noreferrer',
    className: 'text-inherit! palette-surface-orange',
  },

  {
    icon: 'link-2',
    name: 'Add by Link',

    onClick: () => actions.panel.right.show(PanelsEnum.RECOMMENDED_RESOURCES),
    className: 'palette-surface-green',
  },

  {
    icon: 'file-text',
    name: 'Templates',

    onClick: () => actions.panel.right.show(PanelsEnum.TEMPLATES),
    className: 'palette-surface-green',
  },
];

export { contents };

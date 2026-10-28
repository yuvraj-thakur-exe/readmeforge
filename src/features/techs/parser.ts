import { EditableIcon, Sections } from '#/types';

type TechStyles = {
  height: number;
};

type Content = {
  icons: Record<string, EditableIcon>;
  styles: TechStyles;
};

type SectionStyles = {
  align: 'left' | 'center' | 'right';
  spacing: number;
};

type TechsSectionParserArgs = {
  content: Content;
  styles: SectionStyles;
};

const techsSectionParser = ({
  content,
  styles: sectionStyles,
}: TechsSectionParserArgs) => {
  const { icons = {}, styles = { height: 40 } } = content || {};

  const { align = 'left', spacing = 10 } = sectionStyles || {};
  const { height = 40 } = styles;

  const validEntries = Object.entries(icons).filter(
    ([, data]) => {
      if (!data?.providers) return false;
      const provider = data.providers[data.currentProvider] || Object.values(data.providers)[0];
      return !!provider;
    }
  );

  const imgsHtml = validEntries
    .reduce(
      (html, [icon, { providers = {}, currentProvider, config = {} }], index, arr) => {
        const isLast = index === arr.length - 1;
        const provider = providers[currentProvider] || Object.values(providers)[0];
        if (!provider) return html;

        const providerVariants = provider.variants || [];
        const hasVariants = !!providerVariants.length;

        const logo = (hasVariants
          ? providerVariants[(config[currentProvider]?.variant ?? 0) as number]
          : provider.path) || '';

        if (!logo) return html;

        const space = `<img width="${spacing}"/>`;
        const img = `<img src="${logo}" height="${height}" alt="${icon} logo" />`;

        return `${html} \n ${img}` + (!isLast ? ` \n ${space}` : '');
      },
      ''
    )
    .trim();

  return `
    <div data-importer="${Sections.TECHS}" align="${align}">
      ${imgsHtml}
    </div>
  `;
};

export { techsSectionParser };

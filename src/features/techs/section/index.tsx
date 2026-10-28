'use client';

import { useTranslations } from 'next-intl';
import { observer } from 'mobx-react-lite';

import { EditableIcon } from '#/types';

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

type TechsSectionProps = {
  content: Content;
  styles: SectionStyles;
};

export const TechsSection = observer(function TechsSection(
  props: TechsSectionProps
) {
  const { content, styles: containerStyles } = props;
  const t = useTranslations('ui.alts');

  const { icons = {}, styles = { height: 40 } } = content || {};
  const { height = 40 } = styles;

  return (
    <div
      className="flex flex-wrap"
      style={{
        justifyContent: containerStyles?.align || 'left',
        gap: `${containerStyles?.spacing ?? 10}px`,
      }}
    >
      {Object.entries(icons).map(
        ([name, { currentProvider, providers = {}, config = {} }]) => {
          const provider = providers[currentProvider] || Object.values(providers)[0];
          if (!provider) return null;

          const providerVariants = provider.variants || [];
          const hasVariants = !!providerVariants.length;

          const path = (hasVariants
            ? providerVariants[
                (config[currentProvider]?.variant ?? 0) as number
              ]
            : provider.path) || '';

          if (!path) return null;

          return (
            <img
              style={{ height: `${height}px` }}
              key={name}
              alt={t('tech-logo', { name })}
              src={path}
            />
          );
        }
      )}
    </div>
  );
});

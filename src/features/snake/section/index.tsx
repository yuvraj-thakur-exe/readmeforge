'use client';

import { useTranslations } from 'next-intl';

import { observer } from 'mobx-react-lite';

import { GuardSection } from '#/components/organisms/sections/guard';

type SnakeSectionProps = {
  id: string;
};

export const SnakeSection = observer(function SnakeSection(
  props: SnakeSectionProps
) {
  const { id } = props;

  const t = useTranslations('ui');

  return (
    <GuardSection sectionId={id}>
      <div className="grid place-items-center">
        <img
          className="w-full"
          src="/assets/snake.svg"
          alt={t('alts.snake')}
        />
      </div>
    </GuardSection>
  );
});

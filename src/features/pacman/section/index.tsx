'use client';

import { useTranslations } from 'next-intl';
import { observer } from 'mobx-react-lite';

import { GuardSection } from '#/components/organisms/sections/guard';

const GAME_IMAGES: Record<string, string> = {
  pacman: '/assets/pacman.svg',
  breakout: '/assets/breakout.svg',
  galaga: '/assets/galaga.svg',
  'puzzle-bobble': '/assets/puzzle-bobble.svg',
  bomberman: '/assets/bomberman.svg',
};

type PacmanSectionProps = {
  id: string;
  game?: string;
};

export const PacmanSection = observer(function PacmanSection(
  props: PacmanSectionProps
) {
  const { id, game = 'pacman' } = props;
  const t = useTranslations('ui.alts');

  const src = GAME_IMAGES[game] ?? GAME_IMAGES['pacman'];

  return (
    <GuardSection sectionId={id}>
      <div className="grid place-items-center">
        <img className="w-full" src={src} alt={t('pacman', { game })} />
      </div>
    </GuardSection>
  );
});

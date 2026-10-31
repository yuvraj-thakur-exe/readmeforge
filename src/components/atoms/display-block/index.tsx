import { tailwind } from '#/utils/tailwind';

import { Text } from '#/components/atoms/text';
import { Icon as IconPure } from '#/components/atoms/icon';

const Container = tailwind.twx
  .div`group relative w-full rounded-xl bg-white border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] hover:shadow-[4px_4px_0px_#ffe600] hover:border-[#ffe600] box-border pt-[100%] transition-all text-neutral-950`;

const Content = tailwind.twx
  .div`absolute inset-0 w-full flex flex-col items-center justify-center gap-xs text-neutral-950 font-bold`;

const Icon = tailwind.twx(
  IconPure
)`group-hover:text-amber-500 transition-colors text-neutral-800`;

const Label = tailwind.twx(
  Text.Paragraph
)`group-hover:text-amber-500 transition-colors text-center font-black text-neutral-950`;

export const DisplayBlock = {
  Container,
  Content,
  Label,
  Icon,
};

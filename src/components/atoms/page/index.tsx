import { twc, TwcComponentProps } from 'react-twc';

export const Container = twc.div`flex gap-x-xl h-screen p-xl max-w-page mx-auto bg-transparent text-neutral-950`;

type DivProps = TwcComponentProps<'div'> & { centered?: boolean };

export const Wrapper = twc.div<DivProps>(props => [
  `flex flex-col gap-xl w-full h-full flex-1 relative bg-white border-2 border-neutral-900 rounded-2xl shadow-[4px_4px_0px_#18181b] overflow-hidden`,
  props.centered ? 'mx-auto max-w-centered-content items-center' : '',
]);

export const Content = twc.div`flex flex-col h-full w-full p-lg pr-sm overflow-auto scrollbar box-border bg-white text-neutral-950`;

export const Page = {
  Container,
  Wrapper,
  Content,
};

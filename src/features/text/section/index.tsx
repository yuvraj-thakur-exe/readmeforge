'use client';

import { JSX } from 'react';
import { observer } from 'mobx-react-lite';

type SectionStyles = {
  align: 'left' | 'center' | 'right';
};

type Content = {
  text: string;
  as: keyof JSX.IntrinsicElements;
};

type TextSectionProps = {
  content: Content;
  styles: SectionStyles;
};

export const TextSection = observer(function TextSection(
  props: TextSectionProps
) {
  const { content, styles } = props;

  const text = content?.text || '';
  const Text = (content?.as || 'p') as keyof JSX.IntrinsicElements;

  return (
    <div className="flex text-section">
      <Text
        className="w-full whitespace-pre-line"
        style={{ textAlign: styles?.align || 'left' }}
      >
        {text.trim()}
      </Text>
    </div>
  );
});

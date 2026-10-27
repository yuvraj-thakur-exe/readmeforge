import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { KineticTypewriter } from './KineticTypewriter';

describe('KineticTypewriter Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders terminal prompt symbol and initial phrase text', () => {
    render(
      <KineticTypewriter
        phrases={[
          {
            prefix: 'Hello ',
            highlight: 'World',
            suffix: '!',
            tag: 'TEST',
          },
        ]}
      />
    );

    expect(screen.getByText('❯')).toBeDefined();
    expect(screen.getByText(/Hello/)).toBeDefined();
    expect(screen.getByText('World')).toBeDefined();
    expect(screen.getByText('!')).toBeDefined();
    expect(screen.getByText('TEST')).toBeDefined();
  });

  it('handles plain string phrases gracefully', () => {
    render(
      <KineticTypewriter
        phrases={['Simple plain string phrase.']}
      />
    );

    expect(screen.getByText('❯')).toBeDefined();
    expect(screen.getByText('Simple plain string phrase.')).toBeDefined();
  });
});

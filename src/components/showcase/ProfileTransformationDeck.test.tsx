import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { ProfileTransformationDeck } from './ProfileTransformationDeck';

describe('ProfileTransformationDeck Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders transformation deck header and before/after labels', () => {
    render(<ProfileTransformationDeck />);
    expect(screen.getByText(/From Generic Monospace to High-Impact Engineering Showcase/i)).toBeDefined();
    expect(screen.getByText(/BEFORE \(Default\)/i)).toBeDefined();
    expect(screen.getByText(/AFTER \(MonoForge\)/i)).toBeDefined();
  });

  it('renders feature comparison checklist', () => {
    render(<ProfileTransformationDeck />);
    expect(screen.getAllByText(/100% Camo Compliant/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/47\+ Telemetry Modules/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Kinetic Vector Characters/i).length).toBeGreaterThan(0);
  });

  it('updates slider position on mouse move over container', () => {
    const { container } = render(<ProfileTransformationDeck />);
    const sliderContainer = container.querySelector('.cursor-ew-resize');
    expect(sliderContainer).toBeDefined();

    if (sliderContainer) {
      fireEvent.mouseMove(sliderContainer, { clientX: 200 });
    }
  });
});

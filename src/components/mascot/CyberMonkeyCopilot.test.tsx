import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { CyberMonkeyCopilot } from './CyberMonkeyCopilot';
import { useReadmeStore } from '#/store/useReadmeStore';

// Mock canvas-confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('CyberMonkeyCopilot Component', () => {
  beforeEach(() => {
    useReadmeStore.getState().resetConfig();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders copilot header and initial tip quote', () => {
    render(<CyberMonkeyCopilot />);
    expect(screen.getByText(/Cyber Monkey Co-Pilot/i)).toBeDefined();
    expect(screen.getByText(/ACTIVE/i)).toBeDefined();
    expect(screen.getByText(/Telemetry Quick Inserts/i)).toBeDefined();
  });

  it('cycles tips on clicking the speech bubble', () => {
    render(<CyberMonkeyCopilot />);
    const speechBubble = screen.getByTitle(/Click to cycle co-pilot tip/i);
    const initialText = speechBubble.textContent;
    fireEvent.click(speechBubble);
    const newText = speechBubble.textContent;
    expect(newText).not.toBe(initialText);
  });

  it('inserts telemetry module on quick insert button click', () => {
    render(<CyberMonkeyCopilot />);
    const commitCityBtn = screen.getByRole('button', { name: /3D Commit City/i });
    fireEvent.click(commitCityBtn);

    const storeConfig = useReadmeStore.getState().config;
    expect(storeConfig.sections.length).toBeGreaterThan(0);
    expect(screen.getByText(/Inserted 3D Calendar into profile!/i)).toBeDefined();
  });
});

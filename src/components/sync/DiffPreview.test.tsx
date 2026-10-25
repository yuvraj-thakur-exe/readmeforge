import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { DiffPreview } from './DiffPreview';

describe('DiffPreview Component', () => {
  afterEach(() => {
    cleanup();
  });

  const defaultProps = {
    currentContent: '# Current README\n',
    newContent: '# New README\n## About me\n',
    repoName: 'octocat/octocat',
    onConfirmPush: vi.fn(),
    onCancel: vi.fn(),
  };

  it('renders the mandatory diff preview header and line changes', () => {
    render(<DiffPreview {...defaultProps} />);

    expect(screen.getByText('Mandatory Diff Review Before Push')).toBeDefined();
    expect(screen.getAllByText(/octocat\/octocat/).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: /Confirm & Push Changes/i })).toBeDefined();
  });

  it('displays companion workflow files tab when workflows are passed', () => {
    const workflows = {
      '.github/workflows/snake.yml': 'name: snake\npermissions:\n  contents: write\n',
    };

    render(<DiffPreview {...defaultProps} workflows={workflows} />);

    expect(screen.getByText('Files to push (2):')).toBeDefined();
    expect(screen.getAllByText('.github/workflows/snake.yml').length).toBeGreaterThan(0);
  });

  it('shows security warning when a workflow requests contents: write permission', () => {
    const workflows = {
      '.github/workflows/snake.yml': 'name: snake\njobs:\n  gen:\n    permissions:\n      contents: write\n',
    };

    render(<DiffPreview {...defaultProps} workflows={workflows} />);

    // Click on workflow file tab
    const workflowTabs = screen.getAllByText('.github/workflows/snake.yml');
    fireEvent.click(workflowTabs[0]);

    expect(screen.getByText(/Workflow Security Notice/i)).toBeDefined();
    expect(screen.getAllByText(/contents: write/i).length).toBeGreaterThan(0);
  });

  it('calls onConfirmPush when user clicks Confirm & Push Changes', async () => {
    const handlePush = vi.fn().mockResolvedValue(undefined);
    render(<DiffPreview {...defaultProps} onConfirmPush={handlePush} />);

    const pushButton = screen.getByRole('button', { name: /Confirm & Push Changes/i });
    fireEvent.click(pushButton);

    expect(handlePush).toHaveBeenCalledTimes(1);
  });
});

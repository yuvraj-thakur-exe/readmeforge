import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ResumeUpload } from './ResumeUpload';

describe('ResumeUpload', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders correctly when open', () => {
    render(<ResumeUpload isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText('Import Resume & AI Enrichment')).toBeDefined();
    expect(screen.getByText('Drop your resume (PDF, DOCX, TXT) here')).toBeDefined();
  });

  it('does not render when closed', () => {
    const { container } = render(<ResumeUpload isOpen={false} onClose={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  it('rejects files larger than 5MB with an error message', async () => {
    render(<ResumeUpload isOpen={true} onClose={vi.fn()} />);
    const fileInput = document.getElementById('resume-file-input') as HTMLInputElement;

    // Create 6MB dummy blob
    const largeBlob = new Blob([new Uint8Array(6 * 1024 * 1024)], { type: 'application/pdf' });
    const file = new File([largeBlob], 'large-resume.pdf', { type: 'application/pdf' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText(/File size exceeds the 5MB limit/i)).toBeDefined();
    });
  });

  it('extracts real entities via API and renders ConfirmGate', async () => {
    const mockEntities = [
      {
        field: 'user.name',
        label: 'Full Name',
        value: 'Jane Doe',
        category: 'identity',
        confidence: 'high',
        evidence: 'Jane Doe',
      },
      {
        field: 'user.role',
        label: 'Headline / Role',
        value: 'Staff Software Architect',
        category: 'identity',
        confidence: 'medium',
        evidence: 'Staff Software Architect',
      },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        filename: 'resume.pdf',
        entities: mockEntities,
      }),
    } as Response);

    render(<ResumeUpload isOpen={true} onClose={vi.fn()} />);
    const fileInput = document.getElementById('resume-file-input') as HTMLInputElement;

    const file = new File(['mock content'], 'resume.pdf', { type: 'application/pdf' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByDisplayValue('Jane Doe')).toBeDefined();
      expect(screen.getByDisplayValue('Staff Software Architect')).toBeDefined();
    });
  });
});

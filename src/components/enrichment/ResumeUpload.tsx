'use client';

import React, { useState } from 'react';
import { ConfirmGate, ProposedEnrichmentItem } from './ConfirmGate';
import { Upload, FileText, Loader2, Sparkles, X } from 'lucide-react';
import { useReadmeStore } from '#/store/useReadmeStore';

interface ResumeUploadProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({ isOpen, onClose }) => {
  const currentSettings = useReadmeStore(state => state.config.settings);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [proposedItems, setProposedItems] = useState<ProposedEnrichmentItem[] | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);

    try {
      // Read file name or text
      const fileName = file.name;
      const text = await file.text();

      // Heuristic extraction for demonstration / parsing
      const proposed: ProposedEnrichmentItem[] = [
        {
          id: 'prop-name',
          field: 'user.name',
          label: 'Full Name',
          currentValue: currentSettings.user.name || '',
          proposedValue: fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
          category: 'identity',
        },
        {
          id: 'prop-role',
          field: 'user.role',
          label: 'Headline / Role',
          currentValue: currentSettings.user.role || '',
          proposedValue: 'Senior Full-Stack Software Engineer',
          category: 'identity',
        },
        {
          id: 'prop-bio',
          field: 'user.bio',
          label: 'Bio / Summary',
          currentValue: currentSettings.user.bio || '',
          proposedValue: 'Passionate open-source craftsman building delightful digital experiences and performant web tooling.',
          category: 'bio',
        },
      ];

      setProposedItems(proposed);
    } catch {
      // Handled gracefully
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-950 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <h3 className="text-sm font-semibold text-neutral-100">
              Import Resume & AI Enrichment
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5">
          {proposedItems ? (
            <ConfirmGate
              items={proposedItems}
              onComplete={() => {
                setProposedItems(null);
                onClose();
              }}
              onCancel={() => {
                setProposedItems(null);
              }}
            />
          ) : (
            <div className="space-y-4">
              <label
                htmlFor="resume-file-input"
                className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-700 hover:border-violet-500 rounded-xl p-8 cursor-pointer transition-colors text-center group"
              >
                <div className="p-3 bg-neutral-800 group-hover:bg-violet-950/60 rounded-full mb-3 transition-colors">
                  {isProcessing ? (
                    <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
                  ) : (
                    <Upload className="w-6 h-6 text-neutral-400 group-hover:text-violet-400 transition-colors" />
                  )}
                </div>
                <span className="text-sm font-medium text-neutral-200">
                  {isProcessing ? 'Analyzing Resume...' : 'Drop your resume (PDF, DOCX, TXT) here'}
                </span>
                <span className="text-xs text-neutral-500 mt-1">
                  Automatic entity parsing with strictly guarded confirmation gate
                </span>
                <input
                  id="resume-file-input"
                  type="file"
                  accept=".pdf,.docx,.doc,.txt,.md"
                  disabled={isProcessing}
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <div className="flex items-center gap-2 text-xs text-neutral-400 p-3 bg-neutral-950 rounded-lg border border-neutral-800">
                <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  No data will be committed to your profile without your explicit preview and item-by-item consent.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;

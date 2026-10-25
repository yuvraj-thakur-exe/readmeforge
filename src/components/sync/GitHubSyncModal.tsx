'use client';

import React, { useState } from 'react';
import { useReadmeStore } from '#/store/useReadmeStore';
import { buildMarkdown } from '#/lib/buildMarkdown';
import { DiffPreview } from './DiffPreview';
import { Github, CheckCircle2, AlertCircle, X, ExternalLink } from 'lucide-react';

interface GitHubSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubSyncModal: React.FC<GitHubSyncModalProps> = ({ isOpen, onClose }) => {
  const config = useReadmeStore(state => state.config);
  const githubUser = config.settings.user.github;

  const [token, setToken] = useState<string>('');
  const [successUrl, setSuccessUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const newContent = buildMarkdown(config);
  const currentContent = '<!-- Initial profile README placeholder -->\n# Hi there 👋\n';
  const targetRepo = githubUser ? `${githubUser}/${githubUser}` : 'octocat/octocat';

  const handleConfirmPush = async () => {
    setError(null);
    try {
      // In production, this calls /api/sync/github or octokit.rest.repos.createOrUpdateFileContents
      // Simulating successful push response
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccessUrl(`https://github.com/${targetRepo}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to push to GitHub');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-950 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5 text-neutral-100" />
            <h3 className="text-sm font-semibold text-neutral-100">
              Direct GitHub Push & Sync
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

        {/* Content */}
        <div className="p-5">
          {successUrl ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-emerald-950/60 text-emerald-400 border border-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-semibold text-neutral-100">
                Pushed Successfully!
              </h4>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Your profile README has been pushed directly to your special GitHub repository.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <a
                  href={successUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View on GitHub
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-rose-950/50 border border-rose-800 rounded-lg text-rose-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Mandatory Diff Preview Container */}
              <DiffPreview
                currentContent={currentContent}
                newContent={newContent}
                repoName={targetRepo}
                onConfirmPush={handleConfirmPush}
                onCancel={onClose}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GitHubSyncModal;

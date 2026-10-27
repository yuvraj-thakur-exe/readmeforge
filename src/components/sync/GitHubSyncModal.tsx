'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useReadmeStore } from '#/store/useReadmeStore';
import { buildMarkdownWithWorkflows } from '#/lib/buildMarkdown';
import { DiffPreview } from './DiffPreview';
import { fetchRemoteReadme, pushReadmeToGitHub, sanitizeErrorMessage } from '#/lib/github/sync';
import { Github, CheckCircle2, AlertCircle, X, ExternalLink, Key, Loader2, RefreshCw } from 'lucide-react';

interface GitHubSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubSyncModal: React.FC<GitHubSyncModalProps> = ({ isOpen, onClose }) => {
  const config = useReadmeStore(state => state.config);
  const githubUser = config.settings.user.github;

  const [token, setToken] = useState<string>('');
  const [repoInput, setRepoInput] = useState<string>('');
  const [remoteContent, setRemoteContent] = useState<string>('');
  const [remoteSha, setRemoteSha] = useState<string | null>(null);
  const [isLoadingRemote, setIsLoadingRemote] = useState<boolean>(false);
  const [isPushing, setIsPushing] = useState<boolean>(false);
  const [successUrl, setSuccessUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize repo input from user config
  useEffect(() => {
    if (githubUser) {
      setRepoInput(`${githubUser}/${githubUser}`);
    } else {
      setRepoInput('');
    }
  }, [githubUser]);

  // Clean up any legacy tokens from localStorage to maintain strict in-memory security
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('readmeforge_gh_token');
      } catch {
        // Ignore errors in storage-restricted environments
      }
    }
  }, []);

  const { markdown: newContent, workflows } = buildMarkdownWithWorkflows(config);

  const fetchRemote = useCallback(async (targetRepo: string, authToken: string) => {
    if (!targetRepo.includes('/')) return;
    const [owner, repo] = targetRepo.split('/');
    if (!owner || !repo) return;

    setIsLoadingRemote(true);
    setError(null);

    const result = await fetchRemoteReadme(owner, repo, authToken);
    setIsLoadingRemote(false);

    if (result.error && !result.repoExists) {
      setError(result.error);
      setRemoteContent('');
      setRemoteSha(null);
      return;
    }

    if (result.exists) {
      setRemoteContent(result.content);
      setRemoteSha(result.sha);
    } else {
      setRemoteContent('<!-- New profile repository: README.md does not exist yet -->\n');
      setRemoteSha(null);
    }
  }, []);

  // Fetch remote content when modal opens or repo changes
  useEffect(() => {
    if (isOpen && repoInput) {
      fetchRemote(repoInput, token);
    }
  }, [isOpen, repoInput, token, fetchRemote]);

  if (!isOpen) return null;

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  const handleConfirmPush = async () => {
    setError(null);

    const target = repoInput.trim();
    if (!target.includes('/')) {
      setError('Target repository must be in the format "owner/repo"');
      return;
    }

    if (!token.trim()) {
      setError('A GitHub Personal Access Token with "repo" scope is required to push to your repository.');
      return;
    }

    const [owner, repo] = target.split('/');
    setIsPushing(true);

    try {
      const result = await pushReadmeToGitHub({
        owner,
        repo,
        token: token.trim(),
        content: newContent,
        existingSha: remoteSha,
        workflows,
      });

      if (!result.success) {
        throw new Error(result.error || 'Failed to commit README to GitHub');
      }

      setSuccessUrl(result.commitUrl || result.repoUrl);
    } catch (err: unknown) {
      const rawMsg = err instanceof Error ? err.message : 'Failed to push to GitHub';
      setError(sanitizeErrorMessage(rawMsg, token));
    } finally {
      setIsPushing(false);
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
              <p className="text-xs text-neutral-400 max-w-[360px] mx-auto">
                Your profile README has been verified and committed directly to GitHub via the REST API.
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
              {/* Credentials & Target Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-neutral-950 rounded-lg border border-neutral-800">
                <div>
                  <label htmlFor="repo-input" className="block text-[11px] font-medium text-neutral-400 mb-1">
                    Target Repository
                  </label>
                  <input
                    id="repo-input"
                    type="text"
                    value={repoInput}
                    onChange={e => setRepoInput(e.target.value)}
                    placeholder="username/username"
                    className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-700 rounded text-xs text-neutral-200 focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label htmlFor="token-input" className="flex items-center justify-between text-[11px] font-medium text-neutral-400 mb-1">
                    <span className="flex items-center gap-1">
                      <Key className="w-3 h-3 text-amber-400" /> Personal Access Token
                    </span>
                    <a
                      href="https://github.com/settings/tokens/new?scopes=repo,workflow&description=ReadmeForge%20Sync"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] text-violet-400 hover:underline"
                    >
                      Generate token
                    </a>
                  </label>
                  <input
                    id="token-input"
                    type="password"
                    value={token}
                    onChange={handleTokenChange}
                    placeholder="ghp_••••••••••••••••••••"
                    className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-700 rounded text-xs text-neutral-200 focus:outline-none focus:border-violet-500 font-mono"
                  />
                  <p className="mt-1 text-[10px] text-neutral-500 leading-tight">
                    In-memory only. Never written to storage, URLs, or external servers.
                  </p>
                </div>
              </div>

              {/* Status and Errors */}
              {isLoadingRemote && (
                <div className="flex items-center gap-2 p-2.5 bg-neutral-950 border border-neutral-800 rounded text-neutral-400 text-xs">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-violet-400" />
                  <span>Fetching latest README from remote GitHub repository...</span>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 p-3 bg-rose-950/50 border border-rose-800 rounded-lg text-rose-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Refresh Remote Header Bar */}
              <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
                <span>
                  Remote status:{' '}
                  <strong className="text-neutral-300">
                    {remoteSha ? `Existing README (${remoteSha.slice(0, 7)})` : 'New repository file'}
                  </strong>
                </span>
                <button
                  type="button"
                  onClick={() => fetchRemote(repoInput, token)}
                  disabled={isLoadingRemote}
                  className="flex items-center gap-1 text-violet-400 hover:text-violet-300 text-xs"
                >
                  <RefreshCw className={`w-3 h-3 ${isLoadingRemote ? 'animate-spin' : ''}`} /> Refresh remote
                </button>
              </div>

              {/* Mandatory Diff Preview Container */}
              <DiffPreview
                currentContent={remoteContent || '<!-- Empty / New README -->\n'}
                newContent={newContent}
                workflows={workflows}
                repoName={repoInput || 'octocat/octocat'}
                onConfirmPush={handleConfirmPush}
                onCancel={onClose}
              />

              {isPushing && (
                <div className="flex items-center justify-center gap-2 py-2 text-violet-400 text-xs font-medium">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating and committing to GitHub...</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GitHubSyncModal;

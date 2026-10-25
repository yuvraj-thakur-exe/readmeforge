'use client';

import React, { useMemo, useState } from 'react';
import * as diff from 'diff';
import { GitCommit, Check, X, ShieldAlert, ArrowRight, Loader2 } from 'lucide-react';

interface DiffPreviewProps {
  currentContent: string;
  newContent: string;
  repoName: string;
  onConfirmPush: () => Promise<void> | void;
  onCancel: () => void;
  className?: string;
}

export const DiffPreview: React.FC<DiffPreviewProps> = ({
  currentContent,
  newContent,
  repoName,
  onConfirmPush,
  onCancel,
  className = '',
}) => {
  const [isPushing, setIsPushing] = useState<boolean>(false);
  const [commitMessage, setCommitMessage] = useState<string>(
    'docs: update profile README via ReadmeForge'
  );

  const changes = useMemo(() => {
    return diff.diffLines(currentContent || '', newContent || '');
  }, [currentContent, newContent]);

  const stats = useMemo(() => {
    let additions = 0;
    let deletions = 0;

    for (const part of changes) {
      const lines = part.value.split('\n').filter(Boolean).length;
      if (part.added) additions += lines;
      if (part.removed) deletions += lines;
    }

    return { additions, deletions };
  }, [changes]);

  const handlePush = async () => {
    setIsPushing(true);
    try {
      await onConfirmPush();
    } finally {
      setIsPushing(false);
    }
  };

  return (
    <div className={`flex flex-col bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl ${className}`}>
      {/* Safety Gate Alert */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-950 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-semibold text-neutral-200">
            Mandatory Diff Review Before Push
          </h3>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-emerald-400">+{stats.additions}</span>
          <span className="text-rose-400">-{stats.deletions}</span>
          <span className="text-neutral-500">{repoName}</span>
        </div>
      </div>

      {/* Target Repo Info */}
      <div className="px-5 py-2.5 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
        <span>Target: <strong>{repoName}/README.md</strong></span>
        <div className="flex items-center gap-2">
          <span className="text-neutral-500">Commit message:</span>
          <input
            type="text"
            value={commitMessage}
            onChange={e => setCommitMessage(e.target.value)}
            className="px-2 py-1 bg-neutral-950 border border-neutral-800 rounded text-neutral-200 text-xs w-64 focus:outline-none focus:border-violet-500"
          />
        </div>
      </div>

      {/* Diff View Container */}
      <div className="flex-1 max-h-[420px] overflow-y-auto p-4 font-mono text-xs bg-neutral-950 space-y-0.5">
        {changes.map((part, index) => {
          const colorClass = part.added
            ? 'bg-emerald-950/40 text-emerald-300 border-l-2 border-emerald-500'
            : part.removed
            ? 'bg-rose-950/40 text-rose-300 border-l-2 border-rose-500 line-through'
            : 'text-neutral-400';

          const prefix = part.added ? '+ ' : part.removed ? '- ' : '  ';

          return (
            <div key={index} className={`px-3 py-0.5 whitespace-pre-wrap break-all ${colorClass}`}>
              {part.value.split('\n').map((line, lIdx, arr) => {
                if (lIdx === arr.length - 1 && !line) return null;
                return (
                  <div key={lIdx}>
                    <span className="select-none opacity-50 mr-2">{prefix}</span>
                    {line}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Confirmation Action Footer */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-950 border-t border-neutral-800 text-xs">
        <button
          type="button"
          onClick={onCancel}
          disabled={isPushing}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
        >
          <X className="w-4 h-4" /> Cancel
        </button>

        <button
          type="button"
          onClick={handlePush}
          disabled={isPushing}
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium shadow-md transition-all"
        >
          {isPushing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Pushing to GitHub...
            </>
          ) : (
            <>
              <GitCommit className="w-4 h-4" /> Confirm & Push Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default DiffPreview;

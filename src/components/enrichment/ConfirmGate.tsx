'use client';

import React, { useState } from 'react';
import { useReadmeStore } from '#/store/useReadmeStore';
import { ShieldCheck, Check, X, Sparkles } from 'lucide-react';

export interface ProposedEnrichmentItem {
  id: string;
  field: string;
  label: string;
  currentValue: string | string[];
  proposedValue: string | string[];
  category: 'identity' | 'skills' | 'projects' | 'bio';
}

interface ConfirmGateProps {
  items: ProposedEnrichmentItem[];
  onComplete: () => void;
  onCancel: () => void;
}

export const ConfirmGate: React.FC<ConfirmGateProps> = ({
  items,
  onComplete,
  onCancel,
}) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(items.map(i => i.id))
  );
  const [editedValues, setEditedValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const item of items) {
      initial[item.id] = Array.isArray(item.proposedValue)
        ? item.proposedValue.join(', ')
        : String(item.proposedValue);
    }
    return initial;
  });

  const updateSettings = useReadmeStore(state => state.updateSettings);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleApply = () => {
    const accepted = items.filter(i => selectedIds.has(i.id));

    // Explicit confirmation gate: only write confirmed items
    for (const item of accepted) {
      const finalValue = editedValues[item.id] ?? item.proposedValue;

      if (item.field === 'user.name') {
        updateSettings(s => ({
          ...s,
          user: { ...s.user, name: finalValue },
        }));
      } else if (item.field === 'user.bio') {
        updateSettings(s => ({
          ...s,
          user: { ...s.user, bio: finalValue },
        }));
      } else if (item.field === 'user.role') {
        updateSettings(s => ({
          ...s,
          user: { ...s.user, role: finalValue },
        }));
      } else if (item.field === 'user.location') {
        updateSettings(s => ({
          ...s,
          user: { ...s.user, location: finalValue },
        }));
      }
    }

    onComplete();
  };

  return (
    <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl space-y-5 max-w-2xl mx-auto shadow-xl">
      {/* Header Guard Banner */}
      <div className="flex items-start gap-3 p-3.5 bg-violet-950/40 border border-violet-800/60 rounded-lg">
        <ShieldCheck className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-violet-200">
            Explicit Confirmation Gate
          </h3>
          <p className="text-xs text-neutral-300 mt-0.5">
            Nothing from resume parsing or web enrichment writes to your profile configuration without your review and approval.
          </p>
        </div>
      </div>

      {/* Items Review List */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {items.map(item => {
          const isSelected = selectedIds.has(item.id);

          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-lg border transition-all ${
                isSelected
                  ? 'bg-neutral-950 border-violet-600/50'
                  : 'bg-neutral-950/50 border-neutral-800 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelect(item.id)}
                    className="rounded border-neutral-700 text-violet-600 focus:ring-violet-500"
                  />
                  <span className="text-xs font-semibold text-neutral-200">
                    {item.label}
                  </span>
                </label>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-800 text-neutral-400 rounded">
                  {item.category}
                </span>
              </div>

              {/* Current vs Proposed Diff */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-neutral-900 rounded border border-neutral-800/80">
                  <span className="text-[10px] font-semibold uppercase text-neutral-500 block mb-1">
                    Current Value
                  </span>
                  <span className="text-neutral-400">
                    {Array.isArray(item.currentValue)
                      ? item.currentValue.join(', ') || '(empty)'
                      : item.currentValue || '(empty)'}
                  </span>
                </div>

                <div className="p-2 bg-violet-950/20 rounded border border-violet-800/40">
                  <span className="text-[10px] font-semibold uppercase text-violet-400 block mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Proposed Value (Editable)
                  </span>
                  <input
                    type="text"
                    value={editedValues[item.id] ?? ''}
                    disabled={!isSelected}
                    onChange={e =>
                      setEditedValues(prev => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }))
                    }
                    className="w-full bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-xs text-neutral-200 focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-neutral-800 text-xs">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-1 px-3 py-1.5 rounded text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
        >
          <X className="w-4 h-4" /> Cancel & Discard
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedIds(new Set(items.map(i => i.id)))}
            className="px-2.5 py-1 text-neutral-400 hover:text-neutral-200"
          >
            Select All
          </button>
          <button
            type="button"
            onClick={handleApply}
            disabled={selectedIds.size === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-medium disabled:opacity-40 shadow-sm transition-all"
          >
            <Check className="w-4 h-4" /> Apply {selectedIds.size} Selected Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmGate;

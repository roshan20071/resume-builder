'use client';

import React, { useMemo } from 'react';
import { History, X, RotateCcw, TrendingUp, TrendingDown, Minus, Clock } from 'lucide-react';
import { useResumeStore } from '../../src/store/useResumeStore';

interface VersionHistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

function formatRelativeTime(isoString: string): string {
  const diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

function formatTimestamp(isoString: string): string {
  return new Date(isoString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export function VersionHistoryPanel({ isOpen, onClose }: VersionHistoryPanelProps) {
  const snapshots = useResumeStore((s) => s.versionSnapshots);
  const restoreVersionSnapshot = useResumeStore((s) => s.restoreVersionSnapshot);

  const reversedSnapshots = useMemo(
    () => [...snapshots].reverse(),
    [snapshots]
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-zinc-950/20" onClick={onClose} />

      {/* Side Panel */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-80 bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-zinc-500" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Version History</h3>
            <span className="text-[10px] font-mono text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
              {snapshots.length}/10
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Snapshots List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {reversedSnapshots.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <Clock className="w-8 h-8 text-zinc-300 mx-auto" />
              <p className="text-xs text-zinc-400 font-medium">No snapshots yet</p>
              <p className="text-[11px] text-zinc-300 max-w-[200px] mx-auto">
                Snapshots are saved from the ATS Auditor modal. Open it to capture your first version.
              </p>
            </div>
          ) : (
            reversedSnapshots.map((snap, i) => {
              const originalIndex = snapshots.length - 1 - i;
              const prev = reversedSnapshots[i + 1];
              const delta = prev ? snap.atsScore - prev.atsScore : 0;
              const isLatest = i === 0;
              return (
                <div
                  key={snap.ts}
                  className={`rounded-lg border p-3 transition-all ${
                    isLatest
                      ? 'border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800/60'
                      : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        {isLatest && (
                          <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
                            LATEST
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-zinc-400">{formatTimestamp(snap.ts)}</span>
                        <span className="text-[10px] text-zinc-300 dark:text-zinc-600">·</span>
                        <span className="text-[10px] text-zinc-400">{formatRelativeTime(snap.ts)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-zinc-900 dark:text-zinc-100 leading-none">
                          {snap.atsScore}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-medium">ATS score</span>
                        {delta !== 0 && (
                          <div className={`flex items-center gap-0.5 text-[10px] font-semibold ${delta > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {delta > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {delta > 0 ? '+' : ''}{delta}
                          </div>
                        )}
                        {delta === 0 && prev && (
                          <div className="flex items-center gap-0.5 text-[10px] text-zinc-400">
                            <Minus className="w-3 h-3" /> 0
                          </div>
                        )}
                      </div>
                    </div>
                    {!isLatest && (
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('Restore this version? Current unsaved edits will be replaced.')) {
                            restoreVersionSnapshot(originalIndex);
                            onClose();
                          }
                        }}
                        className="flex items-center gap-1 text-[10px] font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 px-2 py-1 rounded transition shrink-0"
                      >
                        <RotateCcw className="w-3 h-3" /> Restore
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-zinc-100 dark:border-zinc-800">
          <p className="text-[10px] text-zinc-400 leading-relaxed">
            Snapshots are session-only and cleared on page refresh. Up to 10 versions are kept.
          </p>
        </div>
      </div>
    </>
  );
}

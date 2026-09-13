'use client';

import React from 'react';
import { AlertTriangle, Maximize2, X, Check } from 'lucide-react';

interface PageFitToastProps {
  isOpen: boolean;
  overflowDeltaPx: number;
  onAutoFit: () => void;
  onClose: () => void;
}

export function PageFitToast({
  isOpen,
  overflowDeltaPx,
  onAutoFit,
  onClose,
}: PageFitToastProps) {
  if (!isOpen) return null;

  return (
    <aside
      aria-label="Resume Page Fit Warning"
      className="fixed bottom-16 right-6 z-40 max-w-sm w-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-xl p-3.5 shadow-2xl border border-zinc-800 dark:border-zinc-200 animate-in fade-in slide-in-from-bottom-3 duration-200 no-print"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4" />
        </div>

        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold">Exceeds 1-Page Target</h4>
            <button
              type="button"
              onClick={onClose}
              className="text-zinc-400 hover:text-white dark:hover:text-zinc-900 p-0.5 rounded transition"
              aria-label="Dismiss warning"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] text-zinc-300 dark:text-zinc-600 leading-relaxed">
            Content extends <span className="font-mono font-bold text-amber-300 dark:text-amber-600">+{overflowDeltaPx}px</span> beyond 1 physical page. Auto-Fit can compress spacing automatically.
          </p>

          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={onAutoFit}
              className="px-3 py-1.5 bg-white text-zinc-900 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              Auto-Fit to 1 Page
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-2.5 py-1.5 text-xs text-zinc-400 hover:text-white dark:hover:text-zinc-900 transition"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

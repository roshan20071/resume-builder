'use client';

import React, { useMemo } from 'react';
import { Maximize2, AlertCircle } from 'lucide-react';
import type { BudgetStatus, ScaleLevel } from '../../src/types/resume';
import { SCALE_CONFIG_MATRIX } from '../../src/utils/pageDimensions';
import { useResumeStore } from '../../src/store/useResumeStore';

interface PageBudgetBarProps {
  usedPercent: number;
  status: BudgetStatus;
  isOverflowing: boolean;
  overflowDeltaPx: number;
  scaleLevel: ScaleLevel;
  autoFitEnabled: boolean;
  onAutoFitToggle: () => void;
  onScaleChange: (lvl: ScaleLevel) => void;
}

export function PageBudgetBar({
  usedPercent,
  status,
  isOverflowing,
  overflowDeltaPx,
  scaleLevel,
  autoFitEnabled,
  onAutoFitToggle,
  onScaleChange,
}: PageBudgetBarProps) {
  const currentScaleConfig = SCALE_CONFIG_MATRIX[scaleLevel];

  const profile = useResumeStore((s) => s.profile);
  const experience = useResumeStore((s) => s.experience);
  const projects = useResumeStore((s) => s.projects);
  const skills = useResumeStore((s) => s.skills);

  const wordCount = useMemo(() => {
    let count = 0;
    const countWords = (str?: string) => {
      if (!str) return;
      count += str.trim().split(/\s+/).filter(Boolean).length;
    };
    countWords(profile.summary);
    experience.forEach((e) => e.bullets.forEach((b) => countWords(b.text)));
    projects.forEach((p) => p.bullets.forEach((b) => countWords(b.text)));
    skills.forEach((c) => c.skills.forEach((s) => countWords(s)));
    return count;
  }, [profile.summary, experience, projects, skills]);

  // Discrete status bar color
  const progressBg = isOverflowing
    ? 'bg-rose-500'
    : usedPercent > 95
    ? 'bg-amber-500'
    : 'bg-zinc-800 dark:bg-zinc-200';

  return (
    <div className="sticky bottom-3 z-30 mx-auto max-w-fit px-3 py-1.5 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-full shadow-lg flex items-center gap-3 text-xs no-print transition-all duration-150">
      {/* Page telemetry */}
      <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 font-medium">
        <span>Page 1 of 1</span>
        <span className="text-zinc-300 dark:text-zinc-700">•</span>
        <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
          {usedPercent}% used
        </span>
        <span className="text-zinc-300 dark:text-zinc-700">•</span>
        <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
          {wordCount} words
        </span>
        {usedPercent >= 85 && !isOverflowing && (
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.2 rounded border border-amber-200/60 dark:border-amber-800/60 font-medium">
            <AlertCircle className="w-2.5 h-2.5" /> 85%+ cap
          </span>
        )}
      </div>

      {/* Discrete 2px progress bar */}
      <div className="w-16 sm:w-20 h-0.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${progressBg} transition-all duration-300 ease-out`}
          style={{ width: `${Math.min(100, usedPercent)}%` }}
        />
      </div>

      {/* Discrete Scale Selector */}
      <div className="flex items-center gap-1 border-l border-zinc-200 dark:border-zinc-800 pl-2">
        <span className="text-[10px] text-zinc-400 font-mono">Scale:</span>
        <div className="inline-flex items-center bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded">
          {[0, 1, 2, 3, 4].map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => onScaleChange(lvl as ScaleLevel)}
              className={`px-1.5 py-0.2 rounded text-[10px] font-mono transition-colors ${
                scaleLevel === lvl
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-2xs font-semibold'
                  : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
              }`}
              title={`Level ${lvl} (${SCALE_CONFIG_MATRIX[lvl as ScaleLevel].fontSizePt}pt)`}
            >
              L{lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Spillover Warning & 1-Click Fix */}
      {isOverflowing && (
        <div className="flex items-center gap-1.5 border-l border-zinc-200 dark:border-zinc-800 pl-2">
          <span className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
            +{overflowDeltaPx}px
          </span>
          {!autoFitEnabled && (
            <button
              type="button"
              onClick={onAutoFitToggle}
              className="px-2 py-0.5 text-[10px] font-medium bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90 rounded transition flex items-center gap-1"
            >
              <Maximize2 className="w-2.5 h-2.5" /> Auto-Fit
            </button>
          )}
        </div>
      )}
    </div>
  );
}

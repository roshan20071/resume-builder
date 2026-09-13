'use client';

import React, { useState, useMemo } from 'react';
import { Sparkles, Check, X, ChevronRight, TrendingUp } from 'lucide-react';
import { transformBulletToXYZ, XYZTransformation } from '../../src/utils/bulletRewriter';

interface BulletRewriterPanelProps {
  originalText: string;
  contextRole?: string;
  onApply: (newText: string) => void;
  onClose: () => void;
}

const TYPE_COLORS: Record<XYZTransformation['type'], string> = {
  performance: 'bg-violet-50 border-violet-200 text-violet-800',
  scale: 'bg-sky-50 border-sky-200 text-sky-800',
  business: 'bg-emerald-50 border-emerald-200 text-emerald-800',
};
const TYPE_BADGE: Record<XYZTransformation['type'], string> = {
  performance: 'bg-violet-100 text-violet-700',
  scale: 'bg-sky-100 text-sky-700',
  business: 'bg-emerald-100 text-emerald-700',
};

/** Simple heuristic ATS score estimate for a bullet variant */
function scoreVariant(text: string): number {
  let score = 0;
  if (/^(Architected|Engineered|Designed|Led|Spearheaded|Delivered|Optimized|Automated|Built|Scaled|Restructured|Streamlined|Directed|Conducted|Overhauled)\b/i.test(text)) score += 30;
  if (/\d+[%xk+]|\$\d|\d+ms|\d+\s*(ms|RPS|M|K|TB|GB)/i.test(text)) score += 40;
  const words = text.trim().split(/\s+/).length;
  if (words >= 10 && words <= 28) score += 20;
  if (!/\b(worked on|helped|assisted|was responsible|managed to|tried)\b/i.test(text)) score += 10;
  return Math.min(score, 100);
}

export function BulletRewriterPanel({
  originalText,
  contextRole = 'Software Engineer',
  onApply,
  onClose,
}: BulletRewriterPanelProps) {
  const [applied, setApplied] = useState<number | null>(null);

  const variants = useMemo(
    () => transformBulletToXYZ(originalText, contextRole),
    [originalText, contextRole]
  );

  const handleApply = (variant: XYZTransformation, index: number) => {
    onApply(variant.bulletText);
    setApplied(index);
    setTimeout(onClose, 600);
  };

  return (
    <div className="mt-2 mb-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-violet-500" />
          <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">XYZ Bullet Rewriter</span>
          <span className="text-[10px] text-zinc-400 font-medium hidden sm:inline">— 3 high-impact variants</span>
        </div>
        <button type="button" onClick={onClose} className="p-1 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Original */}
      <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900">
        <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">Current</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 italic leading-relaxed line-clamp-2">
          {originalText || 'Empty bullet — variants generated from role context.'}
        </p>
      </div>

      {/* Variants */}
      <div className="p-3 space-y-2">
        {variants.map((v, i) => {
          const atsScore = scoreVariant(v.bulletText);
          const isApplied = applied === i;
          return (
            <div key={i} className={`rounded-lg border p-3 transition-all duration-150 ${TYPE_COLORS[v.type]}`}>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${TYPE_BADGE[v.type]}`}>{v.badge}</span>
                  <span className="text-[10px] font-medium opacity-70">{v.label}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <TrendingUp className="w-3 h-3 opacity-60" />
                  <span className="text-[10px] font-bold">{atsScore}%</span>
                </div>
              </div>
              <p className="text-xs leading-relaxed mb-2 font-medium">{v.bulletText}</p>
              <button
                type="button"
                onClick={() => handleApply(v, i)}
                className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-md transition-all ${
                  isApplied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white/70 hover:bg-white text-current border border-current/20 hover:border-current/40'
                }`}
              >
                {isApplied ? <Check className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                {isApplied ? 'Applied!' : 'Use This'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

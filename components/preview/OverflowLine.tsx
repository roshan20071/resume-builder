'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface OverflowLineProps {
  topPx: number;
  overflowDeltaPx: number;
}

export function OverflowLine({ topPx, overflowDeltaPx }: OverflowLineProps) {
  return (
    <>
      {/* 1. Subtle Red Tinted Overlay on Spillover Area (Below Page 1 Cutoff) */}
      <div
        className="absolute left-0 right-0 bottom-0 z-20 pointer-events-none no-print overflow-hidden rounded-b-sm border-x border-b border-rose-400/50 bg-rose-500/[0.08] backdrop-blur-[0.5px] transition-all duration-300"
        style={{ top: `${topPx}px` }}
        aria-hidden="true"
      >
        {/* Subtle patterned diagonal hatch overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:14px_14px] opacity-25 pointer-events-none" />
        
        {/* Subtle bottom-right indicator label */}
        <div className="absolute bottom-2 right-3 text-[10px] font-bold uppercase tracking-wider text-rose-600/80 pointer-events-none">
          Spillover Zone • Will print on Page 2
        </div>
      </div>

      {/* 2. Visual Page 1 Cutoff Boundary Line & Badge */}
      <div
        className="absolute -left-5 -right-5 z-30 pointer-events-none flex items-center justify-between no-print transition-all duration-300"
        style={{ top: `${topPx}px` }}
      >
        {/* Left Dashed Line */}
        <div className="flex-1 h-0 border-t-2 border-dashed border-rose-500 shadow-xs" />

        {/* Center Badge */}
        <div className="mx-3 px-3 py-1 bg-rose-600 text-white rounded-full text-[10.5px] font-bold tracking-wide shadow-md shadow-rose-600/25 flex items-center gap-1.5 uppercase pointer-events-auto border border-rose-400/80 select-none">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>Page 1 Cutoff / Spillover Area</span>
          {overflowDeltaPx > 0 && (
            <span className="bg-rose-950/40 text-rose-100 px-1.5 py-0.2 rounded-full font-mono text-[10px]">
              +{overflowDeltaPx}px
            </span>
          )}
        </div>

        {/* Right Dashed Line */}
        <div className="flex-1 h-0 border-t-2 border-dashed border-rose-500 shadow-xs" />
      </div>
    </>
  );
}

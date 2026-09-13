'use client';

import React, { useMemo } from 'react';
import { useResumeStore } from '../../src/store/useResumeStore';

interface ATSSparklineProps {
  width?: number;
  height?: number;
  currentScore: number;
}

export function ATSSparkline({ width = 120, height = 32, currentScore }: ATSSparklineProps) {
  const snapshots = useResumeStore((s) => s.versionSnapshots);

  const points = useMemo(() => {
    const scores = [...snapshots.map((s) => s.atsScore), currentScore];
    if (scores.length < 2) return null;

    const minScore = Math.max(0, Math.min(...scores) - 5);
    const maxScore = Math.min(100, Math.max(...scores) + 5);
    const range = maxScore - minScore || 1;

    const xStep = width / (scores.length - 1);
    const coords = scores.map((s, i) => ({
      x: i * xStep,
      y: height - ((s - minScore) / range) * height,
    }));

    const pathD = coords
      .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
      .join(' ');

    // area fill path
    const areaD = `${pathD} L${width},${height} L0,${height} Z`;

    return { coords, pathD, areaD, last: coords[coords.length - 1] };
  }, [snapshots, currentScore, width, height]);

  if (!points || snapshots.length === 0) {
    return (
      <div className="flex items-center gap-1.5">
        <div className="w-24 h-6 bg-zinc-100 dark:bg-zinc-800 rounded flex items-center justify-center">
          <span className="text-[9px] text-zinc-400">No history yet</span>
        </div>
      </div>
    );
  }

  const trend = snapshots.length > 0
    ? currentScore - snapshots[0].atsScore
    : 0;
  const trendColor = trend > 0 ? '#10b981' : trend < 0 ? '#ef4444' : '#6b7280';
  const lineColor = currentScore >= 80 ? '#10b981' : currentScore >= 60 ? '#f59e0b' : '#ef4444';

  return (
    <div className="flex items-center gap-2">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        {/* Area fill */}
        <defs>
          <linearGradient id="sparkline-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0.15" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={points.areaD} fill="url(#sparkline-fill)" />
        {/* Line */}
        <path
          d={points.pathD}
          fill="none"
          stroke={lineColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* End dot */}
        <circle cx={points.last.x} cy={points.last.y} r="2.5" fill={lineColor} />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-[9px] text-zinc-400 font-medium">
          {snapshots.length} snapshot{snapshots.length !== 1 ? 's' : ''}
        </span>
        {trend !== 0 && (
          <span className="text-[9px] font-semibold" style={{ color: trendColor }}>
            {trend > 0 ? '+' : ''}{trend} pts
          </span>
        )}
      </div>
    </div>
  );
}

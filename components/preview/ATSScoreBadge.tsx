'use client';

import React, { useMemo } from 'react';
import { ShieldCheck, AlertTriangle, AlertCircle, Sparkles } from 'lucide-react';
import { useResumeStore } from '../../src/store/useResumeStore';
import { auditResume } from '../../src/utils/resumeAuditor';

interface ATSScoreBadgeProps {
  onClick: () => void;
  className?: string;
}

export function ATSScoreBadge({ onClick, className = '' }: ATSScoreBadgeProps) {
  const resume = useResumeStore();

  const auditReport = useMemo(() => {
    return auditResume(resume);
  }, [
    resume.profile,
    resume.experience,
    resume.projects,
    resume.skills,
    resume.education,
    resume.customSections,
  ]);

  const score = auditReport.overallScore;

  const ringColor = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444';

  // Circular progress stroke math
  const radius = 5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800/80 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium transition-all duration-150 ease-out group ${className}`}
      title="Click to open Deep ATS Health Auditor & 1-Click Bullet Fixes"
    >
      {/* Mini Circular SVG Progress */}
      <div className="relative flex items-center justify-center" style={{ width: 14, height: 14 }}>
        <svg width={14} height={14} className="transform -rotate-90">
          <circle
            cx="7"
            cy="7"
            r={radius}
            stroke="currentColor"
            strokeWidth="1.5"
            fill="transparent"
            className="text-zinc-200 dark:text-zinc-700"
          />
          <circle
            cx="7"
            cy="7"
            r={radius}
            stroke={ringColor}
            strokeWidth="1.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-500 ease-out"
          />
        </svg>
      </div>

      <div className="flex items-center gap-1 leading-none">
        <span className="text-[10px] font-semibold text-zinc-900 dark:text-zinc-100">ATS {score}</span>
        <span className="text-[9px] text-zinc-400 dark:text-zinc-500">({auditReport.grade})</span>
      </div>
    </button>
  );
}

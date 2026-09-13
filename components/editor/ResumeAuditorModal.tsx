'use client';

import React, { useState, useMemo } from 'react';
import {
  X,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  ArrowRight,
  Lightbulb,
  TrendingUp,
  Check,
} from 'lucide-react';
import { useResumeStore } from '../../src/store/useResumeStore';
import { auditResume, upgradeWeakBulletText, WeakVerbOccurrence } from '../../src/utils/resumeAuditor';
import { ATSSparkline } from '../preview/ATSSparkline';

interface ResumeAuditorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeAuditorModal({ isOpen, onClose }: ResumeAuditorModalProps) {
  const resume = useResumeStore();
  const updateExperienceBullet = useResumeStore((s) => s.updateExperienceBullet);
  const updateProjectBullet = useResumeStore((s) => s.updateProjectBullet);
  const saveVersionSnapshot = useResumeStore((s) => s.saveVersionSnapshot);

  const [activeTab, setActiveTab] = useState<'verbs' | 'breakdown' | 'checklist'>('verbs');
  const [fixedBulletIds, setFixedBulletIds] = useState<Set<string>>(new Set());
  const [snapshotSaved, setSnapshotSaved] = useState(false);

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

  if (!isOpen) return null;

  const score = auditReport.overallScore;

  // Save a snapshot on first open
  if (!snapshotSaved) {
    setSnapshotSaved(true);
    saveVersionSnapshot(score);
  }

  const handleUpgradeBullet = (weakItem: WeakVerbOccurrence, chosenVerb?: string) => {
    let upgraded = weakItem.upgradedSample;
    if (chosenVerb) {
      const weakRegex = new RegExp(`^(${weakItem.weakPhrase})\\s+`, 'i');
      upgraded = weakItem.originalText.replace(weakRegex, `${chosenVerb} `);
      if (upgraded === weakItem.originalText) {
        upgraded = `${chosenVerb} ${weakItem.originalText}`;
      }
    }

    if (weakItem.sectionType === 'experience') {
      updateExperienceBullet(weakItem.parentId, weakItem.bulletId, upgraded);
    } else {
      updateProjectBullet(weakItem.parentId, weakItem.bulletId, upgraded);
    }

    setFixedBulletIds((prev) => new Set(prev).add(weakItem.bulletId));
  };

  const handleFixAllWeakVerbs = () => {
    auditReport.weakVerbs.forEach((item) => {
      if (item.sectionType === 'experience') {
        updateExperienceBullet(item.parentId, item.bulletId, item.upgradedSample);
      } else {
        updateProjectBullet(item.parentId, item.bulletId, item.upgradedSample);
      }
      setFixedBulletIds((prev) => new Set(prev).add(item.bulletId));
    });
  };

  // Circular progress
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const ringColor = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444';

  const scoreLabel =
    score >= 90 ? 'Elite ATS Ready'
    : score >= 80 ? 'Strong Compatibility'
    : score >= 65 ? 'Moderate — Improvements Needed'
    : 'Critical Issues Found';

  const TABS = [
    { key: 'verbs' as const, label: 'Action Verbs', count: auditReport.weakVerbs.length },
    { key: 'breakdown' as const, label: 'Score Breakdown', count: null },
    { key: 'checklist' as const, label: 'Full Checklist', count: auditReport.issues.length },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in no-print">
      <div className="bg-white rounded-xl shadow-xl border border-zinc-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-900 tracking-tight">ATS Health Auditor</h2>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Real-time scan matching Fortune 500 ATS algorithms (Workday, Greenhouse, Taleo).
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Score Strip */}
        <div className="bg-zinc-50 border-b border-zinc-100 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Circular Score */}
            <div className="relative w-[84px] h-[84px] flex items-center justify-center shrink-0">
              <svg className="w-[84px] h-[84px] transform -rotate-90" viewBox="0 0 84 84">
                <circle cx="42" cy="42" r={radius} stroke="#e4e4e7" strokeWidth="5" fill="transparent" />
                <circle
                  cx="42" cy="42" r={radius}
                  stroke={ringColor}
                  strokeWidth="5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-xl font-black text-zinc-900 leading-none">{score}</span>
                <span className="text-[10px] font-medium text-zinc-400">/100</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-bold text-zinc-900">{scoreLabel}</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200">
                  Grade {auditReport.grade}
                </span>
              </div>
              <p className="text-xs text-zinc-500">
                {auditReport.weakVerbs.length > 0
                  ? `${auditReport.weakVerbs.length} passive verbs weaken your impact — fix them below.`
                  : 'Strong action verbs detected across all sections.'}
              </p>
            </div>
          </div>

          {/* Metric stats */}
          <div className="flex items-center gap-4 text-center">
            <div>
              <div className="text-lg font-black text-zinc-900">{auditReport.metricsStats.metricDensityPercent}%</div>
              <div className="text-[10px] text-zinc-400 font-medium">Metric Density</div>
            </div>
            <div className="h-8 w-px bg-zinc-200" />
            <div>
              <div className="text-lg font-black text-zinc-900">
                {auditReport.metricsStats.metricBulletsCount}/{auditReport.metricsStats.totalBullets}
              </div>
              <div className="text-[10px] text-zinc-400 font-medium">Quantified Bullets</div>
            </div>
            <div className="h-8 w-px bg-zinc-200" />
            <div className="flex flex-col gap-1">
              <div className="text-[10px] text-zinc-400 font-medium">Score History</div>
              <ATSSparkline currentScore={score} width={100} height={28} />
            </div>
          </div>
        </div>


        {/* Tabs */}
        <div className="flex items-center px-6 border-b border-zinc-100 bg-white">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`py-3 px-4 text-xs font-semibold border-b-2 transition flex items-center gap-2 ${
                activeTab === tab.key
                  ? 'border-zinc-900 text-zinc-900'
                  : 'border-transparent text-zinc-400 hover:text-zinc-700'
              }`}
            >
              {tab.label}
              {tab.count !== null && tab.count > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === tab.key ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-zinc-50/30">

          {/* TAB 1: Action Verb Enhancer */}
          {activeTab === 'verbs' && (
            <div className="space-y-4">
              {/* Intro strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white border border-zinc-200 rounded-xl">
                <div>
                  <h4 className="text-xs font-semibold text-zinc-800 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-zinc-500" />
                    Executive Verb Enhancer
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    Phrases like &quot;Responsible for&quot; reduce recruiter impact. Replace with high-velocity verbs.
                  </p>
                </div>
                {auditReport.weakVerbs.length > 0 && (
                  <button
                    type="button"
                    onClick={handleFixAllWeakVerbs}
                    className="px-3 py-1.5 bg-zinc-900 hover:bg-black text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    Upgrade All {auditReport.weakVerbs.length}
                  </button>
                )}
              </div>

              {auditReport.weakVerbs.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-zinc-200">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h4 className="text-sm font-semibold text-zinc-800">Zero weak verbs detected</h4>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto mt-1">
                    Every bullet starts with a punchy, high-impact action verb.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {auditReport.weakVerbs.map((item, idx) => {
                    const isFixed = fixedBulletIds.has(item.bulletId);
                    return (
                      <div
                        key={`${item.bulletId}-${idx}`}
                        className={`p-4 rounded-xl border transition-all bg-white ${
                          isFixed ? 'border-emerald-200 opacity-70' : 'border-zinc-200 hover:border-zinc-300'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-red-50 text-red-600 border border-red-100">
                              Passive: &quot;{item.weakPhrase}&quot;
                            </span>
                            <span className="text-[11px] text-zinc-400 capitalize">{item.sectionType}</span>
                          </div>
                          {isFixed ? (
                            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> Fixed
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleUpgradeBullet(item)}
                              className="px-2.5 py-1 bg-zinc-900 hover:bg-black text-white rounded-md text-xs font-semibold transition flex items-center gap-1"
                            >
                              <Zap className="w-3 h-3" /> Upgrade
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 bg-zinc-50 rounded-lg border border-zinc-100">
                            <div className="text-[10px] font-semibold text-zinc-400 mb-1 uppercase tracking-wide">Original</div>
                            <p className="text-zinc-600 leading-snug">{item.originalText}</p>
                          </div>
                          <div className="p-2.5 bg-white rounded-lg border border-zinc-200">
                            <div className="text-[10px] font-semibold text-zinc-400 mb-1 uppercase tracking-wide">Recommended</div>
                            <p className="text-zinc-900 leading-snug font-medium">{item.upgradedSample}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2.5 border-t border-zinc-100">
                          <span className="text-[10px] font-medium text-zinc-400">Pick verb:</span>
                          {item.suggestedVerbs.map((verb) => (
                            <button
                              key={verb}
                              type="button"
                              onClick={() => handleUpgradeBullet(item, verb)}
                              className="px-2 py-0.5 text-[11px] font-semibold bg-zinc-100 hover:bg-zinc-900 hover:text-white text-zinc-700 rounded border border-zinc-200 hover:border-zinc-900 transition"
                            >
                              {verb}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Score Breakdown */}
          {activeTab === 'breakdown' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { label: 'Contact & Header', score: auditReport.breakdown.contactScore, max: 20 },
                  { label: 'Impact & Metrics', score: auditReport.breakdown.metricsScore, max: 30 },
                  { label: 'Power Action Verbs', score: auditReport.breakdown.actionVerbsScore, max: 25 },
                  { label: 'Skills Breadth', score: auditReport.breakdown.skillsScore, max: 15 },
                ].map((item) => {
                  const pct = Math.round((item.score / item.max) * 100);
                  return (
                    <div key={item.label} className="bg-white p-4 rounded-xl border border-zinc-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-zinc-700">{item.label}</span>
                        <span className="text-xs font-black text-zinc-900">{item.score} / {item.max}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-zinc-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-zinc-900 transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-zinc-400 mt-1.5 font-medium">{pct}% of max possible</div>
                    </div>
                  );
                })}
              </div>

              {auditReport.quickWins.length > 0 && (
                <div className="bg-white rounded-xl p-4 border border-zinc-200">
                  <h4 className="text-xs font-semibold text-zinc-800 mb-3 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    High-impact quick wins to reach 95+ score
                  </h4>
                  <ul className="space-y-2">
                    {auditReport.quickWins.map((win, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-zinc-600">
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                        {win}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Full Checklist */}
          {activeTab === 'checklist' && (
            <div className="space-y-2">
              {auditReport.issues.map((issue) => (
                <div
                  key={issue.id}
                  className="p-3.5 rounded-xl border border-zinc-200 flex items-start gap-3 bg-white"
                >
                  <div className="mt-0.5 shrink-0">
                    {issue.type === 'critical' && <AlertCircle className="w-4 h-4 text-red-500" />}
                    {issue.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                    {issue.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <h4 className="text-xs font-semibold text-zinc-800 truncate">{issue.title}</h4>
                        <span className="text-[10px] font-medium uppercase px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-500 shrink-0">
                          {issue.category}
                        </span>
                      </div>
                      <span
                        className={`text-xs font-black shrink-0 ${
                          issue.pointsDelta > 0 ? 'text-emerald-600'
                          : issue.pointsDelta < 0 ? 'text-red-500'
                          : 'text-zinc-400'
                        }`}
                      >
                        {issue.pointsDelta > 0 ? `+${issue.pointsDelta}` : issue.pointsDelta} pts
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5 leading-snug">{issue.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-zinc-100 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <TrendingUp className="w-3.5 h-3.5" />
            Live audit — updates instantly from your active resume data.
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-zinc-900 hover:bg-black text-white text-xs font-semibold rounded-lg transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

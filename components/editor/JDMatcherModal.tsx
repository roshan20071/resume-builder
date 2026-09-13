'use client';

import React, { useState, useMemo } from 'react';
import {
  X,
  Target,
  CheckCircle,
  AlertCircle,
  Check,
  Plus,
  Zap,
  BarChart3,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useResumeStore } from '../../src/store/useResumeStore';
import {
  analyzeJobDescription,
  injectKeywordsIntoSkills,
  formatKeyword,
} from '../../src/utils/jdMatcher';

interface JDMatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SKILL_CATEGORY_MAP: Record<string, string[]> = {
  'Languages': ['typescript', 'javascript', 'python', 'go', 'golang', 'java', 'c++', 'c#', 'ruby', 'rust', 'php', 'swift', 'kotlin', 'sql', 'html', 'css', 'r', 'dart'],
  'Frameworks & Libraries': ['react', 'next.js', 'angular', 'vue', 'vue.js', 'node', 'node.js', 'express', 'django', 'flask', 'fastapi', 'spring', 'tailwind', 'redux', 'svelte'],
  'Cloud & DevOps': ['aws', 'gcp', 'azure', 'docker', 'kubernetes', 'k8s', 'terraform', 'ci/cd', 'linux', 'git', 'github', 'jenkins', 'serverless', 'helm'],
  'Databases & Architecture': ['postgresql', 'postgres', 'mongodb', 'redis', 'mysql', 'graphql', 'rest', 'kafka', 'elasticsearch', 'dynamodb', 'microservices', 'sqlite'],
};

export function JDMatcherModal({ isOpen, onClose }: JDMatcherModalProps) {
  const resumeState = useResumeStore((s) => s);
  const jdState = useResumeStore((s) => s.jdState);
  const skills = useResumeStore((s) => s.skills);
  const setJDAnalysis = useResumeStore((s) => s.setJDAnalysis);
  const updateProfile = useResumeStore((s) => s.updateProfile);
  const tailoringModeActive = useResumeStore((s) => s.tailoringModeActive);
  const setTailoringMode = useResumeStore((s) => s.setTailoringMode);

  const [rawText, setRawText] = useState(jdState?.rawText || '');
  const [justAutoFilled, setJustAutoFilled] = useState(false);
  const [activeTab, setActiveTab] = useState<'keywords' | 'skill_gap'>('keywords');

  if (!isOpen) return null;

  const handleAnalyze = () => {
    if (!rawText.trim()) return;
    const analysis = analyzeJobDescription(rawText, resumeState);
    setJDAnalysis(analysis);
    setJustAutoFilled(false);
  };

  const matchedKeywords = jdState?.extractedKeywords.filter((k) => k.matched) || [];
  const missingKeywords = jdState?.extractedKeywords.filter((k) => !k.matched) || [];

  const handleAutoFillAll = () => {
    if (missingKeywords.length === 0) return;
    const missingKws = missingKeywords.map((k) => k.keyword);
    const updatedSkills = injectKeywordsIntoSkills(skills, missingKws);
    useResumeStore.setState({ skills: updatedSkills });

    if (jdState?.targetRole && jdState.targetRole !== 'Target Role' && jdState.targetRole.length < 50) {
      updateProfile({ targetRole: jdState.targetRole });
    }

    const updatedState = useResumeStore.getState();
    const newAnalysis = analyzeJobDescription(rawText || jdState?.rawText || '', updatedState);
    setJDAnalysis(newAnalysis);
    setJustAutoFilled(true);
  };

  const handleAddSingleKeyword = (keyword: string) => {
    const updatedSkills = injectKeywordsIntoSkills(skills, [keyword]);
    useResumeStore.setState({ skills: updatedSkills });

    const updatedState = useResumeStore.getState();
    const newAnalysis = analyzeJobDescription(rawText || jdState?.rawText || '', updatedState);
    setJDAnalysis(newAnalysis);
  };

  // Group keywords into skill categories for Skill Gap view
  const categoryGaps = useMemo(() => {
    if (!jdState || jdState.extractedKeywords.length === 0) return [];

    const categories: Array<{
      name: string;
      matched: typeof jdState.extractedKeywords;
      missing: typeof jdState.extractedKeywords;
      total: number;
      percentage: number;
    }> = [];

    const assigned = new Set<string>();

    Object.entries(SKILL_CATEGORY_MAP).forEach(([catName, kwList]) => {
      const catKeywords = jdState.extractedKeywords.filter((k) =>
        kwList.some((item) => k.keyword.toLowerCase() === item.toLowerCase())
      );
      if (catKeywords.length > 0) {
        catKeywords.forEach((k) => assigned.add(k.keyword));
        const matched = catKeywords.filter((k) => k.matched);
        const missing = catKeywords.filter((k) => !k.matched);
        categories.push({
          name: catName,
          matched,
          missing,
          total: catKeywords.length,
          percentage: Math.round((matched.length / catKeywords.length) * 100),
        });
      }
    });

    const otherKeywords = jdState.extractedKeywords.filter((k) => !assigned.has(k.keyword));
    if (otherKeywords.length > 0) {
      const matched = otherKeywords.filter((k) => k.matched);
      const missing = otherKeywords.filter((k) => !k.matched);
      categories.push({
        name: 'Tools & Other Competencies',
        matched,
        missing,
        total: otherKeywords.length,
        percentage: Math.round((matched.length / otherKeywords.length) * 100),
      });
    }

    return categories;
  }, [jdState]);

  const score = jdState?.matchScore ?? null;
  const scoreColor = score === null ? '' : score >= 80 ? 'text-emerald-600' : score >= 55 ? 'text-amber-600' : 'text-red-600';

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in no-print">
      <div className="bg-white dark:bg-zinc-900 rounded-xl max-w-2xl w-full shadow-xl border border-zinc-200 dark:border-zinc-800 max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-white flex items-center justify-center">
              <Target className="w-4 h-4 text-white dark:text-zinc-900" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">JD Keyword Matcher</h3>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Paste any job posting — see match score, skill gaps &amp; inline tailoring cues.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">

          {/* Textarea + Scan */}
          <div>
            <label className="block text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Job Description
            </label>
            <textarea
              rows={4}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Paste full job posting here — e.g. We are looking for a Senior Frontend Engineer with React, TypeScript, a11y, and CI/CD experience..."
              className="w-full text-xs p-3 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-zinc-900/20 focus:border-zinc-400 outline-none resize-none leading-relaxed bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400"
            />
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={handleAnalyze}
                className="px-4 py-2 text-xs font-semibold bg-zinc-900 hover:bg-black text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 rounded-lg flex items-center gap-1.5 transition active:scale-95"
              >
                <Target className="w-3.5 h-3.5" />
                Scan &amp; Match
              </button>
            </div>
          </div>

          {/* Auto-fill success banner */}
          {justAutoFilled && (
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>All missing skills were injected into your resume. Match score: <strong>{jdState?.matchScore}%</strong></span>
            </div>
          )}

          {/* Results */}
          {jdState && jdState.extractedKeywords.length > 0 && (
            <div className="space-y-5">

              {/* Score row */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                <div>
                  <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">Keyword Match Score</p>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-3xl font-black ${scoreColor}`}>{jdState.matchScore}%</span>
                    <span className="text-xs text-zinc-400 font-medium">
                      {matchedKeywords.length} / {jdState.extractedKeywords.length} keywords
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {missingKeywords.length > 0 && (
                    <button
                      type="button"
                      onClick={handleAutoFillAll}
                      className="px-3.5 py-2 text-xs font-semibold bg-zinc-900 hover:bg-black text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 rounded-lg flex items-center gap-1.5 transition active:scale-95 shadow-xs"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      Auto-fill {missingKeywords.length} missing
                    </button>
                  )}
                </div>
              </div>

              {/* Tab Navigation: Keywords vs Skill Gap */}
              <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('keywords')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                    activeTab === 'keywords'
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <Target className="w-3.5 h-3.5" />
                  All Keywords ({jdState.extractedKeywords.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('skill_gap')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                    activeTab === 'skill_gap'
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  Skill Gap Breakdown
                </button>
              </div>

              {/* Tab 1: Keywords View */}
              {activeTab === 'keywords' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Missing */}
                  {missingKeywords.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                          Missing ({missingKeywords.length})
                        </h4>
                        <span className="text-[10px] text-zinc-400">click to add</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {missingKeywords.map((k) => (
                          <button
                            key={k.keyword}
                            type="button"
                            onClick={() => handleAddSingleKeyword(k.keyword)}
                            className="px-2 py-1 bg-zinc-100 hover:bg-zinc-900 hover:text-white dark:bg-zinc-800 dark:hover:bg-white dark:hover:text-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 rounded-md text-[11px] font-medium flex items-center gap-1 transition group"
                          >
                            <Plus className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />
                            {formatKeyword(k.keyword)}
                            <span className="text-[10px] opacity-50 font-normal">×{k.frequencyInJD}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matched */}
                  {matchedKeywords.length > 0 && (
                    <div>
                      <h4 className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        Matched ({matchedKeywords.length})
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {matchedKeywords.map((k) => (
                          <span
                            key={k.keyword}
                            className="px-2 py-1 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 rounded-md text-[11px] font-medium flex items-center gap-1"
                          >
                            <Check className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                            {formatKeyword(k.keyword)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Skill Gap Category Breakdown */}
              {activeTab === 'skill_gap' && (
                <div className="space-y-4">
                  {categoryGaps.map((cat) => (
                    <div key={cat.name} className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-zinc-800 dark:text-zinc-200">{cat.name}</span>
                        <span className="font-mono text-[11px] text-zinc-500">
                          {cat.matched.length}/{cat.total} matched ({cat.percentage}%)
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            cat.percentage >= 80 ? 'bg-emerald-500' : cat.percentage >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${cat.percentage}%` }}
                        />
                      </div>

                      {/* Chips */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {cat.matched.map((k) => (
                          <span key={k.keyword} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 font-medium">
                            <Check className="w-2.5 h-2.5" />
                            {formatKeyword(k.keyword)}
                          </span>
                        ))}
                        {cat.missing.map((k) => (
                          <button
                            key={k.keyword}
                            type="button"
                            onClick={() => handleAddSingleKeyword(k.keyword)}
                            className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 border border-zinc-200 dark:border-zinc-700 font-medium transition"
                          >
                            <Plus className="w-2.5 h-2.5 opacity-60" />
                            {formatKeyword(k.keyword)}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer with Tailoring Mode Toggle */}
        <div className="border-t border-zinc-100 dark:border-zinc-800 px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Tailoring Mode Toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTailoringMode(!tailoringModeActive)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                tailoringModeActive
                  ? 'bg-violet-600 text-white shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailoring Mode: {tailoringModeActive ? 'ON' : 'OFF'}</span>
            </button>
            <span className="text-[11px] text-zinc-400 hidden sm:inline">
              (Coloured cues on editor sections)
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold bg-zinc-900 hover:bg-black text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 rounded-lg transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}


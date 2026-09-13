'use client';

import React, { useState } from 'react';
import { X, PenTool, Check, CheckCircle2, ArrowRight, Lightbulb, RefreshCw } from 'lucide-react';
import { generateBulletsFromInterview, type GeneratedBulletOption } from '../../src/utils/interviewGenerator';
import { useResumeStore } from '../../src/store/useResumeStore';

interface InterviewBulletGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetExpId?: string;
}

export function InterviewBulletGeneratorModal({
  isOpen,
  onClose,
  targetExpId,
}: InterviewBulletGeneratorModalProps) {
  const experience = useResumeStore((s) => s.experience);
  const addExperienceBullet = useResumeStore((s) => s.addExperienceBullet);

  const [selectedExpId, setSelectedExpId] = useState<string>(
    targetExpId || experience[0]?.id || ''
  );
  const [task, setTask] = useState('');
  const [stack, setStack] = useState('');
  const [outcome, setOutcome] = useState('');
  const [results, setResults] = useState<GeneratedBulletOption[] | null>(null);

  if (!isOpen) return null;

  const handleGenerate = () => {
    if (!task.trim()) return;
    const bullets = generateBulletsFromInterview({ task, stack, outcome });
    setResults(bullets);
  };

  const handleApply = (bulletText: string) => {
    if (!selectedExpId && experience.length > 0) {
      addExperienceBullet(experience[0].id, bulletText);
    } else if (selectedExpId) {
      addExperienceBullet(selectedExpId, bulletText);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-gray-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <PenTool className="w-4.5 h-4.5 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Guided Bullet Builder</h3>
              <p className="text-xs text-gray-500">
                Answer 3 quick prompt questions to format your experience into Google XYZ quantified statements.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {/* Target Experience Position */}
          {experience.length > 0 && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Insert Formatted Bullet Into:
              </label>
              <select
                value={selectedExpId}
                onChange={(e) => setSelectedExpId(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
              >
                {experience.map((exp) => (
                  <option key={exp.id} value={exp.id}>
                    {exp.position} @ {exp.company || 'Company'}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 3 Questions */}
          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center font-bold">1</span>
                What feature, system, or project did you build/lead?
              </label>
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="e.g. real-time billing microservice, customer analytics dashboard, Kubernetes migration"
                className="w-full text-xs px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center font-bold">2</span>
                What tech stack, tools, or frameworks did you use?
              </label>
              <input
                type="text"
                value={stack}
                onChange={(e) => setStack(e.target.value)}
                placeholder="e.g. React, Next.js, Node.js, PostgreSQL, Docker"
                className="w-full text-xs px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center font-bold">3</span>
                What was the measurable outcome or scale? (Numbers, %, time saved, users)
              </label>
              <input
                type="text"
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
                placeholder="e.g. reduced latency by 65%, automated billing for 12,000 users, saved $14K/mo"
                className="w-full text-xs px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleGenerate}
                className="px-4 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-lg shadow-sm flex items-center gap-1.5 transition active:scale-95"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Format Google XYZ Bullets
              </button>
            </div>
          </div>

          {/* Generated Results */}
          {results && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                Select High-Impact Variation to Insert:
              </h4>

              {results.map((opt) => (
                <div
                  key={opt.id}
                  className="p-3.5 bg-white border border-gray-200 hover:border-indigo-400 rounded-xl shadow-2xs space-y-2 transition group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900">{opt.title}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {opt.badge}
                    </span>
                  </div>

                  <p className="text-xs text-gray-800 leading-relaxed font-medium">
                    {opt.bulletText}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                    <span className="text-[10.5px] text-emerald-700 font-semibold">
                      ✓ Action: {opt.actionVerb} • Metric: {opt.xyzBreakdown.y_measuredBy}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleApply(opt.bulletText)}
                      className="px-3 py-1 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-md flex items-center gap-1 transition"
                    >
                      <Check className="w-3.5 h-3.5" /> Insert Bullet
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-gray-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

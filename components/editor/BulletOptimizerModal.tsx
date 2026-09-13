'use client';

import React, { useState } from 'react';
import { X, PenTool, Scissors, Check, ArrowRight, Zap, RefreshCw, CheckCircle2 } from 'lucide-react';
import { transformBulletToXYZ, type XYZTransformation } from '../../src/utils/bulletRewriter';
import { analyzeLineTrim } from '../../src/utils/lineTrimmer';
import { analyzeBulletPoint } from '../../src/utils/bulletChecker';

interface BulletOptimizerModalProps {
  isOpen: boolean;
  initialText: string;
  onClose: () => void;
  onApply: (newText: string) => void;
}

export function BulletOptimizerModal({
  isOpen,
  initialText,
  onClose,
  onApply,
}: BulletOptimizerModalProps) {
  const [currentText, setCurrentText] = useState(initialText);
  const [activeTab, setActiveTab] = useState<'xyz' | 'trim'>('xyz');

  if (!isOpen) return null;

  const transformations = transformBulletToXYZ(currentText);
  const lineTrimAnalysis = analyzeLineTrim(currentText);
  const currentBulletAnalysis = analyzeBulletPoint(currentText);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-gray-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-4.5 h-4.5 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Bullet Enhancer & Line Trimmer</h3>
              <p className="text-xs text-gray-500">
                Format your bullet with measurable Google XYZ impact or trim trailing orphan words.
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

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 pt-3">
          <button
            type="button"
            onClick={() => setActiveTab('xyz')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'xyz'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Google XYZ Variations (3 Styles)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('trim')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'trim'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Scissors className="w-3.5 h-3.5" />
            Line-Trim Advisor {lineTrimAnalysis.isWidowOrphan ? '⚠️ (Saves 1 Line!)' : ''}
          </button>
        </div>

        {/* Current Bullet Input */}
        <div className="py-3">
          <label className="block text-[11px] font-semibold text-gray-600 mb-1">
            Current Bullet Point (XYZ Score: {currentBulletAnalysis.score}%)
          </label>
          <textarea
            rows={2}
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
            className="w-full text-xs p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none resize-none leading-relaxed"
          />
        </div>

        {/* Tab 1: XYZ Transformations */}
        {activeTab === 'xyz' && (
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            <p className="text-xs text-gray-500">
              Select one of the three tailored Google XYZ formula alternatives to instantly replace your bullet:
            </p>

            {transformations.map((trans, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-gray-50/80 hover:bg-blue-50/50 border border-gray-200 hover:border-blue-300 rounded-xl transition group flex flex-col justify-between gap-2.5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      {trans.label}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      {trans.badge}
                    </span>
                  </div>
                  <p className="text-xs text-gray-800 leading-relaxed font-medium">
                    {trans.bulletText}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-200/60">
                  <div className="flex items-center gap-2 text-[10px] text-gray-500">
                    <span>Verb: <strong>{trans.actionVerb}</strong></span>
                    <span>•</span>
                    <span className="text-emerald-700 font-medium">100% XYZ Compliant</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onApply(trans.bulletText);
                      onClose();
                    }}
                    className="px-3 py-1 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-xs flex items-center gap-1 transition active:scale-95"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Use This Bullet
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Line-Trim Advisor */}
        {activeTab === 'trim' && (
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-900 flex items-center gap-1.5">
                  <Scissors className="w-4 h-4 text-amber-600" />
                  Line-Wrap Diagnostics
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold text-[11px]">
                  {lineTrimAnalysis.estimatedLines} Lines ({lineTrimAnalysis.originalCharCount} Chars)
                </span>
              </div>
              <p className="text-amber-800 leading-relaxed">
                {lineTrimAnalysis.explanation}
              </p>
            </div>

            {lineTrimAnalysis.suggestedText && (
              <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    Recommended Concise Rewording
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Saves {lineTrimAnalysis.savedChars} chars
                  </span>
                </div>
                <p className="text-xs text-gray-900 leading-relaxed font-medium">
                  {lineTrimAnalysis.suggestedText}
                </p>
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (lineTrimAnalysis.suggestedText) {
                        onApply(lineTrimAnalysis.suggestedText);
                        onClose();
                      }
                    }}
                    className="px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-md shadow-xs flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Apply Trimmed Bullet
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

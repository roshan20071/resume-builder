'use client';

import React, { useState } from 'react';
import { X, Linkedin, FileText, CheckCircle, AlertCircle, ArrowRight, Copy } from 'lucide-react';
import { useResumeStore } from '../../src/store/useResumeStore';
import { parseRawResumeText } from '../../src/utils/resumeParser';

interface LinkedInImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LINKEDIN_STEPS = [
  'Go to your LinkedIn profile page',
  'Press Ctrl+A (Windows) or Cmd+A (Mac) to select all text',
  'Press Ctrl+C / Cmd+C to copy',
  'Paste below with Ctrl+V / Cmd+V',
];

export function LinkedInImportModal({ isOpen, onClose }: LinkedInImportModalProps) {
  const createSlot = useResumeStore((s) => s.createSlot);

  const [step, setStep] = useState<'guide' | 'paste' | 'done'>('guide');
  const [pastedText, setPastedText] = useState('');
  const [error, setError] = useState('');
  const [importedSlotName, setImportedSlotName] = useState('');

  if (!isOpen) return null;

  const handleImport = () => {
    if (pastedText.trim().length < 80) {
      setError('Text seems too short. Please paste your full LinkedIn profile page content.');
      return;
    }
    setError('');
    const parsed = parseRawResumeText(pastedText);
    const candidateName = parsed.profile?.fullName?.trim();
    const slotName = candidateName ? `${candidateName} (LinkedIn)` : `LinkedIn Import`;
    createSlot(slotName, parsed);
    setImportedSlotName(slotName);
    setStep('done');
  };

  const handleClose = () => {
    setStep('guide');
    setPastedText('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm no-print">
      <div className="bg-white rounded-xl shadow-xl border border-zinc-200 w-full max-w-lg flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0077b5] flex items-center justify-center">
              <Linkedin className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-900 tracking-tight">Import from LinkedIn</h2>
              <p className="text-[11px] text-zinc-400 mt-0.5">Paste your profile text to auto-fill your resume</p>
            </div>
          </div>
          <button type="button" onClick={handleClose} className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {step === 'guide' && (
            <>
              <div className="rounded-xl bg-[#0077b5]/5 border border-[#0077b5]/20 p-4 space-y-3">
                <p className="text-xs font-semibold text-[#0077b5]">How to copy your LinkedIn profile:</p>
                <ol className="space-y-2">
                  {LINKEDIN_STEPS.map((s, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-700">
                      <span className="w-5 h-5 rounded-full bg-[#0077b5]/10 text-[#0077b5] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
              <p className="text-[11px] text-zinc-400">
                💡 This works best when you copy from your own LinkedIn profile page (not someone else&apos;s). The parser extracts name, headline, experience, education, and skills.
              </p>
              <button
                type="button"
                onClick={() => setStep('paste')}
                className="w-full py-2.5 bg-[#0077b5] hover:bg-[#006199] text-white rounded-lg text-xs font-semibold transition flex items-center justify-center gap-2"
              >
                I copied my profile — Paste it now
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          {step === 'paste' && (
            <>
              <div>
                <label className="block text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Paste LinkedIn Profile Text
                </label>
                <textarea
                  rows={10}
                  value={pastedText}
                  onChange={(e) => { setPastedText(e.target.value); setError(''); }}
                  placeholder="Paste your full LinkedIn profile text here (Ctrl+V / Cmd+V)..."
                  className="w-full text-xs p-3 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-[#0077b5]/20 focus:border-[#0077b5]/50 outline-none resize-none leading-relaxed bg-zinc-50 text-zinc-700 placeholder:text-zinc-400"
                  autoFocus
                />
                {error && (
                  <p className="mt-1.5 text-[11px] text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" /> {error}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep('guide')}
                  className="px-4 py-2 text-xs font-medium text-zinc-500 hover:text-zinc-800 border border-zinc-200 rounded-lg transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleImport}
                  disabled={pastedText.trim().length < 20}
                  className="flex-1 py-2 bg-zinc-900 hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Import & Create Resume Slot
                </button>
              </div>
            </>
          )}

          {step === 'done' && (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-900">Import Successful!</h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Created new resume slot: <strong className="text-zinc-800">{importedSlotName}</strong>
                </p>
              </div>
              <p className="text-[11px] text-zinc-400 max-w-xs mx-auto">
                Review and refine the imported content in the editor. LinkedIn text can vary — double-check dates and bullets.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2 bg-zinc-900 hover:bg-black text-white rounded-lg text-xs font-semibold transition"
              >
                Open in Editor
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

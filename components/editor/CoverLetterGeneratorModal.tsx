'use client';

import React, { useState, useMemo } from 'react';
import { X, Mail, Copy, Check, Sparkles, FileText, ExternalLink } from 'lucide-react';
import { useResumeStore } from '../../src/store/useResumeStore';
import { generateCoverLetter } from '../../src/utils/coverLetterGenerator';

interface CoverLetterGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCanvas: () => void;
}

export function CoverLetterGeneratorModal({ isOpen, onClose, onOpenCanvas }: CoverLetterGeneratorModalProps) {
  const resume = useResumeStore();

  const [companyName, setCompanyName] = useState('');
  const [targetRole, setTargetRole] = useState(resume.profile.targetRole || '');
  const [hiringManager, setHiringManager] = useState('');
  const [customNote, setCustomNote] = useState('');
  const [generated, setGenerated] = useState(false);
  const [copiedLetter, setCopiedLetter] = useState(false);
  const [copiedInMail, setCopiedInMail] = useState(false);

  const coverLetter = useMemo(() => {
    if (!generated) return null;
    return generateCoverLetter(resume, {
      companyName,
      targetRole,
      hiringManagerName: hiringManager,
      customNote,
    });
  }, [generated, resume, companyName, targetRole, hiringManager, customNote]);

  if (!isOpen) return null;

  const fullLetterText = coverLetter
    ? [
        coverLetter.letterDate,
        '',
        coverLetter.recipientGreeting,
        '',
        coverLetter.paragraph1_hook,
        '',
        coverLetter.paragraph2_achievements,
        '',
        coverLetter.paragraph3_alignment_closing,
        '',
        coverLetter.signoff,
      ].join('\n')
    : '';

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(fullLetterText);
    setCopiedLetter(true);
    setTimeout(() => setCopiedLetter(false), 2500);
  };

  const handleCopyInMail = () => {
    if (!coverLetter) return;
    navigator.clipboard.writeText(coverLetter.recruiterInMail);
    setCopiedInMail(true);
    setTimeout(() => setCopiedInMail(false), 2500);
  };

  const handleGenerate = () => {
    setGenerated(false);
    setTimeout(() => setGenerated(true), 50); // force re-memo
  };

  const handleOpenCanvas = () => {
    onClose();
    onOpenCanvas();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm no-print">
      <div className="bg-white rounded-xl shadow-xl border border-zinc-200 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-900 tracking-tight">Cover Letter Generator</h2>
              <p className="text-[11px] text-zinc-400 mt-0.5">Auto-generate a tailored cover letter from your resume</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: 'Company Name *', value: companyName, set: setCompanyName, placeholder: 'e.g. Google, Stripe, Figma' },
              { label: 'Target Role *', value: targetRole, set: setTargetRole, placeholder: 'e.g. Senior Frontend Engineer' },
              { label: 'Hiring Manager (optional)', value: hiringManager, set: setHiringManager, placeholder: 'e.g. Jane Smith' },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">{f.label}</label>
                <input
                  type="text"
                  value={f.value}
                  onChange={(e) => f.set(e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-800 placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-900/20 focus:border-zinc-400 outline-none transition"
                />
              </div>
            ))}
            <div>
              <label className="block text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Custom Note (optional)</label>
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="e.g. Referred by John Doe"
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-800 placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-900/20 focus:border-zinc-400 outline-none transition"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={!companyName.trim() || !targetRole.trim()}
            className="w-full py-2.5 bg-zinc-900 hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg text-xs font-semibold transition flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {generated ? 'Regenerate Cover Letter' : 'Generate Cover Letter'}
          </button>

          {/* Generated Output */}
          {coverLetter && (
            <div className="space-y-4">
              {/* Full Letter */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Cover Letter</p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyLetter}
                      className={`flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-md transition ${copiedLetter ? 'bg-emerald-600 text-white' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'}`}
                    >
                      {copiedLetter ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copiedLetter ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      type="button"
                      onClick={handleOpenCanvas}
                      className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-500 hover:text-zinc-800 transition"
                    >
                      <ExternalLink className="w-3 h-3" /> Open Canvas
                    </button>
                  </div>
                </div>
                <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-xs text-zinc-700 leading-relaxed space-y-3 max-h-56 overflow-y-auto">
                  <p className="text-zinc-400 text-[10px]">{coverLetter.letterDate}</p>
                  <p className="font-medium">{coverLetter.recipientGreeting}</p>
                  <p>{coverLetter.paragraph1_hook}</p>
                  <p>{coverLetter.paragraph2_achievements}</p>
                  <p>{coverLetter.paragraph3_alignment_closing}</p>
                  <p className="whitespace-pre-line font-medium">{coverLetter.signoff}</p>
                </div>
              </div>

              {/* Recruiter InMail */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> LinkedIn InMail (3-sentence)
                  </p>
                  <button
                    type="button"
                    onClick={handleCopyInMail}
                    className={`flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-md transition ${copiedInMail ? 'bg-emerald-600 text-white' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'}`}
                  >
                    {copiedInMail ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copiedInMail ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-xs text-zinc-700 leading-relaxed whitespace-pre-line">
                  {coverLetter.recruiterInMail}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-100 px-6 py-3 flex items-center justify-between">
          <p className="text-[11px] text-zinc-400">Generated from your resume data — always review before sending.</p>
          <button type="button" onClick={onClose} className="px-4 py-1.5 bg-zinc-900 hover:bg-black text-white font-semibold rounded-lg text-xs transition">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

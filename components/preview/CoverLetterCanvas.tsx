'use client';

import React, { useState } from 'react';
import { Mail, Copy, Check, RefreshCw, Building, Printer } from 'lucide-react';
import { useResumeStore } from '../../src/store/useResumeStore';
import { generateCoverLetter } from '../../src/utils/coverLetterGenerator';
import { FONT_FAMILY_STACKS } from '../../src/utils/pageDimensions';

export function CoverLetterCanvas() {
  const data = useResumeStore((state) => state);
  const { profile, templateConfig } = data;

  const [companyName, setCompanyName] = useState('Stripe');
  const [targetRole, setTargetRole] = useState(profile.targetRole || 'Senior Software Engineer');
  const [hiringManager, setHiringManager] = useState('');
  const [copiedInMail, setCopiedInMail] = useState(false);

  const letter = generateCoverLetter(data, {
    companyName,
    targetRole,
    hiringManagerName: hiringManager,
  });

  const [bodyP1, setBodyP1] = useState(letter.paragraph1_hook);
  const [bodyP2, setBodyP2] = useState(letter.paragraph2_achievements);
  const [bodyP3, setBodyP3] = useState(letter.paragraph3_alignment_closing);

  const handleRegenerate = () => {
    const fresh = generateCoverLetter(data, {
      companyName,
      targetRole,
      hiringManagerName: hiringManager,
    });
    setBodyP1(fresh.paragraph1_hook);
    setBodyP2(fresh.paragraph2_achievements);
    setBodyP3(fresh.paragraph3_alignment_closing);
  };

  const handleCopyInMail = () => {
    navigator.clipboard.writeText(letter.recruiterInMail);
    setCopiedInMail(true);
    setTimeout(() => setCopiedInMail(false), 2000);
  };

  const fontFamily = FONT_FAMILY_STACKS[templateConfig.fontFamily] || FONT_FAMILY_STACKS.inter;
  const accentColor = templateConfig.accentColor || '#2563eb';

  return (
    <div className="w-full max-w-[900px] mx-auto py-2 space-y-4">
      {/* Control Strip */}
      <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs space-y-3 no-print">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-gray-900">Matching 1-Page Cover Letter Generator</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyInMail}
              className="px-3 py-1.5 text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg flex items-center gap-1.5 transition"
            >
              {copiedInMail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedInMail ? 'InMail Copied!' : 'Copy 3-Sentence Recruiter InMail'}
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / PDF
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          <div>
            <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Target Company</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Stripe, Google, Airbnb"
              className="w-full text-xs px-2.5 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Target Role</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Senior Full-Stack Engineer"
              className="w-full text-xs px-2.5 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Hiring Manager (Optional)</label>
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={hiringManager}
                onChange={(e) => setHiringManager(e.target.value)}
                placeholder="e.g. Sarah Connor"
                className="w-full text-xs px-2.5 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={handleRegenerate}
                className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md shrink-0"
                title="Update cover letter"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Cover Letter Paper Canvas */}
      <div className="flex justify-center pb-12">
        <div
          style={{ fontFamily }}
          className="resume-canvas-wrapper resume-printable-area resume-canvas-a4 p-12 bg-white text-gray-900 shadow-md text-xs leading-relaxed space-y-6"
        >
          {/* Header */}
          <header className="border-b pb-4" style={{ borderColor: templateConfig.engineMode === 'modern_clean' ? `${accentColor}44` : '#d1d5db' }}>
            <h1 className="text-xl font-extrabold text-gray-950 uppercase tracking-tight mb-1">
              {profile.fullName || 'YOUR NAME'}
            </h1>
            <p className="text-sm font-semibold" style={{ color: templateConfig.engineMode === 'modern_clean' ? accentColor : '#374151' }}>
              {profile.targetRole || 'Software Engineer'}
            </p>
            <div className="flex flex-wrap gap-x-3 text-gray-600 text-[11px] mt-1.5">
              {profile.location && <span>{profile.location}</span>}
              {profile.email && <span>• {profile.email}</span>}
              {profile.phone && <span>• {profile.phone}</span>}
              {profile.linkedin && <span>• {profile.linkedin}</span>}
            </div>
          </header>

          {/* Date & Recipient */}
          <div className="space-y-1">
            <p className="text-gray-500 font-medium">{letter.letterDate}</p>
            <p className="font-bold text-gray-900 mt-2">{letter.recipientGreeting}</p>
          </div>

          {/* Letter Body (Clickable to Edit) */}
          <div className="space-y-4 text-gray-800 leading-relaxed text-[11.5px]">
            <textarea
              rows={3}
              value={bodyP1}
              onChange={(e) => setBodyP1(e.target.value)}
              className="w-full p-2 border border-transparent hover:border-gray-200 focus:border-blue-500 rounded bg-transparent outline-none resize-none leading-relaxed"
            />
            <textarea
              rows={4}
              value={bodyP2}
              onChange={(e) => setBodyP2(e.target.value)}
              className="w-full p-2 border border-transparent hover:border-gray-200 focus:border-blue-500 rounded bg-transparent outline-none resize-none leading-relaxed"
            />
            <textarea
              rows={3}
              value={bodyP3}
              onChange={(e) => setBodyP3(e.target.value)}
              className="w-full p-2 border border-transparent hover:border-gray-200 focus:border-blue-500 rounded bg-transparent outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Signoff */}
          <div className="pt-4 space-y-4">
            <p className="font-medium text-gray-700">Sincerely,</p>
            <p className="font-bold text-gray-950 text-sm">{profile.fullName || 'Candidate'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

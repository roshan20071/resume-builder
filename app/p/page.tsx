'use client';

export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Download,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  Share2,
  Copy,
  Check,
  Zap,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { decodeResumeFromHash, getShareablePortfolioUrl } from '../../src/utils/shareableProfile';
import { STARTER_ROLES } from '../../src/store/starterTemplates';
import { ATSClassicTemplate } from '../../components/preview/ATSClassicTemplate';
import { ModernCleanTemplate } from '../../components/preview/ModernCleanTemplate';
import { FONT_FAMILY_STACKS } from '../../src/utils/pageDimensions';
import { useResumeStore } from '../../src/store/useResumeStore';
import type { ResumeData } from '../../src/types/resume';

export default function PublicPortfolioPage() {
  const router = useRouter();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const createSlot = useResumeStore((s) => s.createSlot);

  useEffect(() => {
    // Read from window.location.hash
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash && hash.includes('data=')) {
        const decoded = decodeResumeFromHash(hash);
        if (decoded) {
          setResumeData(decoded);
          setLoading(false);
          return;
        }
      }

      // Fallback to Senior Full-Stack starter role if hash is missing/invalid
      setResumeData(STARTER_ROLES.software_engineer.data);
      setLoading(false);
    }
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadPDF = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleRemixResume = () => {
    if (!resumeData) return;
    const candidateName = resumeData.profile.fullName || 'Remixed Resume';
    createSlot(`${candidateName} (Remix)`, resumeData);
    router.push('/');
  };

  if (loading || !resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-slate-400">Loading candidate portfolio...</p>
        </div>
      </div>
    );
  }

  const profile = resumeData.profile;
  const templateConfig = resumeData.templateConfig;
  const fontFamilyStack = FONT_FAMILY_STACKS[templateConfig.fontFamily] || FONT_FAMILY_STACKS.inter;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Top Recruiter & Visitor Action Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800 px-4 py-3 shadow-md no-print">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Candidate Info Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-base shadow-md">
              {profile.fullName ? profile.fullName.charAt(0) : 'R'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white leading-tight">
                  {profile.fullName || 'Candidate Profile'}
                </h1>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Verified ATS Ready
                </span>
              </div>
              <p className="text-xs text-slate-400">{profile.targetRole}</p>
            </div>
          </div>

          {/* Recruiter Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Direct Contact Button */}
            {profile.email && (
              <a
                href={`mailto:${profile.email}?subject=Opportunity Inquiry for ${encodeURIComponent(profile.targetRole || 'Software Role')}`}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <Mail className="w-3.5 h-3.5" />
                Contact Candidate
              </a>
            )}

            {/* Print/Download PDF Button */}
            <button
              type="button"
              onClick={handleDownloadPDF}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 border border-slate-700"
            >
              <Download className="w-3.5 h-3.5 text-slate-300" />
              Download PDF
            </button>

            {/* Copy Share Link */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-300" />}
              {copied ? 'Link Copied!' : 'Share'}
            </button>

            {/* Viral Remix Action */}
            <button
              type="button"
              onClick={handleRemixResume}
              className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg text-xs font-black shadow-md shadow-orange-500/20 transition flex items-center gap-1.5"
              title="Use this candidate's resume structure and layout for your own resume"
            >
              <Zap className="w-3.5 h-3.5" />
              ⚡ Remix this Resume
            </button>
          </div>
        </div>
      </header>

      {/* Main Portfolio Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 flex flex-col items-center">
        {/* Candidate Profile Summary Header Card */}
        <div className="w-full bg-white rounded-2xl p-6 mb-8 border border-gray-200 shadow-xs no-print">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                {profile.fullName}
              </h2>
              <p className="text-base font-semibold text-blue-600 mt-0.5">
                {profile.targetRole}
              </p>
              {profile.summary && (
                <p className="text-xs text-gray-600 mt-2 max-w-2xl leading-relaxed">
                  {profile.summary}
                </p>
              )}
            </div>

            {/* Contact Details Grid */}
            <div className="flex flex-wrap md:flex-col gap-2 text-xs text-gray-600 border-t md:border-t-0 md:border-l border-gray-200 pt-3 md:pt-0 md:pl-6 shrink-0">
              {profile.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-1.5 text-blue-600 hover:underline"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-500" />
                  <span>{profile.email}</span>
                </a>
              )}
              {profile.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <span>{profile.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-3 pt-1">
                {profile.linkedin && (
                  <a
                    href={profile.linkedin.startsWith('http') ? profile.linkedin : `https://${profile.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-900"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {profile.github && (
                  <a
                    href={profile.github.startsWith('http') ? profile.github : `https://${profile.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-black"
                    title="GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {profile.website && (
                  <a
                    href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:text-emerald-900"
                    title="Personal Website"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Live Resume Canvas Render */}
        <div className="w-full flex justify-center pb-12 overflow-x-auto">
          <div
            style={{
              fontFamily: fontFamilyStack,
            }}
            className={`resume-canvas-wrapper resume-printable-area ${
              templateConfig.pageSize === 'A4' ? 'resume-canvas-a4' : 'resume-canvas-letter'
            } scale-100 resume-root shadow-xl border border-gray-300 rounded-lg bg-white`}
          >
            {templateConfig.engineMode === 'ats_classic' ? (
              <ATSClassicTemplate data={resumeData} />
            ) : (
              <ModernCleanTemplate data={resumeData} />
            )}
          </div>
        </div>
      </main>

      {/* Sticky Viral Bottom Bar */}
      <footer className="sticky bottom-0 z-40 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 text-white border-t border-indigo-900/60 py-3.5 px-4 shadow-2xl no-print">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">
                Dual-Engine Resume Builder & Portfolio Platform
              </p>
              <p className="text-[11px] text-slate-400">
                100% Single-Page Hard Fit • Zero-Friction ATS Proof • 100% Free
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleRemixResume}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-black shadow-lg shadow-indigo-500/25 transition flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              ⚡ Fork & Build Your Own Free Resume Now
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

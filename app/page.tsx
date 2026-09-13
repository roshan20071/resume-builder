'use client';

import React, { useState, useEffect } from 'react';
import { HeaderNav } from '../components/HeaderNav';
import { EditorAccordion } from '../components/editor/EditorAccordion';
import { ResumeCanvas } from '../components/preview/ResumeCanvas';
import { CoverLetterCanvas } from '../components/preview/CoverLetterCanvas';
import { ATSParserSimulator } from '../components/preview/ATSParserSimulator';
import { JDMatcherModal } from '../components/editor/JDMatcherModal';
import { PlainTextInputModal } from '../components/editor/PlainTextInputModal';
import { InterviewBulletGeneratorModal } from '../components/editor/InterviewBulletGeneratorModal';
import { ResumeUploadModal } from '../components/editor/ResumeUploadModal';
import { ResumeAuditorModal } from '../components/editor/ResumeAuditorModal';
import { TemplateGalleryModal } from '../components/editor/TemplateGalleryModal';
import { SharePortfolioModal } from '../components/preview/SharePortfolioModal';
import { RapidFillWizardModal } from '../components/editor/RapidFillWizardModal';
import { LinkedInImportModal } from '../components/editor/LinkedInImportModal';
import { CoverLetterGeneratorModal } from '../components/editor/CoverLetterGeneratorModal';
import { VersionHistoryPanel } from '../components/editor/VersionHistoryPanel';
import { useResumeStore } from '../src/store/useResumeStore';
import { auditResume } from '../src/utils/resumeAuditor';
import { Edit3, Eye, ShieldCheck, Share2, LayoutTemplate } from 'lucide-react';

export default function HomePage() {
  const [isJDMatcherOpen, setIsJDMatcherOpen] = useState(false);
  const [isTextInputOpen, setIsTextInputOpen] = useState(false);
  const [isBulletBuilderOpen, setIsBulletBuilderOpen] = useState(false);
  const [isResumeUploadOpen, setIsResumeUploadOpen] = useState(false);
  const [isAuditorOpen, setIsAuditorOpen] = useState(false);
  const [isTemplateGalleryOpen, setIsTemplateGalleryOpen] = useState(false);
  const [isSharePortfolioOpen, setIsSharePortfolioOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isLinkedInImportOpen, setIsLinkedInImportOpen] = useState(false);
  const [isCoverLetterGenOpen, setIsCoverLetterGenOpen] = useState(false);
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(false);

  const [activeView, setActiveView] = useState<'canvas' | 'cover_letter' | 'ats_simulator'>('canvas');
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');

  const resumeState = useResumeStore((s) => s);
  const saveVersionSnapshot = useResumeStore((s) => s.saveVersionSnapshot);
  const versionSnapshots = useResumeStore((s) => s.versionSnapshots);

  // Initialize a baseline version snapshot on first load if empty
  useEffect(() => {
    if (versionSnapshots.length === 0) {
      const report = auditResume(resumeState);
      saveVersionSnapshot(report.overallScore);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900 pb-16 lg:pb-0 relative overflow-x-hidden">
      {/* Top Application Header */}
      <HeaderNav
        onOpenJDMatcher={() => setIsJDMatcherOpen(true)}
        onOpenTextInput={() => setIsTextInputOpen(true)}
        onOpenBulletBuilder={() => setIsBulletBuilderOpen(true)}
        onOpenResumeUpload={() => setIsResumeUploadOpen(true)}
        onOpenAuditor={() => setIsAuditorOpen(true)}
        onOpenTemplateGallery={() => setIsTemplateGalleryOpen(true)}
        onOpenSharePortfolio={() => setIsSharePortfolioOpen(true)}
        onOpenWizard={() => setIsWizardOpen(true)}
        onOpenLinkedInImport={() => setIsLinkedInImportOpen(true)}
        onOpenCoverLetterGen={() => setIsCoverLetterGenOpen(true)}
        onOpenVersionHistory={() => setIsVersionHistoryOpen(true)}
        activeView={activeView}
        onToggleView={setActiveView}
      />

      {/* Main Split-Screen Workspace */}
      <main className="relative z-10 flex-1 max-w-[1640px] w-full mx-auto px-4 py-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Editor (5 Cols) */}
        <section
          className={`lg:col-span-5 h-[calc(100vh-84px)] overflow-y-auto pr-1.5 no-print ${
            mobileTab === 'preview' ? 'hidden lg:block' : 'block'
          }`}
        >
          <div className="mb-3 p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex items-center justify-between">
            <div>
              <h2 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                Resume Content Editor
              </h2>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Single-page layout reflow • ATS verification</p>
            </div>

            <button
              type="button"
              onClick={() => setIsTemplateGalleryOpen(true)}
              className="text-xs font-medium px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 transition-colors lg:hidden"
            >
              <LayoutTemplate className="w-3.5 h-3.5" />
              Templates
            </button>
          </div>
          <EditorAccordion />
        </section>

        {/* Right Column: Dynamic View Switcher (7 Cols) */}
        <section
          className={`lg:col-span-7 h-[calc(100vh-84px)] overflow-y-auto pl-1 print:!block print:!h-auto print:!overflow-visible print:!p-0 ${
            mobileTab === 'editor' ? 'hidden lg:block' : 'block'
          }`}
        >
          {activeView === 'canvas' && <ResumeCanvas />}
          {activeView === 'cover_letter' && <CoverLetterCanvas />}
          {activeView === 'ats_simulator' && (
            <div className="py-2">
              <ATSParserSimulator />
            </div>
          )}
        </section>
      </main>

      {/* Mobile-First Bottom Navigation Bar (Visible on mobile/tablet screens only) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 py-2 px-3 flex items-center justify-around shadow-lg no-print">
        <button
          type="button"
          onClick={() => setMobileTab('editor')}
          className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
            mobileTab === 'editor' ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          Editor
        </button>

        <button
          type="button"
          onClick={() => setMobileTab('preview')}
          className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
            mobileTab === 'preview' ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <Eye className="w-4 h-4" />
          Preview
        </button>

        <button
          type="button"
          onClick={() => setIsAuditorOpen(true)}
          className="flex flex-col items-center gap-1 text-[11px] font-bold text-emerald-600"
        >
          <ShieldCheck className="w-4 h-4" />
          ATS Score
        </button>

        <button
          type="button"
          onClick={() => setIsTemplateGalleryOpen(true)}
          className="flex flex-col items-center gap-1 text-[11px] font-bold text-purple-600"
        >
          <LayoutTemplate className="w-4 h-4" />
          Templates
        </button>

        <button
          type="button"
          onClick={() => setIsSharePortfolioOpen(true)}
          className="flex flex-col items-center gap-1 text-[11px] font-bold text-teal-600"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>

      {/* Modals */}
      <ResumeAuditorModal
        isOpen={isAuditorOpen}
        onClose={() => setIsAuditorOpen(false)}
      />

      <TemplateGalleryModal
        isOpen={isTemplateGalleryOpen}
        onClose={() => setIsTemplateGalleryOpen(false)}
      />

      <SharePortfolioModal
        isOpen={isSharePortfolioOpen}
        onClose={() => setIsSharePortfolioOpen(false)}
      />

      <JDMatcherModal
        isOpen={isJDMatcherOpen}
        onClose={() => setIsJDMatcherOpen(false)}
      />

      <PlainTextInputModal
        isOpen={isTextInputOpen}
        onClose={() => setIsTextInputOpen(false)}
      />

      <InterviewBulletGeneratorModal
        isOpen={isBulletBuilderOpen}
        onClose={() => setIsBulletBuilderOpen(false)}
      />

      <ResumeUploadModal
        isOpen={isResumeUploadOpen}
        onClose={() => setIsResumeUploadOpen(false)}
      />

      <RapidFillWizardModal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
      />

      <LinkedInImportModal
        isOpen={isLinkedInImportOpen}
        onClose={() => setIsLinkedInImportOpen(false)}
      />

      <CoverLetterGeneratorModal
        isOpen={isCoverLetterGenOpen}
        onClose={() => setIsCoverLetterGenOpen(false)}
        onOpenCanvas={() => setActiveView('cover_letter')}
      />

      <VersionHistoryPanel
        isOpen={isVersionHistoryOpen}
        onClose={() => setIsVersionHistoryOpen(false)}
      />
    </div>
  );
}

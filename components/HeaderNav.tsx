'use client';

import React, { useState } from 'react';
import {
  LayoutTemplate,
  FileText,
  Target,
  Maximize2,
  Terminal,
  PenTool,
  Upload,
  Mail,
  Share2,
  Palette,
  Check,
  ChevronDown,
  Layers,
  Zap,
  History,
} from 'lucide-react';
import { useResumeStore } from '../src/store/useResumeStore';
import { ResumeSlotManager } from './editor/ResumeSlotManager';
import { MultiExportDropdown } from './preview/MultiExportDropdown';
import { ATSScoreBadge } from './preview/ATSScoreBadge';

const DESIGNER_PALETTES = [
  { label: 'Executive Slate', hex: '#0f172a' },
  { label: 'Classic Navy', hex: '#1e3a8a' },
  { label: 'Forest Emerald', hex: '#065f46' },
  { label: 'Imperial Plum', hex: '#701a75' },
  { label: 'Tech Indigo', hex: '#312e81' },
  { label: 'Modern Crimson', hex: '#dc2626' },
  { label: 'Ocean Blue', hex: '#0284c7' },
  { label: 'Warm Amber', hex: '#d97706' },
];

interface HeaderNavProps {
  onOpenJDMatcher: () => void;
  onOpenTextInput: () => void;
  onOpenBulletBuilder: () => void;
  onOpenResumeUpload: () => void;
  onOpenAuditor: () => void;
  onOpenTemplateGallery: () => void;
  onOpenSharePortfolio: () => void;
  onOpenWizard: () => void;
  onOpenLinkedInImport?: () => void;
  onOpenCoverLetterGen?: () => void;
  onOpenVersionHistory?: () => void;
  activeView: 'canvas' | 'cover_letter' | 'ats_simulator';
  onToggleView: (view: 'canvas' | 'cover_letter' | 'ats_simulator') => void;
}

export function HeaderNav({
  onOpenJDMatcher,
  onOpenTextInput,
  onOpenBulletBuilder,
  onOpenResumeUpload,
  onOpenAuditor,
  onOpenTemplateGallery,
  onOpenSharePortfolio,
  onOpenWizard,
  onOpenLinkedInImport,
  onOpenCoverLetterGen,
  onOpenVersionHistory,
  activeView,
  onToggleView,
}: HeaderNavProps) {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const engineMode = useResumeStore((s) => s.templateConfig.engineMode);
  const pageSize = useResumeStore((s) => s.templateConfig.pageSize);
  const autoFitEnabled = useResumeStore((s) => s.templateConfig.autoFitEnabled);
  const accentColor = useResumeStore((s) => s.templateConfig.accentColor);
  const jdState = useResumeStore((s) => s.jdState);
  const versionSnapshots = useResumeStore((s) => s.versionSnapshots);

  const setEngineMode = useResumeStore((s) => s.setEngineMode);
  const setPageSize = useResumeStore((s) => s.setPageSize);
  const setAutoFitEnabled = useResumeStore((s) => s.setAutoFitEnabled);
  const setAccentColor = useResumeStore((s) => s.setAccentColor);

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-4 py-2.5 shadow-xs no-print transition-all duration-150">
      <div className="max-w-[1640px] mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left Identity Cluster: Brand Logo, Status & Slot Manager */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center shadow-xs">
              <FileText className="w-4 h-4 text-zinc-200 dark:text-zinc-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xs font-bold tracking-tight text-zinc-900 dark:text-zinc-100 uppercase">
                  Apex <span className="text-zinc-500 font-normal">Resume</span>
                </h1>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono border border-zinc-200 dark:border-zinc-800 px-1.5 py-0.2 rounded">
                  1-Page
                </span>
              </div>
            </div>
          </div>

          <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-800 hidden md:block" />

          {/* Multi-Resume Slot Manager */}
          <ResumeSlotManager onOpenLinkedInImport={onOpenLinkedInImport} />

          {/* Templates Gallery Button */}
          <button
            type="button"
            onClick={onOpenTemplateGallery}
            className="px-2.5 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors duration-150 flex items-center gap-1.5"
            title="Browse Industry Resume Templates"
          >
            <LayoutTemplate className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline">Templates</span>
          </button>
        </div>

        {/* Center Cluster: Dual-Engine Switcher, 3-Way Views, & Theme Palette */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Dual-Engine Mode Switcher */}
          <div className="inline-flex items-center p-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setEngineMode('ats_classic')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-150 flex items-center gap-1.5 ${
                engineMode === 'ats_classic'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              <LayoutTemplate className="w-3.5 h-3.5 text-zinc-400" />
              ATS Classic
            </button>
            <button
              type="button"
              onClick={() => setEngineMode('modern_clean')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-150 flex items-center gap-1.5 ${
                engineMode === 'modern_clean'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-zinc-400" />
              Modern Clean
            </button>
          </div>

          {/* 3-Way View Switcher */}
          <div className="inline-flex items-center p-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => onToggleView('canvas')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-150 ${
                activeView === 'canvas'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              Canvas
            </button>
            <button
              type="button"
              onClick={() => onToggleView('cover_letter')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-150 flex items-center gap-1 ${
                activeView === 'cover_letter'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              <Mail className="w-3 h-3 text-zinc-400" />
              Cover Letter
            </button>
            <button
              type="button"
              onClick={() => onToggleView('ats_simulator')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-150 flex items-center gap-1 ${
                activeView === 'ats_simulator'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              <Terminal className="w-3 h-3 text-zinc-400" />
              ATS View
            </button>
          </div>

          {/* Designer Color Palette Picker */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
              className="px-2.5 py-1 text-xs font-medium bg-zinc-100 hover:bg-zinc-200/80 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg transition-colors duration-150 flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300"
              title="Choose accent palette"
            >
              <span
                className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                style={{ backgroundColor: accentColor || '#0f172a' }}
              />
              <span className="hidden xl:inline">Theme</span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>

            {isColorPickerOpen && (
              <div className="absolute top-full mt-2 right-0 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-3 z-50 w-52">
                <div className="text-[10px] font-semibold uppercase text-zinc-400 dark:text-zinc-500 mb-2 px-1 tracking-wider">
                  Designer Palettes
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {DESIGNER_PALETTES.map((pal) => (
                    <button
                      key={pal.hex}
                      type="button"
                      onClick={() => {
                        setAccentColor(pal.hex);
                        setIsColorPickerOpen(false);
                      }}
                      className="group relative flex flex-col items-center p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                      title={pal.label}
                    >
                      <span
                        className="w-6 h-6 rounded-full border border-black/10 shadow-2xs flex items-center justify-center transition-transform group-hover:scale-105"
                        style={{ backgroundColor: pal.hex }}
                      >
                        {accentColor?.toLowerCase() === pal.hex.toLowerCase() && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </span>
                      <span className="text-[9px] text-zinc-500 font-medium truncate w-full text-center mt-1">
                        {pal.label.split(' ')[1] || pal.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Tools & Export Cluster */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Live ATS Health Score Badge */}
          <ATSScoreBadge onClick={onOpenAuditor} />

          {/* Version History Button */}
          {onOpenVersionHistory && (
            <button
              type="button"
              onClick={onOpenVersionHistory}
              className="px-2.5 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors duration-150 flex items-center gap-1.5"
              title="View Auto-Saved Version Snapshots & ATS History"
            >
              <History className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden xl:inline">History</span>
              {versionSnapshots.length > 0 && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold">
                  {versionSnapshots.length}
                </span>
              )}
            </button>
          )}

          {/* Rapid Setup Wizard (Ghost button) */}
          <button
            type="button"
            onClick={onOpenWizard}
            className="px-2.5 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors duration-150 flex items-center gap-1.5"
            title="5-Step Rapid Resume Setup"
          >
            <Zap className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline">Rapid</span> Setup
          </button>

          {/* Guided Bullet Writer (Ghost button) */}
          <button
            type="button"
            onClick={onOpenBulletBuilder}
            className="px-2.5 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors duration-150 flex items-center gap-1.5"
            title="Guided Bullet Writer"
          >
            <PenTool className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden lg:inline">Bullet Writer</span>
          </button>

          {/* JD Matcher (Ghost button) */}
          <button
            type="button"
            onClick={onOpenJDMatcher}
            className="px-2.5 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors duration-150 flex items-center gap-1.5"
            title="Match Keywords against Job Description"
          >
            <Target className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden xl:inline">JD Matcher</span>
            {jdState?.matchScore ? (
              <span className="text-[10px] text-zinc-500 font-mono">
                {jdState.matchScore}%
              </span>
            ) : null}
          </button>

          {/* Cover Letter AI Generator */}
          {onOpenCoverLetterGen && (
            <button
              type="button"
              onClick={onOpenCoverLetterGen}
              className="px-2.5 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors duration-150 flex items-center gap-1.5"
              title="Auto-generate tailored cover letter"
            >
              <Mail className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden lg:inline">Cover Letter</span>
            </button>
          )}

          {/* Share Portfolio (Ghost button) */}
          <button
            type="button"
            onClick={onOpenSharePortfolio}
            className="px-2.5 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors duration-150 flex items-center gap-1.5"
            title="Shareable Web Portfolio"
          >
            <Share2 className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline">Share</span>
          </button>

          {/* Format & Auto-Fit Segmented Group */}
          <div className="inline-flex items-center p-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setPageSize('A4')}
              className={`px-2 py-1 rounded-md text-xs font-medium transition-all duration-150 ${
                pageSize === 'A4'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400'
              }`}
            >
              A4
            </button>
            <button
              type="button"
              onClick={() => setPageSize('Letter')}
              className={`px-2 py-1 rounded-md text-xs font-medium transition-all duration-150 ${
                pageSize === 'Letter'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400'
              }`}
            >
              Letter
            </button>
            <div className="h-3 w-px bg-zinc-200 dark:bg-zinc-700 mx-1" />
            <button
              type="button"
              onClick={() => setAutoFitEnabled(!autoFitEnabled)}
              className={`px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all duration-150 ${
                autoFitEnabled
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400'
              }`}
              title="Toggle 1-page automatic fit"
            >
              <Maximize2 className="w-3 h-3 text-zinc-400" />
              <span>Auto-Fit</span>
              <span className={`w-1.5 h-1.5 rounded-full ${autoFitEnabled ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-600'}`} />
            </button>
          </div>

          {/* Primary CTA: Multi-Export Dropdown */}
          <MultiExportDropdown />
        </div>
      </div>
    </header>
  );
}

'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, ShieldCheck, Sun, Moon } from 'lucide-react';
import { useResumeStore } from '../../src/store/useResumeStore';
import { usePageAutoFit } from '../../src/hooks/usePageAutoFit';
import { PageBudgetBar } from './PageBudgetBar';
import { OverflowLine } from './OverflowLine';
import { PageFitToast } from './PageFitToast';
import { ATSClassicTemplate } from './ATSClassicTemplate';
import { ModernCleanTemplate } from './ModernCleanTemplate';
import { FONT_FAMILY_STACKS, getTargetPageHeightPx } from '../../src/utils/pageDimensions';

export function ResumeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [toastMessage, setToastMessage] = useState<{
    type: 'warning' | 'success';
    text: string;
  } | null>(null);
  const [isPreviewDark, setIsPreviewDark] = useState(false);
  const [isPageFitToastDismissed, setIsPageFitToastDismissed] = useState(false);

  const data = useResumeStore((state) => state);
  const templateConfig = useResumeStore((state) => state.templateConfig);
  const setScaleLevel = useResumeStore((state) => state.setScaleLevel);
  const setAutoFitEnabled = useResumeStore((state) => state.setAutoFitEnabled);

  // Compute a content hash to trigger auto-fit recalculation whenever text/bullets/sections/fonts change
  const contentHash = useMemo(() => {
    return JSON.stringify({
      p: data.profile,
      e: data.experience.map((exp) => ({ id: exp.id, b: exp.bullets.map((b) => b.text) })),
      pr: data.projects.map((proj) => ({ id: proj.id, b: proj.bullets.map((b) => b.text) })),
      s: data.skills,
      ed: data.education,
      cs: data.customSections,
      cfg: data.sectionConfig,
      engine: templateConfig.engineMode,
      font: templateConfig.fontFamily,
      size: templateConfig.pageSize,
    });
  }, [
    data.profile,
    data.experience,
    data.projects,
    data.skills,
    data.education,
    data.customSections,
    data.sectionConfig,
    templateConfig.engineMode,
    templateConfig.fontFamily,
    templateConfig.pageSize,
  ]);

  const {
    scaleLevel,
    dynamicStyles,
    tailwindScaleClass,
    usedPercent,
    status,
    isOverflowing,
    overflowDeltaPx,
    performAutoFitSolve,
  } = usePageAutoFit({
    containerRef,
    pageSize: templateConfig.pageSize,
    autoFitEnabled: templateConfig.autoFitEnabled,
    manualScaleLevel: templateConfig.scaleLevel,
    templateConfig,
    onScaleChange: setScaleLevel,
    contentHash,
  });

  const targetHeight = getTargetPageHeightPx(templateConfig.pageSize);
  const fontFamilyStack = FONT_FAMILY_STACKS[templateConfig.fontFamily] || FONT_FAMILY_STACKS.inter;

  const handleFixWithAutoFit = () => {
    setAutoFitEnabled(true);
    setTimeout(() => {
      const result = performAutoFitSolve();
      if (result) {
        if (!result.success && result.overflowDeltaPx > 0) {
          setToastMessage({
            type: 'warning',
            text: `Content is still overflowing by ${result.overflowDeltaPx} px. Consider shortening bullets or hiding optional sections.`,
          });
        } else {
          setToastMessage({
            type: 'success',
            text: `Auto-Fit compressed layout to Scale Level L${result.scaleLevel} (100% 1-Page Fit).`,
          });
        }
        setTimeout(() => {
          setToastMessage(null);
        }, 7000);
      }
    }, 30);
  };

  useEffect(() => {
    if (isOverflowing) {
      setIsPageFitToastDismissed(false);
    }
  }, [isOverflowing]);

  return (
    <div className="flex flex-col items-center w-full max-w-[960px] mx-auto py-2">
      {/* Toast Alert for Auto-Fit Results */}
      {toastMessage && (
        <div
          className={`w-full mb-3 p-3 rounded-xl border flex items-center justify-between gap-3 shadow-xs animate-fadeIn no-print ${
            toastMessage.type === 'warning'
              ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
              : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-medium">
            {toastMessage.type === 'warning' ? (
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            ) : (
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 px-2 py-1 rounded"
            aria-label="Dismiss alert"
          >
            ✕
          </button>
        </div>
      )}

      {/* Visual Canvas Paper Wrapper - Realistic Design Artboard */}
      <div className="relative w-full flex flex-col items-center py-6 px-4 bg-zinc-100 dark:bg-zinc-950 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 overflow-x-auto print:!p-0 print:!m-0 print:!overflow-visible print:!block print:!border-none print:!bg-transparent">
        {/* Canvas Toolbar: Dark/Light Preview Mode Toggle */}
        <div className="w-full flex justify-end mb-3 no-print max-w-[800px]">
          <button
            type="button"
            onClick={() => setIsPreviewDark(!isPreviewDark)}
            className="px-2.5 py-1 text-xs font-medium bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors"
            title="Toggle print preview theme (dark/light)"
          >
            {isPreviewDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Light Preview</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-zinc-500" />
                <span>Dark Preview</span>
              </>
            )}
          </button>
        </div>

        {/* Physical Paper Page Sheet with Desktop Paper Elevation */}
        <div
          style={
            isPreviewDark
              ? { filter: 'invert(0.92) hue-rotate(180deg)' }
              : undefined
          }
          className={`relative resume-canvas-wrapper resume-printable-area bg-white shadow-2xl shadow-zinc-300/40 dark:shadow-none border border-zinc-200/80 dark:border-zinc-800 rounded-sm transition-all duration-200 ${
            templateConfig.pageSize === 'A4' ? 'resume-canvas-a4' : 'resume-canvas-letter'
          }`}
        >
          {/* Intrinsic Content Container */}
          <div
            ref={containerRef}
            style={{
              ...dynamicStyles,
              fontFamily: fontFamilyStack,
            }}
            className={`w-full ${tailwindScaleClass} resume-root`}
          >
            {/* Active Template Engine Render */}
            {templateConfig.engineMode === 'ats_classic' ? (
              <ATSClassicTemplate data={data} />
            ) : (
              <ModernCleanTemplate data={data} />
            )}
          </div>

          {/* Visual Red Overflow Boundary Line */}
          {isOverflowing && (
            <OverflowLine topPx={targetHeight} overflowDeltaPx={overflowDeltaPx} />
          )}
        </div>
      </div>

      {/* Sleek Minimal Bottom Telemetry Status Bar */}
      <div className="w-full mt-3 flex justify-center">
        <PageBudgetBar
          usedPercent={usedPercent}
          status={status}
          isOverflowing={isOverflowing}
          overflowDeltaPx={overflowDeltaPx}
          scaleLevel={scaleLevel}
          autoFitEnabled={templateConfig.autoFitEnabled}
          onAutoFitToggle={handleFixWithAutoFit}
          onScaleChange={(lvl) => {
            setAutoFitEnabled(false);
            setScaleLevel(lvl);
          }}
        />
      </div>

      {/* Floating Page Fit Toast Notification */}
      <PageFitToast
        isOpen={isOverflowing && !isPageFitToastDismissed}
        overflowDeltaPx={overflowDeltaPx}
        onAutoFit={handleFixWithAutoFit}
        onClose={() => setIsPageFitToastDismissed(true)}
      />
    </div>
  );
}

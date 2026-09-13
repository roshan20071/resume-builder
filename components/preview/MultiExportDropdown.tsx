'use client';

import React, { useState } from 'react';
import {
  Download,
  FileDown,
  FileType,
  FileText,
  FileCode,
  Check,
  ChevronDown,
} from 'lucide-react';
import { useResumeStore } from '../../src/store/useResumeStore';
import {
  exportToWordDoc,
  exportToMarkdown,
  exportToPlainText,
} from '../../src/utils/multiExport';

export function MultiExportDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const data = useResumeStore((state) => state);

  const handlePrintPDF = () => {
    setIsOpen(false);
    setTimeout(() => window.print(), 150);
  };

  const handleWord = () => {
    exportToWordDoc(data);
    setIsOpen(false);
  };

  const handleMarkdown = () => {
    exportToMarkdown(data);
    setIsOpen(false);
  };

  const handlePlainText = () => {
    exportToPlainText(data);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-3.5 py-1.5 text-xs font-medium bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-lg shadow-sm hover:opacity-90 flex items-center gap-1.5 transition-all duration-150 ease-out"
      >
        <FileDown className="w-3.5 h-3.5" />
        Export Resume
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 z-50 p-1.5 space-y-1 text-xs">
            <div className="px-2.5 py-1 text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Download Formats
            </div>

            {/* 1-Page PDF */}
            <button
              type="button"
              onClick={handlePrintPDF}
              className="w-full px-2.5 py-2 rounded-lg text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium flex items-center gap-2.5 transition-colors duration-150"
            >
              <FileDown className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">1-Page Vector PDF</p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-normal">Pixel-perfect single-page print format</p>
              </div>
            </button>

            {/* Word DOC */}
            <button
              type="button"
              onClick={handleWord}
              className="w-full px-2.5 py-2 rounded-lg text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium flex items-center gap-2.5 transition-colors duration-150"
            >
              <FileType className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">Microsoft Word (.doc)</p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-normal">Editable ATS-safe Word document</p>
              </div>
            </button>

            {/* Markdown */}
            <button
              type="button"
              onClick={handleMarkdown}
              className="w-full px-2.5 py-2 rounded-lg text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium flex items-center gap-2.5 transition-colors duration-150"
            >
              <FileCode className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">Markdown (.md)</p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-normal">GitHub & tech portfolio ready</p>
              </div>
            </button>

            {/* Plain Text */}
            <button
              type="button"
              onClick={handlePlainText}
              className="w-full px-2.5 py-2 rounded-lg text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium flex items-center gap-2.5 transition-colors duration-150"
            >
              <FileText className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">Plain Text (.txt)</p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-normal">For copy-pasting into job application portals</p>
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

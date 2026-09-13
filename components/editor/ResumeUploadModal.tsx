'use client';

import React, { useState } from 'react';
import {
  X,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  File,
  Loader2,
  FileType,
} from 'lucide-react';
import { parseRawResumeText } from '../../src/utils/resumeParser';
import { extractTextFromPDF } from '../../src/utils/pdfExtractor';
import { useResumeStore } from '../../src/store/useResumeStore';

interface ResumeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeUploadModal({ isOpen, onClose }: ResumeUploadModalProps) {
  const [text, setText] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [isExtractingFile, setIsExtractingFile] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [createNewSlot, setCreateNewSlot] = useState(true);

  const importJSON = useResumeStore((s) => s.importJSON);

  if (!isOpen) return null;

  const handleParse = () => {
    if (!text.trim()) return;
    setIsParsing(true);
    setErrorMsg(null);

    try {
      // Check if text is raw JSON
      if (text.trim().startsWith('{') && text.trim().endsWith('}')) {
        try {
          const jsonObj = JSON.parse(text);
          if (jsonObj.profile || jsonObj.experience) {
            importJSON(jsonObj, {
              createNewSlot,
              slotName: fileName ? fileName.replace(/\.[^/.]+$/, '') : undefined,
            });
            setIsParsing(false);
            onClose();
            return;
          }
        } catch {
          // Continue to raw text parser
        }
      }

      const parsedData = parseRawResumeText(text);
      importJSON(parsedData, {
        createNewSlot,
        slotName: fileName ? fileName.replace(/\.[^/.]+$/, '') : undefined,
      });
      setIsParsing(false);
      onClose();
    } catch (err) {
      setIsParsing(false);
      setErrorMsg('Could not parse resume text. Please check the content or paste plain text.');
    }
  };

  const processFile = async (file: File) => {
    if (!file) return;
    setFileName(file.name);
    setErrorMsg(null);

    const ext = file.name.split('.').pop()?.toLowerCase();

    if (ext === 'pdf') {
      setIsExtractingFile(true);
      try {
        const extractedText = await extractTextFromPDF(file);
        if (extractedText && extractedText.trim().length > 10) {
          setText(extractedText);
        } else {
          setErrorMsg(
            'Could not extract text from this PDF. It may be a scanned image or protected. You can copy and paste the text manually below.'
          );
        }
      } catch (err) {
        console.error('PDF extraction failed:', err);
        setErrorMsg('Error processing PDF file. Please paste your resume text manually below.');
      } finally {
        setIsExtractingFile(false);
      }
    } else if (ext === 'json') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setText(content);
        try {
          const parsed = JSON.parse(content);
          if (parsed.profile || parsed.experience) {
            importJSON(parsed);
            onClose();
          }
        } catch {
          // Leave text in textarea for manual extraction
        }
      };
      reader.readAsText(file);
    } else {
      // Plain text, markdown, etc.
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setText(content || '');
      };
      reader.readAsText(file);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in no-print">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-gray-200 animate-scale-up">
        {/* Top Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Import Existing Resume</h3>
              <p className="text-xs text-gray-500">
                Upload your <strong>PDF</strong>, text, or JSON resume to auto-populate all builder sections.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-3">
          {/* File Upload Drop Zone */}
          <label
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer transition ${
              isDragging
                ? 'border-blue-500 bg-blue-50/50 scale-[1.01]'
                : 'border-gray-300 hover:border-blue-500 bg-gray-50/50 hover:bg-blue-50/20'
            }`}
          >
            {isExtractingFile ? (
              <div className="flex flex-col items-center gap-2 py-2 text-blue-600">
                <Loader2 className="w-7 h-7 animate-spin" />
                <span className="text-xs font-bold">Extracting text from PDF ({fileName})...</span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="p-2 rounded-lg bg-red-50 text-red-600 border border-red-100 font-bold text-[10px]">
                    PDF
                  </div>
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 font-bold text-[10px]">
                    TXT
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 font-bold text-[10px]">
                    JSON
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-xs font-bold text-gray-800 block">
                    Click or Drag & Drop to upload <span className="text-red-600 font-black">.PDF</span>, .txt, or .json
                  </span>
                  <span className="text-[11px] text-gray-400 mt-0.5 block">
                    Fast text extractor automatically structures sections and bullets
                  </span>
                </div>
              </>
            )}

            <input
              type="file"
              accept=".pdf,.txt,.json,.md,.text"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Error Banner if any */}
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Plain Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-gray-700">
                Extracted / Pasted Resume Text Content
              </label>
              {text.trim() && (
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Ready to extract ({text.length} characters)
                </span>
              )}
            </div>
            <textarea
              rows={7}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste entire text of your existing resume here or upload a PDF above..."
              className="w-full text-xs p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed font-mono"
            />
          </div>

          {/* New Slot Option Checkbox */}
          <div className="pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={createNewSlot}
                onChange={(e) => setCreateNewSlot(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
              <span className="text-[11.5px] font-semibold text-gray-700">
                Import into a new resume slot (keeps your current resume intact)
              </span>
            </label>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleParse}
            disabled={isParsing || isExtractingFile || !text.trim()}
            className="px-4 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded-lg shadow-sm flex items-center gap-1.5 transition active:scale-95"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            {isParsing ? 'Structuring Sections...' : 'Extract & Populate Resume'}
          </button>
        </div>
      </div>
    </div>
  );
}

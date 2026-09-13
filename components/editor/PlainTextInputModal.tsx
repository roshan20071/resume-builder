'use client';

import React, { useState } from 'react';
import { X, FileText, Check } from 'lucide-react';
import { useResumeStore } from '../../src/store/useResumeStore';

interface PlainTextInputModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PlainTextInputModal({ isOpen, onClose }: PlainTextInputModalProps) {
  const [text, setText] = useState('');
  const [targetSection, setTargetSection] = useState<'experience' | 'skills' | 'summary'>('experience');

  const addExperience = useResumeStore((s) => s.addExperience);
  const addSkillToCategory = useResumeStore((s) => s.addSkillToCategory);
  const skills = useResumeStore((s) => s.skills);
  const updateProfile = useResumeStore((s) => s.updateProfile);

  if (!isOpen) return null;

  const handleImport = () => {
    if (!text.trim()) return;

    if (targetSection === 'summary') {
      updateProfile({ summary: text.trim() });
    } else if (targetSection === 'skills') {
      const items = text
        .split(/[,\n]/)
        .map((s) => s.trim().replace(/^[-•*]\s*/, ''))
        .filter(Boolean);
      const targetCatId = skills[0]?.id;
      if (targetCatId) {
        items.forEach((item) => addSkillToCategory(targetCatId, item));
      }
    } else if (targetSection === 'experience') {
      const lines = text
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean);

      const bullets = lines
        .filter((l) => /^[-•*]/.test(l) || l.length > 20)
        .map((l, i) => ({
          id: `b-paste-${Date.now()}-${i}`,
          text: l.replace(/^[-•*]\s*/, ''),
        }));

      addExperience({
        company: 'Imported Company',
        position: 'Software Engineer',
        startDate: '2023',
        endDate: 'Present',
        isCurrent: true,
        bullets: bullets.length > 0 ? bullets : [{ id: `b-1`, text }],
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-200">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-gray-900">Plain Text Importer</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Import Destination</label>
            <div className="flex items-center gap-2">
              {(['experience', 'skills', 'summary'] as const).map((sec) => (
                <button
                  key={sec}
                  type="button"
                  onClick={() => setTargetSection(sec)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md border capitalize transition ${
                    targetSection === sec
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Paste Raw Text / Bullets
            </label>
            <textarea
              rows={6}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste raw text, bullet points (lines starting with • or -), or comma-separated skills..."
              className="w-full text-xs p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none leading-relaxed"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleImport}
            className="px-4 py-1.5 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-lg shadow-sm flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            Populate Fields
          </button>
        </div>
      </div>
    </div>
  );
}

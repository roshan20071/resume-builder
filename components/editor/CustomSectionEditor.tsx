'use client';

import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Award,
  Calendar,
  Sparkles,
  CheckCircle2,
  FileText,
  Building,
  Tag,
  Eye,
} from 'lucide-react';
import { useResumeStore } from '../../src/store/useResumeStore';
import type { CustomSection } from '../../src/types/resume';

const PRESET_SECTION_TITLES = [
  'Certifications & Licenses',
  'Awards & Honors',
  'Publications & Research',
  'Leadership & Volunteering',
  'Languages & Proficiencies',
];

interface CustomSectionEditorProps {
  defaultTitle?: string;
  sectionKey?: 'certifications' | 'custom';
}

export function CustomSectionEditor({
  defaultTitle = 'Certifications & Honors',
  sectionKey = 'custom',
}: CustomSectionEditorProps) {
  const customSections = useResumeStore((s) => s.customSections);
  const addCustomSection = useResumeStore((s) => s.addCustomSection);
  const updateCustomSectionTitle = useResumeStore((s) => s.updateCustomSectionTitle);
  const removeCustomSection = useResumeStore((s) => s.removeCustomSection);
  const addCustomSectionItem = useResumeStore((s) => s.addCustomSectionItem);
  const updateCustomSectionItem = useResumeStore((s) => s.updateCustomSectionItem);
  const removeCustomSectionItem = useResumeStore((s) => s.removeCustomSectionItem);
  const visibility = useResumeStore((s) => s.sectionConfig.visibility);
  const toggleSectionVisibility = useResumeStore((s) => s.toggleSectionVisibility);

  const [activeSectionTitle, setActiveSectionTitle] = useState(defaultTitle);

  // Auto-create initial section if none exist
  const handleEnsureSection = () => {
    if (customSections.length === 0) {
      addCustomSection(activeSectionTitle);
    }
    // Ensure visibility is toggled on so changes appear on canvas
    if (!visibility.custom) {
      toggleSectionVisibility('custom');
    }
    if (sectionKey === 'certifications' && !visibility.certifications) {
      toggleSectionVisibility('certifications');
    }
  };

  const handleAddItem = (sectionId: string) => {
    addCustomSectionItem(sectionId);
    if (!visibility.custom) {
      toggleSectionVisibility('custom');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-gray-500">
          Highlight verified credentials, publications, hackathon wins, or leadership roles.
        </p>
        <button
          type="button"
          onClick={() => {
            addCustomSection(activeSectionTitle);
            if (!visibility.custom) toggleSectionVisibility('custom');
          }}
          className="px-3 py-1.5 text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg flex items-center gap-1.5 transition"
        >
          <Plus className="w-3.5 h-3.5" /> Add New Section
        </button>
      </div>

      {/* Preset Title Suggestions */}
      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
        <span className="text-[11px] font-medium text-gray-500 flex items-center gap-1">
          <Tag className="w-3 h-3 text-gray-400" />
          Presets:
        </span>
        {PRESET_SECTION_TITLES.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => {
              setActiveSectionTitle(preset);
              if (customSections.length === 0) {
                addCustomSection(preset);
                if (!visibility.custom) toggleSectionVisibility('custom');
              } else {
                updateCustomSectionTitle(customSections[0].id, preset);
              }
            }}
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {customSections.length === 0 && (
        <div className="p-6 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
          <Award className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <h4 className="text-xs font-bold text-gray-700">No items added yet</h4>
          <p className="text-[11px] text-gray-500 max-w-xs mx-auto mt-1 mb-3">
            Add certifications like AWS, GCP, or Meta, or create custom honors and awards.
          </p>
          <button
            type="button"
            onClick={handleEnsureSection}
            className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs transition"
          >
            Create {activeSectionTitle}
          </button>
        </div>
      )}

      {/* Sections List */}
      {customSections.map((sec, secIdx) => (
        <div
          key={sec.id}
          className="bg-gray-50/70 border border-gray-200 rounded-xl p-3.5 space-y-3 relative"
        >
          {/* Section Title Header */}
          <div className="flex items-center justify-between gap-2 border-b border-gray-200/80 pb-2">
            <div className="flex items-center gap-2 flex-1">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center">
                {secIdx + 1}
              </span>
              <input
                type="text"
                value={sec.sectionTitle}
                onChange={(e) => updateCustomSectionTitle(sec.id, e.target.value)}
                placeholder="Section Title (e.g. Certifications & Licenses)"
                className="text-xs font-bold text-gray-900 bg-white border border-gray-300 rounded-md px-2 py-1 w-full max-w-xs focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleAddItem(sec.id)}
                className="px-2.5 py-1 text-xs font-semibold bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 rounded-lg flex items-center gap-1 transition"
              >
                <Plus className="w-3 h-3" /> Add Item
              </button>
              <button
                type="button"
                onClick={() => removeCustomSection(sec.id)}
                className="p-1 text-gray-400 hover:text-rose-600 rounded-md hover:bg-gray-100"
                title="Delete this section"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-3">
            {sec.items.length === 0 && (
              <p className="text-[11px] text-gray-400 italic py-1">
                No items in this section. Click &ldquo;Add Item&rdquo; to add a certificate or entry.
              </p>
            )}

            {sec.items.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-white border border-gray-200 rounded-xl space-y-2 relative group shadow-2xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-2 flex-1">
                    {/* Item Title */}
                    <div className="md:col-span-8">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                        Title / Certificate Name
                      </label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) =>
                          updateCustomSectionItem(sec.id, item.id, { title: e.target.value })
                        }
                        placeholder="e.g. AWS Certified Solutions Architect – Associate"
                        className="w-full text-xs px-2.5 py-1.5 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 font-medium"
                      />
                    </div>

                    {/* Date / Year */}
                    <div className="md:col-span-4">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5" />
                        Date / Year
                      </label>
                      <input
                        type="text"
                        value={item.date || ''}
                        onChange={(e) =>
                          updateCustomSectionItem(sec.id, item.id, { date: e.target.value })
                        }
                        placeholder="e.g. 2024 or Nov 2023"
                        className="w-full text-xs px-2.5 py-1.5 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    {/* Description or Credential ID */}
                    <div className="md:col-span-12">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                        Details / Credential ID / Issuer
                      </label>
                      <input
                        type="text"
                        value={item.description || ''}
                        onChange={(e) =>
                          updateCustomSectionItem(sec.id, item.id, { description: e.target.value })
                        }
                        placeholder="e.g. Issued by Amazon Web Services • Verification ID: AWS-849202"
                        className="w-full text-xs px-2.5 py-1.5 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeCustomSectionItem(sec.id, item.id)}
                    className="p-1 text-gray-300 hover:text-rose-600 rounded mt-5"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

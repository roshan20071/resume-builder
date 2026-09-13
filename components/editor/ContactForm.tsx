'use client';

import React, { useState } from 'react';
import {
  User,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  FileText,
  Lightbulb,
  Zap,
  ChevronDown,
  Check,
} from 'lucide-react';
import { useResumeStore } from '../../src/store/useResumeStore';
import { SUMMARY_STARTERS_BY_ROLE } from '../../src/utils/autocompleteData';

export function ContactForm() {
  const profile = useResumeStore((s) => s.profile);
  const updateProfile = useResumeStore((s) => s.updateProfile);
  const sectionConfig = useResumeStore((s) => s.sectionConfig);
  const toggleSectionVisibility = useResumeStore((s) => s.toggleSectionVisibility);

  const isSummaryVisible = sectionConfig?.visibility?.summary !== false;

  const [isSummaryDropdownOpen, setIsSummaryDropdownOpen] = useState(false);
  const [selectedSummaryCategory, setSelectedSummaryCategory] = useState<'general_eng' | 'fresher' | 'aiml' | 'product'>('general_eng');

  const handleApplySummary = (starterText: string) => {
    updateProfile({ summary: starterText });
    setIsSummaryDropdownOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-blue-600" /> Full Name
          </label>
          <input
            type="text"
            value={profile.fullName}
            onChange={(e) => updateProfile({ fullName: e.target.value })}
            placeholder="e.g. Alex Morgan"
            className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* Target Role / Title */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-blue-600" /> Target Title / Role
          </label>
          <input
            type="text"
            value={profile.targetRole || ''}
            onChange={(e) => updateProfile({ targetRole: e.target.value })}
            placeholder="e.g. Senior Full Stack Engineer"
            className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-blue-600" /> Email
          </label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => updateProfile({ email: e.target.value })}
            placeholder="e.g. alex.morgan@example.com"
            className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-blue-600" /> Phone
          </label>
          <input
            type="text"
            value={profile.phone}
            onChange={(e) => updateProfile({ phone: e.target.value })}
            placeholder="e.g. +1 (555) 234-5678"
            className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-600" /> Location (City, State / Country)
          </label>
          <input
            type="text"
            value={profile.location}
            onChange={(e) => updateProfile({ location: e.target.value })}
            placeholder="e.g. San Francisco, CA"
            className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
            <Linkedin className="w-3.5 h-3.5 text-blue-600" /> LinkedIn Profile
          </label>
          <input
            type="text"
            value={profile.linkedin || ''}
            onChange={(e) => updateProfile({ linkedin: e.target.value })}
            placeholder="e.g. linkedin.com/in/alexmorgan"
            className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* GitHub */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
            <Github className="w-3.5 h-3.5 text-blue-600" /> GitHub Profile
          </label>
          <input
            type="text"
            value={profile.github || ''}
            onChange={(e) => updateProfile({ github: e.target.value })}
            placeholder="e.g. github.com/alexmorgan"
            className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* Website / Portfolio */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-blue-600" /> Portfolio / Website
          </label>
          <input
            type="text"
            value={profile.website || ''}
            onChange={(e) => updateProfile({ website: e.target.value })}
            placeholder="e.g. https://alexmorgan.dev"
            className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>
      </div>

      {/* Summary with Live Visibility Toggle & 1-Click Starter Assistant */}
      <div className="pt-2 border-t border-slate-200/80">
        {/* Toggle Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-600" />
            <div>
              <span className="text-xs font-bold text-slate-800">
                Include Executive Summary in Resume
              </span>
              <p className="text-[10.5px] text-slate-500">
                {isSummaryVisible
                  ? 'Active on preview canvas & PDF export'
                  : 'Hidden from canvas (saves ~45px single-page budget)'}
              </p>
            </div>
          </div>

          {/* Toggle Switch Button */}
          <button
            type="button"
            role="switch"
            aria-checked={isSummaryVisible}
            onClick={() => toggleSectionVisibility('summary')}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 ${
              isSummaryVisible ? 'bg-indigo-600' : 'bg-slate-300'
            }`}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                isSummaryVisible ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {isSummaryVisible ? (
          <div className="space-y-2 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
              <label className="text-[11px] font-semibold text-gray-700">
                Executive Summary Content
              </label>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsSummaryDropdownOpen(!isSummaryDropdownOpen)}
                  className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center gap-1 transition shadow-2xs"
                >
                  <Lightbulb className="w-3 h-3 text-amber-500" />
                  Summary Starters
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                <span className="text-[10px] text-gray-400 font-normal">
                  {profile.summary?.length || 0}/500 chars (1-3 lines max)
                </span>
              </div>
            </div>

            {/* 1-Click Summary Starters Drawer */}
            {isSummaryDropdownOpen && (
              <div className="mb-2 p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 animate-scale-up">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-slate-700 flex items-center gap-1">
                    <Lightbulb className="w-3 h-3 text-amber-500" /> Choose an executive summary starter:
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSummaryDropdownOpen(false)}
                    className="text-gray-400 hover:text-gray-700 text-xs"
                  >
                    ✕
                  </button>
                </div>

                {/* Category selection */}
                <div className="flex flex-wrap gap-1">
                  {[
                    { id: 'general_eng', label: '💻 Software Engineer' },
                    { id: 'fresher', label: '🎓 Fresher / Student' },
                    { id: 'aiml', label: '📊 Data & Machine Learning' },
                    { id: 'product', label: '🎯 Product Manager' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedSummaryCategory(c.id as any)}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition ${
                        selectedSummaryCategory === c.id
                          ? 'bg-slate-900 text-white'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>

                {/* Starters list */}
                <div className="space-y-1.5 pt-1">
                  {SUMMARY_STARTERS_BY_ROLE[selectedSummaryCategory]?.map((starter, sIdx) => (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => handleApplySummary(starter)}
                      className="w-full text-left p-2 rounded-lg bg-white hover:bg-slate-100 text-slate-800 text-[11px] leading-relaxed border border-slate-200 transition shadow-2xs hover:border-slate-400"
                    >
                      {starter}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <textarea
              rows={3}
              value={profile.summary || ''}
              onChange={(e) => updateProfile({ summary: e.target.value })}
              placeholder="Brief 2-3 sentence overview highlighting your core domain expertise, years of experience, and primary value proposition..."
              className="w-full text-xs p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition resize-none leading-relaxed"
            />
          </div>
        ) : (
          <div className="p-3 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-center">
            <p className="text-xs text-slate-600 font-medium">
              Professional Summary is excluded from the resume canvas. Turn the toggle ON to re-enable.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

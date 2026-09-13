'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, GraduationCap, Search, Calendar, MapPin, Award, BookOpen, ChevronRight, X, Sparkles, Filter, Globe, Loader2 } from 'lucide-react';
import { useResumeStore } from '../../src/store/useResumeStore';
import {
  ALL_INSTITUTIONS_DIRECTORY,
  POPULAR_DEGREES,
  INDIAN_GRADE_PRESETS,
  YEARS,
  InstitutionDetail,
  COURSEWORK_SUGGESTIONS_BY_FIELD,
} from '../../src/utils/autocompleteData';

const INSTITUTION_CATEGORIES = [
  'All',
  'IIT',
  'NIT',
  'IIIT',
  'BITS',
  'State Govt / Autonomous',
  'Top Private / Deemed',
  'Central & State University',
  'IIM & B-School',
  'Global',
] as const;

export function EducationEditor() {
  const education = useResumeStore((s) => s.education);
  const addEducation = useResumeStore((s) => s.addEducation);
  const updateEducation = useResumeStore((s) => s.updateEducation);
  const removeEducation = useResumeStore((s) => s.removeEducation);

  const [activeUniversitySearchId, setActiveUniversitySearchId] = useState<string | null>(null);
  const [activeDegreeSearchId, setActiveDegreeSearchId] = useState<string | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [showDirectoryModalForId, setShowDirectoryModalForId] = useState<string | null>(null);
  const [modalSearchQuery, setModalSearchQuery] = useState<string>('');

  // Live async results cache for global universities
  const [asyncResults, setAsyncResults] = useState<Record<string, InstitutionDetail[]>>({});
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to filter local directory instantly
  const getLocalFilteredInstitutions = (searchQuery: string, categoryFilter: string) => {
    const query = searchQuery.toLowerCase().trim();
    const queryWords = query.split(/\s+/).filter(Boolean);

    return ALL_INSTITUTIONS_DIRECTORY.filter((inst) => {
      if (categoryFilter !== 'All' && inst.category !== categoryFilter) {
        return false;
      }

      if (queryWords.length === 0) return true;

      const searchableText = `${inst.name} ${inst.shortName} ${inst.aliases.join(' ')} ${inst.city} ${inst.state} ${inst.country} ${inst.category}`.toLowerCase();
      return queryWords.every((word) => searchableText.includes(word));
    });
  };

  // Debounced API search to tap into 10,000+ world universities dataset
  const handleQueryChange = (eduId: string, value: string) => {
    updateEducation(eduId, { institution: value });
    setActiveUniversitySearchId(eduId);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    const trimmed = value.trim();
    if (trimmed.length < 2) {
      setIsLoadingSearch(false);
      return;
    }

    setIsLoadingSearch(true);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/institutions?q=${encodeURIComponent(trimmed)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.results && Array.isArray(data.results)) {
            setAsyncResults((prev) => ({
              ...prev,
              [eduId]: data.results,
            }));
          }
        }
      } catch {
        // Fallback silently to local dataset
      } finally {
        setIsLoadingSearch(false);
      }
    }, 180);
  };

  const handleSelectInstitution = (eduId: string, inst: InstitutionDetail) => {
    const loc = inst.city && inst.state && inst.city !== inst.state
      ? `${inst.city}, ${inst.state}`
      : inst.city || inst.state || inst.country || '';

    updateEducation(eduId, {
      institution: inst.name,
      location: loc,
    });
    setActiveUniversitySearchId(null);
    setShowDirectoryModalForId(null);
  };

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-gradient-to-r from-blue-50/80 via-indigo-50/60 to-purple-50/40 p-3 rounded-xl border border-blue-100">
        <div>
          <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            Every College & University in India & Worldwide
          </h4>
          <p className="text-[11px] text-gray-600">
            Instant search for 10,000+ IITs, NITs, Woxsen, BITS, private, state & international universities with 1-click location.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            addEducation({
              institution: '',
              degree: 'Bachelor of Technology (B.Tech)',
              fieldOfStudy: 'Computer Science & Engineering',
              location: '',
              startDate: '2020-08',
              endDate: '2024-05',
              gpa: '8.8 / 10 CGPA',
            })
          }
          className="px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-1.5 transition shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" /> Add Degree
        </button>
      </div>

      {education.map((edu, eduIdx) => {
        const isCurrent = edu.endDate === 'Present' || edu.endDate.toLowerCase().includes('expected');

        // Merge local curated matches with live global API results
        const localMatches = getLocalFilteredInstitutions(edu.institution || '', 'All');
        const remoteMatches = asyncResults[edu.id] || [];

        const seenNames = new Set<string>();
        const combinedMatches: InstitutionDetail[] = [];

        for (const it of [...localMatches, ...remoteMatches]) {
          const key = it.name.toLowerCase().replace(/[^a-z0-9]/g, '');
          if (!seenNames.has(key)) {
            seenNames.add(key);
            combinedMatches.push(it);
          }
        }
        const filteredInstitutions = combinedMatches.slice(0, 12);

        // Filtered degree suggestions
        const degreeQueryWords = `${edu.degree || ''} ${edu.fieldOfStudy || ''}`.toLowerCase().trim().split(/\s+/).filter(Boolean);
        const filteredDegrees = POPULAR_DEGREES.filter((d) => {
          if (degreeQueryWords.length === 0) return true;
          const dLower = d.toLowerCase();
          return degreeQueryWords.every((w) => dLower.includes(w));
        }).slice(0, 8);

        return (
          <div
            key={edu.id}
            className="bg-white border border-gray-200 rounded-xl p-3.5 space-y-3.5 relative shadow-sm hover:border-blue-200 transition"
          >
            {/* Header with Title and Remove */}
            <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center">
                  {eduIdx + 1}
                </span>
                <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5 truncate max-w-[280px]">
                  <GraduationCap className="w-4 h-4 text-blue-600 shrink-0" />
                  {edu.institution || 'New Institution / Degree'}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowDirectoryModalForId(edu.id);
                    setModalSearchQuery(edu.institution || '');
                  }}
                  className="text-[11px] font-semibold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2.5 py-1 rounded-md flex items-center gap-1 transition"
                >
                  <BookOpen className="w-3 h-3" /> Browse World Directory
                </button>
                <button
                  type="button"
                  onClick={() => removeEducation(edu.id)}
                  className="p-1 text-gray-400 hover:text-rose-600 transition"
                  title="Remove education"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Institution with Quick Search Autocomplete */}
              <div className="relative">
                <label className="block text-[11px] font-semibold text-gray-700 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Search className="w-3 h-3 text-blue-600" /> College / University Name
                  </span>
                  <span className="text-[10px] text-gray-400 font-normal flex items-center gap-1">
                    {isLoadingSearch ? (
                      <span className="text-blue-600 font-medium flex items-center gap-1">
                        <Loader2 className="w-2.5 h-2.5 animate-spin" /> Searching global DB...
                      </span>
                    ) : (
                      'Any college in India / World'
                    )}
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleQueryChange(edu.id, e.target.value)}
                    onFocus={() => setActiveUniversitySearchId(edu.id)}
                    onBlur={() => {
                      setTimeout(() => {
                        setActiveUniversitySearchId(null);
                      }, 250);
                    }}
                    placeholder="Search any college (e.g. Woxsen, IIT Bombay, Stanford, CBIT, Oxford...)"
                    className="w-full text-xs px-2.5 py-1.5 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none pr-7"
                  />
                  {edu.institution && (
                    <button
                      type="button"
                      onClick={() => updateEducation(edu.id, { institution: '', location: '' })}
                      className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Live Autocomplete Dropdown */}
                {activeUniversitySearchId === edu.id && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-2xl z-30 max-h-64 overflow-y-auto divide-y divide-gray-100">
                    <div className="p-1.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-[10px] text-gray-500">
                      <span>Matches ({filteredInstitutions.length})</span>
                      <span className="flex items-center gap-1">
                        <Globe className="w-2.5 h-2.5 text-blue-600" /> Global Dataset Active
                      </span>
                    </div>

                    {filteredInstitutions.map((inst) => (
                      <div
                        key={inst.name}
                        onMouseDown={() => handleSelectInstitution(edu.id, inst)}
                        className="px-3 py-2 text-xs text-gray-800 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition font-medium"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-semibold text-gray-900 truncate">{inst.name}</span>
                          <span className="text-[10px] shrink-0 font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-700">
                            {inst.category || 'Recognized'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-0.5">
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-2.5 h-2.5 text-gray-400" /> {inst.city ? `${inst.city}, ` : ''}{inst.state || inst.country} ({inst.country})
                          </span>
                          {inst.aliases && inst.aliases.length > 0 && (
                            <span className="text-gray-400 truncate">
                              • {inst.aliases.slice(0, 3).join(', ')}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}

                    {edu.institution && (
                      <div
                        onMouseDown={() => {
                          setActiveUniversitySearchId(null);
                        }}
                        className="p-2 bg-blue-50/50 hover:bg-blue-100 text-blue-700 text-xs cursor-pointer font-semibold flex items-center justify-between transition"
                      >
                        <span className="truncate">✓ Use custom college name: &ldquo;{edu.institution}&rdquo;</span>
                        <span className="text-[10px] font-normal text-blue-600 shrink-0">Confirm</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Campus Location (City, State / Country) */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-blue-600" /> Campus Location
                  </span>
                  <span className="text-[10px] text-gray-400 font-normal">Auto-filled on selection</span>
                </label>
                <input
                  type="text"
                  value={edu.location || ''}
                  onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                  placeholder="e.g. Hyderabad, Telangana or Cambridge, MA"
                  className="w-full text-xs px-2.5 py-1.5 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Degree & Major Quick Autocomplete */}
              <div className="relative">
                <label className="block text-[11px] font-semibold text-gray-700 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-3 h-3 text-blue-600" /> Degree & Major / Branch
                  </span>
                  <span className="text-[10px] text-gray-400 font-normal">e.g. B.Tech in CSE, BCA, MBA</span>
                </label>
                <input
                  type="text"
                  value={`${edu.degree} ${edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}`.trim()}
                  onChange={(e) => {
                    const val = e.target.value;
                    const parts = val.split(/\bin\b/i);
                    updateEducation(edu.id, {
                      degree: parts[0]?.trim() || val,
                      fieldOfStudy: parts[1]?.trim() || '',
                    });
                    setActiveDegreeSearchId(edu.id);
                  }}
                  onFocus={() => setActiveDegreeSearchId(edu.id)}
                  onBlur={() => {
                    setTimeout(() => setActiveDegreeSearchId(null), 250);
                  }}
                  placeholder="e.g. Bachelor of Technology (B.Tech) in Computer Science & Engineering"
                  className="w-full text-xs px-2.5 py-1.5 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
                />

                {/* Degree Dropdown */}
                {activeDegreeSearchId === edu.id && filteredDegrees.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-30 max-h-52 overflow-y-auto divide-y divide-gray-100">
                    {filteredDegrees.map((deg) => (
                      <div
                        key={deg}
                        onMouseDown={() => {
                          const parts = deg.split(/\bin\b/i);
                          updateEducation(edu.id, {
                            degree: parts[0]?.trim() || deg,
                            fieldOfStudy: parts[1]?.trim() || '',
                          });
                          setActiveDegreeSearchId(null);
                        }}
                        className="px-3 py-2 text-xs text-gray-800 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition font-medium truncate"
                      >
                        {deg}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Date Range & Currently Studying Selector */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold text-gray-700 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-blue-600" /> Graduation Year / Duration
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      if (isCurrent) {
                        updateEducation(edu.id, { endDate: '2024' });
                      } else {
                        updateEducation(edu.id, { endDate: 'Expected 2028' });
                      }
                    }}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition ${
                      isCurrent
                        ? 'bg-blue-100 text-blue-700 border-blue-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-200'
                    }`}
                  >
                    {isCurrent ? '✓ Currently Enrolled' : '+ Currently Enrolled'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {/* Start Year Picker / Input */}
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={edu.startDate || ''}
                      onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                      placeholder="From (e.g. 2020)"
                      className="w-full text-xs px-2.5 py-1.5 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 font-medium outline-none"
                    />
                    <select
                      value=""
                      onChange={(e) => {
                        if (e.target.value) {
                          updateEducation(edu.id, { startDate: e.target.value });
                        }
                      }}
                      className="text-xs px-1.5 py-1.5 bg-gray-50 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-100 shrink-0"
                      title="Select Start Year"
                    >
                      <option value="">▼</option>
                      {YEARS.map((yr) => (
                        <option key={yr} value={yr}>
                          {yr}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* End Year / Graduation Year Input */}
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={edu.endDate || ''}
                      onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                      placeholder="To / Grad Year (e.g. 2024)"
                      className={`w-full text-xs px-2.5 py-1.5 border rounded-md font-medium outline-none ${
                        isCurrent
                          ? 'bg-blue-50/60 border-blue-300 text-blue-800 font-semibold'
                          : 'bg-white border-gray-300 focus:ring-1 focus:ring-blue-500'
                      }`}
                    />
                    <select
                      value=""
                      onChange={(e) => {
                        if (e.target.value) {
                          updateEducation(edu.id, { endDate: e.target.value });
                        }
                      }}
                      className="text-xs px-1.5 py-1.5 bg-gray-50 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-100 shrink-0"
                      title="Select Graduation Year"
                    >
                      <option value="">▼</option>
                      {YEARS.map((yr) => (
                        <option key={yr} value={yr}>
                          {yr}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Quick 1-Click Year Presets */}
                <div className="flex flex-wrap items-center gap-1 pt-1.5">
                  <span className="text-[10px] text-gray-400 font-medium">Quick presets:</span>
                  {[
                    { label: '2024 (Graduated)', start: '', end: '2024' },
                    { label: '2020 – 2024', start: '2020', end: '2024' },
                    { label: '2021 – 2025', start: '2021', end: '2025' },
                    { label: 'Expected 2026', start: '2022', end: 'Expected 2026' },
                    { label: 'Expected 2028', start: '2024', end: 'Expected 2028' },
                  ].map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => {
                        updateEducation(edu.id, { startDate: p.start, endDate: p.end });
                      }}
                      className="text-[10px] px-2 py-0.5 bg-gray-100 hover:bg-blue-50 hover:text-blue-700 text-gray-700 rounded border border-gray-200 transition"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* CGPA / Percentage & Honors */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="block text-[11px] font-semibold text-gray-700 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Award className="w-3 h-3 text-blue-600" /> CGPA / Percentage & Academic Honors
                  </span>
                  <span className="text-[10px] text-gray-400 font-normal">Optional</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={edu.gpa || ''}
                    onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                    placeholder="e.g. 8.9 / 10 CGPA or 3.85 / 4.0"
                    className="text-xs px-2.5 py-1.5 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    value={edu.honors || ''}
                    onChange={(e) => updateEducation(edu.id, { honors: e.target.value })}
                    placeholder="e.g. First Class with Distinction, Dean's Honor List"
                    className="sm:col-span-2 text-xs px-2.5 py-1.5 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Quick Grade chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-gray-400 font-medium">Quick presets:</span>
                  {INDIAN_GRADE_PRESETS.slice(0, 4).map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        const parts = preset.split(/\((.*)\)/);
                        updateEducation(edu.id, {
                          gpa: parts[0]?.trim() || preset,
                          honors: parts[1]?.trim() || edu.honors,
                        });
                      }}
                      className="text-[10px] px-2 py-0.5 bg-gray-100 hover:bg-blue-50 hover:text-blue-700 text-gray-700 rounded border border-gray-200 transition"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Relevant Coursework Suggestion Chips */}
              <div className="sm:col-span-2 pt-2 border-t border-gray-100 space-y-2">
                <label className="block text-[11px] font-semibold text-gray-700 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-blue-600" /> Relevant Coursework & Subjects
                  </span>
                  <span className="text-[10px] text-gray-400 font-normal">
                    Click chips below to add / remove
                  </span>
                </label>

                {/* Active Selected Coursework Tags */}
                {edu.coursework && edu.coursework.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 p-2 bg-blue-50/40 rounded-lg border border-blue-100">
                    {edu.coursework.map((course, cIdx) => (
                      <span
                        key={cIdx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-white text-blue-700 border border-blue-200 shadow-2xs"
                      >
                        {course}
                        <button
                          type="button"
                          onClick={() => {
                            const updated = edu.coursework?.filter((_, idx) => idx !== cIdx);
                            updateEducation(edu.id, { coursework: updated });
                          }}
                          className="text-blue-400 hover:text-rose-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* 1-Click Suggestion Chips */}
                <div className="space-y-1.5">
                  <div className="flex flex-wrap gap-1">
                    {(COURSEWORK_SUGGESTIONS_BY_FIELD.cs || []).map((subject) => {
                      const isAdded = edu.coursework?.includes(subject);
                      return (
                        <button
                          key={subject}
                          type="button"
                          onClick={() => {
                            const current = edu.coursework || [];
                            if (isAdded) {
                              updateEducation(edu.id, {
                                coursework: current.filter((s) => s !== subject),
                              });
                            } else {
                              updateEducation(edu.id, {
                                coursework: [...current, subject],
                              });
                            }
                          }}
                          className={`text-[10px] px-2 py-0.5 rounded transition font-medium ${
                            isAdded
                              ? 'bg-blue-600 text-white font-bold'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                          }`}
                        >
                          {isAdded ? `✓ ${subject}` : `+ ${subject}`}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* World Colleges Directory Modal */}
      {showDirectoryModalForId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col border border-gray-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold flex items-center gap-1.5">
                  <Globe className="w-4 h-4" /> Global Universities & Colleges Directory
                </h3>
                <p className="text-xs text-blue-100">
                  Search across 10,000+ colleges worldwide (all Indian districts, US, UK, Canada, Europe, Asia).
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowDirectoryModalForId(null)}
                className="p-1 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Search Input */}
            <div className="p-3 bg-white border-b border-gray-200">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={modalSearchQuery}
                  onChange={(e) => setModalSearchQuery(e.target.value)}
                  placeholder="Search college by name, city, state, country or acronym (e.g. Woxsen, Oxford, Pune, California...)"
                  className="w-full text-xs pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  autoFocus
                />
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="p-3 bg-gray-50 border-b border-gray-200 flex items-center gap-1.5 overflow-x-auto">
              <span className="text-[11px] font-semibold text-gray-500 shrink-0 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Filter:
              </span>
              {INSTITUTION_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategoryFilter(cat)}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap transition ${
                    selectedCategoryFilter === cat
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Modal List of Colleges */}
            <div className="p-4 overflow-y-auto space-y-2 flex-1">
              {getLocalFilteredInstitutions(modalSearchQuery, selectedCategoryFilter).map((inst) => (
                <div
                  key={inst.name}
                  onClick={() => handleSelectInstitution(showDirectoryModalForId, inst)}
                  className="p-3 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer transition flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-gray-900 group-hover:text-blue-700">
                        {inst.name}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                        {inst.category}
                      </span>
                      {inst.tier && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                          {inst.tier}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-gray-500 flex-wrap">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-400" /> {inst.city ? `${inst.city}, ` : ''}{inst.state || inst.country} ({inst.country})
                      </span>
                      {inst.aliases && inst.aliases.length > 0 && (
                        <span className="text-gray-400">
                          Aliases: {inst.aliases.join(', ')}
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="text-xs font-bold text-blue-600 group-hover:translate-x-1 transition flex items-center gap-0.5 shrink-0">
                    Select <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

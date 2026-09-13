'use client';

import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Lightbulb,
  Building,
  Briefcase,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { useResumeStore } from '../../src/store/useResumeStore';
import { analyzeBulletPoint } from '../../src/utils/bulletChecker';
import { analyzeLineTrim } from '../../src/utils/lineTrimmer';
import { BulletOptimizerModal } from './BulletOptimizerModal';
import { BulletRewriterPanel } from './BulletRewriterPanel';
import { POPULAR_COMPANIES, POPULAR_TITLES, YEARS, ROLE_BULLETS_INSPIRATION } from '../../src/utils/autocompleteData';

export function ExperienceEditor() {
  const experience = useResumeStore((s) => s.experience);
  const addExperience = useResumeStore((s) => s.addExperience);
  const updateExperience = useResumeStore((s) => s.updateExperience);
  const removeExperience = useResumeStore((s) => s.removeExperience);
  const reorderExperience = useResumeStore((s) => s.reorderExperience);

  const addExperienceBullet = useResumeStore((s) => s.addExperienceBullet);
  const updateExperienceBullet = useResumeStore((s) => s.updateExperienceBullet);
  const removeExperienceBullet = useResumeStore((s) => s.removeExperienceBullet);

  const [activeBulletPopoverId, setActiveBulletPopoverId] = useState<string | null>(null);
  const [activeRewriterId, setActiveRewriterId] = useState<string | null>(null);
  const [activeCompanySearchId, setActiveCompanySearchId] = useState<string | null>(null);
  const [activeTitleSearchId, setActiveTitleSearchId] = useState<string | null>(null);
  const [openInspirationExpId, setOpenInspirationExpId] = useState<string | null>(null);
  const [selectedInspirationCategory, setSelectedInspirationCategory] = useState(0);

  // Modal State for Bullet Optimizer
  const [optimizerModal, setOptimizerModal] = useState<{
    isOpen: boolean;
    expId: string;
    bulletId: string;
    text: string;
  }>({
    isOpen: false,
    expId: '',
    bulletId: '',
    text: '',
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-zinc-500">
          Document your employment history and core technical accomplishments.
        </p>
        <button
          type="button"
          onClick={() =>
            addExperience({
              company: '',
              position: 'Senior Software Engineer',
              location: 'San Francisco, CA',
              startDate: '2022-03',
              endDate: 'Present',
              isCurrent: true,
              bullets: [{ id: `b-${Date.now()}`, text: '' }],
            })
          }
          className="px-3 py-1.5 text-xs font-medium bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90 rounded-lg flex items-center gap-1.5 transition-opacity duration-150 shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" /> Add Role
        </button>
      </div>

      {experience.map((exp, expIndex) => {
        const filteredCompanies = POPULAR_COMPANIES.filter((c) =>
          c.toLowerCase().includes((exp.company || '').toLowerCase())
        ).slice(0, 5);

        const filteredTitles = POPULAR_TITLES.filter((t) =>
          t.toLowerCase().includes((exp.position || '').toLowerCase())
        ).slice(0, 5);

        return (
          <div
            key={exp.id}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 space-y-3 shadow-xs"
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-zinc-400" />
                {exp.position || 'Untitled Role'} {exp.company ? `@ ${exp.company}` : ''}
              </h4>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={expIndex === 0}
                  onClick={() => reorderExperience(expIndex, expIndex - 1)}
                  className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 disabled:opacity-30 rounded"
                  title="Move Up"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={expIndex === experience.length - 1}
                  onClick={() => reorderExperience(expIndex, expIndex + 1)}
                  className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 disabled:opacity-30 rounded"
                  title="Move Down"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => removeExperience(exp.id)}
                  className="p-1 text-zinc-400 hover:text-rose-600 transition rounded"
                  title="Delete Experience"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Role Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Company with Quick Autocomplete */}
              <div className="relative">
                <label className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => {
                    updateExperience(exp.id, { company: e.target.value });
                    setActiveCompanySearchId(exp.id);
                  }}
                  onFocus={() => setActiveCompanySearchId(exp.id)}
                  onBlur={() => setTimeout(() => setActiveCompanySearchId(null), 200)}
                  placeholder="e.g. Stripe, Linear, Vercel"
                  className="w-full text-xs px-2.5 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:border-zinc-400 dark:focus:border-zinc-500 outline-none text-zinc-900 dark:text-zinc-100"
                />

                {/* Dropdown */}
                {activeCompanySearchId === exp.id && filteredCompanies.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg z-30 max-h-40 overflow-y-auto py-1">
                    {filteredCompanies.map((comp) => (
                      <div
                        key={comp}
                        onMouseDown={() => {
                          updateExperience(exp.id, { company: comp });
                          setActiveCompanySearchId(null);
                        }}
                        className="px-3 py-1.5 text-xs text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition font-medium truncate"
                      >
                        {comp}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Job Title with Autocomplete */}
              <div className="relative">
                <label className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                  Job Title / Position
                </label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => {
                    updateExperience(exp.id, { position: e.target.value });
                    setActiveTitleSearchId(exp.id);
                  }}
                  onFocus={() => setActiveTitleSearchId(exp.id)}
                  onBlur={() => setTimeout(() => setActiveTitleSearchId(null), 200)}
                  placeholder="e.g. Senior Software Engineer"
                  className="w-full text-xs px-2.5 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:border-zinc-400 dark:focus:border-zinc-500 outline-none text-zinc-900 dark:text-zinc-100"
                />

                {/* Dropdown */}
                {activeTitleSearchId === exp.id && filteredTitles.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg z-30 max-h-40 overflow-y-auto py-1">
                    {filteredTitles.map((title) => (
                      <div
                        key={title}
                        onMouseDown={() => {
                          updateExperience(exp.id, { position: title });
                          setActiveTitleSearchId(null);
                        }}
                        className="px-3 py-1.5 text-xs text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition font-medium truncate"
                      >
                        {title}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                  placeholder="e.g. San Francisco, CA (or Remote)"
                  className="w-full text-xs px-2.5 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:border-zinc-400 dark:focus:border-zinc-500 outline-none text-zinc-900 dark:text-zinc-100"
                />
              </div>

              {/* Employment Dates */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                    Employment Dates
                  </label>
                  <label className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exp.isCurrent}
                      onChange={(e) => {
                        const isCurr = e.target.checked;
                        updateExperience(exp.id, {
                          isCurrent: isCurr,
                          endDate: isCurr ? 'Present' : '2023-12',
                        });
                      }}
                      className="rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 focus:ring-0"
                    />
                    Current Role
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={exp.startDate.split(/[-–\s]/)[0] || '2022'}
                    onChange={(e) => {
                      updateExperience(exp.id, { startDate: `${e.target.value}-03` });
                    }}
                    className="text-xs px-2.5 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 font-medium"
                  >
                    <option value="" disabled>Start Year</option>
                    {YEARS.map((yr) => (
                      <option key={yr} value={yr}>
                        From {yr}
                      </option>
                    ))}
                  </select>

                  {exp.isCurrent ? (
                    <input
                      type="text"
                      disabled
                      value="Present"
                      className="text-xs px-2.5 py-1.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium rounded-lg text-center"
                    />
                  ) : (
                    <select
                      value={exp.endDate.split(/[-–\s]/)[0] || '2023'}
                      onChange={(e) => {
                        updateExperience(exp.id, { endDate: `${e.target.value}-12` });
                      }}
                      className="text-xs px-2.5 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 font-medium"
                    >
                      <option value="" disabled>End Year</option>
                      {YEARS.map((yr) => (
                        <option key={yr} value={yr}>
                          To {yr}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            </div>

            {/* Bullets List with on-demand AI Popover */}
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
                <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                  Impact Bullets
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenInspirationExpId(openInspirationExpId === exp.id ? null : exp.id)
                    }
                    className="text-xs font-medium px-2 py-1 rounded-md bg-zinc-100 hover:bg-zinc-200/80 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors flex items-center gap-1"
                  >
                    <Lightbulb className="w-3 h-3 text-zinc-400" />
                    Inspiration
                  </button>
                  <button
                    type="button"
                    onClick={() => addExperienceBullet(exp.id)}
                    className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Bullet
                  </button>
                </div>
              </div>

              {/* 1-Click Bullet Inspiration Drawer */}
              {openInspirationExpId === exp.id && (
                <div className="mb-3 p-3 bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      Sample Bullets by Category:
                    </span>
                    <button
                      type="button"
                      onClick={() => setOpenInspirationExpId(null)}
                      className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 text-xs"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Category Pills */}
                  <div className="flex flex-wrap gap-1">
                    {ROLE_BULLETS_INSPIRATION.map((cat, catIdx) => (
                      <button
                        key={cat.roleCategory}
                        type="button"
                        onClick={() => setSelectedInspirationCategory(catIdx)}
                        className={`px-2 py-0.5 text-[11px] font-medium rounded-md transition ${
                          selectedInspirationCategory === catIdx
                            ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                            : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100'
                        }`}
                      >
                        {cat.roleCategory}
                      </button>
                    ))}
                  </div>

                  {/* Bullet Templates */}
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pt-1">
                    {ROLE_BULLETS_INSPIRATION[selectedInspirationCategory]?.bullets.map(
                      (templateBullet, tIdx) => (
                        <button
                          key={tIdx}
                          type="button"
                          onClick={() => {
                            const emptyBullet = exp.bullets.find((b) => !b.text.trim());
                            if (emptyBullet) {
                              updateExperienceBullet(exp.id, emptyBullet.id, templateBullet);
                            } else {
                              const newBId = `b-${Date.now()}-${tIdx}`;
                              addExperienceBullet(exp.id);
                              setTimeout(() => {
                                updateExperienceBullet(exp.id, newBId, templateBullet);
                              }, 10);
                            }
                            setOpenInspirationExpId(null);
                          }}
                          className="w-full text-left p-2 rounded-lg bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 text-xs leading-relaxed transition flex items-start gap-1.5 group"
                        >
                          <Plus className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5 group-hover:text-zinc-700" />
                          <span>{templateBullet}</span>
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-2.5">
                {exp.bullets.map((bullet) => {
                  const analysis = analyzeBulletPoint(bullet.text);
                  const lineTrim = analyzeLineTrim(bullet.text);

                  return (
                    <div key={bullet.id} className="group/bullet relative flex items-start gap-2">
                      <span className="text-zinc-400 text-xs mt-2">•</span>
                      <div className="flex-1 relative">
                        <textarea
                          rows={2}
                          value={bullet.text}
                          onChange={(e) =>
                            updateExperienceBullet(exp.id, bullet.id, e.target.value)
                          }
                          placeholder="Accomplished [X], measured by [Y], by doing [Z]... (e.g. Architected streaming pipeline using Kafka, reducing lag by 78% for 4M daily transactions)"
                          className="w-full text-xs p-2.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:border-zinc-400 dark:focus:border-zinc-500 outline-none resize-none leading-relaxed text-zinc-900 dark:text-zinc-100"
                        />

                        {/* Subtle Sparkles trigger on hover/focus - no permanent blocking pills */}
                        {bullet.text.trim() && (
                          <div className="absolute top-2 right-2">
                            <button
                              type="button"
                              onClick={() =>
                                setActiveBulletPopoverId(
                                  activeBulletPopoverId === bullet.id ? null : bullet.id
                                )
                              }
                              className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-700 transition-colors opacity-0 group-hover/bullet:opacity-100 focus:opacity-100"
                              title="AI writing feedback & optimization"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                            </button>

                            {/* Floating Popover */}
                            {activeBulletPopoverId === bullet.id && (
                              <>
                                <div
                                  className="fixed inset-0 z-20"
                                  onClick={() => setActiveBulletPopoverId(null)}
                                />
                                <div className="absolute right-0 top-full mt-1.5 w-64 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-3 z-30 space-y-2 text-xs animate-scale-up">
                                  <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-1.5">
                                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                                      Bullet Feedback
                                    </span>
                                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                                      XYZ: {analysis.score}%
                                    </span>
                                  </div>

                                  <div className="space-y-1 text-[11px] text-zinc-600 dark:text-zinc-400">
                                    <div className="flex items-center justify-between">
                                      <span>Action Verb</span>
                                      <span className={analysis.hasActionVerb ? 'text-emerald-600 font-medium' : 'text-zinc-400'}>
                                        {analysis.hasActionVerb ? '✓ Present' : 'Missing'}
                                      </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span>Quantified Metric</span>
                                      <span className={analysis.hasMetric ? 'text-emerald-600 font-medium' : 'text-zinc-400'}>
                                        {analysis.hasMetric ? '✓ Measured' : 'Missing'}
                                      </span>
                                    </div>
                                    {lineTrim.isWidowOrphan && (
                                      <div className="p-1.5 rounded bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 text-[10px] leading-tight">
                                        Trim ~2 words to save 1 vertical line.
                                      </div>
                                    )}
                                  </div>

                                  <div className="pt-1 flex flex-col gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setActiveRewriterId(bullet.id);
                                        setActiveBulletPopoverId(null);
                                      }}
                                      className="w-full py-1.5 px-2.5 rounded-lg bg-violet-600 text-white font-medium text-xs hover:bg-violet-700 transition text-center flex items-center justify-center gap-1.5"
                                    >
                                      <Sparkles className="w-3 h-3" /> ✨ Rewrite (XYZ)
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setOptimizerModal({
                                          isOpen: true,
                                          expId: exp.id,
                                          bulletId: bullet.id,
                                          text: bullet.text,
                                        });
                                        setActiveBulletPopoverId(null);
                                      }}
                                      className="w-full py-1.5 px-2.5 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium text-xs hover:opacity-90 transition text-center"
                                    >
                                      Full Optimizer
                                    </button>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        )}

                        {/* Inline XYZ Rewriter Panel */}
                        {activeRewriterId === bullet.id && (
                          <BulletRewriterPanel
                            originalText={bullet.text}
                            contextRole={exp.position}
                            onApply={(newText) => {
                              updateExperienceBullet(exp.id, bullet.id, newText);
                            }}
                            onClose={() => setActiveRewriterId(null)}
                          />
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeExperienceBullet(exp.id, bullet.id)}
                        className="p-1 text-zinc-300 hover:text-rose-500 rounded mt-2 transition"
                        title="Remove Bullet"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}

      {/* Bullet Optimizer Modal */}
      {optimizerModal.isOpen && (
        <BulletOptimizerModal
          isOpen={optimizerModal.isOpen}
          initialText={optimizerModal.text}
          onClose={() => setOptimizerModal({ isOpen: false, expId: '', bulletId: '', text: '' })}
          onApply={(newText) => {
            updateExperienceBullet(optimizerModal.expId, optimizerModal.bulletId, newText);
          }}
        />
      )}
    </div>
  );
}

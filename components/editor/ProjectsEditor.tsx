'use client';

import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Github,
  Sparkles,
  X,
} from 'lucide-react';
import { useResumeStore } from '../../src/store/useResumeStore';
import { GitHubImportModal } from './GitHubImportModal';
import { BulletOptimizerModal } from './BulletOptimizerModal';
import { BulletRewriterPanel } from './BulletRewriterPanel';
import { analyzeBulletPoint } from '../../src/utils/bulletChecker';
import { analyzeLineTrim } from '../../src/utils/lineTrimmer';

const POPULAR_TECH_CHIPS = [
  'React.js',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Python',
  'Go',
  'PostgreSQL',
  'MongoDB',
  'Tailwind CSS',
  'Docker',
  'GraphQL',
  'AWS',
  'Redis',
  'FastAPI',
  'Kubernetes',
];

function TechTagInput({
  technologies,
  onChange,
}: {
  technologies: string[];
  onChange: (techs: string[]) => void;
}) {
  const [inputVal, setInputVal] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredSuggestions = POPULAR_TECH_CHIPS.filter(
    (chip) =>
      chip.toLowerCase().includes(inputVal.trim().toLowerCase()) &&
      !technologies.some((t) => t.toLowerCase() === chip.toLowerCase())
  ).slice(0, 6);

  const handleAdd = (techName: string) => {
    const trimmed = techName.trim();
    if (trimmed && !technologies.some((t) => t.toLowerCase() === trimmed.toLowerCase())) {
      onChange([...technologies, trimmed]);
    }
    setInputVal('');
    setIsOpen(false);
  };

  const handleRemove = (techIndex: number) => {
    onChange(technologies.filter((_, idx) => idx !== techIndex));
  };

  return (
    <div className="space-y-1">
      <label className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
        Tech Stack
      </label>
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg min-h-[38px] focus-within:border-zinc-400 dark:focus-within:border-zinc-600 transition-colors">
        {technologies.map((tech, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 text-xs px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-700 font-medium"
          >
            <span>{tech}</span>
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 ml-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}

        <div className="relative flex-1 min-w-[120px]">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (inputVal.trim()) handleAdd(inputVal);
              } else if (e.key === 'Backspace' && !inputVal && technologies.length > 0) {
                handleRemove(technologies.length - 1);
              }
            }}
            placeholder={technologies.length === 0 ? 'Type tech or select...' : 'Add...'}
            className="w-full text-xs px-1 py-0.5 bg-transparent text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 outline-none"
          />

          {isOpen && inputVal.trim() && filteredSuggestions.length > 0 && (
            <div className="absolute left-0 top-full mt-1 w-48 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800 py-1 z-30 max-h-36 overflow-y-auto">
              {filteredSuggestions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleAdd(item);
                  }}
                  className="w-full text-left px-2.5 py-1 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition font-medium"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProjectsEditor() {
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  const [activeBulletPopoverId, setActiveBulletPopoverId] = useState<string | null>(null);
  const [activeRewriterId, setActiveRewriterId] = useState<string | null>(null);

  const projects = useResumeStore((s) => s.projects);
  const addProject = useResumeStore((s) => s.addProject);
  const updateProject = useResumeStore((s) => s.updateProject);
  const removeProject = useResumeStore((s) => s.removeProject);
  const reorderProjects = useResumeStore((s) => s.reorderProjects);

  const addProjectBullet = useResumeStore((s) => s.addProjectBullet);
  const updateProjectBullet = useResumeStore((s) => s.updateProjectBullet);
  const removeProjectBullet = useResumeStore((s) => s.removeProjectBullet);

  // Modal State for Bullet Optimizer
  const [optimizerModal, setOptimizerModal] = useState<{
    isOpen: boolean;
    projId: string;
    bulletId: string;
    text: string;
  }>({
    isOpen: false,
    projId: '',
    bulletId: '',
    text: '',
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-zinc-500">
          Highlight key open source work, production apps, or technical systems.
        </p>
        <div className="flex items-center gap-2">
          {/* 1-Click GitHub Import Button */}
          <button
            type="button"
            onClick={() => setIsGitHubModalOpen(true)}
            className="px-2.5 py-1.5 text-xs font-medium bg-zinc-100 hover:bg-zinc-200/80 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-lg flex items-center gap-1.5 transition-colors duration-150"
            title="Auto-fetch repositories from your GitHub profile"
          >
            <Github className="w-3.5 h-3.5 text-zinc-500" />
            Import GitHub
          </button>

          <button
            type="button"
            onClick={() => addProject()}
            className="px-3 py-1.5 text-xs font-medium bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90 rounded-lg flex items-center gap-1.5 transition-opacity duration-150 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" /> Add Project
          </button>
        </div>
      </div>

      {projects.map((proj, pIndex) => (
        <div
          key={proj.id}
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 space-y-3"
        >
          <div className="flex items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              {proj.name || 'Untitled Project'}
            </h4>

            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={pIndex === 0}
                onClick={() => reorderProjects(pIndex, pIndex - 1)}
                className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 disabled:opacity-30 rounded"
                title="Move up"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                disabled={pIndex === projects.length - 1}
                onClick={() => reorderProjects(pIndex, pIndex + 1)}
                className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 disabled:opacity-30 rounded"
                title="Move down"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => removeProject(proj.id)}
                className="p-1 text-zinc-400 hover:text-rose-600 transition rounded"
                title="Delete project"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-0.5">Project Name</label>
              <input
                type="text"
                value={proj.name}
                onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                placeholder="e.g. Distributed KV Store"
                className="w-full text-xs px-2.5 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:border-zinc-400 dark:focus:border-zinc-500 outline-none text-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-0.5">Role / Contribution</label>
              <input
                type="text"
                value={proj.role || ''}
                onChange={(e) => updateProject(proj.id, { role: e.target.value })}
                placeholder="e.g. Lead Maintainer"
                className="w-full text-xs px-2.5 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:border-zinc-400 dark:focus:border-zinc-500 outline-none text-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div className="sm:col-span-2">
              {/* Tag-Input Component with Combobox */}
              <TechTagInput
                technologies={proj.technologies}
                onChange={(newTechs) => updateProject(proj.id, { technologies: newTechs })}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-0.5">Live Demo / Repo URL</label>
              <input
                type="text"
                value={proj.url || ''}
                onChange={(e) => updateProject(proj.id, { url: e.target.value })}
                placeholder="e.g. https://github.com/alex/project"
                className="w-full text-xs px-2.5 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:border-zinc-400 dark:focus:border-zinc-500 outline-none text-zinc-900 dark:text-zinc-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-0.5">Brief Summary</label>
            <input
              type="text"
              value={proj.summary || ''}
              onChange={(e) => updateProject(proj.id, { summary: e.target.value })}
              placeholder="1 sentence summary describing the core technical accomplishment..."
              className="w-full text-xs px-2.5 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:border-zinc-400 dark:focus:border-zinc-500 outline-none text-zinc-900 dark:text-zinc-100"
            />
          </div>

          {/* Project Bullets with on-demand AI Writing Popover */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                Key Bullet Points
              </label>
              <button
                type="button"
                onClick={() => addProjectBullet(proj.id)}
                className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Bullet
              </button>
            </div>

            <div className="space-y-2">
              {proj.bullets.map((bullet) => {
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
                          updateProjectBullet(proj.id, bullet.id, e.target.value)
                        }
                        placeholder="Accomplished [X], measured by [Y], by doing [Z]... (e.g. Architected streaming pipeline in Go, handling 45,000+ QPS with sub-5ms p99 latency)"
                        className="w-full text-xs p-2.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:border-zinc-400 dark:focus:border-zinc-500 outline-none resize-none leading-relaxed text-zinc-900 dark:text-zinc-100"
                      />

                      {/* On-demand subtle sparkle icon on hover/focus - no blocking warning pills */}
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
                            title="AI writing feedback & suggestions"
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
                                        projId: proj.id,
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
                          contextRole={proj.name}
                          onApply={(newText) => {
                            updateProjectBullet(proj.id, bullet.id, newText);
                          }}
                          onClose={() => setActiveRewriterId(null)}
                        />
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => removeProjectBullet(proj.id, bullet.id)}
                      className="p-1 text-zinc-300 hover:text-rose-500 rounded mt-2 transition"
                      title="Delete bullet"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}

      {/* Bullet Optimizer Modal */}
      {optimizerModal.isOpen && (
        <BulletOptimizerModal
          isOpen={optimizerModal.isOpen}
          initialText={optimizerModal.text}
          onClose={() =>
            setOptimizerModal({ isOpen: false, projId: '', bulletId: '', text: '' })
          }
          onApply={(newText) => {
            updateProjectBullet(optimizerModal.projId, optimizerModal.bulletId, newText);
            setOptimizerModal({ isOpen: false, projId: '', bulletId: '', text: '' });
          }}
        />
      )}

      {/* GitHub Importer Modal */}
      <GitHubImportModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
      />
    </div>
  );
}

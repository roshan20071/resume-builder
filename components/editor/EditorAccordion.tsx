'use client';

import React, { useState, useRef } from 'react';
import {
  User,
  Briefcase,
  FolderGit2,
  Cpu,
  GraduationCap,
  Award,
  ChevronDown,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  Info,
  Check,
  GripVertical,
} from 'lucide-react';
import { useResumeStore } from '../../src/store/useResumeStore';
import { ContactForm } from './ContactForm';
import { ExperienceEditor } from './ExperienceEditor';
import { ProjectsEditor } from './ProjectsEditor';
import { SkillsEditor } from './SkillsEditor';
import { EducationEditor } from './EducationEditor';
import { CustomSectionEditor } from './CustomSectionEditor';
import type { SectionId } from '../../src/types/resume';

interface SectionItemDef {
  id: SectionId;
  label: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  activeColor: string;
  tip: string;
  isComplete: (store: ReturnType<typeof useResumeStore.getState>) => boolean;
  component: React.ReactNode;
}

export function EditorAccordion() {
  const store = useResumeStore();
  const sectionConfig = store.sectionConfig;
  const toggleSectionVisibility = store.toggleSectionVisibility;
  const reorderSections = store.reorderSections;
  const tailoringModeActive = store.tailoringModeActive;
  const jdState = store.jdState;

  const [openSectionId, setOpenSectionId] = useState<SectionId>('contact');
  const [showTipsForSection, setShowTipsForSection] = useState<Record<string, boolean>>({});
  const [dragSectionId, setDragSectionId] = useState<SectionId | null>(null);

  const toggleTip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTipsForSection((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Tailoring mode: per-section match score (heuristic from jdState)
  const getSectionTailoringDot = (sectionId: SectionId): React.ReactNode => {
    if (!tailoringModeActive || !jdState || jdState.extractedKeywords.length === 0) return null;
    const total = jdState.extractedKeywords.length;
    const matchedCount = jdState.extractedKeywords.filter((k) => k.matched).length;
    const ratio = matchedCount / total;
    const color = ratio >= 0.7 ? 'bg-emerald-400' : ratio >= 0.4 ? 'bg-amber-400' : 'bg-rose-400';
    const label = ratio >= 0.7 ? 'High JD coverage' : ratio >= 0.4 ? 'Moderate JD coverage' : 'Low JD coverage';
    return (
      <span className={`w-2 h-2 rounded-full ${color} shrink-0`} title={label} />
    );
  };

  const handleDragOver = (e: React.DragEvent, targetId: SectionId) => {
    e.preventDefault();
    if (!dragSectionId || dragSectionId === targetId) return;
    const order = sectionConfig.order;
    const fromIndex = order.indexOf(dragSectionId);
    const toIndex = order.indexOf(targetId);
    if (fromIndex !== -1 && toIndex !== -1) {
      const newOrder = [...order];
      const [moved] = newOrder.splice(fromIndex, 1);
      newOrder.splice(toIndex, 0, moved);
      reorderSections(newOrder);
      setDragSectionId(targetId);
    }
  };

  const sectionDefs: Record<SectionId, SectionItemDef> = {
    contact: {
      id: 'contact',
      label: 'Contact & Summary',
      subtitle: 'Name, titles, links & executive bio',
      icon: User,
      gradient: 'from-blue-500 to-indigo-600',
      activeColor: 'border-l-blue-500 text-blue-600',
      tip: 'Recruiter Tip: Include your city/state, LinkedIn, and GitHub. A 2-3 line summary highlighting your core expertise boosts ATS recruiter engagement by 35%.',
      isComplete: (s) => Boolean(s.profile.fullName?.trim() && (s.profile.email?.trim() || s.profile.phone?.trim())),
      component: <ContactForm />,
    },
    summary: {
      id: 'summary',
      label: 'Summary Details',
      subtitle: 'Career highlights & objectives',
      icon: User,
      gradient: 'from-blue-500 to-indigo-600',
      activeColor: 'border-l-blue-500 text-blue-600',
      tip: 'Recruiter Tip: Keep your summary concise and focused on high-level achievements and primary tech stack.',
      isComplete: (s) => Boolean(s.profile.summary?.trim()),
      component: <ContactForm />,
    },
    experience: {
      id: 'experience',
      label: 'Work Experience',
      subtitle: 'Employment history & bullet impact',
      icon: Briefcase,
      gradient: 'from-purple-500 to-violet-600',
      activeColor: 'border-l-purple-500 text-purple-600',
      tip: 'Recruiter Tip: Use the XYZ formula ("Accomplished [X] as measured by [Y], by doing [Z]"). Begin each bullet with strong action verbs like Architected, Optimized, or Spearheaded.',
      isComplete: (s) => s.experience.length > 0 && s.experience.some((e) => e.bullets.some((b) => b.text.trim())),
      component: <ExperienceEditor />,
    },
    projects: {
      id: 'projects',
      label: 'Featured Projects',
      subtitle: 'Tech stack, metrics & live repo links',
      icon: FolderGit2,
      gradient: 'from-teal-500 to-emerald-600',
      activeColor: 'border-l-teal-500 text-teal-600',
      tip: 'Recruiter Tip: Emphasize real-world scale, live demo links, and technical architecture (e.g. Next.js, Redis, PostgreSQL).',
      isComplete: (s) => s.projects.length > 0 && s.projects.some((p) => p.bullets.some((b) => b.text.trim())),
      component: <ProjectsEditor />,
    },
    skills: {
      id: 'skills',
      label: 'Technical Skills',
      subtitle: 'Categorized proficiencies & tools',
      icon: Cpu,
      gradient: 'from-amber-500 to-orange-600',
      activeColor: 'border-l-amber-500 text-amber-600',
      tip: 'Recruiter Tip: Group skills into logical categories (Languages, Frameworks, Cloud, Databases) to maximize ATS parser scanning rates.',
      isComplete: (s) => s.skills.length > 0 && s.skills.some((c) => c.skills.length > 0),
      component: <SkillsEditor />,
    },
    education: {
      id: 'education',
      label: 'Education & Academics',
      subtitle: 'Degrees, universities & GPA',
      icon: GraduationCap,
      gradient: 'from-rose-500 to-pink-600',
      activeColor: 'border-l-rose-500 text-rose-600',
      tip: 'Recruiter Tip: List your degree name, university/college, graduation year, and top relevant coursework or academic honors.',
      isComplete: (s) => s.education.length > 0 && s.education.some((e) => Boolean(e.institution?.trim())),
      component: <EducationEditor />,
    },
    certifications: {
      id: 'certifications',
      label: 'Certifications',
      subtitle: 'Licenses & verified credentials',
      icon: Award,
      gradient: 'from-cyan-500 to-blue-600',
      activeColor: 'border-l-cyan-500 text-cyan-600',
      tip: 'Recruiter Tip: Highlight recognized industry certifications (AWS Certified, Google Cloud, Meta Certified).',
      isComplete: (s) => s.customSections.length > 0 && s.customSections.some((sec) => sec.items.length > 0),
      component: <CustomSectionEditor defaultTitle="Certifications & Licenses" sectionKey="certifications" />,
    },
    custom: {
      id: 'custom',
      label: 'Custom Sections',
      subtitle: 'Certifications, awards & publications',
      icon: Award,
      gradient: 'from-slate-600 to-slate-800',
      activeColor: 'border-l-slate-600 text-slate-700',
      tip: 'Recruiter Tip: Include competitive coding achievements (LeetCode, Codeforces, Hackathons), publications, or leadership roles.',
      isComplete: (s) => s.customSections.length > 0 && s.customSections.some((sec) => sec.items.length > 0),
      component: <CustomSectionEditor defaultTitle="Certifications & Honors" sectionKey="custom" />,
    },
  };

  const configuredOrder = sectionConfig.order.filter((id) => id !== 'summary'); // Summary is edited in Contact form
  const visibleOrder = Array.from(new Set([...configuredOrder, 'custom'])) as SectionId[];

  // Calculate overall completeness
  const completedCount = visibleOrder.filter((id) => sectionDefs[id]?.isComplete(store)).length;
  const completionPercentage = Math.round((completedCount / visibleOrder.length) * 100);

  return (
    <div className="w-full space-y-3 pb-12">
      {/* Section Checklist & Progress Bar */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-3 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              Sections Progress
            </span>
          </div>
          <span className="text-[11px] font-mono font-medium text-zinc-500 dark:text-zinc-400">
            {completedCount}/{visibleOrder.length} completed ({completionPercentage}%)
          </span>
        </div>

        {/* Quick-Jump Section Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          {visibleOrder.map((sectionId) => {
            const def = sectionDefs[sectionId];
            if (!def) return null;
            const isDone = def.isComplete(store);
            const isCurrent = openSectionId === sectionId;

            return (
              <button
                key={sectionId}
                type="button"
                onClick={() => setOpenSectionId(sectionId)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all duration-150 ${
                  isCurrent
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs'
                    : isDone
                    ? 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-200/80 dark:hover:bg-zinc-700'
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {isDone ? (
                  <Check className={`w-3 h-3 ${isCurrent ? 'text-white dark:text-zinc-900' : 'text-emerald-600 dark:text-emerald-400'}`} />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                )}
                {def.label.split('&')[0].trim()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accordion Sections List */}
      {visibleOrder.map((sectionId) => {
        const def = sectionDefs[sectionId];
        if (!def) return null;
        const Icon = def.icon;
        const isOpen = openSectionId === sectionId;
        const isVisible = sectionConfig.visibility[sectionId];
        const isDone = def.isComplete(store);
        const isTipOpen = showTipsForSection[sectionId];

        return (
          <div
            key={sectionId}
            draggable
            onDragStart={() => setDragSectionId(sectionId)}
            onDragEnd={() => setDragSectionId(null)}
            onDragOver={(e) => handleDragOver(e, sectionId)}
            className={`group rounded-xl transition-all duration-150 border overflow-hidden shadow-xs ${
              dragSectionId === sectionId ? 'opacity-50 ring-2 ring-violet-400 ring-offset-1' :
              isOpen
                ? 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm'
                : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700'
            }`}
          >
            {/* Accordion Header */}
            <div
              className={`w-full px-3.5 py-3 flex items-center justify-between cursor-pointer select-none transition-colors duration-150 ${
                isOpen ? 'bg-zinc-50/70 dark:bg-zinc-800/40' : 'hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20'
              }`}
              onClick={() => setOpenSectionId(isOpen ? ('' as SectionId) : sectionId)}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {/* Drag Handle Indicator */}
                <span
                  className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 cursor-grab active:cursor-grabbing transition-opacity duration-150 -ml-1"
                  title="Reorder section"
                >
                  <GripVertical className="w-4 h-4" />
                </span>

                <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>

                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                      {def.label}
                    </h3>
                    {getSectionTailoringDot(sectionId)}
                    {isDone && (
                      <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                        <Check className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                        Complete
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                    {def.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                {/* Expert Tips Toggle Button */}
                <button
                  type="button"
                  onClick={(e) => toggleTip(sectionId, e)}
                  className={`p-1.5 rounded-md transition-colors duration-150 text-xs flex items-center gap-1 ${
                    isTipOpen ? 'bg-amber-100/80 text-amber-800' : 'text-zinc-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-zinc-800'
                  }`}
                  title="Recruiter advice"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                </button>

                {/* Visibility Toggle */}
                {sectionId !== 'contact' && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSectionVisibility(sectionId);
                    }}
                    className={`p-1.5 rounded-md transition-colors duration-150 ${
                      isVisible
                        ? 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                        : 'text-zinc-300 dark:text-zinc-600 hover:text-zinc-500'
                    }`}
                    title={isVisible ? 'Hide from resume' : 'Show on resume'}
                  >
                    {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                )}

                <div className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-150 ${
                      isOpen ? 'rotate-180 text-zinc-800 dark:text-zinc-200' : ''
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Recruiter Tip Banner */}
            {isTipOpen && (
              <div className="mx-3.5 my-2 p-3 rounded-lg bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="flex-1 leading-relaxed">
                  <strong className="font-semibold block mb-0.5">Recruiter Tip</strong>
                  {def.tip}
                </div>
              </div>
            )}

            {/* Accordion Body */}
            {isOpen && (
              <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                {def.component}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

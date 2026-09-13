'use client';

import React, { useState } from 'react';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  User,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Cpu,
  Zap,
  Plus,
} from 'lucide-react';
import { useResumeStore } from '../../src/store/useResumeStore';
import {
  SKILL_BUNDLE_PACKS,
  POPULAR_SKILLS_LIST,
  QUICK_POPULAR_SKILL_CHIPS,
  SUMMARY_STARTERS_BY_ROLE,
  ROLE_BULLETS_INSPIRATION,
  COURSEWORK_SUGGESTIONS_BY_FIELD,
} from '../../src/utils/autocompleteData';

interface RapidFillWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INPUT_CLASS =
  'w-full text-xs px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-900/20 focus:border-zinc-400 focus:bg-white outline-none transition placeholder:text-zinc-400 text-zinc-800';

const LABEL_CLASS = 'block text-[11px] font-semibold text-zinc-500 mb-1';

export function RapidFillWizardModal({ isOpen, onClose }: RapidFillWizardModalProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [customSkillInput, setCustomSkillInput] = useState('');
  const [targetCategoryName, setTargetCategoryName] = useState('Core Technical Skills');
  const [customCategoryInput, setCustomCategoryInput] = useState('');
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [isSkillSearchFocused, setIsSkillSearchFocused] = useState(false);

  const profile = useResumeStore((s) => s.profile);
  const updateProfile = useResumeStore((s) => s.updateProfile);
  const education = useResumeStore((s) => s.education);
  const updateEducation = useResumeStore((s) => s.updateEducation);
  const addEducation = useResumeStore((s) => s.addEducation);
  const experience = useResumeStore((s) => s.experience);
  const updateExperience = useResumeStore((s) => s.updateExperience);
  const addExperienceBullet = useResumeStore((s) => s.addExperienceBullet);
  const updateExperienceBullet = useResumeStore((s) => s.updateExperienceBullet);
  const projects = useResumeStore((s) => s.projects);
  const updateProject = useResumeStore((s) => s.updateProject);
  const skills = useResumeStore((s) => s.skills);
  const addSkillCategory = useResumeStore((s) => s.addSkillCategory);
  const addSkillToCategory = useResumeStore((s) => s.addSkillToCategory);
  const removeSkillFromCategory = useResumeStore((s) => s.removeSkillFromCategory);
  const removeSkillCategory = useResumeStore((s) => s.removeSkillCategory);

  if (!isOpen) return null;

  const totalSteps = 5;
  const progressPercent = (currentStep / totalSteps) * 100;

  const stepsInfo = [
    { num: 1, title: 'Personal', icon: User },
    { num: 2, title: 'Education', icon: GraduationCap },
    { num: 3, title: 'Experience', icon: Briefcase },
    { num: 4, title: 'Projects', icon: FolderGit2 },
    { num: 5, title: 'Skills', icon: Cpu },
  ];

  const handleApplySkillPack = (pack: (typeof SKILL_BUNDLE_PACKS)[0]) => {
    const existingCat = skills.find(
      (c) => c.categoryName.toLowerCase() === pack.categoryName.toLowerCase()
    );
    if (existingCat) {
      pack.skills.forEach((sk) => {
        if (!existingCat.skills.some((s) => s.toLowerCase() === sk.toLowerCase())) {
          addSkillToCategory(existingCat.id, sk);
        }
      });
    } else {
      addSkillCategory(pack.categoryName, pack.skills);
    }
  };

  const handleAddCustomSkills = (rawInput?: string, specificCategory?: string) => {
    const textToAdd = (rawInput !== undefined ? rawInput : customSkillInput).trim();
    if (!textToAdd) return;

    const catName = (
      specificCategory ||
      (isCreatingCategory && customCategoryInput.trim() ? customCategoryInput.trim() : targetCategoryName)
    ).trim() || 'Core Technical Skills';

    const rawSkills = textToAdd.split(/[,;\n]+/).map((s) => s.trim()).filter((s) => s.length > 0);
    if (rawSkills.length === 0) return;

    let targetCat = skills.find((c) => c.categoryName.toLowerCase() === catName.toLowerCase());
    if (!targetCat) {
      addSkillCategory(catName, rawSkills);
    } else {
      rawSkills.forEach((skillName) => {
        if (!targetCat!.skills.some((s) => s.toLowerCase() === skillName.toLowerCase())) {
          addSkillToCategory(targetCat!.id, skillName);
        }
      });
    }

    setCustomSkillInput('');
    if (isCreatingCategory) {
      setIsCreatingCategory(false);
      setCustomCategoryInput('');
    }
  };

  const autocompleteSkillSuggestions = customSkillInput.trim().length > 0
    ? POPULAR_SKILLS_LIST.filter((item) =>
        item.name.toLowerCase().includes(customSkillInput.trim().toLowerCase()) &&
        !skills.some((cat) => cat.skills.some((s) => s.toLowerCase() === item.name.toLowerCase()))
      ).slice(0, 8)
    : [];

  const primaryEdu = education[0] || {
    id: 'edu-w-1',
    institution: '',
    degree: 'Bachelor of Technology (B.Tech)',
    fieldOfStudy: 'Computer Science & Engineering',
    location: '',
    startDate: '2020-08',
    endDate: '2024-05',
    gpa: '8.5 / 10 CGPA',
  };

  const primaryExp = experience[0] || {
    id: 'exp-w-1',
    company: '',
    position: 'Software Engineer',
    location: '',
    startDate: '2022-03',
    endDate: 'Present',
    isCurrent: true,
    bullets: [],
  };

  const primaryProj = projects[0] || {
    id: 'proj-w-1',
    name: '',
    technologies: ['React', 'TypeScript', 'Node.js'],
    bullets: [],
  };

  const totalSkillCount = skills.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in no-print">
      <div className="bg-white rounded-xl shadow-xl border border-zinc-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-900 tracking-tight">Rapid Resume Setup</h2>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Complete your ATS-calibrated resume in 5 steps — under 2 minutes.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Breadcrumb + Progress */}
        <div className="bg-zinc-50 border-b border-zinc-100 px-6 py-3.5">
          <div className="flex items-center justify-between gap-2 mb-3">
            {stepsInfo.map((s) => {
              const Icon = s.icon;
              const isPast = currentStep > s.num;
              const isCurrent = currentStep === s.num;
              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => setCurrentStep(s.num as any)}
                  className={`flex items-center gap-1.5 text-xs font-medium transition-all ${
                    isCurrent ? 'text-zinc-900'
                    : isPast ? 'text-zinc-500'
                    : 'text-zinc-300 hover:text-zinc-500'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                      isCurrent ? 'bg-zinc-900 text-white'
                      : isPast ? 'bg-zinc-200 text-zinc-600'
                      : 'bg-zinc-100 text-zinc-400'
                    }`}
                  >
                    {isPast ? <Check className="w-3 h-3" /> : s.num}
                  </div>
                  <span className="hidden sm:inline">{s.title}</span>
                </button>
              );
            })}
          </div>

          <div className="w-full h-1 bg-zinc-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-zinc-900 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-zinc-50/20">

          {/* STEP 1: Personal & Contact */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-semibold text-zinc-800 flex items-center gap-2 mb-4">
                  <User className="w-4 h-4 text-zinc-400" />
                  Contact & Headline
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={LABEL_CLASS}>Full Name</label>
                    <input type="text" value={profile.fullName}
                      onChange={(e) => updateProfile({ fullName: e.target.value })}
                      placeholder="e.g. Alex Morgan" className={INPUT_CLASS} />
                  </div>
                  <div>
                    <label className={LABEL_CLASS}>Target Role / Title</label>
                    <input type="text" value={profile.targetRole}
                      onChange={(e) => updateProfile({ targetRole: e.target.value })}
                      placeholder="e.g. Full-Stack Engineer" className={INPUT_CLASS} />
                  </div>
                  <div>
                    <label className={LABEL_CLASS}>Email</label>
                    <input type="email" value={profile.email}
                      onChange={(e) => updateProfile({ email: e.target.value })}
                      placeholder="e.g. alex@gmail.com" className={INPUT_CLASS} />
                  </div>
                  <div>
                    <label className={LABEL_CLASS}>Phone</label>
                    <input type="text" value={profile.phone}
                      onChange={(e) => updateProfile({ phone: e.target.value })}
                      placeholder="e.g. +1 (555) 019-2834" className={INPUT_CLASS} />
                  </div>
                  <div>
                    <label className={LABEL_CLASS}>Location</label>
                    <input type="text" value={profile.location}
                      onChange={(e) => updateProfile({ location: e.target.value })}
                      placeholder="e.g. San Francisco, CA (Open to Remote)" className={INPUT_CLASS} />
                  </div>
                  <div>
                    <label className={LABEL_CLASS}>LinkedIn URL</label>
                    <input type="text" value={profile.linkedin || ''}
                      onChange={(e) => updateProfile({ linkedin: e.target.value })}
                      placeholder="e.g. linkedin.com/in/alexmorgan" className={INPUT_CLASS} />
                  </div>
                </div>
              </div>

              {/* Summary Starters */}
              <div>
                <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  1-click summary starter
                </p>
                <div className="space-y-1.5">
                  {(SUMMARY_STARTERS_BY_ROLE.general_eng || []).slice(0, 2).map((starter, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => updateProfile({ summary: starter })}
                      className="w-full text-left p-3 rounded-lg bg-white hover:bg-zinc-50 text-[11px] text-zinc-600 border border-zinc-200 transition leading-snug"
                    >
                      {starter}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Education */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <h3 className="text-sm font-semibold text-zinc-800 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-zinc-400" />
                Education Credentials
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className={LABEL_CLASS}>College / University</label>
                  <input
                    type="text"
                    value={primaryEdu.institution}
                    onChange={(e) => {
                      if (education.length > 0) {
                        updateEducation(primaryEdu.id, { institution: e.target.value });
                      } else {
                        addEducation({ ...primaryEdu, institution: e.target.value });
                      }
                    }}
                    placeholder="e.g. IIT Bombay or Stanford University"
                    className={INPUT_CLASS}
                  />
                </div>

                <div>
                  <label className={LABEL_CLASS}>Degree & Major</label>
                  <input
                    type="text"
                    value={`${primaryEdu.degree} in ${primaryEdu.fieldOfStudy}`}
                    onChange={(e) => {
                      const parts = e.target.value.split(/\bin\b/i);
                      updateEducation(primaryEdu.id, {
                        degree: parts[0]?.trim() || e.target.value,
                        fieldOfStudy: parts[1]?.trim() || '',
                      });
                    }}
                    placeholder="e.g. B.Tech in Computer Science"
                    className={INPUT_CLASS}
                  />
                </div>

                <div>
                  <label className={LABEL_CLASS}>Graduation Year & GPA</label>
                  <input
                    type="text"
                    value={`${primaryEdu.endDate} • ${primaryEdu.gpa || '8.8 CGPA'}`}
                    onChange={(e) => {
                      const parts = e.target.value.split('•');
                      updateEducation(primaryEdu.id, {
                        endDate: parts[0]?.trim() || '2024',
                        gpa: parts[1]?.trim() || '',
                      });
                    }}
                    placeholder="e.g. 2024 • 8.8 / 10 CGPA"
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              {/* Coursework chips */}
              <div>
                <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Key coursework (click to add)
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(COURSEWORK_SUGGESTIONS_BY_FIELD.cs || []).slice(0, 8).map((subject) => {
                    const isAdded = primaryEdu.coursework?.includes(subject);
                    return (
                      <button
                        key={subject}
                        type="button"
                        onClick={() => {
                          const cur = primaryEdu.coursework || [];
                          updateEducation(primaryEdu.id, {
                            coursework: isAdded ? cur.filter((s) => s !== subject) : [...cur, subject],
                          });
                        }}
                        className={`text-[10px] px-2 py-1 rounded-md font-medium transition ${
                          isAdded
                            ? 'bg-zinc-900 text-white'
                            : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600 border border-zinc-200'
                        }`}
                      >
                        {isAdded ? `✓ ${subject}` : subject}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Experience */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <h3 className="text-sm font-semibold text-zinc-800 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-zinc-400" />
                Work Experience
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={LABEL_CLASS}>Company / Organization</label>
                  <input type="text" value={primaryExp.company}
                    onChange={(e) => updateExperience(primaryExp.id, { company: e.target.value })}
                    placeholder="e.g. Google, Microsoft, Startup" className={INPUT_CLASS} />
                </div>
                <div>
                  <label className={LABEL_CLASS}>Job Title</label>
                  <input type="text" value={primaryExp.position}
                    onChange={(e) => updateExperience(primaryExp.id, { position: e.target.value })}
                    placeholder="e.g. Software Engineer" className={INPUT_CLASS} />
                </div>
              </div>

              {/* Bullet inspiration */}
              <div>
                <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Click to insert a high-impact bullet
                </p>
                <div className="space-y-1.5 max-h-56 overflow-y-auto">
                  {ROLE_BULLETS_INSPIRATION[0]?.bullets.map((bText, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        const newBId = `b-wiz-${Date.now()}-${i}`;
                        addExperienceBullet(primaryExp.id);
                        setTimeout(() => {
                          updateExperienceBullet(primaryExp.id, newBId, bText);
                        }, 10);
                      }}
                      className="w-full text-left p-2.5 rounded-lg bg-white hover:bg-zinc-50 text-[11px] text-zinc-600 border border-zinc-200 transition flex items-start gap-2 leading-snug"
                    >
                      <Plus className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                      {bText}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Projects */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <h3 className="text-sm font-semibold text-zinc-800 flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-zinc-400" />
                Featured Technical Project
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={LABEL_CLASS}>Project Name</label>
                  <input type="text" value={primaryProj.name}
                    onChange={(e) => updateProject(primaryProj.id, { name: e.target.value })}
                    placeholder="e.g. AI-Powered Resume Builder" className={INPUT_CLASS} />
                </div>
                <div>
                  <label className={LABEL_CLASS}>Tech Stack</label>
                  <input
                    type="text"
                    value={primaryProj.technologies.join(', ')}
                    onChange={(e) =>
                      updateProject(primaryProj.id, {
                        technologies: e.target.value.split(',').map((t) => t.trim()),
                      })
                    }
                    placeholder="e.g. React, Next.js, Node.js, PostgreSQL"
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              <div>
                <label className={LABEL_CLASS}>Key Accomplishment Bullet</label>
                <textarea
                  rows={2}
                  value={primaryProj.bullets[0]?.text || ''}
                  onChange={(e) => {
                    if (primaryProj.bullets.length > 0) {
                      updateProject(primaryProj.id, {
                        bullets: [{ ...primaryProj.bullets[0], text: e.target.value }],
                      });
                    }
                  }}
                  placeholder="e.g. Architected responsive web app with 1,200+ monthly active users and sub-100ms API response time."
                  className={`${INPUT_CLASS} resize-none leading-relaxed`}
                />
              </div>
            </div>
          )}

          {/* STEP 5: Skills */}
          {currentStep === 5 && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-zinc-800 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-zinc-400" />
                  Skills & Technical Proficiencies
                </h3>
                {totalSkillCount > 0 && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200">
                    {totalSkillCount} skills added
                  </span>
                )}
              </div>

              {/* Custom skill input */}
              <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="text-xs font-semibold text-zinc-700">Add skills (or paste comma-separated)</label>

                  <div className="flex items-center gap-1.5 text-[11px]">
                    <span className="text-zinc-400 font-medium">Category:</span>
                    {!isCreatingCategory ? (
                      <select
                        value={targetCategoryName}
                        onChange={(e) => {
                          if (e.target.value === '__NEW__') {
                            setIsCreatingCategory(true);
                          } else {
                            setTargetCategoryName(e.target.value);
                          }
                        }}
                        className="text-xs px-2 py-1 bg-zinc-50 border border-zinc-200 rounded-md font-medium text-zinc-700 focus:ring-1 focus:ring-zinc-900/20 outline-none"
                      >
                        {skills.map((c) => (
                          <option key={c.id} value={c.categoryName}>{c.categoryName}</option>
                        ))}
                        {!skills.some((c) => c.categoryName === 'Core Technical Skills') && (
                          <option value="Core Technical Skills">Core Technical Skills</option>
                        )}
                        {!skills.some((c) => c.categoryName === 'Languages & Frameworks') && (
                          <option value="Languages & Frameworks">Languages & Frameworks</option>
                        )}
                        {!skills.some((c) => c.categoryName === 'Tools & Cloud') && (
                          <option value="Tools & Cloud">Tools & Cloud</option>
                        )}
                        <option value="__NEW__">+ New Category...</option>
                      </select>
                    ) : (
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={customCategoryInput}
                          onChange={(e) => setCustomCategoryInput(e.target.value)}
                          placeholder="Category name..."
                          className="text-xs px-2 py-1 bg-white border border-zinc-300 rounded-md font-medium text-zinc-700 outline-none w-36 focus:ring-1 focus:ring-zinc-900/20"
                          autoFocus
                        />
                        <button type="button" onClick={() => setIsCreatingCategory(false)}
                          className="text-zinc-400 hover:text-zinc-600 text-xs">✕</button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Input + Add button */}
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={customSkillInput}
                      onChange={(e) => setCustomSkillInput(e.target.value)}
                      onFocus={() => setIsSkillSearchFocused(true)}
                      onBlur={() => setTimeout(() => setIsSkillSearchFocused(false), 200)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustomSkills(); } }}
                      placeholder="Type any skill — e.g. Rust, Solidity, or paste 'React, Node, Go'"
                      className={INPUT_CLASS}
                    />
                    <button
                      type="button"
                      onClick={() => handleAddCustomSkills()}
                      disabled={!customSkillInput.trim()}
                      className="px-3 py-2 bg-zinc-900 hover:bg-black disabled:opacity-40 text-white text-xs font-semibold rounded-lg transition flex items-center gap-1 shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add
                    </button>
                  </div>

                  {/* Autocomplete dropdown */}
                  {isSkillSearchFocused && autocompleteSkillSuggestions.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-zinc-200 py-1.5 z-30 max-h-48 overflow-y-auto">
                      <div className="text-[10px] font-semibold uppercase text-zinc-400 px-3 py-1 tracking-wider">
                        Skill Directory
                      </div>
                      {autocompleteSkillSuggestions.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onMouseDown={(e) => { e.preventDefault(); handleAddCustomSkills(item.name, item.category); }}
                          className="w-full text-left px-3 py-1.5 hover:bg-zinc-50 text-xs flex items-center justify-between text-zinc-800 transition"
                        >
                          <span className="font-medium">{item.name}</span>
                          <span className="text-[10px] text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded">{item.category}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick-add skill chips */}
                <div>
                  <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">Popular skills</p>
                  <div className="flex flex-wrap gap-1.5 max-h-16 overflow-y-auto">
                    {QUICK_POPULAR_SKILL_CHIPS.map((chip) => {
                      const isAdded = skills.some((c) =>
                        c.skills.some((s) => s.toLowerCase() === chip.toLowerCase())
                      );
                      return (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => { if (!isAdded) handleAddCustomSkills(chip); }}
                          className={`text-[10px] px-2 py-1 rounded-md font-medium transition ${
                            isAdded
                              ? 'bg-zinc-900 text-white'
                              : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600 border border-zinc-200'
                          }`}
                        >
                          {isAdded ? `✓ ${chip}` : chip}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Current skills in resume */}
              {skills.length > 0 && (
                <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-2.5">
                  <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Your resume skills</p>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {skills.map((cat) => (
                      <div key={cat.id} className="border border-zinc-100 rounded-lg p-2.5 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-zinc-700">{cat.categoryName} <span className="font-normal text-zinc-400">({cat.skills.length})</span></span>
                          <button type="button" onClick={() => removeSkillCategory(cat.id)}
                            className="text-[10px] text-zinc-400 hover:text-red-500 font-medium transition">
                            Remove
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {cat.skills.map((skill, sIdx) => (
                            <span key={sIdx} className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200">
                              {skill}
                              <button type="button" onClick={() => removeSkillFromCategory(cat.id, sIdx)}
                                className="text-zinc-400 hover:text-red-500 ml-0.5 font-bold transition" title={`Remove ${skill}`}>
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skill Packs */}
              <div>
                <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Pre-packaged domain bundles
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {SKILL_BUNDLE_PACKS.map((pack) => {
                    const isAlreadyAdded = skills.some(
                      (c) => c.categoryName.toLowerCase() === pack.categoryName.toLowerCase()
                    );
                    return (
                      <button
                        key={pack.id}
                        type="button"
                        onClick={() => handleApplySkillPack(pack)}
                        className={`p-3 rounded-xl border text-left transition flex items-start justify-between gap-2 ${
                          isAlreadyAdded ? 'bg-zinc-900 border-zinc-900' : 'bg-white hover:bg-zinc-50 border-zinc-200'
                        }`}
                      >
                        <div className="min-w-0">
                          <div className={`text-xs font-semibold ${isAlreadyAdded ? 'text-white' : 'text-zinc-800'}`}>
                            {pack.label}
                          </div>
                          <p className={`text-[10px] mt-0.5 line-clamp-1 ${isAlreadyAdded ? 'text-zinc-300' : 'text-zinc-400'}`}>
                            {pack.skills.join(', ')}
                          </p>
                        </div>
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded shrink-0 ${
                          isAlreadyAdded ? 'bg-white text-zinc-900' : 'bg-zinc-100 text-zinc-500'
                        }`}>
                          {isAlreadyAdded ? '✓' : '+'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="bg-white border-t border-zinc-100 px-6 py-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (currentStep > 1) {
                setCurrentStep((currentStep - 1) as any);
              } else {
                onClose();
              }
            }}
            className="px-3.5 py-2 text-xs font-medium text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 rounded-lg transition flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </button>

          <div className="flex items-center gap-2">
            {currentStep < 5 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((currentStep + 1) as any)}
                className="px-5 py-2 bg-zinc-900 hover:bg-black text-white text-xs font-semibold rounded-lg transition flex items-center gap-1.5"
              >
                Next
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 bg-zinc-900 hover:bg-black text-white text-xs font-semibold rounded-lg transition flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                Finish & View Resume
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  Sparkles,
  LayoutTemplate,
  Search,
  Check,
  User,
  GraduationCap,
  Edit3,
  Palette,
  CheckCircle,
} from 'lucide-react';
import { STARTER_ROLES } from '../../src/store/starterTemplates';
import { useResumeStore } from '../../src/store/useResumeStore';
import type { FontFamilyOption, SpacingPreset } from '../../src/types/resume';
import {
  getLastUsedIdentity,
  saveLastUsedIdentity,
  generatePersonalizedResume,
  UserBasicIdentity,
} from '../../src/utils/aiTemplatePersonalizer';
import { ALL_INSTITUTIONS_DIRECTORY } from '../../src/utils/autocompleteData';

interface TemplateGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PDF_EXPORT_THEMES = [
  {
    id: 'minimalist',
    name: 'Minimalist Modern',
    tagline: 'Ultra-crisp & high readability',
    description: 'Inter typography with compact spacing and sleek zinc accents. Perfect for Software Engineers and technical applicants looking for maximum 1-page efficiency.',
    fontFamily: 'inter' as FontFamilyOption,
    accentColor: '#18181b',
    spacingPreset: 'tight' as SpacingPreset,
    badge: 'Recommended for Tech',
    colorHex: '#18181b',
    fontLabel: 'Inter',
    spacingLabel: 'Tight',
  },
  {
    id: 'corporate_navy',
    name: 'Corporate Navy',
    tagline: 'Authoritative & executive polish',
    description: 'Clean Roboto layout with deep navy accents and balanced line heights. Tailored for enterprise management, finance, business strategy, and consulting.',
    fontFamily: 'roboto' as FontFamilyOption,
    accentColor: '#1e3a8a',
    spacingPreset: 'normal' as SpacingPreset,
    badge: 'Enterprise & Finance',
    colorHex: '#1e3a8a',
    fontLabel: 'Roboto',
    spacingLabel: 'Normal',
  },
  {
    id: 'modern_executive',
    name: 'Executive Editorial',
    tagline: 'Distinguished serif sophistication',
    description: 'Merriweather serif headings with slate accents and comfortable breathing room. Favored by senior directors, legal counsel, and C-level applicants.',
    fontFamily: 'merriweather' as FontFamilyOption,
    accentColor: '#0f172a',
    spacingPreset: 'relaxed' as SpacingPreset,
    badge: 'Senior Leadership',
    colorHex: '#0f172a',
    fontLabel: 'Merriweather',
    spacingLabel: 'Relaxed',
  },
  {
    id: 'creative_developer',
    name: 'Creative Developer',
    tagline: 'Modern developer aesthetic',
    description: 'JetBrains Mono accents with vivid indigo hues and high data density. Stand out for DevOps, backend systems, and creative engineering roles.',
    fontFamily: 'jetbrains_mono' as FontFamilyOption,
    accentColor: '#4338ca',
    spacingPreset: 'compact' as SpacingPreset,
    badge: 'Modern Dev',
    colorHex: '#4338ca',
    fontLabel: 'JetBrains Mono',
    spacingLabel: 'Compact',
  },
];

type CategoryFilter = 'All' | 'Engineering' | 'Product & Design' | 'Data & AI' | 'Business & Finance' | 'Entry Level';

export function TemplateGalleryModal({ isOpen, onClose }: TemplateGalleryModalProps) {
  const [activeModalTab, setActiveModalTab] = useState<'templates' | 'themes'>('templates');
  const [appliedThemeId, setAppliedThemeId] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPersonalizeEnabled, setIsPersonalizeEnabled] = useState(true);
  const [isDetailEditorOpen, setIsDetailEditorOpen] = useState(false);
  const [activeCustomRoleTarget, setActiveCustomRoleTarget] = useState<string | null>(null);

  const currentProfile = useResumeStore((s) => s.profile);
  const currentEducation = useResumeStore((s) => s.education);
  const loadStarterRole = useResumeStore((s) => s.loadStarterRole);
  const createSlot = useResumeStore((s) => s.createSlot);

  const setAccentColor = useResumeStore((s) => s.setAccentColor);
  const setFontFamily = useResumeStore((s) => s.setFontFamily);
  const setSpacingPreset = useResumeStore((s) => s.setSpacingPreset);
  const currentAccent = useResumeStore((s) => s.templateConfig.accentColor);
  const currentFont = useResumeStore((s) => s.templateConfig.fontFamily);
  const currentSpacing = useResumeStore((s) => s.templateConfig.spacingPreset);

  const [userForm, setUserForm] = useState<UserBasicIdentity>({
    fullName: '',
    targetRole: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    institution: '',
    degree: 'Bachelor of Technology (B.Tech)',
    fieldOfStudy: 'Computer Science & Engineering',
    startDate: '2021-08',
    endDate: '2025-05',
    gpa: '8.7 / 10 CGPA',
  });

  const [collegeQuery, setCollegeQuery] = useState('');
  const [showCollegeDropdown, setShowCollegeDropdown] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const lastStored = getLastUsedIdentity();
    const primaryEdu = currentEducation[0];

    setUserForm({
      fullName: currentProfile.fullName || lastStored?.fullName || '',
      targetRole: currentProfile.targetRole || lastStored?.targetRole || '',
      email: currentProfile.email || lastStored?.email || '',
      phone: currentProfile.phone || lastStored?.phone || '',
      location: currentProfile.location || lastStored?.location || '',
      website: currentProfile.website || lastStored?.website || '',
      linkedin: currentProfile.linkedin || lastStored?.linkedin || '',
      github: currentProfile.github || lastStored?.github || '',
      institution: primaryEdu?.institution || lastStored?.institution || '',
      degree: primaryEdu?.degree || lastStored?.degree || 'Bachelor of Technology (B.Tech)',
      fieldOfStudy: primaryEdu?.fieldOfStudy || lastStored?.fieldOfStudy || 'Computer Science & Engineering',
      startDate: primaryEdu?.startDate || lastStored?.startDate || '2021-08',
      endDate: primaryEdu?.endDate || lastStored?.endDate || '2025-05',
      gpa: primaryEdu?.gpa || lastStored?.gpa || '8.7 / 10 CGPA',
    });

    if (primaryEdu?.institution || lastStored?.institution) {
      setCollegeQuery(primaryEdu?.institution || lastStored?.institution || '');
    }
  }, [isOpen, currentProfile, currentEducation]);

  const templateList = useMemo(() => {
    return Object.entries(STARTER_ROLES).map(([key, item]) => ({ id: key, ...item }));
  }, []);

  const filteredTemplates = useMemo(() => {
    return templateList.filter((item) => {
      const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.data.skills.some((cat) =>
          cat.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      return matchCategory && matchSearch;
    });
  }, [templateList, selectedCategory, searchQuery]);

  const filteredColleges = useMemo(() => {
    if (!collegeQuery.trim() || collegeQuery.length < 2) return [];
    const q = collegeQuery.toLowerCase();
    return ALL_INSTITUTIONS_DIRECTORY.filter(
      (inst) =>
        inst.name.toLowerCase().includes(q) ||
        inst.shortName.toLowerCase().includes(q) ||
        inst.city.toLowerCase().includes(q) ||
        inst.aliases.some((a) => a.toLowerCase().includes(q))
    ).slice(0, 6);
  }, [collegeQuery]);

  if (!isOpen) return null;

  const firstName = userForm.fullName.trim() ? userForm.fullName.trim().split(' ')[0] : 'You';

  const handleApplyTemplate = (roleId: string, cloneToNewSlot = false, rawSample = false) => {
    const role = STARTER_ROLES[roleId];
    if (!role) return;

    if (rawSample || !isPersonalizeEnabled) {
      if (cloneToNewSlot) {
        createSlot(role.label, role.data);
      } else {
        loadStarterRole(roleId, { preserveUserIdentity: false });
      }
    } else {
      const customDetails: Partial<UserBasicIdentity> = {
        fullName: userForm.fullName,
        targetRole: userForm.targetRole || role.data.profile.targetRole,
        email: userForm.email,
        phone: userForm.phone,
        location: userForm.location,
        website: userForm.website,
        linkedin: userForm.linkedin,
        github: userForm.github,
        institution: userForm.institution,
        degree: userForm.degree,
        fieldOfStudy: userForm.fieldOfStudy,
        startDate: userForm.startDate,
        endDate: userForm.endDate,
        gpa: userForm.gpa,
      };

      const personalizedData = generatePersonalizedResume(role.data, customDetails, {
        templateCategory: role.category,
        tailorSummary: true,
      });

      if (cloneToNewSlot) {
        createSlot(`${role.label} (${firstName})`, personalizedData);
      } else {
        loadStarterRole(roleId, { preserveUserIdentity: true, customDetails });
      }
    }

    onClose();
  };

  const categories: CategoryFilter[] = [
    'All', 'Engineering', 'Product & Design', 'Data & AI', 'Business & Finance', 'Entry Level',
  ];

  const CATEGORY_ROLE_TAGS: Record<string, string> = {
    'Engineering': 'SWE',
    'Product & Design': 'PM/Design',
    'Data & AI': 'Data/AI',
    'Business & Finance': 'Biz',
    'Entry Level': 'Entry',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in no-print">
      <div className="bg-white rounded-xl shadow-xl border border-zinc-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center">
              <LayoutTemplate className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-900 tracking-tight">Industry Resume Templates</h2>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Apply industry formatting, role-specific bullets, and ATS-calibrated skill sets.
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

        {/* Main Tab Switcher */}
        <div className="flex items-center gap-6 px-6 border-b border-zinc-100 bg-white">
          <button
            type="button"
            onClick={() => setActiveModalTab('templates')}
            className={`py-2.5 text-xs font-semibold border-b-2 transition flex items-center gap-2 ${
              activeModalTab === 'templates'
                ? 'border-zinc-900 text-zinc-900'
                : 'border-transparent text-zinc-400 hover:text-zinc-700'
            }`}
          >
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span>Role Starter Templates ({templateList.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveModalTab('themes')}
            className={`py-2.5 text-xs font-semibold border-b-2 transition flex items-center gap-2 ${
              activeModalTab === 'themes'
                ? 'border-zinc-900 text-zinc-900'
                : 'border-transparent text-zinc-400 hover:text-zinc-700'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>PDF Export Themes (4 Presets)</span>
          </button>
        </div>

        {activeModalTab === 'templates' ? (
          <>
            {/* Identity Info Bar */}
            <div className="bg-zinc-50 border-b border-zinc-100 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-zinc-600">
                <User className="w-3.5 h-3.5 text-zinc-400" />
                <span>
                  Applying for: <strong className="text-zinc-800">{userForm.fullName || 'Current Profile'}</strong>
                  {userForm.institution ? ` · ${userForm.institution}` : ''}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Personalize toggle */}
                <button
                  type="button"
                  onClick={() => setIsPersonalizeEnabled(!isPersonalizeEnabled)}
                  className={`flex items-center gap-1.5 text-xs font-medium transition ${
                    isPersonalizeEnabled ? 'text-zinc-800' : 'text-zinc-400'
                  }`}
                >
                  <div className={`relative w-7 h-4 rounded-full transition-colors ${isPersonalizeEnabled ? 'bg-zinc-900' : 'bg-zinc-200'}`}>
                    <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-all ${isPersonalizeEnabled ? 'left-3.5' : 'left-0.5'}`} />
                  </div>
                  <Sparkles className="w-3 h-3" />
                  AI Personalize
                </button>

                <button
                  type="button"
                  onClick={() => setIsDetailEditorOpen(!isDetailEditorOpen)}
                  className="text-xs font-medium text-zinc-500 hover:text-zinc-800 flex items-center gap-1 transition"
                >
                  <Edit3 className="w-3 h-3" />
                  {isDetailEditorOpen ? 'Close' : 'Edit My Details'}
                </button>
              </div>
            </div>

            {/* Detail Editor Drawer */}
            {isDetailEditorOpen && (
              <div className="bg-zinc-50 border-b border-zinc-100 p-5">
                <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-3">My Details</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Full Name', key: 'fullName', placeholder: 'e.g. Roshan Kumar' },
                    { label: 'Target Role', key: 'targetRole', placeholder: 'e.g. Full Stack Developer' },
                    { label: 'Email', key: 'email', placeholder: 'user@gmail.com' },
                    { label: 'Phone', key: 'phone', placeholder: '+91 98765 43210' },
                    { label: 'Location', key: 'location', placeholder: 'Hyderabad, India' },
                    { label: 'Degree', key: 'degree', placeholder: 'B.Tech Computer Science' },
                    { label: 'CGPA / Score', key: 'gpa', placeholder: '8.8 / 10 CGPA' },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-[11px] font-semibold text-zinc-500 mb-1">{field.label}</label>
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        value={(userForm as unknown as Record<string, string>)[field.key] || ''}
                        onChange={(e) =>
                          setUserForm((prev) => ({ ...prev, [field.key]: e.target.value }))
                        }
                        className="w-full text-xs p-2 bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
                      />
                    </div>
                  ))}

                  <div className="relative">
                    <label className="block text-[11px] font-semibold text-zinc-500 mb-1">
                      College / Institution
                    </label>
                    <input
                      type="text"
                      placeholder="Type college name..."
                      value={collegeQuery}
                      onChange={(e) => {
                        setCollegeQuery(e.target.value);
                        setUserForm((prev) => ({ ...prev, institution: e.target.value }));
                        setShowCollegeDropdown(true);
                      }}
                      onFocus={() => setShowCollegeDropdown(true)}
                      className="w-full text-xs p-2 bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
                    />
                    {showCollegeDropdown && filteredColleges.length > 0 && (
                      <div className="absolute top-full left-0 right-0 z-30 mt-1 bg-white border border-zinc-200 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                        {filteredColleges.map((inst) => (
                          <button
                            key={inst.name}
                            type="button"
                            onClick={() => {
                              setUserForm((prev) => ({ ...prev, institution: inst.name, location: `${inst.city}, ${inst.state}, India` }));
                              setCollegeQuery(inst.name);
                              setShowCollegeDropdown(false);
                            }}
                            className="w-full text-left px-3 py-1.5 text-xs text-zinc-700 hover:bg-zinc-100 transition truncate"
                          >
                            {inst.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Filter and Search Bar */}
            <div className="px-6 py-3 border-b border-zinc-100 flex flex-wrap items-center justify-between gap-3 bg-white">
              <div className="flex flex-wrap items-center gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-zinc-900 text-white'
                        : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-56">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search roles, skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/20 focus:border-zinc-400 transition placeholder:text-zinc-400"
                />
              </div>
            </div>

            {/* Template Grid */}
            <div className="flex-1 overflow-y-auto p-6 bg-zinc-50/30">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTemplates.map((template) => {
                  const engineMode = template.data.templateConfig.engineMode;
                  const accentColor = template.data.templateConfig.accentColor;
                  const topSkills = template.data.skills.flatMap((c) => c.skills).slice(0, 4);
                  const roleTag = CATEGORY_ROLE_TAGS[template.category] || template.category;

                  return (
                    <div
                      key={template.id}
                      className="bg-white rounded-xl border border-zinc-200 hover:border-zinc-400 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                    >
                      {/* Card Top */}
                      <div className="p-4 border-b border-zinc-100">
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200">
                              {roleTag}
                            </span>
                            <span className="text-[10px] text-zinc-400 font-medium capitalize">
                              {engineMode === 'modern_clean' ? 'Modern' : 'ATS Classic'}
                            </span>
                          </div>
                          <span
                            className="w-3 h-3 rounded-full ring-1 ring-black/10 shadow-xs shrink-0"
                            style={{ backgroundColor: accentColor }}
                            title={`Theme: ${accentColor}`}
                          />
                        </div>

                        <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-zinc-700 transition-colors leading-snug">
                          {template.label}
                        </h3>
                        <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2 leading-snug">
                          {template.description}
                        </p>
                      </div>

                      {/* Card Middle: Skills */}
                      <div className="p-4 flex-1">
                        <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                          Key Skills
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {topSkills.map((sk) => (
                            <span
                              key={sk}
                              className="px-2 py-0.5 text-[10px] font-medium bg-zinc-100 text-zinc-600 rounded-md border border-zinc-200/60"
                            >
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer: Actions */}
                      <div className="p-3 border-t border-zinc-100 flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleApplyTemplate(template.id, false, false)}
                            className="flex-1 py-2 px-3 bg-zinc-900 hover:bg-black text-white rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5"
                          >
                            Use Template
                          </button>
                          <button
                            type="button"
                            onClick={() => handleApplyTemplate(template.id, true, false)}
                            className="py-2 px-2.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border border-zinc-200 rounded-lg text-xs font-medium transition"
                            title="Duplicate into a new resume slot"
                          >
                            + New Slot
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleApplyTemplate(template.id, false, true)}
                          className="w-full text-center text-[10px] font-medium text-zinc-400 hover:text-zinc-600 py-0.5 transition"
                        >
                          Load with sample info
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          /* PDF Export Visual Themes Tab */
          <div className="flex-1 overflow-y-auto p-6 bg-zinc-50/40 space-y-4">
            <div className="max-w-xl">
              <h3 className="text-xs font-semibold text-zinc-900 tracking-tight">Visual Polish &amp; Export Themes</h3>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Apply pre-calibrated typography stacks, accent palettes, and line densities with 1 click.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PDF_EXPORT_THEMES.map((theme) => {
                const isCurrentlyActive =
                  currentAccent?.toLowerCase() === theme.accentColor.toLowerCase() &&
                  currentFont === theme.fontFamily &&
                  currentSpacing === theme.spacingPreset;

                return (
                  <div
                    key={theme.id}
                    className="p-5 bg-white rounded-xl border border-zinc-200 hover:border-zinc-400 transition-all flex flex-col justify-between shadow-2xs hover:shadow-md space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200/80">
                          {theme.badge}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-4 h-4 rounded-full border border-black/10 shadow-2xs"
                            style={{ backgroundColor: theme.colorHex }}
                          />
                          <span className="font-mono text-[11px] text-zinc-400">{theme.colorHex}</span>
                        </div>
                      </div>

                      <h4 className="text-sm font-semibold text-zinc-900">{theme.name}</h4>
                      <p className="text-xs font-medium text-zinc-500 mt-0.5">{theme.tagline}</p>
                      <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed">{theme.description}</p>

                      <div className="mt-3.5 flex flex-wrap items-center gap-2 text-[11px]">
                        <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 font-mono">
                          Font: <strong>{theme.fontLabel}</strong>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 font-mono">
                          Spacing: <strong>{theme.spacingLabel}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-zinc-100">
                      <button
                        type="button"
                        onClick={() => {
                          setAccentColor(theme.accentColor);
                          setFontFamily(theme.fontFamily);
                          setSpacingPreset(theme.spacingPreset);
                          setAppliedThemeId(theme.id);
                          setTimeout(() => setAppliedThemeId(null), 2500);
                        }}
                        className={`w-full py-2 px-3 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
                          isCurrentlyActive
                            ? 'bg-emerald-600 text-white'
                            : 'bg-zinc-900 hover:bg-black text-white'
                        }`}
                      >
                        {isCurrentlyActive ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5" />
                            Active Theme
                          </>
                        ) : appliedThemeId === theme.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            Applied!
                          </>
                        ) : (
                          'Apply This Theme'
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-white border-t border-zinc-100 px-6 py-3 flex items-center justify-between">
          <span className="text-[11px] text-zinc-400">
            Themes instantly customize fonts, spacing, and accent palettes on the live resume canvas.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-900 hover:bg-black text-white font-semibold rounded-lg text-xs transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

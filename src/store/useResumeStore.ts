/**
 * Dual-Engine Single-Page Resume Builder
 * Zustand Store Implementation (Phase 1 & 2)
 *
 * Handles deep CRUD, dynamic bullet mutation, drag-and-drop array reordering,
 * localStorage auto-save, multi-resume slots, and template configs.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
  ResumeData,
  ProfileContact,
  WorkExperience,
  ProjectItem,
  SkillCategory,
  EducationItem,
  CustomSection,
  SectionId,
  EngineMode,
  PageSize,
  FontFamilyOption,
  SpacingPreset,
  ScaleLevel,
  TemplateConfig,
  JobDescriptionState,
} from '../types/resume';
import { STARTER_ROLES } from './starterTemplates';
import { createEmptyResume, validateAndSanitizeResume } from '../schema/resume.schema';
import {
  generatePersonalizedResume,
  saveLastUsedIdentity,
  getLastUsedIdentity,
  UserBasicIdentity,
} from '../utils/aiTemplatePersonalizer';

// Helper: Generates unique collision-free ID for newly created items
const generateId = (prefix = 'item'): string =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`;

export interface ResumeSlot {
  id: string;
  name: string;
  updatedAt: string;
  data: ResumeData;
}

export interface ResumeStoreState extends ResumeData {
  // History State for Undo / Redo
  _history: ResumeData[];
  _historyIndex: number;

  // Multi-Resume Slots
  slots: ResumeSlot[];
  activeSlotId: string;
  createSlot: (name: string, roleKeyOrData?: string | ResumeData) => void;
  switchSlot: (slotId: string) => void;
  renameSlot: (slotId: string, newName: string) => void;
  cloneCurrentSlot: (newName: string) => void;
  deleteSlot: (slotId: string) => void;

  // 1. Profile Actions
  updateProfile: (fields: Partial<ProfileContact>) => void;

  // 2. Section Ordering & Visibility Actions
  reorderSections: (newOrder: SectionId[]) => void;
  toggleSectionVisibility: (id: SectionId) => void;
  setSectionCustomTitle: (id: SectionId, title: string) => void;

  // 3. Work Experience CRUD
  addExperience: (item?: Partial<WorkExperience>) => void;
  updateExperience: (id: string, item: Partial<WorkExperience>) => void;
  removeExperience: (id: string) => void;
  reorderExperience: (fromIndex: number, toIndex: number) => void;

  // 4. Experience Bullets CRUD
  addExperienceBullet: (experienceId: string, text?: string) => void;
  updateExperienceBullet: (experienceId: string, bulletId: string, text: string) => void;
  removeExperienceBullet: (experienceId: string, bulletId: string) => void;
  reorderExperienceBullets: (experienceId: string, fromIndex: number, toIndex: number) => void;

  // 5. Projects CRUD
  addProject: (item?: Partial<ProjectItem>) => void;
  updateProject: (id: string, item: Partial<ProjectItem>) => void;
  removeProject: (id: string) => void;
  reorderProjects: (fromIndex: number, toIndex: number) => void;

  // 6. Project Bullets CRUD
  addProjectBullet: (projectId: string, text?: string) => void;
  updateProjectBullet: (projectId: string, bulletId: string, text: string) => void;
  removeProjectBullet: (projectId: string, bulletId: string) => void;

  // 7. Skills CRUD
  addSkillCategory: (categoryName?: string, skills?: string[]) => void;
  updateSkillCategoryName: (id: string, name: string) => void;
  removeSkillCategory: (id: string) => void;
  addSkillToCategory: (categoryId: string, skill: string) => void;
  removeSkillFromCategory: (categoryId: string, skillIndex: number) => void;
  updateSkillInCategory: (categoryId: string, skillIndex: number, newSkill: string) => void;

  // 8. Education CRUD
  addEducation: (item?: Partial<EducationItem>) => void;
  updateEducation: (id: string, item: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;
  reorderEducation: (fromIndex: number, toIndex: number) => void;

  // 9. Custom Sections CRUD
  addCustomSection: (title?: string) => void;
  updateCustomSectionTitle: (sectionId: string, title: string) => void;
  removeCustomSection: (sectionId: string) => void;
  addCustomSectionItem: (sectionId: string) => void;
  updateCustomSectionItem: (sectionId: string, itemId: string, item: Partial<CustomSection['items'][0]>) => void;
  removeCustomSectionItem: (sectionId: string, itemId: string) => void;

  // 10. Template & Engine Settings
  setEngineMode: (mode: EngineMode) => void;
  setPageSize: (size: PageSize) => void;
  setFontFamily: (font: FontFamilyOption) => void;
  setAccentColor: (color: string) => void;
  setSpacingPreset: (preset: SpacingPreset) => void;
  setAutoFitEnabled: (enabled: boolean) => void;
  setScaleLevel: (level: ScaleLevel) => void;
  updateTemplateConfig: (fields: Partial<TemplateConfig>) => void;

  // 11. Job Description & ATS Actions
  setJobDescription: (rawText: string, role?: string, company?: string) => void;
  setJDAnalysis: (analysis: Partial<JobDescriptionState>) => void;

  // 12. Starter Template, Import, Reset, Undo/Redo
  loadStarterRole: (
    roleKey: string,
    options?: {
      preserveUserIdentity?: boolean;
      customDetails?: Partial<UserBasicIdentity>;
    }
  ) => void;
  importJSON: (
    jsonPayload: unknown,
    options?: { createNewSlot?: boolean; slotName?: string }
  ) => { success: boolean; errors?: string[] };
  resetResume: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  // 13. JD Tailoring Mode
  tailoringModeActive: boolean;
  setTailoringMode: (active: boolean) => void;

  // 14. Version History Snapshots (session-only)
  versionSnapshots: Array<{ ts: string; atsScore: number; data: ResumeData }>;
  saveVersionSnapshot: (atsScore: number) => void;
  restoreVersionSnapshot: (index: number) => void;
}

const initialDefaultData = STARTER_ROLES.software_engineer.data;
const defaultSlotId = 'slot-default-1';

const initialSlots: ResumeSlot[] = [
  {
    id: defaultSlotId,
    name: 'Full-Stack Software Engineer',
    updatedAt: new Date().toISOString(),
    data: initialDefaultData,
  },
  {
    id: 'slot-pm-2',
    name: 'Lead Product Manager',
    updatedAt: new Date().toISOString(),
    data: STARTER_ROLES.product_manager.data,
  },
];

// Extracts pure resume data from store state
function extractResumeData(state: ResumeStoreState): ResumeData {
  return {
    version: state.version,
    profile: state.profile,
    experience: state.experience,
    projects: state.projects,
    skills: state.skills,
    education: state.education,
    customSections: state.customSections,
    sectionConfig: state.sectionConfig,
    templateConfig: state.templateConfig,
    jdState: state.jdState,
  };
}

export const useResumeStore = create<ResumeStoreState>()(
  persist(
    (set, get) => ({
      ...initialDefaultData,
      _history: [initialDefaultData],
      _historyIndex: 0,
      slots: initialSlots,
      activeSlotId: defaultSlotId,

      // Multi-Resume Slot Actions
      createSlot: (name, roleKeyOrData) => {
        const state = get();
        const currentData = extractResumeData(state);
        let templateData: ResumeData = currentData;
        if (typeof roleKeyOrData === 'string' && STARTER_ROLES[roleKeyOrData]) {
          templateData = STARTER_ROLES[roleKeyOrData].data;
        } else if (typeof roleKeyOrData === 'object' && roleKeyOrData !== null) {
          templateData = roleKeyOrData;
        }
        const newSlotId = generateId('slot');

        const updatedSlots: ResumeSlot[] = [
          ...state.slots.map((s) => (s.id === state.activeSlotId ? { ...s, data: currentData, updatedAt: new Date().toISOString() } : s)),
          {
            id: newSlotId,
            name,
            updatedAt: new Date().toISOString(),
            data: templateData,
          },
        ];

        set({
          ...templateData,
          slots: updatedSlots,
          activeSlotId: newSlotId,
        });
      },

      switchSlot: (slotId) => {
        const state = get();
        if (slotId === state.activeSlotId) return;

        const currentData = extractResumeData(state);
        const targetSlot = state.slots.find((s) => s.id === slotId);
        if (!targetSlot) return;

        const updatedSlots = state.slots.map((s) =>
          s.id === state.activeSlotId ? { ...s, data: currentData, updatedAt: new Date().toISOString() } : s
        );

        set({
          ...targetSlot.data,
          slots: updatedSlots,
          activeSlotId: slotId,
        });
      },

      renameSlot: (slotId, newName) => {
        set((state) => ({
          slots: state.slots.map((s) => (s.id === slotId ? { ...s, name: newName, updatedAt: new Date().toISOString() } : s)),
        }));
      },

      cloneCurrentSlot: (newName) => {
        const state = get();
        const currentData = extractResumeData(state);
        const newSlotId = generateId('slot');

        // Persist any active unsaved in-memory edits to the current source slot
        const updatedSlots = state.slots.map((s) =>
          s.id === state.activeSlotId
            ? { ...s, data: currentData, updatedAt: new Date().toISOString() }
            : s
        );

        const newSlot: ResumeSlot = {
          id: newSlotId,
          name: newName,
          updatedAt: new Date().toISOString(),
          data: currentData,
        };

        set({
          slots: [...updatedSlots, newSlot],
          activeSlotId: newSlotId,
        });
      },

      deleteSlot: (slotId) => {
        const state = get();
        if (state.slots.length <= 1) return; // Keep at least one slot

        const filtered = state.slots.filter((s) => s.id !== slotId);
        const nextActive = state.activeSlotId === slotId ? filtered[0] : null;

        if (nextActive) {
          set({
            ...nextActive.data,
            slots: filtered,
            activeSlotId: nextActive.id,
          });
        } else {
          set({ slots: filtered });
        }
      },

      // 1. Profile Actions
      updateProfile: (fields) =>
        set((state) => {
          const updated = { ...state.profile, ...fields };
          saveLastUsedIdentity(updated, state.education);
          return { profile: updated };
        }),

      // 2. Section Ordering & Visibility Actions
      reorderSections: (newOrder) =>
        set((state) => ({
          sectionConfig: {
            ...state.sectionConfig,
            order: newOrder,
          },
        })),

      toggleSectionVisibility: (id) =>
        set((state) => ({
          sectionConfig: {
            ...state.sectionConfig,
            visibility: {
              ...state.sectionConfig.visibility,
              [id]: !state.sectionConfig.visibility[id],
            },
          },
        })),

      setSectionCustomTitle: (id, title) =>
        set((state) => ({
          sectionConfig: {
            ...state.sectionConfig,
            customTitles: {
              ...state.sectionConfig.customTitles,
              [id]: title,
            },
          },
        })),

      // 3. Work Experience CRUD
      addExperience: (item) =>
        set((state) => {
          const newItem: WorkExperience = {
            id: generateId('exp'),
            company: item?.company || '',
            position: item?.position || '',
            location: item?.location || '',
            startDate: item?.startDate || '',
            endDate: item?.endDate || 'Present',
            isCurrent: item?.isCurrent ?? true,
            bullets: item?.bullets || [
              { id: generateId('bullet'), text: '' },
            ],
          };
          return { experience: [newItem, ...state.experience] };
        }),

      updateExperience: (id, item) =>
        set((state) => ({
          experience: state.experience.map((exp) =>
            exp.id === id ? { ...exp, ...item } : exp
          ),
        })),

      removeExperience: (id) =>
        set((state) => ({
          experience: state.experience.filter((exp) => exp.id !== id),
        })),

      reorderExperience: (fromIndex, toIndex) =>
        set((state) => {
          const updated = [...state.experience];
          const [moved] = updated.splice(fromIndex, 1);
          updated.splice(toIndex, 0, moved);
          return { experience: updated };
        }),

      // 4. Experience Bullets CRUD
      addExperienceBullet: (experienceId, text = '') =>
        set((state) => ({
          experience: state.experience.map((exp) =>
            exp.id === experienceId
              ? {
                  ...exp,
                  bullets: [...exp.bullets, { id: generateId('bullet'), text }],
                }
              : exp
          ),
        })),

      updateExperienceBullet: (experienceId, bulletId, text) =>
        set((state) => ({
          experience: state.experience.map((exp) =>
            exp.id === experienceId
              ? {
                  ...exp,
                  bullets: exp.bullets.map((b) =>
                    b.id === bulletId ? { ...b, text } : b
                  ),
                }
              : exp
          ),
        })),

      removeExperienceBullet: (experienceId, bulletId) =>
        set((state) => ({
          experience: state.experience.map((exp) =>
            exp.id === experienceId
              ? {
                  ...exp,
                  bullets: exp.bullets.filter((b) => b.id !== bulletId),
                }
              : exp
          ),
        })),

      reorderExperienceBullets: (experienceId, fromIndex, toIndex) =>
        set((state) => ({
          experience: state.experience.map((exp) => {
            if (exp.id !== experienceId) return exp;
            const updated = [...exp.bullets];
            const [moved] = updated.splice(fromIndex, 1);
            updated.splice(toIndex, 0, moved);
            return { ...exp, bullets: updated };
          }),
        })),

      // 5. Projects CRUD
      addProject: (item) =>
        set((state) => {
          const newItem: ProjectItem = {
            id: generateId('proj'),
            name: item?.name || '',
            role: item?.role || '',
            summary: item?.summary || '',
            technologies: item?.technologies || [],
            url: item?.url || '',
            repoUrl: item?.repoUrl || '',
            bullets: item?.bullets || [{ id: generateId('bullet'), text: '' }],
          };
          return { projects: [newItem, ...state.projects] };
        }),

      updateProject: (id, item) =>
        set((state) => ({
          projects: state.projects.map((proj) =>
            proj.id === id ? { ...proj, ...item } : proj
          ),
        })),

      removeProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((proj) => proj.id !== id),
        })),

      reorderProjects: (fromIndex, toIndex) =>
        set((state) => {
          const updated = [...state.projects];
          const [moved] = updated.splice(fromIndex, 1);
          updated.splice(toIndex, 0, moved);
          return { projects: updated };
        }),

      // 6. Project Bullets CRUD
      addProjectBullet: (projectId, text = '') =>
        set((state) => ({
          projects: state.projects.map((proj) =>
            proj.id === projectId
              ? {
                  ...proj,
                  bullets: [...proj.bullets, { id: generateId('bullet'), text }],
                }
              : proj
          ),
        })),

      updateProjectBullet: (projectId, bulletId, text) =>
        set((state) => ({
          projects: state.projects.map((proj) =>
            proj.id === projectId
              ? {
                  ...proj,
                  bullets: proj.bullets.map((b) =>
                    b.id === bulletId ? { ...b, text } : b
                  ),
                }
              : proj
          ),
        })),

      removeProjectBullet: (projectId, bulletId) =>
        set((state) => ({
          projects: state.projects.map((proj) =>
            proj.id === projectId
              ? {
                  ...proj,
                  bullets: proj.bullets.filter((b) => b.id !== bulletId),
                }
              : proj
          ),
        })),

      // 7. Skills CRUD
      addSkillCategory: (categoryName = 'New Skill Category', initialSkills = []) =>
        set((state) => ({
          skills: [
            ...state.skills,
            { id: generateId('skill-cat'), categoryName, skills: initialSkills },
          ],
        })),

      updateSkillCategoryName: (id, name) =>
        set((state) => ({
          skills: state.skills.map((cat) =>
            cat.id === id ? { ...cat, categoryName: name } : cat
          ),
        })),

      removeSkillCategory: (id) =>
        set((state) => ({
          skills: state.skills.filter((cat) => cat.id !== id),
        })),

      addSkillToCategory: (categoryId, skill) => {
        const trimmed = skill.trim();
        if (!trimmed) return;
        set((state) => ({
          skills: state.skills.map((cat) =>
            cat.id === categoryId && !cat.skills.includes(trimmed)
              ? { ...cat, skills: [...cat.skills, trimmed] }
              : cat
          ),
        }));
      },

      removeSkillFromCategory: (categoryId, skillIndex) =>
        set((state) => ({
          skills: state.skills.map((cat) =>
            cat.id === categoryId
              ? { ...cat, skills: cat.skills.filter((_, i) => i !== skillIndex) }
              : cat
          ),
        })),

      updateSkillInCategory: (categoryId, skillIndex, newSkill) => {
        const trimmed = newSkill.trim();
        if (!trimmed) return;
        set((state) => ({
          skills: state.skills.map((cat) =>
            cat.id === categoryId
              ? {
                  ...cat,
                  skills: cat.skills.map((s, i) => (i === skillIndex ? trimmed : s)),
                }
              : cat
          ),
        }));
      },

      // 8. Education CRUD
      addEducation: (item) =>
        set((state) => {
          const newItem: EducationItem = {
            id: generateId('edu'),
            institution: item?.institution || '',
            degree: item?.degree || '',
            fieldOfStudy: item?.fieldOfStudy || '',
            location: item?.location || '',
            startDate: item?.startDate || '',
            endDate: item?.endDate || '',
            gpa: item?.gpa || '',
            honors: item?.honors || '',
            coursework: item?.coursework || [],
          };
          return { education: [...state.education, newItem] };
        }),

      updateEducation: (id, item) =>
        set((state) => {
          const updated = state.education.map((edu) =>
            edu.id === id ? { ...edu, ...item } : edu
          );
          saveLastUsedIdentity(state.profile, updated);
          return { education: updated };
        }),

      removeEducation: (id) =>
        set((state) => ({
          education: state.education.filter((edu) => edu.id !== id),
        })),

      reorderEducation: (fromIndex, toIndex) =>
        set((state) => {
          const updated = [...state.education];
          const [moved] = updated.splice(fromIndex, 1);
          updated.splice(toIndex, 0, moved);
          return { education: updated };
        }),

      // 9. Custom Sections CRUD
      addCustomSection: (title = 'Certifications & Honors') =>
        set((state) => ({
          customSections: [
            ...state.customSections,
            { id: generateId('csec'), sectionTitle: title, items: [] },
          ],
        })),

      updateCustomSectionTitle: (sectionId, title) =>
        set((state) => ({
          customSections: state.customSections.map((sec) =>
            sec.id === sectionId ? { ...sec, sectionTitle: title } : sec
          ),
        })),

      removeCustomSection: (sectionId) =>
        set((state) => ({
          customSections: state.customSections.filter((sec) => sec.id !== sectionId),
        })),

      addCustomSectionItem: (sectionId) =>
        set((state) => ({
          customSections: state.customSections.map((sec) =>
            sec.id === sectionId
              ? {
                  ...sec,
                  items: [
                    ...sec.items,
                    { id: generateId('citem'), title: '', description: '' },
                  ],
                }
              : sec
          ),
        })),

      updateCustomSectionItem: (sectionId, itemId, item) =>
        set((state) => ({
          customSections: state.customSections.map((sec) =>
            sec.id === sectionId
              ? {
                  ...sec,
                  items: sec.items.map((it) =>
                    it.id === itemId ? { ...it, ...item } : it
                  ),
                }
              : sec
          ),
        })),

      removeCustomSectionItem: (sectionId, itemId) =>
        set((state) => ({
          customSections: state.customSections.map((sec) =>
            sec.id === sectionId
              ? {
                  ...sec,
                  items: sec.items.filter((it) => it.id !== itemId),
                }
              : sec
          ),
        })),

      // 10. Template & Engine Settings
      setEngineMode: (engineMode) =>
        set((state) => ({
          templateConfig: {
            ...state.templateConfig,
            engineMode,
            showIcons: engineMode === 'modern_clean',
            showPhoto: engineMode === 'modern_clean',
          },
        })),

      setPageSize: (pageSize) =>
        set((state) => ({
          templateConfig: { ...state.templateConfig, pageSize },
        })),

      setFontFamily: (fontFamily) =>
        set((state) => ({
          templateConfig: { ...state.templateConfig, fontFamily },
        })),

      setAccentColor: (accentColor) =>
        set((state) => ({
          templateConfig: { ...state.templateConfig, accentColor },
        })),

      setSpacingPreset: (spacingPreset) =>
        set((state) => ({
          templateConfig: { ...state.templateConfig, spacingPreset },
        })),

      setAutoFitEnabled: (autoFitEnabled) =>
        set((state) => ({
          templateConfig: { ...state.templateConfig, autoFitEnabled },
        })),

      setScaleLevel: (scaleLevel) =>
        set((state) => ({
          templateConfig: { ...state.templateConfig, scaleLevel },
        })),

      updateTemplateConfig: (fields) =>
        set((state) => ({
          templateConfig: { ...state.templateConfig, ...fields },
        })),

      // 11. Job Description & ATS Actions
      setJobDescription: (rawText, role = '', company = '') =>
        set((state) => ({
          jdState: {
            rawText,
            targetRole: role,
            targetCompany: company,
            extractedKeywords: state.jdState?.extractedKeywords || [],
            matchScore: state.jdState?.matchScore || 0,
            lastAnalyzedAt: new Date().toISOString(),
          },
        })),

      setJDAnalysis: (analysis) =>
        set((state) => ({
          jdState: state.jdState
            ? { ...state.jdState, ...analysis }
            : {
                rawText: '',
                targetRole: '',
                extractedKeywords: [],
                matchScore: 0,
                ...analysis,
              },
        })),

      // 12. Starter Template, Import, Reset, Undo/Redo
      loadStarterRole: (roleKey, options) => {
        const starter = STARTER_ROLES[roleKey];
        if (starter) {
          let dataToLoad = starter.data;
          const shouldPreserve = options?.preserveUserIdentity !== false;

          if (shouldPreserve) {
            const currentProfile = get().profile;
            const currentEducation = get().education;
            const lastStoredIdentity = getLastUsedIdentity();

            const effectiveIdentity: Partial<UserBasicIdentity> = {
              fullName: options?.customDetails?.fullName || currentProfile?.fullName || lastStoredIdentity?.fullName,
              targetRole: options?.customDetails?.targetRole || currentProfile?.targetRole || lastStoredIdentity?.targetRole,
              email: options?.customDetails?.email || currentProfile?.email || lastStoredIdentity?.email,
              phone: options?.customDetails?.phone || currentProfile?.phone || lastStoredIdentity?.phone,
              location: options?.customDetails?.location || currentProfile?.location || lastStoredIdentity?.location,
              website: options?.customDetails?.website || currentProfile?.website || lastStoredIdentity?.website,
              linkedin: options?.customDetails?.linkedin || currentProfile?.linkedin || lastStoredIdentity?.linkedin,
              github: options?.customDetails?.github || currentProfile?.github || lastStoredIdentity?.github,
              institution: options?.customDetails?.institution || currentEducation[0]?.institution || lastStoredIdentity?.institution,
              degree: options?.customDetails?.degree || currentEducation[0]?.degree || lastStoredIdentity?.degree,
              fieldOfStudy: options?.customDetails?.fieldOfStudy || currentEducation[0]?.fieldOfStudy || lastStoredIdentity?.fieldOfStudy,
              startDate: options?.customDetails?.startDate || currentEducation[0]?.startDate || lastStoredIdentity?.startDate,
              endDate: options?.customDetails?.endDate || currentEducation[0]?.endDate || lastStoredIdentity?.endDate,
              gpa: options?.customDetails?.gpa || currentEducation[0]?.gpa || lastStoredIdentity?.gpa,
            };

            // If we have at least a name or institution, personalize the template
            if (effectiveIdentity.fullName?.trim() || effectiveIdentity.institution?.trim()) {
              dataToLoad = generatePersonalizedResume(starter.data, effectiveIdentity, {
                templateCategory: starter.category,
                tailorSummary: true,
              });
            }
          }

          set({
            ...dataToLoad,
          });
        }
      },

      importJSON: (jsonPayload, options) => {
        const validation = validateAndSanitizeResume(jsonPayload);
        if (validation.success) {
          const state = get();
          const currentData = extractResumeData(state);

          // Save current work to active slot
          let updatedSlots = state.slots.map((s) =>
            s.id === state.activeSlotId
              ? { ...s, data: currentData, updatedAt: new Date().toISOString() }
              : s
          );

          let targetSlotId = state.activeSlotId;

          // If createNewSlot requested, or if active slot already has meaningful data
          const hasExistingWork =
            state.profile.fullName.trim() || state.experience.length > 0 || state.projects.length > 0;
          const shouldCreateSlot = options?.createNewSlot || false;

          if (shouldCreateSlot) {
            const newSlotId = generateId('slot');
            const candidateName = validation.data.profile?.fullName?.trim();
            const slotName =
              options?.slotName ||
              (candidateName ? `${candidateName}'s Resume` : `Imported Resume #${state.slots.length + 1}`);

            const newSlot: ResumeSlot = {
              id: newSlotId,
              name: slotName,
              updatedAt: new Date().toISOString(),
              data: validation.data,
            };
            updatedSlots = [...updatedSlots, newSlot];
            targetSlotId = newSlotId;
          } else {
            updatedSlots = updatedSlots.map((s) =>
              s.id === state.activeSlotId
                ? { ...s, data: validation.data, updatedAt: new Date().toISOString() }
                : s
            );
          }

          set({
            ...validation.data,
            slots: updatedSlots,
            activeSlotId: targetSlotId,
          });
          return { success: true };
        }
        return { success: false, errors: validation.errors };
      },

      resetResume: () => {
        set({
          ...createEmptyResume(),
        });
      },

      undo: () => {
        const { _history, _historyIndex } = get();
        if (_historyIndex > 0) {
          const nextIndex = _historyIndex - 1;
          const target = _history[nextIndex];
          set({
            ...target,
            _historyIndex: nextIndex,
          });
        }
      },

      redo: () => {
        const { _history, _historyIndex } = get();
        if (_historyIndex < _history.length - 1) {
          const nextIndex = _historyIndex + 1;
          const target = _history[nextIndex];
          set({
            ...target,
            _historyIndex: nextIndex,
          });
        }
      },

      canUndo: () => get()._historyIndex > 0,
      canRedo: () => get()._historyIndex < get()._history.length - 1,

      // 13. JD Tailoring Mode
      tailoringModeActive: false,
      setTailoringMode: (active) => set({ tailoringModeActive: active }),

      // 14. Version History Snapshots
      versionSnapshots: [],
      saveVersionSnapshot: (atsScore) => {
        const state = get();
        const snapshot = {
          ts: new Date().toISOString(),
          atsScore,
          data: extractResumeData(state),
        };
        const existing = state.versionSnapshots;
        // Keep last 10 snapshots
        const updated = [...existing, snapshot].slice(-10);
        set({ versionSnapshots: updated });
      },
      restoreVersionSnapshot: (index) => {
        const snapshot = get().versionSnapshots[index];
        if (snapshot) {
          set({ ...snapshot.data });
        }
      },
    }),
    {
      name: 'dual-engine-resume-storage',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? window.localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
      partialize: (state) => {
        const { _history, _historyIndex, versionSnapshots, tailoringModeActive, ...persisted } = state;
        return persisted;
      },
    }
  )
);

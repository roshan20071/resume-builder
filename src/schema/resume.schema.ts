/**
 * Dual-Engine Single-Page Resume Builder
 * Zod Validation Schemas & Data Sanitizers (Phase 1)
 */

import { z } from 'zod';
import type { ResumeData } from '../types/resume';

// 1. Core Primitives & Item Schemas
export const BulletPointSchema = z.object({
  id: z.string().min(1, 'Bullet ID is required'),
  text: z.string().default(''),
  score: z.number().min(0).max(100).optional(),
  hasActionVerb: z.boolean().optional(),
  hasMetric: z.boolean().optional(),
  feedback: z.array(z.string()).optional(),
});

export const WorkExperienceSchema = z.object({
  id: z.string().min(1, 'Experience ID is required'),
  company: z.string().default(''),
  position: z.string().default(''),
  location: z.string().default(''),
  startDate: z.string().default(''),
  endDate: z.string().default(''),
  isCurrent: z.boolean().default(false),
  bullets: z.array(BulletPointSchema).default([]),
});

export const ProjectItemSchema = z.object({
  id: z.string().min(1, 'Project ID is required'),
  name: z.string().default(''),
  role: z.string().optional(),
  summary: z.string().optional(),
  technologies: z.array(z.string()).default([]),
  url: z.string().url().or(z.literal('')).optional(),
  repoUrl: z.string().url().or(z.literal('')).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  bullets: z.array(BulletPointSchema).default([]),
});

export const SkillCategorySchema = z.object({
  id: z.string().min(1, 'Skill Category ID is required'),
  categoryName: z.string().default(''),
  skills: z.array(z.string()).default([]),
});

export const EducationItemSchema = z.object({
  id: z.string().min(1, 'Education ID is required'),
  institution: z.string().default(''),
  degree: z.string().default(''),
  fieldOfStudy: z.string().default(''),
  location: z.string().optional(),
  startDate: z.string().default(''),
  endDate: z.string().default(''),
  gpa: z.string().optional(),
  honors: z.string().optional(),
  coursework: z.array(z.string()).optional(),
});

export const CustomSectionItemSchema = z.object({
  id: z.string().min(1, 'Item ID is required'),
  title: z.string().default(''),
  subtitle: z.string().optional(),
  date: z.string().optional(),
  description: z.string().optional(),
  bullets: z.array(BulletPointSchema).optional(),
});

export const CustomSectionSchema = z.object({
  id: z.string().min(1, 'Section ID is required'),
  sectionTitle: z.string().default('Custom Section'),
  items: z.array(CustomSectionItemSchema).default([]),
});

// 2. Profile Contact Schema
export const ProfileContactSchema = z.object({
  fullName: z.string().default(''),
  targetRole: z.string().default(''),
  email: z.string().email('Invalid email address').or(z.literal('')).default(''),
  phone: z.string().default(''),
  location: z.string().default(''),
  website: z.string().url().or(z.literal('')).optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  portfolioUrl: z.string().optional(),
  summary: z.string().max(600, 'Summary should be concise (max 600 chars)').optional(),
});

// 3. Section & Template Configuration Schemas
export const SectionIdEnum = z.enum([
  'contact',
  'summary',
  'experience',
  'projects',
  'skills',
  'education',
  'certifications',
  'custom',
]);

export const SectionConfigSchema = z.object({
  order: z.array(SectionIdEnum).default([
    'contact',
    'summary',
    'experience',
    'projects',
    'skills',
    'education',
    'custom',
  ]),
  visibility: z.record(SectionIdEnum, z.boolean()).default({
    contact: true,
    summary: true,
    experience: true,
    projects: true,
    skills: true,
    education: true,
    certifications: false,
    custom: false,
  }),
  customTitles: z.record(SectionIdEnum, z.string()).default({}),
});

export const TemplateConfigSchema = z.object({
  engineMode: z.enum(['ats_classic', 'modern_clean']).default('ats_classic'),
  pageSize: z.enum(['A4', 'Letter']).default('A4'),
  fontFamily: z
    .enum(['inter', 'roboto', 'merriweather', 'times', 'arial', 'georgia', 'garamond'])
    .default('inter'),
  accentColor: z.string().regex(/^#([0-9a-fA-F]{3}){1,2}$/, 'Invalid HEX color').default('#2563eb'),
  spacingPreset: z.enum(['compact', 'normal', 'relaxed', 'auto']).default('auto'),
  autoFitEnabled: z.boolean().default(true),
  scaleLevel: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).default(1),
  showIcons: z.boolean().default(false),
  showPhoto: z.boolean().default(false),
});

export const JobDescriptionStateSchema = z.object({
  rawText: z.string().default(''),
  targetRole: z.string().default(''),
  targetCompany: z.string().optional(),
  extractedKeywords: z.array(
    z.object({
      keyword: z.string(),
      category: z.enum(['language', 'framework', 'tool', 'concept', 'soft_skill']),
      matched: z.boolean(),
      frequencyInJD: z.number(),
      countInResume: z.number(),
    })
  ).default([]),
  matchScore: z.number().min(0).max(100).default(0),
  lastAnalyzedAt: z.string().optional(),
});

// 4. Complete Resume Schema
export const ResumeSchema = z.object({
  version: z.string().default('1.0.0'),
  profile: ProfileContactSchema,
  experience: z.array(WorkExperienceSchema).default([]),
  projects: z.array(ProjectItemSchema).default([]),
  skills: z.array(SkillCategorySchema).default([]),
  education: z.array(EducationItemSchema).default([]),
  customSections: z.array(CustomSectionSchema).default([]),
  sectionConfig: SectionConfigSchema,
  templateConfig: TemplateConfigSchema,
  jdState: JobDescriptionStateSchema.optional(),
});

/**
 * Validates and sanitizes unknown JSON inputs (e.g. from user uploads or external tools)
 * Replaces invalid or missing fields with safe default values.
 */
export function validateAndSanitizeResume(input: unknown): {
  success: boolean;
  data: ResumeData;
  errors?: string[];
} {
  const result = ResumeSchema.safeParse(input);

  if (result.success) {
    return {
      success: true,
      data: result.data as ResumeData,
    };
  }

  // Attempt partial recovery using deep merge with default template
  try {
    const rawObj = typeof input === 'object' && input !== null ? (input as Record<string, unknown>) : {};
    const recovered = ResumeSchema.parse({
      version: '1.0.0',
      profile: rawObj.profile || {},
      experience: Array.isArray(rawObj.experience) ? rawObj.experience : [],
      projects: Array.isArray(rawObj.projects) ? rawObj.projects : [],
      skills: Array.isArray(rawObj.skills) ? rawObj.skills : [],
      education: Array.isArray(rawObj.education) ? rawObj.education : [],
      customSections: Array.isArray(rawObj.customSections) ? rawObj.customSections : [],
      sectionConfig: rawObj.sectionConfig || {},
      templateConfig: rawObj.templateConfig || {},
    });

    return {
      success: true,
      data: recovered as ResumeData,
      errors: result.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`),
    };
  } catch (recoveryError) {
    return {
      success: false,
      data: createEmptyResume(),
      errors: result.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`),
    };
  }
}

/**
 * Creates a clean, empty resume structure with safe defaults.
 */
export function createEmptyResume(): ResumeData {
  return {
    version: '1.0.0',
    profile: {
      fullName: '',
      targetRole: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
    },
    experience: [],
    projects: [],
    skills: [],
    education: [],
    customSections: [],
    sectionConfig: {
      order: ['contact', 'summary', 'experience', 'projects', 'skills', 'education', 'custom'],
      visibility: {
        contact: true,
        summary: true,
        experience: true,
        projects: true,
        skills: true,
        education: true,
        certifications: false,
        custom: false,
      },
      customTitles: {},
    },
    templateConfig: {
      engineMode: 'ats_classic',
      pageSize: 'A4',
      fontFamily: 'inter',
      accentColor: '#2563eb',
      spacingPreset: 'auto',
      autoFitEnabled: true,
      scaleLevel: 1,
      showIcons: false,
      showPhoto: false,
    },
  };
}

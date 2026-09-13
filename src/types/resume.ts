/**
 * Dual-Engine Single-Page Resume Builder
 * Type Definitions & Data Models (Phase 1)
 */

export type SectionId =
  | 'contact'
  | 'summary'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'education'
  | 'certifications'
  | 'custom';

export type EngineMode = 'ats_classic' | 'modern_clean';

export type PageSize = 'A4' | 'Letter';

export type SpacingPreset = 'compact' | 'normal' | 'relaxed' | 'auto';

export type FontFamilyOption =
  | 'inter'
  | 'roboto'
  | 'merriweather'
  | 'times'
  | 'arial'
  | 'georgia'
  | 'garamond';

/**
 * 5-tier Micro-Typography & Micro-Spacing Scale Levels
 * Level 0 = Generous (Default for short resumes)
 * Level 1 = Standard
 * Level 2 = Compact
 * Level 3 = Ultra-Compact
 * Level 4 = Maximum Compression (Minimum ATS-safe limit)
 */
export type ScaleLevel = 0 | 1 | 2 | 3 | 4;

export interface BulletPoint {
  id: string;
  text: string;
  // Optional pre-computed analysis cache
  score?: number;
  hasActionVerb?: boolean;
  hasMetric?: boolean;
  feedback?: string[];
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string; // "YYYY-MM" or "Month YYYY"
  endDate: string;   // "YYYY-MM" or "Present"
  isCurrent: boolean;
  bullets: BulletPoint[];
}

export interface ProjectItem {
  id: string;
  name: string;
  role?: string;
  summary?: string;
  technologies: string[];
  url?: string;
  repoUrl?: string;
  startDate?: string;
  endDate?: string;
  bullets: BulletPoint[];
}

export interface SkillCategory {
  id: string;
  categoryName: string; // e.g., "Languages & Runtimes", "Cloud & Infrastructure"
  skills: string[];     // e.g., ["TypeScript", "Go", "Python"]
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location?: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string;
  coursework?: string[];
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
  bullets?: BulletPoint[];
}

export interface CustomSection {
  id: string;
  sectionTitle: string;
  items: CustomSectionItem[];
}

export interface ProfileContact {
  fullName: string;
  targetRole: string; // e.g. "Staff Software Engineer"
  email: string;
  phone: string;
  location: string;   // "San Francisco, CA" or "Remote, US"
  website?: string;
  linkedin?: string;
  github?: string;
  portfolioUrl?: string;
  summary?: string;   // Optional executive summary (1-3 lines max)
}

export interface SectionConfig {
  order: SectionId[];
  visibility: Record<SectionId, boolean>;
  customTitles: Partial<Record<SectionId, string>>;
}

export interface TemplateConfig {
  engineMode: EngineMode;
  pageSize: PageSize;
  fontFamily: FontFamilyOption;
  accentColor: string; // Hex code, e.g., "#2563eb" for Modern Clean
  spacingPreset: SpacingPreset;
  autoFitEnabled: boolean;
  scaleLevel: ScaleLevel;
  showIcons: boolean;       // Hidden in ATS Classic mode automatically
  showPhoto: boolean;       // Hidden in ATS Classic mode automatically
}

export interface JobDescriptionState {
  rawText: string;
  targetRole: string;
  targetCompany?: string;
  extractedKeywords: Array<{
    keyword: string;
    category: 'language' | 'framework' | 'tool' | 'concept' | 'soft_skill';
    matched: boolean;
    frequencyInJD: number;
    countInResume: number;
  }>;
  matchScore: number; // 0 to 100
  lastAnalyzedAt?: string;
}

export interface ResumeData {
  version: string;
  profile: ProfileContact;
  experience: WorkExperience[];
  projects: ProjectItem[];
  skills: SkillCategory[];
  education: EducationItem[];
  customSections: CustomSection[];
  sectionConfig: SectionConfig;
  templateConfig: TemplateConfig;
  jdState?: JobDescriptionState;
}

/**
 * Metric measurement values for Page Budget
 */
export type BudgetStatus = 'comfortable' | 'optimal' | 'tight' | 'overflowing';

export interface PageBudgetMetric {
  usedHeightPx: number;
  maxHeightPx: number;
  availableHeightPx: number;
  overflowDeltaPx: number;
  usedPercent: number; // e.g., 94 for 94%
  status: BudgetStatus;
  isOverflowing: boolean;
}

/**
 * Configuration mapping for auto-fit scaling levels
 */
export interface ScaleConfigValues {
  level: ScaleLevel;
  fontSizePt: number;
  fontSizePx: number;
  lineHeight: number;
  pagePaddingMm: number;
  sectionGapPx: number;
  itemGapPx: number;
  bulletGapPx: number;
  headerGapPx: number;
}

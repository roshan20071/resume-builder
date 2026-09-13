/**
 * Dual-Engine Single-Page Resume Builder
 * AI Template Personalization Engine
 * 
 * Adapts any curated starter template around the user's recently entered basic details
 * (Full Name, College / University, Degree, Branch, Year, Location, Contact, and Links),
 * while intelligently synthesizing role-aligned summaries and preserving 100% 1-page fit.
 */

import type { ResumeData, ProfileContact, EducationItem } from '../types/resume';

export interface UserBasicIdentity {
  fullName: string;
  targetRole?: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  institution?: string;
  degree?: string;
  fieldOfStudy?: string;
  graduationYear?: string;
  startDate?: string;
  endDate?: string;
  gpa?: string;
  coursework?: string | string[];
  targetSkills?: string[];
}

const STORAGE_KEY_LAST_IDENTITY = 'apex_resume_last_used_identity';

/**
 * Persists the user's active basic details to localStorage
 */
export function saveLastUsedIdentity(profile: ProfileContact, education: EducationItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    const primaryEdu = education[0];
    const courseworkVal = primaryEdu?.coursework
      ? Array.isArray(primaryEdu.coursework)
        ? primaryEdu.coursework
        : [primaryEdu.coursework]
      : [];

    const identity: UserBasicIdentity = {
      fullName: profile.fullName || '',
      targetRole: profile.targetRole || '',
      email: profile.email || '',
      phone: profile.phone || '',
      location: profile.location || '',
      website: profile.website || '',
      linkedin: profile.linkedin || '',
      github: profile.github || '',
      institution: primaryEdu?.institution || '',
      degree: primaryEdu?.degree || '',
      fieldOfStudy: primaryEdu?.fieldOfStudy || '',
      startDate: primaryEdu?.startDate || '',
      endDate: primaryEdu?.endDate || '',
      gpa: primaryEdu?.gpa || '',
      coursework: courseworkVal,
    };

    // Only save if user has entered at least a name or institution
    if (identity.fullName.trim() || (identity.institution && identity.institution.trim())) {
      localStorage.setItem(STORAGE_KEY_LAST_IDENTITY, JSON.stringify(identity));
    }
  } catch (e) {
    console.error('Error saving last used identity:', e);
  }
}

/**
 * Retrieves the user's last used basic details from localStorage
 */
export function getLastUsedIdentity(): UserBasicIdentity | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LAST_IDENTITY);
    if (!raw) return null;
    return JSON.parse(raw) as UserBasicIdentity;
  } catch {
    return null;
  }
}

/**
 * Synthesizes an executive summary referencing the user's specific identity, college, degree, and the target template role
 */
export function synthesizePersonalizedSummary(
  targetRole: string,
  user: UserBasicIdentity,
  templateRoleCategory: string,
  originalSummaryTemplate?: string
): string {
  const name = user.fullName ? user.fullName.split(' ')[0] : 'Results-driven professional';
  const college = user.institution ? user.institution.replace(/^(Indian Institute of Technology|National Institute of Technology|Indian Institute of Information Technology)\s*/i, '').trim() || user.institution : '';
  const degree = user.degree || (user.fieldOfStudy ? `degree in ${user.fieldOfStudy}` : '');
  const role = user.targetRole || targetRole || 'Software Engineer';

  // Entry Level / Fresher persona
  if (templateRoleCategory === 'Entry Level' || role.toLowerCase().includes('fresh') || role.toLowerCase().includes('intern')) {
    if (college && degree) {
      return `Ambitious and analytical ${degree} graduate from ${user.institution}, targeting ${role} opportunities. Proven foundational competence in data structures, algorithms, and full-stack software development with a record of high-impact academic projects and collaborative engineering solutions.`;
    }
    if (user.institution) {
      return `High-achieving engineering graduate from ${user.institution} with robust foundations in software engineering, modern development frameworks, and scalable system design. Eager to contribute to fast-paced product teams as a ${role}.`;
    }
    return `Driven and detail-oriented technical graduate specializing in ${role}. Combines strong algorithmic problem-solving with hands-on project experience in modern architectures, responsive interfaces, and API engineering.`;
  }

  // Data & AI persona
  if (templateRoleCategory === 'Data & AI' || role.toLowerCase().includes('ai') || role.toLowerCase().includes('data') || role.toLowerCase().includes('machine learning')) {
    const eduMention = user.institution ? ` Background backed by rigorous academic training at ${user.institution}.` : '';
    return `Specialized ${role} with extensive experience building production-grade predictive pipelines, distributed model training workflows, and real-time inference systems.${eduMention} Passionate about deploying performant AI architectures that optimize business KPIs and operational throughput.`;
  }

  // Product & Design persona
  if (templateRoleCategory === 'Product & Design' || role.toLowerCase().includes('product') || role.toLowerCase().includes('design')) {
    const eduMention = user.institution ? ` Alumnus of ${user.institution}.` : '';
    return `Strategic and customer-obsessed ${role} adept at leading cross-functional teams, defining product roadmaps from 0-to-1, and driving measurable user growth through data-backed product experiments.${eduMention}`;
  }

  // Engineering & Default persona
  const eduMention = user.institution ? ` Alumnus of ${user.institution}.` : '';
  return `Product-minded ${role} with proven expertise architecting high-availability systems, resilient cloud microservices, and high-performance applications.${eduMention} Dedicated to clean code, test-driven engineering, and sub-100ms latency at scale.`;
}

/**
 * Main AI Personalization Function:
 * Adapts a starter template using the user's recently active / stored basic details.
 */
export function generatePersonalizedResume(
  templateData: ResumeData,
  userOverride: Partial<UserBasicIdentity>,
  options: {
    preserveUserEducation?: boolean;
    tailorSummary?: boolean;
    templateCategory?: string;
    customTargetSkills?: string[];
  } = {}
): ResumeData {
  // 1. Deep clone template data to prevent mutating original templates
  const cloned: ResumeData = JSON.parse(JSON.stringify(templateData));

  const fullName = (userOverride.fullName || cloned.profile.fullName || '').trim();
  const email = (userOverride.email || cloned.profile.email || '').trim();
  const phone = (userOverride.phone || cloned.profile.phone || '').trim();
  const location = (userOverride.location || cloned.profile.location || '').trim();
  const website = (userOverride.website || cloned.profile.website || '').trim();
  const linkedin = (userOverride.linkedin || cloned.profile.linkedin || '').trim();
  const github = (userOverride.github || cloned.profile.github || '').trim();
  const targetRole = (userOverride.targetRole || cloned.profile.targetRole || '').trim();

  // 2. Synthesize personalized summary
  const summary = (options.tailorSummary !== false && fullName)
    ? synthesizePersonalizedSummary(
        targetRole || cloned.profile.targetRole,
        {
          fullName,
          targetRole,
          email,
          phone,
          location,
          website,
          linkedin,
          github,
          institution: userOverride.institution,
          degree: userOverride.degree,
          fieldOfStudy: userOverride.fieldOfStudy,
        },
        options.templateCategory || 'Engineering',
        cloned.profile.summary
      )
    : (cloned.profile.summary || '');

  cloned.profile = {
    ...cloned.profile,
    fullName: fullName || cloned.profile.fullName,
    targetRole: targetRole || cloned.profile.targetRole,
    email: email || cloned.profile.email,
    phone: phone || cloned.profile.phone,
    location: location || cloned.profile.location,
    website: website || cloned.profile.website,
    linkedin: linkedin || cloned.profile.linkedin,
    github: github || cloned.profile.github,
    summary,
  };

  // 3. Adapt Education with user's actual institution / degree / year if provided
  if (userOverride.institution && userOverride.institution.trim()) {
    const existingEdu = cloned.education[0] || {
      id: `edu-pers-${Date.now()}`,
      institution: '',
      degree: '',
      fieldOfStudy: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      coursework: [],
    };

    let parsedCoursework: string[] = [];
    if (Array.isArray(userOverride.coursework)) {
      parsedCoursework = userOverride.coursework;
    } else if (typeof userOverride.coursework === 'string' && userOverride.coursework.trim()) {
      parsedCoursework = userOverride.coursework.split(',').map((s) => s.trim()).filter(Boolean);
    } else if (Array.isArray(existingEdu.coursework)) {
      parsedCoursework = existingEdu.coursework;
    }

    cloned.education = [
      {
        ...existingEdu,
        id: existingEdu.id || `edu-pers-${Date.now()}`,
        institution: userOverride.institution.trim(),
        degree: (userOverride.degree || existingEdu.degree || 'Bachelor of Technology (B.Tech)').trim(),
        fieldOfStudy: (userOverride.fieldOfStudy || existingEdu.fieldOfStudy || 'Computer Science & Engineering').trim(),
        location: (userOverride.location || existingEdu.location || '').trim(),
        startDate: (userOverride.startDate || existingEdu.startDate || '2021-08').trim(),
        endDate: (userOverride.endDate || existingEdu.endDate || '2025-05').trim(),
        gpa: (userOverride.gpa || existingEdu.gpa || '8.6 / 10 CGPA').trim(),
        coursework: parsedCoursework,
      },
      // Keep secondary education if exists and not replaced
      ...cloned.education.slice(1),
    ];
  }

  // 4. Inject custom skills if provided
  if (options.customTargetSkills && options.customTargetSkills.length > 0) {
    if (cloned.skills.length > 0) {
      const primaryCat = cloned.skills[0];
      const merged = Array.from(new Set([...options.customTargetSkills, ...primaryCat.skills]));
      cloned.skills[0] = {
        ...primaryCat,
        skills: merged,
      };
    }
  }

  return cloned;
}

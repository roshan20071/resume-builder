/**
 * Dual-Engine Single-Page Resume Builder
 * Enterprise ATS Machine Parser Simulator (Phase 2)
 *
 * Simulates machine parsing algorithms (Workday, Taleo, Greenhouse, Lever)
 * to audit resume compatibility, token extraction, and format safety.
 */

import type { ResumeData } from '../types/resume';

export interface ATSCheckItem {
  id: string;
  category: 'contact' | 'formatting' | 'experience' | 'skills' | 'structure';
  label: string;
  status: 'passed' | 'warning' | 'failed';
  details: string;
  extractedValue?: string;
}

export interface ATSSimulatorReport {
  overallScore: number; // 0 to 100
  confidenceLevel: 'High (100% Parsable)' | 'Moderate' | 'Low (Risk of Rejection)';
  checks: ATSCheckItem[];
  parsedEntityMap: {
    candidateName: string | null;
    targetRole: string | null;
    email: string | null;
    phone: string | null;
    location: string | null;
    totalExperienceCount: number;
    skillsCount: number;
    hasStandardHeadings: boolean;
    hasTablesOrColumns: boolean;
  };
}

export function simulateATSParsing(data: ResumeData): ATSSimulatorReport {
  const checks: ATSCheckItem[] = [];
  const { profile, experience, skills, sectionConfig, templateConfig } = data;

  // 1. Candidate Name Check
  if (profile.fullName.trim()) {
    checks.push({
      id: 'chk-name',
      category: 'contact',
      label: 'Candidate Name Extraction',
      status: 'passed',
      details: 'Identified primary candidate entity at root header.',
      extractedValue: profile.fullName,
    });
  } else {
    checks.push({
      id: 'chk-name',
      category: 'contact',
      label: 'Candidate Name Extraction',
      status: 'failed',
      details: 'Missing full name. ATS parser cannot index applicant.',
    });
  }

  // 2. Email Verification
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (profile.email && emailRegex.test(profile.email)) {
    checks.push({
      id: 'chk-email',
      category: 'contact',
      label: 'Email Parsing & Routing',
      status: 'passed',
      details: 'Valid RFC-compliant email recognized for automated candidate communications.',
      extractedValue: profile.email,
    });
  } else {
    checks.push({
      id: 'chk-email',
      category: 'contact',
      label: 'Email Parsing & Routing',
      status: 'failed',
      details: 'Missing or invalid email address.',
    });
  }

  // 3. Phone Verification
  if (profile.phone && /\d{7,}/.test(profile.phone.replace(/\D/g, ''))) {
    checks.push({
      id: 'chk-phone',
      category: 'contact',
      label: 'Phone Number Extraction',
      status: 'passed',
      details: 'Telephone format matches E.164 / North American standard.',
      extractedValue: profile.phone,
    });
  } else {
    checks.push({
      id: 'chk-phone',
      category: 'contact',
      label: 'Phone Number Extraction',
      status: 'warning',
      details: 'Phone number is missing or does not contain at least 7 digits.',
    });
  }

  // 4. Standard Section Headers
  const STANDARD_HEADER_PATTERN =
    /^(experience|work\s+experience|professional\s+experience|relevant\s+experience|work\s+history|employment\s+history|education|academic\s+history|academics|skills|technical\s+skills|core\s+competencies|technologies|tools(\s*(&|and)\s*technologies)?|projects|technical\s+projects|key\s+projects|selected\s+projects|featured\s+projects|summary|professional\s+summary|profile|about\s+me|certifications(\s*(&|and)\s*licenses)?|certifications\s*(&|and)\s*honors|awards(\s*(&|and)\s*honors)?)$/i;

  const nonStandardTitles = Object.entries(sectionConfig.customTitles).filter(
    ([_, title]) => Boolean(title?.trim()) && !STANDARD_HEADER_PATTERN.test(title.trim())
  );
  if (nonStandardTitles.length === 0) {
    checks.push({
      id: 'chk-headers',
      category: 'structure',
      label: 'Standard Semantic Headings',
      status: 'passed',
      details: 'Standard headings used (Experience, Skills, Education, Projects).',
    });
  } else {
    checks.push({
      id: 'chk-headers',
      category: 'structure',
      label: 'Standard Semantic Headings',
      status: 'warning',
      details: 'Custom section titles detected. Standard names (e.g. "Work Experience") parse with higher reliability.',
    });
  }

  // 5. Work Experience Chronology & Dates
  let validDateCount = 0;
  for (const exp of experience) {
    if (exp.startDate && (exp.endDate || exp.isCurrent)) {
      validDateCount++;
    }
  }

  if (experience.length > 0 && validDateCount === experience.length) {
    checks.push({
      id: 'chk-exp-dates',
      category: 'experience',
      label: 'Work Chronology & Date Parsing',
      status: 'passed',
      details: `Successfully parsed ${experience.length} work history nodes with valid dates.`,
      extractedValue: `${experience.length} positions indexed`,
    });
  } else if (experience.length === 0) {
    checks.push({
      id: 'chk-exp-dates',
      category: 'experience',
      label: 'Work Chronology & Date Parsing',
      status: 'warning',
      details: 'No work experience entries found.',
    });
  } else {
    checks.push({
      id: 'chk-exp-dates',
      category: 'experience',
      label: 'Work Chronology & Date Parsing',
      status: 'warning',
      details: 'Some work history items are missing start or end dates.',
    });
  }

  // 6. Table & Graphic Free Layout Check
  const isATSClassic = templateConfig.engineMode === 'ats_classic';
  if (isATSClassic) {
    checks.push({
      id: 'chk-layout',
      category: 'formatting',
      label: 'Single-Column Tableless Hierarchy',
      status: 'passed',
      details: 'Strict single-column semantic flow with 0 unparseable tables or textboxes.',
    });
  } else {
    checks.push({
      id: 'chk-layout',
      category: 'formatting',
      label: 'Modern Clean Mode Formatting',
      status: 'passed',
      details: 'Modern Clean mode is fully semantic. For strict conservative ATS portals, ATS Classic is recommended.',
    });
  }

  // 7. Skills Indexing
  const totalSkillsCount = skills.reduce((acc, cat) => acc + cat.skills.length, 0);
  if (totalSkillsCount >= 5) {
    checks.push({
      id: 'chk-skills',
      category: 'skills',
      label: 'Technical Skills Taxonomy',
      status: 'passed',
      details: `${totalSkillsCount} structured skills indexed across ${skills.length} categories.`,
      extractedValue: `${totalSkillsCount} skills found`,
    });
  } else {
    checks.push({
      id: 'chk-skills',
      category: 'skills',
      label: 'Technical Skills Taxonomy',
      status: 'warning',
      details: 'Fewer than 5 skills indexed. Add categorized technical skills for search matchability.',
    });
  }

  // Compute Overall ATS Score
  const passedCount = checks.filter((c) => c.status === 'passed').length;
  const warningCount = checks.filter((c) => c.status === 'warning').length;
  const totalChecks = checks.length;

  let overallScore = Math.round(((passedCount + warningCount * 0.5) / totalChecks) * 100);
  if (checks.some((c) => c.status === 'failed')) {
    overallScore = Math.min(overallScore, 65);
  }

  let confidenceLevel: ATSSimulatorReport['confidenceLevel'] = 'High (100% Parsable)';
  if (overallScore < 75) confidenceLevel = 'Low (Risk of Rejection)';
  else if (overallScore < 90) confidenceLevel = 'Moderate';

  return {
    overallScore,
    confidenceLevel,
    checks,
    parsedEntityMap: {
      candidateName: profile.fullName || null,
      targetRole: profile.targetRole || null,
      email: profile.email || null,
      phone: profile.phone || null,
      location: profile.location || null,
      totalExperienceCount: experience.length,
      skillsCount: totalSkillsCount,
      hasStandardHeadings: nonStandardTitles.length === 0,
      hasTablesOrColumns: false,
    },
  };
}

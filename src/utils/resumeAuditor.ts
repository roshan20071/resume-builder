/**
 * Live ATS Health Score & Deep Resume Auditor (0-100)
 * Evaluates metric density, weak verb detection with 1-click upgrades,
 * contact completeness, skill breadth, and ATS readability.
 */

import type { ResumeData, WorkExperience, ProjectItem, BulletPoint } from '../types/resume';

export interface WeakVerbOccurrence {
  sectionType: 'experience' | 'project';
  parentId: string;
  bulletId: string;
  originalText: string;
  weakPhrase: string;
  suggestedVerbs: string[];
  upgradedSample: string;
}

export interface AuditIssue {
  id: string;
  type: 'critical' | 'warning' | 'success';
  category: 'Contact' | 'Metrics' | 'Action Verbs' | 'Skills' | 'Structure';
  title: string;
  description: string;
  pointsDelta: number;
}

export interface ATSAuditReport {
  overallScore: number; // 0 to 100
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  breakdown: {
    contactScore: number;    // max 20
    metricsScore: number;    // max 30
    actionVerbsScore: number;// max 25
    skillsScore: number;     // max 15
    structureScore: number;  // max 10
  };
  metricsStats: {
    totalBullets: number;
    metricBulletsCount: number;
    metricDensityPercent: number; // 0 to 100
  };
  weakVerbs: WeakVerbOccurrence[];
  issues: AuditIssue[];
  quickWins: string[];
}

// Regex for quantifiable outcomes and numbers
const METRIC_REGEX = /(\b\d+(\.\d+)?%?|\$\d+(\.\d+)?|\b\d+k\b|\b\d+M\b|\b\d+B\b|\b\d+x\b|\b\d+\s*(users|clients|transactions|engineers|teams|days|weeks|months|hours|ms|s|fold|increase|reduction|growth))/i;

// Weak verb dictionary with actionable strong replacements
const WEAK_VERB_MAP: Array<{ regex: RegExp; phrase: string; suggestions: string[] }> = [
  {
    regex: /^(responsible for|was responsible for)\s+/i,
    phrase: 'Responsible for',
    suggestions: ['Spearheaded', 'Directed', 'Executed', 'Orchestrated'],
  },
  {
    regex: /^(helped with|helped to|helped)\s+/i,
    phrase: 'Helped with',
    suggestions: ['Collaborated to', 'Accelerated', 'Facilitated', 'Enabled'],
  },
  {
    regex: /^(worked on|worked with)\s+/i,
    phrase: 'Worked on',
    suggestions: ['Engineered', 'Architected', 'Implemented', 'Developed'],
  },
  {
    regex: /^(assisted in|assisted with|assisted)\s+/i,
    phrase: 'Assisted in',
    suggestions: ['Co-developed', 'Contributed to', 'Streamlined', 'Supported'],
  },
  {
    regex: /^(handled|was handling)\s+/i,
    phrase: 'Handled',
    suggestions: ['Managed', 'Administered', 'Optimized', 'Oversaw'],
  },
  {
    regex: /^(tasked with|was tasked with)\s+/i,
    phrase: 'Tasked with',
    suggestions: ['Appointed to', 'Pioneered', 'Championed', 'Delivered'],
  },
  {
    regex: /^(participated in)\s+/i,
    phrase: 'Participated in',
    suggestions: ['Co-authored', 'Contributed to', 'Executed', 'Drove'],
  },
  {
    regex: /^(made|did)\s+/i,
    phrase: 'Made / Did',
    suggestions: ['Delivered', 'Generated', 'Constructed', 'Formulated'],
  },
  {
    regex: /^(looked after|dealt with)\s+/i,
    phrase: 'Looked after',
    suggestions: ['Maintained', 'Standardized', 'Governed', 'Resolved'],
  },
  {
    regex: /^(involved in)\s+/i,
    phrase: 'Involved in',
    suggestions: ['Led', 'Co-engineered', 'Facilitated', 'Advanced'],
  },
];

/**
 * Calculates a comprehensive ATS Audit Report
 */
export function auditResume(resume: ResumeData): ATSAuditReport {
  let contactScore = 0;
  let metricsScore = 0;
  let actionVerbsScore = 0;
  let skillsScore = 0;
  let structureScore = 0;

  const issues: AuditIssue[] = [];
  const quickWins: string[] = [];
  const weakVerbs: WeakVerbOccurrence[] = [];

  // ==========================================
  // 1. CONTACT AUDIT (Max 20 Points)
  // ==========================================
  const profile = resume.profile;
  if (profile.fullName && profile.fullName.trim().length > 2) {
    contactScore += 4;
  } else {
    issues.push({
      id: 'contact-name',
      type: 'critical',
      category: 'Contact',
      title: 'Full Name Missing',
      description: 'Recruiters and ATS parsers require your legal or professional name at the top.',
      pointsDelta: -4,
    });
  }

  if (profile.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email.trim())) {
    contactScore += 4;
  } else {
    issues.push({
      id: 'contact-email',
      type: 'critical',
      category: 'Contact',
      title: 'Valid Email Missing',
      description: 'Provide a clean professional email address (e.g., name@gmail.com).',
      pointsDelta: -4,
    });
  }

  if (profile.phone && profile.phone.trim().length >= 7) {
    contactScore += 4;
  } else {
    issues.push({
      id: 'contact-phone',
      type: 'warning',
      category: 'Contact',
      title: 'Phone Number Missing',
      description: 'Adding a reachable phone number improves recruiter callback rates by 34%.',
      pointsDelta: -4,
    });
  }

  if (profile.location && profile.location.trim().length > 2) {
    contactScore += 4;
  } else {
    issues.push({
      id: 'contact-loc',
      type: 'warning',
      category: 'Contact',
      title: 'Location / City Missing',
      description: 'ATS geo-filters check for city/state or "Open to Remote" indicators.',
      pointsDelta: -4,
    });
  }

  if ((profile.linkedin && profile.linkedin.trim()) || (profile.github && profile.github.trim()) || (profile.website && profile.website.trim())) {
    contactScore += 4;
  } else {
    issues.push({
      id: 'contact-links',
      type: 'warning',
      category: 'Contact',
      title: 'No Professional Links',
      description: 'Include LinkedIn, GitHub, or Portfolio URL to verify your online presence.',
      pointsDelta: -4,
    });
    quickWins.push('Add your LinkedIn or GitHub profile link to the header.');
  }

  // ==========================================
  // 2. BULLET POINTS & METRIC DENSITY (Max 30 Points)
  // ==========================================
  const allBullets: { text: string; parentId: string; bulletId: string; type: 'experience' | 'project' }[] = [];

  resume.experience.forEach((exp) => {
    exp.bullets.forEach((b) => {
      if (b.text && b.text.trim().length > 0) {
        allBullets.push({ text: b.text.trim(), parentId: exp.id, bulletId: b.id, type: 'experience' });
      }
    });
  });

  resume.projects.forEach((proj) => {
    proj.bullets.forEach((b) => {
      if (b.text && b.text.trim().length > 0) {
        allBullets.push({ text: b.text.trim(), parentId: proj.id, bulletId: b.id, type: 'project' });
      }
    });
  });

  const totalBullets = allBullets.length;
  let metricBulletsCount = 0;

  allBullets.forEach((bullet) => {
    if (METRIC_REGEX.test(bullet.text)) {
      metricBulletsCount++;
    }
  });

  const metricDensityPercent = totalBullets > 0 ? Math.round((metricBulletsCount / totalBullets) * 100) : 0;

  if (totalBullets === 0) {
    issues.push({
      id: 'no-bullets',
      type: 'critical',
      category: 'Metrics',
      title: 'No Work or Project Bullets Found',
      description: 'Your resume needs quantifiable accomplishment bullets in experience or projects.',
      pointsDelta: -30,
    });
  } else {
    if (metricDensityPercent >= 60) {
      metricsScore = 30;
      issues.push({
        id: 'metric-dense-pass',
        type: 'success',
        category: 'Metrics',
        title: 'Outstanding Metric Density',
        description: `${metricDensityPercent}% of your bullet points contain measurable business impact (Target: >= 50%).`,
        pointsDelta: 30,
      });
    } else if (metricDensityPercent >= 40) {
      metricsScore = 22;
      issues.push({
        id: 'metric-dense-med',
        type: 'warning',
        category: 'Metrics',
        title: 'Moderate Metric Density',
        description: `${metricDensityPercent}% of bullets have numbers/metrics. Add percentages, dollar amounts, or latency drops to 2 more bullets.`,
        pointsDelta: 22,
      });
      quickWins.push('Quantify at least 2 more bullet points with numbers, % increases, or team sizes.');
    } else {
      metricsScore = Math.max(8, Math.round((metricDensityPercent / 100) * 30));
      issues.push({
        id: 'metric-dense-low',
        type: 'critical',
        category: 'Metrics',
        title: 'Low Measurable Impact (<40%)',
        description: `Only ${metricDensityPercent}% of your bullets contain metrics. Top-tier ATS systems heavily favor quantifiable results.`,
        pointsDelta: metricsScore,
      });
      quickWins.push('Add metrics (e.g. "by 35%", "saved 10 hours/week", "served 50K users") to weak bullets.');
    }
  }

  // ==========================================
  // 3. ACTION VERB & POWER WORDS (Max 25 Points)
  // ==========================================
  let weakBulletsCount = 0;

  allBullets.forEach((bullet) => {
    for (const weakItem of WEAK_VERB_MAP) {
      if (weakItem.regex.test(bullet.text)) {
        weakBulletsCount++;
        const chosenReplacement = weakItem.suggestions[0];
        const upgraded = bullet.text.replace(weakItem.regex, `${chosenReplacement} `);

        weakVerbs.push({
          sectionType: bullet.type,
          parentId: bullet.parentId,
          bulletId: bullet.bulletId,
          originalText: bullet.text,
          weakPhrase: weakItem.phrase,
          suggestedVerbs: weakItem.suggestions,
          upgradedSample: upgraded,
        });
        break;
      }
    }
  });

  if (totalBullets > 0) {
    if (weakBulletsCount === 0) {
      actionVerbsScore = 25;
      issues.push({
        id: 'action-verbs-pass',
        type: 'success',
        category: 'Action Verbs',
        title: 'Strong Executive Action Verbs',
        description: 'All experience and project bullets start with active, impactful power verbs.',
        pointsDelta: 25,
      });
    } else {
      const penalty = Math.min(20, weakBulletsCount * 5);
      actionVerbsScore = Math.max(5, 25 - penalty);
      issues.push({
        id: 'weak-verbs-found',
        type: 'warning',
        category: 'Action Verbs',
        title: `${weakBulletsCount} Passive / Weak Action Verbs Detected`,
        description: `Replace phrases like "Responsible for" or "Helped with" with high-impact power verbs like "Spearheaded" or "Architected".`,
        pointsDelta: actionVerbsScore,
      });
      quickWins.push(`Upgrade ${weakBulletsCount} passive bullet points using 1-Click Power Action Verbs.`);
    }
  }

  // ==========================================
  // 4. SKILLS BREADTH & STRUCTURE (Max 15 Points)
  // ==========================================
  const totalSkills = resume.skills.reduce((acc, cat) => acc + (cat.skills?.length || 0), 0);
  if (totalSkills >= 10) {
    skillsScore = 15;
    issues.push({
      id: 'skills-pass',
      type: 'success',
      category: 'Skills',
      title: 'Strong Technical & Domain Skills Coverage',
      description: `Discovered ${totalSkills} categorized skills across ${resume.skills.length} categories.`,
      pointsDelta: 15,
    });
  } else if (totalSkills >= 5) {
    skillsScore = 10;
    issues.push({
      id: 'skills-medium',
      type: 'warning',
      category: 'Skills',
      title: 'Add More Core Competencies',
      description: `You have ${totalSkills} skills. Adding 5+ more relevant technologies/tools improves ATS keyword matching.`,
      pointsDelta: 10,
    });
    quickWins.push('Add 4-5 industry keywords (e.g. Docker, TypeScript, CI/CD, SQL) into your Skills section.');
  } else {
    skillsScore = 4;
    issues.push({
      id: 'skills-low',
      type: 'critical',
      category: 'Skills',
      title: 'Skills Section Too Sparse',
      description: 'ATS engines scan for technical keywords. Include at least 8-12 domain skills.',
      pointsDelta: 4,
    });
  }

  // ==========================================
  // 5. STRUCTURE & FORMATTING (Max 10 Points)
  // ==========================================
  let structPoints = 0;
  if (resume.experience.length > 0 || resume.education.length > 0) {
    structPoints += 5;
  }
  if (resume.education.length > 0) {
    structPoints += 5;
  }

  structureScore = structPoints;

  // Calculate Overall ATS Score (0 - 100)
  const overallScore = Math.min(
    100,
    Math.max(0, contactScore + metricsScore + actionVerbsScore + skillsScore + structureScore)
  );

  let grade: 'A+' | 'A' | 'B' | 'C' | 'D' = 'C';
  if (overallScore >= 90) grade = 'A+';
  else if (overallScore >= 80) grade = 'A';
  else if (overallScore >= 70) grade = 'B';
  else if (overallScore >= 55) grade = 'C';
  else grade = 'D';

  return {
    overallScore,
    grade,
    breakdown: {
      contactScore,
      metricsScore,
      actionVerbsScore,
      skillsScore,
      structureScore,
    },
    metricsStats: {
      totalBullets,
      metricBulletsCount,
      metricDensityPercent,
    },
    weakVerbs,
    issues,
    quickWins,
  };
}

/**
 * Helper to auto-upgrade a bullet text with its first strong power verb replacement
 */
export function upgradeWeakBulletText(text: string): string {
  let result = text.trim();
  for (const weakItem of WEAK_VERB_MAP) {
    if (weakItem.regex.test(result)) {
      result = result.replace(weakItem.regex, `${weakItem.suggestions[0]} `);
      break;
    }
  }
  return result;
}

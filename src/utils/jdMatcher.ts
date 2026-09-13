/**
 * Dual-Engine Single-Page Resume Builder
 * Target Job Description (JD) Keyword Extractor, Matcher & Auto-Fill Engine (Phase 3)
 */

import type { ResumeData, JobDescriptionState, SkillCategory } from '../types/resume';

export const TECH_KEYWORDS_DICTIONARY = [
  // Languages
  'typescript', 'javascript', 'python', 'go', 'golang', 'java', 'c++', 'c#', 'ruby', 'rust', 'swift', 'kotlin', 'sql', 'html', 'css', 'graphql',
  // Frontend
  'react', 'next.js', 'vue', 'angular', 'svelte', 'tailwind', 'redux', 'zustand', 'webpack', 'vite', 'responsive design', 'accessibility', 'wcag', 'a11y',
  // Backend & Cloud
  'node.js', 'express', 'nestjs', 'django', 'fastapi', 'spring boot', 'aws', 'gcp', 'azure', 'docker', 'kubernetes', 'k8s', 'terraform', 'ci/cd', 'github actions', 'microservices', 'rest api', 'grpc', 'kafka', 'rabbitmq',
  // Data & Storage
  'postgresql', 'postgres', 'mysql', 'mongodb', 'redis', 'elasticsearch', 'dynamodb', 'snowflake', 'databricks', 'spark',
  // Methodologies & Concepts
  'agile', 'scrum', 'system design', 'distributed systems', 'unit testing', 'integration testing', 'tdd', 'code review', 'performance optimization', 'scalability', 'security', 'high availability',
];

// Clean formatting dictionary for industry-standard resume capitalization
export const KEYWORD_PRETTY_NAMES: Record<string, { formatted: string; defaultCategory: string }> = {
  accessibility: { formatted: 'Web Accessibility (a11y / WCAG)', defaultCategory: 'Frontend & UI Standards' },
  a11y: { formatted: 'Accessibility (a11y / WCAG 2.1)', defaultCategory: 'Frontend & UI Standards' },
  'code review': { formatted: 'Code Review & Technical Mentorship', defaultCategory: 'Engineering Practices' },
  'performance optimization': { formatted: 'Performance Optimization & Web Vitals', defaultCategory: 'Core Competencies' },
  html: { formatted: 'HTML5 Semantic Architecture', defaultCategory: 'Languages & Core' },
  css: { formatted: 'CSS3 / Modern CSS Architecture', defaultCategory: 'Languages & Core' },
  'responsive design': { formatted: 'Responsive Web Design', defaultCategory: 'Frontend & UI Standards' },
  typescript: { formatted: 'TypeScript', defaultCategory: 'Languages & Core' },
  javascript: { formatted: 'JavaScript (ESNext)', defaultCategory: 'Languages & Core' },
  python: { formatted: 'Python', defaultCategory: 'Languages & Core' },
  go: { formatted: 'Go (Golang)', defaultCategory: 'Languages & Core' },
  golang: { formatted: 'Go (Golang)', defaultCategory: 'Languages & Core' },
  java: { formatted: 'Java', defaultCategory: 'Languages & Core' },
  'c++': { formatted: 'C++', defaultCategory: 'Languages & Core' },
  rust: { formatted: 'Rust', defaultCategory: 'Languages & Core' },
  sql: { formatted: 'SQL', defaultCategory: 'Languages & Core' },
  graphql: { formatted: 'GraphQL', defaultCategory: 'Frameworks & APIs' },
  react: { formatted: 'React', defaultCategory: 'Frameworks & Libraries' },
  'next.js': { formatted: 'Next.js (App Router)', defaultCategory: 'Frameworks & Libraries' },
  vue: { formatted: 'Vue.js', defaultCategory: 'Frameworks & Libraries' },
  tailwind: { formatted: 'Tailwind CSS', defaultCategory: 'Frontend & UI Standards' },
  'node.js': { formatted: 'Node.js', defaultCategory: 'Backend & Cloud' },
  express: { formatted: 'Express.js', defaultCategory: 'Backend & Cloud' },
  aws: { formatted: 'AWS (ECS, Lambda, S3, RDS)', defaultCategory: 'Cloud & Infrastructure' },
  gcp: { formatted: 'Google Cloud Platform (GCP)', defaultCategory: 'Cloud & Infrastructure' },
  azure: { formatted: 'Microsoft Azure', defaultCategory: 'Cloud & Infrastructure' },
  docker: { formatted: 'Docker', defaultCategory: 'Cloud & Infrastructure' },
  kubernetes: { formatted: 'Kubernetes (k8s)', defaultCategory: 'Cloud & Infrastructure' },
  k8s: { formatted: 'Kubernetes (k8s)', defaultCategory: 'Cloud & Infrastructure' },
  terraform: { formatted: 'Terraform (IaC)', defaultCategory: 'Cloud & Infrastructure' },
  'ci/cd': { formatted: 'CI/CD Pipelines (GitHub Actions)', defaultCategory: 'Cloud & Infrastructure' },
  'github actions': { formatted: 'GitHub Actions', defaultCategory: 'Cloud & Infrastructure' },
  microservices: { formatted: 'Microservices Architecture', defaultCategory: 'Core Competencies' },
  'rest api': { formatted: 'RESTful APIs', defaultCategory: 'Frameworks & APIs' },
  grpc: { formatted: 'gRPC', defaultCategory: 'Frameworks & APIs' },
  kafka: { formatted: 'Apache Kafka', defaultCategory: 'Cloud & Infrastructure' },
  postgresql: { formatted: 'PostgreSQL', defaultCategory: 'Databases & Storage' },
  postgres: { formatted: 'PostgreSQL', defaultCategory: 'Databases & Storage' },
  mongodb: { formatted: 'MongoDB', defaultCategory: 'Databases & Storage' },
  redis: { formatted: 'Redis', defaultCategory: 'Databases & Storage' },
  agile: { formatted: 'Agile / Scrum Methodologies', defaultCategory: 'Engineering Practices' },
  scrum: { formatted: 'Scrum Methodologies', defaultCategory: 'Engineering Practices' },
  'system design': { formatted: 'Distributed System Design', defaultCategory: 'Core Competencies' },
  'distributed systems': { formatted: 'Distributed Systems', defaultCategory: 'Core Competencies' },
  'unit testing': { formatted: 'Unit & Integration Testing (Jest/Vitest)', defaultCategory: 'Engineering Practices' },
  'integration testing': { formatted: 'Integration Testing', defaultCategory: 'Engineering Practices' },
  tdd: { formatted: 'Test-Driven Development (TDD)', defaultCategory: 'Engineering Practices' },
  scalability: { formatted: 'High-Concurrency Scalability', defaultCategory: 'Core Competencies' },
  security: { formatted: 'Application Security & OWASP', defaultCategory: 'Core Competencies' },
  'high availability': { formatted: 'High Availability & Fault Tolerance', defaultCategory: 'Core Competencies' },
};

/**
 * Returns formatted display name for a keyword
 */
export function formatKeyword(rawKeyword: string): string {
  const lower = rawKeyword.toLowerCase().trim();
  if (KEYWORD_PRETTY_NAMES[lower]) {
    return KEYWORD_PRETTY_NAMES[lower].formatted;
  }
  // Default title casing
  return rawKeyword
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function analyzeJobDescription(jdText: string, resumeData: ResumeData): JobDescriptionState {
  if (!jdText.trim()) {
    return {
      rawText: '',
      targetRole: '',
      extractedKeywords: [],
      matchScore: 0,
    };
  }

  const jdLower = jdText.toLowerCase();

  // Combine entire resume text to search for matching keywords
  const resumeTextCorpus = [
    resumeData.profile.fullName,
    resumeData.profile.targetRole,
    resumeData.profile.summary || '',
    ...resumeData.experience.flatMap((e) => [
      e.company,
      e.position,
      ...e.bullets.map((b) => b.text),
    ]),
    ...resumeData.projects.flatMap((p) => [
      p.name,
      p.summary || '',
      ...p.technologies,
      ...p.bullets.map((b) => b.text),
    ]),
    ...resumeData.skills.flatMap((s) => [s.categoryName, ...s.skills]),
    ...resumeData.education.flatMap((ed) => [
      ed.institution,
      ed.degree,
      ed.fieldOfStudy,
      ...(ed.coursework || []),
    ]),
  ]
    .join(' ')
    .toLowerCase();

  const extracted: JobDescriptionState['extractedKeywords'] = [];

  for (const keyword of TECH_KEYWORDS_DICTIONARY) {
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
    const matchesInJD = jdLower.match(regex);

    if (matchesInJD && matchesInJD.length > 0) {
      const matchesInResume = resumeTextCorpus.match(regex);
      const countInResume = matchesInResume ? matchesInResume.length : 0;

      let category: JobDescriptionState['extractedKeywords'][0]['category'] = 'tool';
      if (['typescript', 'javascript', 'python', 'go', 'golang', 'java', 'rust', 'c++', 'sql', 'html', 'css'].includes(keyword)) {
        category = 'language';
      } else if (['react', 'next.js', 'vue', 'node.js', 'tailwind', 'express', 'spring boot'].includes(keyword)) {
        category = 'framework';
      } else if (['agile', 'scrum', 'system design', 'distributed systems', 'scalability', 'ci/cd', 'accessibility', 'code review', 'performance optimization'].includes(keyword)) {
        category = 'concept';
      }

      extracted.push({
        keyword,
        category,
        matched: countInResume > 0,
        frequencyInJD: matchesInJD.length,
        countInResume,
      });
    }
  }

  // Calculate Match Score
  const totalKeywords = extracted.length;
  const matchedKeywords = extracted.filter((k) => k.matched).length;
  const matchScore = totalKeywords > 0 ? Math.round((matchedKeywords / totalKeywords) * 100) : 0;

  // Extract candidate role title if present in top lines
  const firstLines = jdText.split('\n').map((l) => l.trim()).filter(Boolean);
  const potentialRole = firstLines.length > 0 ? firstLines[0].substring(0, 60) : 'Target Role';

  return {
    rawText: jdText,
    targetRole: potentialRole,
    extractedKeywords: extracted.sort((a, b) => (b.matched === a.matched ? b.frequencyInJD - a.frequencyInJD : a.matched ? -1 : 1)),
    matchScore,
    lastAnalyzedAt: new Date().toISOString(),
  };
}

/**
 * Ingests missing keywords directly into the structured Skill Categories
 */
export function injectKeywordsIntoSkills(
  existingSkills: SkillCategory[],
  keywordsToInject: string[]
): SkillCategory[] {
  const updatedCategories = [...existingSkills.map((c) => ({ ...c, skills: [...c.skills] }))];

  for (const rawKw of keywordsToInject) {
    const formatted = formatKeyword(rawKw);
    const kwMeta = KEYWORD_PRETTY_NAMES[rawKw.toLowerCase()] || { defaultCategory: 'Technical Skills' };

    // Check if already in skills
    const alreadyExists = updatedCategories.some((cat) =>
      cat.skills.some((s) => s.toLowerCase() === formatted.toLowerCase() || s.toLowerCase().includes(rawKw.toLowerCase()))
    );

    if (alreadyExists) continue;

    // Try to find matching category
    let targetCategory = updatedCategories.find((cat) =>
      cat.categoryName.toLowerCase().includes(kwMeta.defaultCategory.toLowerCase().split(' ')[0])
    );

    if (!targetCategory && updatedCategories.length > 0) {
      // Pick first or last category
      targetCategory = updatedCategories[0];
    }

    if (targetCategory) {
      targetCategory.skills.push(formatted);
    } else {
      updatedCategories.push({
        id: `cat-auto-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        categoryName: kwMeta.defaultCategory,
        skills: [formatted],
      });
    }
  }

  return updatedCategories;
}

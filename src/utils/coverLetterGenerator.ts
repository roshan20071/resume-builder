/**
 * Dual-Engine Single-Page Resume Builder
 * Matching Cover Letter & Recruiter InMail Generator (Phase 3)
 */

import type { ResumeData } from '../types/resume';

export interface CoverLetterOptions {
  companyName: string;
  targetRole: string;
  hiringManagerName?: string;
  customNote?: string;
}

export interface CoverLetterOutput {
  letterDate: string;
  recipientGreeting: string;
  paragraph1_hook: string;
  paragraph2_achievements: string;
  paragraph3_alignment_closing: string;
  signoff: string;
  recruiterInMail: string;
}

export function generateCoverLetter(
  resumeData: ResumeData,
  options: CoverLetterOptions
): CoverLetterOutput {
  const { profile, experience, skills } = resumeData;
  const company = options.companyName.trim() || 'your organization';
  const role = options.targetRole.trim() || profile.targetRole || 'Software Engineer';
  const greeting = options.hiringManagerName?.trim()
    ? `Dear ${options.hiringManagerName},`
    : `Dear ${company} Hiring Team,`;

  const topExp = experience[0];
  const topBullet = topExp?.bullets[0]?.text || 'delivering high-impact, scalable distributed software systems.';
  const topSkillList = skills.flatMap((s) => s.skills).slice(0, 4).join(', ') || 'modern web technologies and cloud architecture';

  const todayFormatted = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const paragraph1_hook = `I am writing to express my enthusiastic interest in the ${role} position at ${company}. With a proven track record in engineering robust applications and scaling high-performance systems, I am excited about the opportunity to contribute to ${company}'s ongoing product innovation.`;

  const paragraph2_achievements = topExp
    ? `In my recent role as ${topExp.position} at ${topExp.company}, I ${topBullet.replace(/^[A-Z][a-z]+ed\b/, (match) => match.toLowerCase())}. My technical foundation spans ${topSkillList}, allowing me to quickly translate complex product requirements into resilient, test-driven production software.`
    : `Throughout my career, I have specialized in building reliable software solutions utilizing ${topSkillList}. I take pride in collaborating closely with cross-functional engineering squads, optimizing system latency, and driving velocity without sacrificing code quality.`;

  const paragraph3_alignment_closing = `I have long admired ${company}'s forward-thinking approach and would be thrilled to bring my passion for clean architecture, fast iteration, and user-centric problem solving to your engineering team. Thank you for your time and consideration—I look forward to discussing how my experience aligns with your team's goals.`;

  const signoff = `Sincerely,\n${profile.fullName || 'Candidate'}`;

  // 3-Sentence High-Response Recruiter InMail
  const recruiterInMail = `Hi ${options.hiringManagerName?.split(' ')[0] || 'there'},\n\nI noticed ${company} is currently hiring for a ${role} and wanted to reach out. In my recent role at ${topExp?.company || 'my current company'}, I ${topBullet.slice(0, 120).trim()}...\n\nI’d love to connect briefly if my background in ${topSkillList.split(',').slice(0, 2).join(' & ')} aligns with what you're looking for. Thanks!`;

  return {
    letterDate: todayFormatted,
    recipientGreeting: greeting,
    paragraph1_hook,
    paragraph2_achievements,
    paragraph3_alignment_closing,
    signoff,
    recruiterInMail,
  };
}

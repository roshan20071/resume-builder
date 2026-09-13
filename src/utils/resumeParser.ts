/**
 * Dual-Engine Single-Page Resume Builder
 * Intelligent Resume Text Parser & Classifier (Phase 3)
 *
 * Robustly extracts structured profile, experience, projects, skills, and education
 * from raw pasted or uploaded text.
 */

import type { ResumeData, WorkExperience, ProjectItem, SkillCategory, EducationItem } from '../types/resume';
import { createEmptyResume } from '../schema/resume.schema';

/**
 * Extracts date range information from a line of text.
 * Returns start date, end date, isCurrent flag, and the line with date removed.
 */
function extractDateInfo(line: string): {
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  cleanedLine: string;
  isDateOnly: boolean;
} {
  const monthPattern =
    '(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)';

  // Date range with months: e.g. "Aug 2021 - Present", "May 2019 – Dec 2022"
  const monthYearRangeRegex = new RegExp(
    `(${monthPattern}\\.?\\s+\\d{4})\\s*[-–—to]+\\s*(Present|Current|${monthPattern}\\.?\\s+\\d{4}|\\d{4})`,
    'i'
  );

  // Pure year range: e.g. "2020 - 2024", "2021 – Present"
  const yearRangeRegex = /\b(19\d{2}|20\d{2})\s*[-–—to]+\s*(Present|Current|19\d{2}|20\d{2})\b/i;

  // Slash/dot format: e.g. "05/2019 - 08/2022", "06.2020 – Present"
  const numericRangeRegex = /\b(\d{1,2}[./]\d{4})\s*[-–—to]+\s*(Present|Current|\d{1,2}[./]\d{4})\b/i;

  // Single year: e.g. "2024" or "Class of 2024"
  const singleYearRegex = /\b(?:Graduating|Class of|Expected|Completed)?\s*(20\d{2})\b/i;

  let match = line.match(monthYearRangeRegex);
  if (match) {
    const isCurrent = /present|current/i.test(match[2]);
    const cleaned = line.replace(match[0], '').replace(/\(\s*\)/, '').trim();
    return {
      startDate: match[1].trim(),
      endDate: isCurrent ? 'Present' : match[2].trim(),
      isCurrent,
      cleanedLine: cleaned,
      isDateOnly: cleaned.replace(/[-–—|,\s]/g, '').length === 0,
    };
  }

  match = line.match(numericRangeRegex);
  if (match) {
    const isCurrent = /present|current/i.test(match[2]);
    const cleaned = line.replace(match[0], '').replace(/\(\s*\)/, '').trim();
    return {
      startDate: match[1].trim(),
      endDate: isCurrent ? 'Present' : match[2].trim(),
      isCurrent,
      cleanedLine: cleaned,
      isDateOnly: cleaned.replace(/[-–—|,\s]/g, '').length === 0,
    };
  }

  match = line.match(yearRangeRegex);
  if (match) {
    const isCurrent = /present|current/i.test(match[2]);
    const cleaned = line.replace(match[0], '').replace(/\(\s*\)/, '').trim();
    return {
      startDate: match[1].trim(),
      endDate: isCurrent ? 'Present' : match[2].trim(),
      isCurrent,
      cleanedLine: cleaned,
      isDateOnly: cleaned.replace(/[-–—|,\s]/g, '').length === 0,
    };
  }

  const singleMatch = line.match(singleYearRegex);
  if (singleMatch) {
    const cleaned = line.replace(singleMatch[0], '').replace(/\(\s*\)/, '').trim();
    return {
      startDate: '',
      endDate: singleMatch[1].trim(),
      isCurrent: false,
      cleanedLine: cleaned,
      isDateOnly: cleaned.replace(/[-–—|,\s]/g, '').length === 0,
    };
  }

  return {
    startDate: '',
    endDate: '',
    isCurrent: false,
    cleanedLine: line,
    isDateOnly: false,
  };
}

/**
 * Parses raw text from a pasted or extracted resume into structured ResumeData
 */
export function parseRawResumeText(rawText: string): ResumeData {
  const resume = createEmptyResume();
  const lines = rawText.split('\n').map((l) => l.trim()).filter(Boolean);

  if (lines.length === 0) return resume;

  // 1. Extract Email
  const emailMatch = rawText.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/);
  if (emailMatch) {
    resume.profile.email = emailMatch[0];
  }

  // 2. Extract Phone Number
  const phoneMatch = rawText.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) {
    resume.profile.phone = phoneMatch[0];
  }

  // 3. Extract Links
  const linkedinMatch = rawText.match(/(?:linkedin\.com\/in\/[\w-]+)/i);
  if (linkedinMatch) {
    resume.profile.linkedin = linkedinMatch[0];
  }

  const githubMatch = rawText.match(/(?:github\.com\/[\w-]+)/i);
  if (githubMatch) {
    resume.profile.github = githubMatch[0];
  }

  // Portfolio / Website Match
  const webMatch = rawText.match(
    /\bhttps?:\/\/(?!(?:www\.)?(?:github|linkedin)\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?\b/i
  );
  if (webMatch) {
    resume.profile.website = webMatch[0];
  }

  // Location detection: City, State/Country pattern
  const locationMatch = rawText.match(
    /\b([A-Z][a-zA-Z\s.-]+,\s*(?:[A-Z]{2}|[A-Z][a-zA-Z\s]+))\b/
  );
  if (
    locationMatch &&
    locationMatch[1].length < 35 &&
    !/university|college|school|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/i.test(locationMatch[1])
  ) {
    resume.profile.location = locationMatch[1].trim();
  }

  // 4. Candidate Name & Role (First 2 clean lines)
  const candidateNameLine = lines.find(
    (l) =>
      !l.includes('@') &&
      !l.includes('http') &&
      !l.includes('linkedin') &&
      !l.includes('github') &&
      !/\d{3}[-.\s]?\d{3}/.test(l) &&
      l.length >= 2 &&
      l.length < 40 &&
      !/^(resume|curriculum|cv|summary|experience|skills|education|projects|profile)$/i.test(l)
  );

  if (candidateNameLine) {
    resume.profile.fullName = candidateNameLine.replace(/[|,•].*$/, '').trim();
  }

  // Next non-contact line is likely candidate target role
  const nameIdx = candidateNameLine ? lines.indexOf(candidateNameLine) : -1;
  if (nameIdx !== -1 && lines[nameIdx + 1]) {
    const potentialRole = lines[nameIdx + 1];
    if (
      potentialRole.length < 60 &&
      !potentialRole.includes('@') &&
      !potentialRole.includes('http') &&
      !/\d{3}[-.\s]?\d{3}/.test(potentialRole) &&
      !/^(resume|summary|experience|skills|education|projects)$/i.test(potentialRole)
    ) {
      resume.profile.targetRole = potentialRole.replace(/[|,•].*$/, '').trim();
    }
  }

  // 5. Section Segmentation
  let currentSection = 'summary';
  const experienceNodes: WorkExperience[] = [];
  const projectNodes: ProjectItem[] = [];
  const skillsCategories: SkillCategory[] = [];
  const educationNodes: EducationItem[] = [];
  const summaryLines: string[] = [];

  let currentExp: WorkExperience | null = null;
  let currentProj: ProjectItem | null = null;
  let currentSkillCat: SkillCategory | null = null;
  let currentEdu: EducationItem | null = null;

  const ROLE_TITLE_REGEX =
    /\b(engineer|developer|architect|lead|manager|specialist|consultant|analyst|designer|intern|director|scientist|officer|administrator|programmer|coordinator)\b/i;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check section header triggers (ensure they aren't category lines with colons like "Languages: Python")
    const isSectionHeaderCandidate = !line.includes(':') || line.split(':')[1]?.trim() === '';
    
    if (isSectionHeaderCandidate) {
      if (/^(experience|work\s+experience|employment\s+history|professional\s+experience|work\s+history)\b/i.test(line)) {
        currentSection = 'experience';
        continue;
      } else if (/^(projects|technical\s+projects|personal\s+projects|featured\s+projects|key\s+projects|selected\s+projects)\b/i.test(line)) {
        currentSection = 'projects';
        continue;
      } else if (/^(skills|technical\s+skills|technologies|core\s+competencies|tools\s*(&|and)\s*frameworks|tech\s+stack)\b/i.test(line)) {
        currentSection = 'skills';
        continue;
      } else if (/^(education|academic\s+background|degrees|academic\s+history|academics)\b/i.test(line)) {
        currentSection = 'education';
        continue;
      } else if (/^(summary|professional\s+summary|about\s+me|profile|career\s+objective)\b/i.test(line)) {
        currentSection = 'summary';
        continue;
      }
    }

    // Ignore candidate header lines if encountered again
    if (line === resume.profile.fullName || line === resume.profile.targetRole) {
      continue;
    }

    // SECTION HANDLING
    if (currentSection === 'summary') {
      if (!line.includes('@') && !line.includes('http') && line.length > 20) {
        summaryLines.push(line);
      }
    } else if (currentSection === 'experience') {
      const isBulletPrefix = /^[-•*▪▫◦–—]\s*/.test(line);
      const dateInfo = extractDateInfo(line);
      const hasRoleTitle = ROLE_TITLE_REGEX.test(line);
      const isSeparatorLine = /[-–—|,]\s*/.test(line);

      // Standalone date line following a newly created role: update dates on currentExp instead of making new role
      if (dateInfo.isDateOnly && currentExp && currentExp.bullets.length === 0) {
        if (dateInfo.startDate) currentExp.startDate = dateInfo.startDate;
        if (dateInfo.endDate) currentExp.endDate = dateInfo.endDate;
        currentExp.isCurrent = dateInfo.isCurrent || dateInfo.endDate === 'Present';
        continue;
      }

      // Determine if this is a new position header
      const isNewPosition =
        !isBulletPrefix &&
        ((dateInfo.startDate && !dateInfo.isDateOnly) ||
          (hasRoleTitle && isSeparatorLine) ||
          (!currentExp && line.length < 80));

      if (isNewPosition) {
        const cleaned = dateInfo.cleanedLine;
        const tokens = cleaned.split(/\s+[-–—|]\s+|\s*,\s*|\s+at\s+/i).map((t) => t.trim()).filter(Boolean);

        let position = 'Software Engineer';
        let company = 'Company';
        let loc = '';

        if (tokens.length >= 2) {
          if (ROLE_TITLE_REGEX.test(tokens[0])) {
            position = tokens[0];
            company = tokens[1];
            loc = tokens[2] || '';
          } else {
            company = tokens[0];
            position = tokens[1];
            loc = tokens[2] || '';
          }
        } else if (tokens.length === 1) {
          if (ROLE_TITLE_REGEX.test(tokens[0])) {
            position = tokens[0];
          } else {
            company = tokens[0];
          }
        }

        currentExp = {
          id: `exp-parsed-${Date.now()}-${experienceNodes.length}`,
          company: company || 'Organization',
          position: position || 'Engineer',
          location: loc,
          startDate: dateInfo.startDate || '2022',
          endDate: dateInfo.endDate || (dateInfo.isCurrent ? 'Present' : '2024'),
          isCurrent: dateInfo.isCurrent || dateInfo.endDate === 'Present',
          bullets: [],
        };
        experienceNodes.push(currentExp);
      } else if (currentExp) {
        // Bullet point for current position
        const bulletCleaned = line.replace(/^[-•*▪▫◦–—]\s*/, '').trim();
        if (bulletCleaned.length > 5) {
          currentExp.bullets.push({
            id: `b-parsed-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            text: bulletCleaned,
          });
        }
      }
    } else if (currentSection === 'projects') {
      const isBulletPrefix = /^[-•*▪▫◦–—]\s*/.test(line);
      const dateInfo = extractDateInfo(line);

      // A new project if it has no bullet prefix and isn't overly long
      if (!isBulletPrefix && line.length < 100) {
        let name = dateInfo.cleanedLine;
        let technologies: string[] = [];

        // Extract tech stack inside parentheses: e.g. "Distributed Key-Value Store (Go, Raft, Docker, gRPC)"
        const parenMatch = name.match(/\(([^)]+)\)/);
        if (parenMatch) {
          technologies = parenMatch[1]
            .split(/[,;|]+/)
            .map((t) => t.trim())
            .filter(Boolean);
          name = name.replace(parenMatch[0], '').trim();
        } else if (name.includes('|')) {
          const parts = name.split('|');
          name = parts[0].trim();
          technologies = parts[1]
            .split(/[,;]+/)
            .map((t) => t.trim())
            .filter(Boolean);
        }

        // Clean trailing separators but preserve hyphenated words like "Key-Value"
        name = name.replace(/\s+[-–—|]\s+.*$/, '').trim();

        currentProj = {
          id: `proj-parsed-${Date.now()}-${projectNodes.length}`,
          name: name || 'Featured Project',
          technologies,
          startDate: dateInfo.startDate,
          endDate: dateInfo.endDate,
          bullets: [],
        };
        projectNodes.push(currentProj);
      } else if (currentProj) {
        const bulletCleaned = line.replace(/^[-•*▪▫◦–—]\s*/, '').trim();
        if (bulletCleaned.length > 5) {
          currentProj.bullets.push({
            id: `proj-b-parsed-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            text: bulletCleaned,
          });
        }
      }
    } else if (currentSection === 'skills') {
      // Check if line is categorized: e.g. "Languages: JavaScript, TypeScript, Python"
      const colonIdx = line.indexOf(':');
      if (colonIdx > 0 && colonIdx < 30) {
        const categoryName = line.substring(0, colonIdx).trim();
        const skillList = line
          .substring(colonIdx + 1)
          .split(/[,;•|]+|\s{2,}/)
          .map((s) => s.trim())
          .filter((s) => s.length > 1);

        if (skillList.length > 0) {
          skillsCategories.push({
            id: `skill-cat-parsed-${skillsCategories.length + 1}`,
            categoryName: categoryName || 'Technical Skills',
            skills: skillList,
          });
        }
      } else {
        // Uncategorized skill line - split on delimiters only (commas, semicolons, bullets, pipes)
        // PRESERVES multi-word terms like "Machine Learning", "System Design", "React Native"
        const tokens = line
          .split(/[,;•|]+|\s{2,}/)
          .map((t) => t.trim())
          .filter((t) => t.length > 1);

        if (tokens.length > 0) {
          if (!currentSkillCat) {
            currentSkillCat = {
              id: `skill-cat-parsed-${skillsCategories.length + 1}`,
              categoryName: 'Core Skills & Technologies',
              skills: [],
            };
            skillsCategories.push(currentSkillCat);
          }
          currentSkillCat.skills.push(...tokens);
        }
      }
    } else if (currentSection === 'education') {
      const dateInfo = extractDateInfo(line);
      const cleaned = dateInfo.cleanedLine;

      // Standalone date line following school: update dates on currentEdu
      if (dateInfo.isDateOnly && currentEdu && !currentEdu.startDate) {
        currentEdu.startDate = dateInfo.startDate || '';
        currentEdu.endDate = dateInfo.endDate || '';
        continue;
      }

      // Check for degree mentions
      const degreeMatch = cleaned.match(
        /\b(Bachelor(?:'s)?(?:\s+of\s+[A-Za-z]+)?|B\.?S\.?|B\.?A\.?|B\.?Tech|B\.?E\.?|Master(?:'s)?(?:\s+of\s+[A-Za-z]+)?|M\.?S\.?|M\.?Tech|Ph\.?D\.?|MBA|Associate)\b/i
      );

      // Check for GPA
      const gpaMatch = cleaned.match(/\b(?:GPA:?\s*|cum:\s*)?([34]\.\d{1,2}(?:\s*\/\s*4\.0)?)\b/i);
      const gpa = gpaMatch ? gpaMatch[1] : undefined;

      // If this line contains degree and we already have an institution waiting
      if (degreeMatch && currentEdu && currentEdu.degree === 'Bachelor of Science' && currentEdu.fieldOfStudy === 'Computer Science') {
        currentEdu.degree = degreeMatch[0];
        const remaining = cleaned.replace(degreeMatch[0], '').replace(/[-–—|,|@]+/g, ' ').replace(/\bgpa:?.*$/i, '').trim();
        if (remaining) {
          currentEdu.fieldOfStudy = remaining;
        }
        if (gpa) currentEdu.gpa = gpa;
        if (dateInfo.endDate) {
          currentEdu.startDate = dateInfo.startDate;
          currentEdu.endDate = dateInfo.endDate;
        }
        continue;
      }

      const tokens = cleaned.split(/\s+[-–—|]\s+|\s*,\s*/).map((t) => t.trim()).filter(Boolean);

      if (tokens.length > 0) {
        let institution = tokens[0];
        let degree = degreeMatch ? degreeMatch[0] : 'Bachelor of Science';
        let fieldOfStudy = 'Computer Science';

        if (tokens.length >= 3) {
          institution = tokens[0];
          degree = tokens[1];
          fieldOfStudy = tokens[2];
        } else if (tokens.length === 2) {
          institution = tokens[0];
          fieldOfStudy = tokens[1];
        }

        currentEdu = {
          id: `edu-parsed-${Date.now()}-${educationNodes.length}`,
          institution: institution || 'University',
          degree: degree || 'Bachelor of Science',
          fieldOfStudy: fieldOfStudy.replace(/\bgpa.*$/i, '').trim() || 'Computer Science',
          startDate: dateInfo.startDate || '2018',
          endDate: dateInfo.endDate || '2022',
          gpa,
        };
        educationNodes.push(currentEdu);
      }
    }
  }

  // Post-process summary
  if (summaryLines.length > 0 && !resume.profile.summary) {
    resume.profile.summary = summaryLines.join(' ').substring(0, 600).trim();
  }

  // Post-process experience
  if (experienceNodes.length > 0) {
    resume.experience = experienceNodes;
  }

  // Post-process projects
  if (projectNodes.length > 0) {
    resume.projects = projectNodes;
  }

  // Post-process skills
  if (skillsCategories.length > 0) {
    // Deduplicate skills in each category
    skillsCategories.forEach((cat) => {
      cat.skills = Array.from(new Set(cat.skills));
    });
    resume.skills = skillsCategories;
  }

  // Post-process education
  if (educationNodes.length > 0) {
    resume.education = educationNodes;
  }

  return resume;
}

export const parseResumeText = parseRawResumeText;

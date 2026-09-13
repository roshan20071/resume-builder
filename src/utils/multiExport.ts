/**
 * Dual-Engine Single-Page Resume Builder
 * Multi-Format Exporter (.doc, .md, .txt) (Phase 3)
 *
 * Full fidelity export respecting dynamic section ordering,
 * custom headings, and custom sections (certifications, awards, publications).
 */

import type { ResumeData, SectionId } from '../types/resume';
import { formatEducationDate, formatExperienceDate } from './dateFormatter';

/**
 * Downloads a file with specific mime-type and content in browser
 */
function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/**
 * Exports to Clean Word Document (.doc format using structured HTML)
 */
export function exportToWordDoc(data: ResumeData) {
  const { profile, experience, projects, skills, education, customSections, sectionConfig } = data;
  const { order, visibility, customTitles } = sectionConfig;
  const name = profile.fullName || 'Resume';

  const isVisible = (id: SectionId) => visibility?.[id] !== false;

  const sectionsHtml: string[] = [];

  for (const sectionId of order) {
    if (!isVisible(sectionId)) continue;

    switch (sectionId) {
      case 'summary':
        if (profile.summary) {
          sectionsHtml.push(`
            <h2>${customTitles.summary || 'Professional Summary'}</h2>
            <p>${profile.summary}</p>
          `);
        }
        break;

      case 'experience':
        if (experience && experience.length > 0) {
          const expItems = experience
            .map(
              (exp) => `
            <div style="margin-bottom: 8px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td class="job-title" style="text-align: left;">${exp.position} — ${exp.company}</td>
                  <td style="text-align: right; font-style: italic; color: #555;">${formatExperienceDate(
                    exp.startDate,
                    exp.endDate,
                    exp.isCurrent
                  )}</td>
                </tr>
              </table>
              ${exp.location ? `<div class="job-meta">${exp.location}</div>` : ''}
              ${
                exp.bullets && exp.bullets.length > 0
                  ? `<ul>${exp.bullets.map((b) => `<li>${b.text}</li>`).join('')}</ul>`
                  : ''
              }
            </div>
          `
            )
            .join('');

          sectionsHtml.push(`
            <h2>${customTitles.experience || 'Work Experience'}</h2>
            ${expItems}
          `);
        }
        break;

      case 'projects':
        if (projects && projects.length > 0) {
          const projItems = projects
            .map(
              (proj) => `
            <div style="margin-bottom: 8px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td class="job-title" style="text-align: left;">
                    ${proj.name} ${
                proj.technologies && proj.technologies.length > 0
                  ? `<span style="font-weight: normal; color: #555;">(${proj.technologies.join(', ')})</span>`
                  : ''
              }
                  </td>
                  ${
                    proj.startDate
                      ? `<td style="text-align: right; font-style: italic; color: #555;">${formatExperienceDate(
                          proj.startDate,
                          proj.endDate
                        )}</td>`
                      : ''
                  }
                </tr>
              </table>
              ${proj.summary ? `<p style="margin: 2px 0; font-style: italic;">${proj.summary}</p>` : ''}
              ${
                proj.bullets && proj.bullets.length > 0
                  ? `<ul>${proj.bullets.map((b) => `<li>${b.text}</li>`).join('')}</ul>`
                  : ''
              }
            </div>
          `
            )
            .join('');

          sectionsHtml.push(`
            <h2>${customTitles.projects || 'Technical Projects'}</h2>
            ${projItems}
          `);
        }
        break;

      case 'skills':
        if (skills && skills.length > 0) {
          const skillsList = skills
            .map(
              (s) =>
                `<p style="margin: 3px 0;"><strong>${s.categoryName}:</strong> ${s.skills.join(', ')}</p>`
            )
            .join('');

          sectionsHtml.push(`
            <h2>${customTitles.skills || 'Technical Skills'}</h2>
            ${skillsList}
          `);
        }
        break;

      case 'education':
        if (education && education.length > 0) {
          const eduItems = education
            .map(
              (edu) => `
            <div style="margin-bottom: 6px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td class="job-title" style="text-align: left;">${edu.institution}</td>
                  <td style="text-align: right; font-style: italic; color: #555;">${formatEducationDate(
                    edu.startDate,
                    edu.endDate
                  )}</td>
                </tr>
              </table>
              <div>${edu.degree} in ${edu.fieldOfStudy}${edu.gpa ? ` (GPA: ${edu.gpa})` : ''}</div>
              ${edu.honors ? `<p style="margin: 1px 0; font-size: 9.5pt;">Honors: ${edu.honors}</p>` : ''}
            </div>
          `
            )
            .join('');

          sectionsHtml.push(`
            <h2>${customTitles.education || 'Education'}</h2>
            ${eduItems}
          `);
        }
        break;

      case 'custom':
      case 'certifications':
        if (customSections && customSections.length > 0) {
          for (const sec of customSections) {
            const itemsHtml = sec.items
              .map(
                (it) => `
              <div style="margin-bottom: 4px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="font-weight: bold;">${it.title}</td>
                    ${it.date ? `<td style="text-align: right; font-style: italic; color: #555;">${it.date}</td>` : ''}
                  </tr>
                </table>
                ${it.description ? `<p style="margin: 1px 0;">${it.description}</p>` : ''}
              </div>
            `
              )
              .join('');

            sectionsHtml.push(`
              <h2>${sec.sectionTitle || 'Certifications & Honors'}</h2>
              ${itemsHtml}
            `);
          }
        }
        break;

      default:
        break;
    }
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${name} - Resume</title>
      <style>
        body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 10.5pt; line-height: 1.35; color: #111; }
        h1 { font-size: 18pt; text-align: center; margin: 0 0 4px 0; text-transform: uppercase; }
        .contact { text-align: center; font-size: 9.5pt; margin-bottom: 14px; }
        h2 { font-size: 12pt; border-bottom: 1px solid #333; margin: 12px 0 6px 0; text-transform: uppercase; }
        .job-title { font-weight: bold; }
        .job-meta { font-style: italic; color: #444; }
        ul { margin: 4px 0 8px 20px; padding: 0; }
        li { margin-bottom: 3px; }
      </style>
    </head>
    <body>
      <h1>${profile.fullName}</h1>
      <div class="contact">
        ${[
          profile.targetRole,
          profile.location,
          profile.email,
          profile.phone,
          profile.linkedin,
          profile.github,
          profile.website,
        ]
          .filter(Boolean)
          .join(' | ')}
      </div>

      ${sectionsHtml.join('')}
    </body>
    </html>
  `;

  downloadFile(htmlContent, `${name.replace(/\s+/g, '_')}_Resume.doc`, 'application/msword');
}

/**
 * Exports to clean GitHub-Flavored Markdown (.md)
 */
export function exportToMarkdown(data: ResumeData) {
  const { profile, experience, projects, skills, education, customSections, sectionConfig } = data;
  const { order, visibility, customTitles } = sectionConfig;
  const name = profile.fullName || 'Resume';

  const isVisible = (id: SectionId) => visibility?.[id] !== false;

  let md = `# ${profile.fullName}\n`;
  if (profile.targetRole) md += `**${profile.targetRole}**\n\n`;
  md += `${[
    profile.location,
    profile.email,
    profile.phone,
    profile.linkedin,
    profile.github,
    profile.website,
  ]
    .filter(Boolean)
    .join(' • ')}\n\n---\n\n`;

  for (const sectionId of order) {
    if (!isVisible(sectionId)) continue;

    switch (sectionId) {
      case 'summary':
        if (profile.summary) {
          md += `## ${customTitles.summary || 'Summary'}\n${profile.summary}\n\n`;
        }
        break;

      case 'experience':
        if (experience && experience.length > 0) {
          md += `## ${customTitles.experience || 'Work Experience'}\n\n`;
          for (const exp of experience) {
            md += `### ${exp.position} — ${exp.company}\n`;
            md += `*${formatExperienceDate(exp.startDate, exp.endDate, exp.isCurrent)}${
              exp.location ? ` | ${exp.location}` : ''
            }*\n\n`;
            for (const b of exp.bullets) {
              md += `- ${b.text}\n`;
            }
            md += `\n`;
          }
        }
        break;

      case 'projects':
        if (projects && projects.length > 0) {
          md += `## ${customTitles.projects || 'Technical Projects'}\n\n`;
          for (const p of projects) {
            md += `### ${p.name} ${p.technologies?.length > 0 ? `(${p.technologies.join(', ')})` : ''}\n`;
            if (p.summary) md += `*${p.summary}*\n\n`;
            for (const b of p.bullets) {
              md += `- ${b.text}\n`;
            }
            md += `\n`;
          }
        }
        break;

      case 'skills':
        if (skills && skills.length > 0) {
          md += `## ${customTitles.skills || 'Technical Skills'}\n\n`;
          for (const s of skills) {
            md += `- **${s.categoryName}:** ${s.skills.join(', ')}\n`;
          }
          md += `\n`;
        }
        break;

      case 'education':
        if (education && education.length > 0) {
          md += `## ${customTitles.education || 'Education'}\n\n`;
          for (const edu of education) {
            md += `- **${edu.institution}**: ${edu.degree} in ${edu.fieldOfStudy} (${formatEducationDate(
              edu.startDate,
              edu.endDate
            )})${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}\n`;
          }
          md += `\n`;
        }
        break;

      case 'custom':
      case 'certifications':
        if (customSections && customSections.length > 0) {
          for (const sec of customSections) {
            md += `## ${sec.sectionTitle || 'Certifications & Honors'}\n\n`;
            for (const it of sec.items) {
              md += `### ${it.title}${it.date ? ` (${it.date})` : ''}\n`;
              if (it.description) md += `${it.description}\n\n`;
            }
          }
        }
        break;

      default:
        break;
    }
  }

  downloadFile(md, `${name.replace(/\s+/g, '_')}_Resume.md`, 'text/markdown');
}

/**
 * Exports to clean Plain Text (.txt) for application portals
 */
export function exportToPlainText(data: ResumeData) {
  const { profile, experience, projects, skills, education, customSections, sectionConfig } = data;
  const { order, visibility, customTitles } = sectionConfig;
  const name = profile.fullName || 'Resume';

  const isVisible = (id: SectionId) => visibility?.[id] !== false;

  let txt = `${profile.fullName.toUpperCase()}\n`;
  if (profile.targetRole) txt += `${profile.targetRole}\n`;
  txt += `${[
    profile.location,
    profile.email,
    profile.phone,
    profile.linkedin,
    profile.github,
    profile.website,
  ]
    .filter(Boolean)
    .join(' | ')}\n\n`;

  for (const sectionId of order) {
    if (!isVisible(sectionId)) continue;

    switch (sectionId) {
      case 'summary':
        if (profile.summary) {
          txt += `${(customTitles.summary || 'SUMMARY').toUpperCase()}\n${profile.summary}\n\n`;
        }
        break;

      case 'experience':
        if (experience && experience.length > 0) {
          txt += `${(customTitles.experience || 'EXPERIENCE').toUpperCase()}\n\n`;
          for (const exp of experience) {
            txt += `${exp.position.toUpperCase()} - ${exp.company}\n`;
            txt += `${formatExperienceDate(exp.startDate, exp.endDate, exp.isCurrent)}${
              exp.location ? ` | ${exp.location}` : ''
            }\n`;
            for (const b of exp.bullets) {
              txt += `• ${b.text}\n`;
            }
            txt += `\n`;
          }
        }
        break;

      case 'projects':
        if (projects && projects.length > 0) {
          txt += `${(customTitles.projects || 'TECHNICAL PROJECTS').toUpperCase()}\n\n`;
          for (const p of projects) {
            txt += `${p.name.toUpperCase()}${p.technologies?.length > 0 ? ` (${p.technologies.join(', ')})` : ''}\n`;
            if (p.summary) txt += `${p.summary}\n`;
            for (const b of p.bullets) {
              txt += `• ${b.text}\n`;
            }
            txt += `\n`;
          }
        }
        break;

      case 'skills':
        if (skills && skills.length > 0) {
          txt += `${(customTitles.skills || 'TECHNICAL SKILLS').toUpperCase()}\n`;
          for (const s of skills) {
            txt += `${s.categoryName}: ${s.skills.join(', ')}\n`;
          }
          txt += `\n`;
        }
        break;

      case 'education':
        if (education && education.length > 0) {
          txt += `${(customTitles.education || 'EDUCATION').toUpperCase()}\n`;
          for (const edu of education) {
            txt += `${edu.institution} - ${edu.degree} in ${edu.fieldOfStudy} (${formatEducationDate(
              edu.startDate,
              edu.endDate
            )})${edu.gpa ? ` [GPA: ${edu.gpa}]` : ''}\n`;
          }
          txt += `\n`;
        }
        break;

      case 'custom':
      case 'certifications':
        if (customSections && customSections.length > 0) {
          for (const sec of customSections) {
            txt += `${(sec.sectionTitle || 'CERTIFICATIONS & HONORS').toUpperCase()}\n`;
            for (const it of sec.items) {
              txt += `• ${it.title}${it.date ? ` (${it.date})` : ''}\n`;
              if (it.description) txt += `  ${it.description}\n`;
            }
            txt += `\n`;
          }
        }
        break;

      default:
        break;
    }
  }

  downloadFile(txt, `${name.replace(/\s+/g, '_')}_Resume.txt`, 'text/plain');
}

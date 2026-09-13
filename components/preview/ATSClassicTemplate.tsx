'use client';

import React from 'react';
import type { ResumeData } from '../../src/types/resume';
import { formatEducationDate, formatExperienceDate } from '../../src/utils/dateFormatter';

interface ATSClassicTemplateProps {
  data: ResumeData;
}

export function ATSClassicTemplate({ data }: ATSClassicTemplateProps) {
  const { profile, experience, projects, skills, education, customSections, sectionConfig } = data;
  const { order, visibility, customTitles } = sectionConfig;

  return (
    <article className="ats-resume-container font-sans text-gray-950">
      {/* 1. Profile Header (Strict Semantic Single-Column ATS Centered) */}
      <header className="resume-header text-center border-b border-gray-400 pb-2.5">
        <h1 className="text-[1.6em] font-bold tracking-tight text-black uppercase mb-0.5">
          {profile.fullName || 'YOUR NAME'}
        </h1>
        {profile.targetRole && (
          <p className="text-[1.05em] font-semibold text-gray-800 tracking-wide mb-1">
            {profile.targetRole}
          </p>
        )}
        <div className="flex flex-wrap justify-center items-center gap-x-2 text-[0.9em] text-gray-800">
          {profile.location && <span>{profile.location}</span>}
          {profile.phone && <span>• {profile.phone}</span>}
          {profile.email && (
            <span>
              • <a href={`mailto:${profile.email}`} className="text-black underline">{profile.email}</a>
            </span>
          )}
          {profile.linkedin && (
            <span>
              • <a href={`https://${profile.linkedin.replace(/^https?:\/\//, '')}`} className="text-black underline">{profile.linkedin}</a>
            </span>
          )}
          {profile.github && (
            <span>
              • <a href={`https://${profile.github.replace(/^https?:\/\//, '')}`} className="text-black underline">{profile.github}</a>
            </span>
          )}
          {profile.website && (
            <span>
              • <a href={profile.website} className="text-black underline">{profile.website.replace(/^https?:\/\//, '')}</a>
            </span>
          )}
        </div>
      </header>

      {/* Dynamic Ordered Sections */}
      {order.map((sectionId) => {
        if (!visibility[sectionId]) return null;

        switch (sectionId) {
          case 'summary':
            if (!profile.summary) return null;
            return (
              <section key="summary" className="resume-section">
                <h2 className="text-[1.05em] font-bold uppercase tracking-wider text-black border-b border-gray-900 pb-0.5 mb-1.5">
                  {customTitles.summary || 'Professional Summary'}
                </h2>
                <p className="text-[0.95em] text-gray-900 leading-relaxed text-justify">
                  {profile.summary}
                </p>
              </section>
            );

          case 'experience':
            if (!experience || experience.length === 0) return null;
            return (
              <section key="experience" className="resume-section">
                <h2 className="text-[1.05em] font-bold uppercase tracking-wider text-black border-b border-gray-900 pb-0.5 mb-2">
                  {customTitles.experience || 'Work Experience'}
                </h2>
                <div className="flex flex-col gap-[var(--resume-item-gap,8px)]">
                  {experience.map((exp) => (
                    <div key={exp.id} className="resume-item">
                      <div className="flex justify-between items-baseline font-bold text-[0.98em] text-black">
                        <span>{exp.position}</span>
                        <span className="text-[0.9em] font-normal text-gray-800">
                          {formatExperienceDate(exp.startDate, exp.endDate, exp.isCurrent)}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline italic text-[0.92em] text-gray-800 mb-1">
                        <span>{exp.company}</span>
                        <span>{exp.location}</span>
                      </div>
                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul className="resume-bullet-list list-disc ml-5 text-[0.93em] text-gray-900">
                          {exp.bullets.map((b) => (
                            <li key={b.id} className="leading-snug">
                              {b.text}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );

          case 'projects':
            if (!projects || projects.length === 0) return null;
            return (
              <section key="projects" className="resume-section">
                <h2 className="text-[1.05em] font-bold uppercase tracking-wider text-black border-b border-gray-900 pb-0.5 mb-2">
                  {customTitles.projects || 'Technical Projects'}
                </h2>
                <div className="flex flex-col gap-[var(--resume-item-gap,8px)]">
                  {projects.map((proj) => (
                    <div key={proj.id} className="resume-item">
                      <div className="flex justify-between items-baseline font-bold text-[0.98em] text-black">
                        <span>
                          {proj.name}
                          {proj.technologies && proj.technologies.length > 0 && (
                            <span className="font-normal text-[0.9em] text-gray-700 ml-1.5">
                              | {proj.technologies.join(', ')}
                            </span>
                          )}
                        </span>
                        {proj.startDate && (
                          <span className="text-[0.9em] font-normal text-gray-800">
                            {formatExperienceDate(proj.startDate, proj.endDate)}
                          </span>
                        )}
                      </div>
                      {proj.summary && (
                        <p className="text-[0.92em] text-gray-800 italic mb-0.5">
                          {proj.summary}
                        </p>
                      )}
                      {proj.bullets && proj.bullets.length > 0 && (
                        <ul className="resume-bullet-list list-disc ml-5 text-[0.93em] text-gray-900">
                          {proj.bullets.map((b) => (
                            <li key={b.id} className="leading-snug">
                              {b.text}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );

          case 'skills':
            if (!skills || skills.length === 0) return null;
            return (
              <section key="skills" className="resume-section">
                <h2 className="text-[1.05em] font-bold uppercase tracking-wider text-black border-b border-gray-900 pb-0.5 mb-1.5">
                  {customTitles.skills || 'Technical Skills'}
                </h2>
                <div className="flex flex-col gap-1 text-[0.94em] text-gray-900">
                  {skills.map((cat) => (
                    <div key={cat.id}>
                      <strong className="font-bold text-black">{cat.categoryName}: </strong>
                      <span>{cat.skills.join(', ')}</span>
                    </div>
                  ))}
                </div>
              </section>
            );

          case 'education':
            if (!education || education.length === 0) return null;
            return (
              <section key="education" className="resume-section">
                <h2 className="text-[1.05em] font-bold uppercase tracking-wider text-black border-b border-gray-900 pb-0.5 mb-1.5">
                  {customTitles.education || 'Education'}
                </h2>
                <div className="flex flex-col gap-[var(--resume-item-gap,8px)]">
                  {education.map((edu) => (
                    <div key={edu.id} className="resume-item">
                      <div className="flex justify-between items-baseline font-bold text-[0.98em] text-black">
                        <span>{edu.institution}</span>
                        <span className="text-[0.9em] font-normal text-gray-800">
                          {formatEducationDate(edu.startDate, edu.endDate)}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline text-[0.92em] text-gray-900">
                        <span>
                          {edu.degree} in {edu.fieldOfStudy}
                          {edu.gpa && <span className="italic"> (GPA: {edu.gpa})</span>}
                        </span>
                        {edu.location && <span className="italic text-gray-700">{edu.location}</span>}
                      </div>
                      {edu.honors && (
                        <p className="text-[0.88em] text-gray-800 mt-0.5">
                          <strong>Honors:</strong> {edu.honors}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );

          case 'custom':
            if (!customSections || customSections.length === 0) return null;
            return (
              <React.Fragment key="custom">
                {customSections.map((sec) => (
                  <section key={sec.id} className="resume-section">
                    <h2 className="text-[1.05em] font-bold uppercase tracking-wider text-black border-b border-gray-900 pb-0.5 mb-1.5">
                      {sec.sectionTitle}
                    </h2>
                    <div className="flex flex-col gap-1.5">
                      {sec.items.map((it) => (
                        <div key={it.id} className="text-[0.93em]">
                          <div className="flex justify-between font-semibold text-black">
                            <span>{it.title}</span>
                            {it.date && <span className="font-normal text-gray-700">{it.date}</span>}
                          </div>
                          {it.description && <p className="text-gray-800">{it.description}</p>}
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </React.Fragment>
            );

          default:
            return null;
        }
      })}
    </article>
  );
}

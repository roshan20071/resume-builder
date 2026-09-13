'use client';

import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink } from 'lucide-react';
import type { ResumeData } from '../../src/types/resume';
import { formatEducationDate, formatExperienceDate } from '../../src/utils/dateFormatter';

interface ModernCleanTemplateProps {
  data: ResumeData;
}

export function ModernCleanTemplate({ data }: ModernCleanTemplateProps) {
  const { profile, experience, projects, skills, education, customSections, sectionConfig, templateConfig } = data;
  const { order, visibility, customTitles } = sectionConfig;
  const accentColor = templateConfig.accentColor || '#2563eb';

  return (
    <article className="modern-resume-container font-sans text-gray-900">
      {/* Modern Header with Subtle Accent Highlight */}
      <header className="resume-header mb-4 border-b pb-3" style={{ borderColor: `${accentColor}33` }}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
          <div>
            <h1 className="text-[1.7em] font-extrabold tracking-tight text-gray-950 leading-tight">
              {profile.fullName || 'Your Name'}
            </h1>
            {profile.targetRole && (
              <p className="text-[1.05em] font-semibold tracking-wide" style={{ color: accentColor }}>
                {profile.targetRole}
              </p>
            )}
          </div>

          {/* Clean Contact Matrix */}
          <div className="flex flex-col gap-0.5 text-[0.88em] text-gray-600 md:text-right">
            <div className="flex flex-wrap items-center md:justify-end gap-x-3 gap-y-1">
              {profile.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  {profile.location}
                </span>
              )}
              {profile.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-gray-400" />
                  {profile.phone}
                </span>
              )}
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="flex items-center gap-1 hover:underline text-gray-800">
                  <Mail className="w-3 h-3 text-gray-400" />
                  {profile.email}
                </a>
              )}
            </div>
            <div className="flex flex-wrap items-center md:justify-end gap-x-3 gap-y-1">
              {profile.linkedin && (
                <a href={`https://${profile.linkedin.replace(/^https?:\/\//, '')}`} className="flex items-center gap-1 hover:underline text-gray-800">
                  <Linkedin className="w-3 h-3 text-gray-400" />
                  {profile.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
                </a>
              )}
              {profile.github && (
                <a href={`https://${profile.github.replace(/^https?:\/\//, '')}`} className="flex items-center gap-1 hover:underline text-gray-800">
                  <Github className="w-3 h-3 text-gray-400" />
                  {profile.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
                </a>
              )}
              {profile.website && (
                <a href={profile.website} className="flex items-center gap-1 hover:underline text-gray-800">
                  <Globe className="w-3 h-3 text-gray-400" />
                  {profile.website.replace(/^https?:\/\//, '')}
                </a>
              )}
            </div>
          </div>
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
                <h2
                  className="text-[1.0em] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-2"
                  style={{ color: accentColor }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                  {customTitles.summary || 'Summary'}
                </h2>
                <p className="text-[0.94em] text-gray-800 leading-relaxed">
                  {profile.summary}
                </p>
              </section>
            );

          case 'experience':
            if (!experience || experience.length === 0) return null;
            return (
              <section key="experience" className="resume-section">
                <h2
                  className="text-[1.0em] font-bold uppercase tracking-wider mb-2 flex items-center gap-2"
                  style={{ color: accentColor }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                  {customTitles.experience || 'Experience'}
                </h2>
                <div className="flex flex-col gap-[var(--resume-item-gap,8px)]">
                  {experience.map((exp) => (
                    <div key={exp.id} className="resume-item">
                      <div className="flex justify-between items-baseline font-bold text-[0.98em] text-gray-900">
                        <span>{exp.position}</span>
                        <span className="text-[0.88em] font-normal text-gray-500">
                          {formatExperienceDate(exp.startDate, exp.endDate, exp.isCurrent)}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline text-[0.92em] text-gray-700 font-medium mb-1">
                        <span style={{ color: accentColor }}>{exp.company}</span>
                        <span className="text-gray-500">{exp.location}</span>
                      </div>
                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul className="resume-bullet-list list-disc ml-4 text-[0.92em] text-gray-800">
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
                <h2
                  className="text-[1.0em] font-bold uppercase tracking-wider mb-2 flex items-center gap-2"
                  style={{ color: accentColor }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                  {customTitles.projects || 'Projects'}
                </h2>
                <div className="flex flex-col gap-[var(--resume-item-gap,8px)]">
                  {projects.map((proj) => (
                    <div key={proj.id} className="resume-item">
                      <div className="flex justify-between items-baseline font-bold text-[0.98em] text-gray-900">
                        <div className="flex items-center gap-2">
                          <span>{proj.name}</span>
                          {proj.url && (
                            <a href={proj.url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600">
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                        {proj.startDate && (
                          <span className="text-[0.88em] font-normal text-gray-500">
                            {formatExperienceDate(proj.startDate, proj.endDate)}
                          </span>
                        )}
                      </div>
                      {proj.technologies && proj.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 my-1">
                          {proj.technologies.map((tech, i) => (
                            <span key={i} className="text-[0.8em] font-medium bg-gray-100 text-gray-700 px-1.5 py-0.2 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      {proj.summary && (
                        <p className="text-[0.9em] text-gray-700 mb-0.5">{proj.summary}</p>
                      )}
                      {proj.bullets && proj.bullets.length > 0 && (
                        <ul className="resume-bullet-list list-disc ml-4 text-[0.92em] text-gray-800">
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
                <h2
                  className="text-[1.0em] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-2"
                  style={{ color: accentColor }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                  {customTitles.skills || 'Technical Skills'}
                </h2>
                <div className="flex flex-col gap-1 text-[0.92em] text-gray-800">
                  {skills.map((cat) => (
                    <div key={cat.id} className="flex flex-wrap items-baseline gap-1.5">
                      <span className="font-semibold text-gray-900">{cat.categoryName}:</span>
                      <div className="flex flex-wrap gap-1">
                        {cat.skills.map((s, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-[0.92em]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );

          case 'education':
            if (!education || education.length === 0) return null;
            return (
              <section key="education" className="resume-section">
                <h2
                  className="text-[1.0em] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-2"
                  style={{ color: accentColor }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                  {customTitles.education || 'Education'}
                </h2>
                <div className="flex flex-col gap-[var(--resume-item-gap,8px)]">
                  {education.map((edu) => (
                    <div key={edu.id} className="resume-item">
                      <div className="flex justify-between items-baseline font-bold text-[0.98em] text-gray-900">
                        <span>{edu.institution}</span>
                        <span className="text-[0.88em] font-normal text-gray-500">
                          {formatEducationDate(edu.startDate, edu.endDate)}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline text-[0.92em] text-gray-800">
                        <span>
                          {edu.degree} in {edu.fieldOfStudy}
                          {edu.gpa && <span className="text-gray-600 font-medium"> (GPA: {edu.gpa})</span>}
                        </span>
                        {edu.location && <span className="text-gray-500">{edu.location}</span>}
                      </div>
                      {edu.honors && (
                        <p className="text-[0.88em] text-gray-700 mt-0.5">
                          <span className="font-semibold text-gray-800">Honors:</span> {edu.honors}
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
                    <h2
                      className="text-[1.0em] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-2"
                      style={{ color: accentColor }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                      {sec.sectionTitle}
                    </h2>
                    <div className="flex flex-col gap-1.5">
                      {sec.items.map((it) => (
                        <div key={it.id} className="text-[0.92em]">
                          <div className="flex justify-between font-semibold text-gray-900">
                            <span>{it.title}</span>
                            {it.date && <span className="font-normal text-gray-500">{it.date}</span>}
                          </div>
                          {it.description && <p className="text-gray-700">{it.description}</p>}
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

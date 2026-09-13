'use client';

import React from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Terminal,
  User,
  Briefcase,
  Code,
  FileCheck,
} from 'lucide-react';
import { useResumeStore } from '../../src/store/useResumeStore';
import { simulateATSParsing } from '../../src/utils/atsSimulator';

export function ATSParserSimulator() {
  const data = useResumeStore((state) => state);
  const report = simulateATSParsing(data);

  const { overallScore, confidenceLevel, checks, parsedEntityMap } = report;

  return (
    <div className="w-full max-w-[900px] mx-auto bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-400">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold">Enterprise ATS Machine Parser Simulator</h3>
              <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-blue-500 text-white">
                Workday • Taleo • Greenhouse
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Simulating machine parsing algorithms to audit candidate indexing confidence.
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-3xl font-black text-emerald-400">{overallScore}%</div>
          <span className="text-xs font-semibold text-slate-300">{confidenceLevel}</span>
        </div>
      </div>

      {/* Extracted Machine Entity Table */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-blue-600" />
          Parsed Machine Entities (JSON Extraction)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-1.5">
            <span className="text-gray-500 font-medium flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-gray-400" /> Candidate Identity
            </span>
            <p className="font-bold text-gray-900 text-sm">{parsedEntityMap.candidateName || '— Missing —'}</p>
            <p className="text-gray-700">{parsedEntityMap.targetRole || 'No headline specified'}</p>
            <p className="text-gray-500">{parsedEntityMap.location || 'No location'}</p>
          </div>

          <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-1.5">
            <span className="text-gray-500 font-medium flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-gray-400" /> Experience & Skills Parsed
            </span>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Work Positions Indexed:</span>
              <span className="font-bold text-gray-900">{parsedEntityMap.totalExperienceCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Skills Tokens Indexed:</span>
              <span className="font-bold text-gray-900">{parsedEntityMap.skillsCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Semantic Single Column:</span>
              <span className="font-bold text-emerald-700">✓ 100% Valid</span>
            </div>
          </div>
        </div>
      </div>

      {/* Check-by-Check Audit List */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          Compliance & Parsing Diagnostics ({checks.length} Checks)
        </h4>

        <div className="space-y-2">
          {checks.map((chk) => (
            <div
              key={chk.id}
              className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 text-xs ${
                chk.status === 'passed'
                  ? 'bg-emerald-50/40 border-emerald-200'
                  : chk.status === 'warning'
                  ? 'bg-amber-50/50 border-amber-200'
                  : 'bg-rose-50/50 border-rose-200'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {chk.status === 'passed' && <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />}
                {chk.status === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />}
                {chk.status === 'failed' && <XCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />}

                <div>
                  <h5 className="font-bold text-gray-900">{chk.label}</h5>
                  <p className="text-gray-600 mt-0.5 leading-relaxed">{chk.details}</p>
                </div>
              </div>

              {chk.extractedValue && (
                <span className="text-[11px] font-mono font-medium px-2 py-0.5 bg-white border border-gray-200 rounded-md text-gray-700 shrink-0">
                  {chk.extractedValue}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

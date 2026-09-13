/**
 * Dual-Engine Single-Page Resume Builder
 * Line-Trim Advisor & Widow/Orphan Elimination Engine (Phase 2)
 *
 * Detects bullet points that spill onto a new line with only 1-3 words
 * (wasting ~18px vertical page budget) and generates concise rewordings to save a line.
 */

import type { ScaleLevel } from '../types/resume';

// Common wordy phrases and their high-impact, space-saving alternatives
const CONCISE_REPLACEMENTS: Array<{ pattern: RegExp; replacement: string; rationale: string }> = [
  { pattern: /\bresponsible for leading\b/gi, replacement: 'Led', rationale: 'Save 17 chars' },
  { pattern: /\bresponsible for managing\b/gi, replacement: 'Managed', rationale: 'Save 16 chars' },
  { pattern: /\bresponsible for the development of\b/gi, replacement: 'Developed', rationale: 'Save 26 chars' },
  { pattern: /\bresponsible for\b/gi, replacement: 'Led', rationale: 'Save 12 chars' },
  { pattern: /\bin order to\b/gi, replacement: 'to', rationale: 'Save 9 chars' },
  { pattern: /\bfor the purpose of\b/gi, replacement: 'to', rationale: 'Save 17 chars' },
  { pattern: /\bwith the goal of\b/gi, replacement: 'to', rationale: 'Save 15 chars' },
  { pattern: /\bwith the objective of\b/gi, replacement: 'to', rationale: 'Save 20 chars' },
  { pattern: /\bin an effort to\b/gi, replacement: 'to', rationale: 'Save 13 chars' },
  { pattern: /\butilizing the\b/gi, replacement: 'using', rationale: 'Save 8 chars' },
  { pattern: /\butilizing\b/gi, replacement: 'using', rationale: 'Save 4 chars' },
  { pattern: /\butilize\b/gi, replacement: 'use', rationale: 'Save 4 chars' },
  { pattern: /\butilized\b/gi, replacement: 'used', rationale: 'Save 4 chars' },
  { pattern: /\bplayed an active role in\b/gi, replacement: 'Co-led', rationale: 'Save 18 chars' },
  { pattern: /\bplayed a key role in\b/gi, replacement: 'Drove', rationale: 'Save 16 chars' },
  { pattern: /\bworked closely with\b/gi, replacement: 'Partnered with', rationale: 'Save 5 chars' },
  { pattern: /\bin close collaboration with\b/gi, replacement: 'with', rationale: 'Save 23 chars' },
  { pattern: /\bassisted in the creation of\b/gi, replacement: 'Co-created', rationale: 'Save 17 chars' },
  { pattern: /\bhelped in the implementation of\b/gi, replacement: 'Implemented', rationale: 'Save 20 chars' },
  { pattern: /\bhelped to\b/gi, replacement: 'Helped', rationale: 'Save 3 chars' },
  { pattern: /\bdue to the fact that\b/gi, replacement: 'because', rationale: 'Save 14 chars' },
  { pattern: /\bas a result of\b/gi, replacement: 'due to', rationale: 'Save 6 chars' },
  { pattern: /\ba wide variety of\b/gi, replacement: 'various', rationale: 'Save 10 chars' },
  { pattern: /\ba variety of\b/gi, replacement: 'various', rationale: 'Save 5 chars' },
  { pattern: /\ba large number of\b/gi, replacement: 'many', rationale: 'Save 13 chars' },
  { pattern: /\ba number of\b/gi, replacement: 'multiple', rationale: 'Save 3 chars' },
  { pattern: /\bat the present time\b/gi, replacement: 'currently', rationale: 'Save 10 chars' },
  { pattern: /\bat this point in time\b/gi, replacement: 'currently', rationale: 'Save 12 chars' },
  { pattern: /\bin a timely manner\b/gi, replacement: 'promptly', rationale: 'Save 10 chars' },
  { pattern: /\bon a daily basis\b/gi, replacement: 'daily', rationale: 'Save 11 chars' },
  { pattern: /\bon a weekly basis\b/gi, replacement: 'weekly', rationale: 'Save 11 chars' },
  { pattern: /\bon a monthly basis\b/gi, replacement: 'monthly', rationale: 'Save 11 chars' },
  { pattern: /\bon a regular basis\b/gi, replacement: 'regularly', rationale: 'Save 9 chars' },
  { pattern: /\bin terms of\b/gi, replacement: 'for', rationale: 'Save 9 chars' },
  { pattern: /\bprior to\b/gi, replacement: 'before', rationale: 'Save 2 chars' },
  { pattern: /\bhas the ability to\b/gi, replacement: 'can', rationale: 'Save 16 chars' },
  { pattern: /\bhave the ability to\b/gi, replacement: 'can', rationale: 'Save 17 chars' },
  { pattern: /\bworked on developing\b/gi, replacement: 'Developed', rationale: 'Save 11 chars' },
  { pattern: /\bworked on creating\b/gi, replacement: 'Created', rationale: 'Save 10 chars' },
  { pattern: /\bworked on building\b/gi, replacement: 'Built', rationale: 'Save 13 chars' },
  { pattern: /\bworked on designing\b/gi, replacement: 'Designed', rationale: 'Save 11 chars' },
  { pattern: /\bsuccessfully implemented\b/gi, replacement: 'Implemented', rationale: 'Save 13 chars' },
  { pattern: /\bsuccessfully deployed\b/gi, replacement: 'Deployed', rationale: 'Save 13 chars' },
  { pattern: /\bsuccessfully delivered\b/gi, replacement: 'Delivered', rationale: 'Save 13 chars' },
];

export interface LineTrimAnalysis {
  isWidowOrphan: boolean;
  estimatedLines: number;
  charsOnLastLine: number;
  charsToTrim: number;
  originalCharCount: number;
  suggestedText?: string;
  savedChars: number;
  explanation: string;
}

/**
 * Returns estimated characters per line based on active scale level (0-4)
 */
export function getCharsPerLineForScale(scaleLevel?: ScaleLevel): number {
  switch (scaleLevel) {
    case 0:
      return 80;
    case 1:
      return 86;
    case 2:
      return 91;
    case 3:
      return 95;
    case 4:
      return 100;
    default:
      return 88;
  }
}

/**
 * Analyzes a bullet point for single-page vertical line waste.
 * Dynamically adapts character capacity based on scaleLevel (0 to 4) or explicit charsPerLine.
 */
export function analyzeLineTrim(
  bulletText: string,
  optionsOrCharsPerLine?: number | { scaleLevel?: ScaleLevel; charsPerLine?: number }
): LineTrimAnalysis {
  let effectiveCharsPerLine = 88;

  if (typeof optionsOrCharsPerLine === 'number') {
    effectiveCharsPerLine = optionsOrCharsPerLine;
  } else if (optionsOrCharsPerLine && typeof optionsOrCharsPerLine === 'object') {
    if (optionsOrCharsPerLine.charsPerLine) {
      effectiveCharsPerLine = optionsOrCharsPerLine.charsPerLine;
    } else if (optionsOrCharsPerLine.scaleLevel !== undefined) {
      effectiveCharsPerLine = getCharsPerLineForScale(optionsOrCharsPerLine.scaleLevel);
    }
  }

  const text = bulletText.trim();
  const totalChars = text.length;

  if (totalChars <= effectiveCharsPerLine) {
    return {
      isWidowOrphan: false,
      estimatedLines: 1,
      charsOnLastLine: totalChars,
      charsToTrim: 0,
      originalCharCount: totalChars,
      savedChars: 0,
      explanation: 'Fits cleanly on 1 line.',
    };
  }

  const estimatedLines = Math.ceil(totalChars / effectiveCharsPerLine);
  const charsOnLastLine = totalChars % effectiveCharsPerLine || effectiveCharsPerLine;

  // A widow/orphan is when the last line has <= 22 characters (~1-3 words)
  const isWidowOrphan = charsOnLastLine <= 22 && estimatedLines > 1;

  if (!isWidowOrphan) {
    return {
      isWidowOrphan: false,
      estimatedLines,
      charsOnLastLine,
      charsToTrim: 0,
      originalCharCount: totalChars,
      savedChars: 0,
      explanation: 'Balanced line distribution.',
    };
  }

  // Attempt smart replacement
  let optimized = text;
  let savedCount = 0;

  for (const { pattern, replacement } of CONCISE_REPLACEMENTS) {
    if (pattern.test(optimized)) {
      const before = optimized.length;
      optimized = optimized.replace(pattern, replacement);
      savedCount += before - optimized.length;
    }
  }

  // If replacements shaved off enough characters to collapse the line
  const newEstimatedLines = Math.ceil(optimized.length / effectiveCharsPerLine);
  const savedALine = newEstimatedLines < estimatedLines;

  return {
    isWidowOrphan: true,
    estimatedLines,
    charsOnLastLine,
    charsToTrim: charsOnLastLine + 2,
    originalCharCount: totalChars,
    suggestedText: savedCount > 0 ? optimized : undefined,
    savedChars: savedCount,
    explanation: savedALine
      ? `Trim ${savedCount} chars to eliminate the trailing line and save ~18px vertical space!`
      : `Last line has only ${charsOnLastLine} chars (${text.split(' ').slice(-3).join(' ')}). Shorten slightly to pull back onto line ${estimatedLines - 1}.`,
  };
}

/**
 * Dual-Engine Single-Page Resume Builder
 * Physical Page Dimensions, DPI Standards & Scale Matrices (Phase 1)
 */

import type { PageSize, ScaleLevel, ScaleConfigValues, TemplateConfig } from '../types/resume';

/**
 * Standard Physical Dimensions
 * Screen DPI standard for CSS rendering is 96 DPI (1 inch = 96px, 1mm = 3.779527559px)
 */
export const PAGE_DIMENSIONS = {
  A4: {
    widthMm: 210,
    heightMm: 297,
    widthPx: 794,   // Math.round(210 * 3.7795)
    heightPx: 1123, // Math.round(297 * 3.7795)
    name: 'A4 (210 x 297 mm)',
  },
  Letter: {
    widthIn: 8.5,
    heightIn: 11.0,
    widthPx: 816,   // 8.5 * 96
    heightPx: 1056, // 11.0 * 96
    name: 'US Letter (8.5 x 11 in)',
  },
} as const;

/**
 * 5-Tier Safe Micro-Typography & Micro-Spacing Matrix
 * Designed to strictly preserve ATS machine parsing while eliminating accidental multi-page spills.
 */
export const SCALE_CONFIG_MATRIX: Record<ScaleLevel, ScaleConfigValues> = {
  0: {
    level: 0,
    fontSizePt: 10.5,
    fontSizePx: 14.0,
    lineHeight: 1.45,
    pagePaddingMm: 20,
    sectionGapPx: 18,
    itemGapPx: 10,
    bulletGapPx: 4,
    headerGapPx: 14,
  },
  1: {
    level: 1,
    fontSizePt: 10.0,
    fontSizePx: 13.33,
    lineHeight: 1.38,
    pagePaddingMm: 18,
    sectionGapPx: 14,
    itemGapPx: 8,
    bulletGapPx: 3,
    headerGapPx: 12,
  },
  2: {
    level: 2,
    fontSizePt: 9.5,
    fontSizePx: 12.67,
    lineHeight: 1.30,
    pagePaddingMm: 15,
    sectionGapPx: 12,
    itemGapPx: 6,
    bulletGapPx: 2,
    headerGapPx: 10,
  },
  3: {
    level: 3,
    fontSizePt: 9.0,
    fontSizePx: 12.0,
    lineHeight: 1.25,
    pagePaddingMm: 13,
    sectionGapPx: 10,
    itemGapPx: 5,
    bulletGapPx: 2,
    headerGapPx: 8,
  },
  4: {
    level: 4,
    fontSizePt: 8.5, // Lowest safe ATS threshold
    fontSizePx: 11.33,
    lineHeight: 1.20,
    pagePaddingMm: 10,
    sectionGapPx: 8,
    itemGapPx: 4,
    bulletGapPx: 1,
    headerGapPx: 6,
  },
};

/**
 * Returns physical target height in pixels based on page format
 */
export function getTargetPageHeightPx(pageSize: PageSize): number {
  return PAGE_DIMENSIONS[pageSize].heightPx;
}

/**
 * Returns physical target width in pixels based on page format
 */
export function getTargetPageWidthPx(pageSize: PageSize): number {
  return PAGE_DIMENSIONS[pageSize].widthPx;
}

/**
 * Generates dynamic CSS variables to inject directly onto the resume container.
 * This guarantees instantaneous, non-destructive UI reflows.
 */
export function generateAutoFitStyle(
  scaleLevel: ScaleLevel,
  templateConfig: Partial<TemplateConfig>
): React.CSSProperties & Record<string, string | number> {
  const config = SCALE_CONFIG_MATRIX[scaleLevel] || SCALE_CONFIG_MATRIX[1];
  const accentColor = templateConfig.accentColor || '#2563eb';

  return {
    '--resume-font-size': `${config.fontSizePt}pt`,
    '--resume-font-size-px': `${config.fontSizePx}px`,
    '--resume-line-height': `${config.lineHeight}`,
    '--resume-padding': `${config.pagePaddingMm}mm`,
    '--resume-section-gap': `${config.sectionGapPx}px`,
    '--resume-item-gap': `${config.itemGapPx}px`,
    '--resume-bullet-gap': `${config.bulletGapPx}px`,
    '--resume-header-gap': `${config.headerGapPx}px`,
    '--resume-accent-color': accentColor,
  };
}

/**
 * Maps font family key to system and safe web-font stacks
 */
export const FONT_FAMILY_STACKS: Record<string, string> = {
  inter: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  roboto: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  merriweather: "'Merriweather', Georgia, Cambria, 'Times New Roman', serif",
  times: "'Times New Roman', Times, Cambria, Georgia, serif",
  arial: "Arial, Helvetica, 'Liberation Sans', sans-serif",
  georgia: "Georgia, Cambria, 'Times New Roman', Times, serif",
  garamond: "Garamond, 'EB Garamond', 'Hoefler Text', 'Times New Roman', serif",
};

/**
 * Dual-Engine Single-Page Resume Builder
 * usePageAutoFit Hook (Zero-Flicker Architecture)
 *
 * Employs an off-screen clone sandbox for synchronous scale probing.
 * Never mutates live visible DOM across intermediate test steps,
 * completely eliminating layout jitter, flickering, and infinite reflow loops.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import type { ScaleLevel, PageSize, TemplateConfig } from '../types/resume';
import { usePageBudget } from './usePageBudget';
import {
  generateAutoFitStyle,
  SCALE_CONFIG_MATRIX,
  getTargetPageHeightPx,
  getTargetPageWidthPx,
  FONT_FAMILY_STACKS,
} from '../utils/pageDimensions';

export interface UsePageAutoFitProps {
  containerRef: React.RefObject<HTMLElement | null>;
  pageSize: PageSize;
  autoFitEnabled: boolean;
  manualScaleLevel: ScaleLevel;
  templateConfig: Partial<TemplateConfig>;
  onScaleChange?: (newLevel: ScaleLevel) => void;
  contentHash?: string;
}

export interface AutoFitSolveResult {
  success: boolean;
  scaleLevel: ScaleLevel;
  overflowDeltaPx: number;
}

export function usePageAutoFit({
  containerRef,
  pageSize,
  autoFitEnabled,
  manualScaleLevel,
  templateConfig,
  onScaleChange,
  contentHash,
}: UsePageAutoFitProps) {
  const [currentScaleLevel, setCurrentScaleLevel] = useState<ScaleLevel>(manualScaleLevel);
  const [isSolving, setIsSolving] = useState<boolean>(false);
  
  const solvingRef = useRef<boolean>(false);

  // Continuous page budget measurement for gauge
  const budget = usePageBudget(containerRef, {
    pageSize,
    debounceMs: 40,
  });

  // Sync manual level when Auto-Fit is disabled
  useEffect(() => {
    if (!autoFitEnabled) {
      setCurrentScaleLevel(manualScaleLevel);
    }
  }, [autoFitEnabled, manualScaleLevel]);

  /**
   * Off-screen Probe Solver
   * Clones container into an invisible off-screen sandbox to test scale tiers synchronously.
   * Only the final winning scale level is applied to the live component once.
   */
  const performAutoFitSolve = useCallback((): AutoFitSolveResult => {
    const container = containerRef.current;
    if (!container) {
      return { success: true, scaleLevel: currentScaleLevel, overflowDeltaPx: 0 };
    }

    solvingRef.current = true;
    setIsSolving(true);

    const maxHeight = getTargetPageHeightPx(pageSize);
    const targetWidth = getTargetPageWidthPx(pageSize);
    let bestLevel: ScaleLevel = 4; // Default to maximum compression if everything overflows
    let fitsCleanly = false;
    let finalOverflowDelta = 0;

    try {
      // 1. Create an offscreen sandbox clone
      const clone = container.cloneNode(true) as HTMLElement;
      clone.style.position = 'absolute';
      clone.style.left = '-99999px';
      clone.style.top = '0';
      clone.style.visibility = 'hidden';
      clone.style.pointerEvents = 'none';
      clone.style.width = `${targetWidth}px`;
      clone.style.maxWidth = `${targetWidth}px`;
      clone.style.minHeight = '0px';
      clone.style.maxHeight = 'none';
      clone.style.height = 'auto';
      clone.style.boxSizing = 'border-box';

      // Mirror active typography metrics onto clone for pixel-perfect probe
      const activeFont =
        container.style.fontFamily ||
        (templateConfig.fontFamily ? FONT_FAMILY_STACKS[templateConfig.fontFamily] : FONT_FAMILY_STACKS.inter);
      if (activeFont) {
        clone.style.fontFamily = activeFont;
      }
      if (container.style.letterSpacing) {
        clone.style.letterSpacing = container.style.letterSpacing;
      }
      if (templateConfig.accentColor) {
        clone.style.setProperty('--resume-accent-color', templateConfig.accentColor);
      }

      // Remove any non-content or overlay elements
      clone.querySelectorAll('.no-print, [class*="overflow"], [class*="OverflowLine"]').forEach((el) => el.remove());

      document.body.appendChild(clone);

      // 2. Test Scale Levels 0 through 4 synchronously on the offscreen clone
      for (let testLevel = 0; testLevel <= 4; testLevel++) {
        const level = testLevel as ScaleLevel;
        const config = SCALE_CONFIG_MATRIX[level];

        // Apply scale styles directly to clone
        clone.style.setProperty('--resume-font-size', `${config.fontSizePt}pt`);
        clone.style.setProperty('--resume-font-size-px', `${config.fontSizePx}px`);
        clone.style.setProperty('--resume-line-height', `${config.lineHeight}`);
        clone.style.setProperty('--resume-padding', `${config.pagePaddingMm}mm`);
        clone.style.setProperty('--resume-section-gap', `${config.sectionGapPx}px`);
        clone.style.setProperty('--resume-item-gap', `${config.itemGapPx}px`);
        clone.style.setProperty('--resume-bullet-gap', `${config.bulletGapPx}px`);
        clone.style.setProperty('--resume-header-gap', `${config.headerGapPx}px`);

        clone.style.fontSize = `${config.fontSizePt}pt`;
        clone.style.lineHeight = `${config.lineHeight}`;
        clone.style.padding = `${config.pagePaddingMm}mm`;

        clone.className = clone.className
          .replace(/\bresume-scale-level-\d\b/g, '')
          .trim()
          .concat(` resume-scale-level-${level}`);

        // Measure intrinsic content height
        const measuredHeight = clone.scrollHeight;

        // Found largest readable font size that fits 1 page cleanly!
        if (measuredHeight <= maxHeight) {
          bestLevel = level;
          fitsCleanly = true;
          finalOverflowDelta = 0;
          break;
        } else if (testLevel === 4) {
          bestLevel = 4;
          fitsCleanly = false;
          finalOverflowDelta = measuredHeight - maxHeight;
        }
      }

      // 3. Remove clone immediately
      document.body.removeChild(clone);
    } catch (e) {
      console.error('Auto-fit probe error:', e);
    } finally {
      solvingRef.current = false;
      setIsSolving(false);
    }

    // 4. Update state once with winning scale level
    setCurrentScaleLevel(bestLevel);
    if (onScaleChange) {
      onScaleChange(bestLevel);
    }

    return {
      success: fitsCleanly,
      scaleLevel: bestLevel,
      overflowDeltaPx: Math.max(0, finalOverflowDelta),
    };
  }, [containerRef, pageSize, onScaleChange, currentScaleLevel]);

  // Reactive solve trigger on content change or auto-fit enable
  useEffect(() => {
    if (!autoFitEnabled) return;

    const timer = setTimeout(() => {
      performAutoFitSolve();
    }, 40);

    return () => clearTimeout(timer);
  }, [autoFitEnabled, pageSize, contentHash, performAutoFitSolve]);

  const dynamicStyles = generateAutoFitStyle(currentScaleLevel, templateConfig);
  const tailwindScaleClass = `resume-scale-level-${currentScaleLevel}`;

  return {
    scaleLevel: currentScaleLevel,
    scaleConfig: SCALE_CONFIG_MATRIX[currentScaleLevel],
    dynamicStyles,
    tailwindScaleClass,
    isSolving,
    performAutoFitSolve,
    usedHeightPx: budget.usedHeightPx,
    maxHeightPx: budget.maxHeightPx,
    availableHeightPx: budget.availableHeightPx,
    overflowDeltaPx: budget.overflowDeltaPx,
    usedPercent: budget.usedPercent,
    status: budget.status,
    isOverflowing: budget.isOverflowing,
    recalculateBudget: budget.recalculateBudget,
  };
}

/**
 * Dual-Engine Single-Page Resume Builder
 * usePageBudget Hook (Phase 1)
 *
 * Measures DOM height against physical page standards (A4/Letter),
 * calculates real-time page budget percentage, and detects overflow boundaries.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import type { PageSize, PageBudgetMetric, BudgetStatus } from '../types/resume';
import { getTargetPageHeightPx } from '../utils/pageDimensions';

export interface UsePageBudgetOptions {
  pageSize: PageSize;
  debounceMs?: number;
}

export function usePageBudget(
  containerRef: React.RefObject<HTMLElement | null>,
  options: UsePageBudgetOptions
) {
  const { pageSize, debounceMs = 50 } = options;

  const [metrics, setMetrics] = useState<PageBudgetMetric>(() => {
    const maxHeight = getTargetPageHeightPx(pageSize);
    return {
      usedHeightPx: 0,
      maxHeightPx: maxHeight,
      availableHeightPx: maxHeight,
      overflowDeltaPx: 0,
      usedPercent: 0,
      status: 'comfortable',
      isOverflowing: false,
    };
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const calculateBudget = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const maxHeight = getTargetPageHeightPx(pageSize);
    // Use scrollHeight / offsetHeight / getBoundingClientRect to get accurate unclipped height of inner content
    const usedHeight = Math.max(
      container.scrollHeight,
      container.offsetHeight,
      Math.ceil(container.getBoundingClientRect().height)
    );
    const overflowDelta = Math.max(0, usedHeight - maxHeight);
    const usedPercent = Math.min(200, Math.round((usedHeight / maxHeight) * 100));
    const isOverflowing = usedHeight > maxHeight;

    let status: BudgetStatus = 'comfortable';
    if (isOverflowing) {
      status = 'overflowing';
    } else if (usedPercent >= 98) {
      status = 'tight';
    } else if (usedPercent >= 80) {
      status = 'optimal';
    } else {
      status = 'comfortable';
    }

    setMetrics({
      usedHeightPx: usedHeight,
      maxHeightPx: maxHeight,
      availableHeightPx: Math.max(0, maxHeight - usedHeight),
      overflowDeltaPx: overflowDelta,
      usedPercent,
      status,
      isOverflowing,
    });
  }, [containerRef, pageSize]);

  // Debounced listener attached to ResizeObserver and window resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleResize = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        calculateBudget();
      }, debounceMs);
    };

    // Immediate initial measurement
    calculateBudget();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    window.addEventListener('resize', handleResize);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef, calculateBudget, debounceMs]);

  return {
    ...metrics,
    recalculateBudget: calculateBudget,
  };
}

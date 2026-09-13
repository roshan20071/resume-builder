/**
 * Date Formatting Utility for Single-Page Resumes
 * Formats dates into clean, recruiter-approved formats (e.g. '2024', '2020 – 2024', 'Aug 2022 – May 2025')
 */

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

/**
 * Parses and cleans a single date string into a recruiter-friendly display format.
 * Examples:
 *  - "2024" -> "2024"
 *  - "2024-05" -> "May 2024"
 *  - "2024-08-15" -> "Aug 2024"
 *  - "Present" -> "Present"
 *  - "Present (Expected 2028)" -> "Present (Expected 2028)"
 */
export function formatSingleDate(dateStr?: string, preferYearOnly = false): string {
  if (!dateStr || !dateStr.trim()) return '';
  const trimmed = dateStr.trim();

  // If it's already a 4-digit year like "2024"
  if (/^\d{4}$/.test(trimmed)) {
    return trimmed;
  }

  // If it matches YYYY-MM
  const yyyyMmMatch = trimmed.match(/^(\d{4})[-/.](\d{1,2})$/);
  if (yyyyMmMatch) {
    const year = yyyyMmMatch[1];
    const monthNum = parseInt(yyyyMmMatch[2], 10);
    if (preferYearOnly) {
      return year;
    }
    if (monthNum >= 1 && monthNum <= 12) {
      return `${MONTH_NAMES[monthNum - 1]} ${year}`;
    }
    return year;
  }

  return trimmed;
}

/**
 * Formats education date ranges cleanly.
 * Handles:
 *  - Single graduation year (e.g. startDate: "", endDate: "2024") -> "2024"
 *  - Same start and end (e.g. "2024" – "2024") -> "2024"
 *  - Year range (e.g. "2020" – "2024") -> "2020 – 2024"
 *  - Month-year range (e.g. "2022-08" – "2025-05") -> "Aug 2022 – May 2025"
 *  - Expected graduation (e.g. "2025-08" – "Present (Expected 2028)") -> "2025 – Present (Expected 2028)"
 */
export function formatEducationDate(startDate?: string, endDate?: string): string {
  const start = (startDate || '').trim();
  const end = (endDate || '').trim();

  if (!start && !end) return '';

  // Only end date provided (e.g. single graduation year "2024")
  if (!start && end) {
    return formatSingleDate(end);
  }

  // Only start date provided
  if (start && !end) {
    return formatSingleDate(start);
  }

  // Same start and end date
  if (start === end) {
    return formatSingleDate(end);
  }

  // Both are 4-digit years (e.g. "2020", "2024")
  if (/^\d{4}$/.test(start) && /^\d{4}$/.test(end)) {
    return `${start} – ${end}`;
  }

  // Format start and end
  const formattedStart = formatSingleDate(start);
  const formattedEnd = formatSingleDate(end);

  if (formattedStart === formattedEnd) {
    return formattedEnd;
  }

  return `${formattedStart} – ${formattedEnd}`;
}

/**
 * Formats work experience date ranges cleanly.
 */
export function formatExperienceDate(startDate?: string, endDate?: string, isCurrent?: boolean): string {
  const start = formatSingleDate(startDate);
  if (isCurrent) {
    return start ? `${start} – Present` : 'Present';
  }
  const end = formatSingleDate(endDate);
  if (start && end) {
    return `${start} – ${end}`;
  }
  return end || start || '';
}

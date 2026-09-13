/**
 * Dual-Engine Single-Page Resume Builder
 * Google XYZ Formula Bullet Checker (Phase 1)
 *
 * Formula: "Accomplished [X] as measured by [Y], by doing [Z]"
 * Evaluates: Action Verb + Context + Measurable Result (Metrics / Numbers)
 */

export interface BulletAnalysisResult {
  score: number; // 0 to 100
  hasActionVerb: boolean;
  hasMetric: boolean;
  hasContext: boolean;
  hasVaguePhrasing: boolean;
  detectedActionVerb?: string;
  detectedMetrics: string[];
  feedback: string[];
  suggestedVerbs: string[];
}

// Curated Power Verbs by Category (ATS-Friendly)
export const STRONG_ACTION_VERBS = new Set([
  // Leadership & Initiative
  'spearheaded', 'orchestrated', 'pioneered', 'championed', 'founded', 'established',
  'directed', 'led', 'guided', 'mentored', 'recruited', 'restructured', 'transformed',
  // Engineering & Technical
  'architected', 'engineered', 'developed', 'deployed', 'built', 'implemented',
  'refactored', 'automated', 'optimized', 'designed', 'migrated', 'scaled',
  'configured', 'integrated', 'overhauled', 'debugged', 'provisioned', 'containerized',
  // Execution & Delivery
  'delivered', 'accelerated', 'executed', 'launched', 'boosted', 'generated',
  'produced', 'maximized', 'minimized', 'curtailed', 'streamlined', 'centralized',
  // Research & Analysis
  'analyzed', 'audited', 'identified', 'discovered', 'formulated', 'quantified',
  'evaluated', 'diagnosed', 'modeled', 'benchmarked', 'uncovered',
]);

// Weak / Passive Phrases that ATS and Recruiters penalize
const VAGUE_PATTERNS = [
  { regex: /\bresponsible for\b/i, suggestion: 'Replace "responsible for" with a direct action verb (e.g. "Spearheaded", "Led", "Engineered")' },
  { regex: /\bhelped with\b/i, suggestion: 'Replace "helped with" with the specific contribution (e.g. "Co-authored", "Implemented", "Assisted in deploying")' },
  { regex: /\bworked on\b/i, suggestion: 'Replace "worked on" with exact impact (e.g. "Constructed", "Overhauled", "Maintained")' },
  { regex: /\btasked with\b/i, suggestion: 'Replace "tasked with" with what you accomplished' },
  { regex: /\bassisted in\b/i, suggestion: 'Replace "assisted in" with concrete actions taken' },
  { regex: /\bhandled\b/i, suggestion: 'Replace "handled" with active verb (e.g. "Resolved", "Managed", "Processed")' },
  { regex: /\bvarious\b/i, suggestion: 'Specify exact technologies or components instead of "various"' },
  { regex: /\betc\b/i, suggestion: 'Avoid "etc." - name the key items explicitly for ATS indexing' },
];

// Regex matching numbers, percentages, dollar amounts, timeframes, and scale multipliers
const METRIC_REGEX = /(?:\$\s*[\d,]+(?:\.\d+)?\s*[kKmMbB]?)|(?:\b\d+(?:\.\d+)?\s*%)|(?:\b\d+(?:,\d+)*(?:\.\d+)?\s*(?:k|m|b|million|billion|thousand|users|clients|qps|rps|ms|seconds|minutes|hours|days|weeks|months|years|x|fold)\b)|(?:\b\d+(?:,\d+)?\+?)/gi;

/**
 * Evaluates a single bullet point string against the Google XYZ formula
 */
export function analyzeBulletPoint(bulletText: string): BulletAnalysisResult {
  const trimmed = bulletText.trim();
  const feedback: string[] = [];
  const detectedMetrics: string[] = [];

  if (!trimmed) {
    return {
      score: 0,
      hasActionVerb: false,
      hasMetric: false,
      hasContext: false,
      hasVaguePhrasing: false,
      detectedMetrics: [],
      feedback: ['Bullet point is empty.'],
      suggestedVerbs: ['Architected', 'Spearheaded', 'Optimized', 'Delivered'],
    };
  }

  // 1. Detect Leading Action Verb
  const firstWordMatch = trimmed.match(/^([a-zA-Z]+)/);
  const firstWord = firstWordMatch ? firstWordMatch[1].toLowerCase() : '';
  const hasActionVerb = STRONG_ACTION_VERBS.has(firstWord);

  if (!hasActionVerb) {
    feedback.push(`Start with a high-impact past-tense action verb instead of "${firstWordMatch?.[1] || 'a weak opening'}".`);
  }

  // 2. Detect Metrics & Quantifiable Results (Y Component)
  const metricMatches = trimmed.match(METRIC_REGEX);
  if (metricMatches && metricMatches.length > 0) {
    detectedMetrics.push(...metricMatches);
  }
  const hasMetric = detectedMetrics.length > 0;

  if (!hasMetric) {
    feedback.push('Add quantifiable metrics (e.g. "+35% throughput", "reduced latency by 120ms", "$250K saved", "100K+ DAU").');
  }

  // 3. Detect Context & Scope (Z Component: "by using...", "via...", "reducing...", length check)
  const wordCount = trimmed.split(/\s+/).length;
  const hasContext = wordCount >= 10 && (
    /\b(by|using|via|utilizing|through|leveraging|reducing|increasing|resulting in|enabling)\b/i.test(trimmed)
  );

  if (!hasContext && wordCount < 10) {
    feedback.push('Elaborate on the method or technology used to achieve this result (aim for 12-24 words per bullet).');
  }

  // 4. Check Vague Phrasing
  let hasVaguePhrasing = false;
  for (const { regex, suggestion } of VAGUE_PATTERNS) {
    if (regex.test(trimmed)) {
      hasVaguePhrasing = true;
      feedback.push(suggestion);
    }
  }

  // 5. Compute Weighted Score (0 to 100)
  let score = 0;
  if (hasActionVerb) score += 35;
  if (hasMetric) score += 40;
  if (hasContext) score += 25;
  if (hasVaguePhrasing) score = Math.max(0, score - 20);

  // Bonus for optimal length (12-25 words)
  if (wordCount >= 12 && wordCount <= 28 && score > 0) {
    score = Math.min(100, score + 5);
  }

  return {
    score,
    hasActionVerb,
    hasMetric,
    hasContext,
    hasVaguePhrasing,
    detectedActionVerb: hasActionVerb ? firstWordMatch?.[1] : undefined,
    detectedMetrics,
    feedback: feedback.length > 0 ? feedback : ['Great XYZ formula adherence! Strong action verb, quantifiable metric, and clear context.'],
    suggestedVerbs: ['Architected', 'Engineered', 'Optimized', 'Automated', 'Spearheaded', 'Launched'],
  };
}

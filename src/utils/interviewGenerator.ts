/**
 * Dual-Engine Single-Page Resume Builder
 * "Interview-to-Bullet" AI Generator (Phase 3)
 *
 * Takes 3 casual answers from a user micro-interview:
 * 1. What did you work on?
 * 2. What technologies / methods were used?
 * 3. What was the quantifiable outcome or scale?
 *
 * Produces 3 production-grade Google XYZ formula bullet points.
 */

export interface InterviewInput {
  task: string;     // e.g. "Built analytics dashboard for operations team"
  stack: string;    // e.g. "React, TypeScript, Python, PostgreSQL"
  outcome: string;  // e.g. "Saved reps 45 min daily, used by 350 managers, zero downtime"
  targetRole?: string;
}

export interface GeneratedBulletOption {
  id: string;
  category: 'speed' | 'scale' | 'business';
  badge: string;
  title: string;
  actionVerb: string;
  bulletText: string;
  xyzBreakdown: {
    x_accomplished: string;
    y_measuredBy: string;
    z_byDoing: string;
  };
}

export function generateBulletsFromInterview(input: InterviewInput): GeneratedBulletOption[] {
  const task = input.task.trim() || 'core product features';
  const stack = input.stack.trim() || 'modern web technologies';
  const outcome = input.outcome.trim() || 'improved performance and workflow efficiency';

  // Extract clean tech list
  const techList = stack
    .split(/[,\s]+/)
    .filter((w) => w.length > 1 && !/^(and|using|with|via)$/i.test(w))
    .slice(0, 4)
    .join(', ');

  const primaryTech = techList || stack;

  return [
    {
      id: 'gen-1',
      category: 'speed',
      badge: 'Speed & Efficiency',
      title: 'Velocity & Latency Focused',
      actionVerb: 'Architected',
      bulletText: `Architected ${task} using ${primaryTech}, accelerating operational workflow by ${outcome.includes('%') ? outcome : `over 40% (${outcome})`}.`,
      xyzBreakdown: {
        x_accomplished: task,
        y_measuredBy: outcome,
        z_byDoing: `leveraging ${primaryTech}`,
      },
    },
    {
      id: 'gen-2',
      category: 'scale',
      badge: 'Scale & Reliability',
      title: 'High-Throughput & Scale Focused',
      actionVerb: 'Engineered',
      bulletText: `Engineered scalable ${task} with ${primaryTech}, delivering 99.9% uptime while successfully supporting ${outcome.includes('user') || outcome.includes('manager') ? outcome : `high-concurrency production scale (${outcome})`}.`,
      xyzBreakdown: {
        x_accomplished: `scalable ${task}`,
        y_measuredBy: `99.9% uptime across ${outcome}`,
        z_byDoing: `implementing robust patterns with ${primaryTech}`,
      },
    },
    {
      id: 'gen-3',
      category: 'business',
      badge: 'Business & Team Impact',
      title: 'Leadership & Revenue Focused',
      actionVerb: 'Spearheaded',
      bulletText: `Spearheaded end-to-end delivery of ${task} utilizing ${primaryTech}, directly resulting in ${outcome}.`,
      xyzBreakdown: {
        x_accomplished: `end-to-end delivery of ${task}`,
        y_measuredBy: outcome,
        z_byDoing: `utilizing ${primaryTech}`,
      },
    },
  ];
}

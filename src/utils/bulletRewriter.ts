/**
 * Dual-Engine Single-Page Resume Builder
 * Smart Google XYZ Bullet Transformer (Phase 2)
 *
 * Formula: "Accomplished [X] as measured by [Y], by doing [Z]"
 * Transforms unquantified or weakly phrased inputs into 3 high-impact variants.
 */

export interface XYZTransformation {
  type: 'performance' | 'scale' | 'business';
  label: string;
  badge: string;
  bulletText: string;
  actionVerb: string;
  metric: string;
  context: string;
}

export function transformBulletToXYZ(input: string, contextRole = 'Software Engineer'): XYZTransformation[] {
  const cleanInput = input.trim().replace(/^[-•*]\s*/, '');

  // Extract core keywords if present
  const isBackend = /\b(api|backend|database|sql|microservice|kafka|redis|server|cloud|aws|go|python|node)\b/i.test(cleanInput);
  const isFrontend = /\b(frontend|ui|ux|react|next|css|web|page|user|component|tailwind)\b/i.test(cleanInput);
  const isDevops = /\b(k8s|kubernetes|docker|deploy|ci\/cd|pipeline|terraform|infra|cluster)\b/i.test(cleanInput);
  const isProduct = /\b(product|roadmap|feature|metric|retention|conversion|growth|user|customer)\b/i.test(cleanInput);

  if (isFrontend) {
    return [
      {
        type: 'performance',
        label: 'Core Web Vitals & Performance Focus',
        badge: 'Speed / UX',
        actionVerb: 'Overhauled',
        metric: 'improving Core Web Vitals (LCP) by 1.8s and reducing bounce rate by 22%',
        context: 'by refactoring frontend architecture with Next.js SSR and dynamic asset code-splitting',
        bulletText: `Overhauled responsive web application, improving Core Web Vitals (LCP) by 1.8s and reducing bounce rate by 22% via Next.js SSR and dynamic code-splitting.`,
      },
      {
        type: 'scale',
        label: 'Design System & Component Scale',
        badge: 'Scale / Design System',
        actionVerb: 'Engineered',
        metric: 'accelerating frontend feature delivery speed by 40% across 6 engineering squads',
        context: 'by developing a modular, fully accessible (WCAG 2.1 AA) React/TypeScript design system',
        bulletText: `Engineered reusable React/TypeScript design system, accelerating feature delivery by 40% across 6 product squads while achieving 100% WCAG 2.1 AA accessibility compliance.`,
      },
      {
        type: 'business',
        label: 'Conversion & Business Impact',
        badge: 'Revenue / Growth',
        actionVerb: 'Spearheaded',
        metric: 'driving a 28% increase in checkout conversions and $1.4M in incremental revenue',
        context: 'by redesigning the user checkout and onboarding funnel with real-time validation',
        bulletText: `Spearheaded checkout funnel redesign with real-time validation, driving a 28% boost in conversion and generating $1.4M in annual recurring revenue.`,
      },
    ];
  }

  if (isDevops) {
    return [
      {
        type: 'performance',
        label: 'CI/CD & Deployment Velocity',
        badge: 'Pipeline Speed',
        actionVerb: 'Automated',
        metric: 'slashing deployment build times from 42 minutes to under 6 minutes (85% reduction)',
        context: 'by containerizing workflows with Docker and parallelizing GitHub Actions pipelines',
        bulletText: `Automated CI/CD build pipelines using Docker and GitHub Actions, slashing deployment cycle times by 85% from 42 minutes to under 6 minutes.`,
      },
      {
        type: 'scale',
        label: 'Kubernetes & High Availability',
        badge: 'Infrastructure Scale',
        actionVerb: 'Architected',
        metric: 'maintaining 99.99% uptime SLA across 4.5M monthly active users',
        context: 'by provisioning multi-region Kubernetes clusters with automated horizontal pod autoscaling',
        bulletText: `Architected multi-region Kubernetes infrastructure with Terraform and HPA, maintaining 99.99% uptime SLA across 4.5M monthly active users.`,
      },
      {
        type: 'business',
        label: 'Cloud Infrastructure Cost Optimization',
        badge: 'Cost Savings',
        actionVerb: 'Restructured',
        metric: 'curtailing monthly AWS infrastructure expenses by $18,500 (32% annual cost savings)',
        context: 'by auditing spot instances, rightsizing idle database clusters, and implementing cache policies',
        bulletText: `Restructured AWS cloud infrastructure, curtailing monthly compute expenditure by 32% ($220K+ annualized savings) via instance rightsizing and Redis caching.`,
      },
    ];
  }

  if (isProduct) {
    return [
      {
        type: 'business',
        label: 'Product Growth & Monetization',
        badge: 'Revenue / Retention',
        actionVerb: 'Spearheaded',
        metric: 'increasing 30-day user retention by 34% and growing ARR from $4M to $12M',
        context: 'by defining product strategy and executing customer-driven roadmap experiments',
        bulletText: `Spearheaded product roadmap and onboarding redesign, increasing 30-day user retention by 34% and driving $8M in net new ARR growth.`,
      },
      {
        type: 'scale',
        label: 'Cross-Functional Delivery & Velocity',
        badge: 'Team Execution',
        actionVerb: 'Directed',
        metric: 'raising sprint delivery predictability to 96% while shipping 14 enterprise features',
        context: 'by aligning 3 cross-functional engineering and design squads on dual-track agile discovery',
        bulletText: `Directed 3 cross-functional squads (22 engineers/designers), raising sprint delivery predictability to 96% and shipping 14 major enterprise features on schedule.`,
      },
      {
        type: 'performance',
        label: 'User Discovery & Experimentation',
        badge: 'Data / Analytics',
        actionVerb: 'Conducted',
        metric: 'achieving 94% user CSAT and reducing customer churn by 18%',
        context: 'by executing 60+ user interviews and structured A/B hypothesis tests with Mixpanel and Amplitude',
        bulletText: `Conducted 60+ user discovery interviews and multivariate experiments, achieving 94% CSAT and reducing quarterly account churn by 18%.`,
      },
    ];
  }

  // Default Backend / Distributed Systems & Engineering
  const seedTopic = cleanInput.length > 5 ? cleanInput : 'distributed microservices';
  return [
    {
      type: 'performance',
      label: 'Throughput & Latency Optimization',
      badge: 'Latency / Efficiency',
      actionVerb: 'Optimized',
      metric: 'reducing 99th percentile API response latency from 680ms to 42ms (93% improvement)',
      context: `by re-architecting ${seedTopic} with Go and in-memory Redis caching`,
      bulletText: `Optimized ${seedTopic}, reducing 99th percentile API latency by 93% (680ms to 42ms) via in-memory caching and optimized SQL execution plans.`,
    },
    {
      type: 'scale',
      label: 'High-Throughput Distributed Architecture',
      badge: 'Throughput / Scale',
      actionVerb: 'Architected',
      metric: 'scaling throughput to 65,000+ RPS with zero downtime during peak seasonal traffic',
      context: `by implementing asynchronous event-driven streaming pipelines using Kafka and Go`,
      bulletText: `Architected event-driven streaming pipeline for ${seedTopic} using Kafka and Go, handling 65,000+ peak RPS with zero data loss.`,
    },
    {
      type: 'business',
      label: 'Reliability & Business Impact',
      badge: 'Reliability / Impact',
      actionVerb: 'Delivered',
      metric: 'eliminating 99.8% of manual reconciliation errors across 15,000+ enterprise accounts',
      context: `by engineering automated background reconciliation workflows with end-to-end telemetry`,
      bulletText: `Delivered automated backend reconciliation engine for ${seedTopic}, eliminating 99.8% of errors and processing $12M+ in daily transaction volume.`,
    },
  ];
}

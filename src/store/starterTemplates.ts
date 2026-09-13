/**
 * Dual-Engine Single-Page Resume Builder
 * 12 Curated Industry Starter Roles & Templates
 * Production-Ready for Software, AI/ML, Product, Mobile, Data, DevOps, Design, Freshers, Finance & Leadership
 */

import type { ResumeData } from '../types/resume';

export const STARTER_ROLES: Record<
  string,
  {
    label: string;
    category: 'Engineering' | 'Product & Design' | 'Data & AI' | 'Business & Finance' | 'Entry Level';
    description: string;
    data: ResumeData;
  }
> = {
  software_engineer: {
    label: 'Senior Full-Stack Engineer',
    category: 'Engineering',
    description: 'High-throughput distributed systems, Next.js, Node.js, and Kubernetes scale.',
    data: {
      version: '1.0.0',
      profile: {
        fullName: 'Alex Morgan',
        targetRole: 'Senior Full-Stack Engineer',
        email: 'alex.morgan@email.com',
        phone: '+1 (555) 349-8201',
        location: 'San Francisco, CA (Open to Remote)',
        website: 'https://alexmorgan.dev',
        linkedin: 'linkedin.com/in/alexmorgan-dev',
        github: 'github.com/alexmorgan-dev',
        summary:
          'Product-minded Full-Stack Engineer with 6+ years designing high-throughput distributed systems and responsive web applications. Specialized in Next.js, Node.js, and Kubernetes, driving sub-100ms latency at 2M+ DAU scale.',
      },
      experience: [
        {
          id: 'exp-1',
          company: 'HyperScale Systems',
          position: 'Senior Software Engineer',
          location: 'San Francisco, CA',
          startDate: '2022-03',
          endDate: 'Present',
          isCurrent: true,
          bullets: [
            {
              id: 'b-1',
              text: 'Architected real-time streaming pipeline using Kafka and Go, reducing data processing lag by 78% for 4.2M daily transactions.',
            },
            {
              id: 'b-2',
              text: 'Spearheaded frontend migration to Next.js App Router and Tailwind CSS, improving Core Web Vitals (LCP) by 1.4s and boosting conversion by 14%.',
            },
            {
              id: 'b-3',
              text: 'Mentored 5 mid-level engineers in distributed debugging and test automation, elevating unit test coverage from 62% to 91%.',
            },
          ],
        },
        {
          id: 'exp-2',
          company: 'Nexus Cloud Platforms',
          position: 'Full-Stack Software Engineer',
          location: 'Austin, TX',
          startDate: '2019-06',
          endDate: '2022-02',
          isCurrent: false,
          bullets: [
            {
              id: 'b-4',
              text: 'Engineered multi-tenant billing microservice in TypeScript and PostgreSQL, automating invoicing across 12,000+ enterprise accounts and cutting reconciliation errors by 99.4%.',
            },
            {
              id: 'b-5',
              text: 'Optimized SQL database query patterns and index strategies, slashing 95th percentile query latency from 850ms to 45ms.',
            },
          ],
        },
      ],
      projects: [
        {
          id: 'proj-1',
          name: 'Distributed KV Cache Engine',
          role: 'Creator & Maintainer',
          summary: 'In-memory distributed key-value store with Raft consensus built in Go and gRPC.',
          technologies: ['Go', 'Raft Consensus', 'gRPC', 'Docker'],
          url: 'https://github.com/alexmorgan-dev/raft-kv',
          startDate: '2023-01',
          endDate: '2023-08',
          bullets: [
            {
              id: 'b-6',
              text: 'Achieved 45,000+ write QPS benchmarked with 5-node cluster and earned 1,200+ GitHub stars.',
            },
          ],
        },
      ],
      skills: [
        {
          id: 'skill-1',
          categoryName: 'Languages & Core',
          skills: ['TypeScript', 'JavaScript (ESNext)', 'Go', 'Python', 'SQL', 'HTML5/CSS3'],
        },
        {
          id: 'skill-2',
          categoryName: 'Frameworks & Libraries',
          skills: ['React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS', 'GraphQL', 'Zustand'],
        },
        {
          id: 'skill-3',
          categoryName: 'Cloud, Data & DevOps',
          skills: ['AWS (ECS, S3, RDS)', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'Kafka', 'CI/CD GitHub Actions'],
        },
      ],
      education: [
        {
          id: 'edu-1',
          institution: 'University of California, Berkeley',
          degree: 'Bachelor of Science',
          fieldOfStudy: 'Computer Science',
          location: 'Berkeley, CA',
          startDate: '2015-08',
          endDate: '2019-05',
          gpa: '3.82 / 4.0',
          honors: "Dean's Honor List (4 semesters)",
          coursework: ['Distributed Systems', 'Algorithms & Data Structures', 'Database Systems', 'Operating Systems'],
        },
      ],
      customSections: [],
      sectionConfig: {
        order: ['contact', 'summary', 'experience', 'projects', 'skills', 'education'],
        visibility: {
          contact: true,
          summary: true,
          experience: true,
          projects: true,
          skills: true,
          education: true,
          certifications: false,
          custom: false,
        },
        customTitles: {
          experience: 'Professional Experience',
          projects: 'Featured Projects',
          skills: 'Technical Skills',
          education: 'Education',
        },
      },
      templateConfig: {
        engineMode: 'ats_classic',
        pageSize: 'A4',
        fontFamily: 'inter',
        accentColor: '#2563eb',
        spacingPreset: 'auto',
        autoFitEnabled: true,
        scaleLevel: 1,
        showIcons: false,
        showPhoto: false,
      },
    },
  },

  sde_india: {
    label: 'SDE-2 (FinTech & Distributed Systems)',
    category: 'Engineering',
    description: 'High-scale payment gateways, UPI 2.0, Go microservices, and Kafka.',
    data: {
      version: '1.0.0',
      profile: {
        fullName: 'Rohan Sharma',
        targetRole: 'Software Development Engineer II (SDE-2)',
        email: 'rohan.sharma@email.com',
        phone: '+91 98765 43210',
        location: 'Bangalore, Karnataka, India',
        website: 'https://rohansharma.dev',
        linkedin: 'linkedin.com/in/rohan-sharma-dev',
        github: 'github.com/rohan-sharma-dev',
        summary:
          'High-impact Backend & Distributed Systems Engineer with 4+ years designing fault-tolerant payment gateways and high-throughput microservices. Scaled core checkout infrastructure to 35,000+ peak TPS with 99.995% uptime.',
      },
      experience: [
        {
          id: 'in-exp-1',
          company: 'Razorpay Software',
          position: 'Software Development Engineer II (SDE-2)',
          location: 'Bangalore, Karnataka',
          startDate: '2022-07',
          endDate: 'Present',
          isCurrent: true,
          bullets: [
            {
              id: 'in-b-1',
              text: 'Re-architected UPI 2.0 payment processing engine in Go and Redis, reducing transaction latency from 420ms to 95ms for 14M daily transactions.',
            },
            {
              id: 'in-b-2',
              text: 'Implemented distributed idempotent ledger system using PostgreSQL and Kafka, eliminating 100% of double-debit edge cases during high-traffic flash sales.',
            },
            {
              id: 'in-b-3',
              text: 'Led migration from monolithic payment router to Kubernetes microservices, slashing AWS infrastructure overhead by $180,000 annually.',
            },
          ],
        },
        {
          id: 'in-exp-2',
          company: 'Flipkart (Walmart Group)',
          position: 'Software Development Engineer I (SDE-1)',
          location: 'Bangalore, Karnataka',
          startDate: '2020-08',
          endDate: '2022-06',
          isCurrent: false,
          bullets: [
            {
              id: 'in-b-4',
              text: 'Engineered automated inventory reconciliation pipeline in Java Spring Boot, handling 80M+ SKU updates daily with zero data discrepancies.',
            },
            {
              id: 'in-b-5',
              text: 'Spearheaded Big Billion Days search caching layer optimization with Memcached, improving catalog search p99 latency by 55%.',
            },
          ],
        },
      ],
      projects: [
        {
          id: 'in-proj-1',
          name: 'Distributed Rate Limiter & Token Bucket',
          role: 'Creator & Maintainer',
          summary: 'High-throughput distributed token-bucket rate limiter built in Go and Redis cluster, handling 100k+ RPS.',
          technologies: ['Go (Golang)', 'Redis', 'Docker', 'gRPC'],
          url: 'https://github.com/rohan-sharma-dev/distributed-rate-limiter',
          startDate: '2023-01',
          endDate: '2023-06',
          bullets: [
            {
              id: 'in-b-6',
              text: 'Benchmarked sub-1ms evaluation overhead and adopted by 3 open-source payment orchestration libraries.',
            },
          ],
        },
      ],
      skills: [
        {
          id: 'in-sk-1',
          categoryName: 'Languages & Core',
          skills: ['Go (Golang)', 'Java', 'Python', 'TypeScript', 'SQL (PostgreSQL / MySQL)', 'C++'],
        },
        {
          id: 'in-sk-2',
          categoryName: 'Frameworks & Architecture',
          skills: ['Spring Boot', 'gRPC', 'REST APIs', 'Node.js', 'Next.js', 'Microservices Architecture'],
        },
        {
          id: 'in-sk-3',
          categoryName: 'Distributed Systems & Cloud',
          skills: ['Apache Kafka', 'Redis', 'AWS (EKS, RDS, S3)', 'Docker', 'Kubernetes', 'CI/CD GitHub Actions'],
        },
      ],
      education: [
        {
          id: 'in-edu-1',
          institution: 'Indian Institute of Technology (IIT) Bombay',
          degree: 'Bachelor of Technology (B.Tech)',
          fieldOfStudy: 'Computer Science & Engineering',
          location: 'Mumbai, Maharashtra',
          startDate: '2016-08',
          endDate: '2020-05',
          gpa: '9.2 / 10 CGPA',
          honors: 'Institute Silver Medalist - Academic Excellence',
          coursework: ['Distributed Systems', 'Data Structures & Algorithms', 'Database Systems', 'Operating Systems', 'Computer Networks'],
        },
      ],
      customSections: [],
      sectionConfig: {
        order: ['contact', 'summary', 'experience', 'projects', 'skills', 'education'],
        visibility: {
          contact: true,
          summary: true,
          experience: true,
          projects: true,
          skills: true,
          education: true,
          certifications: false,
          custom: false,
        },
        customTitles: {
          experience: 'Work Experience',
          projects: 'Technical Projects',
          skills: 'Technical Skills',
          education: 'Education',
        },
      },
      templateConfig: {
        engineMode: 'ats_classic',
        pageSize: 'A4',
        fontFamily: 'inter',
        accentColor: '#2563eb',
        spacingPreset: 'auto',
        autoFitEnabled: true,
        scaleLevel: 1,
        showIcons: false,
        showPhoto: false,
      },
    },
  },

  ai_ml_engineer: {
    label: 'Senior AI / Machine Learning Engineer',
    category: 'Data & AI',
    description: 'LLMs, PyTorch, RAG architectures, Vector DBs, and MLOps at scale.',
    data: {
      version: '1.0.0',
      profile: {
        fullName: 'Elena Rostova',
        targetRole: 'Senior AI / Machine Learning Engineer',
        email: 'elena.rostova@email.com',
        phone: '+1 (415) 890-4321',
        location: 'Seattle, WA (Remote Eligible)',
        website: 'https://elenarostova.ai',
        linkedin: 'linkedin.com/in/elena-rostova-ai',
        github: 'github.com/elena-ai-labs',
        summary:
          'AI & ML Engineer with 5+ years building production-grade LLM applications, retrieval-augmented generation (RAG) pipelines, and distributed inference engines. Decreased model inference latency by 64% while scaling to 10M+ daily embeddings.',
      },
      experience: [
        {
          id: 'ai-exp-1',
          company: 'CognitiveScale AI',
          position: 'Senior Machine Learning Engineer',
          location: 'Seattle, WA',
          startDate: '2022-04',
          endDate: 'Present',
          isCurrent: true,
          bullets: [
            {
              id: 'ai-b-1',
              text: 'Designed enterprise agentic RAG pipeline using LlamaIndex, Qdrant vector search, and Claude 3.5, increasing retrieval precision (mAP@10) from 0.71 to 0.94.',
            },
            {
              id: 'ai-b-2',
              text: 'Optimized open-weights LLM fine-tuning using vLLM and TensorRT-LLM on 16x H100 GPUs, reducing token generation latency by 58% and slashing AWS compute costs by $240k/yr.',
            },
            {
              id: 'ai-b-3',
              text: 'Built automated continuous evaluation harness tracking hallucinations, toxicity, and semantic drift across 50,000+ daily customer queries.',
            },
          ],
        },
        {
          id: 'ai-exp-2',
          company: 'DataVanguard Systems',
          position: 'Machine Learning Engineer',
          location: 'San Jose, CA',
          startDate: '2019-09',
          endDate: '2022-03',
          isCurrent: false,
          bullets: [
            {
              id: 'ai-b-4',
              text: 'Trained multi-modal fraud detection classifier in PyTorch and XGBoost on 120M records, reducing financial chargeback loss by 32% ($4.8M recovered).',
            },
            {
              id: 'ai-b-5',
              text: 'Constructed real-time feature store using Feast and Redis, cutting online inference latency from 180ms to 18ms.',
            },
          ],
        },
      ],
      projects: [
        {
          id: 'ai-proj-1',
          name: 'FastVector: Embeddings Clustering Engine',
          role: 'Core Author',
          summary: 'GPU-accelerated vector clustering and semantic deduplication tool in Rust and CUDA.',
          technologies: ['PyTorch', 'Rust', 'CUDA', 'FAISS', 'FastAPI'],
          url: 'https://github.com/elena-ai-labs/fast-vector',
          startDate: '2023-04',
          endDate: '2023-10',
          bullets: [
            {
              id: 'ai-b-6',
              text: 'Benchmarked 8x speedup over standard FAISS clustering and starred by 2,400+ ML practitioners.',
            },
          ],
        },
      ],
      skills: [
        {
          id: 'ai-sk-1',
          categoryName: 'AI, LLMs & Frameworks',
          skills: ['PyTorch', 'Hugging Face', 'LangChain', 'LlamaIndex', 'vLLM', 'TensorRT', 'TensorFlow', 'scikit-learn'],
        },
        {
          id: 'ai-sk-2',
          categoryName: 'Data & Vector Systems',
          skills: ['Qdrant', 'Pinecone', 'FAISS', 'PostgreSQL (pgvector)', 'Apache Spark', 'Pandas', 'NumPy'],
        },
        {
          id: 'ai-sk-3',
          categoryName: 'MLOps & Infrastructure',
          skills: ['Docker', 'Kubernetes (KServe)', 'MLflow', 'Triton Inference Server', 'AWS Sagemaker', 'GCP Vertex AI'],
        },
      ],
      education: [
        {
          id: 'ai-edu-1',
          institution: 'Carnegie Mellon University (CMU)',
          degree: 'Master of Science (M.S.)',
          fieldOfStudy: 'Computer Science (Machine Learning Focus)',
          location: 'Pittsburgh, PA',
          startDate: '2017-09',
          endDate: '2019-05',
          gpa: '3.91 / 4.0',
          honors: 'Graduate Research Fellowship Award',
        },
      ],
      customSections: [],
      sectionConfig: {
        order: ['contact', 'summary', 'experience', 'projects', 'skills', 'education'],
        visibility: {
          contact: true,
          summary: true,
          experience: true,
          projects: true,
          skills: true,
          education: true,
          certifications: false,
          custom: false,
        },
        customTitles: {
          experience: 'AI / ML Experience',
          projects: 'Key Research & Open-Source',
          skills: 'Technical & ML Stack',
          education: 'Education',
        },
      },
      templateConfig: {
        engineMode: 'modern_clean',
        pageSize: 'A4',
        fontFamily: 'inter',
        accentColor: '#4f46e5',
        spacingPreset: 'auto',
        autoFitEnabled: true,
        scaleLevel: 1,
        showIcons: false,
        showPhoto: false,
      },
    },
  },

  product_manager: {
    label: 'Lead Product Manager',
    category: 'Product & Design',
    description: 'B2B SaaS product discovery, enterprise roadmaps, and PLG growth loops.',
    data: {
      version: '1.0.0',
      profile: {
        fullName: 'Sarah Chen',
        targetRole: 'Lead Product Manager',
        email: 'sarah.chen@email.com',
        phone: '+1 (555) 782-9012',
        location: 'New York, NY',
        website: 'https://sarahchen.pm',
        linkedin: 'linkedin.com/in/sarahchen-pm',
        summary:
          'Data-driven Product Leader with 7+ years driving B2B SaaS growth and product-led acquisition. Led cross-functional squads to launch self-serve onboarding, growing ARR from $14M to $38M in 24 months.',
      },
      experience: [
        {
          id: 'pm-exp-1',
          company: 'CloudFlow Technologies',
          position: 'Lead Product Manager',
          location: 'New York, NY',
          startDate: '2021-08',
          endDate: 'Present',
          isCurrent: true,
          bullets: [
            {
              id: 'pm-b-1',
              text: 'Spearheaded self-serve Product-Led Growth (PLG) motion, lifting free-to-paid conversion from 3.2% to 7.8% and adding $12.4M in incremental ARR within 18 months.',
            },
            {
              id: 'pm-b-2',
              text: 'Defined product strategy and led roadmap execution for 3 squads (24 engineers/designers), cutting release cycle time by 35% via continuous discovery.',
            },
            {
              id: 'pm-b-3',
              text: 'Launched enterprise security suite (SSO, SCIM, Audit Logs), unblocking $12M in enterprise pipeline and closing 18 Fortune 500 accounts.',
            },
          ],
        },
        {
          id: 'pm-exp-2',
          company: 'Apex Analytics',
          position: 'Senior Product Manager',
          location: 'Boston, MA',
          startDate: '2018-05',
          endDate: '2021-07',
          isCurrent: false,
          bullets: [
            {
              id: 'pm-b-4',
              text: 'Conducted 120+ customer interviews and executed A/B testing framework that increased weekly active users (WAU) by 42%.',
            },
            {
              id: 'pm-b-5',
              text: 'Standardized PRD templates and OKR tracking across the 60-person product organization, raising quarterly delivery predictability to 94%.',
            },
          ],
        },
      ],
      projects: [
        {
          id: 'pm-proj-1',
          name: 'AI-Powered Search & Discovery',
          role: 'Product Lead',
          summary: 'Built semantic enterprise search powered by vector embeddings, increasing search-to-action rate by 52%.',
          technologies: ['LLMs', 'Vector Search', 'Mixpanel', 'Figma'],
          startDate: '2023-02',
          endDate: '2023-11',
          bullets: [
            {
              id: 'pm-b-6',
              text: 'Delivered MVP 3 weeks ahead of schedule with 96% CSAT score across beta participants.',
            },
          ],
        },
      ],
      skills: [
        {
          id: 'pm-skill-1',
          categoryName: 'Product Strategy & Management',
          skills: ['Product Discovery', 'User Journey Mapping', 'A/B Testing', 'Roadmapping', 'GTM Strategy', 'Pricing & Packaging'],
        },
        {
          id: 'pm-skill-2',
          categoryName: 'Analytics & Tools',
          skills: ['SQL', 'Mixpanel', 'Amplitude', 'Jira', 'Figma', 'PostHog', 'Tableau'],
        },
      ],
      education: [
        {
          id: 'pm-edu-1',
          institution: 'Columbia University',
          degree: 'Bachelor of Science',
          fieldOfStudy: 'Industrial Engineering & Operations Research',
          location: 'New York, NY',
          startDate: '2014-09',
          endDate: '2018-05',
          gpa: '3.78 / 4.0',
        },
      ],
      customSections: [],
      sectionConfig: {
        order: ['contact', 'summary', 'experience', 'projects', 'skills', 'education'],
        visibility: {
          contact: true,
          summary: true,
          experience: true,
          projects: true,
          skills: true,
          education: true,
          certifications: false,
          custom: false,
        },
        customTitles: {
          experience: 'Professional Experience',
          projects: 'Key Product Initiatives',
          skills: 'Competencies & Tools',
          education: 'Education',
        },
      },
      templateConfig: {
        engineMode: 'ats_classic',
        pageSize: 'A4',
        fontFamily: 'inter',
        accentColor: '#0f766e',
        spacingPreset: 'auto',
        autoFitEnabled: true,
        scaleLevel: 1,
        showIcons: false,
        showPhoto: false,
      },
    },
  },

  fresh_graduate: {
    label: 'Fresh Graduate / College Intern (Zero Experience)',
    category: 'Entry Level',
    description: 'Perfect for students & grads highlighting academic projects, hackathons, and coursework.',
    data: {
      version: '1.0.0',
      profile: {
        fullName: 'Aryan Verma',
        targetRole: 'Associate Software Engineer / Graduate SDE',
        email: 'aryan.verma@email.com',
        phone: '+91 91234 56789',
        location: 'Hyderabad, Telangana, India',
        website: 'https://aryanverma.dev',
        linkedin: 'linkedin.com/in/aryan-verma-dev',
        github: 'github.com/aryan-verma',
        summary:
          'Proactive Computer Science graduate with strong foundation in Data Structures, Algorithms, and Full-Stack Web Development. Built 4 production-grade web apps and ranked in top 2% of 40,000+ coders on LeetCode.',
      },
      experience: [
        {
          id: 'fg-exp-1',
          company: 'FinTech Innovations Lab',
          position: 'Software Engineering Intern',
          location: 'Hyderabad, Telangana',
          startDate: '2023-05',
          endDate: '2023-08',
          isCurrent: false,
          bullets: [
            {
              id: 'fg-b-1',
              text: 'Developed automated REST API validation suite in Python and PyTest, reducing regression testing turnaround time by 65%.',
            },
            {
              id: 'fg-b-2',
              text: 'Implemented React customer dashboard widgets with real-time WebSocket updates, adopted by 18,000+ active beta merchants.',
            },
          ],
        },
      ],
      projects: [
        {
          id: 'fg-proj-1',
          name: 'CollabCode: Real-Time Collaborative Editor',
          role: 'Lead Developer (Capstone Project)',
          summary: 'Browser-based code editor with live cursor synchronization and code execution sandboxing.',
          technologies: ['TypeScript', 'Next.js', 'WebSockets', 'Docker', 'Monaco Editor'],
          url: 'https://github.com/aryan-verma/collab-code',
          startDate: '2023-09',
          endDate: '2024-03',
          bullets: [
            {
              id: 'fg-b-3',
              text: 'Engineered Conflict-Free Replicated Data Types (CRDTs) engine supporting 50+ concurrent users per room with sub-30ms sync latency.',
            },
            {
              id: 'fg-b-4',
              text: 'Awarded 1st Place in University Annual Capstone Showcase out of 80+ engineering project submissions.',
            },
          ],
        },
        {
          id: 'fg-proj-2',
          name: 'AlgoVisualizer: Interactive Pathfinding & Sorting',
          role: 'Solo Creator',
          summary: 'Interactive visualization sandbox for Dijkstra, A*, and sorting algorithms with custom graph generation.',
          technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Vite'],
          url: 'https://algovisualizer-demo.dev',
          startDate: '2023-01',
          endDate: '2023-04',
          bullets: [
            {
              id: 'fg-b-5',
              text: 'Attracted 25,000+ monthly active learners worldwide and featured on Hacker News front page.',
            },
          ],
        },
      ],
      skills: [
        {
          id: 'fg-sk-1',
          categoryName: 'Programming Languages',
          skills: ['C++', 'Java', 'Python', 'JavaScript (ES6+)', 'TypeScript', 'SQL'],
        },
        {
          id: 'fg-sk-2',
          categoryName: 'Web & Frameworks',
          skills: ['React.js', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS', 'REST APIs', 'Git/GitHub'],
        },
        {
          id: 'fg-sk-3',
          categoryName: 'Core CS Foundations',
          skills: ['Data Structures & Algorithms', 'Object-Oriented Programming (OOP)', 'Database Management (DBMS)', 'Computer Networks', 'Operating Systems'],
        },
      ],
      education: [
        {
          id: 'fg-edu-1',
          institution: 'Woxsen University (School of Technology)',
          degree: 'Bachelor of Technology (B.Tech)',
          fieldOfStudy: 'Computer Science & Engineering',
          location: 'Hyderabad, Telangana',
          startDate: '2020-08',
          endDate: '2024-05',
          gpa: '9.1 / 10 CGPA',
          honors: 'Dean\'s Academic Excellence Merit List (Top 5% of Batch)',
          coursework: ['Data Structures & Algorithms', 'Database Systems', 'Operating Systems', 'Cloud Computing', 'Computer Networks'],
        },
      ],
      customSections: [
        {
          id: 'fg-cs-1',
          sectionTitle: 'Achievements & Hackathons',
          items: [
            {
              id: 'fg-cs-it-1',
              title: 'Smart India Hackathon (SIH) National Finalist',
              date: '2023',
              description: 'Built automated AI grievance routing portal selected in top 15 out of 12,000+ participating college teams.',
            },
            {
              id: 'fg-cs-it-2',
              title: 'LeetCode Knight Badge (Rating: 1980+)',
              date: '2024',
              description: 'Solved 600+ problems across Graphs, Dynamic Programming, and Tree data structures.',
            },
          ],
        },
      ],
      sectionConfig: {
        order: ['contact', 'summary', 'education', 'skills', 'projects', 'experience', 'custom'],
        visibility: {
          contact: true,
          summary: true,
          experience: true,
          projects: true,
          skills: true,
          education: true,
          certifications: false,
          custom: true,
        },
        customTitles: {
          education: 'Education',
          skills: 'Technical Skills',
          projects: 'Featured Projects & Open-Source',
          experience: 'Internship Experience',
          custom: 'Key Achievements & Hackathons',
        },
      },
      templateConfig: {
        engineMode: 'ats_classic',
        pageSize: 'A4',
        fontFamily: 'inter',
        accentColor: '#2563eb',
        spacingPreset: 'compact',
        autoFitEnabled: true,
        scaleLevel: 0,
        showIcons: false,
        showPhoto: false,
      },
    },
  },

  devops_cloud: {
    label: 'DevOps & Cloud Solutions Architect',
    category: 'Engineering',
    description: 'Kubernetes, Terraform IaC, AWS Multi-Region, SRE, and 99.99% SLOs.',
    data: {
      version: '1.0.0',
      profile: {
        fullName: 'Marcus Vance',
        targetRole: 'Principal Cloud & DevOps Architect',
        email: 'marcus.vance@email.com',
        phone: '+1 (408) 555-7190',
        location: 'Denver, CO (Remote)',
        website: 'https://marcusvance.cloud',
        linkedin: 'linkedin.com/in/marcus-vance-cloud',
        github: 'github.com/marcus-infra',
        summary:
          'DevOps & Infrastructure Leader with 8+ years architecting multi-region AWS and Kubernetes clusters. Designed GitOps deployment automation reducing production deploy failure rate from 14% to 0.2% across 90+ microservices.',
      },
      experience: [
        {
          id: 'do-exp-1',
          company: 'Strata Cloud Solutions',
          position: 'Lead DevOps & Infrastructure Architect',
          location: 'Denver, CO',
          startDate: '2021-05',
          endDate: 'Present',
          isCurrent: true,
          bullets: [
            {
              id: 'do-b-1',
              text: 'Spearheaded migration of 90+ microservices to multi-tenant AWS EKS clusters managed via Terraform and ArgoCD, slashing deployment rollback time by 88%.',
            },
            {
              id: 'do-b-2',
              text: 'Constructed automated spot-instance autoscaler using Karpenter, saving $380,000 annually (34% cloud budget reduction) with zero availability impact.',
            },
            {
              id: 'do-b-3',
              text: 'Implemented centralized Prometheus/Grafana observability pipeline handling 1.2M metrics/sec, establishing 99.99% service level objectives (SLO).',
            },
          ],
        },
        {
          id: 'do-exp-2',
          company: 'Apex Digital Infrastructure',
          position: 'Senior SRE / DevOps Engineer',
          location: 'Austin, TX',
          startDate: '2017-08',
          endDate: '2021-04',
          isCurrent: false,
          bullets: [
            {
              id: 'do-b-4',
              text: 'Designed blue-green zero-downtime release pipelines in GitHub Actions and Helm, supporting 45 daily production deployments.',
            },
            {
              id: 'do-b-5',
              text: 'Automated disaster recovery (DR) failover between us-east-1 and us-west-2, reducing RTO from 4 hours to 4.5 minutes.',
            },
          ],
        },
      ],
      projects: [
        {
          id: 'do-proj-1',
          name: 'KubeGuard: Automated Kubernetes Security Scanner',
          role: 'Creator & Maintainer',
          summary: 'Open-source CLI tool scanning live Kubernetes manifests for CIS benchmark violations and misconfigured IAM roles.',
          technologies: ['Go', 'Kubernetes API', 'OPA Gatekeeper', 'Docker'],
          url: 'https://github.com/marcus-infra/kubeguard',
          startDate: '2023-03',
          endDate: '2023-09',
          bullets: [
            {
              id: 'do-b-6',
              text: 'Downloaded 85,000+ times on DockerHub and integrated into 40+ enterprise CI/CD security gates.',
            },
          ],
        },
      ],
      skills: [
        {
          id: 'do-sk-1',
          categoryName: 'Cloud & Containerization',
          skills: ['AWS (EKS, VPC, RDS, IAM, S3)', 'Google Cloud (GCP)', 'Docker', 'Kubernetes', 'Helm', 'ArgoCD', 'Karpenter'],
        },
        {
          id: 'do-sk-2',
          categoryName: 'Infrastructure as Code (IaC) & CI/CD',
          skills: ['Terraform', 'Terragrunt', 'Ansible', 'GitHub Actions', 'GitLab CI', 'Linux (RHEL, Ubuntu)', 'Bash'],
        },
        {
          id: 'do-sk-3',
          categoryName: 'Monitoring & Observability',
          skills: ['Prometheus', 'Grafana', 'Datadog', 'OpenTelemetry', 'ELK Stack', 'PagerDuty', 'Chaos Mesh'],
        },
      ],
      education: [
        {
          id: 'do-edu-1',
          institution: 'Georgia Institute of Technology',
          degree: 'Bachelor of Science',
          fieldOfStudy: 'Computer Science',
          location: 'Atlanta, GA',
          startDate: '2013-08',
          endDate: '2017-05',
          gpa: '3.85 / 4.0',
        },
      ],
      customSections: [],
      sectionConfig: {
        order: ['contact', 'summary', 'experience', 'projects', 'skills', 'education'],
        visibility: {
          contact: true,
          summary: true,
          experience: true,
          projects: true,
          skills: true,
          education: true,
          certifications: false,
          custom: false,
        },
        customTitles: {
          experience: 'DevOps & SRE Experience',
          projects: 'Infrastructure & Open Source',
          skills: 'Infrastructure & Tooling',
          education: 'Education',
        },
      },
      templateConfig: {
        engineMode: 'modern_clean',
        pageSize: 'A4',
        fontFamily: 'roboto',
        accentColor: '#059669',
        spacingPreset: 'auto',
        autoFitEnabled: true,
        scaleLevel: 1,
        showIcons: false,
        showPhoto: false,
      },
    },
  },

  ui_ux_designer: {
    label: 'Senior UI/UX Product Designer',
    category: 'Product & Design',
    description: 'Design systems, user research, complex SaaS workflows, and high-fidelity prototyping.',
    data: {
      version: '1.0.0',
      profile: {
        fullName: 'Chloe Dupont',
        targetRole: 'Senior UI/UX Product Designer',
        email: 'chloe.dupont@email.com',
        phone: '+1 (312) 670-8819',
        location: 'Chicago, IL (Open to Remote)',
        website: 'https://chloedupont.design',
        linkedin: 'linkedin.com/in/chloe-dupont-ux',
        portfolioUrl: 'https://behance.net/chloedupont',
        summary:
          'Product Designer with 6+ years designing intuitive enterprise SaaS platforms and consumer mobile apps. Led design system adoption across 14 product squads, increasing UI development speed by 40% and cutting usability defects by 62%.',
      },
      experience: [
        {
          id: 'ux-exp-1',
          company: 'Loomis Design Studio',
          position: 'Senior Product Designer',
          location: 'Chicago, IL',
          startDate: '2021-09',
          endDate: 'Present',
          isCurrent: true,
          bullets: [
            {
              id: 'ux-b-1',
              text: 'Redesigned core merchant analytics dashboard in Figma, improving System Usability Score (SUS) from 64 to 88 and decreasing customer onboarding time by 38%.',
            },
            {
              id: 'ux-b-2',
              text: 'Built scalable multi-brand design system in Figma with 180+ tokenized accessible components, accelerating frontend sprint velocity by 40%.',
            },
            {
              id: 'ux-b-3',
              text: 'Conducted 45+ qualitative user interviews and usability tests, translating user pain points into 3 high-impact quarterly roadmap features.',
            },
          ],
        },
        {
          id: 'ux-exp-2',
          company: 'Veloce Digital Media',
          position: 'UI/UX Designer',
          location: 'San Francisco, CA',
          startDate: '2018-06',
          endDate: '2021-08',
          isCurrent: false,
          bullets: [
            {
              id: 'ux-b-4',
              text: 'Designed end-to-end checkout flow for mobile iOS/Android app, lifting checkout completion rate by 22.4% ($3.2M incremental GMV).',
            },
            {
              id: 'ux-b-5',
              text: 'Collaborated with engineering to establish WCAG 2.1 AA accessibility standards across the company web catalog.',
            },
          ],
        },
      ],
      projects: [
        {
          id: 'ux-proj-1',
          name: 'Atelier Design Tokens System',
          role: 'Lead Designer',
          summary: 'Open-source design token system and Figma plugin synchronizing design variables directly with Tailwind CSS.',
          technologies: ['Figma Tokens', 'Figma API', 'Design Systems', 'CSS Variables'],
          url: 'https://figma.com/@atelier-tokens',
          startDate: '2023-02',
          endDate: '2023-08',
          bullets: [
            {
              id: 'ux-b-6',
              text: 'Used by 15,000+ Figma community designers and featured in Figma Community Weekly showcase.',
            },
          ],
        },
      ],
      skills: [
        {
          id: 'ux-sk-1',
          categoryName: 'Design & Prototyping',
          skills: ['Figma', 'Design Systems', 'Wireframing', 'High-Fidelity Prototyping', 'Component Architecture', 'Framer'],
        },
        {
          id: 'ux-sk-2',
          categoryName: 'Research & Strategy',
          skills: ['User Journey Mapping', 'Usability Testing', 'User Personas', 'Information Architecture', 'WCAG 2.1 AA Accessibility'],
        },
        {
          id: 'ux-sk-3',
          categoryName: 'Technical Handoff',
          skills: ['HTML5/CSS3', 'Tailwind CSS Tokens', 'Storybook Handoff', 'Zeplin', 'Jira Agile Workflows'],
        },
      ],
      education: [
        {
          id: 'ux-edu-1',
          institution: 'Rhode Island School of Design (RISD)',
          degree: 'Bachelor of Fine Arts (B.F.A.)',
          fieldOfStudy: 'Graphic & Interaction Design',
          location: 'Providence, RI',
          startDate: '2014-09',
          endDate: '2018-05',
          gpa: '3.88 / 4.0',
          honors: 'Honors Award for Excellence in Interaction Design',
        },
      ],
      customSections: [],
      sectionConfig: {
        order: ['contact', 'summary', 'experience', 'projects', 'skills', 'education'],
        visibility: {
          contact: true,
          summary: true,
          experience: true,
          projects: true,
          skills: true,
          education: true,
          certifications: false,
          custom: false,
        },
        customTitles: {
          experience: 'Design Experience',
          projects: 'Featured Case Studies',
          skills: 'Design Competencies & Tools',
          education: 'Education',
        },
      },
      templateConfig: {
        engineMode: 'modern_clean',
        pageSize: 'A4',
        fontFamily: 'inter',
        accentColor: '#dc2626',
        spacingPreset: 'auto',
        autoFitEnabled: true,
        scaleLevel: 1,
        showIcons: false,
        showPhoto: false,
      },
    },
  },

  mobile_engineer: {
    label: 'Senior Mobile Engineer (iOS / Android)',
    category: 'Engineering',
    description: 'React Native, Swift, Kotlin, and offline-first mobile architecture at 1M+ active users.',
    data: {
      version: '1.0.0',
      profile: {
        fullName: 'Jordan Reed',
        targetRole: 'Senior Mobile Engineer (iOS / Android)',
        email: 'jordan.reed@email.com',
        phone: '+1 (415) 890-3412',
        location: 'Seattle, WA (Open to Remote)',
        website: 'https://jordanreed.dev',
        linkedin: 'linkedin.com/in/jordanreed-mobile',
        github: 'github.com/jordanreed-dev',
        summary:
          'Mobile Engineer with 6+ years shipping high-performance cross-platform and native iOS/Android applications. Specialized in React Native, Swift, and offline-first SQLite sync serving 1.5M+ active users with 99.94% crash-free sessions.',
      },
      experience: [
        {
          id: 'mob-exp-1',
          company: 'Aura Fitness & Wellness',
          position: 'Lead Mobile Engineer',
          location: 'Seattle, WA',
          startDate: '2022-01',
          endDate: 'Present',
          isCurrent: true,
          bullets: [
            {
              id: 'mob-b-1',
              text: 'Architected React Native mobile app rewrite, cutting app bundle size by 42% and startup time from 2.8s to 750ms for 1.2M active users.',
            },
            {
              id: 'mob-b-2',
              text: 'Engineered offline-first sync engine using WatermelonDB and SQLite, resolving 99.8% of background sync conflicts during patchy network connectivity.',
            },
            {
              id: 'mob-b-3',
              text: 'Configured automated Fastlane CI/CD release pipeline, accelerating App Store and Google Play deployment cycles from 5 days to 2 hours.',
            },
          ],
        },
        {
          id: 'mob-exp-2',
          company: 'Pulse Mobility Inc.',
          position: 'Mobile Software Engineer',
          location: 'San Francisco, CA',
          startDate: '2019-05',
          endDate: '2021-12',
          isCurrent: false,
          bullets: [
            {
              id: 'mob-b-4',
              text: 'Built real-time GPS tracking and Bluetooth Low Energy (BLE) peripheral integration in Swift and Kotlin for 50,000+ smart scooters.',
            },
            {
              id: 'mob-b-5',
              text: 'Maintained 99.95% crash-free session rate across 30+ Android OEM devices by implementing strict Sentry alerting and strict memory profiling.',
            },
          ],
        },
      ],
      projects: [
        {
          id: 'mob-proj-1',
          name: 'SwiftUI Micro-Animations Kit',
          role: 'Creator & Maintainer',
          summary: 'High-performance gesture-driven animations and physics spring transitions library for iOS.',
          technologies: ['Swift', 'SwiftUI', 'CoreAnimation', 'Combine'],
          url: 'https://github.com/jordanreed-dev/swiftui-springs',
          startDate: '2023-03',
          endDate: '2023-09',
          bullets: [
            {
              id: 'mob-b-6',
              text: 'Downloaded 24,000+ times via Swift Package Manager and starred by 850+ iOS developers.',
            },
          ],
        },
      ],
      skills: [
        {
          id: 'mob-sk-1',
          categoryName: 'Mobile Platforms',
          skills: ['React Native', 'Swift / SwiftUI', 'Kotlin / Jetpack Compose', 'TypeScript', 'Redux Toolkit', 'Fastlane'],
        },
        {
          id: 'mob-sk-2',
          categoryName: 'Architecture & Storage',
          skills: ['Offline-First Sync', 'SQLite', 'WatermelonDB', 'GraphQL', 'REST APIs', 'BLE (Bluetooth Low Energy)'],
        },
        {
          id: 'mob-sk-3',
          categoryName: 'Testing & DevOps',
          skills: ['Jest', 'Detox E2E Testing', 'App Store Connect', 'Google Play Console', 'Sentry Crashlytics'],
        },
      ],
      education: [
        {
          id: 'mob-edu-1',
          institution: 'University of Washington',
          degree: 'Bachelor of Science (B.S.)',
          fieldOfStudy: 'Computer Science',
          location: 'Seattle, WA',
          startDate: '2015-09',
          endDate: '2019-06',
          gpa: '3.82 / 4.0',
        },
      ],
      customSections: [],
      sectionConfig: {
        order: ['contact', 'summary', 'experience', 'projects', 'skills', 'education'],
        visibility: {
          contact: true,
          summary: true,
          experience: true,
          projects: true,
          skills: true,
          education: true,
          certifications: false,
          custom: false,
        },
        customTitles: {
          experience: 'Mobile Engineering Experience',
          projects: 'Featured Mobile Apps',
          skills: 'Technical Skills',
          education: 'Education',
        },
      },
      templateConfig: {
        engineMode: 'modern_clean',
        pageSize: 'A4',
        fontFamily: 'inter',
        accentColor: '#0284c7',
        spacingPreset: 'auto',
        autoFitEnabled: true,
        scaleLevel: 1,
        showIcons: false,
        showPhoto: false,
      },
    },
  },

  data_scientist: {
    label: 'Senior Data Scientist & Analytics Lead',
    category: 'Data & AI',
    description: 'Predictive modeling, causal inference, customer churn, and real-time SQL / Snowflake pipelines.',
    data: {
      version: '1.0.0',
      profile: {
        fullName: 'Dr. Maya Lin',
        targetRole: 'Senior Data Scientist & Analytics Lead',
        email: 'maya.lin.data@email.com',
        phone: '+1 (617) 492-7710',
        location: 'Boston, MA (Open to Remote)',
        website: 'https://mayalin.io',
        linkedin: 'linkedin.com/in/dr-maya-lin',
        github: 'github.com/mayalin-stats',
        summary:
          'Data Scientist with 7+ years translating terabyte-scale user telemetry into predictive models and actionable commercial strategy. Specialized in Python, SQL, causal inference, and XGBoost, generating $8.5M in ARR growth.',
      },
      experience: [
        {
          id: 'ds-exp-1',
          company: 'Beacon Analytics Group',
          position: 'Lead Data Scientist',
          location: 'Boston, MA',
          startDate: '2021-08',
          endDate: 'Present',
          isCurrent: true,
          bullets: [
            {
              id: 'ds-b-1',
              text: 'Developed customer churn prediction model in Python (LightGBM/XGBoost), decreasing enterprise churn by 18.2% and protecting $6.4M annual recurring revenue.',
            },
            {
              id: 'ds-b-2',
              text: 'Designed robust statistical A/B experimentation platform across 4.5M monthly visitors, detecting 1.8% conversion lift with 95% statistical power.',
            },
            {
              id: 'ds-b-3',
              text: 'Orchestrated automated dbt and Snowflake transformation workflows, shrinking executive KPI reporting refresh cycles from 18 hours to 25 minutes.',
            },
          ],
        },
        {
          id: 'ds-exp-2',
          company: 'Quantis Financial Tech',
          position: 'Data Scientist',
          location: 'New York, NY',
          startDate: '2018-06',
          endDate: '2021-07',
          isCurrent: false,
          bullets: [
            {
              id: 'ds-b-4',
              text: 'Constructed automated credit default risk scoring model handling 80,000+ daily loan applications, improving ROC-AUC from 0.76 to 0.89.',
            },
            {
              id: 'ds-b-5',
              text: 'Standardized company-wide data governance and feature engineering pipelines in PySpark and AWS Glue.',
            },
          ],
        },
      ],
      projects: [
        {
          id: 'ds-proj-1',
          name: 'CausalTree: Python Causal Inference Engine',
          role: 'Creator & Maintainer',
          summary: 'Open-source package implementing double machine learning (DML) and synthetic control methods for marketing attribution.',
          technologies: ['Python', 'SciPy', 'Scikit-Learn', 'Causal ML'],
          url: 'https://github.com/mayalin-stats/causaltree',
          startDate: '2022-10',
          endDate: '2023-06',
          bullets: [
            {
              id: 'ds-b-6',
              text: 'Adopted by 40+ analytics teams with over 18,000 pip downloads globally.',
            },
          ],
        },
      ],
      skills: [
        {
          id: 'ds-sk-1',
          categoryName: 'Languages & Modeling',
          skills: ['Python', 'SQL (Advanced)', 'R', 'PySpark', 'LightGBM / XGBoost', 'Scikit-Learn', 'Causal Inference'],
        },
        {
          id: 'ds-sk-2',
          categoryName: 'Data Engineering & Cloud',
          skills: ['Snowflake', 'dbt', 'AWS (Redshift, S3, Glue)', 'BigQuery', 'Apache Airflow', 'Pandas / NumPy'],
        },
        {
          id: 'ds-sk-3',
          categoryName: 'Visualization & BI',
          skills: ['Tableau', 'Looker / LookML', 'A/B Testing & Hypothesis Testing', 'Streamlit', 'Statsmodels'],
        },
      ],
      education: [
        {
          id: 'ds-edu-1',
          institution: 'Massachusetts Institute of Technology (MIT)',
          degree: 'Ph.D. / M.S.',
          fieldOfStudy: 'Computational Statistics & Data Science',
          location: 'Cambridge, MA',
          startDate: '2014-09',
          endDate: '2018-05',
          gpa: '3.96 / 4.0',
        },
      ],
      customSections: [],
      sectionConfig: {
        order: ['contact', 'summary', 'experience', 'projects', 'skills', 'education'],
        visibility: {
          contact: true,
          summary: true,
          experience: true,
          projects: true,
          skills: true,
          education: true,
          certifications: false,
          custom: false,
        },
        customTitles: {
          experience: 'Data Science & Analytics Experience',
          projects: 'Research & Open Source',
          skills: 'Technical Skills & Tools',
          education: 'Education',
        },
      },
      templateConfig: {
        engineMode: 'modern_clean',
        pageSize: 'A4',
        fontFamily: 'roboto',
        accentColor: '#059669',
        spacingPreset: 'auto',
        autoFitEnabled: true,
        scaleLevel: 1,
        showIcons: false,
        showPhoto: false,
      },
    },
  },

  financial_analyst: {
    label: 'Financial Analyst / Investment Banking',
    category: 'Business & Finance',
    description: 'Financial modeling, M&A valuation, DCF models, SaaS metrics, and SEC filing analysis.',
    data: {
      version: '1.0.0',
      profile: {
        fullName: 'David Sterling',
        targetRole: 'Senior Financial Analyst',
        email: 'david.sterling@email.com',
        phone: '+1 (212) 789-6541',
        location: 'New York, NY',
        website: '',
        linkedin: 'linkedin.com/in/david-sterling-cfa',
        summary:
          'Financial Analyst (CFA Level III Candidate) with 5+ years building 3-statement financial models, DCF valuations, and SaaS unit economics dashboards. Evaluated $450M+ in M&A transaction deal flow across enterprise tech.',
      },
      experience: [
        {
          id: 'fin-exp-1',
          company: 'Everpoint Capital Partners',
          position: 'Senior Financial Analyst',
          location: 'New York, NY',
          startDate: '2021-06',
          endDate: 'Present',
          isCurrent: true,
          bullets: [
            {
              id: 'fin-b-1',
              text: 'Built 3-statement dynamic financial models and LBO valuation frameworks for 12 M&A acquisitions totaling $280M aggregate transaction value.',
            },
            {
              id: 'fin-b-2',
              text: 'Engineered automated variance analysis dashboard connecting NetSuite and Power BI, saving finance team 15 hours per month on financial close.',
            },
            {
              id: 'fin-b-3',
              text: 'Drafted 24 executive investment committee memorandums and board presentations detailing revenue projections, CAGR, and downside scenarios.',
            },
          ],
        },
        {
          id: 'fin-exp-2',
          company: 'Meridian Advisory Group',
          position: 'Investment Banking Analyst',
          location: 'New York, NY',
          startDate: '2019-07',
          endDate: '2021-05',
          isCurrent: false,
          bullets: [
            {
              id: 'fin-b-4',
              text: 'Constructed DCF, precedent transactions, and comparable company (Comps) valuations for 18 mid-market B2B software companies.',
            },
            {
              id: 'fin-b-5',
              text: 'Analyzed 10-K, 10-Q SEC filings and audited balance sheets to identify $4.2M in recurring SG&A cost-optimization opportunities.',
            },
          ],
        },
      ],
      projects: [
        {
          id: 'fin-proj-1',
          name: 'SaaS Unit Economics & Cohort Retention Model',
          role: 'Lead Analyst',
          summary: 'Comprehensive financial model tracking CAC payback, LTV/CAC, Magic Number, and Net Revenue Retention (NRR).',
          technologies: ['Advanced Excel', 'VBA', 'Power BI', 'SQL'],
          startDate: '2022-03',
          endDate: '2022-09',
          bullets: [
            {
              id: 'fin-b-6',
              text: 'Adopted as standard valuation template across 8 investment fund portfolio companies.',
            },
          ],
        },
      ],
      skills: [
        {
          id: 'fin-sk-1',
          categoryName: 'Financial Modeling & Valuation',
          skills: ['3-Statement Modeling', 'Discounted Cash Flow (DCF)', 'LBO Modeling', 'M&A Valuation', 'Comparable Company Analysis (Comps)'],
        },
        {
          id: 'fin-sk-2',
          categoryName: 'Software & Tools',
          skills: ['Advanced Excel (VBA/Macros)', 'Bloomberg Terminal', 'Capital IQ', 'Power BI', 'NetSuite ERP', 'SQL'],
        },
        {
          id: 'fin-sk-3',
          categoryName: 'Corporate Finance & Reporting',
          skills: ['SaaS Metrics (LTV, CAC, NRR, ARR)', 'Variance Analysis', 'Budgeting & Forecasting', 'GAAP Accounting', 'Board Presentations'],
        },
      ],
      education: [
        {
          id: 'fin-edu-1',
          institution: 'New York University (NYU) - Stern School of Business',
          degree: 'Bachelor of Science (B.S.)',
          fieldOfStudy: 'Finance & Economics',
          location: 'New York, NY',
          startDate: '2015-09',
          endDate: '2019-05',
          gpa: '3.89 / 4.0',
          honors: 'Summa Cum Laude, Dean’s Honor List',
        },
      ],
      customSections: [],
      sectionConfig: {
        order: ['contact', 'summary', 'experience', 'projects', 'skills', 'education'],
        visibility: {
          contact: true,
          summary: true,
          experience: true,
          projects: true,
          skills: true,
          education: true,
          certifications: false,
          custom: false,
        },
        customTitles: {
          experience: 'Professional Finance Experience',
          projects: 'Financial Modeling Case Studies',
          skills: 'Core Competencies',
          education: 'Education',
        },
      },
      templateConfig: {
        engineMode: 'ats_classic',
        pageSize: 'Letter',
        fontFamily: 'merriweather',
        accentColor: '#1e3a8a',
        spacingPreset: 'auto',
        autoFitEnabled: true,
        scaleLevel: 1,
        showIcons: false,
        showPhoto: false,
      },
    },
  },

  cybersecurity: {
    label: 'Cybersecurity & SecOps Engineer',
    category: 'Engineering',
    description: 'SOC 2 compliance, threat detection, penetration testing, zero-trust cloud security, and SIEM.',
    data: {
      version: '1.0.0',
      profile: {
        fullName: 'Tariq Al-Mansoor',
        targetRole: 'Senior Cybersecurity & SecOps Engineer',
        email: 'tariq.almansoor@email.com',
        phone: '+1 (202) 555-0193',
        location: 'Washington, DC (Secret Clearance)',
        website: 'https://tariqsec.io',
        linkedin: 'linkedin.com/in/tariq-security',
        github: 'github.com/tariq-sec',
        summary:
          'Cybersecurity Engineer (CISSP, CEH) with 6+ years hardening cloud infrastructures and orchestrating SOC threat detection. Led zero-trust migration across 600+ microservices and achieved 100% compliance across SOC 2 Type II and ISO 27001.',
      },
      experience: [
        {
          id: 'sec-exp-1',
          company: 'CipherGuard Defense Systems',
          position: 'Senior Security Operations Engineer',
          location: 'Reston, VA',
          startDate: '2021-10',
          endDate: 'Present',
          isCurrent: true,
          bullets: [
            {
              id: 'sec-b-1',
              text: 'Spearheaded zero-trust network architecture across 600+ AWS Kubernetes microservices, eliminating lateral privilege escalation risks.',
            },
            {
              id: 'sec-b-2',
              text: 'Engineered automated SIEM detection rules in Splunk and AWS GuardDuty, slashing Mean Time to Detect (MTTD) from 4.2 hours to 6 minutes.',
            },
            {
              id: 'sec-b-3',
              text: 'Directed annual SOC 2 Type II, HIPAA, and ISO 27001 security audits with zero non-conformities identified across 4 consecutive quarters.',
            },
          ],
        },
        {
          id: 'sec-exp-2',
          company: 'Aegis Threat Intelligence',
          position: 'Cybersecurity Analyst',
          location: 'McLean, VA',
          startDate: '2018-07',
          endDate: '2021-09',
          isCurrent: false,
          bullets: [
            {
              id: 'sec-b-4',
              text: 'Conducted 35+ web application and network penetration tests using Burp Suite and Metasploit, identifying and patching 14 critical CVE vulnerabilities.',
            },
            {
              id: 'sec-b-5',
              text: 'Automated vulnerability scanning using Trivy and Snyk inside GitLab CI pipelines, preventing 240+ vulnerable packages from deploying to production.',
            },
          ],
        },
      ],
      projects: [
        {
          id: 'sec-proj-1',
          name: 'KubeAuditShield: Kubernetes Hardening Tool',
          role: 'Creator & Maintainer',
          summary: 'Automated CLI scanner auditing CIS Kubernetes benchmarks and RBAC misconfigurations.',
          technologies: ['Go', 'Kubernetes API', 'OPA Gatekeeper', 'Docker'],
          url: 'https://github.com/tariq-sec/kube-audit-shield',
          startDate: '2023-01',
          endDate: '2023-07',
          bullets: [
            {
              id: 'sec-b-6',
              text: 'Used by 2,500+ DevOps engineers and featured on Reddit /r/netsec and Hacker News.',
            },
          ],
        },
      ],
      skills: [
        {
          id: 'sec-sk-1',
          categoryName: 'Security & Compliance',
          skills: ['Zero-Trust Architecture', 'SOC 2 Type II', 'ISO 27001', 'Threat Modeling', 'Incident Response', 'CIS Benchmarks'],
        },
        {
          id: 'sec-sk-2',
          categoryName: 'Tools & SIEM',
          skills: ['Splunk Enterprise', 'AWS GuardDuty / SecurityHub', 'CrowdStrike Falcon', 'Burp Suite Pro', 'Wireshark', 'Snyk / Trivy'],
        },
        {
          id: 'sec-sk-3',
          categoryName: 'Cloud & Infrastructure',
          skills: ['AWS IAM & KMS', 'Kubernetes RBAC', 'Terraform', 'Linux Hardening', 'Python Scripting', 'Bash'],
        },
      ],
      education: [
        {
          id: 'sec-edu-1',
          institution: 'George Mason University',
          degree: 'Bachelor of Science (B.S.)',
          fieldOfStudy: 'Cybersecurity Engineering',
          location: 'Fairfax, VA',
          startDate: '2014-09',
          endDate: '2018-05',
          gpa: '3.85 / 4.0',
        },
      ],
      customSections: [],
      sectionConfig: {
        order: ['contact', 'summary', 'experience', 'projects', 'skills', 'education'],
        visibility: {
          contact: true,
          summary: true,
          experience: true,
          projects: true,
          skills: true,
          education: true,
          certifications: false,
          custom: false,
        },
        customTitles: {
          experience: 'Security Operations & Engineering',
          projects: 'Security Research & Tooling',
          skills: 'Security Competencies',
          education: 'Education',
        },
      },
      templateConfig: {
        engineMode: 'ats_classic',
        pageSize: 'A4',
        fontFamily: 'inter',
        accentColor: '#0f172a',
        spacingPreset: 'auto',
        autoFitEnabled: true,
        scaleLevel: 1,
        showIcons: false,
        showPhoto: false,
      },
    },
  },

  marketing_growth: {
    label: 'Growth & Digital Marketing Specialist',
    category: 'Business & Finance',
    description: 'B2B/B2C SaaS demand gen, SEO/SEM performance marketing, multi-touch attribution, and CRM funnels.',
    data: {
      version: '1.0.0',
      profile: {
        fullName: 'Chloe Bennett',
        targetRole: 'Growth & Digital Marketing Lead',
        email: 'chloe.bennett@email.com',
        phone: '+1 (310) 555-0842',
        location: 'Los Angeles, CA (Open to Remote)',
        website: 'https://chloegrowth.com',
        linkedin: 'linkedin.com/in/chloe-bennett-growth',
        summary:
          'Growth Marketing Lead with 6+ years managing $4M+ annual paid media budgets across Google Ads, Meta, and LinkedIn. Scaled B2B SaaS pipeline from $1.2M to $8.5M ARR while decreasing customer acquisition cost (CAC) by 32%.',
      },
      experience: [
        {
          id: 'mkt-exp-1',
          company: 'ScaleMetric Technologies',
          position: 'Senior Growth Marketing Manager',
          location: 'Los Angeles, CA',
          startDate: '2021-08',
          endDate: 'Present',
          isCurrent: true,
          bullets: [
            {
              id: 'mkt-b-1',
              text: 'Managed $2.8M annual performance marketing budget across Google Search, LinkedIn, and Meta, generating 4,200+ qualified enterprise sales leads at 32% lower CAC.',
            },
            {
              id: 'mkt-b-2',
              text: 'Spearheaded organic SEO editorial strategy, growing non-brand organic traffic from 45,000 to 380,000 monthly visits within 14 months.',
            },
            {
              id: 'mkt-b-3',
              text: 'Constructed multi-touch attribution model in HubSpot and Looker, identifying top 3 highest-converting content nurture workflows.',
            },
          ],
        },
        {
          id: 'mkt-exp-2',
          company: 'Ventura Digital Media',
          position: 'Demand Generation Specialist',
          location: 'San Diego, CA',
          startDate: '2018-06',
          endDate: '2021-07',
          isCurrent: false,
          bullets: [
            {
              id: 'mkt-b-4',
              text: 'Designed automated email onboarding drip campaigns in Marketo for 85,000+ freemium users, lifting trial-to-paid conversion by 24.6%.',
            },
            {
              id: 'mkt-b-5',
              text: 'Ran 120+ landing page A/B tests using Webflow and Unbounce, boosting average landing page conversion rate from 3.2% to 7.8%.',
            },
          ],
        },
      ],
      projects: [
        {
          id: 'mkt-proj-1',
          name: 'The SaaS Growth Playbook',
          role: 'Author & Creator',
          summary: 'Framework on full-funnel B2B demand generation, lead scoring formulas, and CAC optimization.',
          technologies: ['Google Analytics 4', 'HubSpot', 'Looker', 'Webflow'],
          url: 'https://chloegrowth.com/playbook',
          startDate: '2022-09',
          endDate: '2023-04',
          bullets: [
            {
              id: 'mkt-b-6',
              text: 'Downloaded by 8,000+ marketing directors and featured on MarketingProfs and GrowthHackers.',
            },
          ],
        },
      ],
      skills: [
        {
          id: 'mkt-sk-1',
          categoryName: 'Acquisition & Paid Media',
          skills: ['Google Ads (Search/Display)', 'LinkedIn Campaign Manager', 'Meta Ads Manager', 'SEO / Content Strategy', 'A/B Testing'],
        },
        {
          id: 'mkt-sk-2',
          categoryName: 'Marketing Ops & Analytics',
          skills: ['HubSpot CRM', 'Marketo', 'Google Analytics 4 (GA4)', 'Looker Studio', 'Segment CDP', 'Zapier Automation'],
        },
        {
          id: 'mkt-sk-3',
          categoryName: 'Strategy & Funnel',
          skills: ['Full-Funnel Demand Gen', 'CAC / LTV Optimization', 'Lead Scoring', 'Conversion Rate Optimization (CRO)', 'Webflow'],
        },
      ],
      education: [
        {
          id: 'mkt-edu-1',
          institution: 'University of California, Los Angeles (UCLA)',
          degree: 'Bachelor of Arts (B.A.)',
          fieldOfStudy: 'Communication & Digital Media Studies',
          location: 'Los Angeles, CA',
          startDate: '2014-09',
          endDate: '2018-05',
          gpa: '3.84 / 4.0',
        },
      ],
      customSections: [],
      sectionConfig: {
        order: ['contact', 'summary', 'experience', 'projects', 'skills', 'education'],
        visibility: {
          contact: true,
          summary: true,
          experience: true,
          projects: true,
          skills: true,
          education: true,
          certifications: false,
          custom: false,
        },
        customTitles: {
          experience: 'Growth & Marketing Experience',
          projects: 'Featured Growth Campaigns',
          skills: 'Marketing Competencies',
          education: 'Education',
        },
      },
      templateConfig: {
        engineMode: 'modern_clean',
        pageSize: 'A4',
        fontFamily: 'inter',
        accentColor: '#7c3aed',
        spacingPreset: 'auto',
        autoFitEnabled: true,
        scaleLevel: 1,
        showIcons: false,
        showPhoto: false,
      },
    },
  },
};


export type AccentColor =
  | "indigo"
  | "teal"
  | "coral"
  | "orange"
  | "yellow"
  | "violet"
  | "blue"
  | "green";

export const profile = {
  name: "Solano de Zuasnabar",
  role: "AI Engineer",
  location: "Tucumán — Argentina",
  email: "solanodz.dev@gmail.com",
  phone: "+54 381 664 0453",
  summary:
    "AI Engineer with experience building and deploying production-grade AI systems — from LLM-powered backends and RAG pipelines to computer vision and automation workflows. I work autonomously in fast-moving environments, taking ownership from prototype to production and iterating based on real usage and stakeholder feedback.",
  links: [
    { label: "GitHub", href: "https://github.com/solanodz", handle: "solanodz" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/solanodz",
      handle: "in/solanodz",
    },
    { label: "Email", href: "mailto:solanodz.dev@gmail.com", handle: "solanodz.dev@gmail.com" },
  ],
};

export type IconName =
  | "briefcase"
  | "sparkles"
  | "message-square"
  | "scan-search"
  | "line-chart"
  | "brain"
  | "workflow"
  | "refresh-cw";

export type ProjectDetailBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export type ProjectHighlight = {
  title: string;
  detail: string | ProjectDetailBlock[];
  icon: IconName;
};

export type ClientEngagement = {
  id: string;
  context: string;
  summary: string;
  stack?: string[];
  highlights: ProjectHighlight[];
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  current?: boolean;
  color: AccentColor;
  icon: IconName;
  logo?: string;
  website?: string;
  summary: string;
  stack: string[];
  context?: string;
  highlights?: ProjectHighlight[];
  clients?: ClientEngagement[];
};

export const experience: Experience[] = [
  {
    id: "EXP-002",
    company: "Tecnología BI",
    role: "AI Engineer",
    period: "Jun 2024 — Present",
    current: true,
    color: "teal",
    icon: "briefcase",
    logo: "/tecbi_logo.jpeg",
    website: "https://tecnologiabi.com/",
    summary:
      "Design and deployment of production AI systems for multiple clients — direct stakeholder contact and ownership from prototype through iteration in production.",
    stack: [
      "Python",
      "FastAPI",
      "Celery",
      "OpenAI API",
      "SQL Server",
      "Redis",
      "Polars",
      "Docker",
      "n8n",
      "Vector DBs",
      "Computer Vision",
    ],
    clients: [
      {
        id: "CLI-BSG",
        context: "Blue Star Group · Isadora & Todomoda",
        summary:
          "Built and maintained AI tools for a large fashion retail group — semantic product search with store maps, product description workflows, and a multimodal design assistant for internal teams.",
        stack: [
          "Python",
          "Next.js",
          "Streamlit",
          "FastAPI",
          "OpenAI API",
          "Google AI",
          "Qdrant",
          "Pinecone",
          "Supabase",
          "Google Maps API",
          "SQL Server",
        ],
        highlights: [
          {
            title: "Hybrid SKU search & store map",
            icon: "scan-search",
            detail: [
              {
                type: "p",
                text: "Streamlit app for fashion retail teams to find products by image, text, or both — and see matching stores on an interactive map.",
              },
              {
                type: "p",
                text: "What I built and owned:",
              },
              {
                type: "ul",
                items: [
                  "Multimodal embedding search over Qdrant with metadata filters (brand, category, collection, capsule) and automatic category prediction from uploaded photos via the OpenAI API.",
                  "Hybrid image + text queries with configurable result limits and dynamic filter panels.",
                  "Interactive Google Maps view of retail locations — geocoded from an address or Maps link, with brand-specific markers and store detail popups.",
                  "Tabbed UI combining the SKU finder and store map in one workflow for field and HQ teams.",
                ],
              },
            ],
          },
          {
            title: "AI product descriptions",
            icon: "brain",
            detail: [
              {
                type: "p",
                text: "Existing Next.js platform for generating product copy from images and category context — separate design and e-commerce modules were already in place when I took over the work.",
              },
              {
                type: "p",
                text: "What I maintained and improved:",
              },
              {
                type: "ul",
                items: [
                  "Production support for both modules — individual and bulk flows, Excel export, and day-to-day fixes.",
                  "OpenAI API integrations for description generation and automatic category prediction from product photos.",
                  "Category tree, set-product flags, and image input paths (local upload and URL-based).",
                  "Iterated on prompts and UX with feedback from design and e-commerce teams.",
                ],
              },
            ],
          },
          {
            title: "Excel translation pipeline",
            icon: "workflow",
            detail: [
              {
                type: "p",
                text: "Streamlit tool for translating fashion product spreadsheets to English and Portuguese, tuned for retail copy and import into existing product-management workflows.",
              },
              {
                type: "p",
                text: "What I built and owned:",
              },
              {
                type: "ul",
                items: [
                  "OpenAI API translation with domain-specific prompts; UI available in Portuguese, Spanish, or English.",
                  "Auto-detects translatable columns, skips identifiers like SKU, and cleans duplicate headers in messy workbooks.",
                  "Row-limit control to sample large files before running a full batch.",
                  "Two export modes: complete workbook with new translation columns, or a standardized template aligned with their PIM import format.",
                ],
              },
            ],
          },
          {
            title: "Design Assistant",
            icon: "sparkles",
            detail: [
              {
                type: "p",
                text: "Internal Next.js app for design teams — multimodal chat to generate and iterate on product visuals from reference images and natural-language instructions.",
              },
              {
                type: "p",
                text: "What I built and owned:",
              },
              {
                type: "ul",
                items: [
                  "Chat with up to two reference images per turn, conversation history, and image generation via Google AI.",
                  "Mask-based inpaint for localized edits; load product photos by SKU from the corporate asset system.",
                  "Reusable prompt templates by product category and curated image collections.",
                  "Supabase Auth, Postgres + Storage with RLS, and guardrails so generated packaging stays faithful to supplied references.",
                ],
              },
            ],
          },
          {
            title: "Vector recommendation pipeline",
            icon: "line-chart",
            detail: [
              {
                type: "p",
                text: "ETL pipeline and FastAPI backend that powers semantic product similarity search — ingests catalog data, processes images, and serves hybrid vector retrieval.",
              },
              {
                type: "p",
                text: "What I built and owned:",
              },
              {
                type: "ul",
                items: [
                  "Multi-stage pipeline: dataset ingestion, image preprocessing, color extraction, and indexing in Pinecone.",
                  "Hybrid dense + sparse embeddings with configurable blending between vector spaces.",
                  "FastAPI service exposing approximate nearest-neighbor search for the SKU search frontends.",
                  "Orchestrated batch runs with logging and failure tracking across the full ingest-to-index flow.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "CLI-INT",
        context: "Integra · Agricultural SaaS",
        summary:
          "Owned two FastAPI backends for an agricultural SaaS product — a natural-language analytics chatbot over warehouse views, and a read-only alerts platform with cached snapshots and optional AI-assisted discovery.",
        stack: [
          "Python",
          "FastAPI",
          "Celery",
          "Redis",
          "SQL Server",
          "Polars",
          "OpenAI API",
          "WeasyPrint",
          "Docker",
          "Pydantic",
        ],
        highlights: [
          {
            title: "Data chatbot",
            icon: "message-square",
            detail: [
              {
                type: "p",
                text: "Natural-language analytics backend for agricultural business data. Users explore curated SQL Server views through conversation instead of writing SQL or browsing raw schemas.",
              },
              {
                type: "p",
                text: "What I built and owned:",
              },
              {
                type: "ul",
                items: [
                  "Scheduled view discovery with automatic reprocessing when definitions change.",
                  "Async profiling pipeline — sampling, aggregate statistics, and OpenAI API–assisted interpretation, validated before anything reaches users.",
                  "Conversational REST and SSE APIs with tool calling: catalog lookup, readonly warehouse queries, and on-demand charts.",
                  "Excel, PDF, and conversation report exports, with per-turn audit logging.",
                ],
              },
            ],
          },
          {
            title: "Business alerts platform",
            icon: "line-chart",
            detail: [
              {
                type: "p",
                text: "Read-only alerts service for an internal operations dashboard. The data warehouse evaluates business rules upstream; this backend serves the latest evaluated state quickly — it does not run the evaluation engine itself.",
              },
              {
                type: "p",
                text: "What I built and owned:",
              },
              {
                type: "ul",
                items: [
                  "Validated snapshot cache with scheduled and on-demand refresh, plus freshness metadata for the UI.",
                  "Filtered alert listing with default ordering suited to operations workflows.",
                  "Bounded endpoints to update alert definitions and severity thresholds in the warehouse.",
                  "Optional on-demand draft suggestions for new alerts via the OpenAI API — review-only proposals, never auto-inserted.",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "EXP-001",
    company: "Develative",
    context: "Vento Ventures · Venture capital firm",
    role: "AI Engineer",
    period: "Nov 2025 — Jan 2026",
    color: "indigo",
    icon: "sparkles",
    logo: "/develative_logo.jpeg",
    website: "https://develative.com/",
    summary:
      "Venture capital startup. Built AI-driven automation workflows to support an internal investment management platform.",
    stack: ["Python", "OpenAI API", "Zapier", "Gmail API", "REST APIs"],
    highlights: [
      {
        title: "Startup Onboarding Automation",
        icon: "workflow",
        detail:
          "Designed Zapier automations triggered by Gmail labels to process portfolio-company emails, extract structured data from bodies and attachments (contracts, banking documents) via the OpenAI API, and create startup records through POST requests to a custom backend.",
      },
      {
        title: "Real-time Data Sync",
        icon: "refresh-cw",
        detail:
          "Built a metrics update workflow using PATCH requests — identifying startups by domain and automatically syncing KPIs to the web interface in real time.",
      },
    ],
  },
];

export type SkillGroup = {
  label: string;
  items: string[];
  href?: string;
  summary?: string;
  command?: string;
  owned?: boolean;
};

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript"],
  },
  {
    label: "AI & LLMs",
    items: [
      "OpenAI API",
      "Google AI",
      "RAG pipelines",
      "Embeddings",
      "Semantic search",
      "Multimodal search",
      "Tool calling & agents",
    ],
  },
  {
    label: "Backend",
    items: [
      "FastAPI",
      "Celery",
      "REST & webhooks",
      "SSE streaming",
      "Pydantic",
      "Polars",
      "WeasyPrint",
    ],
  },
  {
    label: "Data & storage",
    items: [
      "SQL Server",
      "PostgreSQL / Supabase",
      "Redis",
      "Qdrant",
      "Pinecone",
    ],
  },
  {
    label: "Frontend",
    items: ["Next.js", "Streamlit", "Tailwind CSS", "shadcn/ui"],
  },
  {
    label: "Automation & infra",
    items: [
      "Docker",
      "n8n",
      "Zapier",
      "Git / GitHub",
      "Vercel",
      "MCP servers",
    ],
  },
];

export type AgentSkillGroup = {
  label: string;
  href?: string;
  summary: string;
  items: string[];
  owned?: boolean;
};

export const agentSkills: AgentSkillGroup[] = [
  {
    label: "Harness Engineering",
    href: "https://github.com/solanodz/harness-engineering-skills",
    summary:
      "My npm skill pack — install once, then agents follow scope, verify, and resume workflows.",
    owned: true,
    items: [
      "Scaffold",
      "Audit",
      "State",
      "Lifecycle",
      "Scope",
      "Verification",
    ],
  },
  {
    label: "Matt Pocock",
    href: "https://skills.sh/mattpocock/skills",
    summary: "Planning, prototyping, and code review.",
    items: ["Grill me", "TDD", "Diagnose", "Prototype", "Review", "To issues"],
  },
  {
    label: "Superpowers",
    href: "https://github.com/obra/superpowers",
    summary: "Structured debugging, TDD, and agent workflows.",
    items: [
      "Brainstorming",
      "Systematic debugging",
      "Test-driven development",
      "Writing plans",
      "Verification before completion",
      "Executing plans",
    ],
  },
  {
    label: "Vercel",
    href: "https://skills.sh/vercel",
    summary: "Next.js, AI SDK, and production frontend patterns.",
    items: [
      "Next.js",
      "AI SDK",
      "React best practices",
      "Verification",
      "shadcn/ui",
      "AI Gateway",
    ],
  },
  {
    label: "Cursor",
    href: "https://cursor.com/docs/context/skills",
    summary: "Reviews, PR workflow, and agent tooling.",
    items: ["Review", "SDK", "Babysit", "Split to PRs", "Create skill", "Bugbot review"],
  },
  {
    label: "Supabase",
    href: "https://supabase.com/docs/guides/getting-started/ai-skills",
    summary: "Postgres, auth, and backend integration.",
    items: ["Supabase", "Postgres best practices"],
  },
  {
    label: "Writing",
    summary: "Blog posts, articles, and long-form drafts.",
    items: ["Edit article", "Writing shape", "Writing fragments", "Writing beats"],
  },
];

export type AdditionalWork = {
  lead: string;
  detail: string;
};

export const additional: AdditionalWork[] = [
  {
    lead: "Harness Engineering skills",
    detail:
      "npm package (harness-skills) with agent skills for Cursor, Claude Code, and Codex — npx harness-skills install.",
  },
  {
    lead: "RAG chatbots end-to-end",
    detail:
      "Document ingestion, chunking, embedding management, vector store integration, and LLM response generation.",
  },
  {
    lead: "Web scraping pipelines",
    detail: "Data collection and enrichment with BeautifulSoup and requests.",
  },
  {
    lead: "MCP server integrations",
    detail: "Connecting AI models with external tools and data sources.",
  },
  {
    lead: "Supabase-backed projects",
    detail: "Personal projects using PostgreSQL for backend data management.",
  },
];

export const languages = [
  { name: "Spanish", level: "Native" },
  { name: "English", level: "Advanced — C1" },
];

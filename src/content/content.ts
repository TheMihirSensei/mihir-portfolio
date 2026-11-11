/**
 * ─────────────────────────────────────────────────────────────
 *  ALL personal content lives here.
 *  Every section of the site reads from this file.
 * ─────────────────────────────────────────────────────────────
 */

export type Profile = {
  name: string;
  shortName: string;
  role: string;
  pitch: string;
  location: string;
  timezone: string;
  available: boolean;
  availabilityNote: string;
  email: string;
  domain: string;
  resumeUrl: string;
  photo?: string; // put an image in /public and reference it, e.g. "/me.jpg"
  /** Where to focus the photo crop (x% y%) and how much to zoom in. */
  photoFocus?: { x: number; y: number; zoom: number };
  bio: string[];
  careerStartYear: number;
  /** Extra stats shown next to "years shipping" in the About section. */
  stats: { value: string; label: string }[];
  links: { label: string; href: string; rel: string }[];
};

export type FrontendSkill = { name: string; detail: string; children?: FrontendSkill[] };

export type Project = {
  slug: string;
  name: string;
  kind: "FE" | "BE" | "FULL";
  method: "GET" | "POST" | "PUT" | "PATCH";
  tagline: string;
  description: string;
  stack: string[];
  highlights: string[];
  org: string; // company / client the project was built at
  live?: string;
  repo?: string;
  status: number; // fun: 200 = shipped, 202 = in progress, 418 = side quest
};

export type Service = {
  id: string;
  name: string;
  tools: { name: string; level: number }[]; // level 1-5
  note: string;
  x: number; // position in the graph (0-100)
  y: number;
};

export type Experience = {
  id: number;
  company: string;
  role: string;
  start: string; // "2023-04"
  end: string | null; // null = present
  location: string;
  summary: string;
  achievements: string[];
  stack: string[];
};

export type Education = {
  id: number;
  institution: string;
  degree: string;
  year: string;
  note?: string;
};

export const profile: Profile = {
  name: "Mihir Sidhdhapura",
  shortName: "Mihir",
  role: "Full Stack Developer",
  pitch:
    "I build production-grade web platforms end to end: NestJS and Node.js APIs, React and Next.js frontends, and the AWS infrastructure underneath.",
  location: "Surat, Gujarat, India",
  timezone: "IST (UTC+5:30)",
  available: false,
  availabilityNote: "Open to new opportunities",
  email: "mihirsidhdhapura41@gmail.com",
  domain: "mihir.dev",
  resumeUrl: "/mihir_sidhdhapura_resume.pdf",
  photo: "/profile.jpg",
  photoFocus: { x: 45, y: 68, zoom: 1.9 },
  bio: [
    "I'm a full stack developer with 4+ years of building scalable, production-grade web platforms, mostly backend-first, with hands-on frontend delivery in React and Redux.",
    "My core stack is Node.js, NestJS and TypeScript on top of MongoDB, PostgreSQL and AWS. I've built REST and GraphQL APIs, microservices and event-driven systems on Lambda, SQS and SNS, and I enjoy the unglamorous wins: a 60% faster query, a zero-downtime migration.",
    "I've worked remotely with global clients across e-commerce, healthcare and B2B, led a migration of 1M+ customer records for a major Australian retailer, and led a team of 5–6 developers building a B2B marketplace from scratch.",
  ],
  careerStartYear: 2022,
  stats: [
    { value: "1M+", label: "records migrated" },
    { value: "~60%", label: "faster queries" },
  ],
  links: [
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/mihir-sidhdhapura-40661b2b2",
      rel: "professional",
    },
    { label: "Email", href: "mailto:mihirsidhdhapura41@gmail.com", rel: "direct" },
  ],
};

export const frontendTree: FrontendSkill = {
  name: "Mihir",
  detail: "Root component. Turns APIs into interfaces people can actually use.",
  children: [
    {
      name: "React",
      detail: "Reusable component libraries wired to secure, versioned APIs.",
      children: [
        { name: "Next.js", detail: "Server-rendered React apps and full-stack features." },
        { name: "ReduxToolkit", detail: "Predictable state for data-heavy admin panels." },
      ],
    },
    {
      name: "Angular",
      detail: "Built the OTM B2B marketplace frontend.",
    },
    {
      name: "TypeScript",
      detail: "Typed end to end, from NestJS DTOs to React props.",
    },
    {
      name: "UI",
      detail: "Layouts that work everywhere.",
      children: [
        { name: "HTML5", detail: "Semantic, accessible markup." },
        { name: "CSS3", detail: "Responsive UI across devices." },
      ],
    },
    {
      name: "DataViz",
      detail: "Interactive charts for health insights and analytics dashboards.",
    },
  ],
};

export const projects: Project[] = [
  {
    slug: "officeworks-commercetools-migration",
    name: "Officeworks Commerce Migration",
    kind: "BE",
    method: "PUT",
    tagline: "1M+ customer records moved to CommerceTools with zero downtime",
    description:
      "For Officeworks, a major Australian retailer, I led the migration of over a million customer records (with addresses, organizations and branch data) from IBM WebSphere Commerce to CommerceTools, alongside new NestJS APIs for catalog, pricing and orders.",
    stack: ["NestJS", "TypeScript", "CommerceTools", "AWS Lambda", "SQS / SNS", "Docker"],
    highlights: [
      "1M+ records migrated with full data integrity",
      "Zero downtime during cut-over",
      "API performance improved by 30%",
    ],
    org: "Overdose · client: Officeworks",
    status: 200,
  },
  {
    slug: "biohacker",
    name: "BioHacker",
    kind: "FULL",
    method: "POST",
    tagline: "Health-tracking platform syncing wearable data in real time",
    description:
      "I owned the backend for BioHacker: secure, scalable REST APIs consumed by the mobile app, plus a full React + Redux Toolkit admin panel for managing users, health insights, analytics and connected-device data.",
    stack: ["Node.js", "React", "Redux Toolkit", "MongoDB", "Fitbit API"],
    highlights: [
      "Real-time Fitbit sync for activity, sleep and vitals",
      "Privacy and consent flows for sensitive health data",
      "Interactive analytics visualizations",
    ],
    org: "SmartData",
    status: 200,
  },
  {
    slug: "otm-b2b-marketplace",
    name: "OTM B2B Marketplace",
    kind: "FULL",
    method: "POST",
    tagline: "A complete B2B marketplace, built from scratch with a team of 5–6",
    description:
      "I led a team of 5–6 developers to build a full B2B marketplace covering user management, product catalog, orders and payments, working with product owners to turn business needs into technical specs.",
    stack: ["Express.js", "MongoDB", "Angular", "Socket.IO", "Docker", "AWS"],
    highlights: [
      "Led a team of 5–6 developers",
      "Real-time chat with Socket.IO",
      "CI/CD pipelines for faster releases",
    ],
    org: "ITCode Infotech",
    status: 200,
  },
  {
    slug: "healify",
    name: "Healify",
    kind: "FULL",
    method: "GET",
    tagline: "Healthcare appointment platform for patients and doctors",
    description:
      "A modular backend and admin panel to manage patients, doctors and appointment schedules, with security practices suited to patient data.",
    stack: ["Node.js", "MongoDB", "React"],
    highlights: [
      "Role-based access control (RBAC)",
      "Real-time notifications",
      "HIPAA-aligned security practices",
    ],
    org: "ITCode Infotech",
    status: 200,
  },
];

export const services: Service[] = [
  {
    id: "runtime",
    name: "Runtime",
    tools: [
      { name: "Node.js", level: 5 },
      { name: "NestJS", level: 5 },
      { name: "Express.js", level: 5 },
    ],
    note: "Where business logic lives.",
    x: 50,
    y: 16,
  },
  {
    id: "auth",
    name: "Auth",
    tools: [
      { name: "JWT", level: 5 },
      { name: "OAuth 2.0", level: 4 },
      { name: "RBAC", level: 4 },
      { name: "AWS IAM", level: 4 },
    ],
    note: "Who you are and what you can touch.",
    x: 16,
    y: 34,
  },
  {
    id: "api",
    name: "API",
    tools: [
      { name: "REST", level: 5 },
      { name: "GraphQL", level: 4 },
      { name: "Socket.IO", level: 4 },
      { name: "Swagger / OpenAPI", level: 4 },
    ],
    note: "Contracts between systems.",
    x: 84,
    y: 34,
  },
  {
    id: "data",
    name: "Data",
    tools: [
      { name: "MongoDB", level: 5 },
      { name: "PostgreSQL", level: 4 },
      { name: "Query & index optimization", level: 5 },
    ],
    note: "Schemas, indexes, migrations.",
    x: 30,
    y: 72,
  },
  {
    id: "messaging",
    name: "Cache & Events",
    tools: [
      { name: "Redis", level: 4 },
      { name: "AWS SQS / SNS", level: 4 },
      { name: "RabbitMQ", level: 3 },
      { name: "AWS Lambda", level: 4 },
    ],
    note: "Fast reads, async and event-driven work.",
    x: 70,
    y: 72,
  },
  {
    id: "infra",
    name: "Infra & CI/CD",
    tools: [
      { name: "AWS (EC2, CloudWatch)", level: 4 },
      { name: "Docker", level: 4 },
      { name: "NGINX", level: 3 },
      { name: "GitHub Actions", level: 4 },
    ],
    note: "From git push to production.",
    x: 50,
    y: 90,
  },
];

/** Edges of the services graph (by service id). */
export const serviceEdges: [string, string][] = [
  ["runtime", "auth"],
  ["runtime", "api"],
  ["auth", "data"],
  ["api", "messaging"],
  ["data", "messaging"],
  ["data", "infra"],
  ["messaging", "infra"],
  ["runtime", "data"],
];

export const experience: Experience[] = [
  {
    id: 4,
    company: "ITCode Infotech",
    role: "Full Stack Developer",
    start: "2025-06",
    end: null,
    location: "Surat, India",
    summary: "Rehired after my 2022–2023 tenure. I own end-to-end feature delivery across client projects.",
    achievements: [
      "Deliver features end to end, from database design and NestJS/Node.js APIs to React/Next.js UIs",
      "Build reusable React components with Redux Toolkit on top of versioned REST and GraphQL APIs",
      "Optimize MongoDB and PostgreSQL schemas and queries, with Redis caching for high-traffic endpoints",
      "Containerize services with Docker and ship to AWS through GitHub Actions CI/CD",
      "Mentor junior developers, run code reviews and turn client requirements into specs and estimates",
    ],
    stack: ["NestJS", "Next.js", "PostgreSQL", "AWS"],
  },
  {
    id: 3,
    company: "Overdose",
    role: "Backend Developer",
    start: "2024-02",
    end: "2025-05",
    location: "Australia (Remote)",
    summary: "Client: Officeworks, a major Australian retailer.",
    achievements: [
      "Led migration of 1M+ customer records from IBM WebSphere Commerce to CommerceTools with zero downtime",
      "Built scalable NestJS REST APIs for product catalog, pricing and order management",
      "Built event-driven microservices on AWS Lambda, SQS and SNS",
      "Refactored legacy logic for a 30% API performance gain, monitored with CloudWatch",
      "Implemented secure authentication and authorization with AWS IAM",
    ],
    stack: ["NestJS", "TypeScript", "AWS", "CommerceTools"],
  },
  {
    id: 2,
    company: "SmartData",
    role: "MERN Stack Developer",
    start: "2023-04",
    end: "2024-02",
    location: "Punjab, India (Remote)",
    summary: "Project: BioHacker, a health-tracking platform.",
    achievements: [
      "Owned the backend: secure, scalable REST APIs for the mobile app, from architecture to delivery",
      "Built the full admin panel in React + Redux Toolkit with interactive visualizations",
      "Integrated Fitbit data to sync activity, sleep and vitals in real time",
      "Implemented data-privacy and user-consent flows for sensitive health data",
    ],
    stack: ["Node.js", "React", "Redux Toolkit", "Fitbit API"],
  },
  {
    id: 1,
    company: "ITCode Infotech",
    role: "Backend Developer (Intern → Full-time)",
    start: "2022-03",
    end: "2023-04",
    location: "Surat, India",
    summary: "Converted from intern to full-time backend developer.",
    achievements: [
      "Designed RESTful APIs from scratch with Node.js and Express",
      "Cut MongoDB query time by ~60% with index optimization; sped up responses with Redis caching",
      "Deployed containerized services on AWS EC2; built real-time chat with Socket.IO",
      "Ran code reviews and refactored legacy modules for maintainability",
    ],
    stack: ["Node.js", "Express.js", "MongoDB", "Redis"],
  },
];

export const education: Education[] = [
  {
    id: 1,
    institution: "Government Engineering College, Patan",
    degree: "B.E., Computer Science & Engineering",
    year: "2018 – 2022",
    note: "CGPA 8.13 / 10",
  },
];

/* ─────────────────────────────────────────────────────────────
 *  Off the clock: side projects, learning, hobbies.
 *  Shown in the "Background Jobs" layer.
 * ───────────────────────────────────────────────────────────── */

export type SideQuest = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** 200 = live, 202 = in development */
  status: 200 | 202;
  statusNote: string;
  live?: string;
  liveLabel?: string;
  tags: string[];
  favorite?: boolean;
};

export type Learning = { topic: string; detail: string };

export type Hobby = {
  /** cron-style schedule, purely for fun */
  schedule: string;
  command: string;
  comment: string;
};

export const sideQuests: SideQuest[] = [
  {
    slug: "otaku-shinden",
    name: "Otaku Shinden",
    tagline: "A hidden village for anime fans",
    description:
      "A community platform for anime fans that I build and run. Earn your rank, find your guild, and join events, missions, debates and watch parties. Of everything I've built, this one is closest to my heart.",
    status: 200,
    statusNote: "live · actively running",
    live: "https://otakushinden.com",
    liveLabel: "otakushinden.com",
    tags: ["community", "anime"],
    favorite: true,
  },
  {
    slug: "whatsapp-trading-bot",
    name: "WhatsApp Trading Bot",
    tagline: "A fintech bot that lives inside WhatsApp",
    description:
      "A fintech bot for trading that runs entirely in WhatsApp chat (not real stocks). It's live and working on WhatsApp today.",
    status: 200,
    statusNote: "live on WhatsApp",
    tags: ["fintech", "bot", "whatsapp"],
  },
  {
    slug: "naayuki",
    name: "Naayuki",
    tagline: "Indian handloom, cut for the modern wardrobe",
    description:
      "A clothing brand I'm working on. The website is in development: Capsule 01 is taking shape.",
    status: 202,
    statusNote: "in development",
    live: "https://naayuki-web-322247491424.asia-northeast1.run.app/",
    liveLabel: "preview",
    tags: ["fashion", "e-commerce"],
  },
];

export const learning: Learning[] = [
  { topic: "AI", detail: "Building with LLMs, beyond just using them" },
  { topic: "MCP", detail: "Writing my own Model Context Protocol servers" },
];

export const hobbies: Hobby[] = [
  { schedule: "@daily", command: "gym --mode=freak", comment: "non-negotiable" },
  { schedule: "@whenever_possible", command: "play cricket", comment: "bat, bowl, repeat" },
  { schedule: "@whenever_possible", command: "play badminton", comment: "" },
  { schedule: "@inspired", command: "draw --ink", comment: "part-time artist · just completed Inktober ✓" },
];

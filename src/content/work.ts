export type WorkItem = {
  slug: string;
  title: string;
  domain: string;
  summary: string;
  stack: string[];
  // Case-study write-up. Add only confirmed, shareable details.
  sections?: { heading: string; text: string }[];
};

// Placeholder case studies drawn from the launch plan. Add results and
// metrics only once each is confirmed shareable.
export const featuredWork: WorkItem[] = [
  {
    slug: "integration-heavy-rails",
    title: "Integration-heavy Rails portals",
    domain: "SaaS architecture & performance",
    summary: "Keeping a portal platform with many third-party integrations fast and maintainable.",
    stack: ["Rails", "PostgreSQL", "Sidekiq"],
  },
  {
    slug: "wheelwise",
    title: "WheelWise PK",
    domain: "AI product, end to end",
    summary: "Natural-language vehicle search, scraping and price suggestion in one product.",
    stack: ["Next.js", "LLMs", "Scraping"],
  },
  {
    slug: "telehealth-platform",
    title: "HIPAA-aligned telehealth platform",
    domain: "Healthtech",
    summary: "Architecture for video visits and a clinical records portal, designed for compliance.",
    stack: ["Rails", "WebRTC", "AWS"],
  },
];

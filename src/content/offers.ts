export type Offer = {
  title: string;
  audience: string;
  summary: string;
  included: string[];
  terms: string;
};

export const offers: Offer[] = [
  {
    title: "Rails rescue & performance audit",
    audience: "Startups with an ageing Rails app",
    summary: "Slow queries, Sidekiq backlogs, caching and framework upgrades, found and fixed.",
    included: ["Query and N+1 analysis", "Background job and caching review", "Upgrade path and risk report", "Prioritised fix plan"],
    terms: "Fixed-fee audit, then a fix sprint or retainer",
  },
  {
    title: "AI features & automation",
    audience: "SaaS teams adding AI without hiring",
    summary: "Streaming, tool calling, MCP, agents and RAG that ship to production and keep working.",
    included: ["Streaming and tool-calling features", "MCP servers and agent workflows", "RAG over your own data", "n8n and workflow automation"],
    terms: "Scoped per feature",
  },
  {
    title: "Healthtech & fintech builds",
    audience: "Founders and teams in regulated spaces",
    summary: "Telehealth and EMR portals, WebRTC, billing, payment gateways and banking automation.",
    included: ["Compliance-aware architecture", "Video, billing and payment integrations", "Audit-friendly data handling", "Weekly demos"],
    terms: "Phased delivery with weekly demos",
  },
  {
    title: "SaaS MVP to production",
    audience: "Non-technical founders",
    summary: "From idea to a live product on Rails or Next.js, PostgreSQL and AWS/GCP.",
    included: ["Scoped phases", "CI/CD and hosting setup", "Authentication, billing and admin", "Handover and documentation"],
    terms: "Scoped in phases",
  },
  {
    title: "Technical consulting & fractional tech lead",
    audience: "Teams with an existing product",
    summary: "Architecture reviews, hiring input and day-to-day technical leadership, a few hours at a time.",
    included: ["Architecture and code review", "Roadmap and trade-off guidance", "Mentoring your engineers", "Vendor and tooling decisions"],
    terms: "Monthly retainer or hourly",
  },
  {
    title: "Websites & stores",
    audience: "Small businesses",
    summary: "Figma to Next.js, WordPress, WooCommerce or Shopify, plus lead-generation landing pages.",
    included: ["Design-to-code build", "Store setup and payments", "SEO basics and analytics", "Landing pages for campaigns"],
    terms: "Fixed-price packages",
  },
];


export const featuredOffers = offers.slice(0, 3);

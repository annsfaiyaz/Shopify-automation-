import type { Metadata } from "next";
import { AboutSection } from "@/components/about-section";

export const metadata: Metadata = {
  title: "About — Ahsan Faiyaz",
  description: "Senior software and AI engineer with 8+ years in production SaaS.",
};

export default function AboutPage() {
  return <AboutSection as="h1" />;
}

import type { Metadata } from "next";
import { WorkSection } from "@/components/work-section";

export const metadata: Metadata = {
  title: "Work — Ahsan Faiyaz",
  description: "Selected SaaS, AI and healthtech projects.",
};

export default function WorkPage() {
  return <WorkSection as="h1" />;
}

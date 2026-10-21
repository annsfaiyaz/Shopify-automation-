import type { Metadata } from "next";
import { ProcessSection } from "@/components/process-section";

export const metadata: Metadata = {
  title: "Process — Ahsan Faiyaz",
  description: "How an engagement runs: discovery, fixed scope, weekly demos, handover and support.",
};

export default function ProcessPage() {
  return <ProcessSection as="h1" />;
}

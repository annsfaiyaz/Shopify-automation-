import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProcessSection } from "@/components/process-section";
import { OffersSection } from "@/components/offers-section";
import { Reveal } from "@/components/reveal";
import { ServiceGallery } from "@/components/service-gallery";
import { ServiceSelector } from "@/components/service-selector";
import { WorkSection } from "@/components/work-section";

export default function Home() {
  return (
    <main>
      <HeroSection
        name="Ahsan Faiyaz"
        initials="AF"
        lines={[
          "Senior software &",
          "AI engineer for SaaS,",
          "FinTech & HealthTech.",
          "I fix slow systems and",
          "ship AI that works.",
        ]}
        imageSrc="/ahsan-hero.jpg"
        avatarSrc="/ahsan.jpg"
        imageAlt="Portrait of Ahsan Faiyaz"
      />
      <Reveal><OffersSection /></Reveal>
      <ServiceGallery />
      <Reveal><WorkSection /></Reveal>
      <Reveal><AboutSection /></Reveal>
      <Reveal><ProcessSection /></Reveal>
      <ServiceSelector />
    </main>
  );
}

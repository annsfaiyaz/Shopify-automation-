import { HeroSection } from "@/components/hero-section";
import { ServiceSelector } from "@/components/service-selector";

export default function Home() {
  return (
    <main>
      <HeroSection
        name="Ahsan Faiyaz"
        initials="YN"
        lines={[
          "Creative developer.",
          "Bringing ideas to life",
          "at the intersection",
          "of design & code.",
        ]}
        // Add your image to public, then set imageSrc="/your-portrait.jpg".
        // Set imageAlt to a description of your photo.
      />
      <ServiceSelector />
    </main>
  );
}

import { SectionHeading } from "./section-heading";
import styles from "./about-section.module.css";

export function AboutSection({ as }: { as?: "h1" | "h2" } = {}) {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <SectionHeading as={as} id="about-title" eyebrow="About" title="One senior engineer, start to finish" />
      <div className={styles.grid}>
        <p className={styles.lead}>
          8+ years in production SaaS. I handle architecture, backend, front end and AI myself, so you work with one
          accountable person instead of a handoff chain.
        </p>
        <ul className={styles.facts}>
          <li><span>Focus</span>Rails, Next.js, PostgreSQL, AWS/GCP</li>
          <li><span>Domains</span>SaaS, FinTech, HealthTech</li>
          <li><span>Credential</span>Claude Certified Architect (Foundations)</li>
        </ul>
      </div>
    </section>
  );
}

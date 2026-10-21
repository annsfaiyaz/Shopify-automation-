import { processSteps } from "@/content/process";
import { SectionHeading } from "./section-heading";
import styles from "./process-section.module.css";

export function ProcessSection({ as }: { as?: "h1" | "h2" } = {}) {
  return (
    <section id="process" className={styles.section} aria-labelledby="process-title">
      <SectionHeading as={as} id="process-title" eyebrow="Process" title="How an engagement runs" />
      <ol className={styles.steps}>
        {processSteps.map((step, index) => (
          <li key={step.title}>
            <span className={styles.number}>{index + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

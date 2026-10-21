import { featuredWork } from "@/content/work";
import Link from "next/link";
import { SectionHeading } from "./section-heading";
import styles from "./work-section.module.css";

export function WorkSection({ as }: { as?: "h1" | "h2" } = {}) {
  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <SectionHeading as={as} id="work-title" eyebrow="Selected work" title="Built, shipped, running" />
      <ul className={styles.list}>
        {featuredWork.map((item) => (
          <li key={item.slug} className={styles.card}>
            <div className={styles.cover} aria-hidden="true"><div className={styles.halftone} /></div>
            <div className={styles.body}>
              <p className={styles.domain}>{item.domain}</p>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <ul className={styles.stack} aria-label="Stack">
                {item.stack.map((tech) => <li key={tech}>{tech}</li>)}
              </ul>
              <Link className={styles.soon} href={`/work/${item.slug}`}>View case study →</Link>
            </div>
          </li>
        ))}
      </ul>
      <Link className={styles.more} href="/work">All work →</Link>
    </section>
  );
}

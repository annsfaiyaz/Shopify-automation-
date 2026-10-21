import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { offers } from "@/content/offers";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Services — Ahsan Faiyaz",
  description: "Rails rescue, AI features, healthtech and fintech builds, MVPs and fractional tech lead work.",
};

export default function ServicesPage() {
  return (
    <section className={styles.section} aria-labelledby="services-title">
      <SectionHeading as="h1" id="services-title" eyebrow="Services" title="How I can help" />
      <ol className={styles.list}>
        {offers.map((offer, index) => (
          <li key={offer.title} className={styles.item}>
            <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2>{offer.title}</h2>
              <p className={styles.audience}>{offer.audience}</p>
              <p>{offer.summary}</p>
            </div>
            <div>
              <ul className={styles.included} aria-label="Included">
                {offer.included.map((line) => <li key={line}>{line}</li>)}
              </ul>
              <p className={styles.terms}>{offer.terms}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

import Link from "next/link";
import { featuredOffers } from "@/content/offers";
import { SectionHeading } from "./section-heading";
import styles from "./offers-section.module.css";

export function OffersSection({ as }: { as?: "h1" | "h2" } = {}) {
  return (
    <section id="services" className={styles.section} aria-labelledby="services-title">
      <SectionHeading as={as} id="services-title" eyebrow="Services" title="Problems I solve" />
      <ol className={styles.list}>
        {featuredOffers.map((offer, index) => (
          <li key={offer.title} className={styles.card}>
            <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
            <h3>{offer.title}</h3>
            <p className={styles.audience}>{offer.audience}</p>
            <p>{offer.summary}</p>
            <p className={styles.terms}>{offer.terms}</p>
          </li>
        ))}
      </ol>
      <Link className={styles.more} href="/services">All services →</Link>
    </section>
  );
}

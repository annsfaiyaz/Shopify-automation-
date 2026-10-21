import type { Metadata } from "next";
import { ServiceSelector } from "@/components/service-selector";
import { site } from "@/content/site";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact — Ahsan Faiyaz",
  description: "Tell me what you need and send a project brief.",
};

export default function ContactPage() {
  return (
    <>
      <h1 className={styles.srOnly}>Contact</h1>
      <ServiceSelector />
      {(site.email || site.bookingUrl) && (
        <p className={styles.direct}>
          {site.bookingUrl && <a href={site.bookingUrl}>Book a 20-minute call</a>}
          {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
        </p>
      )}
    </>
  );
}

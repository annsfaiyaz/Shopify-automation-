import Link from "next/link";
import { site, siteLinks } from "@/content/site";
import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© {site.name}</span>
      <nav aria-label="Footer">
        {siteLinks.map(({ label, href }) => <Link key={href} href={href}>{label}</Link>)}
      </nav>
    </footer>
  );
}

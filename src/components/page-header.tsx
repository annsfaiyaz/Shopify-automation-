import { site } from "@/content/site";
import { Navbar } from "./navbar";
import styles from "./page-header.module.css";

export function PageHeader() {
  return (
    <header className={styles.header}>
      <Navbar name={site.name} initials={site.initials} />
    </header>
  );
}

import Image from "next/image";
import { Navbar } from "./navbar";
import styles from "./hero-section.module.css";

type HeroLink = { label: string; href: string };

type HeroSectionProps = {
  name: string;
  initials: string;
  lines: string[];
  imageSrc?: string;
  imageAlt?: string;
  navigation?: HeroLink[];
  socials?: HeroLink[];
  status?: string;
};

export function HeroSection({
  name,
  initials,
  lines,
  imageSrc,
  imageAlt = `Portrait of ${name}`,
  navigation = [],
  socials = [],
  status = "Open to what's next",
}: HeroSectionProps) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title" id="home">
      <a className={styles.skipLink} href="#hero-title">Skip to content</a>
      <header className={styles.header}>
        <Navbar name={name} initials={initials} links={navigation.length ? navigation : undefined} />
      </header>
      <div className={styles.stage}>
        <h1 id="hero-title" className={styles.title} tabIndex={-1}>
          <span className={styles.name}>{name}.</span>
          {lines.map((line, index) => <span key={`${index}-${line}`}>{line}</span>)}
        </h1>
        <div className={`${styles.portrait} ${imageSrc ? styles.hasImage : ""}`}>
          {imageSrc ? (
            <Image className={styles.image} src={imageSrc} alt={imageAlt} fill
              sizes="(max-width: 700px) 100vw, 45vw" preload />
          ) : (
            <div className={styles.placeholder}>
              <span className={styles.placeholderMark} aria-hidden="true">+</span>
              <span>Your portrait here</span>
              <span className={styles.placeholderIndex}>[ Image 01 ]</span>
            </div>
          )}
          <div className={styles.halftone} aria-hidden="true" />
        </div>
      </div>
      <footer className={styles.footer}>
        {socials.length > 0 ? (
          <nav aria-label="Social links" className={styles.socials}>
            <span>Socials</span>
            {socials.map(({ label, href }) => <a key={href} href={href}>{label}</a>)}
          </nav>
        ) : <span>Design <span className={styles.muted}>{"//"}</span> Development</span>}
        <span className={styles.status}><span className={styles.statusDot} aria-hidden="true" />{status}</span>
        <span className={styles.signature}>A little thought. <span className={styles.muted}>A lot of craft.</span></span>
      </footer>
    </section>
  );
}

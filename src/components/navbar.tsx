"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css";

type NavLink = { label: string; href: string };

const defaultLinks: NavLink[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
];

type NavbarProps = {
  name: string;
  initials: string;
  avatarSrc?: string;
  links?: NavLink[];
  contactHref?: string;
};

export function Navbar({ name, initials, avatarSrc, links = defaultLinks, contactHref = "/contact" }: NavbarProps) {
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setCompact(window.scrollY >= window.innerHeight);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.getElementById("navbar-menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <nav aria-label="Main navigation" className={styles.navbar} data-compact={compact}>
      <Link className={styles.brand} href="/#home" onClick={() => setMenuOpen(false)}>
        <span className={styles.avatar}>
          {avatarSrc ? <Image src={avatarSrc} alt="" width={34} height={34} /> : <span aria-hidden="true">{initials}</span>}
        </span>
        <span className={styles.name}>{name}</span>
      </Link>
      <div id="navbar-links" className={styles.links} data-open={menuOpen}>
        {links.map(({ label, href }) => (
          <Link key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</Link>
        ))}
        <Link href={contactHref} className={styles.mobileContact} onClick={() => setMenuOpen(false)}>Book a call</Link>
      </div>
      <Link className={styles.contact} href={contactHref}>Book a call</Link>
      <button id="navbar-menu-toggle" className={styles.menuToggle} type="button"
        aria-expanded={menuOpen} aria-controls="navbar-links"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setMenuOpen(!menuOpen)}>
        <span /> <span />
      </button>
    </nav>
  );
}

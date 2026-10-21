"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { offers } from "@/content/offers";
import { SectionHeading } from "./section-heading";
import styles from "./service-gallery.module.css";

const arrangements = [
  { id: "coverflow", label: "Coverflow" },
  { id: "grid", label: "Grid" },
  { id: "mosaic", label: "Mosaic" },
  { id: "list", label: "List" },
  { id: "row", label: "Row" },
] as const;

type Arrangement = (typeof arrangements)[number]["id"];

// Signed shortest distance from the active card, so the carousel loops.
const wrapOffset = (index: number, active: number, total: number) => {
  const distance = (((index - active) % total) + total) % total;
  return distance > total / 2 ? distance - total : distance;
};

const spring = { type: "spring", stiffness: 260, damping: 32 } as const;

export function ServiceGallery() {
  const [arrangement, setArrangement] = useState<Arrangement>("coverflow");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = openIndex === null ? null : offers[openIndex];
  const coverflow = arrangement === "coverflow";
  const step = (by: number) => setActive((value) => (value + by + offers.length) % offers.length);
  const handleKeys = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    step(event.key === "ArrowRight" ? 1 : -1);
  };

  const close = () => {
    const index = openIndex;
    setOpenIndex(null);
    if (index !== null) window.requestAnimationFrame(() => triggers.current[index]?.focus({ preventScroll: true }));
  };

  useEffect(() => {
    if (openIndex === null) return;
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenIndex(null);
        window.requestAnimationFrame(() => triggers.current[openIndex]?.focus({ preventScroll: true }));
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [openIndex]);

  return (
    <MotionConfig reducedMotion="user" transition={spring}>
      <section id="showcase" className={styles.section} aria-labelledby="showcase-title">
        <div className={styles.top}>
          <SectionHeading id="showcase-title" eyebrow="Showcase" title="Explore what I offer" />
          <div className={styles.switcher} role="group" aria-label="Gallery arrangement">
            {arrangements.map(({ id, label }) => (
              <button key={id} type="button" aria-pressed={arrangement === id}
                data-active={arrangement === id} onClick={() => setArrangement(id)}>
                {label}
                {arrangement === id && <motion.span layoutId="switcher-pill" className={styles.pill} aria-hidden="true" />}
              </button>
            ))}
          </div>
        </div>

        {coverflow ? (
          <>
            <motion.div className={styles.stage} role="group" aria-roledescription="carousel"
              aria-label="Services. Use left and right arrows to browse." onKeyDown={handleKeys}
              style={{ touchAction: "pan-y" }}
              onPanEnd={(_, info) => { if (Math.abs(info.offset.x) > 60) step(info.offset.x < 0 ? 1 : -1); }}>
              {offers.map((offer, index) => {
                const offset = wrapOffset(index, active, offers.length);
                const distance = Math.abs(offset);
                const hidden = distance >= 3;
                return (
                  <motion.button key={offer.title} type="button" className={styles.flowCard}
                    ref={(node) => { triggers.current[index] = node; }}
                    data-active={offset === 0} aria-hidden={hidden || undefined} tabIndex={hidden ? -1 : 0}
                    aria-label={offset === 0 ? `Open details: ${offer.title}` : `Show ${offer.title}`}
                    aria-haspopup={offset === 0 ? "dialog" : undefined}
                    style={{ zIndex: 10 - distance, borderRadius: 28, pointerEvents: hidden ? "none" : "auto" }}
                    initial={false}
                    animate={{
                      x: `${offset * 64}%`,
                      z: -distance * 100,
                      rotateY: offset === 0 ? 0 : offset > 0 ? -48 : 48,
                      scale: 1 - distance * 0.05,
                      opacity: hidden ? 0 : 1 - distance * 0.18,
                    }}
                    onClick={() => (offset === 0 ? setOpenIndex(index) : setActive(index))}>
                    <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                    <span className={styles.title}>{offer.title}</span>
                    <span className={styles.audience}>{offer.audience}</span>
                    <span className={styles.flowSummary}>{offer.summary}</span>
                  </motion.button>
                );
              })}
            </motion.div>
            <div className={styles.controls}>
              <button type="button" onClick={() => step(-1)} aria-label="Previous service">←</button>
              <span aria-live="polite">{String(active + 1).padStart(2, "0")} / {String(offers.length).padStart(2, "0")}</span>
              <button type="button" onClick={() => step(1)} aria-label="Next service">→</button>
            </div>
          </>
        ) : (
        <ul className={styles.gallery} data-arrangement={arrangement}>
          {offers.map((offer, index) => (
            <motion.li key={offer.title} layout style={{ borderRadius: 32 }} className={styles.item}>
              <motion.button layoutId={`card-${index}`} style={{ borderRadius: 32 }} type="button"
                ref={(node) => { triggers.current[index] = node; }}
                className={styles.card} data-hidden={openIndex === index}
                aria-haspopup="dialog" onClick={() => setOpenIndex(index)}>
                <motion.span layout="position" className={styles.index}>{String(index + 1).padStart(2, "0")}</motion.span>
                <motion.span layout="position" className={styles.title}>{offer.title}</motion.span>
                <motion.span layout="position" className={styles.audience}>{offer.audience}</motion.span>
                <span className={styles.open} aria-hidden="true">+</span>
              </motion.button>
            </motion.li>
          ))}
        </ul>
        )}

        <AnimatePresence>
          {open && openIndex !== null && (
            <div className={styles.overlay} key="overlay">
              <motion.div className={styles.backdrop} onClick={close}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
              <motion.div layoutId={`card-${openIndex}`} style={{ borderRadius: 36 }} className={styles.detail}
                initial={coverflow ? { opacity: 0, y: 24 } : undefined} exit={coverflow ? { opacity: 0, y: 24 } : undefined}
                role="dialog" aria-modal="true" aria-labelledby="gallery-detail-title">
                <motion.span className={styles.index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {String(openIndex + 1).padStart(2, "0")}
                </motion.span>
                <h3 id="gallery-detail-title">{open.title}</h3>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <p className={styles.audience}>{open.audience}</p>
                  <p>{open.summary}</p>
                  <ul className={styles.included} aria-label="Included">
                    {open.included.map((line) => <li key={line}>{line}</li>)}
                  </ul>
                  <p className={styles.terms}>{open.terms}</p>
                  <Link className={styles.cta} href="/contact">Discuss this</Link>
                </motion.div>
                <button ref={closeRef} type="button" className={styles.close} onClick={close} aria-label="Close details">×</button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>
    </MotionConfig>
  );
}

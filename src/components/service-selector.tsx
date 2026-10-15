"use client";

import { useRef, useState } from "react";
import type { CSSProperties, FormEvent, KeyboardEvent } from "react";
import styles from "./service-selector.module.css";

const services = ["web design", "branding", "development"] as const;
const offsets = [-2, -1, 0, 1, 2];

export function ServiceSelector() {
  const [selected, setSelected] = useState(0);
  const [step, setStep] = useState<"service" | "brief">("service");
  const [message, setMessage] = useState("");
  const [brief, setBrief] = useState("");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const currentRef = useRef<HTMLButtonElement>(null);
  const service = services[selected];

  const choose = (offset: number) => {
    setSelected((value) => (value + offset + services.length) % services.length);
    currentRef.current?.focus({ preventScroll: true });
  };

  const handleKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    choose(event.key === "ArrowDown" ? 1 : -1);
  };

  const openBrief = () => {
    setStep("brief");
    window.requestAnimationFrame(() => titleRef.current?.focus({ preventScroll: true }));
  };

  const copyBrief = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = `Project enquiry: ${service}\nName: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("details")}`;
    setBrief(text);
    try {
      await navigator.clipboard.writeText(text);
      setMessage("Brief copied. It's ready to share.");
    } catch {
      setMessage("Select and copy your brief below.");
    }
  };

  return (
    <section id="services" className={styles.section} aria-label="Start a project">
      <div id="contact" className={styles.panel}>
        {step === "service" ? (
          <div className={styles.selector}>
            <h2 className={styles.prompt}>I need</h2>
            <div className={styles.wheel} onKeyDown={handleKeys} role="group" aria-label="Choose a service. Use up and down arrows to browse.">
              {offsets.map((offset) => {
                const label = services[(selected + offset + services.length) % services.length];
                return (
                  <button key={offset} type="button" ref={offset === 0 ? currentRef : undefined}
                    className={styles.service} data-selected={offset === 0}
                    style={{ "--offset": offset } as CSSProperties}
                    aria-pressed={offset === 0} aria-label={`Select ${label}`}
                    tabIndex={Math.abs(offset) === 2 ? -1 : 0}
                    onClick={() => choose(offset)}>
                    <span key={label}>{label}</span>
                  </button>
                );
              })}
            </div>
            <button type="button" className={styles.next} onClick={openBrief}>
              next <svg viewBox="0 0 60 48" aria-hidden="true"><path d="M4 24h48M33 5l19 19-19 19" /></svg>
            </button>
            <p className={styles.srOnly} aria-live="polite">Selected service: {service}</p>
          </div>
        ) : (
          <div className={styles.brief}>
            <button type="button" className={styles.back} onClick={() => { setStep("service"); setMessage(""); setBrief(""); }}>← change service</button>
            <h2 ref={titleRef} tabIndex={-1}>Let&apos;s make<br />it happen.</h2>
            <p className={styles.chosen}>I need <span>{service}</span></p>
            <form onSubmit={copyBrief}>
              <div className={styles.fields}>
                <label>Your name<input name="name" autoComplete="name" required maxLength={120} placeholder="What's your name?" /></label>
                <label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" /></label>
              </div>
              <label>A little about your project<textarea name="details" required rows={3} maxLength={4000} placeholder="The idea, the ambition, the timeline…" /></label>
              <button className={styles.copy} type="submit">Copy project brief ↗</button>
              <p className={styles.feedback} role="status">{message}</p>
              {brief && <textarea className={styles.result} aria-label="Your project brief" value={brief} readOnly rows={5} onFocus={(event) => event.target.select()} />}
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

import styles from "./section-heading.module.css";

type SectionHeadingProps = { id: string; eyebrow: string; title: string; as?: "h1" | "h2" };

export function SectionHeading({ id, eyebrow, title, as: Tag = "h2" }: SectionHeadingProps) {
  return (
    <div className={styles.heading}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <Tag id={id} className={styles.title}>{title}</Tag>
    </div>
  );
}

import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { featuredWork } from "@/content/work";
import styles from "./case-study.module.css";

export function generateStaticParams() {
  return featuredWork.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = featuredWork.find((work) => work.slug === slug);
  return item ? { title: `${item.title} — Ahsan Faiyaz`, description: item.summary } : {};
}

export default function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  return (
    <Suspense fallback={null}>
      <CaseStudy params={params} />
    </Suspense>
  );
}

async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = featuredWork.find((work) => work.slug === slug);
  if (!item) notFound();

  return (
    <article className={styles.article}>
      <Link className={styles.back} href="/work">← All work</Link>
      <p className={styles.domain}>{item.domain}</p>
      <h1>{item.title}</h1>
      <p className={styles.summary}>{item.summary}</p>
      <ul className={styles.stack} aria-label="Stack">
        {item.stack.map((tech) => <li key={tech}>{tech}</li>)}
      </ul>
      {item.sections?.length ? (
        item.sections.map(({ heading, text }) => (
          <section key={heading}>
            <h2>{heading}</h2>
            <p>{text}</p>
          </section>
        ))
      ) : (
        <p className={styles.note}>The full write-up is being prepared and checked for confidentiality before it is published.</p>
      )}
      <Link className={styles.cta} href="/contact">Discuss a similar project</Link>
    </article>
  );
}

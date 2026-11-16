import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import RansomWord from "@/components/ransom/RansomWord";
import PageFrame from "@/components/works/PageFrame";
import ProjectCard from "@/components/works/ProjectCard";
import styles from "@/components/works/works.module.css";
import { CATEGORIES, projectsIn } from "@/lib/projects";

// in Next.js 16 the route params arrive as a promise
type Props = { params: Promise<{ category: string }> };

const findCategory = (id: string) => CATEGORIES.find((c) => c.id === id);

// one page per category: /works/coding, /works/3d, /works/art
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const c = findCategory(category);
  if (!c) return {};
  return { title: `${c.label} · Richard Okelu`, description: c.blurb };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const current = findCategory(category);
  if (!current) notFound();

  const projects = projectsIn(current.id);

  // the other two categories, in order, starting with the one after this
  const i = CATEGORIES.indexOf(current);
  const next = CATEGORIES[(i + 1) % CATEGORIES.length];
  const after = CATEGORIES[(i + 2) % CATEGORIES.length];

  return (
    <PageFrame current={current.id}>
      <section className={styles.intro} aria-labelledby="category-title">
        <h1 id="category-title" className={styles.titleTag}>
          <RansomWord text={current.label} />
        </h1>
        <p className={styles.lead}>{current.blurb}</p>
      </section>

      <section
        className={styles.category}
        aria-label={`${current.label} projects`}
      >
        {projects.length > 0 ? (
          <ul className={styles.grid}>
            {projects.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>More on the way.</p>
        )}
      </section>

      {/* when you reach the end, offer the next section like turning a page */}
      <nav className={styles.keepLooking} aria-label="More works">
        <span className={styles.keepLabel}>Keep looking</span>
        <Link href={`/works/${next.id}`} className={styles.nextLink}>
          <span className={styles.nextTag}>Next</span>
          <span>
            <span className={styles.lblFirst}>{next.label[0]}</span>
            <span className={styles.lblRest}>{next.label.slice(1)}</span>
          </span>
          <span aria-hidden="true">›</span>
        </Link>
        <Link href={`/works/${after.id}`} className={styles.otherLink}>
          or {after.label} ›
        </Link>
      </nav>
    </PageFrame>
  );
}

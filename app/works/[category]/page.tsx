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

  return (
    <PageFrame>
      <section className={styles.intro} aria-labelledby="category-title">
        <h1 id="category-title" className={styles.titleTag}>
          <RansomWord text={current.label} />
        </h1>
        <p className={styles.lead}>{current.blurb}</p>

        {/* switch between the three categories */}
        <nav aria-label="Works categories">
          <ul className={styles.jump}>
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/works/${c.id}`}
                  className={styles.jumpLink}
                  aria-current={c.id === current.id ? "page" : undefined}
                >
                  <span className={styles.lblFirst}>{c.label[0]}</span>
                  <span className={styles.lblRest}>{c.label.slice(1)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
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
    </PageFrame>
  );
}

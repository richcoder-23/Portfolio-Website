import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import RansomWord from "@/components/ransom/RansomWord";
import PageFrame from "@/components/works/PageFrame";
import styles from "@/components/works/works.module.css";
import { CATEGORIES, PROJECTS, projectBySlug } from "@/lib/projects";

// in Next.js 16 the route params arrive as a promise
type Props = { params: Promise<{ category: string; slug: string }> };

// build a page for every project that has a details section,
// at /works/<category>/<slug>, e.g. /works/coding/portfolio
export function generateStaticParams() {
  return PROJECTS.filter((p) => p.details).map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} · Richard Okelu`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { category: categoryParam, slug } = await params;
  const project = projectBySlug(slug);
  // 404 unless the project exists, has a details page, and is in this category
  if (!project?.details || project.category !== categoryParam) notFound();

  const { title, summary, tools, image, links, details, category } = project;
  const categoryLabel = CATEGORIES.find((c) => c.id === category)?.label;

  return (
    <PageFrame
      back={{ href: `/works/${category}`, label: `all ${categoryLabel}` }}
    >
      <article className={styles.article} aria-labelledby="project-title">
        <header>
          <span className={styles.kicker}>Case file · {categoryLabel}</span>
          <h1 id="project-title" className={styles.articleTitle}>
            <RansomWord text={title} />
          </h1>
          <p className={styles.articleLead}>{summary}</p>

          {links && (
            <div className={styles.cardLinks}>
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={styles.button}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}

          {image && (
            <div className={styles.heroImage}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(max-width: 1120px) 100vw, 1000px"
              />
            </div>
          )}
        </header>

        <section className={styles.block} aria-labelledby="about-title">
          <h2 id="about-title" className={styles.blockTitle}>
            The full story
          </h2>
          <div className={styles.blockBody}>
            {details.description.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        </section>

        <section className={styles.block} aria-labelledby="problem-title">
          <h2 id="problem-title" className={styles.blockTitle}>
            The problem
          </h2>
          <div className={styles.blockBody}>
            {details.problem.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        </section>

        <section className={styles.block} aria-labelledby="features-title">
          <h2 id="features-title" className={styles.blockTitle}>
            Features
          </h2>
          <div className={styles.blockBody}>
            <ul className={styles.list}>
              {details.features.map((text, i) => (
                <li key={i}>{text}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.block} aria-labelledby="shots-title">
          <h2 id="shots-title" className={styles.blockTitle}>
            Screenshots
          </h2>
          <div className={styles.blockBody}>
            {details.screenshots.length > 0 ? (
              <div className={styles.shots}>
                {details.screenshots.map((shot) => (
                  <figure key={shot.src} className={styles.shot}>
                    <div className={styles.shotFrame}>
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        sizes="(max-width: 760px) 100vw, 400px"
                      />
                    </div>
                    {shot.caption && <figcaption>{shot.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            ) : (
              <p>Screenshots coming soon.</p>
            )}
          </div>
        </section>

        <section className={styles.block} aria-labelledby="tech-title">
          <h2 id="tech-title" className={styles.blockTitle}>
            Built with
          </h2>
          <div className={styles.blockBody}>
            <ul className={styles.tags}>
              {tools.map((tool) => (
                <li key={tool} className={styles.tag}>
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.block} aria-labelledby="learned-title">
          <h2 id="learned-title" className={styles.blockTitle}>
            What I learned
          </h2>
          <div className={styles.blockBody}>
            <ul className={styles.list}>
              {details.learned.map((text, i) => (
                <li key={i}>{text}</li>
              ))}
            </ul>
          </div>
        </section>
      </article>
    </PageFrame>
  );
}
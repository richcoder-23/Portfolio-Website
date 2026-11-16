import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import CardVideo from "./CardVideo";
import FullView from "./FullView";
import styles from "./works.module.css";

// one project: picture, name, short description, tech stack and links
export default function ProjectCard({ project }: { project: Project }) {
  const {
    title,
    summary,
    tools,
    image,
    video,
    full,
    fullVideo,
    links,
    details,
    slug,
    category,
    status,
  } = project;

  return (
    <article className={styles.card}>
      <div className={styles.cardImage}>
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 760px) 100vw, 360px"
          />
        ) : (
          <span className={styles.placeholder} aria-hidden="true">
            image coming soon
          </span>
        )}
        {/* a short silent loop over the image, with a play / pause button */}
        {video && (
          <CardVideo
            src={video}
            poster={image?.src}
            label={`${title} clip`}
          />
        )}
        {/* opens the uncropped picture, or the full video, in an overlay */}
        {image && (
          <FullView
            src={fullVideo ?? full ?? image.src}
            alt={image.alt}
            label={title}
            kind={fullVideo ? "video" : "image"}
          />
        )}
      </div>

      <div className={styles.cardBody}>
        {status && <span className={styles.status}>{status}</span>}
        <h3 className={styles.cardTitle}>
          <span className={styles.lblFirst}>{title[0]}</span>
          <span className={styles.lblRest}>{title.slice(1)}</span>
        </h3>

        <p className={styles.cardSummary}>{summary}</p>

        <span className={styles.tagsLabel}>Made with</span>
        <ul className={styles.tags}>
          {tools.map((tool) => (
            <li key={tool} className={styles.tag}>
              {tool}
            </li>
          ))}
        </ul>

        {(details || links?.length) && (
          <div className={styles.cardLinks}>
            {details && (
              <Link
                href={`/works/${category}/${slug}`}
                className={styles.button}
              >
                Full story ›
              </Link>
            )}
            {links?.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`${styles.button} ${styles.buttonGhost}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
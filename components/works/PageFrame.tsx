import Link from "next/link";
import RansomWord from "@/components/ransom/RansomWord";
import { SITE } from "@/lib/site";
import styles from "./works.module.css";

type Props = {
  children: React.ReactNode;
  // extra link shown in the header, e.g. "‹ all works" on a project page
  back?: { href: string; label: string };
};

// the header, background and "get in touch" footer shared by the works pages
export default function PageFrame({ children, back }: Props) {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <Link href="/" className={styles.nameTag} aria-label="Home">
            <span className={styles.name}>
              <RansomWord text={SITE.name} />
            </span>
            <span className={styles.place}>LAGOS · 2026</span>
          </Link>

          <nav aria-label="Page">
            <Link href={back?.href ?? "/"} className={styles.button}>
              ‹ {back?.label ?? "back to the revolver"}
            </Link>
          </nav>
        </header>

        <main>{children}</main>

        <footer className={styles.footer}>
          <div className={styles.cta}>
            <p className={styles.ctaText}>
              Got a project in mind? <em>Let&apos;s talk.</em>
            </p>
            <a
              className={`${styles.button} ${styles.buttonRed}`}
              href={`mailto:${SITE.email}`}
            >
              Get in touch ›
            </a>
          </div>
          <p className={styles.small}>
            © 2026 {SITE.name}. Built with Next.js.
          </p>
        </footer>
      </div>
    </div>
  );
}
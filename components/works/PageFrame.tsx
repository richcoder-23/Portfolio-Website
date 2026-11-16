import Link from "next/link";
import EmailActions from "@/components/contact/EmailActions";
import RansomWord from "@/components/ransom/RansomWord";
import { CATEGORIES } from "@/lib/projects";
import { SITE } from "@/lib/site";
import styles from "./works.module.css";

type Props = {
  children: React.ReactNode;
  // extra link shown in the header, e.g. "‹ all works" on a project page
  back?: { href: string; label: string };
  // the works category this page belongs to, highlighted in the small switcher
  current?: string;
};

// the header, background and "get in touch" footer shared by the works pages
export default function PageFrame({ children, back, current }: Props) {
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

          <nav aria-label="Works" className={styles.headerNav}>
            {/* small, quiet switcher between the three works pages */}
            <ul className={styles.switcher}>
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/works/${c.id}`}
                    className={styles.switchLink}
                    aria-current={c.id === current ? "page" : undefined}
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
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
            <EmailActions
              classes={{
                wrap: styles.ctaEmailWrap,
                email: styles.ctaEmail,
                actions: styles.ctaActions,
                copy: `${styles.button} ${styles.buttonRed}`,
                link: styles.ctaLink,
              }}
            />
          </div>
          <p className={styles.small}>
            © 2026 {SITE.name}. Built with Next.js.
          </p>
        </footer>
      </div>
    </div>
  );
}
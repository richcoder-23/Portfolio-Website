"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RansomWord from "@/components/ransom/RansomWord";
import EmailActions, { CopyEmailButton } from "@/components/contact/EmailActions";
import styles from "@/components/ransom/RansomWord.module.css";
import {
  ABOUT_SKILLS,
  SECTIONS,
  CHAMBERS,
  BASE_ANGLE,
  WORK_LINKS,
  labelOf,
  type Section,
} from "./data";

/* THE STATE MACHINE. the page is always in exactly one phase:
   idle    -> nothing happening, bullets clickable
   loading -> the cut-in plays (every shot)
   firing  -> recoil, flash, tracer, shake; bullets fade
   open    -> the panel is in place
   closing -> the panel leaves, bullets come back, then idle again */
type Phase = "idle" | "loading" | "firing" | "open" | "closing";

/* TIMING, in milliseconds after the click: about 1s from click to a settled panel.
   these must match the CSS durations (cut-in .55s, bullet lands .33s, panel .38s, panel out .26s) */
const TIMING = { reveal: 330, turn: 360, fire: 550, open: 650, close: 280 };

// joins class names, skipping any that are false or empty
const cx = (...names: (string | false | null | undefined)[]) =>
  names.filter(Boolean).join(" ");

export default function RevolverMenu() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [pending, setPending] = useState<Section | null>(null);
  const [section, setSection] = useState<Section | null>(null);
  const [loadedChamber, setLoadedChamber] = useState<number | null>(null);
  const [turns, setTurns] = useState(0);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const backRef = useRef<HTMLButtonElement>(null);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const later = (ms: number, fn: () => void) => {
    timers.current.push(setTimeout(fn, ms));
  };

  // stop any pending timers if the menu unmounts mid-shot
  useEffect(() => clearTimers, []);

  // when the panel opens, move keyboard focus to its back button
  useEffect(() => {
    if (phase === "open") backRef.current?.focus({ preventScroll: true });
  }, [phase]);

  function fire(name: Section) {
    if (phase !== "idle") return;
    clearTimers();
    // the chamber that currently sits at 9 o'clock, the loading spot
    const target = (((5 - turns) % 6) + 6) % 6;

    setPhase("loading");
    setPending(name);
    setLoadedChamber(null);
    later(TIMING.reveal, () => setLoadedChamber(target)); // bullet lands
    later(TIMING.turn, () => setTurns((t) => t + 1)); // cylinder turns
    later(TIMING.fire, () => {
      setPhase("firing");
      setPending(null);
      setSection(name);
    });
    later(TIMING.open, () => setPhase("open"));
  }

  function close() {
    if (phase !== "open") return;
    clearTimers();
    setPhase("closing");
    later(TIMING.close, () => {
      setPhase("idle");
      setSection(null);
      setLoadedChamber(null);
    });
  }

  const fired = phase === "firing" || phase === "open";
  const loading = phase === "loading";
  const status = loading ? "LOADING…" : phase === "idle" ? "EMPTY" : "SPENT";

  return (
    <main className={styles.menu}>
      <div className={styles.bg} aria-hidden="true" />

      <div className={cx(styles.stage, fired && styles.isFired)}>
        <div className={cx(styles.nameTag, styles.boil)}>
          <h1 className={styles.name}>
            <RansomWord text="Richard Okelu" />
          </h1>
          <span className={styles.place}>LAGOS · 2026</span>
        </div>

        <div className={styles.gunWrap}>
          <div className={styles.gunTilt}>
            <div className={styles.gunKick}>
              <Image
                className={styles.gun}
                src="/images/gun.png"
                alt="A revolver, side view"
                width={1216}
                height={643}
                loading="eager"
              />
            </div>
          </div>
          <div className={styles.tracer} aria-hidden="true" />
          <div className={styles.flashStar} aria-hidden="true" />
        </div>

        <div className={cx(styles.hud, styles.hudStatus)} role="status">
          <span className={cx(styles.hudDot, loading && styles.isLive)} />
          <span>inside chamber:</span>
          <b>{status}</b>
        </div>

        <div className={cx(styles.hud, styles.hudBottom)} aria-hidden="true">
          <div className={styles.hudAmmo}>
            <span className={styles.hudAmmoBig}>{loading ? 1 : 0}</span>
            <span className={styles.hudAmmoSmall}>/ 1</span>
          </div>
          <div className={styles.hudPrompts}>
            click a bullet to fire, click back to close.
          </div>
        </div>

        <div className={styles.instruction}>
          <span className={styles.instructionBig}>
            Pick your <em>shot</em>
          </span>
          <p>Click a bullet to load it and fire that section open.</p>
        </div>

        <nav className={styles.bullets} aria-label="Portfolio sections">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Fire ${s.label}`}
              className={cx(styles.bullet, pending === s.id && styles.isLoaded)}
              onClick={() => fire(s.id)}
            >
              <Image
                className={styles.bulletImg}
                src="/images/bullet.png"
                alt=""
                width={452}
                height={157}
                loading="eager"
              />
              <span className={styles.bulletLabel} aria-hidden="true">
                <span>
                  <span className={styles.lblFirst}>{s.label[0]}</span>
                  <span className={styles.lblRest}>{s.label.slice(1)}</span>
                </span>
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* the panel the shot opens */}
      <div
        className={cx(
          styles.shotWrap,
          phase === "open" && styles.isOpen,
          phase === "closing" && styles.isClosing,
        )}
      >
        <section
          className={cx(
            styles.shotPanel,
            styles.boil,
            section === "about" && styles.aboutPanel,
          )}
          aria-label={section ? labelOf(section) : "Section"}
        >
          <button
            ref={backRef}
            type="button"
            className={styles.shotBack}
            onClick={close}
          >
            ‹ back
          </button>
          <span className={styles.shotKicker}>target</span>

          {section && (
            <h2 className={styles.shotTitle}>
              <RansomWord text={labelOf(section)} />
            </h2>
          )}

          {section === "about" && (
            <>
              <p>
                Hi, I&apos;m Richard, a computer science student and creative
                developer based in Lagos.
              </p>
              <p>
                I build websites with a focus on the front end, and I make 3D
                models, animations and illustrations. I care about work that
                looks good <em>and</em> feels good to use.
              </p>
              <p>
                I&apos;m most interested in front-end development, game design
                and animation, especially where they meet: interfaces that move
                and play like a game. Like the revolver you just fired.
              </p>

              <dl className={styles.skills}>
                {ABOUT_SKILLS.map((group) => (
                  <div key={group.label} className={styles.skillRow}>
                    <dt className={styles.skillLabel}>{group.label}</dt>
                    <dd className={styles.skillTags}>
                      {group.tools.map((tool) => (
                        <span key={tool} className={styles.skillTag}>
                          {tool}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className={styles.shotActions}>
                <Link href="/works/coding" className={styles.shotButton}>
                  See my works ›
                </Link>
                <CopyEmailButton
                  className={`${styles.shotButton} ${styles.shotButtonRed}`}
                  label="Get in touch ›"
                />
              </div>
            </>
          )}

          {section === "works" && (
            <ul className={styles.shotLinks}>
              {WORK_LINKS.map((link) => (
                <li key={link.href}>
                  <a className={styles.shotLink} href={link.href}>
                    <span className={styles.lblFirst}>{link.label[0]}</span>
                    <span className={styles.lblRest}>
                      {link.label.slice(1)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}

          {section === "contact" && (
            <>
              <EmailActions
                classes={{
                  wrap: styles.contactWrap,
                  email: styles.shotEmail,
                  actions: styles.shotActions,
                  copy: `${styles.shotButton} ${styles.shotButtonRed}`,
                  link: styles.shotTextLink,
                }}
              />
              <p className={styles.shotNote}>
                Open to commissions, freelance and collaborations
              </p>
            </>
          )}
        </section>
      </div>

      {/* the cut-in close-up */}
      <div
        className={cx(styles.cutin, loading && styles.isOn)}
        aria-hidden="true"
      >
        <div className={styles.cutinBand} />
        <div className={styles.cutinPaper}>
          <div className={styles.cutinTitle}>
            <span className={styles.cutinKicker}>loading</span>
            {pending && <RansomWord text={labelOf(pending)} />}
          </div>
          <div className={styles.cylBox}>
            <div
              className={styles.cylTurn}
              style={{ transform: `rotate(${BASE_ANGLE + 60 * turns}deg)` }}
            >
              <Image
                className={styles.cylImg}
                src="/images/cylinder.png"
                alt=""
                width={760}
                height={769}
                loading="eager"
              />
              {CHAMBERS.map(([x, y], k) => (
                <div
                  key={k}
                  className={cx(
                    styles.cover,
                    loadedChamber === k && styles.isGone,
                  )}
                  style={{ left: `${x}%`, top: `${y}%` }}
                />
              ))}
            </div>
            <div className={styles.flier}>
              <Image
                src="/images/bullet.png"
                alt=""
                width={452}
                height={157}
                loading="eager"
              />
            </div>
            <div className={styles.flash} />
            <div className={styles.cylFrame} />
          </div>
        </div>
      </div>
    </main>
  );
}

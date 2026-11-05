import Image from "next/image";
import RansomWord from "@/components/ransom/RansomWord";
import styles from "@/components/ransom/RansomWord.module.css";
import { SECTIONS, CHAMBERS, BASE_ANGLE, WORK_LINKS, labelOf, type Section } from "./data";

type Phase = "idle" | "loading" | "firing" | "open" | "closing";

// joins class names, skipping any that are false or empty
const cx = (...names: (string | false | null | undefined)[]) => names.filter(Boolean).join(" ");

export default function RevolverMenu() {
  // ---- FAKE STATE for now. step 6 replaces these five lines ----
  const phase = "idle" as Phase;
  const pending = null as Section | null;
  const section = null as Section | null;
  const loadedChamber = null as number | null;
  const turns = 0;
  // ----------------------------------------------------------------

  const fired = phase === "firing" || phase === "open";
  const loading = phase === "loading";
  const status = loading ? "LOADING…" : phase === "idle" ? "EMPTY" : "SPENT";

  return (
    <main className={styles.menu}>
      <div className={styles.bg} aria-hidden="true" />

      <div className={cx(styles.stage, fired && styles.isFired)}>
        <div className={cx(styles.nameTag, styles.boil)}>
          <h1 className={styles.name}><RansomWord text="Richard Okelu" /></h1>
          <span className={styles.place}>LAGOS · 2026</span>
        </div>

        <div className={styles.gunWrap}>
          <div className={styles.gunTilt}>
            <div className={styles.gunKick}>
              <Image className={styles.gun} src="/images/gun.png" alt="A revolver, side view" width={1216} height={643} loading="eager" />
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
          <div className={styles.hudPrompts}>click a bullet to fire, click back to close.</div>
        </div>

        <div className={styles.instruction}>
          <span className={styles.instructionBig}>Pick your <em>shot</em></span>
          <p>Click a bullet to load it and fire that section open.</p>
        </div>

        <nav className={styles.bullets} aria-label="Portfolio sections">
          {SECTIONS.map((s) => (
            <button key={s.id} type="button" aria-label={`Fire ${s.label}`} className={cx(styles.bullet, pending === s.id && styles.isLoaded)}>
              <Image className={styles.bulletImg} src="/images/bullet.png" alt="" width={452} height={157} loading="eager" />
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
      <div className={cx(styles.shotWrap, phase === "open" && styles.isOpen, phase === "closing" && styles.isClosing)}>
        <section className={cx(styles.shotPanel, styles.boil)} aria-label={section ? labelOf(section) : "Section"}>
          <button type="button" className={styles.shotBack}>‹ back</button>
          <span className={styles.shotKicker}>target</span>

          {section && (
            <h2 className={styles.shotTitle}><RansomWord text={labelOf(section)} /></h2>
          )}

          {section === "about" && (
            <>
              <p>[Short bio: who you are, what you make, and what drives your work. Two or three sentences.]</p>
              <p className={styles.shotNote}>[Tools and skills, e.g. Blender · JavaScript · Procreate]</p>
            </>
          )}

          {section === "works" && (
            <ul className={styles.shotLinks}>
              {WORK_LINKS.map((link) => (
                <li key={link.href}>
                  <a className={styles.shotLink} href={link.href}>
                    <span className={styles.lblFirst}>{link.label[0]}</span>
                    <span className={styles.lblRest}>{link.label.slice(1)}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}

          {section === "contact" && (
            <>
              <span className={styles.shotEmail}>[your@email.com]</span>
              <p className={styles.shotNote}>[What you're open to, e.g. commissions, freelance, collaborations]</p>
            </>
          )}
        </section>
      </div>

      {/* the cut-in close-up */}
      <div className={cx(styles.cutin, loading && styles.isOn)} aria-hidden="true">
        <div className={styles.cutinBand} />
        <div className={styles.cutinPaper}>
          <div className={styles.cutinTitle}>
            <span className={styles.cutinKicker}>loading</span>
            {pending && <RansomWord text={labelOf(pending)} />}
          </div>
          <div className={styles.cylBox}>
            <div className={styles.cylTurn} style={{ transform: `rotate(${BASE_ANGLE + 60 * turns}deg)` }}>
              <Image className={styles.cylImg} src="/images/cylinder.png" alt="" width={760} height={769} loading="eager" />
              {CHAMBERS.map(([x, y], k) => (
                <div key={k} className={cx(styles.cover, loadedChamber === k && styles.isGone)} style={{ left: `${x}%`, top: `${y}%` }} />
              ))}
            </div>
            <div className={styles.flier}>
              <Image src="/images/bullet.png" alt="" width={452} height={157} loading="eager" />
            </div>
            <div className={styles.flash} />
            <div className={styles.cylFrame} />
          </div>
        </div>
      </div>
    </main>
  );
}
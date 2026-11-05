import styles from "./RansomWord.module.css";

// after the first letter, styles repeat in this order
const CYCLE = ["c", "b", "d", "c", "a", "b"] as const;

type Props = {
  text: string;
  className?: string;
};

export default function RansomWord({ text, className }: Props) {
  const words = text.split(" ");

  return (
    <span className={`${styles.group} ${className ?? ""}`}>
      {/* the plain text, for screen readers */}
      <span className={styles.srOnly}>{text}</span>

      {words.map((word, w) => (
        <span key={w} className={styles.word} aria-hidden="true">
          {[...word].map((char, i) => {
            const style = i === 0 ? "a" : CYCLE[(i - 1) % CYCLE.length];
            const hero = i === 0 ? styles.hero : "";
            return (
              <span key={i} className={`${styles.letter} ${styles[style]} ${hero}`}>
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
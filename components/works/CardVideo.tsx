"use client";

import { useRef, useState } from "react";
import styles from "./works.module.css";

type Props = { src: string; poster?: string; label: string };

// a short silent loop that starts paused on its still image;
// the button (or a click on the video) plays and pauses it
export default function CardVideo({ src, poster, label }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }

  return (
    <>
      <video
        ref={videoRef}
        className={styles.cardVideo}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-label={label}
      />
      <button
        type="button"
        className={styles.playButton}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? `Pause ${label}` : `Play ${label}`}
      >
        <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
        {playing ? "Pause" : "Play"}
      </button>
    </>
  );
}

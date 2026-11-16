"use client";

import { useRef, useState } from "react";
import styles from "./works.module.css";

type Props = {
  src: string;
  alt: string;
  label: string; // e.g. the project's name, read out to screen readers
  kind?: "image" | "video";
};

// a "View in full" button that opens the uncropped picture (or the full
// video, with sound and controls) in an overlay above the page.
// close it with the ✕ button, the Esc key, or a click outside the picture.
export default function FullView({ src, alt, label, kind = "image" }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // the big file is only fetched once someone asks to see it
  const [requested, setRequested] = useState(false);

  const open = () => {
    setRequested(true);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  let media: React.ReactNode;
  if (kind === "video") {
    media = (
      <video
        ref={videoRef}
        className={styles.lightboxMedia}
        src={src}
        controls
        playsInline
        preload="metadata"
        aria-label={alt}
      />
    );
  } else {
    // a plain <img> here on purpose: the overlay shows the file at its own size
    // eslint-disable-next-line @next/next/no-img-element
    media = <img className={styles.lightboxMedia} src={src} alt={alt} />;
  }

  return (
    <>
      <button
        type="button"
        className={styles.fullButton}
        onClick={open}
        aria-label={`View ${label} in full`}
      >
        <span aria-hidden="true">⤢</span>
        View in full
      </button>

      <dialog
        ref={dialogRef}
        className={styles.lightbox}
        aria-label={label}
        // a click on the dark area around the picture closes it
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        // stop the video whenever the overlay closes, however it was closed
        onClose={() => videoRef.current?.pause()}
      >
        <button
          type="button"
          className={styles.lightboxClose}
          onClick={close}
          aria-label="Close"
        >
          ✕
        </button>
        {requested && media}
      </dialog>
    </>
  );
}

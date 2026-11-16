"use client";

import { useRef, useState } from "react";
import { SITE } from "@/lib/site";

// mailto: links only work when the computer has an email app set up, which most
// people using Gmail in a browser don't. so the main action copies the address,
// with "Open in Gmail" and "Mail app" as extra choices.

export const GMAIL_HREF = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SITE.email)}`;
export const MAIL_HREF = `mailto:${SITE.email}`;

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // older browsers: copy through a hidden text box instead
    const box = document.createElement("textarea");
    box.value = text;
    box.style.position = "fixed";
    box.style.opacity = "0";
    document.body.appendChild(box);
    box.select();
    const ok = document.execCommand("copy");
    box.remove();
    return ok;
  }
}

// "copied" = it worked; "blocked" = the browser refused, so we fall back
type CopyState = "idle" | "copied" | "blocked";

function useCopyEmail(onBlocked?: () => void) {
  const [state, setState] = useState<CopyState>("idle");
  async function copy() {
    const ok = await copyText(SITE.email);
    setState(ok ? "copied" : "blocked");
    if (!ok) onBlocked?.();
    setTimeout(() => setState("idle"), ok ? 2500 : 6000);
  }
  return { state, copy };
}

// one button that copies the email, e.g. "Get in touch ›" in the About panel
export function CopyEmailButton({
  className,
  label = "Copy email",
}: {
  className?: string;
  label?: string;
}) {
  const { state, copy } = useCopyEmail();
  // if copying is blocked, the button shows the address so it can be typed or copied
  const text =
    state === "copied" ? "Email copied ✓" : state === "blocked" ? SITE.email : label;
  return (
    <button
      type="button"
      className={className}
      onClick={copy}
      title={`Copy ${SITE.email}`}
      aria-live="polite"
      style={state === "blocked" ? { textTransform: "none" } : undefined}
    >
      {text}
    </button>
  );
}

type Classes = {
  wrap?: string;
  email?: string;
  actions?: string;
  copy?: string;
  link?: string;
};

// the email written out, a copy button, and two other ways to send a message
export default function EmailActions({ classes = {} }: { classes?: Classes }) {
  const emailRef = useRef<HTMLSpanElement>(null);
  // if copying is blocked, select the address on the page instead
  const selectEmail = () => {
    const el = emailRef.current;
    const selection = window.getSelection();
    if (!el || !selection) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    selection.removeAllRanges();
    selection.addRange(range);
  };
  const { state, copy } = useCopyEmail(selectEmail);
  return (
    <div className={classes.wrap}>
      <span ref={emailRef} className={classes.email}>
        {SITE.email}
      </span>
      <div className={classes.actions}>
        <button
          type="button"
          className={classes.copy}
          onClick={copy}
          aria-live="polite"
        >
          {state === "copied"
            ? "Copied ✓"
            : state === "blocked"
              ? "Selected, press Ctrl+C"
              : "Copy email"}
        </button>
        <a
          className={classes.link}
          href={GMAIL_HREF}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Gmail ↗
        </a>
        <a className={classes.link} href={MAIL_HREF}>
          Mail app
        </a>
      </div>
    </div>
  );
}

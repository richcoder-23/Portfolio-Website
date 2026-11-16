"use client";

import { useState } from "react";
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

function useCopyEmail() {
  const [copied, setCopied] = useState(false);
  async function copy() {
    if (await copyText(SITE.email)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }
  return { copied, copy };
}

// one button that copies the email, e.g. "Get in touch ›" in the About panel
export function CopyEmailButton({
  className,
  label = "Copy email",
}: {
  className?: string;
  label?: string;
}) {
  const { copied, copy } = useCopyEmail();
  return (
    <button
      type="button"
      className={className}
      onClick={copy}
      title={`Copy ${SITE.email}`}
      aria-live="polite"
    >
      {copied ? "Email copied ✓" : label}
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
  const { copied, copy } = useCopyEmail();
  return (
    <div className={classes.wrap}>
      <span className={classes.email}>{SITE.email}</span>
      <div className={classes.actions}>
        <button
          type="button"
          className={classes.copy}
          onClick={copy}
          aria-live="polite"
        >
          {copied ? "Copied ✓" : "Copy email"}
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

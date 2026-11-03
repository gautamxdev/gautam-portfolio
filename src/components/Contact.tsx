"use client";

import { useEffect, useRef, useState } from "react";
import { email, socialLinks } from "@/data/site";

export function Contact() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function copyEmail() {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
    timer.current = setTimeout(() => setCopyState("idle"), 3500);
  }
  return (
    <section
      id="contact"
      className="contact-section shell"
      aria-labelledby="contact-title"
    >
      <div className="section-topline">
        <span className="eyebrow">03 / START SOMETHING</span>
        <span className="mono">
          <span className="status-light" /> OPEN TO OPPORTUNITIES
        </span>
      </div>
      <div className="contact-heading">
        <h2 id="contact-title">
          Good things start
          <br />
          with <span className="serif-accent">a hello.</span>
        </h2>
        <a
          href={`mailto:${email}`}
          className="contact-arrow"
          aria-label="Email Gautam"
        >
          <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="contact-bottom">
        <div>
          <p>Have a project, a role, or a wonderfully weird idea?</p>
          <div className="email-row">
            <a href={`mailto:${email}`}>{email}</a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copy email address"
              title="Copy email address"
            >
              <svg
                viewBox="0 0 24 24"
                width="17"
                height="17"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <rect x="8" y="8" width="12" height="12" rx="2" />
                <path d="M16 8V4H4v12h4" />
              </svg>
            </button>
          </div>
          <p className="copy-feedback mono" role="status">
            {copyState === "copied"
              ? "Email copied. Say hello when you’re ready."
              : copyState === "failed"
                ? "Select the email address to copy, or click it to open your mail app."
                : ""}
          </p>
        </div>
        <div className="social-links">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

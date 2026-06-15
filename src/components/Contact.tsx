"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/SectionLabel";
import { email, socialLinks } from "@/data/site";

function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.128 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const iconMap = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  twitter: TwitterIcon,
} as const;

type FormState = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

export function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Open mailto with prefilled body
    const subject = encodeURIComponent(
      `Portfolio Contact from ${form.name || "Visitor"}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <section id="contact" className="mx-auto max-w-[990px] px-6 py-16">
      <SectionLabel label="contact_" />

      <div className="mt-2 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        {/* Left column */}
        <div className="flex flex-col justify-start">
          <h2 className="font-mono text-2xl font-semibold text-foreground">
            Get in Touch
          </h2>
          <p className="mt-4 font-mono text-sm leading-relaxed text-secondary">
            If you have any inquiries, please feel free to reach out. You can
            contact me via email at{" "}
            <a
              href={`mailto:${email}`}
              className="link-hover font-semibold text-foreground"
            >
              {email}
            </a>
          </p>

          <div className="mt-8">
            <div className="flex items-center gap-5">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="text-muted transition-colors duration-200 ease-in-out hover:text-accent-hover"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column — contact form */}
        <div>
          {submitted ? (
            <div className="flex h-full flex-col items-start justify-center gap-3 font-mono">
              <p className="text-accent text-lg">Message sent_</p>
              <p className="text-sm text-secondary">
                Your email client should have opened. I&apos;ll get back to you
                soon.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="contact-submit-btn mt-2"
              >
                Send another
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3"
              noValidate
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="contact-name"
                    className="sr-only"
                  >
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="contact-input"
                    autoComplete="name"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="contact-phone"
                    className="sr-only"
                  >
                    Phone No
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    placeholder="Phone No"
                    value={form.phone}
                    onChange={handleChange}
                    className="contact-input"
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="contact-email" className="sr-only">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className="contact-input"
                  autoComplete="email"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="contact-message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  className="contact-input resize-none"
                />
              </div>

              <button
                type="submit"
                id="contact-submit"
                className="contact-submit-btn mt-1"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

const CHAR_DELAY = 80;

export function SectionLabel({ label }: { label: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const triggeredRef = useRef(false);
  const [started, setStarted] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [done, setDone] = useState(false);

  const hasTrailingUnderscore = label.endsWith("_");
  const baseLabel = hasTrailingUnderscore ? label.slice(0, -1) : label;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggeredRef.current) {
          triggeredRef.current = true;
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || done) return;

    if (displayText.length >= baseLabel.length) {
      setDone(true);
      return;
    }

    const timer = window.setTimeout(() => {
      setDisplayText(baseLabel.slice(0, displayText.length + 1));
    }, CHAR_DELAY);

    return () => window.clearTimeout(timer);
  }, [started, displayText, baseLabel, done]);

  return (
    <p ref={ref} className="section-label min-h-[1.2em] whitespace-nowrap">
      {displayText}
      {started && (hasTrailingUnderscore || !done) && (
        <span className="section-label-cursor" aria-hidden="true">
          _
        </span>
      )}
    </p>
  );
}

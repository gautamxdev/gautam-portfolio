"use client";

import { useEffect, useRef, useState } from "react";

const CHAR_DELAY = 80;

export function SectionLabel({ label }: { label: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const triggeredRef = useRef(false);
  const [started, setStarted] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [done, setDone] = useState(false);

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

    if (displayText.length >= label.length) {
      setDone(true);
      return;
    }

    const timer = window.setTimeout(() => {
      setDisplayText(label.slice(0, displayText.length + 1));
    }, CHAR_DELAY);

    return () => window.clearTimeout(timer);
  }, [started, displayText, label, done]);

  return (
    <p ref={ref} className="section-label min-h-[1.2em] whitespace-nowrap">
      {displayText}
      {started && !done && (
        <span className="section-label-cursor" aria-hidden="true">
          _
        </span>
      )}
    </p>
  );
}

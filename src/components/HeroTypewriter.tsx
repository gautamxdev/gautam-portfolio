"use client";

import { useEffect, useState } from "react";

const FULL_NAME = "Gautam Alva";
const CHAR_DELAY = 80;
const INIT_DELAY = 800;

export function HeroTypewriter() {
  const [phase, setPhase] = useState<"init" | "typing" | "done">("init");
  const [displayText, setDisplayText] = useState("> initializing...");

  useEffect(() => {
    if (phase !== "init") return;

    const initTimer = window.setTimeout(() => {
      setDisplayText("");
      setPhase("typing");
    }, INIT_DELAY);

    return () => window.clearTimeout(initTimer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "typing") return;

    if (displayText.length >= FULL_NAME.length) {
      setPhase("done");
      return;
    }

    const timer = window.setTimeout(() => {
      setDisplayText(FULL_NAME.slice(0, displayText.length + 1));
    }, CHAR_DELAY);

    return () => window.clearTimeout(timer);
  }, [phase, displayText]);

  return (
    <div>
      <div className="status-badge mb-4">
        <span className="status-dot" aria-hidden="true" />
        <span>available for work</span>
      </div>
      <h1 className="min-h-[1.2em] font-mono text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
        {phase === "init" ? (
          <span className="text-sm text-muted">{displayText}</span>
        ) : (
          <>
            {displayText}
            <span className="typewriter-cursor" aria-hidden="true">
              _
            </span>
          </>
        )}
      </h1>
    </div>
  );
}

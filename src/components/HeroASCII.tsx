"use client";

import { useEffect, useRef, useState } from "react";
import figlet from "figlet";
import ansiShadowFont from "figlet/importable-fonts/ANSI Shadow.js";
import "./HeroASCII.css";

const WORDS = ["BUILD", "SHIP", "CODE", "DEV"] as const;
const GLITCH_CHARS = "!@#$%^&*<>[]{}|";
const PRIMARY_TEXT = ">_";
const FONT = "ANSI Shadow";
const CHAR_DELAY = 8;
const PAUSE_AFTER_PRIMARY = 1500;
const WORD_CYCLE_MS = 3000;
const GLITCH_MS = 300;

figlet.defaults({ fetchFontIfMissing: false });
figlet.parseFont(FONT, ansiShadowFont);

function renderFiglet(text: string): Promise<string> {
  return new Promise((resolve, reject) => {
    figlet.text(text, { font: FONT }, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data ?? "");
    });
  });
}

function pickWord(exclude?: string): string {
  const pool = exclude
    ? WORDS.filter((word) => word !== exclude)
    : [...WORDS];
  return pool[Math.floor(Math.random() * pool.length)] ?? WORDS[0];
}

function glitchText(source: string): string {
  return source
    .split("")
    .map((char) =>
      char === "\n"
        ? "\n"
        : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)],
    )
    .join("");
}

function revealText(
  full: string,
  onUpdate: (value: string) => void,
  signal: { cancelled: boolean },
): Promise<void> {
  return new Promise((resolve) => {
    let index = 0;

    const tick = () => {
      if (signal.cancelled) {
        resolve();
        return;
      }

      index += 1;
      onUpdate(full.slice(0, index));

      if (index >= full.length) {
        resolve();
        return;
      }

      window.setTimeout(tick, CHAR_DELAY);
    };

    window.setTimeout(tick, CHAR_DELAY);
  });
}

export function HeroASCII() {
  const [loading, setLoading] = useState(true);
  const [primaryVisible, setPrimaryVisible] = useState("");
  const [wordVisible, setWordVisible] = useState("");
  const [wordGlitch, setWordGlitch] = useState("");
  const [showStats, setShowStats] = useState(false);

  const wordFullRef = useRef("");
  const currentWordRef = useRef("");
  const timeoutsRef = useRef<number[]>([]);
  const intervalsRef = useRef<number[]>([]);

  useEffect(() => {
    const signal = { cancelled: false };

    const registerTimeout = (id: number) => {
      timeoutsRef.current.push(id);
    };

    const registerInterval = (id: number) => {
      intervalsRef.current.push(id);
    };

    const clearTimers = () => {
      timeoutsRef.current.forEach((id) => window.clearTimeout(id));
      intervalsRef.current.forEach((id) => window.clearInterval(id));
      timeoutsRef.current = [];
      intervalsRef.current = [];
    };

    async function runWordCycle(word: string) {
      if (signal.cancelled) return;

      setWordGlitch("");
      setWordVisible("");

      const wordAscii = await renderFiglet(word);
      if (signal.cancelled) return;

      wordFullRef.current = wordAscii;
      currentWordRef.current = word;

      await revealText(wordAscii, setWordVisible, signal);
      if (signal.cancelled) return;

      registerTimeout(
        window.setTimeout(() => {
          if (signal.cancelled) return;

          const full = wordFullRef.current;
          const glitchInterval = window.setInterval(() => {
            setWordVisible("");
            setWordGlitch(glitchText(full));
          }, 30);
          registerInterval(glitchInterval);

          registerTimeout(
            window.setTimeout(async () => {
              window.clearInterval(glitchInterval);
              intervalsRef.current = intervalsRef.current.filter(
                (id) => id !== glitchInterval,
              );

              if (signal.cancelled) return;

              setWordGlitch("");
              await runWordCycle(pickWord(currentWordRef.current));
            }, GLITCH_MS),
          );
        }, WORD_CYCLE_MS),
      );
    }

    async function init() {
      try {
        const primaryAscii = await renderFiglet(PRIMARY_TEXT);
        if (signal.cancelled) return;

        setLoading(false);
        await revealText(primaryAscii, setPrimaryVisible, signal);
        if (signal.cancelled) return;

        setShowStats(true);

        registerTimeout(
          window.setTimeout(() => {
            void runWordCycle(pickWord());
          }, PAUSE_AFTER_PRIMARY),
        );
      } catch {
        if (!signal.cancelled) {
          setLoading(false);
        }
      }
    }

    void init();

    return () => {
      signal.cancelled = true;
      clearTimers();
    };
  }, []);

  return (
    <div className="hero-ascii-container w-full flex-col items-center justify-center">
      <div className="hero-ascii-flicker">
        <div className="hero-ascii-scanline" aria-hidden="true" />
        {loading ? (
          <span className="hero-ascii-loading" aria-hidden="true">
            ▋
          </span>
        ) : (
          <>
            <pre className="hero-ascii-primary">{primaryVisible}</pre>
            {(wordVisible || wordGlitch) && (
              <pre className="hero-ascii-word">{wordGlitch || wordVisible}</pre>
            )}
          </>
        )}
      </div>
      <div
        className={`hero-ascii-stats ${showStats ? "hero-ascii-stats-visible" : ""}`}
      >
        <p>{"// builder. always shipping."}</p>
        <p>{"// open to collabs & roles."}</p>
      </div>
    </div>
  );
}

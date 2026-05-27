"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./HeroArt.css";

const GLITCH_MS = 60;
const CELL = 2;
const FRAME_MS = 120;
const PULSE_PEAK = 0.08;
const PULSE_DURATION = 600;

function randomGlitchDelay(): number {
  return 8000 + Math.random() * 4000;
}

function randomPulseDelay(): number {
  return 12000 + Math.random() * 6000;
}

export function HeroArt() {
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timeouts: number[] = [];

    const schedule = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
      timeouts.push(id);
    };

    const runGlitch = () => {
      if (cancelled) return;

      setGlitching(true);
      schedule(() => {
        setGlitching(false);
        schedule(runGlitch, randomGlitchDelay());
      }, GLITCH_MS);
    };

    schedule(runGlitch, randomGlitchDelay());

    return () => {
      cancelled = true;
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cancelled = false;
    let frameTimeout = 0;
    let pulseTimeout = 0;
    let pulseStage: "up" | "hold" | "down" | null = null;
    let pulseStageStart = 0;
    let currentZone = 0;
    let lastZoneChange = Date.now();
    const pulseTimeouts: number[] = [];

    const resize = () => {
      canvas.width = img.offsetWidth;
      canvas.height = img.offsetHeight;
    };

    const getCellZone = (
      x: number,
      y: number,
      width: number,
      height: number,
    ) => {
      const col = Math.min(2, Math.floor((x / width) * 3));
      const row = Math.min(2, Math.floor((y / height) * 3));
      return row * 3 + col;
    };

    const getBaseThreshold = (now: number) =>
      0.02 + Math.sin(now * 0.0003) * 0.01;

    const getPulseLevel = (now: number) => {
      if (!pulseStage) return 0;

      const elapsed = now - pulseStageStart;

      if (pulseStage === "up") {
        return Math.min(1, elapsed / 200);
      }
      if (pulseStage === "hold") {
        return 1;
      }
      return Math.max(0, 1 - elapsed / 200);
    };

    const getThreshold = (now: number) => {
      const base = getBaseThreshold(now);
      const level = getPulseLevel(now);

      if (level > 0) {
        return base + (PULSE_PEAK - base) * level;
      }

      return base;
    };

    const schedulePulse = () => {
      pulseTimeout = window.setTimeout(() => {
        if (cancelled) return;

        pulseStage = "up";
        pulseStageStart = Date.now();

        pulseTimeouts.push(
          window.setTimeout(() => {
            if (cancelled) return;
            pulseStage = "hold";
            pulseStageStart = Date.now();
          }, 200),
        );

        pulseTimeouts.push(
          window.setTimeout(() => {
            if (cancelled) return;
            pulseStage = "down";
            pulseStageStart = Date.now();
          }, 400),
        );

        pulseTimeouts.push(
          window.setTimeout(() => {
            if (cancelled) return;
            pulseStage = null;
            schedulePulse();
          }, PULSE_DURATION),
        );
      }, randomPulseDelay());
    };

    const drawFrame = () => {
      if (cancelled) return;

      const { width, height } = canvas;
      if (width > 0 && height > 0) {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#080808";

        const now = Date.now();
        if (now - lastZoneChange >= 800) {
          currentZone = (currentZone + 1) % 9;
          lastZoneChange = now;
        }

        const threshold = getThreshold(now);

        for (let y = 0; y < height; y += CELL) {
          for (let x = 0; x < width; x += CELL) {
            if (Math.random() >= threshold) continue;

            const cellZone = getCellZone(x, y, width, height);
            const biasCurrent = Math.random() < 0.7;

            if (biasCurrent && cellZone === currentZone) {
              ctx.fillRect(x, y, CELL, CELL);
            } else if (!biasCurrent && cellZone !== currentZone) {
              ctx.fillRect(x, y, CELL, CELL);
            }
          }
        }
      }

      frameTimeout = window.setTimeout(drawFrame, FRAME_MS);
    };

    img.addEventListener("load", resize);
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(img);

    schedulePulse();
    drawFrame();

    return () => {
      cancelled = true;
      window.clearTimeout(frameTimeout);
      window.clearTimeout(pulseTimeout);
      pulseTimeouts.forEach((id) => window.clearTimeout(id));
      img.removeEventListener("load", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="hero-art-column">
      <div className="hero-art-wrapper">
        <div className="hero-art-media">
          <div
            className={`hero-art-stack${glitching ? " hero-art-stack--glitch" : ""}`}
          >
            <Image
              ref={imgRef}
              src="/hero-art.webp"
              alt="hero"
              width={480}
              height={480}
              priority
              className="hero-art-image"
            />
            <div className="hero-art-scanlines" aria-hidden="true" />
            <canvas
              ref={canvasRef}
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                zIndex: 3,
                width: "100%",
                height: "100%",
              }}
            />

            <span className="hero-art-bracket hero-art-bracket-tl" aria-hidden="true" />
            <span className="hero-art-bracket hero-art-bracket-tr" aria-hidden="true" />
            <span className="hero-art-bracket hero-art-bracket-bl" aria-hidden="true" />
            <span className="hero-art-bracket hero-art-bracket-br" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

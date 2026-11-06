"use client";

import { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import "./HeroArt.css";

type Particle = {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  alpha: number;
  seed: number;
};

type ArtEngine = {
  compile: () => void;
  setOutputVisible: (visible: boolean) => void;
};

const ART_SOURCE = "/hero-art.webp";

const SOURCE_LINES = [
  { text: "// A little physics. A human connection.", kind: "comment" },
  { text: "const dx = particle.x - pointer.x;", kind: "code" },
  { text: "const dy = particle.y - pointer.y;", kind: "code" },
  { text: "const distance = Math.hypot(dx, dy);", kind: "code" },
  { text: "const force = Math.max(0,", kind: "code" },
  { text: "  1 - distance / radius);", kind: "code" },
  { text: "", kind: "code" },
  { text: "// Every point remembers where it belongs.", kind: "comment" },
  { text: "particle.vx += (particle.homeX", kind: "code" },
  { text: "  - particle.x) * 0.035;", kind: "code" },
  { text: "particle.vx *= 0.87;", kind: "code" },
  { text: "particle.x += particle.vx;", kind: "code" },
] as const;

export function HeroArt() {
  preload(ART_SOURCE, { as: "image" });

  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ArtEngine | null>(null);
  const [view, setView] = useState<"output" | "source">("output");
  const [ready, setReady] = useState(false);
  const [building, setBuilding] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const source = new window.Image();
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const pointer = { x: -1000, y: -1000, active: false };
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastFrame = 0;
    let activeUntil = 0;
    let buildStarted = -1;
    let visible = true;
    let outputVisible = true;
    let loaded = false;
    let disposed = false;
    let reducedMotion = motionPreference.matches;

    const stop = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      lastFrame = 0;
    };

    const settle = () => {
      pointer.active = false;
      activeUntil = 0;
      for (const particle of particles) {
        particle.x = particle.homeX;
        particle.y = particle.homeY;
        particle.vx = 0;
        particle.vy = 0;
      }
    };

    const paint = (now: number) => {
      context.clearRect(0, 0, width, height);
      const buildingNow = buildStarted >= 0 && now - buildStarted < 1800;
      const radius = Math.max(48, Math.min(95, width * 0.16));
      let unsettled = false;

      for (const particle of particles) {
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        const force =
          pointer.active && !reducedMotion
            ? Math.max(0, 1 - distance / radius)
            : 0;

        if (force > 0) {
          particle.vx += (dx / Math.max(distance, 1)) * force * 2;
          particle.vy += (dy / Math.max(distance, 1)) * force * 2;
        }

        if (!reducedMotion) {
          particle.vx += (particle.homeX - particle.x) * 0.035;
          particle.vy += (particle.homeY - particle.y) * 0.035;
          particle.vx *= 0.87;
          particle.vy *= 0.87;
          particle.x += particle.vx;
          particle.y += particle.vy;
          if (Math.abs(particle.vx) + Math.abs(particle.vy) > 0.06)
            unsettled = true;
        }

        const accent = force > 0.1 || (buildingNow && particle.seed % 7 === 0);
        context.fillStyle = accent ? "#ff5c28" : "#f1eee7";
        context.globalAlpha = Math.min(1, particle.alpha + force * 0.45);

        if (accent && particle.seed % 19 === 0) {
          context.font = "8px monospace";
          context.fillText(
            particle.seed % 2 ? "+" : "·",
            particle.x,
            particle.y,
          );
        } else {
          const size = width < 400 ? 1.25 : 1.5;
          context.fillRect(particle.x, particle.y, size, size);
        }
      }
      context.globalAlpha = 1;

      if (buildStarted >= 0 && !buildingNow) {
        buildStarted = -1;
        setBuilding(false);
        setAnnouncement("The hands are reassembled.");
      }
      return unsettled || buildingNow;
    };

    const tick = (now: number) => {
      frame = 0;
      if (disposed || !visible || !outputVisible || document.hidden) return;
      // Limit the physics to 60 Hz on high-refresh displays.
      if (lastFrame && now - lastFrame < 15) {
        frame = window.requestAnimationFrame(tick);
        return;
      }
      lastFrame = now;
      const unsettled = paint(now);
      if (!reducedMotion && (unsettled || now < activeUntil)) {
        frame = window.requestAnimationFrame(tick);
      } else {
        lastFrame = 0;
      }
    };

    const wake = () => {
      if (
        !frame &&
        loaded &&
        visible &&
        outputVisible &&
        !document.hidden &&
        !disposed
      ) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    const resize = () => {
      if (!loaded || disposed) return;
      width = stage.clientWidth;
      height = stage.clientHeight;
      if (!width || !height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const sample = document.createElement("canvas");
      const sampleWidth = Math.min(560, Math.round(width));
      sample.width = sampleWidth;
      sample.height = Math.round(sampleWidth * (310 / 736));
      const sampleContext = sample.getContext("2d", {
        willReadFrequently: true,
      });
      if (!sampleContext) return;
      sampleContext.drawImage(
        source,
        0,
        245,
        736,
        310,
        0,
        0,
        sample.width,
        sample.height,
      );

      try {
        const pixels = sampleContext.getImageData(
          0,
          0,
          sample.width,
          sample.height,
        ).data;
        const displayWidth = width * 1.13;
        const displayHeight = displayWidth * (310 / 736);
        const offsetX = (width - displayWidth) / 2;
        const offsetY = height * 0.48 - displayHeight / 2;
        const brightnessAt = (column: number, row: number) => {
          const clampedX = Math.max(0, Math.min(sample.width - 1, column));
          const clampedY = Math.max(0, Math.min(sample.height - 1, row));
          const index = (clampedY * sample.width + clampedX) * 4;
          return (pixels[index] + pixels[index + 1] + pixels[index + 2]) / 3;
        };
        // Include the downsampling footprint around the bitmap's antialiased edges.
        const edgePadding = (736 / sample.width) * 1.5;
        const neighborOffset = Math.ceil(
          ((7 + edgePadding) * sample.width) / 736,
        );
        particles = [];
        for (let y = 0; y < sample.height; y += 2) {
          for (let x = 0; x < sample.width; x += 2) {
            let brightness = brightnessAt(x, y);
            const sourceX = (x / sample.width) * 736;
            const sourceY = 245 + (y / sample.height) * 310;
            // Remove the old window chrome without cutting lines through the hands.
            const withinWindow =
              sourceX >= 272 - edgePadding && sourceX <= 499 + edgePadding;
            const oldHeader =
              withinWindow &&
              sourceY >= 285 - edgePadding &&
              sourceY <= 303 + edgePadding;
            const oldSides =
              ((sourceX >= 272 - edgePadding && sourceX <= 276 + edgePadding) ||
                (sourceX >= 495 - edgePadding &&
                  sourceX <= 498 + edgePadding)) &&
              sourceY >= 285 - edgePadding &&
              sourceY <= 451 + edgePadding;
            const oldBottom =
              withinWindow &&
              sourceY >= 445 - edgePadding &&
              sourceY <= 451 + edgePadding;
            if (oldHeader) continue;
            if (oldSides) {
              brightness = Math.min(
                brightnessAt(x - neighborOffset, y),
                brightnessAt(x + neighborOffset, y),
              );
            }
            if (oldBottom) {
              brightness = Math.min(
                brightness,
                brightnessAt(x, y - neighborOffset),
                brightnessAt(x, y + neighborOffset),
              );
            }
            if (brightness < 48) continue;

            const homeX = offsetX + (x / sample.width) * displayWidth;
            const homeY = offsetY + (y / sample.height) * displayHeight;
            particles.push({
              x: homeX,
              y: homeY,
              homeX,
              homeY,
              vx: 0,
              vy: 0,
              alpha: Math.max(0.28, brightness / 255),
              seed: x * 31 + y * 17,
            });
          }
        }
        paint(performance.now());
        setReady(true);
        wake();
      } catch {
        setReady(false);
      }
    };

    const compile = () => {
      if (!loaded) return;
      pointer.active = false;
      if (reducedMotion) {
        settle();
        paint(performance.now());
        setAnnouncement("Artwork reset. Reduced motion is enabled.");
        setBuilding(false);
        return;
      }
      const now = performance.now();
      buildStarted = now;
      activeUntil = now + 2000;
      setBuilding(true);
      setAnnouncement("Scattering and reassembling the particles.");
      for (const particle of particles) {
        const angle = particle.seed * 2.39996;
        const power = 3 + (particle.seed % 13);
        particle.x = particle.homeX + Math.cos(angle) * width * 0.18;
        particle.y = particle.homeY + Math.sin(angle) * height * 0.32;
        particle.vx = Math.cos(angle) * power;
        particle.vy = Math.sin(angle) * power;
      }
      wake();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch" || reducedMotion || !outputVisible)
        return;
      const bounds = stage.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = true;
      activeUntil = performance.now() + 1200;
      wake();
    };

    const onPointerLeave = () => {
      pointer.active = false;
      activeUntil = performance.now() + 1000;
      wake();
    };

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else wake();
    };

    const onMotionChange = () => {
      reducedMotion = motionPreference.matches;
      if (reducedMotion) {
        stop();
        buildStarted = -1;
        settle();
        setBuilding(false);
      }
      wake();
    };

    engineRef.current = {
      compile,
      setOutputVisible: (nextVisible) => {
        outputVisible = nextVisible;
        if (!nextVisible) {
          stop();
          settle();
          if (buildStarted >= 0) {
            buildStarted = -1;
            setBuilding(false);
            setAnnouncement("Source view. The animation has been reset.");
          }
        } else {
          wake();
        }
      },
    };

    source.onload = () => {
      if (disposed) return;
      loaded = true;
      resize();
    };
    source.src = ART_SOURCE;

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) stop();
        else wake();
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(stage);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    motionPreference.addEventListener("change", onMotionChange);

    return () => {
      disposed = true;
      stop();
      source.onload = null;
      engineRef.current = null;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motionPreference.removeEventListener("change", onMotionChange);
    };
  }, []);

  useEffect(() => {
    engineRef.current?.setOutputVisible(view === "output");
  }, [view]);

  const runBuild = () => {
    setView("output");
    engineRef.current?.setOutputVisible(true);
    engineRef.current?.compile();
  };

  return (
    <figure className={`hands-installation${building ? " is-building" : ""}`}>
      <div className="hands-toolbar">
        <span className="hands-file">
          <span aria-hidden="true">⌘</span> connection.tsx
        </span>
        <div className="hands-view-switch" aria-label="Artwork view">
          <button
            type="button"
            aria-pressed={view === "output"}
            onClick={() => setView("output")}
          >
            Output
          </button>
          <button
            type="button"
            aria-pressed={view === "source"}
            onClick={() => setView("source")}
          >
            Source
          </button>
        </div>
      </div>

      <div className="hands-stage" ref={stageRef}>
        <div className="hands-output" hidden={view !== "output"}>
          <div className="hands-grid" aria-hidden="true" />
          <span
            className="hands-coordinate hands-coordinate-top"
            aria-hidden="true"
          >
            CANVAS / PARTICLE STUDY
          </span>
          <span className="hands-axis hands-axis-x" aria-hidden="true">
            x
          </span>
          <span className="hands-axis hands-axis-y" aria-hidden="true">
            y
          </span>
          <canvas
            ref={canvasRef}
            className={`hands-canvas${ready ? " is-loaded" : ""}`}
            role="img"
            aria-hidden={!ready}
            aria-label="Two hands made of interactive particles. Move your pointer through them, or choose Run build to scatter and reassemble them."
          />
          <span className="hands-corner hands-corner-tl" aria-hidden="true" />
          <span className="hands-corner hands-corner-tr" aria-hidden="true" />
          <span className="hands-corner hands-corner-bl" aria-hidden="true" />
          <span className="hands-corner hands-corner-br" aria-hidden="true" />
        </div>

        <div className="hands-source" hidden={view !== "source"}>
          <div className="hands-source-label">
            Pointer interaction
          </div>
          <ol className="hands-source-code">
            {SOURCE_LINES.map((line, index) => (
              <li key={index} className={line.kind}>
                <code>{line.text || " "}</code>
              </li>
            ))}
          </ol>
          <span className="hands-source-note">
            Canvas 2D · spring physics · zero animation libraries
          </span>
        </div>
      </div>

      <figcaption className="hands-footer">
        <span className="hands-hint">
          <span className="hands-status-dot" aria-hidden="true" />{" "}
          <span>
            {building ? (
              "Rebuilding connection…"
            ) : view === "source" ? (
              "Spring physics, in a few lines."
            ) : (
              <>
                <span className="hands-pointer-hint">
                  Move your cursor. Make a connection.
                </span>
                <span className="hands-touch-hint">
                  Tap Run build to reconnect.
                </span>
                <span className="hands-static-hint">
                  A connection, rendered in code.
                </span>
              </>
            )}
          </span>
        </span>
        <button
          type="button"
          className="hands-build"
          onClick={runBuild}
          disabled={!ready || building}
        >
          <span aria-hidden="true">{building ? "↻" : "▷"}</span>{" "}
          {building ? "Building" : "Run build"}
        </button>
      </figcaption>
      <span className="sr-only" role="status" aria-live="polite">
        {announcement}
      </span>
    </figure>
  );
}

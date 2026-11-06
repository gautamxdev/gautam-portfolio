import Image from "next/image";
import type { CSSProperties } from "react";
import "./Toolkit.css";

const streams = [
  [
    { name: "React", icon: "react", color: "#61dafb" },
    { name: "Next.js", icon: "nextjs", color: "#f0efe9" },
    { name: "TypeScript", icon: "typescript", color: "#6aa9ed" },
    { name: "Tailwind CSS", icon: "tailwindcss", color: "#38bdf8" },
  ],
  [
    { name: "Node.js", icon: "nodejs", color: "#83cd29" },
    { name: "PostgreSQL", icon: "postgresql", color: "#79b4dc" },
    { name: "Python", icon: "python", color: "#ffd343" },
    { name: "Docker", icon: "docker", color: "#2496ed" },
  ],
  [
    { name: "Three.js", icon: "threejs", color: "#f0efe9" },
    { name: "GSAP", icon: "gsap", color: "#88ce02" },
    { name: "Git", icon: "git", color: "#f05032" },
  ],
] as const;

export function Toolkit() {
  return (
    <div className="stack-flow" aria-labelledby="stack-title">
      <div className="stack-flow-header">
        <h3 id="stack-title" className="mono">THE STACK</h3>
      </div>

      <div className="stack-flow-window">
        <div className="stack-ribbons">
          {streams.map((tools, index) => (
            <div className="stack-stream" key={index}>
              <div className="stack-stream-track">
                {[false, true].map((duplicate) => (
                  <ul
                    className="stack-stream-set"
                    key={String(duplicate)}
                    aria-hidden={duplicate || undefined}
                    aria-label={duplicate ? undefined : `Technology row ${index + 1}`}
                  >
                    {tools.map((tool) => (
                      <li
                        className="stack-token"
                        key={tool.icon}
                        style={{ "--brand": tool.color } as CSSProperties}
                      >
                        <Image
                          src={`/logos/${tool.icon}.svg`}
                          alt=""
                          width={38}
                          height={38}
                          loading="eager"
                          draggable={false}
                        />
                        <span>{tool.name}</span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

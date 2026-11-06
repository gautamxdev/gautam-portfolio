import { projects, type Project } from "@/data/projects";

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="project-links">
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noreferrer">
          {project.liveLabel ?? "Visit website"}{" "}
          <span aria-hidden="true">↗</span>
          <span className="sr-only"> — {project.name}</span>
        </a>
      )}
      {project.repoUrl && (
        <a href={project.repoUrl} target="_blank" rel="noreferrer">
          Source code <span aria-hidden="true">↗</span>
          <span className="sr-only"> — {project.name}</span>
        </a>
      )}
    </div>
  );
}

function ProjectPreview({ id }: { id: string }) {
  if (id === "mcp-doctor")
    return (
      <div
        className="project-preview terminal-preview"
        aria-label="Illustrative MCP Doctor terminal session"
      >
        <div className="terminal-window">
          <div className="terminal-title">
            <span className="window-dots">
              <i />
              <i />
              <i />
            </span>
            <span>~/workspace</span>
            <span>zsh</span>
          </div>
          <div className="terminal-body">
            <p>
              <span className="terminal-prompt">❯</span> npx mcp-doctor-cli
            </p>
            <p className="terminal-ascii" aria-hidden="true">
              ┌─┐┌─┐┌─┐
              <br />
              │M││C││P│ <span>DOCTOR</span>
              <br />
              └─┘└─┘└─┘
            </p>
            <p className="terminal-muted">
              A little clarity for your MCP configs.
            </p>
            <div className="terminal-checks">
              <p>
                <span>✓</span> Inspect global configuration
              </p>
              <p>
                <span>✓</span> Inspect workspace configuration
              </p>
              <p>
                <span className="terminal-orange">!</span> Spot conflicting
                server definitions
              </p>
            </div>
            <p className="terminal-muted terminal-note">
              Local diagnostics. Your changes. Your call.
            </p>
            <p>
              <span className="terminal-prompt">❯</span>{" "}
              <span className="terminal-cursor">▌</span>
            </p>
          </div>
        </div>
        <span className="preview-caption mono">ILLUSTRATIVE CLI SESSION</span>
      </div>
    );
  if (id === "sylva")
    return (
      <div
        className="project-preview sylva-preview"
        aria-label="Graphic study for the Sylva Sounds audio studio website"
      >
        <span className="preview-topline mono">
          INDEPENDENT SOUND. DISTINCT IDENTITY.
        </span>
        <div className="sylva-wordmark">
          SYLVA<span>SOUNDS</span>
        </div>
        <div className="sound-wave" aria-hidden="true">
          {Array.from({ length: 47 }, (_, i) => (
            <i
              key={i}
              style={{
                height: `${14 + Math.abs(Math.sin(i * 0.57) * Math.cos(i * 0.19)) * 92}%`,
                animationDelay: `${i * -0.08}s`,
              }}
            />
          ))}
        </div>
        <span className="preview-caption mono">
          A VISUAL STUDY IN SOUND & MOTION
        </span>
      </div>
    );
  return (
    <div
      className="project-preview quickfill-preview"
      aria-label="Illustration of QuickFill’s guarded paste workflow"
    >
      <div className="quickfill-grid" aria-hidden="true" />
      <span className="preview-topline mono">
        REPETITION, MEET YOUR SHORTCUT.
      </span>
      <div className="quickfill-keys" aria-hidden="true">
        <span>⌘</span>
        <span>V</span>
        <i>↗</i>
      </div>
      <div className="paste-flow mono">
        <span>
          <i /> LOCAL DETAILS
        </span>
        <b>→</b>
        <span>FIELD GUARD</span>
        <b>→</b>
        <span>PASTE</span>
      </div>
      <span className="preview-caption mono">
        YOUR DATA STAYS ON YOUR DEVICE
      </span>
    </div>
  );
}

export function Projects() {
  const [featured, ...rest] = projects;
  return (
    <section
      id="projects"
      className="work-section shell"
      aria-labelledby="work-title"
    >
      <div className="section-topline">
        <span className="eyebrow">01 / SELECTED WORK</span>
        <span className="mono muted">IDEAS → WORKING SOFTWARE</span>
      </div>
      <div className="section-heading">
        <h2 id="work-title">
          Less talk.
          <br />
          <span className="serif-accent">More shipped.</span>
        </h2>
        <p>
          Tools that remove friction.
          <br />
          Experiences that make you feel something.
          <br />A few things I’ve put into the world.
        </p>
      </div>
      <article className="featured-project project-card">
        <ProjectPreview id={featured.id} />
        <div className="project-copy">
          <span className="eyebrow">{featured.category}</span>
          <h3>
            {featured.name}
            <span className="project-title-mark" aria-hidden="true">
              ↗
            </span>
          </h3>
          <p>{featured.description}</p>
          <ul className="stack-list" aria-label="Technologies">
            {featured.stack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <ProjectLinks project={featured} />
          <details className="build-notes">
            <summary>
              Under the hood <span aria-hidden="true">+</span>
            </summary>
            <p>{featured.note}</p>
          </details>
        </div>
      </article>
      <div className="project-grid">
        {rest.map((project) => (
          <article className="project-card" key={project.id}>
            <ProjectPreview id={project.id} />
            <div className="project-copy">
              <span className="eyebrow">{project.category}</span>
              <h3>
                {project.name}
                <span className="project-title-mark" aria-hidden="true">
                  ↗
                </span>
              </h3>
              <p>{project.description}</p>
              <ul className="stack-list" aria-label="Technologies">
                {project.stack.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <ProjectLinks project={project} />
              <details className="build-notes">
                <summary>
                  Under the hood <span aria-hidden="true">+</span>
                </summary>
                <p>{project.note}</p>
              </details>
            </div>
          </article>
        ))}
      </div>
      <a
        className="all-projects mono"
        href="https://github.com/gautamxdev?tab=repositories"
        target="_blank"
        rel="noreferrer"
      >
        THERE’S MORE IN THE REPOS <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}

import { SectionLabel } from "@/components/SectionLabel";
import { projects } from "@/data/site";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-3xl px-6 py-16">
      <SectionLabel label="projects_" />
      <ol className="mt-8 space-y-10">
        {projects.map((project, index) => (
          <li key={project.name} className="group">
            <div className="flex items-start gap-4">
              <span className="project-number pt-0.5">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="project-row flex-1">
                <h3 className="project-name-glow">{project.name}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="stack-chip">
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  {project.description}
                </p>
                <div className="mt-3 flex gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className="link-hover font-mono text-xs text-muted"
                    >
                      Live ↗
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      className="link-hover font-mono text-xs text-muted"
                    >
                      Repo ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

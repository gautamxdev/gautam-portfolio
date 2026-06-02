import { SectionLabel } from "@/components/SectionLabel";
import { projects } from "@/data/site";
import Image from "next/image";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-[990px] px-6 py-16">
      <SectionLabel label="projects_" />
      <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2">
        {projects.map((project) => (
          <div key={project.name} className="group flex flex-col">
            {project.image && (
              <div className="relative overflow-hidden rounded-lg border border-secondary/10 bg-[#080808] transition-all duration-300 group-hover:border-accent/30 group-hover:shadow-[0_4px_20px_rgba(255,77,0,0.06)]">
                <Image
                  src={project.image}
                  alt={project.name}
                  width={600}
                  height={350}
                  className="aspect-[1.6/1] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              </div>
            )}
            <h3 className="mt-5 font-mono text-lg font-medium text-foreground transition-colors duration-200 group-hover:text-accent">
              {project.name}
            </h3>
            <p className="mt-1 font-mono text-xs text-muted">
              {project.stack.join(" / ")}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-secondary/90 flex-grow">
              {project.description}
            </p>
            <div className="mt-4 flex items-center gap-6 font-mono text-xs">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors duration-200"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 3h6v6" />
                    <path d="M10 14 21 3" />
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  </svg>
                  <span>Live Preview</span>
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors duration-200"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  <span>Repo Url</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

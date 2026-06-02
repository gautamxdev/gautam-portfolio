// currently brewing section
import { SectionLabel } from "@/components/SectionLabel";
import { brewingCompanies } from "@/data/site";

export function CurrentlyBrewing() {
  return (
    <section id="currently-brewing" className="mx-auto max-w-[990px] px-6 py-16">
      <SectionLabel label="currently brewing_" />


      <ol className="mt-8 space-y-10">
        {brewingCompanies.map((company, index) => (
          <li key={company.name} className="group">
            <div className="flex items-start gap-4">
              <span className="project-number pt-0.5">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="project-row flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="project-name-glow">{company.name}</h3>
                  <span className="rounded-full border border-border bg-surface px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                    {company.status}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {company.stack.map((tech) => (
                    <span key={tech} className="stack-chip">
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  {company.description}
                </p>
                {company.link && (
                  <div className="mt-3">
                    <a
                      href={company.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-hover font-mono text-xs text-muted"
                    >
                      → link ↗
                    </a>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

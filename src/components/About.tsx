import { Toolkit } from "@/components/Toolkit";

export function About() {
  return (
    <section
      id="about"
      className="about-section shell"
      aria-labelledby="about-title"
    >
      <div className="section-topline">
        <span className="eyebrow">02 / THE PERSON BEHIND THE COMMITS</span>
        <span className="mono muted">HUMAN, AFTER ALL.</span>
      </div>
      <div className="about-grid">
        <div>
          <h2 id="about-title">
            Serious about craft.
            <br />
            <span className="serif-accent">Curious about everything.</span>
          </h2>
          <div className="about-copy">
            <p>
              I’m Gautam, a full-stack engineer who likes taking an idea all the
              way to something you can actually use.
            </p>
            <p>
              My work moves between developer tools, browser extensions, and
              expressive websites. I care about the parts you notice—and the
              systems that quietly make them work.
            </p>
            <p>
              I’m also building{" "}
              <a href="https://reddmark.net/" target="_blank" rel="noreferrer">
                Reddmark ↗
              </a>
              , my software studio for websites, MVPs, and automation.
            </p>
          </div>
          <a href="#contact" className="text-link">
            Have an interesting problem? <span aria-hidden="true">↗</span>
          </a>
        </div>
        <Toolkit />
      </div>
    </section>
  );
}

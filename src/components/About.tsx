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
        <div className="toolkit">
          <div className="toolkit-header">
            <span className="mono">my-toolkit.json</span>
            <span className="mono muted">{"{ }"}</span>
          </div>
          <div className="toolkit-code mono">
            <p>
              <span className="line-number">01</span>
              <span className="code-muted">{"{"}</span>
            </p>
            <p>
              <span className="line-number">02</span>
              <span className="code-property">&quot;interfaces&quot;</span>
              <span>: [</span>
            </p>
            <p className="code-indent">
              <span className="line-number">03</span>
              <span>
                &quot;React&quot;, &quot;Next.js&quot;, &quot;TypeScript&quot;
              </span>
            </p>
            <p>
              <span className="line-number">04</span>
              <span>],</span>
            </p>
            <p>
              <span className="line-number">05</span>
              <span className="code-property">&quot;systems&quot;</span>
              <span>: [</span>
            </p>
            <p className="code-indent">
              <span className="line-number">06</span>
              <span>
                &quot;Node.js&quot;, &quot;PostgreSQL&quot;, &quot;APIs&quot;
              </span>
            </p>
            <p>
              <span className="line-number">07</span>
              <span>],</span>
            </p>
            <p>
              <span className="line-number">08</span>
              <span className="code-property">&quot;play&quot;</span>
              <span>: [</span>
            </p>
            <p className="code-indent">
              <span className="line-number">09</span>
              <span>
                &quot;Three.js&quot;, &quot;GSAP&quot;, &quot;Canvas&quot;
              </span>
            </p>
            <p>
              <span className="line-number">10</span>
              <span>],</span>
            </p>
            <p>
              <span className="line-number">11</span>
              <span className="code-property">&quot;always&quot;</span>
              <span>: &quot;learning&quot;</span>
            </p>
            <p>
              <span className="line-number">12</span>
              <span className="code-muted">{"}"}</span>
            </p>
          </div>
          <div className="toolkit-footer mono">
            <span>
              <span className="status-light" /> WORK IN PROGRESS
            </span>
            <span>JUST LIKE ME.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

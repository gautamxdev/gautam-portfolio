import { HeroArt } from "@/components/HeroArt";

export function Hero() {
  return (
    <section className="hero shell" aria-labelledby="hero-title">
      <div className="hero-intro">
        <span className="eyebrow">
          <span className="status-light" /> AVAILABLE FOR INTERESTING WORK
        </span>
        <span className="hero-index mono">PORTFOLIO / 2026</span>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-name mono">
            HEY, I’M GAUTAM ALVA <span aria-hidden="true">↴</span>
          </p>
          <h1 id="hero-title">
            A little human.
            <br />A lot of{" "}
            <span className="code-word">
              code<span className="code-period">.</span>
              <svg viewBox="0 0 300 16" aria-hidden="true">
                <path d="M3 11C69 3 181 2 296 7M54 14C139 7 230 8 278 11" />
              </svg>
            </span>
          </h1>
          <p className="hero-description">
            I build useful software with a curious mind
            <br className="desktop-break" /> and an unreasonable attention to
            detail.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              Explore my work <span aria-hidden="true">↗</span>
            </a>
            <a
              className="text-link"
              href="https://github.com/gautamxdev"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="hero-caption mono">
            <span aria-hidden="true">↳</span> FULL-STACK ENGINEER. BUILDER AT
            REDDMARK.
          </p>
        </div>
        <div className="hero-installation">
          <HeroArt />
        </div>
      </div>
      <div className="hero-bottom">
        <span className="mono">GOOD SOFTWARE STARTS WITH CURIOSITY.</span>
        <a href="#projects" className="scroll-cue mono">
          SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}

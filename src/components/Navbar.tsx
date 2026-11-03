import { navLinks } from "@/data/site";
import { CommandMenu } from "@/components/CommandMenu";

export function Navbar() {
  return (
    <header className="site-header">
      <nav className="site-nav shell" aria-label="Main navigation">
        <a
          href="#top"
          className="wordmark"
          aria-label="Gautam Alva, back to top"
        >
          <span className="brand-mark" aria-hidden="true">
            g<span>.</span>
          </span>
          <span>
            gautam<span className="wordmark-muted"> / dev</span>
          </span>
        </a>
        <div className="nav-right">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <CommandMenu />
        </div>
      </nav>
    </header>
  );
}

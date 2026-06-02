import { navLinks } from "@/data/site";

export function Navbar() {
  return (
    <header className="navbar-glass sticky top-0 z-50">
      <nav className="mx-auto flex max-w-[990px] items-center justify-between gap-4 px-6 py-4">
        <a href="#" className="nav-logo shrink-0">
          <span className="text-accent">~/</span>
          <span className="text-foreground">gautam.dev</span>
        </a>
        <ul className="flex flex-wrap items-center justify-end gap-x-5 gap-y-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="link-hover text-sm font-medium text-muted">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

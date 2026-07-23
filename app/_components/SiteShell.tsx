import Link from "next/link";
import type { ReactNode } from "react";

const links = [
  { href: "/", label: "Overview" },
  { href: "/getting-started", label: "Getting started" },
  { href: "/foundations", label: "Foundations" },
  { href: "/components", label: "Components" },
  { href: "/contributing", label: "Contributing" },
  { href: "/storybook/", label: "Storybook ↗" }
];

function Brand() {
  return (
    <Link className="brand" href="/">
      <span className="brand-mark" aria-hidden="true" />
      <span>Design System</span>
    </Link>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <aside className="site-sidebar">
        <Brand />
        <nav className="nav-group" aria-label="Primary navigation">
          <p className="nav-label">System</p>
          {links.slice(0, 2).map((link) => <Link className="nav-link" key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>
        <nav className="nav-group" aria-label="Library navigation">
          <p className="nav-label">Library</p>
          {links.slice(2, 4).map((link) => <Link className="nav-link" key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>
        <nav className="nav-group" aria-label="Workflow navigation">
          <p className="nav-label">Build</p>
          {links.slice(4).map((link) => <Link className="nav-link" key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>
        <p className="nav-meta">Internal release · v0.1<br />Token source synchronized</p>
      </aside>
      <header className="mobile-header">
        <Brand />
        <details>
          <summary aria-label="Open navigation">Menu</summary>
          <nav className="mobile-menu" aria-label="Mobile navigation">
            {links.map((link) => <Link className="nav-link" key={link.href} href={link.href}>{link.label}</Link>)}
          </nav>
        </details>
      </header>
      <div className="site-main">
        {children}
        <footer className="footer">
          <span>Internal Design System · v0.1</span>
          <span>Tokens → Components → Product</span>
        </footer>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Getting started",
  description: "Install the component package, load tokens, and render the first component."
};

export default function GettingStartedPage() {
  return (
    <main className="page">
      <header className="page-header">
        <div className="breadcrumb"><Link href="/">Overview</Link><span>/</span><span>Getting started</span></div>
        <span className="section-kicker">Installation</span>
        <h1>Build with the system.</h1>
        <p>Use the packed library locally today. The package boundary is ready for a private registry when regular versioned distribution becomes necessary.</p>
      </header>

      <div className="docs-layout">
        <div className="docs-content">
          <section className="docs-section" id="install">
            <h2>1. Install the package</h2>
            <p>Create the package archive from this repository, then install it in a React application.</p>
            <pre className="code-panel">npm run pack:ui{"\n"}npm install ./internal-design-system-0.1.0.tgz</pre>
          </section>
          <section className="docs-section" id="styles">
            <h2>2. Load the system styles</h2>
            <p>Import the stylesheet once at your application entry point. It contains generated token variables and component styles.</p>
            <pre className="code-panel"><span className="code-keyword">import</span> <span className="code-string">&quot;@internal/design-system/styles.css&quot;</span>;</pre>
          </section>
          <section className="docs-section" id="component">
            <h2>3. Render a component</h2>
            <p>Components ship as typed ESM exports. React and React DOM stay in the consuming application.</p>
            <pre className="code-panel"><span className="code-keyword">import</span> {"{"} Button {"}"} <span className="code-keyword">from</span> <span className="code-string">&quot;@internal/design-system&quot;</span>;{"\n\n"}<span className="code-keyword">export function</span> SaveAction() {"{"}{"\n  "}<span className="code-keyword">return</span> &lt;Button&gt;Save changes&lt;/Button&gt;;{"\n}"}</pre>
          </section>
          <section className="docs-section" id="tokens">
            <h2>Use tokens outside components</h2>
            <p>Prefer semantic CSS variables in application layout. Base values exist for reference and token construction, not direct product use.</p>
            <pre className="code-panel">.product-card {"{"}{"\n  "}background: var(--semantic-color-surface-default);{"\n  "}border: 1px solid var(--semantic-color-border-subtle);{"\n  "}border-radius: var(--radius-lg);{"\n  "}padding: var(--space-6);{"\n}"}</pre>
          </section>
        </div>
        <aside className="page-toc" aria-label="On this page">
          <strong>On this page</strong>
          <a href="#install">Install</a>
          <a href="#styles">Load styles</a>
          <a href="#component">Render a component</a>
          <a href="#tokens">Use tokens</a>
        </aside>
      </div>
    </main>
  );
}

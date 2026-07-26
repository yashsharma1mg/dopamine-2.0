import Link from "next/link";
import { foundationPages, readyComponents, trackedComponentCount } from "@/packages/content/src";
import { tokens } from "@/packages/tokens/generated/tokens";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="eyebrow"><span className="pulse-dot" /> Foundation release · 0.1</div>
        <h1>A shared language for every interface.</h1>
        <p className="hero-copy">
          Tokens, components, and guidance that keep design intent intact from Figma to production React.
        </p>
        <div className="hero-actions">
          <Link className="button-link button-link-primary" href="/getting-started">Start building <span aria-hidden="true">→</span></Link>
        </div>
        <div className="system-stats" aria-label="Dopamine2.0 status">
          <div><strong>{Object.keys(tokens).length}</strong><span>generated tokens</span></div>
          <div><strong>{foundationPages.length}</strong><span>foundation groups</span></div>
          <div><strong>{readyComponents.length}</strong><span>package-ready components</span></div>
          <div><strong>{trackedComponentCount}</strong><span>components tracked</span></div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">One source, three layers</span>
            <h2>Decisions remain traceable.</h2>
          </div>
          <p>Every component choice points back to an intentional token, not a copied visual value.</p>
        </div>
        <div className="layer-grid">
          <article className="layer-card">
            <span className="layer-index">01</span>
            <h3>Base</h3>
            <p>Raw palette values and scales. Reference material for the system, never direct component inputs.</p>
            <code>base.color.brand.coral</code>
          </article>
          <article className="layer-card featured">
            <span className="layer-index">02</span>
            <h3>Semantic</h3>
            <p>Meaning-bearing roles that survive theme and brand changes. The default choice for product UI.</p>
            <code>semantic.color.branding.1mg</code>
          </article>
          <article className="layer-card">
            <span className="layer-index">03</span>
            <h3>Component</h3>
            <p>Slot-specific decisions for stable component contracts and auditable state changes.</p>
            <code>component.button.fill.primary.background</code>
          </article>
        </div>
      </section>

      <section className="content-section split-section">
        <div>
          <span className="section-kicker">Use the system</span>
          <h2>From install to interface in three lines.</h2>
          <p className="section-copy">The package ships ESM, declarations, tokens, and one stylesheet. React remains a peer dependency.</p>
          <Link className="text-link" href="/getting-started">Read installation guidance <span aria-hidden="true">→</span></Link>
        </div>
        <pre className="code-panel"><span className="code-comment"># install the packed release</span>{"\n"}npm install ./dopamine2.0-ui-0.1.0.tgz{"\n\n"}<span className="code-keyword">import</span> {"{"} Button {"}"} <span className="code-keyword">from</span> <span className="code-string">&quot;@dopamine2.0/ui&quot;</span>;{"\n"}<span className="code-keyword">import</span> <span className="code-string">&quot;@dopamine2.0/ui/styles.css&quot;</span>;</pre>
      </section>

      <section className="content-section release-strip">
        <div>
          <span className="section-kicker">Next component intake</span>
          <h2>Figma → spec → audit → package.</h2>
        </div>
        <p>Button, Stepper, and FAB have entered the governed release path from their supplied Figma sections.</p>
        <Link className="button-link button-link-dark" href="/contributing">View the workflow</Link>
      </section>
    </main>
  );
}

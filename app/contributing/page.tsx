import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contributing",
  description: "The governed Figma-to-package workflow for design system components."
};

const workflow = [
  ["Component intake", "Supply a node-specific approved Figma component link and a clear component name."],
  ["Specification", "Component God records semantics, anatomy, variants, states, composition, content, and accessibility without generating code."],
  ["Token audit", "Token Police resolves every token path, flags raw values, and verifies focus and disabled state requirements."],
  ["Implementation", "Build the accessible React API from the approved specification using generated semantic and component tokens."],
  ["Story coverage", "Add the playground, matrices, edge states, interaction assertions, and automated accessibility checks."],
  ["Documentation", "Complete the typed manifest so the website and Storybook share status, guidance, and source links."],
  ["Package release", "Build declarations and ESM, pack the library, and install it in a minimal consumer before promotion."]
];

export default function ContributingPage() {
  return (
    <main className="page">
      <header className="page-header">
        <div className="breadcrumb"><Link href="/">Overview</Link><span>/</span><span>Contributing</span></div>
        <span className="section-kicker">Release governance</span>
        <h1>Design intent survives the handoff.</h1>
        <p>The workflow deliberately separates interpretation, deterministic token auditing, implementation, and release. No agent invents a missing token or silently hard-codes a design value.</p>
      </header>
      <ol className="workflow">
        {workflow.map(([title, description]) => <li key={title}><strong>{title}</strong><span>{description}</span></li>)}
      </ol>
      <section className="content-section">
        <div className="section-heading">
          <div><span className="section-kicker">Release gate</span><h2>Ready means verified.</h2></div>
          <p>A component moves to Ready only when its spec, audit, implementation, stories, accessibility checks, package build, and consumer smoke test all pass.</p>
        </div>
        <div className="guidance-grid">
          <article className="content-card"><span className="status-pill" data-status="ready">Pass</span><h2>Token integrity</h2><p>Every component value resolves through the canonical JSON and generated variables.</p></article>
          <article className="content-card"><span className="status-pill" data-status="ready">Pass</span><h2>Accessible behavior</h2><p>Semantics, keyboard operation, focus, contrast, and touch targets are verified.</p></article>
          <article className="content-card"><span className="status-pill" data-status="ready">Pass</span><h2>Story coverage</h2><p>Supported states render independently and interactions assert real user outcomes.</p></article>
          <article className="content-card"><span className="status-pill" data-status="ready">Pass</span><h2>Package portability</h2><p>The packed ESM release installs cleanly without documentation dependencies.</p></article>
        </div>
      </section>
    </main>
  );
}

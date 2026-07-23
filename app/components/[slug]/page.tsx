import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getComponent, readyComponents } from "@/packages/content/src";

export function generateStaticParams() {
  return readyComponents.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: getComponent(slug)?.name ?? "Component" };
}

export default async function ComponentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const component = getComponent(slug);
  if (!component || component.status !== "ready") notFound();

  return (
    <main className="page">
      <header className="component-hero">
        <div className="breadcrumb"><Link href="/components">Components</Link><span>/</span><span>{component.name}</span></div>
        <div className="component-title-row">
          <h1>{component.name}</h1>
          <span className="status-pill" data-status={component.status}>{component.status}</span>
        </div>
        <p className="component-summary">{component.summary} Use it when the person expects the interface to do something immediately.</p>
      </header>

      <section className="story-frame-shell" aria-labelledby="playground-title">
        <div className="story-frame-toolbar">
          <strong id="playground-title">Interactive playground</strong>
          <Link href={`/storybook/?path=/story/${component.storyId}`} target="_blank">Open full Storybook ↗</Link>
        </div>
        <iframe
          className="story-frame"
          src={`/storybook/iframe.html?id=${component.storyId}&viewMode=story&shortcuts=false&singleStory=true`}
          title={`${component.name} interactive Storybook playground`}
        />
      </section>

      <div className="docs-layout">
        <div className="docs-content">
          <section className="docs-section" id="anatomy">
            <h2>Anatomy</h2>
            <ol>{component.anatomy.map((part) => <li key={part}>{part}</li>)}</ol>
          </section>
          <section className="docs-section" id="variants">
            <h2>Variants, sizes, and states</h2>
            <h3>Variants</h3><ul className="pill-list">{component.variants.map((item) => <li key={item}>{item}</li>)}</ul>
            <h3>Sizes</h3><ul className="pill-list">{component.sizes.map((item) => <li key={item}>{item}</li>)}</ul>
            <h3>States</h3><ul className="pill-list">{component.states.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <section className="docs-section" id="usage">
            <h2>Usage guidance</h2>
            <div className="guidance-grid">
              <div className="guidance-card" data-tone="do"><h3>Do</h3><ul>{component.usage.do.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div className="guidance-card" data-tone="dont"><h3>Don’t</h3><ul>{component.usage.dont.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </div>
          </section>
          <section className="docs-section" id="api">
            <h2>API</h2>
            <pre className="code-panel">{component.importExample}</pre>
            <div className="token-table-wrap">
              <table className="api-table">
                <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Purpose</th></tr></thead>
                <tbody>
                  {component.api.map((prop) => <tr key={prop.name}><td><code>{prop.name}</code></td><td><code>{prop.type}</code></td><td><code>{prop.defaultValue}</code></td><td>{prop.description}</td></tr>)}
                </tbody>
              </table>
            </div>
          </section>
          <section className="docs-section" id="accessibility">
            <h2>Accessibility</h2>
            <ul>{component.accessibility.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <section className="docs-section" id="content">
            <h2>Content guidance</h2>
            <ul>{component.contentGuidance.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <section className="docs-section" id="source">
            <h2>Design and source records</h2>
            <ul>
              <li><a className="text-link" href={component.links.specification}>Implementation specification ↗</a></li>
              <li><a className="text-link" href={component.links.audit}>Token Police audit ↗</a></li>
              <li><a className="text-link" href={component.links.source}>Storybook documentation ↗</a></li>
              {component.links.figma && <li><a className="text-link" href={component.links.figma} target="_blank">Figma source ↗</a></li>}
            </ul>
          </section>
        </div>
        <aside className="page-toc" aria-label="On this page">
          <strong>On this page</strong>
          <a href="#anatomy">Anatomy</a>
          <a href="#variants">Variants and states</a>
          <a href="#usage">Usage</a>
          <a href="#api">API</a>
          <a href="#accessibility">Accessibility</a>
          <a href="#content">Content</a>
          <a href="#source">Source records</a>
        </aside>
      </div>
    </main>
  );
}

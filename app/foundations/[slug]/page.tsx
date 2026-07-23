import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyToken } from "@/app/_components/CopyToken";
import { foundationPages, iconographyCategories } from "@/packages/content/src";
import tokenSource from "@/packages/tokens/tokens.json";

type TokenLeaf = {
  name: string;
  value: string;
  description: string;
  type: string;
};

const tokens: TokenLeaf[] = [];

function collect(node: unknown, parts: string[] = []) {
  if (!node || typeof node !== "object") return;
  if ("value" in node) {
    const token = node as { value: string; description?: string; type?: string };
    tokens.push({
      name: parts.join("."),
      value: token.value,
      description: token.description ?? "",
      type: token.type ?? ""
    });
    return;
  }
  for (const [key, value] of Object.entries(node)) collect(value, [...parts, key]);
}

collect(tokenSource);

export function generateStaticParams() {
  return foundationPages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const foundation = foundationPages.find((item) => item.slug === slug);
  return { title: foundation?.name ?? "Foundation" };
}

function cssVariable(name: string) {
  return `var(--${name.replaceAll(".", "-")})`;
}

function TokenTable({ items, colour = false }: { items: TokenLeaf[]; colour?: boolean }) {
  return (
    <div className="token-table-wrap">
      <table className="token-table">
        <thead><tr>{colour && <th>Sample</th>}<th>Token</th><th>Value / alias</th><th>Use</th></tr></thead>
        <tbody>
          {items.map((token) => (
            <tr key={token.name}>
              {colour && <td><span className="token-swatch" style={{ "--swatch": cssVariable(token.name) } as CSSProperties} /></td>}
              <td><CopyToken name={`token.${token.name}`} /></td>
              <td><code>{token.value}</code></td>
              <td>{token.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function FoundationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const foundation = foundationPages.find((item) => item.slug === slug);
  if (!foundation) notFound();

  if (slug === "iconography") {
    return (
      <main className="page">
        <header className="page-header">
          <div className="breadcrumb"><Link href="/foundations">Foundations</Link><span>/</span><span>{foundation.name}</span></div>
          <span className="section-kicker">{foundation.group} foundation</span>
          <h1>{foundation.name}</h1>
          <p>{foundation.summary} Use the named Figma glyph, then inherit its colour from the containing component’s semantic token.</p>
        </header>

        <section className="iconography-figure" aria-label="Dopamine 2.0 icon catalogue from Figma">
          <img alt="Dopamine 2.0 iconography catalogue, grouped by purpose" height="1989" src="/assets/dopamine/iconography-catalogue.png" width="2000" />
        </section>

        <section className="foundation-group">
          <h2>Icon reference</h2>
          <p>Every icon is drawn on a 24px grid. Copy the exact Figma name below when referring to an asset; do not hardcode an icon colour. The icon inherits the semantic colour of the button, action, or surface that contains it.</p>
          <div className="icon-category-grid">
            {iconographyCategories.map((category) => (
              <article className="icon-category" key={category.name}>
                <h3>{category.name}</h3>
                <ul>
                  {category.icons.map((icon) => <li key={icon}><CopyToken name={icon} /></li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>
    );
  }

  const sections =
    slug === "colours"
      ? [
          { name: "Base colours", description: "Raw values used to construct the system. Never reference these directly in components.", items: tokens.filter(({ name }) => name.startsWith("base.color.")) },
          { name: "Semantic colours", description: "Meaning-bearing aliases for product surfaces, content, borders, and focus.", items: tokens.filter(({ name }) => name.startsWith("semantic.color.")) },
          { name: "Component colours", description: "Stable slots for specific component variants and states.", items: tokens.filter(({ name }) => name.startsWith("component.")) }
        ]
      : [];

  const specimenTokens = tokens.filter(({ name }) =>
    slug === "typography"
      ? name.startsWith("font.")
      : slug === "spacing"
        ? name.startsWith("space.")
        : slug === "radius"
          ? name.startsWith("radius.")
          : slug === "layout"
            ? name.startsWith("layout.")
            : name.startsWith("shadow.")
  );

  return (
    <main className="page">
      <header className="page-header">
        <div className="breadcrumb"><Link href="/foundations">Foundations</Link><span>/</span><span>{foundation.name}</span></div>
        <span className="section-kicker">{foundation.group} foundation</span>
        <h1>{foundation.name}</h1>
        <p>{foundation.summary} Select a token name to copy its canonical path.</p>
      </header>

      {slug === "colours" ? sections.map((section) => (
        <section className="foundation-group" key={section.name}>
          <h2>{section.name}</h2>
          <p>{section.description}</p>
          <TokenTable colour items={section.items} />
        </section>
      )) : (
        <>
          <div className="specimen-grid">
            {specimenTokens.map((token) => {
              const style =
                slug === "spacing"
                  ? ({ "--demo-size": token.value } as CSSProperties)
                  : slug === "radius"
                    ? ({ "--demo-radius": token.value } as CSSProperties)
                    : slug === "shadows"
                      ? ({ "--demo-shadow": token.value } as CSSProperties)
                      : slug === "layout"
                        ? ({ "--demo-size": token.value } as CSSProperties)
                      : ({ fontFamily: token.name.includes("family") ? token.value : undefined, fontSize: token.name.includes("size") ? token.value : undefined, fontWeight: token.name.includes("weight") ? token.value : undefined } as CSSProperties);
              return (
                <article className="specimen" key={token.name}>
                  <div className="specimen-demo">
                    {slug === "spacing" && <span className="spacing-bar" style={style} />}
                    {slug === "radius" && <span className="radius-box" style={style} />}
                    {slug === "shadows" && <span className="shadow-box" style={style} />}
                    {slug === "layout" && <span className="spacing-bar" style={style} />}
                    {slug === "typography" && <span style={style}>Ag</span>}
                  </div>
                  <CopyToken name={`token.${token.name}`} />
                  <p>{token.value}</p>
                </article>
              );
            })}
          </div>
          <section className="foundation-group">
            <h2>Token reference</h2>
            <TokenTable items={specimenTokens} />
          </section>
        </>
      )}
    </main>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ComponentManifest } from "@/packages/content/src";

export function ComponentCatalogue({ components }: { components: ComponentManifest[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return components.filter(({ category, name, status, summary }) =>
      `${name} ${category} ${status} ${summary}`.toLowerCase().includes(normalized)
    );
  }, [components, query]);

  return (
    <>
      <div className="catalogue-tools">
        <label>
          <span className="nav-label">Find a component</span>
          <input
            className="search-field"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, category, or status"
            type="search"
            value={query}
          />
        </label>
        <span className="section-kicker">{filtered.length} shown</span>
      </div>
      <div className="card-grid" aria-live="polite">
        {filtered.map((component) => {
          const content = (
            <>
              <div className="card-meta">
                <span>{component.category}</span>
                <span className="status-pill" data-status={component.status}>{component.status}</span>
              </div>
              <h2>{component.name}</h2>
              <p>{component.summary}</p>
            </>
          );
          return component.status === "ready" ? (
            <Link className="card-link" href={`/components/${component.slug}`} key={component.slug}>{content}</Link>
          ) : (
            <article className="content-card" key={component.slug}>{content}</article>
          );
        })}
        {filtered.length === 0 && <p className="empty-search">No components match “{query}”.</p>}
      </div>
    </>
  );
}

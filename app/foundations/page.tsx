import type { Metadata } from "next";
import Link from "next/link";
import { foundationPages } from "@/packages/content/src";

export const metadata: Metadata = {
  title: "Foundations",
  description: "The token-backed visual decisions shared by every component and product surface."
};

export default function FoundationsPage() {
  return (
    <main className="page">
      <header className="page-header">
        <div className="breadcrumb"><Link href="/">Overview</Link><span>/</span><span>Foundations</span></div>
        <span className="section-kicker">System language</span>
        <h1>Foundations make decisions repeatable.</h1>
        <p>Every view below is rendered from the canonical token JSON. Update the source once and the website, Storybook, CSS variables, and TypeScript exports move together.</p>
      </header>
      <div className="card-grid">
        {foundationPages.map((foundation, index) => (
          <Link className="card-link" href={`/foundations/${foundation.slug}`} key={foundation.slug}>
            <div className="card-meta"><span>{foundation.group}</span><span>0{index + 1}</span></div>
            <h2>{foundation.name}</h2>
            <p>{foundation.summary}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

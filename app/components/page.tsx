import type { Metadata } from "next";
import Link from "next/link";
import { ComponentCatalogue } from "@/app/_components/ComponentCatalogue";
import { componentManifests } from "@/packages/content/src";

export const metadata: Metadata = {
  title: "Components",
  description: "A status-aware catalogue of package-ready and in-progress React components."
};

export default function ComponentsPage() {
  return (
    <main className="page">
      <header className="page-header">
        <div className="breadcrumb"><Link href="/">Overview</Link><span>/</span><span>Components</span></div>
        <span className="section-kicker">React library</span>
        <h1>Components carry the system into product.</h1>
        <p>Ready components ship in the package. Draft and experimental entries remain visible so design and engineering can align on what is coming next.</p>
      </header>
      <ComponentCatalogue components={componentManifests} />
    </main>
  );
}

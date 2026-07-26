import type { Metadata } from "next";
import { headers } from "next/headers";
import "../packages/ui/src/styles.css";
import "./globals.css";
import { SiteShell } from "./_components/SiteShell";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = new URL(`${protocol}://${host}`);

  return {
    metadataBase: baseUrl,
    title: {
      default: "Dopamine2.0",
      template: "%s · Dopamine2.0"
    },
    description:
      "A shared language for designers and developers: foundations, accessible React components, and implementation guidance.",
    openGraph: {
      title: "Dopamine2.0",
      description: "One source. Every interface.",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Dopamine2.0" }]
    },
    twitter: {
      card: "summary_large_image",
      title: "Dopamine2.0",
      description: "One source. Every interface.",
      images: ["/og.png"]
    }
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

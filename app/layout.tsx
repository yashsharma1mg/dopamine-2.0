import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "../packages/ui/src/styles.css";
import "./globals.css";
import { SiteShell } from "./_components/SiteShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = new URL(`${protocol}://${host}`);

  return {
    metadataBase: baseUrl,
    title: {
      default: "Internal Design System",
      template: "%s · Internal Design System"
    },
    description:
      "A shared language for designers and developers: foundations, accessible React components, and implementation guidance.",
    openGraph: {
      title: "Internal Design System",
      description: "One source. Every interface.",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Internal Design System" }]
    },
    twitter: {
      card: "summary_large_image",
      title: "Internal Design System",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

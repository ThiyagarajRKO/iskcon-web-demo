import type { Metadata, Viewport } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCollections } from "@/lib/catalog";
import { organizationJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { iskconFont } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.legalName} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.legalName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.legalName,
  keywords: [
    "shankha",
    "conch shell",
    "puja shankha",
    "blowing conch",
    "cowrie shells",
    "sea shells online",
    "ISKCON",
    "sacred conch",
    "buy conch shell India",
  ],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  category: "shopping",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.legalName,
    locale: siteConfig.locale,
    url: "/",
    images: [{ url: "/images/silver-shankha.jpg", width: 2400, height: 1234, alt: "Silver-mounted Shankha conch" }],
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const collections = (await getCollections()).map(({ slug, name, tagline }) => ({ slug, name, tagline }));

  return (
    <html lang="en" className={iskconFont.variable}>
      {/* Extensions (ColorZilla, Grammarly, etc.) inject attributes on <body> before hydration. */}
      <body suppressHydrationWarning>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header collections={collections} />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}

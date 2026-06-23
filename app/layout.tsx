// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PersonJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import { SiteBackground } from "@/components/effects/SiteBackground";

// Geist / Geist Mono are Vercel's proprietary fonts and not in Google Fonts.
// Loading them via next/font/google fails the build (Failed to find font
// override values). Use the system font stack instead — it matches the
// Geist feel on modern macOS / iOS, falls back to a clean sans on
// Windows / Android, and ships zero bytes of font data.
const siteUrl = "https://raviyadav.com";
const title = "Ravi Yadav — Performance Marketing Lead | Meta Ads Specialist";
const description =
  "Performance Marketing Lead with 3+ years on Meta Ads Manager. ₹3.19Cr+ INR + $108K+ USD ad spend across 478 campaigns, 6 client accounts, 212K+ leads delivered, 10K+ purchases attributed.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s · Ravi Yadav",
  },
  description,
  keywords: [
    "Ravi Yadav",
    "Performance Marketing",
    "Meta Ads",
    "Media Buyer",
    "Meta Ads Specialist",
    "Facebook Ads",
    "Instagram Ads",
    "Lead Generation",
    "ROAS optimization",
    "Bengaluru",
    "India",
  ],
  authors: [{ name: "Ravi Yadav", url: siteUrl }],
  creator: "Ravi Yadav",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title,
    description,
    siteName: "Ravi Yadav — Performance Marketing Portfolio",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Ravi Yadav — Performance Marketing Lead",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "portfolio",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#050010] text-white antialiased">
        <PersonJsonLd />
        <WebSiteJsonLd />
        <SiteBackground />
        <Header />
        <main className="pt-16 relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
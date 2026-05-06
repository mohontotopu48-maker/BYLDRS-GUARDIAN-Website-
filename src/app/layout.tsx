import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { GuardianAI } from "@/components/guardian-ai";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://byldersguardian.com"),
  title: "BYLDRS GUARDIAN – Hire with Certainty. Protect Your Property.",
  description:
    "California's only platform that audits Pros every 30 days. Find certified, vetted, and verified Pros you can trust.",
  keywords: [
    "BYLDRS GUARDIAN",
    "pro verification",
    "home improvement",
    "California Pros",
    "certified pros",
    "homeowner protection",
    "pro audit",
  ],
  authors: [{ name: "BYLDRS GUARDIAN" }],
  icons: {
    icon: "/logo.svg",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BYLDRS GUARDIAN – Hire with Certainty",
    description:
      "California's only platform that audits Pros every 30 days. Trusted by 4.5M+ people.",
    type: "website",
    url: "https://byldersguardian.com",
    siteName: "BYLDRS GUARDIAN",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BYLDRS GUARDIAN – Hire with Certainty",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BYLDRS GUARDIAN – Hire with Certainty",
    description:
      "California's only platform that audits Pros every 30 days. Trusted by 4.5M+ people.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "BYLDRS GUARDIAN",
              url: "https://byldersguardian.com",
              description:
                "California's premier pro verification platform that audits Pros every 30 days. Find certified, vetted, and verified professionals you can trust for home improvement projects.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Santa Fe Springs",
                addressLocality: "Santa Fe Springs",
                addressRegion: "CA",
                addressCountry: "US",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-562-944-0500",
                contactType: "customer service",
              },
            }),
          }}
        />
        {children}
        <Toaster />
        <GuardianAI />
      </body>
    </html>
  );
}

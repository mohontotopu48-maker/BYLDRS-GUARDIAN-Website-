import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
  openGraph: {
    title: "BYLDRS GUARDIAN – Hire with Certainty",
    description:
      "California's only platform that audits Pros every 30 days. Trusted by 4.5M+ people.",
    type: "website",
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
        {children}
        <Toaster />
      </body>
    </html>
  );
}

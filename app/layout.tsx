import type { Metadata, Viewport } from "next";
import "./globals.css";
import { personal } from "@/data/personal";

export const metadata: Metadata = {
  title: `${personal.name} | Portfolio`,
  description: personal.headline,
  applicationName: `${personal.name} Portfolio`,
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: `${personal.name} | Portfolio`,
    description: personal.headline,
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} | Portfolio`,
    description: personal.headline,
    images: ["/og-image.svg"]
  },
  robots: { index: true, follow: true },
  manifest: "/site.webmanifest"
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  colorScheme: "dark light"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

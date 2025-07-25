import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/context/providers";
import Header from "@/components/ResponsiveMenu";
import Footer from "@/components/homepage/Footer";
import { ogImageUrl, websiteUrl } from "@/utils/configurations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(websiteUrl),
  title: {
    default: "Terra & Brews - Artisan Coffee Shop & Roastery",
    template: "%s | Terra & Brews Coffee",
  },
  description:
    "Specialty coffee shop offering premium artisan coffee beans and expertly crafted brews. Direct trade, ethically sourced, and freshly roasted in-house.",
  keywords: [
    "artisan coffee",
    "specialty coffee shop",
    "premium coffee beans",
    "handcrafted coffee",
    "coffee roastery",
    "espresso drinks",
    "pour over coffee",
    "cold brew",
    "single origin coffee",
    "coffee subscription",
    "ethical coffee sourcing",
    "local coffee shop",
  ],
  authors: [{ name: "Terra & Brews", url: websiteUrl }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: websiteUrl,
    siteName: "Terra & Brews Coffee",
    title: "Terra & Brews - Artisan Coffee Shop & Roastery",
    description:
      "Specialty coffee shop offering premium artisan coffee beans and expertly crafted brews.",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Terra & Brews Coffee Shop Interior",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terra & Brews - Artisan Coffee Shop & Roastery",
    description:
      "Specialty coffee shop offering premium artisan coffee beans and expertly crafted brews.",
    images: [ogImageUrl],
    creator: "@terraandbrews",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: websiteUrl,
  },
  category: "food & beverage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#bf925f" />
        <meta name="msapplication-TileColor" content="#bf925f" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <Header />
          {/* Main content of the page */}
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/components/layout/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "69 Free Developer Tools — Private, Browser-Based | DevTools",
    template: "%s | DevTools",
  },
  description:
    "69 free developer tools — JSON, Base64, UUID, regex, and more. 100% client-side, zero data uploads. No signup required.",
  metadataBase: new URL("https://sudheertools.github.io"),
  openGraph: {
    title: "69 Free Developer Tools — Private, Browser-Based | DevTools",
    description:
      "69 free developer tools — JSON, Base64, UUID, regex, and more. 100% client-side, zero data uploads. No signup required.",
    url: "https://sudheertools.github.io",
    siteName: "DevTools",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DevTools - Free Online Developer Tools",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "69 Free Developer Tools — Private, Browser-Based | DevTools",
    description:
      "69 free developer tools — JSON, Base64, UUID, regex, and more. 100% client-side, zero data uploads. No signup required.",
    images: ["/og-image.png"],
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
    canonical: "https://sudheertools.github.io",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0050898365765606"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "DevTools",
              url: "https://sudheertools.github.io",
              description:
                "69 free developer tools — JSON, Base64, UUID, regex, and more. 100% client-side, zero data uploads.",
              sameAs: [
                "https://github.com/sudheertools",
                "https://www.linkedin.com/in/sudheerkumargv/",
                "https://www.youtube.com/@TestingWithSudheer",
              ],
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "DevTools",
              url: "https://sudheertools.github.io",
              description:
                "69 free developer tools that run entirely in your browser. Private, fast, and free.",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://sudheertools.github.io/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

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
        url: "/hero-image.svg",
        width: 1200,
        height: 630,
        alt: "DevTools - 69 Free Private Browser-Based Developer Tools",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "69 Free Developer Tools — Private, Browser-Based | DevTools",
    description:
      "69 free developer tools — JSON, Base64, UUID, regex, and more. 100% client-side, zero data uploads. No signup required.",
    images: ["/hero-image.svg"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Is this really free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, completely free. No sign-up, no limits, no premium tier. All 69 tools are available to everyone.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does it collect my data?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. Every tool runs entirely in your browser. No data is sent to any server. You can verify this by opening your browser's DevTools Network tab — you'll see zero outgoing requests.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I use it offline?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Once the page is loaded, all tools work offline. No internet connection is required for processing.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Which browsers are supported?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "All modern browsers: Chrome, Firefox, Safari, Edge. The tools use standard Web APIs (Web Crypto, FileReader, etc.) that work across all major browsers.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How is this different from other tool sites?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Most developer tool sites send your data to their servers for processing. Ours never does. This makes DevTools safe for sensitive data like API keys, JWT tokens, passwords, and proprietary code.",
                  },
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://sudheertools.github.io",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Tools",
                  item: "https://sudheertools.github.io/#tools",
                },
              ],
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

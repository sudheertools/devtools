import type { Metadata } from "next";
import URLParserPage from "./url-parser-client";

export const metadata: Metadata = {
  title: "URL Parser - Free Online Tool",
  description: "Parse URLs to extract protocol, hostname, port, path, and query parameters. Free online URL parser and analyzer for web development and debugging.",
  keywords: "url parser online, free url parser, url parser tool, url parser browser, utility tools",
  openGraph: {
    title: "URL Parser - Free Online Tool",
    description: "Parse URLs to extract protocol, hostname, port, path, and query parameters. Free online URL parser and analyzer for web development and debugging.",
    url: "https://sudheertools.github.io/url-parser",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "URL Parser - Free Online Tool",
    description: "Parse URLs to extract protocol, hostname, port, path, and query parameters. Free online URL parser and analyzer for web development and debugging.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/url-parser",
  },
};

export default function Page() {
  return <URLParserPage />;
}

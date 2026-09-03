import type { Metadata } from "next";
import URLValidatorPage from "./url-validator-client";

export const metadata: Metadata = {
  title: "URL Validator - Free Online Tool",
  description: "Validate URLs and parse their components. Check URL format, protocol, hostname, path, and query parameters.",
  keywords: "url validator online, free url validator, url validator tool, url validator browser, validation tools, validate url, url validator check",
  openGraph: {
    title: "URL Validator - Free Online Tool",
    description: "Validate URLs and parse their components. Check URL format, protocol, hostname, path, and query parameters.",
    url: "https://sudheertools.github.io/url-validator",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "URL Validator - Free Online Tool",
    description: "Validate URLs and parse their components. Check URL format, protocol, hostname, path, and query parameters.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/url-validator",
  },
};

export default function Page() {
  return <URLValidatorPage />;
}

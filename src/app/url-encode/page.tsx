import type { Metadata } from "next";
import URLEncodePage from "./url-encode-client";

export const metadata: Metadata = {
  title: "URL Encoder - Free Online Tool",
  description: "Encode text for safe use in URLs and query parameters instantly. Free online URL encoder with support for special characters. Fast and secure.",
  keywords: "url encoder online, free url encoder, url encoder tool, url encoder browser, encoding tools, url encoder, url encode decode",
  openGraph: {
    title: "URL Encoder - Free Online Tool",
    description: "Encode text for safe use in URLs and query parameters instantly. Free online URL encoder with support for special characters. Fast and secure.",
    url: "https://sudheertools.github.io/url-encode",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "URL Encoder - Free Online Tool",
    description: "Encode text for safe use in URLs and query parameters instantly. Free online URL encoder with support for special characters. Fast and secure.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/url-encode",
  },
};

export default function Page() {
  return <URLEncodePage />;
}

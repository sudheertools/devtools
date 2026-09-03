import type { Metadata } from "next";
import URLDecodePage from "./url-decode-client";

export const metadata: Metadata = {
  title: "URL Decoder - Free Online Tool",
  description: "Decode URL-encoded strings back to readable text instantly. Free online URL decoder for percent-encoded URLs, form data, and query parameters. Fast, private, and secure.",
  keywords: "url decoder online, free url decoder, url decoder tool, url decoder browser, encoding tools, url decoder, url encode decode",
  openGraph: {
    title: "URL Decoder - Free Online Tool",
    description: "Decode URL-encoded strings back to readable text instantly. Free online URL decoder for percent-encoded URLs, form data, and query parameters. Fast, private, and secure.",
    url: "https://sudheertools.github.io/url-decode",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "URL Decoder - Free Online Tool",
    description: "Decode URL-encoded strings back to readable text instantly. Free online URL decoder for percent-encoded URLs, form data, and query parameters. Fast, private, and secure.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/url-decode",
  },
};

export default function Page() {
  return <URLDecodePage />;
}

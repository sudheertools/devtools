import type { Metadata } from "next";
import HTMLEncodePage from "./html-encode-client";

export const metadata: Metadata = {
  title: "HTML Encoder - Free Online Tool",
  description: "Encode special characters to HTML entities instantly. Free online HTML encoder for escaping quotes, brackets, and special characters for safe HTML output.",
  keywords: "html encoder online, free html encoder, html encoder tool, html encoder browser, encoding tools, html encoder, html encode decode",
  openGraph: {
    title: "HTML Encoder - Free Online Tool",
    description: "Encode special characters to HTML entities instantly. Free online HTML encoder for escaping quotes, brackets, and special characters for safe HTML output.",
    url: "https://sudheertools.github.io/html-encode",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HTML Encoder - Free Online Tool",
    description: "Encode special characters to HTML entities instantly. Free online HTML encoder for escaping quotes, brackets, and special characters for safe HTML output.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/html-encode",
  },
};

export default function Page() {
  return <HTMLEncodePage />;
}

import type { Metadata } from "next";
import HTMLDecodePage from "./html-decode-client";

export const metadata: Metadata = {
  title: "HTML Decoder - Free Online Tool",
  description: "Decode HTML entities back to readable text instantly. Free online HTML decoder for converting named entities, numeric references, and escaped characters.",
  keywords: "html decoder online, free html decoder, html decoder tool, html decoder browser, encoding tools, html decoder, html encode decode",
  openGraph: {
    title: "HTML Decoder - Free Online Tool",
    description: "Decode HTML entities back to readable text instantly. Free online HTML decoder for converting named entities, numeric references, and escaped characters.",
    url: "https://sudheertools.github.io/html-decode",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HTML Decoder - Free Online Tool",
    description: "Decode HTML entities back to readable text instantly. Free online HTML decoder for converting named entities, numeric references, and escaped characters.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/html-decode",
  },
};

export default function Page() {
  return <HTMLDecodePage />;
}

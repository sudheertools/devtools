import type { Metadata } from "next";
import TextReverserPage from "./text-reverser-client";

export const metadata: Metadata = {
  title: "Text Reverser - Free Online Tool",
  description: "Reverse text, words, or lines instantly. Free online text reverser for strings, words, and line order.",
  keywords: "text reverser online, free text reverser, text reverser tool, text reverser browser, text tools",
  openGraph: {
    title: "Text Reverser - Free Online Tool",
    description: "Reverse text, words, or lines instantly. Free online text reverser for strings, words, and line order.",
    url: "https://sudheertools.github.io/text-reverser",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Text Reverser - Free Online Tool",
    description: "Reverse text, words, or lines instantly. Free online text reverser for strings, words, and line order.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/text-reverser",
  },
};

export default function Page() {
  return <TextReverserPage />;
}

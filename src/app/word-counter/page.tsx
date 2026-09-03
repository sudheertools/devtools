import type { Metadata } from "next";
import WordCounterPage from "./word-counter-client";

export const metadata: Metadata = {
  title: "Word Counter - Free Online Tool",
  description: "Count words, characters, sentences, and paragraphs in your text. See estimated reading time instantly.",
  keywords: "word counter online, free word counter, word counter tool, word counter browser, text tools",
  openGraph: {
    title: "Word Counter - Free Online Tool",
    description: "Count words, characters, sentences, and paragraphs in your text. See estimated reading time instantly.",
    url: "https://sudheertools.github.io/word-counter",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Word Counter - Free Online Tool",
    description: "Count words, characters, sentences, and paragraphs in your text. See estimated reading time instantly.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/word-counter",
  },
};

export default function Page() {
  return <WordCounterPage />;
}

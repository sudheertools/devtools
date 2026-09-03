import type { Metadata } from "next";
import CharacterCounterPage from "./character-counter-client";

export const metadata: Metadata = {
  title: "Character Counter - Free Online Tool",
  description: "Count characters, words, sentences, paragraphs, and lines in text instantly. Free online character counter and word counter for writers and developers.",
  keywords: "character counter online, free character counter, character counter tool, character counter browser, utility tools",
  openGraph: {
    title: "Character Counter - Free Online Tool",
    description: "Count characters, words, sentences, paragraphs, and lines in text instantly. Free online character counter and word counter for writers and developers.",
    url: "https://sudheertools.github.io/character-counter",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Character Counter - Free Online Tool",
    description: "Count characters, words, sentences, paragraphs, and lines in text instantly. Free online character counter and word counter for writers and developers.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/character-counter",
  },
};

export default function Page() {
  return <CharacterCounterPage />;
}

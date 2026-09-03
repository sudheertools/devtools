import type { Metadata } from "next";
import LoremIpsumPage from "./lorem-ipsum-client";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator - Free Online Tool",
  description: "Generate Lorem Ipsum placeholder text for designs, mockups, and layouts. Free online lorem ipsum generator with paragraphs, sentences, and words options.",
  keywords: "lorem ipsum generator online, free lorem ipsum generator, lorem ipsum generator tool, lorem ipsum generator browser, generation tools, generate lorem ipsum, random lorem ipsum",
  openGraph: {
    title: "Lorem Ipsum Generator - Free Online Tool",
    description: "Generate Lorem Ipsum placeholder text for designs, mockups, and layouts. Free online lorem ipsum generator with paragraphs, sentences, and words options.",
    url: "https://sudheertools.github.io/lorem-ipsum",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lorem Ipsum Generator - Free Online Tool",
    description: "Generate Lorem Ipsum placeholder text for designs, mockups, and layouts. Free online lorem ipsum generator with paragraphs, sentences, and words options.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/lorem-ipsum",
  },
};

export default function Page() {
  return <LoremIpsumPage />;
}

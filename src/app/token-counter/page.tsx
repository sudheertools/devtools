import type { Metadata } from "next";
import TokenCounterPage from "./token-counter-client";

export const metadata: Metadata = {
  title: "Token Counter - Free Online Tool",
  description: "Count tokens, characters, and words for LLM prompts. Estimate API costs. Free, fast, and private. All processing happens in your browser.",
  keywords: "token counter, free token counter, token counter online, ai-tools tools, developer tools",
  openGraph: {
    title: "Token Counter - Free Online Tool",
    description: "Count tokens, characters, and words for LLM prompts. Estimate API costs. Free, fast, and private. All processing happens in your browser.",
    url: "https://sudheertools.github.io/token-counter",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Token Counter - Free Online Tool",
    description: "Count tokens, characters, and words for LLM prompts. Estimate API costs. Free, fast, and private. All processing happens in your browser.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/token-counter",
  },
};

export default function Page() {
  return <TokenCounterPage />;
}

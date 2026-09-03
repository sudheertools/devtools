import type { Metadata } from "next";
import DiffCheckerPage from "./diff-checker-client";

export const metadata: Metadata = {
  title: "Diff Checker - Free Online Tool",
  description: "Compare two texts side by side and highlight differences. Free online diff checker for code, text, and documents.",
  keywords: "diff checker online, free diff checker, diff checker tool, diff checker browser, utility tools",
  openGraph: {
    title: "Diff Checker - Free Online Tool",
    description: "Compare two texts side by side and highlight differences. Free online diff checker for code, text, and documents.",
    url: "https://sudheertools.github.io/diff-checker",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diff Checker - Free Online Tool",
    description: "Compare two texts side by side and highlight differences. Free online diff checker for code, text, and documents.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/diff-checker",
  },
};

export default function Page() {
  return <DiffCheckerPage />;
}

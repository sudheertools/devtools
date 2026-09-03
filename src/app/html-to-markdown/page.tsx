import type { Metadata } from "next";
import HTMLToMarkdownPage from "./html-to-markdown-client";

export const metadata: Metadata = {
  title: "HTML to Markdown Converter - Free Online Tool",
  description: "Convert HTML to Markdown format instantly. Free online HTML to Markdown converter with support for all common elements. Fast, private, and secure.",
  keywords: "html to markdown online, free html to markdown, html to markdown tool, html to markdown browser, conversion tools",
  openGraph: {
    title: "HTML to Markdown Converter - Free Online Tool",
    description: "Convert HTML to Markdown format instantly. Free online HTML to Markdown converter with support for all common elements. Fast, private, and secure.",
    url: "https://sudheertools.github.io/html-to-markdown",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HTML to Markdown Converter - Free Online Tool",
    description: "Convert HTML to Markdown format instantly. Free online HTML to Markdown converter with support for all common elements. Fast, private, and secure.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/html-to-markdown",
  },
};

export default function Page() {
  return <HTMLToMarkdownPage />;
}

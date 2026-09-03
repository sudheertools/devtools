import type { Metadata } from "next";
import HTMLFormatterPage from "./html-formatter-client";

export const metadata: Metadata = {
  title: "HTML Formatter - Free Online Tool",
  description: "Format, beautify, and minify HTML code online. Free HTML formatter with customizable indentation and validation.",
  keywords: "html formatter online, free html formatter, html formatter tool, html formatter browser, formatting tools, format html, beautify html",
  openGraph: {
    title: "HTML Formatter - Free Online Tool",
    description: "Format, beautify, and minify HTML code online. Free HTML formatter with customizable indentation and validation.",
    url: "https://sudheertools.github.io/html-formatter",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HTML Formatter - Free Online Tool",
    description: "Format, beautify, and minify HTML code online. Free HTML formatter with customizable indentation and validation.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/html-formatter",
  },
};

export default function Page() {
  return <HTMLFormatterPage />;
}

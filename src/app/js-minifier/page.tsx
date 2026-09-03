import type { Metadata } from "next";
import JSMinifierPage from "./js-minifier-client";

export const metadata: Metadata = {
  title: "JavaScript Minifier - Free Online Tool",
  description: "Minify and beautify JavaScript code online. Free JS minifier with syntax validation and formatting options.",
  keywords: "javascript minifier online, free javascript minifier, javascript minifier tool, javascript minifier browser, formatting tools",
  openGraph: {
    title: "JavaScript Minifier - Free Online Tool",
    description: "Minify and beautify JavaScript code online. Free JS minifier with syntax validation and formatting options.",
    url: "https://sudheertools.github.io/js-minifier",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JavaScript Minifier - Free Online Tool",
    description: "Minify and beautify JavaScript code online. Free JS minifier with syntax validation and formatting options.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/js-minifier",
  },
};

export default function Page() {
  return <JSMinifierPage />;
}

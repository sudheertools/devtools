import type { Metadata } from "next";
import CSSMinifierPage from "./css-minifier-client";

export const metadata: Metadata = {
  title: "CSS Minifier - Free Online Tool",
  description: "Minify and beautify CSS code online. Free CSS minifier with syntax validation and formatting options.",
  keywords: "css minifier online, free css minifier, css minifier tool, css minifier browser, formatting tools",
  openGraph: {
    title: "CSS Minifier - Free Online Tool",
    description: "Minify and beautify CSS code online. Free CSS minifier with syntax validation and formatting options.",
    url: "https://sudheertools.github.io/css-minifier",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSS Minifier - Free Online Tool",
    description: "Minify and beautify CSS code online. Free CSS minifier with syntax validation and formatting options.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/css-minifier",
  },
};

export default function Page() {
  return <CSSMinifierPage />;
}

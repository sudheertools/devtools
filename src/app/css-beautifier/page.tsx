import type { Metadata } from "next";
import CSSBeautifierPage from "./css-beautifier-client";

export const metadata: Metadata = {
  title: "CSS Beautifier - Free Online Tool",
  description: "Format and beautify CSS code with proper indentation. Free online CSS formatter for readable code.",
  keywords: "css beautifier online, free css beautifier, css beautifier tool, css beautifier browser, css tools",
  openGraph: {
    title: "CSS Beautifier - Free Online Tool",
    description: "Format and beautify CSS code with proper indentation. Free online CSS formatter for readable code.",
    url: "https://sudheertools.github.io/css-beautifier",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSS Beautifier - Free Online Tool",
    description: "Format and beautify CSS code with proper indentation. Free online CSS formatter for readable code.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/css-beautifier",
  },
};

export default function Page() {
  return <CSSBeautifierPage />;
}

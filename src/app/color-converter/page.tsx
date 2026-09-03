import type { Metadata } from "next";
import ColorConverterPage from "./color-converter-client";

export const metadata: Metadata = {
  title: "Color Converter - Free Online Tool",
  description: "Convert colors between HEX, RGB, and HSL formats instantly. Free online color converter with live preview for web design and development.",
  keywords: "color converter online, free color converter, color converter tool, color converter browser, conversion tools, convert color, color converter online",
  openGraph: {
    title: "Color Converter - Free Online Tool",
    description: "Convert colors between HEX, RGB, and HSL formats instantly. Free online color converter with live preview for web design and development.",
    url: "https://sudheertools.github.io/color-converter",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Converter - Free Online Tool",
    description: "Convert colors between HEX, RGB, and HSL formats instantly. Free online color converter with live preview for web design and development.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/color-converter",
  },
};

export default function Page() {
  return <ColorConverterPage />;
}

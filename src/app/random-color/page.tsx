import type { Metadata } from "next";
import RandomColorPage from "./random-color-client";

export const metadata: Metadata = {
  title: "Random Color Generator - Free Online Tool",
  description: "Generate random colors and color palettes for web design and development. Free online random color generator with HEX, RGB, and HSL color formats.",
  keywords: "random color generator online, free random color generator, random color generator tool, random color generator browser, generation tools, generate random color, random random color",
  openGraph: {
    title: "Random Color Generator - Free Online Tool",
    description: "Generate random colors and color palettes for web design and development. Free online random color generator with HEX, RGB, and HSL color formats.",
    url: "https://sudheertools.github.io/random-color",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Random Color Generator - Free Online Tool",
    description: "Generate random colors and color palettes for web design and development. Free online random color generator with HEX, RGB, and HSL color formats.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/random-color",
  },
};

export default function Page() {
  return <RandomColorPage />;
}

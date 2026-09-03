import type { Metadata } from "next";
import ColorPalettePage from "./color-palette-client";

export const metadata: Metadata = {
  title: "Color Palette Generator - Free Online Tool",
  description: "Generate color palettes from a base color. Create complementary, analogous, triadic, and more color schemes.",
  keywords: "color palette generator online, free color palette generator, color palette generator tool, color palette generator browser, color tools, generate color palette, random color palette",
  openGraph: {
    title: "Color Palette Generator - Free Online Tool",
    description: "Generate color palettes from a base color. Create complementary, analogous, triadic, and more color schemes.",
    url: "https://sudheertools.github.io/color-palette",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Palette Generator - Free Online Tool",
    description: "Generate color palettes from a base color. Create complementary, analogous, triadic, and more color schemes.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/color-palette",
  },
};

export default function Page() {
  return <ColorPalettePage />;
}

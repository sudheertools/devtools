import type { Metadata } from "next";
import ColorContrastPage from "./color-contrast-client";

export const metadata: Metadata = {
  title: "Color Contrast Checker - Free Online Tool",
  description: "Check WCAG color contrast ratios for accessibility. Free color contrast checker showing AA and AAA compliance levels.",
  keywords: "color contrast checker online, free color contrast checker, color contrast checker tool, color contrast checker browser, utility tools",
  openGraph: {
    title: "Color Contrast Checker - Free Online Tool",
    description: "Check WCAG color contrast ratios for accessibility. Free color contrast checker showing AA and AAA compliance levels.",
    url: "https://sudheertools.github.io/color-contrast",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Contrast Checker - Free Online Tool",
    description: "Check WCAG color contrast ratios for accessibility. Free color contrast checker showing AA and AAA compliance levels.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/color-contrast",
  },
};

export default function Page() {
  return <ColorContrastPage />;
}

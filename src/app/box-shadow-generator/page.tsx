import type { Metadata } from "next";
import BoxShadowGeneratorPage from "./box-shadow-generator-client";

export const metadata: Metadata = {
  title: "Box Shadow Generator - Free Online Tool",
  description: "Generate CSS box shadows with live preview. Customize offset, blur, spread, color, and inset options.",
  keywords: "box shadow generator online, free box shadow generator, box shadow generator tool, box shadow generator browser, css tools, generate box shadow, random box shadow",
  openGraph: {
    title: "Box Shadow Generator - Free Online Tool",
    description: "Generate CSS box shadows with live preview. Customize offset, blur, spread, color, and inset options.",
    url: "https://sudheertools.github.io/box-shadow-generator",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Box Shadow Generator - Free Online Tool",
    description: "Generate CSS box shadows with live preview. Customize offset, blur, spread, color, and inset options.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/box-shadow-generator",
  },
};

export default function Page() {
  return <BoxShadowGeneratorPage />;
}

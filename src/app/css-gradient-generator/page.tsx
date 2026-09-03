import type { Metadata } from "next";
import CSSGradientGeneratorPage from "./css-gradient-generator-client";

export const metadata: Metadata = {
  title: "CSS Gradient Generator - Free Online Tool",
  description: "Create CSS gradients with multiple color stops. Generate linear and radial gradients with live preview.",
  keywords: "css gradient generator online, free css gradient generator, css gradient generator tool, css gradient generator browser, color tools, generate css gradient, random css gradient",
  openGraph: {
    title: "CSS Gradient Generator - Free Online Tool",
    description: "Create CSS gradients with multiple color stops. Generate linear and radial gradients with live preview.",
    url: "https://sudheertools.github.io/css-gradient-generator",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSS Gradient Generator - Free Online Tool",
    description: "Create CSS gradients with multiple color stops. Generate linear and radial gradients with live preview.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/css-gradient-generator",
  },
};

export default function Page() {
  return <CSSGradientGeneratorPage />;
}

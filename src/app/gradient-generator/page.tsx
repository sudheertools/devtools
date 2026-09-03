import type { Metadata } from "next";
import GradientGeneratorPage from "./gradient-generator-client";

export const metadata: Metadata = {
  title: "CSS Gradient Generator - Free Online Tool",
  description: "Create beautiful CSS gradients with live preview. Generate linear and radial gradients with multiple color stops.",
  keywords: "gradient generator online, free gradient generator, gradient generator tool, gradient generator browser, css tools, generate gradient, random gradient",
  openGraph: {
    title: "CSS Gradient Generator - Free Online Tool",
    description: "Create beautiful CSS gradients with live preview. Generate linear and radial gradients with multiple color stops.",
    url: "https://sudheertools.github.io/gradient-generator",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSS Gradient Generator - Free Online Tool",
    description: "Create beautiful CSS gradients with live preview. Generate linear and radial gradients with multiple color stops.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/gradient-generator",
  },
};

export default function Page() {
  return <GradientGeneratorPage />;
}

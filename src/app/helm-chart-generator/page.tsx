import type { Metadata } from "next";
import HelmChartGeneratorPage from "./helm-chart-generator-client";

export const metadata: Metadata = {
  title: "Helm Chart Generator - Free Online Tool",
  description: "Generate Kubernetes Helm chart templates with configurable values. Free, fast, and private. All processing happens in your browser.",
  keywords: "helm chart generator, free helm chart generator, helm chart generator online, devops tools, developer tools",
  openGraph: {
    title: "Helm Chart Generator - Free Online Tool",
    description: "Generate Kubernetes Helm chart templates with configurable values. Free, fast, and private. All processing happens in your browser.",
    url: "https://sudheertools.github.io/helm-chart-generator",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Helm Chart Generator - Free Online Tool",
    description: "Generate Kubernetes Helm chart templates with configurable values. Free, fast, and private. All processing happens in your browser.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/helm-chart-generator",
  },
};

export default function Page() {
  return <HelmChartGeneratorPage />;
}

import type { Metadata } from "next";
import DockerfileGeneratorPage from "./dockerfile-generator-client";

export const metadata: Metadata = {
  title: "Dockerfile Generator - Free Online Tool",
  description: "Generate optimized Dockerfiles for Node.js, Python, Go, and more. Free, fast, and private. All processing happens in your browser.",
  keywords: "dockerfile generator, free dockerfile generator, dockerfile generator online, devops tools, developer tools",
  openGraph: {
    title: "Dockerfile Generator - Free Online Tool",
    description: "Generate optimized Dockerfiles for Node.js, Python, Go, and more. Free, fast, and private. All processing happens in your browser.",
    url: "https://sudheertools.github.io/dockerfile-generator",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dockerfile Generator - Free Online Tool",
    description: "Generate optimized Dockerfiles for Node.js, Python, Go, and more. Free, fast, and private. All processing happens in your browser.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/dockerfile-generator",
  },
};

export default function Page() {
  return <DockerfileGeneratorPage />;
}

import type { Metadata } from "next";
import JsonToTypescriptPage from "./json-to-typescript-client";

export const metadata: Metadata = {
  title: "JSON to TypeScript - Free Online Tool",
  description: "Convert JSON data to TypeScript interfaces and types. Paste JSON to generate typed definitions. Free, fast, and private. All processing happens in your browser.",
  keywords: "json to typescript, free json to typescript, json to typescript online, code-generation tools, developer tools",
  openGraph: {
    title: "JSON to TypeScript - Free Online Tool",
    description: "Convert JSON data to TypeScript interfaces and types. Paste JSON to generate typed definitions. Free, fast, and private. All processing happens in your browser.",
    url: "https://sudheertools.github.io/json-to-typescript",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON to TypeScript - Free Online Tool",
    description: "Convert JSON data to TypeScript interfaces and types. Paste JSON to generate typed definitions. Free, fast, and private. All processing happens in your browser.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/json-to-typescript",
  },
};

export default function Page() {
  return <JsonToTypescriptPage />;
}

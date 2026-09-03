import type { Metadata } from "next";
import JsonToGoPage from "./json-to-go-client";

export const metadata: Metadata = {
  title: "JSON to Go - Free Online Tool",
  description: "Convert JSON data to Go struct definitions with proper tags and types. Free, fast, and private. All processing happens in your browser.",
  keywords: "json to go, free json to go, json to go online, code-generation tools, developer tools",
  openGraph: {
    title: "JSON to Go - Free Online Tool",
    description: "Convert JSON data to Go struct definitions with proper tags and types. Free, fast, and private. All processing happens in your browser.",
    url: "https://sudheertools.github.io/json-to-go",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON to Go - Free Online Tool",
    description: "Convert JSON data to Go struct definitions with proper tags and types. Free, fast, and private. All processing happens in your browser.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/json-to-go",
  },
};

export default function Page() {
  return <JsonToGoPage />;
}

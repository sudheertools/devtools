import type { Metadata } from "next";
import JsonToRustPage from "./json-to-rust-client";

export const metadata: Metadata = {
  title: "JSON to Rust - Free Online Tool",
  description: "Convert JSON data to Rust struct definitions with serde derives. Free, fast, and private. All processing happens in your browser.",
  keywords: "json to rust, free json to rust, json to rust online, code-generation tools, developer tools",
  openGraph: {
    title: "JSON to Rust - Free Online Tool",
    description: "Convert JSON data to Rust struct definitions with serde derives. Free, fast, and private. All processing happens in your browser.",
    url: "https://sudheertools.github.io/json-to-rust",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON to Rust - Free Online Tool",
    description: "Convert JSON data to Rust struct definitions with serde derives. Free, fast, and private. All processing happens in your browser.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/json-to-rust",
  },
};

export default function Page() {
  return <JsonToRustPage />;
}

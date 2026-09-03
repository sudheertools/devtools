import type { Metadata } from "next";
import JsonToDartPage from "./json-to-dart-client";

export const metadata: Metadata = {
  title: "JSON to Dart - Free Online Tool",
  description: "Convert JSON data to Dart classes with fromJson/toJson methods. Free, fast, and private. All processing happens in your browser.",
  keywords: "json to dart, free json to dart, json to dart online, code-generation tools, developer tools",
  openGraph: {
    title: "JSON to Dart - Free Online Tool",
    description: "Convert JSON data to Dart classes with fromJson/toJson methods. Free, fast, and private. All processing happens in your browser.",
    url: "https://sudheertools.github.io/json-to-dart",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON to Dart - Free Online Tool",
    description: "Convert JSON data to Dart classes with fromJson/toJson methods. Free, fast, and private. All processing happens in your browser.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/json-to-dart",
  },
};

export default function Page() {
  return <JsonToDartPage />;
}

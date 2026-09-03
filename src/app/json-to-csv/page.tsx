import type { Metadata } from "next";
import JSONToCSVPage from "./json-to-csv-client";

export const metadata: Metadata = {
  title: "JSON to CSV Converter - Free Online Tool",
  description: "Convert JSON to CSV format instantly. Free online JSON to CSV converter with custom delimiters. Fast, private, and secure.",
  keywords: "json to csv online, free json to csv, json to csv tool, json to csv browser, conversion tools",
  openGraph: {
    title: "JSON to CSV Converter - Free Online Tool",
    description: "Convert JSON to CSV format instantly. Free online JSON to CSV converter with custom delimiters. Fast, private, and secure.",
    url: "https://sudheertools.github.io/json-to-csv",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON to CSV Converter - Free Online Tool",
    description: "Convert JSON to CSV format instantly. Free online JSON to CSV converter with custom delimiters. Fast, private, and secure.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/json-to-csv",
  },
};

export default function Page() {
  return <JSONToCSVPage />;
}

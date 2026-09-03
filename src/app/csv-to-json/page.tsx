import type { Metadata } from "next";
import CSVToJSONPage from "./csv-to-json-client";

export const metadata: Metadata = {
  title: "CSV to JSON Converter - Free Online Tool",
  description: "Convert CSV to JSON format instantly. Free online CSV to JSON converter with custom delimiters. Fast, private, and secure.",
  keywords: "csv to json online, free csv to json, csv to json tool, csv to json browser, conversion tools",
  openGraph: {
    title: "CSV to JSON Converter - Free Online Tool",
    description: "Convert CSV to JSON format instantly. Free online CSV to JSON converter with custom delimiters. Fast, private, and secure.",
    url: "https://sudheertools.github.io/csv-to-json",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSV to JSON Converter - Free Online Tool",
    description: "Convert CSV to JSON format instantly. Free online CSV to JSON converter with custom delimiters. Fast, private, and secure.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/csv-to-json",
  },
};

export default function Page() {
  return <CSVToJSONPage />;
}

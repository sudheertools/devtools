import type { Metadata } from "next";
import JSONFormatterPage from "./json-formatter-client";

export const metadata: Metadata = {
  title: "JSON Formatter - Free Online Tool",
  description: "Format, validate, minify, and beautify JSON data instantly. Free online JSON formatter with syntax validation and pretty print options.",
  keywords: "json formatter online, free json formatter, json formatter tool, json formatter browser, formatting tools, format json, beautify json",
  openGraph: {
    title: "JSON Formatter - Free Online Tool",
    description: "Format, validate, minify, and beautify JSON data instantly. Free online JSON formatter with syntax validation and pretty print options.",
    url: "https://sudheertools.github.io/json-formatter",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Formatter - Free Online Tool",
    description: "Format, validate, minify, and beautify JSON data instantly. Free online JSON formatter with syntax validation and pretty print options.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/json-formatter",
  },
};

export default function Page() {
  return <JSONFormatterPage />;
}

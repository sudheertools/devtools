import type { Metadata } from "next";
import JSONValidatorPage from "./json-validator-client";

export const metadata: Metadata = {
  title: "JSON Validator - Free Online Tool",
  description: "Validate JSON syntax and check for errors instantly. Free online JSON validator with detailed error messages and structure analysis.",
  keywords: "json validator online, free json validator, json validator tool, json validator browser, formatting tools, validate json, json validator check",
  openGraph: {
    title: "JSON Validator - Free Online Tool",
    description: "Validate JSON syntax and check for errors instantly. Free online JSON validator with detailed error messages and structure analysis.",
    url: "https://sudheertools.github.io/json-validator",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Validator - Free Online Tool",
    description: "Validate JSON syntax and check for errors instantly. Free online JSON validator with detailed error messages and structure analysis.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/json-validator",
  },
};

export default function Page() {
  return <JSONValidatorPage />;
}

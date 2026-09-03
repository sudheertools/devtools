import type { Metadata } from "next";
import JsonSchemaValidatorPage from "./json-schema-validator-client";

export const metadata: Metadata = {
  title: "JSON Schema Validator - Free Online Tool",
  description: "Validate JSON data against a JSON Schema. Check data structure, types, and constraints with detailed error messages.",
  keywords: "json schema validator online, free json schema validator, json schema validator tool, json schema validator browser, validation tools, validate json schema, json schema validator check",
  openGraph: {
    title: "JSON Schema Validator - Free Online Tool",
    description: "Validate JSON data against a JSON Schema. Check data structure, types, and constraints with detailed error messages.",
    url: "https://sudheertools.github.io/json-schema-validator",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Schema Validator - Free Online Tool",
    description: "Validate JSON data against a JSON Schema. Check data structure, types, and constraints with detailed error messages.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/json-schema-validator",
  },
};

export default function Page() {
  return <JsonSchemaValidatorPage />;
}

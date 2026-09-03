import type { Metadata } from "next";
import JSONToYAMLPage from "./json-to-yaml-client";

export const metadata: Metadata = {
  title: "JSON to YAML Converter - Free Online Tool",
  description: "Convert JSON to YAML and YAML to JSON online. Free bidirectional converter for JSON and YAML data formats.",
  keywords: "json to yaml online, free json to yaml, json to yaml tool, json to yaml browser, conversion tools",
  openGraph: {
    title: "JSON to YAML Converter - Free Online Tool",
    description: "Convert JSON to YAML and YAML to JSON online. Free bidirectional converter for JSON and YAML data formats.",
    url: "https://sudheertools.github.io/json-to-yaml",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON to YAML Converter - Free Online Tool",
    description: "Convert JSON to YAML and YAML to JSON online. Free bidirectional converter for JSON and YAML data formats.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/json-to-yaml",
  },
};

export default function Page() {
  return <JSONToYAMLPage />;
}

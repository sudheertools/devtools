import type { Metadata } from "next";
import CaseConverterPage from "./case-converter-client";

export const metadata: Metadata = {
  title: "Case Converter - Free Online Tool",
  description: "Convert text between camelCase, snake_case, kebab-case, PascalCase, and more. Free online case converter for developers and writers.",
  keywords: "case converter online, free case converter, case converter tool, case converter browser, conversion tools, convert case, case converter online",
  openGraph: {
    title: "Case Converter - Free Online Tool",
    description: "Convert text between camelCase, snake_case, kebab-case, PascalCase, and more. Free online case converter for developers and writers.",
    url: "https://sudheertools.github.io/case-converter",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Converter - Free Online Tool",
    description: "Convert text between camelCase, snake_case, kebab-case, PascalCase, and more. Free online case converter for developers and writers.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/case-converter",
  },
};

export default function Page() {
  return <CaseConverterPage />;
}

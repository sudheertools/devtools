import type { Metadata } from "next";
import UUIDGeneratorPage from "./uuid-generator-client";

export const metadata: Metadata = {
  title: "UUID Generator - Free Online Tool",
  description: "Generate random UUID v4 identifiers instantly. Free online UUID generator for applications, databases, and more. Fast, private, and secure.",
  keywords: "uuid generator online, free uuid generator, uuid generator tool, uuid generator browser, generation tools, generate uuid, random uuid",
  openGraph: {
    title: "UUID Generator - Free Online Tool",
    description: "Generate random UUID v4 identifiers instantly. Free online UUID generator for applications, databases, and more. Fast, private, and secure.",
    url: "https://sudheertools.github.io/uuid-generator",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UUID Generator - Free Online Tool",
    description: "Generate random UUID v4 identifiers instantly. Free online UUID generator for applications, databases, and more. Fast, private, and secure.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/uuid-generator",
  },
};

export default function Page() {
  return <UUIDGeneratorPage />;
}

import type { Metadata } from "next";
import HashGeneratorPage from "./hash-generator-client";

export const metadata: Metadata = {
  title: "Hash Generator - Free Online Tool",
  description: "Generate SHA-1, SHA-256, and SHA-512 cryptographic hashes from any text input. Free online hash generator for data integrity and security verification.",
  keywords: "hash generator online, free hash generator, hash generator tool, hash generator browser, generation tools, generate hash, random hash",
  openGraph: {
    title: "Hash Generator - Free Online Tool",
    description: "Generate SHA-1, SHA-256, and SHA-512 cryptographic hashes from any text input. Free online hash generator for data integrity and security verification.",
    url: "https://sudheertools.github.io/hash-generator",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hash Generator - Free Online Tool",
    description: "Generate SHA-1, SHA-256, and SHA-512 cryptographic hashes from any text input. Free online hash generator for data integrity and security verification.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/hash-generator",
  },
};

export default function Page() {
  return <HashGeneratorPage />;
}

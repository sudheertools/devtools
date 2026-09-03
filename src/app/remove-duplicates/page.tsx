import type { Metadata } from "next";
import RemoveDuplicatesPage from "./remove-duplicates-client";

export const metadata: Metadata = {
  title: "Remove Duplicate Lines - Free Online Tool",
  description: "Remove duplicate lines from text. Keep first occurrence and remove repeated lines instantly.",
  keywords: "remove duplicate lines online, free remove duplicate lines, remove duplicate lines tool, remove duplicate lines browser, text tools",
  openGraph: {
    title: "Remove Duplicate Lines - Free Online Tool",
    description: "Remove duplicate lines from text. Keep first occurrence and remove repeated lines instantly.",
    url: "https://sudheertools.github.io/remove-duplicates",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Remove Duplicate Lines - Free Online Tool",
    description: "Remove duplicate lines from text. Keep first occurrence and remove repeated lines instantly.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/remove-duplicates",
  },
};

export default function Page() {
  return <RemoveDuplicatesPage />;
}

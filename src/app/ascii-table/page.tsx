import type { Metadata } from "next";
import AsciiTablePage from "./ascii-table-client";

export const metadata: Metadata = {
  title: "ASCII Table - Free Online Reference",
  description: "Complete ASCII character table with codes, names, and categories. Search and copy ASCII characters.",
  keywords: "ascii table online, free ascii table, ascii table tool, ascii table browser, reference tools",
  openGraph: {
    title: "ASCII Table - Free Online Reference",
    description: "Complete ASCII character table with codes, names, and categories. Search and copy ASCII characters.",
    url: "https://sudheertools.github.io/ascii-table",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ASCII Table - Free Online Reference",
    description: "Complete ASCII character table with codes, names, and categories. Search and copy ASCII characters.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/ascii-table",
  },
};

export default function Page() {
  return <AsciiTablePage />;
}

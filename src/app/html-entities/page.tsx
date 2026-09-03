import type { Metadata } from "next";
import HtmlEntitiesPage from "./html-entities-client";

export const metadata: Metadata = {
  title: "HTML Entities - Free Online Reference",
  description: "Complete list of HTML entities with codes and characters. Search and copy HTML entity codes.",
  keywords: "html entities online, free html entities, html entities tool, html entities browser, reference tools",
  openGraph: {
    title: "HTML Entities - Free Online Reference",
    description: "Complete list of HTML entities with codes and characters. Search and copy HTML entity codes.",
    url: "https://sudheertools.github.io/html-entities",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HTML Entities - Free Online Reference",
    description: "Complete list of HTML entities with codes and characters. Search and copy HTML entity codes.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/html-entities",
  },
};

export default function Page() {
  return <HtmlEntitiesPage />;
}

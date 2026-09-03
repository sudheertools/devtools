import type { Metadata } from "next";
import SortLinesPage from "./sort-lines-client";

export const metadata: Metadata = {
  title: "Sort Lines - Free Online Tool",
  description: "Sort text lines alphabetically or numerically. Ascending, descending, or reverse order sorting.",
  keywords: "sort lines online, free sort lines, sort lines tool, sort lines browser, text tools",
  openGraph: {
    title: "Sort Lines - Free Online Tool",
    description: "Sort text lines alphabetically or numerically. Ascending, descending, or reverse order sorting.",
    url: "https://sudheertools.github.io/sort-lines",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sort Lines - Free Online Tool",
    description: "Sort text lines alphabetically or numerically. Ascending, descending, or reverse order sorting.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/sort-lines",
  },
};

export default function Page() {
  return <SortLinesPage />;
}

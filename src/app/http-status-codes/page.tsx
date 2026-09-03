import type { Metadata } from "next";
import HTTPStatusCodesPage from "./http-status-codes-client";

export const metadata: Metadata = {
  title: "HTTP Status Codes - Free Online Reference",
  description: "Complete list of HTTP status codes with descriptions. Search and filter by code, name, or category.",
  keywords: "http status codes online, free http status codes, http status codes tool, http status codes browser, reference tools",
  openGraph: {
    title: "HTTP Status Codes - Free Online Reference",
    description: "Complete list of HTTP status codes with descriptions. Search and filter by code, name, or category.",
    url: "https://sudheertools.github.io/http-status-codes",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HTTP Status Codes - Free Online Reference",
    description: "Complete list of HTTP status codes with descriptions. Search and filter by code, name, or category.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/http-status-codes",
  },
};

export default function Page() {
  return <HTTPStatusCodesPage />;
}

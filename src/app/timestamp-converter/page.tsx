import type { Metadata } from "next";
import TimestampConverterPage from "./timestamp-converter-client";

export const metadata: Metadata = {
  title: "Timestamp Converter - Free Online Tool",
  description: "Convert Unix timestamps to human-readable dates and vice versa. Free online timestamp converter for seconds and milliseconds with date formatting.",
  keywords: "timestamp converter online, free timestamp converter, timestamp converter tool, timestamp converter browser, conversion tools, convert timestamp, timestamp converter online",
  openGraph: {
    title: "Timestamp Converter - Free Online Tool",
    description: "Convert Unix timestamps to human-readable dates and vice versa. Free online timestamp converter for seconds and milliseconds with date formatting.",
    url: "https://sudheertools.github.io/timestamp-converter",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Timestamp Converter - Free Online Tool",
    description: "Convert Unix timestamps to human-readable dates and vice versa. Free online timestamp converter for seconds and milliseconds with date formatting.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/timestamp-converter",
  },
};

export default function Page() {
  return <TimestampConverterPage />;
}

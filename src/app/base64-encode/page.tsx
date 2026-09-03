import type { Metadata } from "next";
import Base64EncodePage from "./base64-encode-client";

export const metadata: Metadata = {
  title: "Base64 Encoder - Free Online Tool",
  description: "Encode text to Base64 format instantly. Free online Base64 encoder with Unicode support. Fast, private, and secure - no data leaves your browser.",
  keywords: "base64 encoder online, free base64 encoder, base64 encoder tool, base64 encoder browser, encoding tools, base64 encoder, base64 encode decode",
  openGraph: {
    title: "Base64 Encoder - Free Online Tool",
    description: "Encode text to Base64 format instantly. Free online Base64 encoder with Unicode support. Fast, private, and secure - no data leaves your browser.",
    url: "https://sudheertools.github.io/base64-encode",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base64 Encoder - Free Online Tool",
    description: "Encode text to Base64 format instantly. Free online Base64 encoder with Unicode support. Fast, private, and secure - no data leaves your browser.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/base64-encode",
  },
};

export default function Page() {
  return <Base64EncodePage />;
}

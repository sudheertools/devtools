import type { Metadata } from "next";
import Base64DecodePage from "./base64-decode-client";

export const metadata: Metadata = {
  title: "Base64 Decoder - Free Online Tool",
  description: "Decode Base64 encoded text back to readable format instantly. Free online Base64 decoder with Unicode support. Fast, private, and secure.",
  keywords: "base64 decoder online, free base64 decoder, base64 decoder tool, base64 decoder browser, encoding tools, base64 decoder, base64 encode decode",
  openGraph: {
    title: "Base64 Decoder - Free Online Tool",
    description: "Decode Base64 encoded text back to readable format instantly. Free online Base64 decoder with Unicode support. Fast, private, and secure.",
    url: "https://sudheertools.github.io/base64-decode",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base64 Decoder - Free Online Tool",
    description: "Decode Base64 encoded text back to readable format instantly. Free online Base64 decoder with Unicode support. Fast, private, and secure.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/base64-decode",
  },
};

export default function Page() {
  return <Base64DecodePage />;
}

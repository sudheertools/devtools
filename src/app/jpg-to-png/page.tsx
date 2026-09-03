import type { Metadata } from "next";
import JpgToPngPage from "./jpg-to-png-client";

export const metadata: Metadata = {
  title: "JPG to PNG Converter - Free Online Tool",
  description: "Convert JPG images to PNG format with transparency support. Free online JPG to PNG converter.",
  keywords: "jpg to png online, free jpg to png, jpg to png tool, jpg to png browser, image tools",
  openGraph: {
    title: "JPG to PNG Converter - Free Online Tool",
    description: "Convert JPG images to PNG format with transparency support. Free online JPG to PNG converter.",
    url: "https://sudheertools.github.io/jpg-to-png",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JPG to PNG Converter - Free Online Tool",
    description: "Convert JPG images to PNG format with transparency support. Free online JPG to PNG converter.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/jpg-to-png",
  },
};

export default function Page() {
  return <JpgToPngPage />;
}

import type { Metadata } from "next";
import PngToJpgPage from "./png-to-jpg-client";

export const metadata: Metadata = {
  title: "PNG to JPG Converter - Free Online Tool",
  description: "Convert PNG images to JPG format with adjustable quality. Free online PNG to JPG converter.",
  keywords: "png to jpg online, free png to jpg, png to jpg tool, png to jpg browser, image tools",
  openGraph: {
    title: "PNG to JPG Converter - Free Online Tool",
    description: "Convert PNG images to JPG format with adjustable quality. Free online PNG to JPG converter.",
    url: "https://sudheertools.github.io/png-to-jpg",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PNG to JPG Converter - Free Online Tool",
    description: "Convert PNG images to JPG format with adjustable quality. Free online PNG to JPG converter.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/png-to-jpg",
  },
};

export default function Page() {
  return <PngToJpgPage />;
}

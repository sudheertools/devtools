import type { Metadata } from "next";
import ImageResizerPage from "./image-resizer-client";

export const metadata: Metadata = {
  title: "Image Resizer - Free Online Tool",
  description: "Resize images by dimensions with aspect ratio lock. Free online image resizer for JPG, PNG, and WebP.",
  keywords: "image resizer online, free image resizer, image resizer tool, image resizer browser, image tools",
  openGraph: {
    title: "Image Resizer - Free Online Tool",
    description: "Resize images by dimensions with aspect ratio lock. Free online image resizer for JPG, PNG, and WebP.",
    url: "https://sudheertools.github.io/image-resizer",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Resizer - Free Online Tool",
    description: "Resize images by dimensions with aspect ratio lock. Free online image resizer for JPG, PNG, and WebP.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/image-resizer",
  },
};

export default function Page() {
  return <ImageResizerPage />;
}

import type { Metadata } from "next";
import ImageCompressorPage from "./image-compressor-client";

export const metadata: Metadata = {
  title: "Image Compressor - Free Online Tool",
  description: "Compress JPG, PNG, and WebP images online. Free image compressor with quality control and size comparison.",
  keywords: "image compressor online, free image compressor, image compressor tool, image compressor browser, utility tools",
  openGraph: {
    title: "Image Compressor - Free Online Tool",
    description: "Compress JPG, PNG, and WebP images online. Free image compressor with quality control and size comparison.",
    url: "https://sudheertools.github.io/image-compressor",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Compressor - Free Online Tool",
    description: "Compress JPG, PNG, and WebP images online. Free image compressor with quality control and size comparison.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/image-compressor",
  },
};

export default function Page() {
  return <ImageCompressorPage />;
}

import type { Metadata } from "next";
import ImageToBase64Page from "./image-to-base64-client";

export const metadata: Metadata = {
  title: "Image to Base64 Converter - Free Online Tool",
  description: "Convert images to Base64 encoded strings instantly. Free online image to Base64 converter with support for PNG, JPG, GIF, and more. Fast, private, and secure.",
  keywords: "image to base64 online, free image to base64, image to base64 tool, image to base64 browser, encoding tools",
  openGraph: {
    title: "Image to Base64 Converter - Free Online Tool",
    description: "Convert images to Base64 encoded strings instantly. Free online image to Base64 converter with support for PNG, JPG, GIF, and more. Fast, private, and secure.",
    url: "https://sudheertools.github.io/image-to-base64",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image to Base64 Converter - Free Online Tool",
    description: "Convert images to Base64 encoded strings instantly. Free online image to Base64 converter with support for PNG, JPG, GIF, and more. Fast, private, and secure.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/image-to-base64",
  },
};

export default function Page() {
  return <ImageToBase64Page />;
}

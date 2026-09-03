import type { Metadata } from "next";
import Base64ToImagePage from "./base64-to-image-client";

export const metadata: Metadata = {
  title: "Base64 to Image Decoder - Free Online Tool",
  description: "Decode Base64 encoded strings back to images instantly. Free online Base64 to Image decoder with support for PNG, JPG, GIF, and more. Fast, private, and secure.",
  keywords: "base64 to image online, free base64 to image, base64 to image tool, base64 to image browser, encoding tools",
  openGraph: {
    title: "Base64 to Image Decoder - Free Online Tool",
    description: "Decode Base64 encoded strings back to images instantly. Free online Base64 to Image decoder with support for PNG, JPG, GIF, and more. Fast, private, and secure.",
    url: "https://sudheertools.github.io/base64-to-image",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base64 to Image Decoder - Free Online Tool",
    description: "Decode Base64 encoded strings back to images instantly. Free online Base64 to Image decoder with support for PNG, JPG, GIF, and more. Fast, private, and secure.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/base64-to-image",
  },
};

export default function Page() {
  return <Base64ToImagePage />;
}

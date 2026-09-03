import type { Metadata } from "next";
import QRCodeGeneratorPage from "./qr-code-generator-client";

export const metadata: Metadata = {
  title: "QR Code Generator - Free Online Tool",
  description: "Generate QR codes instantly. Free online QR code generator with custom colors and sizes. Download as PNG. Fast, private, and secure.",
  keywords: "qr code generator online, free qr code generator, qr code generator tool, qr code generator browser, generation tools, generate qr code, random qr code",
  openGraph: {
    title: "QR Code Generator - Free Online Tool",
    description: "Generate QR codes instantly. Free online QR code generator with custom colors and sizes. Download as PNG. Fast, private, and secure.",
    url: "https://sudheertools.github.io/qr-code-generator",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code Generator - Free Online Tool",
    description: "Generate QR codes instantly. Free online QR code generator with custom colors and sizes. Download as PNG. Fast, private, and secure.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/qr-code-generator",
  },
};

export default function Page() {
  return <QRCodeGeneratorPage />;
}

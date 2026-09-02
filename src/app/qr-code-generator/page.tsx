"use client";

import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolInfo from "@/components/tools/ToolInfo";
import SEOHead from "@/components/seo/SEOHead";
import { generateQRCode, generateQRCodeCanvas } from "@/lib/tools/qr";

type QRSize = "small" | "medium" | "large";

const sizeMap: Record<QRSize, { width: number; label: string }> = {
  small: { width: 128, label: "Small (128x128)" },
  medium: { width: 256, label: "Medium (256x256)" },
  large: { width: 512, label: "Large (512x512)" },
};

export default function QRCodeGeneratorPage() {
  const [input, setInput] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [size, setSize] = useState<QRSize>("medium");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (input.trim()) {
      handleGenerate();
    }
  }, [size, fgColor, bgColor]);

  async function handleGenerate() {
    setError("");
    setQrImage("");

    if (!input.trim()) {
      setError("Please enter text or URL to generate QR code.");
      return;
    }

    try {
      const dataUrl = await generateQRCode(input, {
        width: sizeMap[size].width,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      });
      setQrImage(dataUrl);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate QR code"
      );
    }
  }

  function handleClear() {
    setInput("");
    setQrImage("");
    setError("");
  }

  async function handleDownload(format: "png" | "svg") {
    if (!qrImage) return;

    if (format === "png") {
      const link = document.createElement("a");
      link.download = "qrcode.png";
      link.href = qrImage;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      try {
        const response = await fetch(qrImage);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "qrcode.svg";
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch {
        setToast({ message: "Failed to download SVG", type: "error" });
      }
    }
  }

  async function handleCopyImage() {
    if (!qrImage) return;
    try {
      const response = await fetch(qrImage);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setToast({ message: "QR code copied to clipboard!", type: "success" });
    } catch {
      setToast({ message: "Failed to copy image", type: "error" });
    }
  }

  const infoSections = [
    {
      title: "What is a QR Code?",
      content:
        "QR (Quick Response) code is a two-dimensional barcode that stores information in a matrix of black and white squares. It can encode text, URLs, contact information, and more. QR codes can be scanned by smartphone cameras and QR reader apps.",
    },
    {
      title: "How to use this tool",
      content:
        "Enter any text or URL in the input field. Customize the size and colors using the options below. Click Generate to create your QR code. You can download it as PNG or copy it directly to your clipboard.",
    },
    {
      title: "Common Use Cases",
      content: (
        <ul className="list-disc space-y-1 pl-5">
          <li>Sharing website URLs</li>
          <li>WiFi password sharing</li>
          <li>Contact information (vCard)</li>
          <li>Product labels and packaging</li>
          <li>Event tickets and passes</li>
          <li>Payment links</li>
        </ul>
      ),
    },
    {
      title: "Frequently Asked Questions",
      content: (
        <div className="space-y-3">
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              Is there a limit to how much text I can encode?
            </p>
            <p>
              QR codes can store up to 4,296 alphanumeric characters. However,
              simpler data results in smaller, easier-to-scan codes.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              What colors should I use?
            </p>
            <p>
              Use dark colors on light backgrounds for best scanning results.
              High contrast between foreground and background is important.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <SEOHead
        title="QR Code Generator - Free Online Tool"
        description="Generate QR codes instantly. Free online QR code generator with custom colors and sizes. Download as PNG. Fast, private, and secure."
        keywords="qr code generator, create qr code, free qr code, online qr code maker, qr code image"
        canonical="https://sudheertools.github.io/qr-code-generator"
      />
      <ToolLayout
        title="QR Code Generator"
        description="Generate QR codes instantly for any text or URL. Customize size, foreground, and background colors. Download as PNG. All processing happens locally in your browser."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "QR Code Generator" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Text or URL
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text or URL to generate QR code..."
                rows={3}
                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              />
              {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Size
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value as QRSize)}
                  className="w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                >
                  {Object.entries(sizeMap).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Foreground
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="h-10 w-10 cursor-pointer rounded border-0"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {fgColor}
                  </span>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Background
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="h-10 w-10 cursor-pointer rounded border-0"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {bgColor}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={handleGenerate}>Generate</Button>
              <Button variant="ghost" onClick={handleClear}>
                Clear
              </Button>
            </div>

            {qrImage && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <img
                    src={qrImage}
                    alt="Generated QR Code"
                    className="rounded-lg border border-gray-200 dark:border-gray-600"
                  />
                </div>
                <canvas ref={canvasRef} className="hidden" />
                <div className="flex flex-wrap justify-center gap-2">
                  <Button onClick={() => handleDownload("png")}>
                    Download PNG
                  </Button>
                  <Button variant="secondary" onClick={handleCopyImage}>
                    Copy Image
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <ToolInfo sections={infoSections} />
        <RelatedTools currentSlug="qr-code-generator" />
      </ToolLayout>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}

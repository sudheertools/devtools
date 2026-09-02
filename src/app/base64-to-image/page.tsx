"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolInfo from "@/components/tools/ToolInfo";
import SEOHead from "@/components/seo/SEOHead";
import { base64ToImage } from "@/lib/tools/base64";
import Link from "next/link";

export default function Base64ToImagePage() {
  const [input, setInput] = useState("");
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleDecode() {
    setError("");
    setPreview("");
    if (!input.trim()) {
      setError("Please enter Base64 encoded image data.");
      return;
    }
    try {
      const blob = base64ToImage(input);
      const url = URL.createObjectURL(blob);
      setPreview(url);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to decode. Invalid Base64 input."
      );
    }
  }

  function handleClear() {
    setInput("");
    setPreview("");
    setError("");
  }

  function handleDownload() {
    if (!preview) return;
    const a = document.createElement("a");
    a.href = preview;
    a.download = "decoded-image.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const infoSections = [
    {
      title: "What is Base64 to Image?",
      content:
        "Base64 to Image conversion decodes a Base64 encoded string back into an image file. This is useful when you have received image data encoded as Base64 in APIs, databases, or configuration files and need to view or save the original image.",
    },
    {
      title: "How to use this tool",
      content:
        "Paste your Base64 encoded image data into the input field. The tool supports both plain Base64 strings and data URI format (e.g., data:image/png;base64,...). Click Decode to preview the image, then download it if needed.",
    },
    {
      title: "Supported Formats",
      content: (
        <ul className="list-disc space-y-1 pl-5">
          <li>PNG images</li>
          <li>JPG/JPEG images</li>
          <li>GIF images</li>
          <li>WebP images</li>
          <li>SVG images</li>
          <li>Data URI format (data:image/...;base64,...)</li>
        </ul>
      ),
    },
    {
      title: "Frequently Asked Questions",
      content: (
        <div className="space-y-3">
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              What format should my input be?
            </p>
            <p>
              You can enter either a plain Base64 string or a complete data URI
              (e.g., data:image/png;base64,iVBORw0KGgo...). The tool
              automatically detects the format.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              Is my data safe?
            </p>
            <p>
              Absolutely. All decoding happens locally in your browser. No data
              is transmitted to any server.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              Why is my image not showing?
            </p>
            <p>
              Make sure your Base64 string is valid and not corrupted. If using
              a data URI, ensure it starts with data:image/.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <SEOHead
        title="Base64 to Image Decoder - Free Online Tool"
        description="Decode Base64 encoded strings back to images instantly. Free online Base64 to Image decoder with support for PNG, JPG, GIF, and more. Fast, private, and secure."
        keywords="base64 to image, decode base64 image, base64 decoder image, online base64 to image, free base64 tool"
        canonical="https://sudheertools.github.io/base64-to-image"
      />
      <ToolLayout
        title="Base64 to Image Decoder"
        description="Decode Base64 encoded strings back to images instantly. Our free online tool supports PNG, JPG, GIF, WebP, and data URI format. All processing happens locally in your browser - your data never leaves your device."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Base64 to Image" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="space-y-4">
            <TextArea
              label="Input (Base64 encoded image)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste Base64 encoded image data here... (e.g., data:image/png;base64,iVBORw0KGgo... or plain Base64 string)"
              error={error}
            />

            <div className="flex flex-wrap gap-2">
              <Button onClick={handleDecode}>Decode</Button>
              <Button
                variant="secondary"
                onClick={handleDownload}
                disabled={!preview}
              >
                Download Image
              </Button>
              <Button variant="ghost" onClick={handleClear}>
                Clear
              </Button>
            </div>

            {preview && (
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Preview
                </label>
                <div className="flex justify-center rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
                  <img
                    src={preview}
                    alt="Decoded image"
                    className="max-h-64 rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
          Need to encode an image to Base64?{" "}
          <Link
            href="/image-to-base64"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Try the Image to Base64 Encoder →
          </Link>
        </div>

        <ToolInfo sections={infoSections} />
        <RelatedTools currentSlug="base64-to-image" />
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

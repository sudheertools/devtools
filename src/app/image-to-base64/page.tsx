"use client";

import { useState, useRef } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolInfo from "@/components/tools/ToolInfo";
import SEOHead from "@/components/seo/SEOHead";
import { imageToBase64, formatFileSize } from "@/lib/tools/base64";
import { copyToClipboard } from "@/lib/utils";

export default function ImageToBase64Page() {
  const [output, setOutput] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setOutput("");
    setPreview("");
    setLoading(true);

    try {
      if (!file.type.startsWith("image/")) {
        throw new Error("Please select an image file (PNG, JPG, GIF, etc.)");
      }

      if (file.size > 10 * 1024 * 1024) {
        throw new Error("File size must be less than 10MB");
      }

      setFileName(file.name);
      setFileSize(formatFileSize(file.size));

      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);

      const base64 = await imageToBase64(file);
      setOutput(base64);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to convert image");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setOutput("");
    setFileName("");
    setFileSize("");
    setPreview("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleCopy() {
    if (!output) return;
    try {
      await copyToClipboard(output);
      setToast({ message: "Copied to clipboard!", type: "success" });
    } catch {
      setToast({ message: "Failed to copy", type: "error" });
    }
  }

  function handleDownload() {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName || "image"}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const infoSections = [
    {
      title: "What is Image to Base64?",
      content:
        "Image to Base64 conversion transforms an image file into a Base64 encoded string. This encoding allows images to be embedded directly in HTML, CSS, JSON, and other text-based formats without needing a separate file reference.",
    },
    {
      title: "How to use this tool",
      content:
        "Click the upload area or drag and drop an image file. The tool will instantly convert it to a Base64 string. You can then copy the string or download it as a text file. Supported formats include PNG, JPG, GIF, SVG, and WebP.",
    },
    {
      title: "Common Use Cases",
      content: (
        <ul className="list-disc space-y-1 pl-5">
          <li>Embedding images directly in HTML or CSS</li>
          <li>Sending images in JSON payloads</li>
          <li>Storing images in databases as text</li>
          <li>Creating data URIs for web development</li>
          <li>Sharing images via text-based channels</li>
        </ul>
      ),
    },
    {
      title: "Frequently Asked Questions",
      content: (
        <div className="space-y-3">
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              Is my image uploaded to a server?
            </p>
            <p>
              No. All conversion happens locally in your browser using the
              FileReader API. Your image never leaves your device.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              What image formats are supported?
            </p>
            <p>
              All common image formats: PNG, JPG/JPEG, GIF, SVG, WebP, BMP, and
              ICO.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              Is there a file size limit?
            </p>
            <p>
              The tool supports images up to 10MB. Larger files may be slow to
              process depending on your device.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <SEOHead
        title="Image to Base64 Converter - Free Online Tool"
        description="Convert images to Base64 encoded strings instantly. Free online image to Base64 converter with support for PNG, JPG, GIF, and more. Fast, private, and secure."
        keywords="image to base64, convert image to base64, image encoder, base64 image, online image converter"
        canonical="https://sudheertools.github.io/image-to-base64"
      />
      <ToolLayout
        title="Image to Base64 Converter"
        description="Convert any image to a Base64 encoded string instantly. Our free online tool supports PNG, JPG, GIF, SVG, and more. All processing happens locally in your browser - your images never leave your device."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Image to Base64" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="space-y-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 transition-colors hover:border-blue-400 hover:bg-blue-50 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-blue-500 dark:hover:bg-gray-600"
            >
              <svg
                className="mb-4 h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG, GIF, SVG, WebP (MAX. 10MB)
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}

            {fileName && (
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                <svg
                  className="h-8 w-8 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {fileName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {fileSize}
                  </p>
                </div>
                <button
                  onClick={handleClear}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}

            {preview && (
              <div className="flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-48 rounded-lg border border-gray-200 dark:border-gray-600"
                />
              </div>
            )}

            {output && (
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Base64 Output
                </label>
                <textarea
                  value={output}
                  readOnly
                  rows={6}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                />
                <div className="flex flex-wrap gap-2">
                  <Button onClick={handleCopy}>Copy to Clipboard</Button>
                  <Button variant="secondary" onClick={handleDownload}>
                    Download as TXT
                  </Button>
                  <Button variant="ghost" onClick={handleClear}>
                    Clear
                  </Button>
                </div>
              </div>
            )}

            {loading && (
              <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
                <svg
                  className="h-5 w-5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Converting...
              </div>
            )}
          </div>
        </div>

        <ToolInfo sections={infoSections} />
        <RelatedTools currentSlug="image-to-base64" />
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

"use client";

import { useState, useRef } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolInfo from "@/components/tools/ToolInfo";
import {
  compressImage,
  createDownloadUrl,
  formatBytes,
  type CompressResult,
} from "@/lib/tools/image-compress";

export default function ImageCompressorPage() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [result, setResult] = useState<CompressResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string>("");
  const [compressedPreview, setCompressedPreview] = useState<string>("");
  const [quality, setQuality] = useState(80);
  const [maxWidth, setMaxWidth] = useState(1920);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setToast({ message: "Please select an image file", type: "error" });
      return;
    }

    setOriginalFile(file);
    setResult(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  async function handleCompress() {
    if (!originalFile) return;

    setLoading(true);
    try {
      const compressed = await compressImage(originalFile, {
        initialQuality: quality / 100,
        maxWidthOrHeight: maxWidth,
      });

      setResult(compressed);
      setCompressedPreview(createDownloadUrl(compressed.blob));
    } catch (err) {
      setToast({ message: (err as Error).message, type: "error" });
    } finally {
      setLoading(false);
    }
  }

  function handleDownload() {
    if (!result) return;
    const url = createDownloadUrl(result.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `compressed-${originalFile?.name || "image"}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function handleClear() {
    setOriginalFile(null);
    setResult(null);
    setPreview("");
    setCompressedPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const compressionRatio = originalFile && result
    ? Math.round((1 - result.size / originalFile.size) * 100)
    : 0;

  const infoSections = [
    {
      title: "What is Image Compressor?",
      content:
        "Image Compressor is a free online tool that reduces image file sizes while maintaining quality. It supports JPG, PNG, and WebP formats and shows before/after size comparison.",
    },
    {
      title: "How to Use?",
      content:
        "Click 'Choose File' or drag an image into the upload area. Adjust the quality and max dimensions, then click 'Compress' to reduce the file size.",
    },
    {
      title: "Features",
      content:
        "• Compress JPG, PNG, and WebP images\n• Adjustable quality settings\n• Custom max dimensions\n• Before/after size comparison\n• Download compressed image",
    },
  ];

  return (
    <>
      <ToolLayout
        title="Image Compressor"
        description="Compress JPG, PNG, and WebP images to reduce file size while maintaining quality. Adjustable settings and instant preview."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Image Compressor" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Quality: {quality}%
              </label>
              <input
                type="range"
                min={10}
                max={100}
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Max Width/Height: {maxWidth}px
              </label>
              <input
                type="range"
                min={100}
                max={4000}
                step={100}
                value={maxWidth}
                onChange={(e) => setMaxWidth(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div className="mb-6">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100 dark:text-gray-400 dark:file:bg-blue-900/50 dark:file:text-blue-300"
            />
          </div>

          {preview && (
            <div className="mb-6 grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Original ({originalFile ? formatBytes(originalFile.size) : ""})
                </h3>
                <img
                  src={preview}
                  alt="Original"
                  className="max-h-64 w-full rounded-lg border border-gray-200 object-contain dark:border-gray-700"
                />
              </div>
              {compressedPreview && (
                <div>
                  <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Compressed ({result?.sizeFormatted})
                  </h3>
                  <img
                    src={compressedPreview}
                    alt="Compressed"
                    className="max-h-64 w-full rounded-lg border border-gray-200 object-contain dark:border-gray-700"
                  />
                </div>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleCompress} disabled={!originalFile || loading}>
              {loading ? "Compressing..." : "Compress"}
            </Button>
            <Button variant="secondary" onClick={handleDownload} disabled={!result}>
              Download
            </Button>
            <Button variant="ghost" onClick={handleClear}>
              Clear
            </Button>
          </div>

          {result && originalFile && (
            <div className="mt-4 rounded-lg bg-green-100 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-300">
              <div className="flex items-center gap-4">
                <span>Original: {formatBytes(originalFile.size)}</span>
                <span>Compressed: {result.sizeFormatted}</span>
                <span className="font-medium">Saved: {compressionRatio}%</span>
              </div>
            </div>
          )}
        </div>

        <ToolInfo sections={infoSections} />
        <RelatedTools currentSlug="image-compressor" />
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

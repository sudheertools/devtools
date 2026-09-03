"use client";

import { useState, useRef } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { resizeImage, formatBytes } from "@/lib/tools/image-resize";

export default function ImageResizerPage() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [resultPreview, setResultPreview] = useState<string>("");
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [loading, setLoading] = useState(false);
  const [resultInfo, setResultInfo] = useState<{ width: number; height: number; sizeFormatted: string } | null>(null);
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
    setResultInfo(null);
    setResultPreview("");

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = event.target?.result as string;
      setPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  async function handleResize() {
    if (!originalFile) return;

    setLoading(true);
    try {
      const result = await resizeImage(originalFile, width, height, maintainAspect);
      setResultPreview(URL.createObjectURL(result.blob));
      setResultInfo({
        width: result.width,
        height: result.height,
        sizeFormatted: result.sizeFormatted,
      });
      setToast({ message: "Image resized successfully!", type: "success" });
    } catch (err) {
      setToast({ message: (err as Error).message, type: "error" });
    } finally {
      setLoading(false);
    }
  }

  function handleDownload() {
    if (!resultPreview) return;
    const a = document.createElement("a");
    a.href = resultPreview;
    a.download = `resized-${originalFile?.name || "image"}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function handleClear() {
    setOriginalFile(null);
    setPreview("");
    setResultPreview("");
    setResultInfo(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <>
      <ToolLayout
        title="Image Resizer"
        description="Resize images by custom dimensions with optional aspect ratio lock. Supports JPG, PNG, and WebP formats."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Image Resizer" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-6">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100 dark:text-gray-400 dark:file:bg-blue-900/50 dark:file:text-blue-300"
            />
          </div>

          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Width (px)
              </label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(parseInt(e.target.value) || 0)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 font-mono text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Height (px)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 font-mono text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={maintainAspect}
                onChange={(e) => setMaintainAspect(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              Maintain aspect ratio
            </label>
          </div>

          {preview && (
            <div className="mb-6 grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Original ({originalFile ? `${width}×${height}` : ""} - {originalFile ? formatBytes(originalFile.size) : ""})
                </h3>
                <img
                  src={preview}
                  alt="Original"
                  className="max-h-64 w-full rounded-lg border border-gray-200 object-contain dark:border-gray-700"
                />
              </div>
              {resultPreview && (
                <div>
                  <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Resized ({resultInfo?.width}×{resultInfo?.height} - {resultInfo?.sizeFormatted})
                  </h3>
                  <img
                    src={resultPreview}
                    alt="Resized"
                    className="max-h-64 w-full rounded-lg border border-gray-200 object-contain dark:border-gray-700"
                  />
                </div>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleResize} disabled={!originalFile || loading}>
              {loading ? "Resizing..." : "Resize"}
            </Button>
            <Button variant="secondary" onClick={handleDownload} disabled={!resultPreview}>
              Download
            </Button>
            <Button variant="ghost" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>

        <RelatedTools currentSlug="image-resizer" />
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

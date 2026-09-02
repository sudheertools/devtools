"use client";

import { useState, useRef } from "react";
import SEOHead from "@/components/seo/SEOHead";
import ToolLayout from "@/components/layout/ToolLayout";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { convertPngToJpg, formatBytes } from "@/lib/tools/png-to-jpg";

export default function PngToJpgPage() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [resultPreview, setResultPreview] = useState<string>("");
  const [quality, setQuality] = useState(92);
  const [loading, setLoading] = useState(false);
  const [resultSize, setResultSize] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes("png")) {
      setToast({ message: "Please select a PNG image", type: "error" });
      return;
    }

    setOriginalFile(file);
    setResultPreview("");
    setResultSize("");

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  async function handleConvert() {
    if (!originalFile) return;

    setLoading(true);
    try {
      const result = await convertPngToJpg(originalFile, quality / 100);
      setResultPreview(URL.createObjectURL(result.blob));
      setResultSize(result.sizeFormatted);
      setToast({ message: "Converted successfully!", type: "success" });
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
    a.download = (originalFile?.name || "image").replace(/\.png$/i, ".jpg");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function handleClear() {
    setOriginalFile(null);
    setPreview("");
    setResultPreview("");
    setResultSize("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <>
      <SEOHead
        title="PNG to JPG Converter - Free Online Tool"
        description="Convert PNG images to JPG format with adjustable quality. Free online PNG to JPG converter."
        keywords="png to jpg, convert png to jpg, png converter, image converter, png to jpeg"
        canonical="https://sudheertools.github.io/png-to-jpg"
      />
      <ToolLayout
        title="PNG to JPG Converter"
        description="Convert PNG images to JPG format with adjustable quality settings. Instant conversion with download support."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "PNG to JPG" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-6">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100 dark:text-gray-400 dark:file:bg-blue-900/50 dark:file:text-blue-300"
            />
          </div>

          <div className="mb-6">
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

          {preview && (
            <div className="mb-6 grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Original PNG ({originalFile ? formatBytes(originalFile.size) : ""})
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
                    Converted JPG ({resultSize})
                  </h3>
                  <img
                    src={resultPreview}
                    alt="Converted"
                    className="max-h-64 w-full rounded-lg border border-gray-200 object-contain dark:border-gray-700"
                  />
                </div>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleConvert} disabled={!originalFile || loading}>
              {loading ? "Converting..." : "Convert to JPG"}
            </Button>
            <Button variant="secondary" onClick={handleDownload} disabled={!resultPreview}>
              Download
            </Button>
            <Button variant="ghost" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>

        <RelatedTools currentSlug="png-to-jpg" />
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

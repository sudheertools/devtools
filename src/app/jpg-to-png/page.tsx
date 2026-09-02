"use client";

import { useState, useRef } from "react";
import SEOHead from "@/components/seo/SEOHead";
import ToolLayout from "@/components/layout/ToolLayout";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { convertJpgToPng, formatBytes } from "@/lib/tools/jpg-to-png";

export default function JpgToPngPage() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [resultPreview, setResultPreview] = useState<string>("");
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

    if (!file.type.includes("jpeg") && !file.type.includes("jpg")) {
      setToast({ message: "Please select a JPG image", type: "error" });
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
      const result = await convertJpgToPng(originalFile);
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
    a.download = (originalFile?.name || "image").replace(/\.jpe?g$/i, ".png");
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
        title="JPG to PNG Converter - Free Online Tool"
        description="Convert JPG images to PNG format with transparency support. Free online JPG to PNG converter."
        keywords="jpg to png, convert jpg to png, jpeg converter, image converter, jpg to png online"
        canonical="https://sudheertools.github.io/jpg-to-png"
      />
      <ToolLayout
        title="JPG to PNG Converter"
        description="Convert JPG images to PNG format with lossless quality. Instant conversion with download support."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "JPG to PNG" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-6">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100 dark:text-gray-400 dark:file:bg-blue-900/50 dark:file:text-blue-300"
            />
          </div>

          {preview && (
            <div className="mb-6 grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Original JPG ({originalFile ? formatBytes(originalFile.size) : ""})
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
                    Converted PNG ({resultSize})
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
              {loading ? "Converting..." : "Convert to PNG"}
            </Button>
            <Button variant="secondary" onClick={handleDownload} disabled={!resultPreview}>
              Download
            </Button>
            <Button variant="ghost" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>

        <RelatedTools currentSlug="jpg-to-png" />
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

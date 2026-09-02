"use client";

import { useState } from "react";
import SEOHead from "@/components/seo/SEOHead";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { decodeURL } from "@/lib/tools/url";
import { copyToClipboard } from "@/lib/utils";

export default function URLDecodePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleDecode() {
    setError("");
    if (!input.trim()) {
      setError("Please enter URL-encoded text to decode.");
      return;
    }
    try {
      const result = decodeURL(input);
      setOutput(result);
    } catch {
      setError("Failed to decode. Invalid URL-encoded text.");
    }
  }

  function handleClear() {
    setInput("");
    setOutput("");
    setError("");
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

  return (
    <>
      <SEOHead
        title="URL Decoder - Free Online Tool"
        description="Decode URL-encoded strings back to readable text instantly. Free online URL decoder for percent-encoded URLs, form data, and query parameters. Fast, private, and secure."
        keywords="url decoder, url decode, percent decode, url encoded string, decode url online"
        canonical="https://sudheertools.github.io/url-decode"
      />
      <ToolLayout
        title="URL Decoder"
        description="Decode URL-encoded (percent-encoded) strings back to their original readable format. Supports standard percent encoding used in web URLs and form submissions."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "URL Decoder" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="grid gap-6 lg:grid-cols-2">
            <TextArea
              label="Input (URL Encoded)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter URL-encoded text to decode..."
              error={error}
            />
            <div className="flex flex-col">
              <TextArea
                label="Output (Decoded)"
                value={output}
                readOnly
                placeholder="Decoded output will appear here..."
                className="flex-1"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <Button onClick={handleDecode}>Decode</Button>
                <Button variant="secondary" onClick={handleCopy} disabled={!output}>
                  Copy Output
                </Button>
                <Button variant="ghost" onClick={handleClear}>
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </div>

        <RelatedTools currentSlug="url-decode" />
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

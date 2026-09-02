"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolInfo from "@/components/tools/ToolInfo";
import SEOHead from "@/components/seo/SEOHead";
import { encodeURL } from "@/lib/tools/url";
import { copyToClipboard } from "@/lib/utils";

export default function URLEncodePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleEncode() {
    setError("");
    if (!input.trim()) {
      setError("Please enter some text to encode.");
      return;
    }
    try {
      const result = encodeURL(input);
      setOutput(result);
    } catch {
      setError("An error occurred while encoding.");
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
        title="URL Encoder - Free Online Tool"
        description="Encode text for safe use in URLs and query parameters instantly. Free online URL encoder with support for special characters. Fast and secure."
        keywords="url encoder, encode url, url encode online, percent encoding, free url tool"
        canonical="https://sudheertools.github.io/url-encode"
      />
      <ToolLayout
        title="URL Encoder"
        description="Encode text for safe use in URLs and query parameters instantly. Our free online URL encoder converts special characters to percent-encoded format. All processing happens locally in your browser."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "URL Encoder" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="grid gap-6 lg:grid-cols-2">
            <TextArea
              label="Input (plain text)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to encode..."
              error={error}
            />
            <div className="flex flex-col">
              <TextArea
                label="Output (URL Encoded)"
                value={output}
                readOnly
                placeholder="Encoded output will appear here..."
                className="flex-1"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <Button onClick={handleEncode}>Encode</Button>
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

        <ToolInfo sections={[
          {
            title: "What is URL Encoding?",
            content: "URL encoding (percent-encoding) converts characters into a format that can be transmitted over the Internet. URLs can only contain ASCII characters, so non-ASCII characters and special characters must be encoded."
          },
          {
            title: "Common Use Cases",
            content: "Encoding query parameters, form data, and any text that needs to be safely included in a URL."
          }
        ]} />
        <RelatedTools currentSlug="url-encode" />
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

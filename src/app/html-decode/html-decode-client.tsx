"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { copyToClipboard } from "@/lib/utils";

export default function HTMLDecodePage() {
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
      setError("Please enter HTML-encoded text to decode.");
      return;
    }
    try {
      const textarea = document.createElement("textarea");
      textarea.innerHTML = input;
      setOutput(textarea.value);
    } catch {
      setError("Failed to decode HTML entities.");
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
      <ToolLayout
        title="HTML Decoder"
        description="Decode HTML entities and character references back to their original readable text. Supports named entities (&amp;lt;), numeric references (&#60;), and escaped characters."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "HTML Decoder" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="grid gap-6 lg:grid-cols-2">
            <TextArea
              label="Input (HTML Encoded)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter HTML-encoded text..."
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

        <RelatedTools currentSlug="html-decode" />
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

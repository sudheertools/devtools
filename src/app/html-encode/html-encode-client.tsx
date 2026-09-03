"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { copyToClipboard } from "@/lib/utils";

export default function HTMLEncodePage() {
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
      setError("Please enter text to encode.");
      return;
    }
    try {
      const textarea = document.createElement("textarea");
      textarea.textContent = input;
      setOutput(textarea.innerHTML);
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
      <ToolLayout
        title="HTML Encoder"
        description="Encode special characters to their corresponding HTML entities for safe use in HTML documents. Converts characters like <, >, &, and quotes to their entity equivalents."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "HTML Encoder" },
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
                label="Output (HTML Encoded)"
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

        <RelatedTools currentSlug="html-encode" />
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

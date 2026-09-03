"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { beautifyCSS } from "@/lib/tools/css-beautifier";
import { copyToClipboard } from "@/lib/utils";

export default function CSSBeautifierPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleBeautify() {
    setError("");
    if (!input.trim()) {
      setError("Please enter CSS to beautify.");
      return;
    }
    try {
      const result = beautifyCSS(input);
      setOutput(result);
    } catch (err) {
      setError((err as Error).message);
      setOutput("");
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
        title="CSS Beautifier"
        description="Format and beautify CSS code with proper indentation and line breaks for better readability."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "CSS Beautifier" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="grid gap-6 lg:grid-cols-2">
            <TextArea
              label="Input CSS"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder=".container { margin: 0; padding: 20px; }"
              error={error}
            />
            <TextArea
              label="Beautified Output"
              value={output}
              readOnly
              placeholder="Formatted CSS will appear here..."
            />
          </div>

          <div className="mt-4 flex gap-2">
            <Button onClick={handleBeautify}>Beautify</Button>
            <Button variant="secondary" onClick={handleCopy} disabled={!output}>
              Copy
            </Button>
            <Button variant="ghost" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>

        <RelatedTools currentSlug="css-beautifier" />
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

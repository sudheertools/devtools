"use client";

import { useState } from "react";
import SEOHead from "@/components/seo/SEOHead";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { removeDuplicateLines } from "@/lib/tools/remove-duplicates";
import { copyToClipboard } from "@/lib/utils";

export default function RemoveDuplicatesPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [resultInfo, setResultInfo] = useState<{ removedCount: number; totalLines: number } | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleRemove() {
    if (!input.trim()) {
      setToast({ message: "Please enter text to process.", type: "error" });
      return;
    }
    const res = removeDuplicateLines(input, caseSensitive);
    setOutput(res.result);
    setResultInfo({ removedCount: res.removedCount, totalLines: res.totalLines });
    if (res.removedCount === 0) {
      setToast({ message: "No duplicate lines found.", type: "success" });
    } else {
      setToast({ message: `Removed ${res.removedCount} duplicate line(s).`, type: "success" });
    }
  }

  function handleClear() {
    setInput("");
    setOutput("");
    setResultInfo(null);
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
        title="Remove Duplicate Lines - Free Online Tool"
        description="Remove duplicate lines from text. Keep first occurrence and remove repeated lines instantly."
        keywords="remove duplicates, remove duplicate lines, delete duplicates, deduplicate text"
        canonical="https://sudheertools.github.io/remove-duplicates"
      />
      <ToolLayout
        title="Remove Duplicate Lines"
        description="Remove duplicate lines from any text while keeping the first occurrence. Case-sensitive or case-insensitive matching options."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Remove Duplicate Lines" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              Case sensitive
            </label>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <TextArea
              label="Input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text with duplicate lines..."
            />
            <TextArea
              label="Output"
              value={output}
              readOnly
              placeholder="Deduplicated text will appear here..."
            />
          </div>

          <div className="mt-4 flex gap-2">
            <Button onClick={handleRemove}>Remove Duplicates</Button>
            <Button variant="secondary" onClick={handleCopy} disabled={!output}>
              Copy
            </Button>
            <Button variant="ghost" onClick={handleClear}>
              Clear
            </Button>
          </div>

          {resultInfo && (
            <div className="mt-4 rounded-lg bg-blue-100 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              Total lines: {resultInfo.totalLines} • Removed: {resultInfo.removedCount} • Remaining: {resultInfo.totalLines - resultInfo.removedCount}
            </div>
          )}
        </div>

        <RelatedTools currentSlug="remove-duplicates" />
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

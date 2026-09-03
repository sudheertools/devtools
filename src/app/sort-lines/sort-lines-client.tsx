"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { sortLines, type SortMode } from "@/lib/tools/sort-lines";
import { copyToClipboard } from "@/lib/utils";

export default function SortLinesPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<SortMode>("alpha-asc");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleSort() {
    if (!input.trim()) {
      setToast({ message: "Please enter text to sort.", type: "error" });
      return;
    }
    setOutput(sortLines(input, mode));
  }

  function handleClear() {
    setInput("");
    setOutput("");
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
        title="Sort Lines"
        description="Sort text lines alphabetically or numerically with ascending, descending, or reverse order options."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Sort Lines" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex flex-wrap gap-2">
            {([
              { value: "alpha-asc", label: "A → Z" },
              { value: "alpha-desc", label: "Z → A" },
              { value: "numeric-asc", label: "0 → 9" },
              { value: "numeric-desc", label: "9 → 0" },
            ] as { value: SortMode; label: string }[]).map((opt) => (
              <button
                key={opt.value}
                onClick={() => setMode(opt.value)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  mode === opt.value
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <TextArea
              label="Input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter lines to sort..."
            />
            <TextArea
              label="Output"
              value={output}
              readOnly
              placeholder="Sorted lines will appear here..."
            />
          </div>

          <div className="mt-4 flex gap-2">
            <Button onClick={handleSort}>Sort</Button>
            <Button variant="secondary" onClick={handleCopy} disabled={!output}>
              Copy
            </Button>
            <Button variant="ghost" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>

        <RelatedTools currentSlug="sort-lines" />
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

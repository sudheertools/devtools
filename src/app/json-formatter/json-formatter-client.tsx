"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { formatJSON, minifyJSON, validateJSON } from "@/lib/tools/json";
import { copyToClipboard } from "@/lib/utils";

export default function JSONFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState("");
  const [validation, setValidation] = useState<{
    valid: boolean;
    error?: string;
    lines?: number;
    keys?: number;
  } | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleFormat() {
    setError("");
    try {
      const result = formatJSON(input, indent);
      setOutput(result);
      setValidation(validateJSON(input));
    } catch (err) {
      setError((err as Error).message);
      setOutput("");
    }
  }

  function handleMinify() {
    setError("");
    try {
      const result = minifyJSON(input);
      setOutput(result);
      setValidation(validateJSON(input));
    } catch (err) {
      setError((err as Error).message);
      setOutput("");
    }
  }

  function handleValidate() {
    const result = validateJSON(input);
    setValidation(result);
    if (result.valid) {
      setToast({ message: "JSON is valid!", type: "success" });
    } else {
      setToast({ message: result.error || "Invalid JSON", type: "error" });
    }
  }

  function handleClear() {
    setInput("");
    setOutput("");
    setError("");
    setValidation(null);
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
        title="JSON Formatter"
        description="Format, validate, minify, and beautify JSON data with syntax highlighting. Supports customizable indentation and real-time validation with error reporting."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "JSON Formatter" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Indent:
              </label>
              <select
                value={indent}
                onChange={(e) => setIndent(parseInt(e.target.value))}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
                <option value={8}>8 spaces</option>
                <option value={1}>Tab</option>
              </select>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <TextArea
              label="Input JSON"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"key": "value", "number": 42}'
              error={error}
            />
            <div className="flex flex-col">
              <TextArea
                label="Output"
                value={output}
                readOnly
                placeholder="Formatted output will appear here..."
                className="flex-1"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <Button onClick={handleFormat}>Format</Button>
                <Button onClick={handleMinify}>Minify</Button>
                <Button onClick={handleValidate}>Validate</Button>
                <Button variant="secondary" onClick={handleCopy} disabled={!output}>
                  Copy
                </Button>
                <Button variant="ghost" onClick={handleClear}>
                  Clear
                </Button>
              </div>
            </div>
          </div>

          {validation && (
            <div className={`mt-4 rounded-lg p-3 text-sm ${
              validation.valid
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
            }`}>
              {validation.valid ? (
                <div className="flex items-center gap-4">
                  <span>✓ Valid JSON</span>
                  {validation.lines && <span>Lines: {validation.lines}</span>}
                  {validation.keys !== undefined && <span>Keys: {validation.keys}</span>}
                </div>
              ) : (
                <span>✗ {validation.error}</span>
              )}
            </div>
          )}
        </div>

        <RelatedTools currentSlug="json-formatter" />
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

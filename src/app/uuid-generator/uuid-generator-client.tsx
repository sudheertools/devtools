"use client";

import { useState, useCallback } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { generateUUID, generateMultipleUUIDs, validateUUID } from "@/lib/tools/uuid";
import { copyToClipboard } from "@/lib/utils";

export default function UUIDGeneratorPage() {
  const [count, setCount] = useState(1);
  const [uuids, setUUIDs] = useState<string[]>([]);
  const [validateInput, setValidateInput] = useState("");
  const [validateResult, setValidateResult] = useState<boolean | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleGenerate = useCallback(() => {
    try {
      const newUUIDs = generateMultipleUUIDs(count);
      setUUIDs(newUUIDs);
    } catch {
      setToast({ message: "Failed to generate UUIDs", type: "error" });
    }
  }, [count]);

  const handleValidate = useCallback(() => {
    if (!validateInput.trim()) {
      setValidateResult(null);
      return;
    }
    setValidateResult(validateUUID(validateInput));
  }, [validateInput]);

  async function handleCopyAll() {
    try {
      await copyToClipboard(uuids.join("\n"));
      setToast({ message: "All UUIDs copied to clipboard!", type: "success" });
    } catch {
      setToast({ message: "Failed to copy", type: "error" });
    }
  }

  async function handleCopySingle(uuid: string) {
    try {
      await copyToClipboard(uuid);
      setToast({ message: "UUID copied!", type: "success" });
    } catch {
      setToast({ message: "Failed to copy", type: "error" });
    }
  }

  return (
    <>
      <ToolLayout
        title="UUID Generator"
        description="Generate random UUID v4 (Universally Unique Identifier) strings for use in databases, APIs, and applications. Includes built-in UUID validation."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "UUID Generator" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Count:
              </label>
              <input
                type="number"
                min={1}
                max={100}
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <Button onClick={handleGenerate}>Generate UUIDs</Button>
            {uuids.length > 0 && (
              <Button variant="secondary" onClick={handleCopyAll}>
                Copy All
              </Button>
            )}
          </div>

          {uuids.length > 0 && (
            <div className="space-y-2">
              {uuids.map((uuid, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2 font-mono text-sm dark:bg-gray-700"
                >
                  <span className="text-gray-900 dark:text-white">{uuid}</span>
                  <button
                    onClick={() => handleCopySingle(uuid)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          )}

          {uuids.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400">
              Click "Generate UUIDs" to create random UUID v4 identifiers.
            </div>
          )}
        </div>

        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            UUID Validator
          </h3>
          <div className="flex gap-4">
            <input
              type="text"
              value={validateInput}
              onChange={(e) => setValidateInput(e.target.value)}
              placeholder="Enter UUID to validate..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-mono text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <Button onClick={handleValidate}>Validate</Button>
          </div>
          {validateResult !== null && (
            <div className={`mt-4 rounded-lg p-3 text-sm ${validateResult ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"}`}>
              {validateResult ? "✓ Valid UUID v4" : "✗ Invalid UUID"}
            </div>
          )}
        </div>

        <RelatedTools currentSlug="uuid-generator" />
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

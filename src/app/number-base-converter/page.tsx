"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { convertNumberBase, getBaseName } from "@/lib/tools/number-base";
import { copyToClipboard } from "@/lib/utils";

export default function NumberBaseConverterPage() {
  const [input, setInput] = useState("");
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(16);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleConvert() {
    setError("");
    if (!input.trim()) {
      setError("Please enter a number to convert.");
      return;
    }
    try {
      const result = convertNumberBase(input, fromBase, toBase);
      setOutput(result);
    } catch (err) {
      setError((err as Error).message);
      setOutput("");
    }
  }

  function handleSwap() {
    setFromBase(toBase);
    setToBase(fromBase);
    if (output) {
      setInput(output);
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

  const bases = [2, 8, 10, 16];

  return (
    <>
      <ToolLayout
        title="Number Base Converter"
        description="Convert between Binary, Octal, Decimal, and Hexadecimal."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Number Base Converter" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Input Number
                </label>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter number..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 font-mono text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                {error && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  From Base
                </label>
                <div className="flex gap-2">
                  {bases.map((base) => (
                    <button
                      key={base}
                      onClick={() => setFromBase(base)}
                      className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                        fromBase === base
                          ? "border-blue-500 bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      }`}
                    >
                      {getBaseName(base)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Output
                </label>
                <div className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 font-mono text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white min-h-[40px]">
                  {output || "Result will appear here..."}
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  To Base
                </label>
                <div className="flex gap-2">
                  {bases.map((base) => (
                    <button
                      key={base}
                      onClick={() => setToBase(base)}
                      className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                        toBase === base
                          ? "border-blue-500 bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      }`}
                    >
                      {getBaseName(base)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={handleConvert}>Convert</Button>
            <Button variant="secondary" onClick={handleSwap}>
              Swap
            </Button>
            <Button variant="secondary" onClick={handleCopy} disabled={!output}>
              Copy
            </Button>
            <Button variant="ghost" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>

        <RelatedTools currentSlug="number-base-converter" />
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

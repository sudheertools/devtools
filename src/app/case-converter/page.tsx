"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { convertCase } from "@/lib/tools/case";
import { copyToClipboard } from "@/lib/utils";

type CaseType = "upper" | "lower" | "title" | "sentence" | "camel" | "pascal" | "snake" | "kebab" | "constant" | "dot" | "path" | "header";

const caseLabels: Record<CaseType, string> = {
  upper: "UPPER CASE",
  lower: "lower case",
  title: "Title Case",
  sentence: "Sentence case",
  camel: "camelCase",
  pascal: "PascalCase",
  snake: "snake_case",
  kebab: "kebab-case",
  constant: "CONSTANT_CASE",
  dot: "dot.case",
  path: "path/case",
  header: "Header-Case",
};

export default function CaseConverterPage() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Record<CaseType, string> | null>(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleConvert() {
    setError("");
    if (!input.trim()) {
      setError("Please enter text to convert.");
      return;
    }
    try {
      const newResults: Record<CaseType, string> = {} as Record<CaseType, string>;
      for (const caseType of Object.keys(caseLabels) as CaseType[]) {
        newResults[caseType] = convertCase(input, caseType);
      }
      setResults(newResults);
    } catch (err) {
      setError((err as Error).message);
      setResults(null);
    }
  }

  function handleClear() {
    setInput("");
    setResults(null);
    setError("");
  }

  async function handleCopy(value: string) {
    try {
      await copyToClipboard(value);
      setToast({ message: "Copied to clipboard!", type: "success" });
    } catch {
      setToast({ message: "Failed to copy", type: "error" });
    }
  }

  return (
    <>
      <ToolLayout
        title="Case Converter"
        description="Convert text between camelCase, snake_case, kebab-case, and more."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Case Converter" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <TextArea
            label="Input Text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to convert (e.g., hello-world, helloWorld, HELLO_WORLD)..."
            error={error}
          />

          <div className="mt-4 flex gap-2">
            <Button onClick={handleConvert}>Convert</Button>
            <Button variant="ghost" onClick={handleClear}>
              Clear
            </Button>
          </div>

          {results && (
            <div className="mt-6 space-y-2">
              {Object.entries(results).map(([caseType, value]) => (
                <div key={caseType} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2 dark:bg-gray-700">
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {caseLabels[caseType as CaseType]}
                    </span>
                    <p className="font-mono text-sm text-gray-900 dark:text-white break-all">{value}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(value)}
                    className="ml-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <RelatedTools currentSlug="case-converter" />
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

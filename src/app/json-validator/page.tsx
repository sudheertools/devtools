"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { validateJSON } from "@/lib/tools/json";

export default function JSONValidatorPage() {
  const [input, setInput] = useState("");
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

  function handleValidate() {
    if (!input.trim()) {
      setToast({ message: "Please enter JSON to validate.", type: "error" });
      return;
    }
    const result = validateJSON(input);
    setValidation(result);
    if (result.valid) {
      setToast({ message: "JSON is valid!", type: "success" });
    }
  }

  function handleClear() {
    setInput("");
    setValidation(null);
  }

  return (
    <>
      <ToolLayout
        title="JSON Validator"
        description="Validate JSON syntax and check for errors."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "JSON Validator" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <TextArea
            label="JSON to Validate"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value", "number": 42}'
          />

          <div className="mt-4 flex gap-2">
            <Button onClick={handleValidate}>Validate</Button>
            <Button variant="ghost" onClick={handleClear}>
              Clear
            </Button>
          </div>

          {validation && (
            <div className={`mt-4 rounded-lg p-4 ${
              validation.valid
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
            }`}>
              {validation.valid ? (
                <div>
                  <div className="font-medium">✓ Valid JSON</div>
                  <div className="mt-2 text-sm opacity-75">
                    {validation.lines && <span>Lines: {validation.lines} • </span>}
                    {validation.keys !== undefined && <span>Keys: {validation.keys}</span>}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="font-medium">✗ Invalid JSON</div>
                  <div className="mt-2 text-sm opacity-75">{validation.error}</div>
                </div>
              )}
            </div>
          )}
        </div>

        <RelatedTools currentSlug="json-validator" />
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

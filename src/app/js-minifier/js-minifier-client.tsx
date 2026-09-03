"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolInfo from "@/components/tools/ToolInfo";
import { minifyJS, beautifyJS, validateJS } from "@/lib/tools/javascript";
import { copyToClipboard } from "@/lib/utils";

export default function JSMinifierPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [validation, setValidation] = useState<{
    valid: boolean;
    errors: string[];
    lines: number;
  } | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleMinify() {
    setError("");
    try {
      const result = minifyJS(input);
      setOutput(result);
      setValidation(validateJS(input));
    } catch (err) {
      setError((err as Error).message);
      setOutput("");
    }
  }

  function handleBeautify() {
    setError("");
    try {
      const result = beautifyJS(input);
      setOutput(result);
      setValidation(validateJS(input));
    } catch (err) {
      setError((err as Error).message);
      setOutput("");
    }
  }

  function handleValidate() {
    const result = validateJS(input);
    setValidation(result);
    if (result.valid) {
      setToast({ message: "JavaScript syntax appears valid!", type: "success" });
    } else {
      setToast({ message: result.errors.join(", "), type: "error" });
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

  const infoSections = [
    {
      title: "What is JavaScript Minifier?",
      content:
        "JavaScript Minifier is a free online tool that minifies and beautifies JavaScript code. It can compress JS by removing comments and whitespace, or format it for better readability.",
    },
    {
      title: "How to Use?",
      content:
        "Paste your JavaScript code in the input area and click 'Minify' to compress it or 'Beautify' to format it. You can also validate the syntax.",
    },
    {
      title: "Features",
      content:
        "• Minify JavaScript by removing comments and whitespace\n• Beautify JavaScript with proper indentation\n• Validate JavaScript syntax\n• Report line count",
    },
  ];

  return (
    <>
      <ToolLayout
        title="JavaScript Minifier"
        description="Minify JavaScript code to reduce file size or beautify it for better readability. Includes syntax validation and formatting options."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "JavaScript Minifier" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="grid gap-6 lg:grid-cols-2">
            <TextArea
              label="Input JavaScript"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="function greet(name) { console.log('Hello ' + name); }"
              error={error}
            />
            <div className="flex flex-col">
              <TextArea
                label="Output"
                value={output}
                readOnly
                placeholder="Output will appear here..."
                className="flex-1"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <Button onClick={handleMinify}>Minify</Button>
                <Button onClick={handleBeautify}>Beautify</Button>
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
                  <span>JavaScript syntax appears valid</span>
                  <span>Lines: {validation.lines}</span>
                </div>
              ) : (
                <div>
                  <span className="font-medium">Validation errors:</span>
                  <ul className="mt-1 list-disc list-inside">
                    {validation.errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <ToolInfo sections={infoSections} />
        <RelatedTools currentSlug="js-minifier" />
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

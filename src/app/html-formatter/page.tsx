"use client";

import { useState } from "react";
import SEOHead from "@/components/seo/SEOHead";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolInfo from "@/components/tools/ToolInfo";
import { formatHTML, minifyHTML, validateHTML } from "@/lib/tools/html-format";
import { copyToClipboard } from "@/lib/utils";

export default function HTMLFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState("");
  const [validation, setValidation] = useState<{
    valid: boolean;
    errors: string[];
    tags: number;
  } | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleFormat() {
    setError("");
    try {
      const result = formatHTML(input, indent);
      setOutput(result);
      setValidation(validateHTML(input));
    } catch (err) {
      setError((err as Error).message);
      setOutput("");
    }
  }

  function handleMinify() {
    setError("");
    try {
      const result = minifyHTML(input);
      setOutput(result);
    } catch (err) {
      setError((err as Error).message);
      setOutput("");
    }
  }

  function handleValidate() {
    const result = validateHTML(input);
    setValidation(result);
    if (result.valid) {
      setToast({ message: "HTML is valid!", type: "success" });
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
      title: "What is HTML Formatter?",
      content:
        "HTML Formatter is a free online tool that formats and beautifies HTML code. It adds proper indentation to make HTML documents readable and easy to maintain.",
    },
    {
      title: "How to Use?",
      content:
        "Paste your HTML code in the input area and click 'Format' to beautify it, 'Minify' to compress it, or 'Validate' to check for errors.",
    },
    {
      title: "Features",
      content:
        "• Format HTML with customizable indentation\n• Minify HTML by removing whitespace\n• Validate HTML structure\n• Handle self-closing and void elements",
    },
  ];

  return (
    <>
      <SEOHead
        title="HTML Formatter - Free Online Tool"
        description="Format, beautify, and minify HTML code online. Free HTML formatter with customizable indentation and validation."
        keywords="html formatter, format html, html beautifier, html minifier, html validator"
        canonical="https://sudheertools.github.io/html-formatter"
      />
      <ToolLayout
        title="HTML Formatter"
        description="Format, beautify, and minify HTML code with proper indentation. Supports validation and customizable indent levels."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "HTML Formatter" },
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
              </select>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <TextArea
              label="Input HTML"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="<div><p>Hello World</p></div>"
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
                  <span>Valid HTML</span>
                  <span>Tags found: {validation.tags}</span>
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
        <RelatedTools currentSlug="html-formatter" />
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

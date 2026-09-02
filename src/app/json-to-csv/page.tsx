"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolInfo from "@/components/tools/ToolInfo";
import SEOHead from "@/components/seo/SEOHead";
import { jsonToCSV } from "@/lib/tools/csv";
import { copyToClipboard } from "@/lib/utils";

export default function JSONToCSVPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleConvert() {
    setError("");
    setOutput("");
    if (!input.trim()) {
      setError("Please enter JSON data to convert.");
      return;
    }
    try {
      const result = jsonToCSV(input, delimiter);
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to convert JSON");
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

  function handleDownload() {
    if (!output) return;
    const blob = new Blob([output], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const infoSections = [
    {
      title: "What is JSON to CSV?",
      content:
        "JSON to CSV conversion transforms JSON (JavaScript Object Notation) data into CSV (Comma-Separated Values) format. CSV is widely supported by spreadsheet applications like Excel, Google Sheets, and databases.",
    },
    {
      title: "How to use this tool",
      content:
        "Paste your JSON array into the input field. The JSON should be an array of objects. Choose your delimiter (comma, semicolon, or tab) and click Convert. The CSV output can be copied or downloaded.",
    },
    {
      title: "Supported Input Formats",
      content: (
        <ul className="list-disc space-y-1 pl-5">
          <li>Array of objects: [{`{"name": "John"}, {"name": "Jane"}`}]</li>
          <li>Single object: {`{"name": "John", "age": 30}`}</li>
          <li>Nested objects (flattened automatically)</li>
        </ul>
      ),
    },
    {
      title: "Frequently Asked Questions",
      content: (
        <div className="space-y-3">
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              What delimiter should I use?
            </p>
            <p>
              Comma (,) is the standard CSV delimiter. Use semicolon (;) if your
              data contains commas. Tab is useful for TSV files.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              Does it handle nested JSON?
            </p>
            <p>
              Yes. Nested objects are automatically flattened with dot notation
              (e.g., address.city).
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <SEOHead
        title="JSON to CSV Converter - Free Online Tool"
        description="Convert JSON to CSV format instantly. Free online JSON to CSV converter with custom delimiters. Fast, private, and secure."
        keywords="json to csv, convert json to csv, json to excel, json to spreadsheet, online json converter"
        canonical="https://sudheertools.github.io/json-to-csv"
      />
      <ToolLayout
        title="JSON to CSV Converter"
        description="Convert JSON data to CSV format instantly. Supports arrays of objects with custom delimiters. Download as CSV file. All processing happens locally in your browser."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "JSON to CSV" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="grid gap-6 lg:grid-cols-2">
            <TextArea
              label="Input (JSON)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Enter JSON array, e.g.:\n[\n  {"name": "John", "age": 30},\n  {"name": "Jane", "age": 25}\n]'
              error={error}
            />
            <div className="flex flex-col">
              <TextArea
                label="Output (CSV)"
                value={output}
                readOnly
                placeholder="CSV output will appear here..."
                className="flex-1"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <Button onClick={handleConvert}>Convert</Button>
                <Button variant="secondary" onClick={handleCopy} disabled={!output}>
                  Copy
                </Button>
                <Button variant="secondary" onClick={handleDownload} disabled={!output}>
                  Download CSV
                </Button>
                <Button variant="ghost" onClick={handleClear}>
                  Clear
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Delimiter
            </label>
            <div className="flex gap-2">
              {[
                { value: ",", label: "Comma (,)" },
                { value: ";", label: "Semicolon (;)" },
                { value: "\t", label: "Tab" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setDelimiter(option.value)}
                  className={`rounded-lg px-3 py-1 text-sm ${
                    delimiter === option.value
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <ToolInfo sections={infoSections} />
        <RelatedTools currentSlug="json-to-csv" />
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

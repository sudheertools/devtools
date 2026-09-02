"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolInfo from "@/components/tools/ToolInfo";
import SEOHead from "@/components/seo/SEOHead";
import { csvToJSON } from "@/lib/tools/csv";
import { copyToClipboard } from "@/lib/utils";

export default function CSVToJSONPage() {
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
      setError("Please enter CSV data to convert.");
      return;
    }
    try {
      const result = csvToJSON(input, delimiter);
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to convert CSV");
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
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const infoSections = [
    {
      title: "What is CSV to JSON?",
      content:
        "CSV to JSON conversion transforms Comma-Separated Values data into JSON (JavaScript Object Notation) format. JSON is the standard data format for web APIs and modern applications.",
    },
    {
      title: "How to use this tool",
      content:
        "Paste your CSV data into the input field. The first row should contain column headers. Choose your delimiter and click Convert. The JSON output can be copied or downloaded.",
    },
    {
      title: "Example Input",
      content: (
        <pre className="overflow-x-auto rounded-lg bg-gray-50 p-3 font-mono text-sm dark:bg-gray-700">
          <code className="text-gray-900 dark:text-gray-100">
{`name,age,city
John,30,New York
Jane,25,London`}
          </code>
        </pre>
      ),
    },
    {
      title: "Frequently Asked Questions",
      content: (
        <div className="space-y-3">
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              What if my CSV has quoted fields?
            </p>
            <p>
              The tool correctly handles quoted fields, including fields that
              contain the delimiter character.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              Does it handle empty values?
            </p>
            <p>
              Yes. Empty fields are converted to empty strings in the JSON
              output.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <SEOHead
        title="CSV to JSON Converter - Free Online Tool"
        description="Convert CSV to JSON format instantly. Free online CSV to JSON converter with custom delimiters. Fast, private, and secure."
        keywords="csv to json, convert csv to json, csv parser, csv to javascript, online csv converter"
        canonical="https://sudheertools.github.io/csv-to-json"
      />
      <ToolLayout
        title="CSV to JSON Converter"
        description="Convert CSV data to JSON format instantly. Supports custom delimiters and quoted fields. Download as JSON file. All processing happens locally in your browser."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "CSV to JSON" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="grid gap-6 lg:grid-cols-2">
            <TextArea
              label="Input (CSV)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter CSV data, e.g.:\nname,age,city\nJohn,30,New York\nJane,25,London"
              error={error}
            />
            <div className="flex flex-col">
              <TextArea
                label="Output (JSON)"
                value={output}
                readOnly
                placeholder="JSON output will appear here..."
                className="flex-1"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <Button onClick={handleConvert}>Convert</Button>
                <Button variant="secondary" onClick={handleCopy} disabled={!output}>
                  Copy
                </Button>
                <Button variant="secondary" onClick={handleDownload} disabled={!output}>
                  Download JSON
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
        <RelatedTools currentSlug="csv-to-json" />
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

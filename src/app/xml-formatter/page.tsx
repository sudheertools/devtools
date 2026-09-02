"use client";

import { useState } from "react";
import SEOHead from "@/components/seo/SEOHead";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolInfo from "@/components/tools/ToolInfo";
import { formatXML, minifyXML, validateXML } from "@/lib/tools/xml";
import { copyToClipboard } from "@/lib/utils";

export default function XMLFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState("");
  const [validation, setValidation] = useState<{
    valid: boolean;
    errors: string[];
    tags: number;
    depth: number;
  } | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleFormat() {
    setError("");
    try {
      const result = formatXML(input, indent);
      setOutput(result);
      setValidation(validateXML(input));
    } catch (err) {
      setError((err as Error).message);
      setOutput("");
    }
  }

  function handleMinify() {
    setError("");
    try {
      const result = minifyXML(input);
      setOutput(result);
    } catch (err) {
      setError((err as Error).message);
      setOutput("");
    }
  }

  function handleValidate() {
    const result = validateXML(input);
    setValidation(result);
    if (result.valid) {
      setToast({ message: "XML is valid!", type: "success" });
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
      title: "What is XML Formatter?",
      content:
        "XML Formatter is a free online tool that formats, validates, and pretty-prints XML documents. It adds proper indentation to make XML files readable and easy to understand.",
    },
    {
      title: "How to Use XML Formatter?",
      content:
        "Paste your XML code in the input area and click 'Format' to pretty-print it, 'Minify' to compress it, or 'Validate' to check for errors. You can customize the indentation level.",
    },
    {
      title: "Features",
      content:
        "• Format XML with customizable indentation\n• Minify XML by removing whitespace\n• Validate XML structure and report errors\n• Count tags and check nesting depth",
    },
  ];

  return (
    <>
      <SEOHead
        title="XML Formatter - Free Online Tool"
        description="Format, validate, minify, and pretty-print XML documents online. Free XML formatter with customizable indentation and error reporting."
        keywords="xml formatter, format xml, xml validator, xml pretty print, xml minifier"
        canonical="https://sudheertools.github.io/xml-formatter"
      />
      <ToolLayout
        title="XML Formatter"
        description="Format, validate, minify, and pretty-print XML documents with customizable indentation. Supports XML validation and error reporting."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "XML Formatter" },
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
              label="Input XML"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='<root><item key="value">Content</item></root>'
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
                  <span>Valid XML</span>
                  <span>Tags: {validation.tags}</span>
                  <span>Max depth: {validation.depth}</span>
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
        <RelatedTools currentSlug="xml-formatter" />
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

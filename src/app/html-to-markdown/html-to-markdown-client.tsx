"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolInfo from "@/components/tools/ToolInfo";
import { htmlToMarkdown } from "@/lib/tools/markdown";
import { copyToClipboard } from "@/lib/utils";

export default function HTMLToMarkdownPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleConvert() {
    setError("");
    setOutput("");
    if (!input.trim()) {
      setError("Please enter HTML to convert.");
      return;
    }
    try {
      const result = htmlToMarkdown(input);
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to convert HTML");
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
    const blob = new Blob([output], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "converted.md";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const infoSections = [
    {
      title: "What is HTML to Markdown?",
      content:
        "HTML to Markdown conversion transforms HTML (HyperText Markup Language) into Markdown, a lightweight markup language. Markdown is widely used for documentation, README files, and content management systems.",
    },
    {
      title: "How to use this tool",
      content:
        "Paste your HTML code into the input field. Click Convert to transform it into clean Markdown. The output can be copied or downloaded as a .md file.",
    },
    {
      title: "Supported HTML Elements",
      content: (
        <ul className="list-disc space-y-1 pl-5">
          <li>Headings (H1-H6)</li>
          <li>Bold, italic, underline, strikethrough</li>
          <li>Links and images</li>
          <li>Lists (ordered and unordered)</li>
          <li>Blockquotes</li>
          <li>Code blocks and inline code</li>
          <li>Tables</li>
          <li>Horizontal rules</li>
        </ul>
      ),
    },
    {
      title: "Frequently Asked Questions",
      content: (
        <div className="space-y-3">
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              Does it handle complex HTML?
            </p>
            <p>
              Yes. The tool handles nested elements, tables, and most common
              HTML structures. Script and style tags are automatically removed.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              What about HTML entities?
            </p>
            <p>
              Common HTML entities like &amp;amp;, &amp;lt;, &amp;gt; are automatically
              converted to their character equivalents.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <ToolLayout
        title="HTML to Markdown Converter"
        description="Convert HTML to clean Markdown format instantly. Supports headings, links, images, lists, tables, and code blocks. All processing happens locally in your browser."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "HTML to Markdown" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="grid gap-6 lg:grid-cols-2">
            <TextArea
              label="Input (HTML)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your HTML code here..."
              error={error}
            />
            <div className="flex flex-col">
              <TextArea
                label="Output (Markdown)"
                value={output}
                readOnly
                placeholder="Markdown output will appear here..."
                className="flex-1"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <Button onClick={handleConvert}>Convert</Button>
                <Button variant="secondary" onClick={handleCopy} disabled={!output}>
                  Copy
                </Button>
                <Button variant="secondary" onClick={handleDownload} disabled={!output}>
                  Download .md
                </Button>
                <Button variant="ghost" onClick={handleClear}>
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </div>

        <ToolInfo sections={infoSections} />
        <RelatedTools currentSlug="html-to-markdown" />
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

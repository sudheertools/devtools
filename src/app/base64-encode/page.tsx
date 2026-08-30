"use client";

import { useState } from "react";
import type { Metadata } from "next";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolInfo from "@/components/tools/ToolInfo";
import { encodeBase64 } from "@/lib/tools/base64";
import { copyToClipboard } from "@/lib/utils";
import Link from "next/link";

export default function Base64EncodePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleEncode() {
    setError("");
    if (!input.trim()) {
      setError("Please enter some text to encode.");
      return;
    }
    try {
      const result = encodeBase64(input);
      setOutput(result);
    } catch {
      setError("An error occurred while encoding. Please check your input.");
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

  const infoSections = [
    {
      title: "What is Base64?",
      content:
        "Base64 is a binary-to-text encoding scheme that represents binary data using a set of 64 ASCII characters. It is commonly used to encode data that needs to be transferred over text-based channels, such as embedding images in HTML or CSS, encoding email attachments, and storing complex data in JSON formats.",
    },
    {
      title: "How to use this tool",
      content:
        "Simply paste or type the text you want to encode into the input field above, then click the Encode button. The Base64 encoded output will appear instantly in the output area. You can copy the result to your clipboard with one click.",
    },
    {
      title: "Example",
      content: (
        <div className="space-y-2">
          <p>
            <strong>Input:</strong> Hello, World!
          </p>
          <p>
            <strong>Output:</strong> SGVsbG8sIFdvcmxkIQ==
          </p>
          <p className="text-xs text-gray-400">
            This tool also supports Unicode characters like emojis and
            non-Latin scripts.
          </p>
        </div>
      ),
    },
    {
      title: "Frequently Asked Questions",
      content: (
        <div className="space-y-3">
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              Is my data sent to a server?
            </p>
            <p>
              No. All encoding happens locally in your browser using the
              built-in TextEncoder and btoa APIs. Your data never leaves your
              device.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              Does it support Unicode?
            </p>
            <p>
              Yes. The tool properly handles Unicode characters including
              emojis, Chinese, Japanese, Arabic, and all other scripts.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              What is the maximum input size?
            </p>
            <p>
              There is no hard limit, but very large inputs (several megabytes)
              may be slow depending on your browser and device.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <ToolLayout
        title="Base64 Encoder"
        description="Encode any text to Base64 format. Supports Unicode characters including emojis."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Base64 Encoder" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="grid gap-6 lg:grid-cols-2">
            <TextArea
              label="Input (plain text)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to encode..."
              error={error}
            />
            <div className="flex flex-col">
              <TextArea
                label="Output (Base64)"
                value={output}
                readOnly
                placeholder="Encoded output will appear here..."
                className="flex-1"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <Button onClick={handleEncode}>Encode</Button>
                <Button variant="secondary" onClick={handleCopy} disabled={!output}>
                  Copy Output
                </Button>
                <Button variant="ghost" onClick={handleClear}>
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
          Need to decode Base64?{" "}
          <Link
            href="/base64-decode"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Try the Base64 Decoder →
          </Link>
        </div>

        <ToolInfo sections={infoSections} />
        <RelatedTools currentSlug="base64-encode" />
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

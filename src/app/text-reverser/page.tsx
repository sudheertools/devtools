"use client";

import { useState } from "react";
import SEOHead from "@/components/seo/SEOHead";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { reverseText, reverseWords, reverseLines } from "@/lib/tools/text-reverse";
import { copyToClipboard } from "@/lib/utils";

type ReverseMode = "characters" | "words" | "lines";

export default function TextReverserPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<ReverseMode>("characters");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleReverse() {
    if (!input.trim()) {
      setToast({ message: "Please enter text to reverse.", type: "error" });
      return;
    }
    switch (mode) {
      case "characters":
        setOutput(reverseText(input));
        break;
      case "words":
        setOutput(reverseWords(input));
        break;
      case "lines":
        setOutput(reverseLines(input));
        break;
    }
  }

  function handleClear() {
    setInput("");
    setOutput("");
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

  return (
    <>
      <SEOHead
        title="Text Reverser - Free Online Tool"
        description="Reverse text, words, or lines instantly. Free online text reverser for strings, words, and line order."
        keywords="text reverser, reverse text, reverse words, reverse string, text mirror"
        canonical="https://sudheertools.github.io/text-reverser"
      />
      <ToolLayout
        title="Text Reverser"
        description="Reverse text character by character, word by word, or line by line. Instant preview with copy to clipboard support."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Text Reverser" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex gap-2">
            {(["characters", "words", "lines"] as ReverseMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${
                  mode === m
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <TextArea
              label="Input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to reverse..."
            />
            <TextArea
              label="Output"
              value={output}
              readOnly
              placeholder="Reversed text will appear here..."
            />
          </div>

          <div className="mt-4 flex gap-2">
            <Button onClick={handleReverse}>Reverse</Button>
            <Button variant="secondary" onClick={handleCopy} disabled={!output}>
              Copy
            </Button>
            <Button variant="ghost" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>

        <RelatedTools currentSlug="text-reverser" />
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

"use client";

import { useState } from "react";
import SEOHead from "@/components/seo/SEOHead";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { generateLoremParagraphs, generateLoremSentences, generateLoremWords } from "@/lib/tools/lorem";
import { copyToClipboard } from "@/lib/utils";

type LoremType = "paragraphs" | "sentences" | "words";

export default function LoremIpsumPage() {
  const [type, setType] = useState<LoremType>("paragraphs");
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleGenerate() {
    try {
      let result: string;
      switch (type) {
        case "paragraphs":
          result = generateLoremParagraphs(count);
          break;
        case "sentences":
          result = generateLoremSentences(count);
          break;
        case "words":
          result = generateLoremWords(count);
          break;
      }
      setOutput(result);
    } catch (err) {
      setToast({ message: (err as Error).message, type: "error" });
    }
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
        title="Lorem Ipsum Generator - Free Online Tool"
        description="Generate Lorem Ipsum placeholder text for designs, mockups, and layouts. Free online lorem ipsum generator with paragraphs, sentences, and words options."
        keywords="lorem ipsum, placeholder text, dummy text, filler text, lorem ipsum generator"
        canonical="https://sudheertools.github.io/lorem-ipsum"
      />
      <ToolLayout
        title="Lorem Ipsum Generator"
        description="Generate Lorem Ipsum placeholder text in paragraphs, sentences, or words for use in design mockups, layouts, and content prototypes."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Lorem Ipsum Generator" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Type:
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as LoremType)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="paragraphs">Paragraphs</option>
                <option value="sentences">Sentences</option>
                <option value="words">Words</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Count:
              </label>
              <input
                type="number"
                min={1}
                max={type === "words" ? 10000 : 100}
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <Button onClick={handleGenerate}>Generate</Button>
            {output && (
              <Button variant="secondary" onClick={handleCopy}>
                Copy All
              </Button>
            )}
          </div>

          {output && (
            <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-900 dark:bg-gray-700 dark:text-white whitespace-pre-wrap">
              {output}
            </div>
          )}

          {!output && (
            <div className="text-center text-gray-500 dark:text-gray-400">
              Select options and click "Generate" to create placeholder text.
            </div>
          )}
        </div>

        <RelatedTools currentSlug="lorem-ipsum" />
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

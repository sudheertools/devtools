"use client";

import { useState, useCallback } from "react";
import SEOHead from "@/components/seo/SEOHead";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { countCharacters } from "@/lib/tools/case";
import { copyToClipboard } from "@/lib/utils";

export default function CharacterCounterPage() {
  const [input, setInput] = useState("");
  const [stats, setStats] = useState<{
    characters: number;
    charactersNoSpaces: number;
    words: number;
    sentences: number;
    paragraphs: number;
    lines: number;
  } | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleCount = useCallback(() => {
    const result = countCharacters(input);
    setStats(result);
  }, [input]);

  function handleClear() {
    setInput("");
    setStats(null);
  }

  async function handleCopyStats() {
    if (!stats) return;
    const text = `Characters: ${stats.characters}
Characters (no spaces): ${stats.charactersNoSpaces}
Words: ${stats.words}
Sentences: ${stats.sentences}
Paragraphs: ${stats.paragraphs}
Lines: ${stats.lines}`;
    try {
      await copyToClipboard(text);
      setToast({ message: "Stats copied to clipboard!", type: "success" });
    } catch {
      setToast({ message: "Failed to copy", type: "error" });
    }
  }

  return (
    <>
      <SEOHead
        title="Character Counter - Free Online Tool"
        description="Count characters, words, sentences, paragraphs, and lines in text instantly. Free online character counter and word counter for writers and developers."
        keywords="character counter, word counter, text counter, character count, word count online"
        canonical="https://sudheertools.github.io/character-counter"
      />
      <ToolLayout
        title="Character Counter"
        description="Count characters, words, sentences, paragraphs, and lines in any text. Real-time statistics with character count (with and without spaces) for content analysis."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Character Counter" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <TextArea
            label="Input Text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              handleCount();
            }}
            placeholder="Type or paste your text here..."
          />

          {stats && (
            <div className="mt-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Statistics
                </h3>
                <Button variant="secondary" onClick={handleCopyStats}>
                  Copy Stats
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { label: "Characters", value: stats.characters, icon: "Aa" },
                  { label: "Characters (no spaces)", value: stats.charactersNoSpaces, icon: "Ab" },
                  { label: "Words", value: stats.words, icon: "W" },
                  { label: "Sentences", value: stats.sentences, icon: "S" },
                  { label: "Paragraphs", value: stats.paragraphs, icon: "P" },
                  { label: "Lines", value: stats.lines, icon: "L" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-sm font-bold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                        {stat.icon}
                      </span>
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {stat.value.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!stats && (
            <div className="mt-6 text-center text-gray-500 dark:text-gray-400">
              Start typing to see character, word, and line counts.
            </div>
          )}
        </div>

        <RelatedTools currentSlug="character-counter" />
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

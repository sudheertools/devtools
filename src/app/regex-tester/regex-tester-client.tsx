"use client";

import { useState, useCallback } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { copyToClipboard } from "@/lib/utils";

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [matches, setMatches] = useState<Array<{ match: string; index: number; groups?: string[] }>>([]);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleTest = useCallback(() => {
    setError("");
    setMatches([]);

    if (!pattern.trim()) {
      setError("Please enter a regex pattern.");
      return;
    }

    if (!testString.trim()) {
      setError("Please enter a test string.");
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const newMatches: Array<{ match: string; index: number; groups?: string[] }> = [];

      if (flags.includes("g")) {
        let match;
        while ((match = regex.exec(testString)) !== null) {
          newMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
      } else {
        const match = regex.exec(testString);
        if (match) {
          newMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      }

      setMatches(newMatches);
    } catch (err) {
      setError((err as Error).message);
    }
  }, [pattern, flags, testString]);

  function handleClear() {
    setPattern("");
    setFlags("g");
    setTestString("");
    setMatches([]);
    setError("");
  }

  async function handleCopyPattern() {
    try {
      await copyToClipboard(`/${pattern}/${flags}`);
      setToast({ message: "Regex pattern copied!", type: "success" });
    } catch {
      setToast({ message: "Failed to copy", type: "error" });
    }
  }

  const highlightMatches = (text: string, matches: Array<{ match: string; index: number }>): Array<{ text: string; isMatch: boolean }> => {
    if (matches.length === 0) return [{ text, isMatch: false }];

    const parts: Array<{ text: string; isMatch: boolean }> = [];
    let lastIndex = 0;

    const sortedMatches = [...matches].sort((a, b) => a.index - b.index);

    for (const match of sortedMatches) {
      if (match.index > lastIndex) {
        parts.push({ text: text.slice(lastIndex, match.index), isMatch: false });
      }
      parts.push({ text: match.match, isMatch: true });
      lastIndex = match.index + match.match.length;
    }

    if (lastIndex < text.length) {
      parts.push({ text: text.slice(lastIndex), isMatch: false });
    }

    return parts;
  };

  return (
    <>
      <ToolLayout
        title="Regex Tester"
        description="Test regular expressions with live matching, match highlighting, and capture group extraction. Supports global, case-insensitive, multiline, and dotAll flags."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Regex Tester" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Regular Expression
                </label>
                <div className="flex gap-2">
                  <div className="flex flex-1 items-center rounded-lg border border-gray-300 dark:border-gray-600">
                    <span className="px-2 text-gray-500 dark:text-gray-400">/</span>
                    <input
                      type="text"
                      value={pattern}
                      onChange={(e) => setPattern(e.target.value)}
                      placeholder="pattern"
                      className="flex-1 bg-transparent py-2 font-mono text-sm text-gray-900 outline-none dark:text-white"
                    />
                    <span className="px-2 text-gray-500 dark:text-gray-400">/{flags}</span>
                  </div>
                  <Button variant="secondary" onClick={handleCopyPattern}>
                    Copy
                  </Button>
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Flags
                </label>
                <div className="flex gap-2">
                  {["g", "i", "m", "s"].map((flag) => (
                    <label key={flag} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={flags.includes(flag)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFlags(flags + flag);
                          } else {
                            setFlags(flags.replace(flag, ""));
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{flag}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Test String
                </label>
                <textarea
                  value={testString}
                  onChange={(e) => setTestString(e.target.value)}
                  placeholder="Enter text to test against the regex..."
                  rows={6}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 font-mono text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {error && (
                <p className="mb-4 text-sm text-red-600 dark:text-red-400">{error}</p>
              )}

              <div className="flex gap-2">
                <Button onClick={handleTest}>Test</Button>
                <Button variant="ghost" onClick={handleClear}>
                  Clear
                </Button>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Matches ({matches.length})
              </h3>

              {matches.length > 0 ? (
                <div className="space-y-2">
                  {matches.map((match, index) => (
                    <div key={index} className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Match {index + 1} at index {match.index}
                        </span>
                        <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-mono text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          {match.match}
                        </span>
                      </div>
                      {match.groups && match.groups.length > 0 && (
                        <div className="mt-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Groups:</span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {match.groups.map((group, i) => (
                              <span key={i} className="rounded bg-blue-100 px-2 py-0.5 text-xs font-mono text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                {group}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-gray-300 p-4 text-center text-gray-500 dark:border-gray-600 dark:text-gray-400">
                  {pattern ? "No matches found" : "Enter a pattern and test string to see matches"}
                </div>
              )}

              {testString && (
                <div className="mt-4">
                  <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Highlighted Matches
                  </h3>
                  <div className="rounded-lg bg-gray-50 p-4 font-mono text-sm dark:bg-gray-700">
                    {matches.length > 0 ? (
                      highlightMatches(testString, matches).map((part: { text: string; isMatch: boolean }, i: number) =>
                        part.isMatch ? (
                          <mark key={i} className="bg-yellow-200 text-yellow-900 dark:bg-yellow-800 dark:text-yellow-200">
                            {part.text}
                          </mark>
                        ) : (
                          <span key={i} className="text-gray-900 dark:text-white">{part.text}</span>
                        )
                      )
                    ) : (
                      <span className="text-gray-900 dark:text-white">{testString}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <RelatedTools currentSlug="regex-tester" />
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

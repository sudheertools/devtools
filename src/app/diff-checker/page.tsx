"use client";

import { useState } from "react";
import SEOHead from "@/components/seo/SEOHead";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolInfo from "@/components/tools/ToolInfo";
import { computeDiff, getDiffStats } from "@/lib/tools/diff";
import type { DiffLine } from "@/lib/tools/diff";

export default function DiffCheckerPage() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diffResult, setDiffResult] = useState<DiffLine[]>([]);
  const [stats, setStats] = useState<{ added: number; removed: number; unchanged: number } | null>(null);
  const [showDiff, setShowDiff] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleCompare() {
    const result = computeDiff(text1, text2);
    setDiffResult(result);
    setStats(getDiffStats(result));
    setShowDiff(true);
  }

  function handleClear() {
    setText1("");
    setText2("");
    setDiffResult([]);
    setStats(null);
    setShowDiff(false);
  }

  return (
    <>
      <SEOHead
        title="Diff Checker - Free Online Tool"
        description="Compare two texts side by side and highlight differences. Free online diff checker for code, text, and documents."
        keywords="diff checker, text compare, diff tool, compare text, code diff"
        canonical="https://sudheertools.github.io/diff-checker"
      />
      <ToolLayout
        title="Diff Checker"
        description="Compare two texts side by side and see the differences highlighted. Perfect for comparing code, documents, or any text content."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Diff Checker" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="grid gap-6 lg:grid-cols-2">
            <TextArea
              label="Original Text"
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="Enter the original text here..."
            />
            <TextArea
              label="Modified Text"
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="Enter the modified text here..."
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={handleCompare}>Compare</Button>
            <Button variant="ghost" onClick={handleClear}>
              Clear
            </Button>
          </div>

          {showDiff && stats && (
            <div className="mt-6">
              <div className="mb-4 flex gap-4 text-sm">
                <span className="text-green-600 dark:text-green-400">
                  +{stats.added} added
                </span>
                <span className="text-red-600 dark:text-red-400">
                  -{stats.removed} removed
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {stats.unchanged} unchanged
                </span>
              </div>

              <div className="overflow-auto rounded-lg border border-gray-200 dark:border-gray-700">
                <table className="w-full font-mono text-sm">
                  <tbody>
                    {diffResult.map((line, i) => (
                      <tr
                        key={i}
                        className={
                          line.type === "added"
                            ? "bg-green-100 dark:bg-green-900/30"
                            : line.type === "removed"
                            ? "bg-red-100 dark:bg-red-900/30"
                            : ""
                        }
                      >
                        <td className="w-12 border-r border-gray-200 px-2 py-1 text-right text-gray-400 dark:border-gray-700">
                          {line.leftLineNum || ""}
                        </td>
                        <td className="w-12 border-r border-gray-200 px-2 py-1 text-right text-gray-400 dark:border-gray-700">
                          {line.rightLineNum || ""}
                        </td>
                        <td className="w-8 px-2 py-1 text-center">
                          {line.type === "added" ? "+" : line.type === "removed" ? "-" : " "}
                        </td>
                        <td className="whitespace-pre px-2 py-1">
                          {line.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <ToolInfo
          sections={[
            {
              title: "What is Diff Checker?",
              content:
                "Diff Checker is a free online tool that compares two texts side by side and highlights the differences. It shows additions in green and removals in red, making it easy to see what changed.",
            },
            {
              title: "How to Use?",
              content:
                "Paste the original text in the first area and the modified text in the second area. Click 'Compare' to see the differences highlighted.",
            },
          ]}
        />
        <RelatedTools currentSlug="diff-checker" />
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

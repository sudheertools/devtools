"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolInfo from "@/components/tools/ToolInfo";
import { getContrastRatio, getRating, getContrastColor } from "@/lib/tools/color-contrast";
import { copyToClipboard } from "@/lib/utils";

export default function ColorContrastPage() {
  const [foreground, setForeground] = useState("#000000");
  const [background, setBackground] = useState("#FFFFFF");
  const [ratio, setRatio] = useState<number | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleCheck() {
    try {
      const contrastRatio = getContrastRatio(foreground, background);
      setRatio(contrastRatio);
    } catch (err) {
      setToast({ message: (err as Error).message, type: "error" });
    }
  }

  async function handleCopy(text: string) {
    try {
      await copyToClipboard(text);
      setToast({ message: "Copied to clipboard!", type: "success" });
    } catch {
      setToast({ message: "Failed to copy", type: "error" });
    }
  }

  const rating = ratio ? getRating(ratio) : null;

  const infoSections = [
    {
      title: "What is Color Contrast Checker?",
      content:
        "Color Contrast Checker is a free online tool that checks the contrast ratio between two colors to ensure they meet WCAG accessibility standards. It helps you create accessible color combinations.",
    },
    {
      title: "How to Use?",
      content:
        "Enter foreground and background colors in hex format (e.g., #000000) and click 'Check Contrast' to see the contrast ratio and WCAG compliance level.",
    },
    {
      title: "WCAG Standards",
      content:
        "• AAA: Ratio >= 7:1 (highest accessibility)\n• AA: Ratio >= 4.5:1 (standard accessibility)\n• AA Large: Ratio >= 3:1 (for large text)\n• Fail: Ratio < 3:1 (does not meet standards)",
    },
  ];

  return (
    <>
      <ToolLayout
        title="Color Contrast Checker"
        description="Check the contrast ratio between foreground and background colors to ensure WCAG accessibility compliance. Supports AA and AAA standards."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Color Contrast Checker" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Foreground Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={foreground}
                    onChange={(e) => setForeground(e.target.value)}
                    className="h-10 w-16 cursor-pointer rounded border-0"
                  />
                  <input
                    type="text"
                    value={foreground}
                    onChange={(e) => setForeground(e.target.value)}
                    placeholder="#000000"
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-mono text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Background Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    className="h-10 w-16 cursor-pointer rounded border-0"
                  />
                  <input
                    type="text"
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    placeholder="#FFFFFF"
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-mono text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <Button onClick={handleCheck}>Check Contrast</Button>
            </div>

            <div>
              <div
                className="mb-4 flex h-40 items-center justify-center rounded-lg border border-gray-200 text-2xl font-bold dark:border-gray-700"
                style={{
                  backgroundColor: background,
                  color: foreground,
                }}
              >
                Sample Text
              </div>

              {ratio !== null && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 dark:bg-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Contrast Ratio
                    </span>
                    <span className="font-mono text-lg font-bold text-gray-900 dark:text-white">
                      {ratio.toFixed(2)}:1
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 dark:bg-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      WCAG Rating
                    </span>
                    <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                      rating === "AAA"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                        : rating === "AA"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                        : rating === "AA Large"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                    }`}>
                      {rating}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-lg px-4 py-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Normal Text (AA)
                      </span>
                      <span className={`text-sm font-medium ${
                        ratio >= 4.5
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}>
                        {ratio >= 4.5 ? "Pass" : "Fail"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg px-4 py-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Normal Text (AAA)
                      </span>
                      <span className={`text-sm font-medium ${
                        ratio >= 7
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}>
                        {ratio >= 7 ? "Pass" : "Fail"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg px-4 py-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Large Text (AA)
                      </span>
                      <span className={`text-sm font-medium ${
                        ratio >= 3
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}>
                        {ratio >= 3 ? "Pass" : "Fail"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <ToolInfo sections={infoSections} />
        <RelatedTools currentSlug="color-contrast" />
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

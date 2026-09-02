"use client";

import { useState } from "react";
import SEOHead from "@/components/seo/SEOHead";
import ToolLayout from "@/components/layout/ToolLayout";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { generateCronExpression, describeCronExpression, generateNextRuns, cronPresets } from "@/lib/tools/cron";
import { copyToClipboard } from "@/lib/utils";

export default function CronGeneratorPage() {
  const [minute, setMinute] = useState("*");
  const [hour, setHour] = useState("*");
  const [dayOfMonth, setDayOfMonth] = useState("*");
  const [month, setMonth] = useState("*");
  const [dayOfWeek, setDayOfWeek] = useState("*");
  const [expression, setExpression] = useState("");
  const [description, setDescription] = useState("");
  const [nextRuns, setNextRuns] = useState<Date[]>([]);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleGenerate() {
    setError("");
    try {
      const expr = generateCronExpression(minute, hour, dayOfMonth, month, dayOfWeek);
      setExpression(expr);
      setDescription(describeCronExpression(expr));
      setNextRuns(generateNextRuns(expr, 5));
    } catch (err) {
      setError((err as Error).message);
      setExpression("");
      setDescription("");
      setNextRuns([]);
    }
  }

  function handlePreset(preset: { name: string; expression: string }) {
    const parts = preset.expression.split(" ");
    setMinute(parts[0]);
    setHour(parts[1]);
    setDayOfMonth(parts[2]);
    setMonth(parts[3]);
    setDayOfWeek(parts[4]);
  }

  function handleClear() {
    setMinute("*");
    setHour("*");
    setDayOfMonth("*");
    setMonth("*");
    setDayOfWeek("*");
    setExpression("");
    setDescription("");
    setNextRuns([]);
    setError("");
  }

  async function handleCopy() {
    if (!expression) return;
    try {
      await copyToClipboard(expression);
      setToast({ message: "Cron expression copied!", type: "success" });
    } catch {
      setToast({ message: "Failed to copy", type: "error" });
    }
  }

  return (
    <>
      <SEOHead
        title="Cron Expression Generator - Free Online Tool"
        description="Generate and describe cron expressions for task scheduling. Free online cron job generator with presets, human-readable descriptions, and next run times."
        keywords="cron generator, cron expression, cron job, cron schedule, task scheduler"
        canonical="https://sudheertools.github.io/cron-generator"
      />
      <ToolLayout
        title="Cron Expression Generator"
        description="Generate and describe cron expressions for scheduling tasks. Includes presets, human-readable descriptions, and calculates the next 5 scheduled run times."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Cron Generator" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              Presets
            </h3>
            <div className="flex flex-wrap gap-2">
              {cronPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handlePreset(preset)}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 grid gap-4 sm:grid-cols-5">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                Minute
              </label>
              <input
                type="text"
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                placeholder="*"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                Hour
              </label>
              <input
                type="text"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                placeholder="*"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                Day of Month
              </label>
              <input
                type="text"
                value={dayOfMonth}
                onChange={(e) => setDayOfMonth(e.target.value)}
                placeholder="*"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                Month
              </label>
              <input
                type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="*"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                Day of Week
              </label>
              <input
                type="text"
                value={dayOfWeek}
                onChange={(e) => setDayOfWeek(e.target.value)}
                placeholder="*"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {error && (
            <p className="mb-4 text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          <div className="flex gap-2">
            <Button onClick={handleGenerate}>Generate</Button>
            <Button variant="secondary" onClick={handleCopy} disabled={!expression}>
              Copy Expression
            </Button>
            <Button variant="ghost" onClick={handleClear}>
              Clear
            </Button>
          </div>

          {expression && (
            <div className="mt-6 space-y-4">
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Expression</span>
                <p className="font-mono text-lg text-gray-900 dark:text-white">{expression}</p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Description</span>
                <p className="text-gray-900 dark:text-white">{description}</p>
              </div>

              {nextRuns.length > 0 && (
                <div>
                  <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Next 5 Runs
                  </h3>
                  <div className="space-y-1">
                    {nextRuns.map((run, index) => (
                      <div key={index} className="rounded-lg bg-gray-50 px-4 py-2 font-mono text-sm text-gray-900 dark:bg-gray-700 dark:text-white">
                        {run.toLocaleString()}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <RelatedTools currentSlug="cron-generator" />
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

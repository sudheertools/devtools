"use client";

import { useState, useCallback } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { timestampToDate, dateToTimestamp, getCurrentTimestamp } from "@/lib/tools/timestamp";
import { copyToClipboard } from "@/lib/utils";

type Tab = "toDate" | "toTimestamp" | "current";

export default function TimestampConverterPage() {
  const [tab, setTab] = useState<Tab>("toDate");
  const [timestampInput, setTimestampInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [result, setResult] = useState<Record<string, string> | null>(null);
  const [currentTimestamp, setCurrentTimestamp] = useState<{
    seconds: number;
    milliseconds: number;
  } | null>(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleTimestampToDate = useCallback(() => {
    setError("");
    if (!timestampInput.trim()) {
      setError("Please enter a timestamp.");
      return;
    }
    try {
      const result = timestampToDate(timestampInput);
      setResult({
        "Date": result.date,
        "ISO": result.iso,
        "UTC": result.utc,
        "Relative": result.relative,
      });
    } catch (err) {
      setError((err as Error).message);
      setResult(null);
    }
  }, [timestampInput]);

  const handleDateToTimestamp = useCallback(() => {
    setError("");
    if (!dateInput.trim()) {
      setError("Please enter a date.");
      return;
    }
    try {
      const result = dateToTimestamp(dateInput);
      setResult({
        "Seconds": result.seconds.toString(),
        "Milliseconds": result.milliseconds.toString(),
      });
    } catch (err) {
      setError((err as Error).message);
      setResult(null);
    }
  }, [dateInput]);

  const handleGetCurrent = useCallback(() => {
    const now = getCurrentTimestamp();
    setCurrentTimestamp(now);
    setResult({
      "Seconds": now.seconds.toString(),
      "Milliseconds": now.milliseconds.toString(),
    });
  }, []);

  async function handleCopy(value: string) {
    try {
      await copyToClipboard(value);
      setToast({ message: "Copied to clipboard!", type: "success" });
    } catch {
      setToast({ message: "Failed to copy", type: "error" });
    }
  }

  return (
    <>
      <ToolLayout
        title="Timestamp Converter"
        description="Convert Unix timestamps (seconds and milliseconds) to human-readable dates and vice versa. Supports current timestamp display and multiple date formats."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Timestamp Converter" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-6 flex gap-2">
            <button
              onClick={() => setTab("toDate")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                tab === "toDate"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              }`}
            >
              Timestamp → Date
            </button>
            <button
              onClick={() => setTab("toTimestamp")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                tab === "toTimestamp"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              }`}
            >
              Date → Timestamp
            </button>
            <button
              onClick={() => {
                setTab("current");
                handleGetCurrent();
              }}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                tab === "current"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              }`}
            >
              Current Timestamp
            </button>
          </div>

          {tab === "toDate" && (
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Unix Timestamp
              </label>
              <input
                type="text"
                value={timestampInput}
                onChange={(e) => setTimestampInput(e.target.value)}
                placeholder="Enter timestamp (seconds or milliseconds)..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 font-mono text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
              )}
              <Button className="mt-4" onClick={handleTimestampToDate}>
                Convert
              </Button>
            </div>
          )}

          {tab === "toTimestamp" && (
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Date String
              </label>
              <input
                type="text"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                placeholder="Enter date (e.g., 2024-01-01, January 1, 2024)..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 font-mono text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
              )}
              <Button className="mt-4" onClick={handleDateToTimestamp}>
                Convert
              </Button>
            </div>
          )}

          {tab === "current" && currentTimestamp && (
            <div>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Current Unix timestamp:
              </p>
            </div>
          )}

          {result && (
            <div className="mt-6 space-y-2">
              {Object.entries(result).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2 dark:bg-gray-700">
                  <div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{key}</span>
                    <p className="font-mono text-sm text-gray-900 dark:text-white">{value}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(value)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <RelatedTools currentSlug="timestamp-converter" />
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

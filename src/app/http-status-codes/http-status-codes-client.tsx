"use client";

import { useState, useMemo } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { HTTP_STATUS_CODES, searchHttpStatus, type HttpStatus } from "@/lib/tools/http-status";
import { copyToClipboard } from "@/lib/utils";

export default function HTTPStatusCodesPage() {
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return HTTP_STATUS_CODES;
    return searchHttpStatus(search);
  }, [search]);

  const grouped = useMemo(() => {
    const groups: Record<string, HttpStatus[]> = {};
    for (const status of filtered) {
      if (!groups[status.category]) groups[status.category] = [];
      groups[status.category].push(status);
    }
    return groups;
  }, [filtered]);

  async function handleCopy(code: number) {
    try {
      await copyToClipboard(code.toString());
      setToast({ message: `${code} copied!`, type: "success" });
    } catch {
      setToast({ message: "Failed to copy", type: "error" });
    }
  }

  return (
    <>
      <ToolLayout
        title="HTTP Status Codes"
        description="Complete reference of HTTP status codes with descriptions. Search and filter to quickly find the code you need."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "HTTP Status Codes" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by code, name, or category..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {Object.entries(grouped).map(([category, statuses]) => (
            <div key={category} className="mb-6">
              <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                {category}
              </h3>
              <div className="space-y-2">
                {statuses.map((status) => (
                  <div
                    key={status.code}
                    className="flex items-start gap-4 rounded-lg border border-gray-100 p-3 dark:border-gray-700"
                  >
                    <button
                      onClick={() => handleCopy(status.code)}
                      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 font-mono text-sm font-bold text-blue-700 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-900/80"
                      title="Click to copy"
                    >
                      {status.code}
                    </button>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{status.text}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{status.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400">
              No status codes found matching &quot;{search}&quot;
            </div>
          )}
        </div>

        <RelatedTools currentSlug="http-status-codes" />
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

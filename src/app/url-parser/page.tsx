"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { parseURL } from "@/lib/tools/url";
import { copyToClipboard } from "@/lib/utils";

export default function URLParserPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    protocol: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
    params: Record<string, string>;
  } | null>(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleParse() {
    setError("");
    if (!input.trim()) {
      setError("Please enter a URL to parse.");
      return;
    }
    try {
      const parsed = parseURL(input);
      setResult(parsed);
    } catch (err) {
      setError((err as Error).message);
      setResult(null);
    }
  }

  function handleClear() {
    setInput("");
    setResult(null);
    setError("");
  }

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
        title="URL Parser"
        description="Parse URLs to see protocol, hostname, path, and query parameters."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "URL Parser" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <TextArea
            label="URL to Parse"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="https://example.com:8080/path?query=value#hash"
            error={error}
          />

          <div className="mt-4 flex gap-2">
            <Button onClick={handleParse}>Parse</Button>
            <Button variant="ghost" onClick={handleClear}>
              Clear
            </Button>
          </div>

          {result && (
            <div className="mt-6 space-y-2">
              {[
                { label: "Protocol", value: result.protocol },
                { label: "Hostname", value: result.hostname },
                { label: "Port", value: result.port || "(default)" },
                { label: "Pathname", value: result.pathname },
                { label: "Search", value: result.search || "(none)" },
                { label: "Hash", value: result.hash || "(none)" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2 dark:bg-gray-700">
                  <div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{item.label}</span>
                    <p className="font-mono text-sm text-gray-900 dark:text-white">{item.value}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(item.value)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Copy
                  </button>
                </div>
              ))}

              {Object.keys(result.params).length > 0 && (
                <div className="mt-4">
                  <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Query Parameters
                  </h3>
                  <div className="space-y-1">
                    {Object.entries(result.params).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2 dark:bg-gray-700">
                        <div>
                          <span className="font-mono text-xs text-blue-600 dark:text-blue-400">{key}</span>
                          <span className="mx-2 text-gray-400">=</span>
                          <span className="font-mono text-xs text-gray-900 dark:text-white">{value}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(`${key}=${value}`)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Copy
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <RelatedTools currentSlug="url-parser" />
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

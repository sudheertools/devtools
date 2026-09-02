"use client";

import { useState } from "react";
import SEOHead from "@/components/seo/SEOHead";
import ToolLayout from "@/components/layout/ToolLayout";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { validateURL } from "@/lib/tools/url-validator";

export default function URLValidatorPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ReturnType<typeof validateURL> | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleValidate() {
    if (!input.trim()) {
      setToast({ message: "Please enter a URL.", type: "error" });
      return;
    }
    const res = validateURL(input);
    setResult(res);
    if (res.valid) {
      setToast({ message: "URL is valid!", type: "success" });
    }
  }

  function handleClear() {
    setInput("");
    setResult(null);
  }

  return (
    <>
      <SEOHead
        title="URL Validator - Free Online Tool"
        description="Validate URLs and parse their components. Check URL format, protocol, hostname, path, and query parameters."
        keywords="url validator, validate url, url checker, url parser, url format validator"
        canonical="https://sudheertools.github.io/url-validator"
      />
      <ToolLayout
        title="URL Validator"
        description="Validate URLs and parse their components including protocol, hostname, port, path, query parameters, and hash fragments."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "URL Validator" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            URL
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="https://example.com/path?query=value#hash"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 font-mono text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            onKeyDown={(e) => e.key === "Enter" && handleValidate()}
          />

          <div className="mt-4 flex gap-2">
            <Button onClick={handleValidate}>Validate</Button>
            <Button variant="ghost" onClick={handleClear}>
              Clear
            </Button>
          </div>

          {result && (
            <div
              className={`mt-4 rounded-lg p-4 ${
                result.valid
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
              }`}
            >
              {result.valid ? (
                <div>
                  <div className="font-medium">✓ Valid URL</div>
                  <div className="mt-3 space-y-1 text-sm opacity-75">
                    <div><span className="font-medium">Protocol:</span> {result.protocol}</div>
                    <div><span className="font-medium">Hostname:</span> {result.hostname}</div>
                    {result.port && <div><span className="font-medium">Port:</span> {result.port}</div>}
                    <div><span className="font-medium">Path:</span> {result.pathname}</div>
                    {result.search && <div><span className="font-medium">Query:</span> {result.search}</div>}
                    {result.hash && <div><span className="font-medium">Hash:</span> {result.hash}</div>}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="font-medium">✗ Invalid URL</div>
                  <ul className="mt-2 list-inside list-disc text-sm opacity-75">
                    {result.errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <RelatedTools currentSlug="url-validator" />
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

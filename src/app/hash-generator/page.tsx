"use client";

import { useState } from "react";
import SEOHead from "@/components/seo/SEOHead";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { generateHash } from "@/lib/tools/hash";
import { copyToClipboard } from "@/lib/utils";

type Algorithm = "SHA-1" | "SHA-256" | "SHA-512";

export default function HashGeneratorPage() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Record<Algorithm, string>>({
    "SHA-1": "",
    "SHA-256": "",
    "SHA-512": "",
  });
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  async function handleGenerate() {
    setError("");
    if (!input.trim()) {
      setError("Please enter text to hash.");
      return;
    }
    try {
      const newResults: Record<Algorithm, string> = {
        "SHA-1": await generateHash(input, "SHA-1"),
        "SHA-256": await generateHash(input, "SHA-256"),
        "SHA-512": await generateHash(input, "SHA-512"),
      };
      setResults(newResults);
    } catch {
      setError("An error occurred while generating hashes.");
    }
  }

  function handleClear() {
    setInput("");
    setResults({ "SHA-1": "", "SHA-256": "", "SHA-512": "" });
    setError("");
  }

  async function handleCopy(algo: Algorithm) {
    if (!results[algo]) return;
    try {
      await copyToClipboard(results[algo]);
      setToast({ message: `${algo} hash copied!`, type: "success" });
    } catch {
      setToast({ message: "Failed to copy", type: "error" });
    }
  }

  return (
    <>
      <SEOHead
        title="Hash Generator - Free Online Tool"
        description="Generate SHA-1, SHA-256, and SHA-512 cryptographic hashes from any text input. Free online hash generator for data integrity and security verification."
        keywords="hash generator, sha256, sha512, sha1, cryptographic hash, online hash tool"
        canonical="https://sudheertools.github.io/hash-generator"
      />
      <ToolLayout
        title="Hash Generator"
        description="Generate cryptographic hash values (SHA-1, SHA-256, SHA-512) from any text input. Useful for data integrity verification, password hashing, and digital signatures."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Hash Generator" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <TextArea
            label="Input Text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to hash..."
            error={error}
          />

          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={handleGenerate}>Generate Hashes</Button>
            <Button variant="ghost" onClick={handleClear}>
              Clear
            </Button>
          </div>

          {Object.values(results).some((v) => v) && (
            <div className="mt-6 space-y-3">
              {(Object.keys(results) as Algorithm[]).map((algo) => (
                results[algo] && (
                  <div key={algo} className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{algo}</span>
                      <p className="font-mono text-xs text-gray-900 dark:text-white break-all">{results[algo]}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(algo)}
                      className="ml-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Copy
                    </button>
                  </div>
                )
              ))}
            </div>
          )}

          {!Object.values(results).some((v) => v) && (
            <div className="mt-6 text-center text-gray-500 dark:text-gray-400">
              Enter text and click "Generate Hashes" to create cryptographic hashes.
            </div>
          )}
        </div>

        <RelatedTools currentSlug="hash-generator" />
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

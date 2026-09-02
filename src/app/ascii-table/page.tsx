"use client";

import { useState, useMemo } from "react";
import SEOHead from "@/components/seo/SEOHead";
import ToolLayout from "@/components/layout/ToolLayout";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { ASCII_TABLE, searchAscii, type AsciiChar } from "@/lib/tools/ascii-table";
import { copyToClipboard } from "@/lib/utils";

export default function AsciiTablePage() {
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return ASCII_TABLE;
    return searchAscii(search);
  }, [search]);

  async function handleCopy(char: AsciiChar) {
    try {
      await copyToClipboard(char.char || char.name);
      setToast({ message: `Copied: ${char.name} (${char.code})`, type: "success" });
    } catch {
      setToast({ message: "Failed to copy", type: "error" });
    }
  }

  return (
    <>
      <SEOHead
        title="ASCII Table - Free Online Reference"
        description="Complete ASCII character table with codes, names, and categories. Search and copy ASCII characters."
        keywords="ascii table, ascii codes, character table, ascii reference, ascii chart"
        canonical="https://sudheertools.github.io/ascii-table"
      />
      <ToolLayout
        title="ASCII Table"
        description="Complete ASCII character reference table with decimal codes, names, and categories. Search and copy characters instantly."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "ASCII Table" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by character, code, or name..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Dec</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Char</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Name</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Category</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((char) => (
                  <tr
                    key={char.code}
                    className="cursor-pointer border-b border-gray-100 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50"
                    onClick={() => handleCopy(char)}
                  >
                    <td className="px-4 py-2 font-mono text-gray-900 dark:text-white">{char.code}</td>
                    <td className="px-4 py-2 font-mono text-lg text-gray-900 dark:text-white">
                      {char.char || <span className="text-gray-400">—</span>}
                    </td>
                    <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{char.name}</td>
                    <td className="px-4 py-2">
                      <span className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                        {char.category}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="py-8 text-center text-gray-500 dark:text-gray-400">
              No characters found matching &quot;{search}&quot;
            </div>
          )}

          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Showing {filtered.length} of 128 characters. Click any row to copy.
          </div>
        </div>

        <RelatedTools currentSlug="ascii-table" />
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

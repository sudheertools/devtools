"use client";

import { useState, useMemo } from "react";
import SEOHead from "@/components/seo/SEOHead";
import ToolLayout from "@/components/layout/ToolLayout";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { HTML_ENTITIES, searchHtmlEntities, type HtmlEntity } from "@/lib/tools/html-entities";
import { copyToClipboard } from "@/lib/utils";

export default function HtmlEntitiesPage() {
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return HTML_ENTITIES;
    return searchHtmlEntities(search);
  }, [search]);

  async function handleCopy(entity: HtmlEntity) {
    try {
      await copyToClipboard(entity.entity);
      setToast({ message: `${entity.name} (${entity.entity}) copied!`, type: "success" });
    } catch {
      setToast({ message: "Failed to copy", type: "error" });
    }
  }

  return (
    <>
      <SEOHead
        title="HTML Entities - Free Online Reference"
        description="Complete list of HTML entities with codes and characters. Search and copy HTML entity codes."
        keywords="html entities, html codes, special characters, html symbols, character entities"
        canonical="https://sudheertools.github.io/html-entities"
      />
      <ToolLayout
        title="HTML Entities"
        description="Complete reference of HTML entities with their codes, characters, and descriptions. Click any entity to copy its code."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "HTML Entities" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, entity code, or character..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((entity) => (
              <button
                key={entity.entity}
                onClick={() => handleCopy(entity)}
                className="flex items-center gap-3 rounded-lg border border-gray-100 p-3 text-left transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50"
              >
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-lg font-bold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                  {entity.code}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium text-gray-900 dark:text-white">{entity.name}</div>
                  <div className="truncate font-mono text-xs text-gray-500 dark:text-gray-400">{entity.entity}</div>
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-8 text-center text-gray-500 dark:text-gray-400">
              No entities found matching &quot;{search}&quot;
            </div>
          )}

          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Showing {filtered.length} entities. Click any entity to copy its code.
          </div>
        </div>

        <RelatedTools currentSlug="html-entities" />
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

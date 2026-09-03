"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolInfo from "@/components/tools/ToolInfo";
import { formatSQL, minifySQL, validateSQL, type SQLDialect } from "@/lib/tools/sql";
import { copyToClipboard } from "@/lib/utils";

export default function SQLFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [dialect, setDialect] = useState<SQLDialect>("standard");
  const [error, setError] = useState("");
  const [validation, setValidation] = useState<{
    valid: boolean;
    errors: string[];
  } | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleFormat() {
    setError("");
    try {
      const result = formatSQL(input, dialect);
      setOutput(result);
      setValidation(validateSQL(input));
    } catch (err) {
      setError((err as Error).message);
      setOutput("");
    }
  }

  function handleMinify() {
    setError("");
    try {
      const result = minifySQL(input);
      setOutput(result);
    } catch (err) {
      setError((err as Error).message);
      setOutput("");
    }
  }

  function handleValidate() {
    const result = validateSQL(input);
    setValidation(result);
    if (result.valid) {
      setToast({ message: "SQL syntax appears valid!", type: "success" });
    } else {
      setToast({ message: result.errors.join(", "), type: "error" });
    }
  }

  function handleClear() {
    setInput("");
    setOutput("");
    setError("");
    setValidation(null);
  }

  async function handleCopy() {
    if (!output) return;
    try {
      await copyToClipboard(output);
      setToast({ message: "Copied to clipboard!", type: "success" });
    } catch {
      setToast({ message: "Failed to copy", type: "error" });
    }
  }

  const infoSections = [
    {
      title: "What is SQL Formatter?",
      content:
        "SQL Formatter is a free online tool that formats and beautifies SQL queries. It makes your SQL code more readable by properly indenting and organizing keywords, clauses, and conditions.",
    },
    {
      title: "How to Use SQL Formatter?",
      content:
        "Paste your SQL query in the input area, select your preferred dialect (Standard, MySQL, PostgreSQL, or SQLite), and click 'Format' to beautify it or 'Minify' to compress it.",
    },
    {
      title: "Supported Dialects",
      content:
        "• Standard SQL - Generic SQL formatting\n• MySQL - Includes MySQL-specific keywords\n• PostgreSQL - Supports PostgreSQL-specific syntax\n• SQLite - SQLite-compatible formatting",
    },
  ];

  return (
    <>
      <ToolLayout
        title="SQL Formatter"
        description="Format, beautify, and validate SQL queries with support for multiple database dialects. Make your SQL code more readable and maintainable."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "SQL Formatter" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Dialect:
              </label>
              <select
                value={dialect}
                onChange={(e) => setDialect(e.target.value as SQLDialect)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="standard">Standard SQL</option>
                <option value="mysql">MySQL</option>
                <option value="postgresql">PostgreSQL</option>
                <option value="sqlite">SQLite</option>
              </select>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <TextArea
              label="Input SQL"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="SELECT * FROM users WHERE id = 1"
              error={error}
            />
            <div className="flex flex-col">
              <TextArea
                label="Output"
                value={output}
                readOnly
                placeholder="Formatted SQL will appear here..."
                className="flex-1"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <Button onClick={handleFormat}>Format</Button>
                <Button onClick={handleMinify}>Minify</Button>
                <Button onClick={handleValidate}>Validate</Button>
                <Button variant="secondary" onClick={handleCopy} disabled={!output}>
                  Copy
                </Button>
                <Button variant="ghost" onClick={handleClear}>
                  Clear
                </Button>
              </div>
            </div>
          </div>

          {validation && (
            <div className={`mt-4 rounded-lg p-3 text-sm ${
              validation.valid
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
            }`}>
              {validation.valid ? (
                <span>SQL syntax appears valid</span>
              ) : (
                <div>
                  <span className="font-medium">Validation errors:</span>
                  <ul className="mt-1 list-disc list-inside">
                    {validation.errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <ToolInfo sections={infoSections} />
        <RelatedTools currentSlug="sql-formatter" />
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

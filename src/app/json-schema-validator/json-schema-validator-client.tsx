"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { validateJsonSchema } from "@/lib/tools/json-schema";

const DEFAULT_SCHEMA = `{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "number", "minimum": 0 },
    "email": { "type": "string" }
  },
  "required": ["name", "age"]
}`;

const DEFAULT_DATA = `{
  "name": "John",
  "age": 30,
  "email": "john@example.com"
}`;

export default function JsonSchemaValidatorPage() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [schema, setSchema] = useState(DEFAULT_SCHEMA);
  const [result, setResult] = useState<{
    valid: boolean;
    errors: { path: string; message: string }[];
  } | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleValidate() {
    if (!data.trim() || !schema.trim()) {
      setToast({ message: "Please enter both data and schema.", type: "error" });
      return;
    }
    const res = validateJsonSchema(data, schema);
    setResult(res);
    if (res.valid) {
      setToast({ message: "Data matches the schema!", type: "success" });
    }
  }

  function handleClear() {
    setData("");
    setSchema("");
    setResult(null);
  }

  return (
    <>
      <ToolLayout
        title="JSON Schema Validator"
        description="Validate JSON data against a JSON Schema definition. Check data types, required fields, constraints, and nested structures."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "JSON Schema Validator" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="grid gap-6 lg:grid-cols-2">
            <TextArea
              label="JSON Data"
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder='{"name": "John", "age": 30}'
            />
            <TextArea
              label="JSON Schema"
              value={schema}
              onChange={(e) => setSchema(e.target.value)}
              placeholder='{"type": "object", "properties": {...}}'
            />
          </div>

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
                <div className="font-medium">✓ Data matches the schema</div>
              ) : (
                <div>
                  <div className="font-medium">✗ Validation failed</div>
                  <ul className="mt-2 list-inside list-disc text-sm opacity-75">
                    {result.errors.map((err, i) => (
                      <li key={i}>
                        {err.path && <span className="font-mono">{err.path}: </span>}
                        {err.message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <RelatedTools currentSlug="json-schema-validator" />
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

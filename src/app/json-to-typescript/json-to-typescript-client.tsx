"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolInfo from "@/components/tools/ToolInfo";
import { copyToClipboard } from "@/lib/utils";

function jsonToTS(obj: Record<string, unknown>, name = "Root", indent = 0): string {
  const pad = "  ".repeat(indent);
  const lines: string[] = [];
  lines.push(`${pad}interface ${name} {`);
  for (const [key, value] of Object.entries(obj)) {
    const optional = value === null || value === undefined;
    const tsType = getTSType(value);
    lines.push(`${pad}  ${key}${optional ? "?" : ""}: ${tsType};`);
  }
  lines.push(`${pad}}`);
  return lines.join("\n");
}

function getTSType(value: unknown): string {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (typeof value === "string") return "string";
  if (typeof value === "number") return Number.isInteger(value) ? "number" : "number";
  if (typeof value === "boolean") return "boolean";
  if (Array.isArray(value)) {
    if (value.length === 0) return "any[]";
    const itemType = getTSType(value[0]);
    return `${itemType}[]`;
  }
  if (typeof value === "object") {
    const keys = Object.keys(value as Record<string, unknown>);
    if (keys.length === 0) return "Record<string, unknown>";
    return jsonToTS(value as Record<string, unknown>, "Item", 0).replace(/^interface Item \{/, "{").replace(/\}$/, "}").trim();
  }
  return "unknown";
}

function generateInterfaces(json: Record<string, unknown>, rootName = "Root"): string {
  const interfaces: string[] = [];
  const queue: Array<{ obj: Record<string, unknown>; name: string; indent: number }> = [
    { obj: json, name: rootName, indent: 0 },
  ];
  while (queue.length > 0) {
    const { obj, name, indent } = queue.shift()!;
    const pad = "  ".repeat(indent);
    const lines: string[] = [];
    lines.push(`${pad}interface ${name} {`);
    for (const [key, value] of Object.entries(obj)) {
      const optional = value === null || value === undefined;
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        const childName = key.charAt(0).toUpperCase() + key.slice(1);
        lines.push(`${pad}  ${key}${optional ? "?" : ""}: ${childName};`);
        queue.push({ obj: value as Record<string, unknown>, name: childName, indent });
      } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object" && value[0] !== null) {
        const childName = key.charAt(0).toUpperCase() + key.slice(1);
        lines.push(`${pad}  ${key}${optional ? "?" : ""}: ${childName}[];`);
        queue.push({ obj: value[0] as Record<string, unknown>, name: childName, indent });
      } else {
        lines.push(`${pad}  ${key}${optional ? "?" : ""}: ${getTSType(value)};`);
      }
    }
    lines.push(`${pad}}`);
    interfaces.push(lines.join("\n"));
  }
  return interfaces.join("\n\n");
}

export default function JSONToTypeScriptPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [rootName, setRootName] = useState("Root");
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  function handleConvert() {
    setError("");
    setOutput("");
    if (!input.trim()) {
      setError("Please enter JSON to convert.");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
        setError("JSON must be an object (not an array or primitive).");
        return;
      }
      const result = generateInterfaces(parsed, rootName);
      setOutput(result);
    } catch {
      setError("Invalid JSON. Please check your input.");
    }
  }

  function handleClear() {
    setInput("");
    setOutput("");
    setError("");
  }

  async function handleCopy() {
    try {
      await copyToClipboard(output);
      setToast({ message: "Copied to clipboard!", type: "success" });
    } catch {
      setToast({ message: "Failed to copy", type: "error" });
    }
  }

  const infoSections = [
    {
      title: "What is JSON to TypeScript?",
      content: "This tool converts JSON data into TypeScript interface definitions. Paste any JSON object and get properly typed interfaces with optional markers for nullable fields.",
    },
    {
      title: "How to use",
      content: "Paste your JSON data in the input field, optionally customize the root interface name, and click Convert. The generated TypeScript interfaces will appear in the output.",
    },
    {
      title: "Features",
      content: (
        <ul className="list-disc space-y-1 pl-5">
          <li>Nested interface generation</li>
          <li>Array type detection</li>
          <li>Optional field markers for null/undefined</li>
          <li>Customizable root interface name</li>
          <li>Type inference for all JSON primitives</li>
        </ul>
      ),
    },
  ];

  return (
    <>
      <ToolLayout
        title="JSON to TypeScript"
        description="Convert JSON data to TypeScript interfaces and types. Paste JSON to generate typed definitions instantly."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "JSON to TypeScript" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Root Interface Name</label>
                <input
                  type="text"
                  value={rootName}
                  onChange={(e) => setRootName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="Root"
                />
              </div>
            </div>
            <TextArea
              label="JSON Input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"name": "John", "age": 30, "active": true}'
              error={error}
            />
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleConvert}>Convert</Button>
              <Button variant="ghost" onClick={handleClear}>Clear</Button>
              {output && <Button variant="ghost" onClick={handleCopy}>Copy</Button>}
            </div>
            {output && (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">TypeScript Output</label>
                <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 font-mono text-sm dark:bg-gray-700">
                  <code className="text-gray-900 dark:text-gray-100">{output}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
        <ToolInfo sections={infoSections} />
        <RelatedTools currentSlug="json-to-typescript" />
      </ToolLayout>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}

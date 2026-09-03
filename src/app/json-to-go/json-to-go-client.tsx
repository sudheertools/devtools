"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolInfo from "@/components/tools/ToolInfo";
import { copyToClipboard } from "@/lib/utils";

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function getGoType(value: unknown): string {
  if (value === null || value === undefined) return "interface{}";
  if (typeof value === "boolean") return "bool";
  if (typeof value === "number") {
    if (Number.isInteger(value)) {
      if (value >= -128 && value <= 127) return "int8";
      if (value >= -32768 && value <= 32767) return "int16";
      if (value >= -2147483648 && value <= 2147483647) return "int32";
      return "int64";
    }
    return "float64";
  }
  if (typeof value === "string") return "string";
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]interface{}";
    return `[]${getGoType(value[0])}`;
  }
  return "interface{}";
}

function jsonToGo(obj: Record<string, unknown>, name = "Root", indent = 0): string {
  const pad = "  ".repeat(indent);
  const lines: string[] = [];
  lines.push(`${pad}type ${name} struct {`);
  for (const [key, value] of Object.entries(obj)) {
    const goName = capitalize(key);
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      const childName = capitalize(key);
      lines.push(`${pad}  ${goName} ${childName} \`json:"${key}"\``);
    } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object" && value[0] !== null) {
      const childName = capitalize(key);
      lines.push(`${pad}  ${goName} []${childName} \`json:"${key}"\``);
    } else {
      lines.push(`${pad}  ${goName} ${getGoType(value)} \`json:"${key}"\``);
    }
  }
  lines.push(`${pad}}`);
  return lines.join("\n");
}

function generateGoStructs(json: Record<string, unknown>, rootName = "Root"): string {
  const structs: string[] = [];
  const queue: Array<{ obj: Record<string, unknown>; name: string }> = [
    { obj: json, name: rootName },
  ];
  while (queue.length > 0) {
    const { obj, name } = queue.shift()!;
    structs.push(jsonToGo(obj, name));
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        queue.push({ obj: value as Record<string, unknown>, name: capitalize(key) });
      } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object" && value[0] !== null) {
        queue.push({ obj: value[0] as Record<string, unknown>, name: capitalize(key) });
      }
    }
  }
  return structs.join("\n\n");
}

export default function JSONToGoPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [rootName, setRootName] = useState("Root");
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  function handleConvert() {
    setError("");
    setOutput("");
    if (!input.trim()) { setError("Please enter JSON to convert."); return; }
    try {
      const parsed = JSON.parse(input);
      if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
        setError("JSON must be an object."); return;
      }
      setOutput(`package main\n\n${generateGoStructs(parsed, rootName)}`);
    } catch { setError("Invalid JSON."); }
  }

  async function handleCopy() {
    try { await copyToClipboard(output); setToast({ message: "Copied!", type: "success" }); }
    catch { setToast({ message: "Failed to copy", type: "error" }); }
  }

  const infoSections = [
    { title: "What is JSON to Go?", content: "Converts JSON data into Go struct definitions with json tags and proper Go types (int64, float64, string, bool, etc.)." },
    { title: "Features", content: (<ul className="list-disc space-y-1 pl-5"><li>Nested struct generation</li><li>Proper Go type mapping</li><li>JSON struct tags</li><li>Array support</li></ul>) },
  ];

  return (
    <>
      <ToolLayout
        title="JSON to Go"
        description="Convert JSON data to Go struct definitions with proper json tags and type mappings."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools", href: "/" }, { label: "JSON to Go" }]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Root Struct Name</label>
              <input type="text" value={rootName} onChange={(e) => setRootName(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100" placeholder="Root" />
            </div>
            <TextArea label="JSON Input" value={input} onChange={(e) => setInput(e.target.value)} placeholder='{"name": "John", "age": 30}' error={error} />
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleConvert}>Convert</Button>
              <Button variant="ghost" onClick={() => { setInput(""); setOutput(""); setError(""); }}>Clear</Button>
              {output && <Button variant="ghost" onClick={handleCopy}>Copy</Button>}
            </div>
            {output && (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Go Output</label>
                <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 font-mono text-sm dark:bg-gray-700"><code className="text-gray-900 dark:text-gray-100">{output}</code></pre>
              </div>
            )}
          </div>
        </div>
        <ToolInfo sections={infoSections} />
        <RelatedTools currentSlug="json-to-go" />
      </ToolLayout>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}

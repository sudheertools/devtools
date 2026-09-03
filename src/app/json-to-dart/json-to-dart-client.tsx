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

function snakeToPascal(s: string) {
  return s.split(/[_-]/).map(capitalize).join("");
}

function getDartType(value: unknown): string {
  if (value === null || value === undefined) return "dynamic";
  if (typeof value === "boolean") return "bool";
  if (typeof value === "number") return Number.isInteger(value) ? "int" : "double";
  if (typeof value === "string") return "String";
  if (Array.isArray(value)) {
    if (value.length === 0) return "List<dynamic>";
    return `List<${getDartType(value[0])}>`;
  }
  return "dynamic";
}

function jsonToDart(obj: Record<string, unknown>, name = "Root"): string {
  const lines: string[] = [];
  lines.push(`class ${name} {`);
  for (const [key, value] of Object.entries(obj)) {
    const dartName = key;
    const dartType = getDartType(value);
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      lines.push(`  final ${snakeToPascal(key)} ${dartName};`);
    } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object" && value[0] !== null) {
      lines.push(`  final List<${snakeToPascal(key)}> ${dartName};`);
    } else {
      lines.push(`  final ${dartType} ${dartName};`);
    }
  }
  lines.push("");
  lines.push(`  ${name}({`);
  for (const key of Object.keys(obj)) {
    lines.push(`    required this.${key},`);
  }
  lines.push(`  });`);
  lines.push("");
  lines.push(`  factory ${name}.fromJson(Map<String, dynamic> json) => ${name}(`);
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      lines.push(`    ${key}: ${snakeToPascal(key)}.fromJson(json['${key}']),`);
    } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object" && value[0] !== null) {
      lines.push(`    ${key}: (json['${key}'] as List).map((e) => ${snakeToPascal(key)}.fromJson(e)).toList(),`);
    } else {
      lines.push(`    ${key}: json['${key}'],`);
    }
  }
  lines.push(`  );`);
  lines.push("");
  lines.push(`  Map<String, dynamic> toJson() => {`);
  for (const key of Object.keys(obj)) {
    lines.push(`    '${key}': ${key},`);
  }
  lines.push(`  };`);
  lines.push(`}`);
  return lines.join("\n");
}

function generateDartClasses(json: Record<string, unknown>, rootName = "Root"): string {
  const classes: string[] = [];
  const queue: Array<{ obj: Record<string, unknown>; name: string }> = [
    { obj: json, name: rootName },
  ];
  while (queue.length > 0) {
    const { obj, name } = queue.shift()!;
    classes.push(jsonToDart(obj, name));
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        queue.push({ obj: value as Record<string, unknown>, name: snakeToPascal(key) });
      } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object" && value[0] !== null) {
        queue.push({ obj: value[0] as Record<string, unknown>, name: snakeToPascal(key) });
      }
    }
  }
  return classes.join("\n\n");
}

export default function JSONToDartPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [rootName, setRootName] = useState("Root");
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  function handleConvert() {
    setError(""); setOutput("");
    if (!input.trim()) { setError("Please enter JSON."); return; }
    try {
      const parsed = JSON.parse(input);
      if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
        setError("JSON must be an object."); return;
      }
      setOutput(generateDartClasses(parsed, rootName));
    } catch { setError("Invalid JSON."); }
  }

  async function handleCopy() {
    try { await copyToClipboard(output); setToast({ message: "Copied!", type: "success" }); }
    catch { setToast({ message: "Failed to copy", type: "error" }); }
  }

  const infoSections = [
    { title: "What is JSON to Dart?", content: "Converts JSON data into Dart classes with fromJson factory constructors and toJson methods for serialization." },
    { title: "Features", content: (<ul className="list-disc space-y-1 pl-5"><li>fromJson/toJson serialization</li><li>Proper Dart type mapping</li><li>Nested class generation</li><li>List support for arrays</li></ul>) },
  ];

  return (
    <>
      <ToolLayout
        title="JSON to Dart"
        description="Convert JSON data to Dart classes with fromJson and toJson methods."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools", href: "/" }, { label: "JSON to Dart" }]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Root Class Name</label>
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
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Dart Output</label>
                <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 font-mono text-sm dark:bg-gray-700"><code className="text-gray-900 dark:text-gray-100">{output}</code></pre>
              </div>
            )}
          </div>
        </div>
        <ToolInfo sections={infoSections} />
        <RelatedTools currentSlug="json-to-dart" />
      </ToolLayout>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}

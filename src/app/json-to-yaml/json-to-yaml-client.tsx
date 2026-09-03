"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolInfo from "@/components/tools/ToolInfo";
import { jsonToYAMLStr, yamlToJSONStr } from "@/lib/tools/yaml";
import { copyToClipboard } from "@/lib/utils";

export default function JSONToYAMLPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [direction, setDirection] = useState<"json-to-yaml" | "yaml-to-json">("json-to-yaml");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleConvert() {
    setError("");
    try {
      const result = direction === "json-to-yaml"
        ? jsonToYAMLStr(input)
        : yamlToJSONStr(input);
      setOutput(result);
    } catch (err) {
      setError((err as Error).message);
      setOutput("");
    }
  }

  function handleClear() {
    setInput("");
    setOutput("");
    setError("");
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

  function handleSwap() {
    setDirection(direction === "json-to-yaml" ? "yaml-to-json" : "json-to-yaml");
    setInput(output);
    setOutput(input);
    setError("");
  }

  const infoSections = [
    {
      title: "What is JSON to YAML Converter?",
      content:
        "JSON to YAML Converter is a free online tool that converts data between JSON and YAML formats. It supports bidirectional conversion, allowing you to easily switch between these popular data serialization formats.",
    },
    {
      title: "How to Use?",
      content:
        "Paste your JSON or YAML in the input area, select the conversion direction, and click 'Convert'. You can swap input/output with the 'Swap' button to convert in the opposite direction.",
    },
    {
      title: "Features",
      content:
        "• Convert JSON to YAML format\n• Convert YAML to JSON format\n• Preserve data structure and types\n• Handle nested objects and arrays\n• Clean, readable output",
    },
  ];

  return (
    <>
      <ToolLayout
        title="JSON to YAML Converter"
        description="Convert data between JSON and YAML formats with a single click. Bidirectional conversion supports both JSON to YAML and YAML to JSON."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "JSON to YAML" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {direction === "json-to-yaml" ? "JSON → YAML" : "YAML → JSON"}
              </span>
            </div>
            <Button variant="secondary" onClick={handleSwap}>
              Swap
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <TextArea
              label={direction === "json-to-yaml" ? "Input JSON" : "Input YAML"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={direction === "json-to-yaml" ? '{"key": "value"}' : "key: value"}
              error={error}
            />
            <div className="flex flex-col">
              <TextArea
                label={direction === "json-to-yaml" ? "Output YAML" : "Output JSON"}
                value={output}
                readOnly
                placeholder="Converted output will appear here..."
                className="flex-1"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <Button onClick={handleConvert}>Convert</Button>
                <Button variant="secondary" onClick={handleCopy} disabled={!output}>
                  Copy
                </Button>
                <Button variant="ghost" onClick={handleClear}>
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </div>

        <ToolInfo sections={infoSections} />
        <RelatedTools currentSlug="json-to-yaml" />
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

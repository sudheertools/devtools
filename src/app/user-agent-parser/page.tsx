"use client";

import { useState } from "react";
import SEOHead from "@/components/seo/SEOHead";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolInfo from "@/components/tools/ToolInfo";
import { parseUserAgent, type UserAgentInfo } from "@/lib/tools/user-agent";
import { copyToClipboard } from "@/lib/utils";

const SAMPLE_UAS = [
  {
    name: "Chrome on Windows",
    ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  },
  {
    name: "Safari on macOS",
    ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",
  },
  {
    name: "Firefox on Linux",
    ua: "Mozilla/5.0 (X11; Linux x86_64; rv:121.0) Gecko/20100101 Firefox/121.0",
  },
  {
    name: "Mobile Safari on iPhone",
    ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1",
  },
];

export default function UserAgentParserPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<UserAgentInfo | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleParse() {
    if (!input.trim()) {
      setToast({ message: "Please enter a User Agent string", type: "error" });
      return;
    }
    const parsed = parseUserAgent(input);
    setResult(parsed);
  }

  function handleClear() {
    setInput("");
    setResult(null);
  }

  function handleSampleSelect(sample: string) {
    setInput(sample);
    const parsed = parseUserAgent(sample);
    setResult(parsed);
  }

  async function handleCopy() {
    if (!result) return;
    try {
      await copyToClipboard(JSON.stringify(result, null, 2));
      setToast({ message: "Copied to clipboard!", type: "success" });
    } catch {
      setToast({ message: "Failed to copy", type: "error" });
    }
  }

  const infoSections = [
    {
      title: "What is User Agent Parser?",
      content:
        "User Agent Parser is a free online tool that parses User Agent strings to extract browser, operating system, and device information. It helps developers understand client capabilities.",
    },
    {
      title: "How to Use?",
      content:
        "Paste a User Agent string in the input area and click 'Parse' to extract the information. You can also click on a sample to auto-fill and parse it.",
    },
    {
      title: "Information Extracted",
      content:
        "• Browser name and version\n• Operating system and version\n• Device type (Desktop, Mobile, Tablet)\n• Rendering engine name and version",
    },
  ];

  return (
    <>
      <SEOHead
        title="User Agent Parser - Free Online Tool"
        description="Parse User Agent strings to extract browser, OS, and device information. Free online user agent parser for developers."
        keywords="user agent parser, ua parser, browser detection, user agent string, device detection"
        canonical="https://sudheertools.github.io/user-agent-parser"
      />
      <ToolLayout
        title="User Agent Parser"
        description="Parse User Agent strings to extract detailed information about browsers, operating systems, and devices."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "User Agent Parser" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Samples:</span>
            {SAMPLE_UAS.map((sample) => (
              <button
                key={sample.name}
                onClick={() => handleSampleSelect(sample.ua)}
                className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                {sample.name}
              </button>
            ))}
          </div>

          <TextArea
            label="User Agent String"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste a User Agent string here..."
          />

          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={handleParse}>Parse</Button>
            <Button variant="secondary" onClick={handleCopy} disabled={!result}>
              Copy JSON
            </Button>
            <Button variant="ghost" onClick={handleClear}>
              Clear
            </Button>
          </div>

          {result && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Browser
                </h3>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {result.browser.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Version: {result.browser.version}
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Operating System
                </h3>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {result.os.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Version: {result.os.version}
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Device
                </h3>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {result.device.type}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Vendor: {result.device.vendor}
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Engine
                </h3>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {result.engine.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Version: {result.engine.version}
                </p>
              </div>
            </div>
          )}
        </div>

        <ToolInfo sections={infoSections} />
        <RelatedTools currentSlug="user-agent-parser" />
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

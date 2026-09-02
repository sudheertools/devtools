"use client";

import { useState, useCallback } from "react";
import SEOHead from "@/components/seo/SEOHead";
import ToolLayout from "@/components/layout/ToolLayout";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { generateBoxShadow, type BoxShadowConfig } from "@/lib/tools/box-shadow";
import { copyToClipboard } from "@/lib/utils";

export default function BoxShadowGeneratorPage() {
  const [config, setConfig] = useState<BoxShadowConfig>({
    offsetX: 0,
    offsetY: 4,
    blur: 6,
    spread: -1,
    color: "rgba(0,0,0,0.1)",
    inset: false,
  });
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const boxShadowCSS = generateBoxShadow(config);

  const updateConfig = useCallback((key: keyof BoxShadowConfig, value: number | string | boolean) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }, []);

  async function handleCopy() {
    try {
      await copyToClipboard(`box-shadow: ${boxShadowCSS};`);
      setToast({ message: "Box shadow CSS copied!", type: "success" });
    } catch {
      setToast({ message: "Failed to copy", type: "error" });
    }
  }

  return (
    <>
      <SEOHead
        title="Box Shadow Generator - Free Online Tool"
        description="Generate CSS box shadows with live preview. Customize offset, blur, spread, color, and inset options."
        keywords="box shadow generator, css box shadow, shadow maker, box shadow css, drop shadow"
        canonical="https://sudheertools.github.io/box-shadow-generator"
      />
      <ToolLayout
        title="Box Shadow Generator"
        description="Generate CSS box shadows with live preview. Customize offset, blur, spread, color, and inset options with instant visual feedback."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Box Shadow Generator" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-6 flex items-center justify-center">
            <div
              className="h-48 w-48 rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-600"
              style={{ boxShadow: boxShadowCSS }}
            />
          </div>

          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Offset X: {config.offsetX}px
              </label>
              <input
                type="range"
                min={-50}
                max={50}
                value={config.offsetX}
                onChange={(e) => updateConfig("offsetX", parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Offset Y: {config.offsetY}px
              </label>
              <input
                type="range"
                min={-50}
                max={50}
                value={config.offsetY}
                onChange={(e) => updateConfig("offsetY", parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Blur: {config.blur}px
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={config.blur}
                onChange={(e) => updateConfig("blur", parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Spread: {config.spread}px
              </label>
              <input
                type="range"
                min={-50}
                max={50}
                value={config.spread}
                onChange={(e) => updateConfig("spread", parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Color
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={config.color}
                  onChange={(e) => updateConfig("color", e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={config.inset}
                  onChange={(e) => updateConfig("inset", e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                Inset shadow
              </label>
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
            <div className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">CSS Code</div>
            <code className="block font-mono text-sm text-gray-900 dark:text-white">
              box-shadow: {boxShadowCSS};
            </code>
            <Button variant="secondary" onClick={handleCopy} className="mt-3">
              Copy CSS
            </Button>
          </div>
        </div>

        <RelatedTools currentSlug="box-shadow-generator" />
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

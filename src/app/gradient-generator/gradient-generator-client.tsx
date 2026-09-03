"use client";

import { useState, useCallback } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { generateGradient, type GradientConfig } from "@/lib/tools/gradient";
import { copyToClipboard } from "@/lib/utils";

export default function GradientGeneratorPage() {
  const [config, setConfig] = useState<GradientConfig>({
    type: "linear",
    angle: 90,
    colors: [
      { color: "#667eea", position: 0 },
      { color: "#764ba2", position: 100 },
    ],
  });
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const gradientCSS = generateGradient(config);

  const addColorStop = useCallback(() => {
    setConfig((prev) => ({
      ...prev,
      colors: [...prev.colors, { color: "#000000", position: 50 }],
    }));
  }, []);

  const removeColorStop = useCallback((index: number) => {
    setConfig((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  }, []);

  const updateColor = useCallback((index: number, color: string) => {
    setConfig((prev) => ({
      ...prev,
      colors: prev.colors.map((c, i) => (i === index ? { ...c, color } : c)),
    }));
  }, []);

  const updatePosition = useCallback((index: number, position: number) => {
    setConfig((prev) => ({
      ...prev,
      colors: prev.colors.map((c, i) => (i === index ? { ...c, position } : c)),
    }));
  }, []);

  async function handleCopy() {
    try {
      await copyToClipboard(`background: ${gradientCSS};`);
      setToast({ message: "Gradient CSS copied!", type: "success" });
    } catch {
      setToast({ message: "Failed to copy", type: "error" });
    }
  }

  return (
    <>
      <ToolLayout
        title="CSS Gradient Generator"
        description="Create beautiful CSS gradients with live preview. Supports linear and radial gradients with multiple color stops."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Gradient Generator" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div
            className="mb-6 h-48 rounded-lg border border-gray-200 dark:border-gray-700"
            style={{ background: gradientCSS }}
          />

          <div className="mb-6 flex gap-2">
            <button
              onClick={() => setConfig((prev) => ({ ...prev, type: "linear" }))}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                config.type === "linear"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              }`}
            >
              Linear
            </button>
            <button
              onClick={() => setConfig((prev) => ({ ...prev, type: "radial" }))}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                config.type === "radial"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              }`}
            >
              Radial
            </button>
          </div>

          {config.type === "linear" && (
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Angle: {config.angle}°
              </label>
              <input
                type="range"
                min={0}
                max={360}
                value={config.angle}
                onChange={(e) => setConfig((prev) => ({ ...prev, angle: parseInt(e.target.value) }))}
                className="w-full"
              />
            </div>
          )}

          <div className="mb-6 space-y-4">
            {config.colors.map((colorStop, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="color"
                  value={colorStop.color}
                  onChange={(e) => updateColor(index, e.target.value)}
                  className="h-10 w-16 cursor-pointer rounded border-0"
                />
                <input
                  type="text"
                  value={colorStop.color}
                  onChange={(e) => updateColor(index, e.target.value)}
                  className="w-28 rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={colorStop.position}
                  onChange={(e) => updatePosition(index, parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="w-12 text-sm text-gray-500 dark:text-gray-400">{colorStop.position}%</span>
                {config.colors.length > 2 && (
                  <button
                    onClick={() => removeColorStop(index)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mb-6 flex gap-2">
            <Button variant="secondary" onClick={addColorStop}>
              Add Color Stop
            </Button>
          </div>

          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
            <div className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">CSS Code</div>
            <code className="block font-mono text-sm text-gray-900 dark:text-white">
              background: {gradientCSS};
            </code>
            <Button variant="secondary" onClick={handleCopy} className="mt-3">
              Copy CSS
            </Button>
          </div>
        </div>

        <RelatedTools currentSlug="gradient-generator" />
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

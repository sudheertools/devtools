"use client";

import { useState, useCallback } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import {
  generateComplementary,
  generateAnalogous,
  generateTriadic,
  generateSplitComplementary,
  generateTetradic,
} from "@/lib/tools/color-palette";
import { copyToClipboard } from "@/lib/utils";

type PaletteType = "complementary" | "analogous" | "triadic" | "split" | "tetradic";

export default function ColorPalettePage() {
  const [baseColor, setBaseColor] = useState("#667eea");
  const [paletteType, setPaletteType] = useState<PaletteType>("complementary");
  const [palette, setPalette] = useState<string[]>([]);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const generatePalette = useCallback(() => {
    switch (paletteType) {
      case "complementary":
        setPalette(generateComplementary(baseColor));
        break;
      case "analogous":
        setPalette(generateAnalogous(baseColor));
        break;
      case "triadic":
        setPalette(generateTriadic(baseColor));
        break;
      case "split":
        setPalette(generateSplitComplementary(baseColor));
        break;
      case "tetradic":
        setPalette(generateTetradic(baseColor));
        break;
    }
  }, [baseColor, paletteType]);

  async function handleCopy(color: string) {
    try {
      await copyToClipboard(color);
      setToast({ message: `${color} copied!`, type: "success" });
    } catch {
      setToast({ message: "Failed to copy", type: "error" });
    }
  }

  return (
    <>
      <ToolLayout
        title="Color Palette Generator"
        description="Generate beautiful color palettes from a base color. Choose from complementary, analogous, triadic, split-complementary, and tetradic schemes."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Color Palette Generator" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-6 flex items-center gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Base Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="h-10 w-16 cursor-pointer rounded border-0"
                />
                <input
                  type="text"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="w-28 rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {([
              { value: "complementary", label: "Complementary" },
              { value: "analogous", label: "Analogous" },
              { value: "triadic", label: "Triadic" },
              { value: "split", label: "Split-Complementary" },
              { value: "tetradic", label: "Tetradic" },
            ] as { value: PaletteType; label: string }[]).map((opt) => (
              <button
                key={opt.value}
                onClick={() => setPaletteType(opt.value)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  paletteType === opt.value
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <Button onClick={generatePalette} className="mb-6">
            Generate Palette
          </Button>

          {palette.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {palette.map((color, index) => (
                <div key={index} className="text-center">
                  <div
                    className="mb-2 h-20 w-20 cursor-pointer rounded-lg border border-gray-200 dark:border-gray-700"
                    style={{ backgroundColor: color }}
                    onClick={() => handleCopy(color)}
                    title={`Click to copy ${color}`}
                  />
                  <button
                    onClick={() => handleCopy(color)}
                    className="font-mono text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    {color}
                  </button>
                </div>
              ))}
            </div>
          )}

          {palette.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400">
              Select a base color and palette type, then click Generate.
            </div>
          )}
        </div>

        <RelatedTools currentSlug="color-palette" />
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

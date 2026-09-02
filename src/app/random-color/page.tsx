"use client";

import { useState, useCallback } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { generateRandomColor, generatePalette, hexToRgb, rgbToHsl } from "@/lib/tools/color";
import { copyToClipboard } from "@/lib/utils";

export default function RandomColorPage() {
  const [colors, setColors] = useState<string[]>([]);
  const [palette, setPalette] = useState<string[]>([]);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleGenerate = useCallback(() => {
    const newColors = Array.from({ length: 6 }, () => generateRandomColor());
    setColors(newColors);
    setPalette([]);
  }, []);

  const handleGeneratePalette = useCallback((baseColor: string) => {
    const newPalette = generatePalette(baseColor);
    setPalette(newPalette);
  }, []);

  async function handleCopy(color: string) {
    try {
      await copyToClipboard(color);
      setToast({ message: `Color ${color} copied!`, type: "success" });
    } catch {
      setToast({ message: "Failed to copy", type: "error" });
    }
  }

  return (
    <>
      <ToolLayout
        title="Random Color Generator"
        description="Generate random colors and color palettes for your designs."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Random Color Generator" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-6">
            <Button onClick={handleGenerate}>Generate Random Colors</Button>
          </div>

          {colors.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {colors.map((color, index) => {
                const rgb = hexToRgb(color);
                const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                return (
                  <div key={index} className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                    <div
                      className="h-24 cursor-pointer"
                      style={{ backgroundColor: color }}
                      onClick={() => handleGeneratePalette(color)}
                      title="Click to generate palette"
                    />
                    <div className="p-3">
                      <div className="font-mono text-sm font-medium text-gray-900 dark:text-white">
                        {color.toUpperCase()}
                      </div>
                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        RGB({rgb.r}, {rgb.g}, {rgb.b})
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        HSL({hsl.h}, {hsl.s}%, {hsl.l}%)
                      </div>
                      <button
                        onClick={() => handleCopy(color)}
                        className="mt-2 text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Copy HEX
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {colors.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400">
              Click "Generate Random Colors" to create random colors. Click a color to generate a palette.
            </div>
          )}

          {palette.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                Color Palette
              </h3>
              <div className="flex flex-wrap gap-2">
                {palette.map((color, index) => (
                  <div
                    key={index}
                    className="group relative cursor-pointer"
                    onClick={() => handleCopy(color)}
                  >
                    <div
                      className="h-12 w-12 rounded-lg border border-gray-200 dark:border-gray-700"
                      style={{ backgroundColor: color }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 text-xs text-white opacity-0 group-hover:opacity-100">
                      {color}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <RelatedTools currentSlug="random-color" />
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

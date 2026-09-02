"use client";

import { useState, useCallback } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from "@/lib/tools/color";
import { copyToClipboard } from "@/lib/utils";

type ColorFormat = "hex" | "rgb" | "hsl";

export default function ColorConverterPage() {
  const [format, setFormat] = useState<ColorFormat>("hex");
  const [hexInput, setHexInput] = useState("#3498db");
  const [r, setR] = useState(52);
  const [g, setG] = useState(152);
  const [b, setB] = useState(219);
  const [h, setH] = useState(204);
  const [s, setS] = useState(70);
  const [l, setL] = useState(53);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const updateFromHex = useCallback((hex: string) => {
    try {
      const rgb = hexToRgb(hex);
      setR(rgb.r);
      setG(rgb.g);
      setB(rgb.b);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setH(hsl.h);
      setS(hsl.s);
      setL(hsl.l);
      setError("");
    } catch {
      setError("Invalid hex color");
    }
  }, []);

  const updateFromRGB = useCallback((r: number, g: number, b: number) => {
    const hex = rgbToHex(r, g, b);
    setHexInput(hex);
    const hsl = rgbToHsl(r, g, b);
    setH(hsl.h);
    setS(hsl.s);
    setL(hsl.l);
    setError("");
  }, []);

  const updateFromHSL = useCallback((h: number, s: number, l: number) => {
    const rgb = hslToRgb(h, s, l);
    setR(rgb.r);
    setG(rgb.g);
    setB(rgb.b);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    setHexInput(hex);
    setError("");
  }, []);

  async function handleCopy(value: string) {
    try {
      await copyToClipboard(value);
      setToast({ message: "Color copied!", type: "success" });
    } catch {
      setToast({ message: "Failed to copy", type: "error" });
    }
  }

  return (
    <>
      <ToolLayout
        title="Color Converter"
        description="Convert between HEX, RGB, and HSL color formats."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Color Converter" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-6 flex gap-2">
            {(["hex", "rgb", "hsl"] as ColorFormat[]).map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`rounded-lg px-4 py-2 text-sm font-medium uppercase transition-colors ${
                  format === f
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              {format === "hex" && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    HEX Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={hexInput}
                      onChange={(e) => {
                        setHexInput(e.target.value);
                        updateFromHex(e.target.value);
                      }}
                      className="h-10 w-16 cursor-pointer rounded border-0"
                    />
                    <input
                      type="text"
                      value={hexInput}
                      onChange={(e) => {
                        setHexInput(e.target.value);
                        updateFromHex(e.target.value);
                      }}
                      placeholder="#000000"
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-mono text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              )}

              {format === "rgb" && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Red: {r}
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={255}
                      value={r}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setR(val);
                        updateFromRGB(val, g, b);
                      }}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Green: {g}
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={255}
                      value={g}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setG(val);
                        updateFromRGB(r, val, b);
                      }}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Blue: {b}
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={255}
                      value={b}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setB(val);
                        updateFromRGB(r, g, val);
                      }}
                      className="w-full"
                    />
                  </div>
                </div>
              )}

              {format === "hsl" && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Hue: {h}°
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={360}
                      value={h}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setH(val);
                        updateFromHSL(val, s, l);
                      }}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Saturation: {s}%
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={s}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setS(val);
                        updateFromHSL(h, val, l);
                      }}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Lightness: {l}%
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={l}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setL(val);
                        updateFromHSL(h, s, val);
                      }}
                      className="w-full"
                    />
                  </div>
                </div>
              )}

              {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
              )}
            </div>

            <div>
              <div className="mb-4">
                <div
                  className="h-32 rounded-lg border border-gray-200 dark:border-gray-700"
                  style={{ backgroundColor: hexInput }}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2 dark:bg-gray-700">
                  <div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">HEX</span>
                    <p className="font-mono text-sm text-gray-900 dark:text-white">{hexInput}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(hexInput)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Copy
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2 dark:bg-gray-700">
                  <div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">RGB</span>
                    <p className="font-mono text-sm text-gray-900 dark:text-white">rgb({r}, {g}, {b})</p>
                  </div>
                  <button
                    onClick={() => handleCopy(`rgb(${r}, ${g}, ${b})`)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Copy
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2 dark:bg-gray-700">
                  <div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">HSL</span>
                    <p className="font-mono text-sm text-gray-900 dark:text-white">hsl({h}, {s}%, {l}%)</p>
                  </div>
                  <button
                    onClick={() => handleCopy(`hsl(${h}, ${s}%, ${l}%)`)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <RelatedTools currentSlug="color-converter" />
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

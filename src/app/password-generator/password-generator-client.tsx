"use client";

import { useState, useCallback } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { generatePassword, calculatePasswordStrength } from "@/lib/tools/password";
import { copyToClipboard } from "@/lib/utils";

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState<{ score: number; label: string; color: string } | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleGenerate = useCallback(() => {
    try {
      const newPassword = generatePassword({ length, uppercase, lowercase, numbers, symbols });
      setPassword(newPassword);
      setStrength(calculatePasswordStrength(newPassword));
    } catch (err) {
      setToast({ message: (err as Error).message, type: "error" });
    }
  }, [length, uppercase, lowercase, numbers, symbols]);

  async function handleCopy() {
    if (!password) return;
    try {
      await copyToClipboard(password);
      setToast({ message: "Password copied to clipboard!", type: "success" });
    } catch {
      setToast({ message: "Failed to copy", type: "error" });
    }
  }

  return (
    <>
      <ToolLayout
        title="Password Generator"
        description="Generate strong, random passwords with customizable options including length, uppercase, lowercase, numbers, and symbols. Includes real-time password strength analysis."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Password Generator" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password Length: {length}
            </label>
            <input
              type="range"
              min={4}
              max={128}
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>4</span>
              <span>128</span>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Uppercase (A-Z)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={lowercase}
                onChange={(e) => setLowercase(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Lowercase (a-z)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={numbers}
                onChange={(e) => setNumbers(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Numbers (0-9)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={symbols}
                onChange={(e) => setSymbols(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Symbols (!@#$)</span>
            </label>
          </div>

          <div className="flex gap-4">
            <Button onClick={handleGenerate}>Generate Password</Button>
            {password && (
              <Button variant="secondary" onClick={handleCopy}>
                Copy Password
              </Button>
            )}
          </div>

          {password && (
            <div className="mt-6">
              <div className="rounded-lg bg-gray-50 p-4 font-mono text-sm break-all dark:bg-gray-700">
                <span className="text-gray-900 dark:text-white">{password}</span>
              </div>

              {strength && (
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">Strength:</span>
                    <span className={`font-medium ${
                      strength.color === "red" ? "text-red-600" :
                      strength.color === "orange" ? "text-orange-600" :
                      strength.color === "yellow" ? "text-yellow-600" :
                      "text-green-600"
                    }`}>
                      {strength.label}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className={`h-2 rounded-full ${
                        strength.color === "red" ? "bg-red-500" :
                        strength.color === "orange" ? "bg-orange-500" :
                        strength.color === "yellow" ? "bg-yellow-500" :
                        "bg-green-500"
                      }`}
                      style={{ width: `${(strength.score / 7) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {strength === null && (
            <div className="mt-6 text-center text-gray-500 dark:text-gray-400">
              Configure options and click "Generate Password" to create a strong password.
            </div>
          )}
        </div>

        <RelatedTools currentSlug="password-generator" />
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

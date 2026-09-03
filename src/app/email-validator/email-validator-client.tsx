"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { validateEmail } from "@/lib/tools/email";

export default function EmailValidatorPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ReturnType<typeof validateEmail> | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleValidate() {
    if (!input.trim()) {
      setToast({ message: "Please enter an email address.", type: "error" });
      return;
    }
    const res = validateEmail(input);
    setResult(res);
    if (res.valid) {
      setToast({ message: "Email is valid!", type: "success" });
    }
  }

  function handleClear() {
    setInput("");
    setResult(null);
  }

  return (
    <>
      <ToolLayout
        title="Email Validator"
        description="Validate email addresses instantly. Check email format, domain, and syntax with detailed error messages."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Email Validator" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="user@example.com"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 font-mono text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            onKeyDown={(e) => e.key === "Enter" && handleValidate()}
          />

          <div className="mt-4 flex gap-2">
            <Button onClick={handleValidate}>Validate</Button>
            <Button variant="ghost" onClick={handleClear}>
              Clear
            </Button>
          </div>

          {result && (
            <div
              className={`mt-4 rounded-lg p-4 ${
                result.valid
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
              }`}
            >
              {result.valid ? (
                <div>
                  <div className="font-medium">✓ Valid Email</div>
                  <div className="mt-2 text-sm opacity-75">
                    Local part: {result.localPart} • Domain: {result.domain}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="font-medium">✗ Invalid Email</div>
                  <ul className="mt-2 list-inside list-disc text-sm opacity-75">
                    {result.errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <RelatedTools currentSlug="email-validator" />
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

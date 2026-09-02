"use client";

import { useState } from "react";
import SEOHead from "@/components/seo/SEOHead";
import ToolLayout from "@/components/layout/ToolLayout";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { validatePhone } from "@/lib/tools/phone";

export default function PhoneValidatorPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ReturnType<typeof validatePhone> | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleValidate() {
    if (!input.trim()) {
      setToast({ message: "Please enter a phone number.", type: "error" });
      return;
    }
    const res = validatePhone(input);
    setResult(res);
    if (res.valid) {
      setToast({ message: "Phone number is valid!", type: "success" });
    }
  }

  function handleClear() {
    setInput("");
    setResult(null);
  }

  return (
    <>
      <SEOHead
        title="Phone Number Validator - Free Online Tool"
        description="Validate phone numbers in international formats. Check phone number format, country code, and national number."
        keywords="phone validator, phone number validator, international phone validator, phone format checker"
        canonical="https://sudheertools.github.io/phone-validator"
      />
      <ToolLayout
        title="Phone Number Validator"
        description="Validate phone numbers and detect their format. Supports international formats, US/Canada numbers, and various phone number styles."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Phone Validator" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone Number
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="+1 (555) 123-4567"
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
                  <div className="font-medium">✓ Valid Phone Number</div>
                  <div className="mt-3 space-y-1 text-sm opacity-75">
                    <div><span className="font-medium">Format:</span> {result.format}</div>
                    <div><span className="font-medium">Normalized:</span> {result.normalized}</div>
                    {result.countryCode && <div><span className="font-medium">Country Code:</span> +{result.countryCode}</div>}
                    <div><span className="font-medium">National Number:</span> {result.nationalNumber}</div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="font-medium">✗ Invalid Phone Number</div>
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

        <RelatedTools currentSlug="phone-validator" />
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

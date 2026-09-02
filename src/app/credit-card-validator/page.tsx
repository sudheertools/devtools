"use client";

import { useState } from "react";
import SEOHead from "@/components/seo/SEOHead";
import ToolLayout from "@/components/layout/ToolLayout";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { validateCreditCard } from "@/lib/tools/credit-card";

export default function CreditCardValidatorPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ReturnType<typeof validateCreditCard> | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleValidate() {
    if (!input.trim()) {
      setToast({ message: "Please enter a credit card number.", type: "error" });
      return;
    }
    const res = validateCreditCard(input);
    setResult(res);
    if (res.valid) {
      setToast({ message: "Credit card number is valid!", type: "success" });
    }
  }

  function handleClear() {
    setInput("");
    setResult(null);
  }

  return (
    <>
      <SEOHead
        title="Credit Card Validator - Free Online Tool"
        description="Validate credit card numbers using the Luhn algorithm. Detect card type (Visa, Mastercard, Amex) and verify number validity."
        keywords="credit card validator, luhn algorithm, card number validator, visa validator, mastercard validator"
        canonical="https://sudheertools.github.io/credit-card-validator"
      />
      <ToolLayout
        title="Credit Card Validator"
        description="Validate credit card numbers using the Luhn algorithm and detect the card type. Supports Visa, Mastercard, American Express, Discover, and more."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Credit Card Validator" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 rounded-lg bg-yellow-50 p-3 text-sm text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            This tool validates card number format only. No data is sent to any server.
          </div>

          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Credit Card Number
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="4242 4242 4242 4242"
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
                  <div className="font-medium">✓ Valid Card Number</div>
                  <div className="mt-3 space-y-1 text-sm opacity-75">
                    <div><span className="font-medium">Card Type:</span> {result.cardType}</div>
                    <div><span className="font-medium">Formatted:</span> {result.formatted}</div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="font-medium">✗ Invalid Card Number</div>
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

        <RelatedTools currentSlug="credit-card-validator" />
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

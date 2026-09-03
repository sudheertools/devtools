"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolInfo from "@/components/tools/ToolInfo";
import { copyToClipboard } from "@/lib/utils";

interface SIPResult {
  totalInvested: number;
  estimatedReturn: number;
  totalWealth: number;
  yearlyBreakdown: { year: number; invested: number; wealth: number; returns: number }[];
}

function calculateSIP(monthly: number, rate: number, years: number): SIPResult {
  const monthlyRate = rate / 12 / 100;
  const months = years * 12;
  const totalInvested = monthly * months;
  const futureValue = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  const estimatedReturn = futureValue - totalInvested;

  const yearlyBreakdown = [];
  let runningWealth = 0;
  for (let y = 1; y <= years; y++) {
    const yearMonths = y * 12;
    const wealth = monthly * ((Math.pow(1 + monthlyRate, yearMonths) - 1) / monthlyRate) * (1 + monthlyRate);
    const invested = monthly * yearMonths;
    yearlyBreakdown.push({
      year: y,
      invested: Math.round(invested),
      wealth: Math.round(wealth),
      returns: Math.round(wealth - invested),
    });
  }

  return {
    totalInvested: Math.round(totalInvested),
    estimatedReturn: Math.round(estimatedReturn),
    totalWealth: Math.round(futureValue),
    yearlyBreakdown,
  };
}

export default function SIPCalculatorPage() {
  const [monthly, setMonthly] = useState("10000");
  const [rate, setRate] = useState("12");
  const [years, setYears] = useState("10");
  const [result, setResult] = useState<SIPResult | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  function handleCalculate() {
    const m = parseFloat(monthly);
    const r = parseFloat(rate);
    const y = parseInt(years);
    if (isNaN(m) || isNaN(r) || isNaN(y) || m <= 0 || r <= 0 || y <= 0) return;
    setResult(calculateSIP(m, r, y));
  }

  async function handleCopy() {
    if (!result) return;
    const text = `SIP Investment Summary\nMonthly: ₹${monthly}\nRate: ${rate}%\nYears: ${years}\n\nTotal Invested: ₹${result.totalInvested.toLocaleString()}\nEstimated Returns: ₹${result.estimatedReturn.toLocaleString()}\nTotal Wealth: ₹${result.totalWealth.toLocaleString()}`;
    try { await copyToClipboard(text); setToast({ message: "Copied!", type: "success" }); }
    catch { setToast({ message: "Failed to copy", type: "error" }); }
  }

  const infoSections = [
    { title: "What is SIP?", content: "Systematic Investment Plan (SIP) allows you to invest a fixed amount regularly in mutual funds. It uses rupee cost averaging and the power of compounding to build wealth over time." },
    { title: "SIP Formula", content: "FV = P × [(1 + r)^n - 1] / r × (1 + r), where P = monthly investment, r = monthly rate of return, n = total months." },
  ];

  return (
    <>
      <ToolLayout
        title="SIP Calculator"
        description="Calculate Systematic Investment Plan (SIP) returns. Estimate your wealth with projected returns over time."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools", href: "/" }, { label: "SIP Calculator" }]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Monthly Investment (₹)</label>
                <input type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100" min={100} step={500} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Expected Return (% p.a.)</label>
                <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100" min={1} max={50} step={0.5} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Time Period (Years)</label>
                <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100" min={1} max={50} />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCalculate}>Calculate</Button>
              {result && <Button variant="ghost" onClick={handleCopy}>Copy Summary</Button>}
            </div>

            {result && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-900/30">
                    <div className="text-sm text-blue-600 dark:text-blue-400">Total Invested</div>
                    <div className="mt-1 text-2xl font-bold text-blue-700 dark:text-blue-300">₹{result.totalInvested.toLocaleString()}</div>
                  </div>
                  <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-900/30">
                    <div className="text-sm text-green-600 dark:text-green-400">Estimated Returns</div>
                    <div className="mt-1 text-2xl font-bold text-green-700 dark:text-green-300">₹{result.estimatedReturn.toLocaleString()}</div>
                  </div>
                  <div className="rounded-lg bg-purple-50 p-4 text-center dark:bg-purple-900/30">
                    <div className="text-sm text-purple-600 dark:text-purple-400">Total Wealth</div>
                    <div className="mt-1 text-2xl font-bold text-purple-700 dark:text-purple-300">₹{result.totalWealth.toLocaleString()}</div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Yearly Breakdown</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-600">
                          <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Year</th>
                          <th className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">Invested</th>
                          <th className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">Wealth</th>
                          <th className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">Returns</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.yearlyBreakdown.map((row) => (
                          <tr key={row.year} className="border-b border-gray-100 dark:border-gray-700">
                            <td className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">{row.year}</td>
                            <td className="px-3 py-2 text-right text-gray-700 dark:text-gray-300">₹{row.invested.toLocaleString()}</td>
                            <td className="px-3 py-2 text-right font-medium text-gray-900 dark:text-gray-100">₹{row.wealth.toLocaleString()}</td>
                            <td className="px-3 py-2 text-right text-green-600 dark:text-green-400">₹{row.returns.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <ToolInfo sections={infoSections} />
        <RelatedTools currentSlug="sip-calculator" />
      </ToolLayout>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}

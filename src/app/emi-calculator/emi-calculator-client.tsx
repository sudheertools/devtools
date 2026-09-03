"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolInfo from "@/components/tools/ToolInfo";
import { copyToClipboard } from "@/lib/utils";

interface EMIResult {
  emi: number;
  totalPayment: number;
  totalInterest: number;
  principal: number;
  interestPercentage: number;
  yearlyBreakdown: { year: number; principal: number; interest: number; balance: number }[];
}

function calculateEMI(principal: number, annualRate: number, months: number): EMIResult {
  const monthlyRate = annualRate / 12 / 100;
  let emi: number;
  if (monthlyRate === 0) {
    emi = principal / months;
  } else {
    emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
  }

  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;

  const yearlyBreakdown = [];
  let balance = principal;
  for (let year = 1; year <= Math.ceil(months / 12); year++) {
    let yearPrincipal = 0;
    let yearInterest = 0;
    for (let m = 0; m < 12 && ((year - 1) * 12 + m) < months; m++) {
      const interest = balance * monthlyRate;
      const principalPaid = emi - interest;
      yearPrincipal += principalPaid;
      yearInterest += interest;
      balance -= principalPaid;
    }
    yearlyBreakdown.push({
      year,
      principal: Math.round(yearPrincipal),
      interest: Math.round(yearInterest),
      balance: Math.max(0, Math.round(balance)),
    });
  }

  return {
    emi: Math.round(emi),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
    principal,
    interestPercentage: Math.round((totalInterest / principal) * 100),
    yearlyBreakdown,
  };
}

export default function EMICalculatorPage() {
  const [principal, setPrincipal] = useState("1000000");
  const [rate, setRate] = useState("8.5");
  const [tenure, setTenure] = useState("20");
  const [result, setResult] = useState<EMIResult | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  function handleCalculate() {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseInt(tenure) * 12;
    if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || r <= 0 || t <= 0) return;
    setResult(calculateEMI(p, r, t));
  }

  async function handleCopy() {
    if (!result) return;
    const text = `Loan EMI Summary\nPrincipal: ₹${principal}\nRate: ${rate}%\nTenure: ${tenure} years\n\nMonthly EMI: ₹${result.emi.toLocaleString()}\nTotal Payment: ₹${result.totalPayment.toLocaleString()}\nTotal Interest: ₹${result.totalInterest.toLocaleString()}`;
    try { await copyToClipboard(text); setToast({ message: "Copied!", type: "success" }); }
    catch { setToast({ message: "Failed to copy", type: "error" }); }
  }

  const infoSections = [
    { title: "What is EMI?", content: "Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender each month. It includes both principal and interest components." },
    { title: "EMI Formula", content: "EMI = P × r × (1 + r)^n / [(1 + r)^n - 1], where P = principal, r = monthly interest rate, n = total months." },
  ];

  return (
    <>
      <ToolLayout
        title="EMI Calculator"
        description="Calculate Equated Monthly Installments (EMI) for home loans, car loans, or personal loans."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools", href: "/" }, { label: "EMI Calculator" }]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Loan Amount (₹)</label>
                <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100" min={1000} step={10000} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Interest Rate (% p.a.)</label>
                <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100" min={0.1} max={50} step={0.1} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Tenure (Years)</label>
                <input type="number" value={tenure} onChange={(e) => setTenure(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100" min={1} max={50} />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCalculate}>Calculate</Button>
              {result && <Button variant="ghost" onClick={handleCopy}>Copy Summary</Button>}
            </div>

            {result && (
              <div className="space-y-4">
                <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-6 text-center dark:from-blue-900/20 dark:to-purple-900/20">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Monthly EMI</div>
                  <div className="mt-1 text-4xl font-bold text-blue-700 dark:text-blue-300">₹{result.emi.toLocaleString()}</div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg bg-gray-50 p-4 text-center dark:bg-gray-700">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Principal Amount</div>
                    <div className="mt-1 text-lg font-bold text-gray-900 dark:text-gray-100">₹{result.principal.toLocaleString()}</div>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4 text-center dark:bg-gray-700">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Interest</div>
                    <div className="mt-1 text-lg font-bold text-orange-600 dark:text-orange-400">₹{result.totalInterest.toLocaleString()}</div>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4 text-center dark:bg-gray-700">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Payment</div>
                    <div className="mt-1 text-lg font-bold text-gray-900 dark:text-gray-100">₹{result.totalPayment.toLocaleString()}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-4 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
                    <div className="h-full bg-blue-500" style={{ width: `${100 - result.interestPercentage}%` }} />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{100 - result.interestPercentage}% Principal</span>
                  <div className="h-4 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
                    <div className="h-full bg-orange-500" style={{ width: `${result.interestPercentage}%` }} />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{result.interestPercentage}% Interest</span>
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Yearly Breakdown</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-600">
                          <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Year</th>
                          <th className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">Principal</th>
                          <th className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">Interest</th>
                          <th className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.yearlyBreakdown.map((row) => (
                          <tr key={row.year} className="border-b border-gray-100 dark:border-gray-700">
                            <td className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">{row.year}</td>
                            <td className="px-3 py-2 text-right text-blue-600 dark:text-blue-400">₹{row.principal.toLocaleString()}</td>
                            <td className="px-3 py-2 text-right text-orange-600 dark:text-orange-400">₹{row.interest.toLocaleString()}</td>
                            <td className="px-3 py-2 text-right text-gray-700 dark:text-gray-300">₹{row.balance.toLocaleString()}</td>
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
        <RelatedTools currentSlug="emi-calculator" />
      </ToolLayout>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}

import type { Metadata } from "next";
import EmiCalculatorPage from "./emi-calculator-client";

export const metadata: Metadata = {
  title: "EMI Calculator - Free Online Tool",
  description: "Calculate Equated Monthly Installments for home, car, or personal loans. Free, fast, and private. All processing happens in your browser.",
  keywords: "emi calculator, free emi calculator, emi calculator online, fintech tools, developer tools",
  openGraph: {
    title: "EMI Calculator - Free Online Tool",
    description: "Calculate Equated Monthly Installments for home, car, or personal loans. Free, fast, and private. All processing happens in your browser.",
    url: "https://sudheertools.github.io/emi-calculator",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EMI Calculator - Free Online Tool",
    description: "Calculate Equated Monthly Installments for home, car, or personal loans. Free, fast, and private. All processing happens in your browser.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/emi-calculator",
  },
};

export default function Page() {
  return <EmiCalculatorPage />;
}

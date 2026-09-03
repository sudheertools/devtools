import type { Metadata } from "next";
import SipCalculatorPage from "./sip-calculator-client";

export const metadata: Metadata = {
  title: "SIP Calculator - Free Online Tool",
  description: "Calculate Systematic Investment Plan returns with projected wealth. Free, fast, and private. All processing happens in your browser.",
  keywords: "sip calculator, free sip calculator, sip calculator online, fintech tools, developer tools",
  openGraph: {
    title: "SIP Calculator - Free Online Tool",
    description: "Calculate Systematic Investment Plan returns with projected wealth. Free, fast, and private. All processing happens in your browser.",
    url: "https://sudheertools.github.io/sip-calculator",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SIP Calculator - Free Online Tool",
    description: "Calculate Systematic Investment Plan returns with projected wealth. Free, fast, and private. All processing happens in your browser.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/sip-calculator",
  },
};

export default function Page() {
  return <SipCalculatorPage />;
}

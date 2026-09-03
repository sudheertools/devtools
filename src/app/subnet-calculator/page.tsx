import type { Metadata } from "next";
import SubnetCalculatorPage from "./subnet-calculator-client";

export const metadata: Metadata = {
  title: "Subnet Calculator - Free Online Tool",
  description: "Calculate subnet ranges, CIDR notation, and IP address information. Free, fast, and private. All processing happens in your browser.",
  keywords: "subnet calculator, free subnet calculator, subnet calculator online, network tools, developer tools",
  openGraph: {
    title: "Subnet Calculator - Free Online Tool",
    description: "Calculate subnet ranges, CIDR notation, and IP address information. Free, fast, and private. All processing happens in your browser.",
    url: "https://sudheertools.github.io/subnet-calculator",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Subnet Calculator - Free Online Tool",
    description: "Calculate subnet ranges, CIDR notation, and IP address information. Free, fast, and private. All processing happens in your browser.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/subnet-calculator",
  },
};

export default function Page() {
  return <SubnetCalculatorPage />;
}

import type { Metadata } from "next";
import CreditCardValidatorPage from "./credit-card-validator-client";

export const metadata: Metadata = {
  title: "Credit Card Validator - Free Online Tool",
  description: "Validate credit card numbers using the Luhn algorithm. Detect card type (Visa, Mastercard, Amex) and verify number validity.",
  keywords: "credit card validator online, free credit card validator, credit card validator tool, credit card validator browser, validation tools, validate credit card, credit card validator check",
  openGraph: {
    title: "Credit Card Validator - Free Online Tool",
    description: "Validate credit card numbers using the Luhn algorithm. Detect card type (Visa, Mastercard, Amex) and verify number validity.",
    url: "https://sudheertools.github.io/credit-card-validator",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Credit Card Validator - Free Online Tool",
    description: "Validate credit card numbers using the Luhn algorithm. Detect card type (Visa, Mastercard, Amex) and verify number validity.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/credit-card-validator",
  },
};

export default function Page() {
  return <CreditCardValidatorPage />;
}

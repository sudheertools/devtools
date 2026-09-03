import type { Metadata } from "next";
import PhoneValidatorPage from "./phone-validator-client";

export const metadata: Metadata = {
  title: "Phone Number Validator - Free Online Tool",
  description: "Validate phone numbers in international formats. Check phone number format, country code, and national number.",
  keywords: "phone number validator online, free phone number validator, phone number validator tool, phone number validator browser, validation tools, validate phone number, phone number validator check",
  openGraph: {
    title: "Phone Number Validator - Free Online Tool",
    description: "Validate phone numbers in international formats. Check phone number format, country code, and national number.",
    url: "https://sudheertools.github.io/phone-validator",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phone Number Validator - Free Online Tool",
    description: "Validate phone numbers in international formats. Check phone number format, country code, and national number.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/phone-validator",
  },
};

export default function Page() {
  return <PhoneValidatorPage />;
}

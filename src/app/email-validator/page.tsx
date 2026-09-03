import type { Metadata } from "next";
import EmailValidatorPage from "./email-validator-client";

export const metadata: Metadata = {
  title: "Email Validator - Free Online Tool",
  description: "Validate email addresses instantly. Check email format, domain, and syntax with our free online email validator.",
  keywords: "email validator online, free email validator, email validator tool, email validator browser, validation tools, validate email, email validator check",
  openGraph: {
    title: "Email Validator - Free Online Tool",
    description: "Validate email addresses instantly. Check email format, domain, and syntax with our free online email validator.",
    url: "https://sudheertools.github.io/email-validator",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Email Validator - Free Online Tool",
    description: "Validate email addresses instantly. Check email format, domain, and syntax with our free online email validator.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/email-validator",
  },
};

export default function Page() {
  return <EmailValidatorPage />;
}

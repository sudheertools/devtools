import type { Metadata } from "next";
import PasswordGeneratorPage from "./password-generator-client";

export const metadata: Metadata = {
  title: "Password Generator - Free Online Tool",
  description: "Generate strong, random passwords with customizable length and character options. Free online password generator with strength indicator for secure passwords.",
  keywords: "password generator online, free password generator, password generator tool, password generator browser, generation tools, generate password, random password",
  openGraph: {
    title: "Password Generator - Free Online Tool",
    description: "Generate strong, random passwords with customizable length and character options. Free online password generator with strength indicator for secure passwords.",
    url: "https://sudheertools.github.io/password-generator",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Password Generator - Free Online Tool",
    description: "Generate strong, random passwords with customizable length and character options. Free online password generator with strength indicator for secure passwords.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/password-generator",
  },
};

export default function Page() {
  return <PasswordGeneratorPage />;
}

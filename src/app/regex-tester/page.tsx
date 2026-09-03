import type { Metadata } from "next";
import RegexTesterPage from "./regex-tester-client";

export const metadata: Metadata = {
  title: "Regex Tester - Free Online Tool",
  description: "Test regular expressions with live matching, highlighting, and capture groups. Free online regex tester for JavaScript, Python, and other languages.",
  keywords: "regex tester online, free regex tester, regex tester tool, regex tester browser, utility tools",
  openGraph: {
    title: "Regex Tester - Free Online Tool",
    description: "Test regular expressions with live matching, highlighting, and capture groups. Free online regex tester for JavaScript, Python, and other languages.",
    url: "https://sudheertools.github.io/regex-tester",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Regex Tester - Free Online Tool",
    description: "Test regular expressions with live matching, highlighting, and capture groups. Free online regex tester for JavaScript, Python, and other languages.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/regex-tester",
  },
};

export default function Page() {
  return <RegexTesterPage />;
}

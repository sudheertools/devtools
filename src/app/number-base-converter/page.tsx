import type { Metadata } from "next";
import NumberBaseConverterPage from "./number-base-converter-client";

export const metadata: Metadata = {
  title: "Number Base Converter - Free Online Tool",
  description: "Convert numbers between Binary, Octal, Decimal, and Hexadecimal instantly. Free online number base converter for developers and students.",
  keywords: "number base converter online, free number base converter, number base converter tool, number base converter browser, conversion tools, convert number base, number base converter online",
  openGraph: {
    title: "Number Base Converter - Free Online Tool",
    description: "Convert numbers between Binary, Octal, Decimal, and Hexadecimal instantly. Free online number base converter for developers and students.",
    url: "https://sudheertools.github.io/number-base-converter",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Number Base Converter - Free Online Tool",
    description: "Convert numbers between Binary, Octal, Decimal, and Hexadecimal instantly. Free online number base converter for developers and students.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/number-base-converter",
  },
};

export default function Page() {
  return <NumberBaseConverterPage />;
}

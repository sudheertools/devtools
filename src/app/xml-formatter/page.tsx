import type { Metadata } from "next";
import XMLFormatterPage from "./xml-formatter-client";

export const metadata: Metadata = {
  title: "XML Formatter - Free Online Tool",
  description: "Format, validate, minify, and pretty-print XML documents online. Free XML formatter with customizable indentation and error reporting.",
  keywords: "xml formatter online, free xml formatter, xml formatter tool, xml formatter browser, formatting tools, format xml, beautify xml",
  openGraph: {
    title: "XML Formatter - Free Online Tool",
    description: "Format, validate, minify, and pretty-print XML documents online. Free XML formatter with customizable indentation and error reporting.",
    url: "https://sudheertools.github.io/xml-formatter",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "XML Formatter - Free Online Tool",
    description: "Format, validate, minify, and pretty-print XML documents online. Free XML formatter with customizable indentation and error reporting.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/xml-formatter",
  },
};

export default function Page() {
  return <XMLFormatterPage />;
}

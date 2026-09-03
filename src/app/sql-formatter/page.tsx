import type { Metadata } from "next";
import SQLFormatterPage from "./sql-formatter-client";

export const metadata: Metadata = {
  title: "SQL Formatter - Free Online Tool",
  description: "Format and beautify SQL queries online. Free SQL formatter supporting MySQL, PostgreSQL, and SQLite dialects with syntax validation.",
  keywords: "sql formatter online, free sql formatter, sql formatter tool, sql formatter browser, formatting tools, format sql, beautify sql",
  openGraph: {
    title: "SQL Formatter - Free Online Tool",
    description: "Format and beautify SQL queries online. Free SQL formatter supporting MySQL, PostgreSQL, and SQLite dialects with syntax validation.",
    url: "https://sudheertools.github.io/sql-formatter",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SQL Formatter - Free Online Tool",
    description: "Format and beautify SQL queries online. Free SQL formatter supporting MySQL, PostgreSQL, and SQLite dialects with syntax validation.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/sql-formatter",
  },
};

export default function Page() {
  return <SQLFormatterPage />;
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Test Regular Expressions — A Complete Guide",
  description:
    "Learn how regular expressions work, common patterns for validation and extraction, and how to test regex live in your browser.",
  alternates: {
    canonical: "https://sudheertools.github.io/guides/regex-testing",
  },
  openGraph: {
    title: "How to Test Regular Expressions — Complete Guide",
    description:
      "Learn how regex works, common patterns, and how to test them live.",
    url: "https://sudheertools.github.io/guides/regex-testing",
  },
};

export default function RegexTestingGuide() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
      <nav className="mb-8 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>Guides</span>
        <span className="mx-2">/</span>
        <span>Regex Testing</span>
      </nav>

      <article>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          How to Test Regular Expressions
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          A practical guide to writing and testing regular expressions.
        </p>

        <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What is Regex?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Regular expressions (regex) are patterns used to match character
            combinations in strings. They&apos;re used for validation,
            extraction, search, and replace operations across virtually every
            programming language.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Common Patterns
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              <strong>Email:</strong>{" "}
              <code>/^[^\s@]+@[^\s@]+\.[^\s@]+$/</code>
            </li>
            <li>
              <strong>Phone (US):</strong>{" "}
              <code>/^\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/</code>
            </li>
            <li>
              <strong>URL:</strong>{" "}
              <code>/^https?:\/\/[^\s/$.?#].[^\s]*$/</code>
            </li>
            <li>
              <strong>IPv4:</strong>{" "}
              <code>/^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(...)$/</code>
            </li>
            <li>
              <strong>Date (YYYY-MM-DD):</strong>{" "}
              <code>/^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/</code>
            </li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Testing Strategy
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            When writing regex, always test with:
          </p>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              <strong>Valid inputs:</strong> Ensure matches work correctly.
            </li>
            <li>
              <strong>Invalid inputs:</strong> Ensure non-matches are rejected.
            </li>
            <li>
              <strong>Edge cases:</strong> Empty strings, very long strings,
              special characters.
            </li>
            <li>
              <strong>Boundary conditions:</strong> Strings that are one
              character too short or too long.
            </li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Try It Yourself
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Use our free{" "}
            <Link
              href="/regex-tester"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              Regex Tester
            </Link>{" "}
            to test regular expressions live. Paste your pattern and test string,
            and see real-time match results — entirely in your browser.
          </p>
        </div>
      </article>

      <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
        <Link
          href="/"
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          &larr; Back to all tools
        </Link>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Format JSON — A Complete Guide",
  description:
    "Learn how to format, validate, and beautify JSON data. Understand JSON structure, common errors, and how to fix malformed JSON quickly.",
  alternates: {
    canonical: "https://sudheertools.github.io/guides/json-formatting",
  },
  openGraph: {
    title: "How to Format JSON — Complete Guide",
    description:
      "Learn how to format, validate, and beautify JSON data with practical examples.",
    url: "https://sudheertools.github.io/guides/json-formatting",
  },
};

export default function JsonFormattingGuide() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
      <nav className="mb-8 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>Guides</span>
        <span className="mx-2">/</span>
        <span>JSON Formatting</span>
      </nav>

      <article>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          How to Format JSON
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          A complete guide to formatting, validating, and beautifying JSON data
          — from basics to common pitfalls.
        </p>

        <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What is JSON?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            JSON (JavaScript Object Notation) is a lightweight data interchange
            format. It&apos;s easy for humans to read and write, and easy for
            machines to parse and generate. JSON is the most common format for
            APIs, configuration files, and data storage.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Why Format JSON?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Raw JSON from APIs is often minified (no whitespace) for efficiency.
            Formatting makes it readable by adding proper indentation and
            line breaks. This is essential for:
          </p>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>Debugging API responses</li>
            <li>Reviewing configuration files</li>
            <li>Logging and monitoring output</li>
            <li>Manual inspection of nested data</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            JSON Structure Basics
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            JSON has six data types:
          </p>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              <strong>Object:</strong> <code>{'{"key": "value"}'}</code>
            </li>
            <li>
              <strong>Array:</strong> <code>[1, 2, 3]</code>
            </li>
            <li>
              <strong>String:</strong> <code>&quot;hello&quot;</code>
            </li>
            <li>
              <strong>Number:</strong> <code>42</code> or <code>3.14</code>
            </li>
            <li>
              <strong>Boolean:</strong> <code>true</code> or <code>false</code>
            </li>
            <li>
              <strong>Null:</strong> <code>null</code>
            </li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Common JSON Errors
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              <strong>Trailing commas:</strong> <code>{'[1, 2, 3,]'}</code> is
              invalid. Remove the last comma.
            </li>
            <li>
              <strong>Unquoted keys:</strong>{" "}
              <code>{'{name: "value"}'}</code> is invalid. Keys must be
              double-quoted.
            </li>
            <li>
              <strong>Single quotes:</strong>{" "}
              <code>{'{\'key\': \'value\'}'}</code> is invalid. Use double
              quotes.
            </li>
            <li>
              <strong>Comments:</strong> JSON does not support comments. Remove{" "}
              <code>//</code> or <code>/* */</code> blocks.
            </li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Try It Yourself
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Use our free{" "}
            <Link
              href="/json-formatter"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              JSON Formatter
            </Link>{" "}
            to instantly format, validate, and beautify any JSON data. Paste
            your JSON and get a formatted result in milliseconds — entirely in
            your browser.
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

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How UUIDs Work — A Complete Guide to UUID Generation",
  description:
    "Learn how UUIDs work, the difference between UUID v4 and v7, when to use each version, and how to generate them securely in your browser.",
  alternates: {
    canonical: "https://sudheertools.github.io/guides/uuid-generation",
  },
  openGraph: {
    title: "How UUIDs Work — Complete Guide",
    description:
      "Learn how UUIDs work, the difference between v4 and v7, and when to use each.",
    url: "https://sudheertools.github.io/guides/uuid-generation",
  },
};

export default function UuidGenerationGuide() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
      <nav className="mb-8 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>Guides</span>
        <span className="mx-2">/</span>
        <span>UUID Generation</span>
      </nav>

      <article>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          How UUIDs Work
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          A complete guide to Universally Unique Identifiers and how to generate
          them.
        </p>

        <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What is a UUID?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            A UUID (Universally Unique Identifier) is a 128-bit identifier
            defined in RFC 4122. It&apos;s formatted as 32 hexadecimal characters
            in 5 hyphen-separated groups:{" "}
            <code>550e8400-e29b-41d4-a716-446655440000</code>.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            UUID Versions
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              <strong>UUID v4:</strong> Random. Most commonly used. 122 random
              bits. Collision probability is negligible for most use cases.
            </li>
            <li>
              <strong>UUID v1:</strong> Timestamp + MAC address. Rarely used
              today due to privacy concerns (exposes MAC address).
            </li>
            <li>
              <strong>UUID v7:</strong> Timestamp-first. Newer standard that
              combines time-ordered sorting with random bits. Ideal for database
              primary keys.
            </li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            When to Use UUIDs
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>Database primary keys (avoids sequential ID guessing)</li>
            <li>API resource identifiers</li>
            <li>Session tokens</li>
            <li>Transaction IDs</li>
            <li>Distributed system identifiers</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            UUID v4 vs v7
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            UUID v4 is random and globally unique. UUID v7 is time-ordered,
            meaning UUIDs generated close together will sort correctly in
            databases. Use v4 for general purposes; use v7 when you need
            time-ordered IDs for database indexing.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Try It Yourself
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Use our free{" "}
            <Link
              href="/uuid-generator"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              UUID Generator
            </Link>{" "}
            to generate UUID v4 identifiers instantly — entirely in your
            browser using the Web Crypto API for secure randomness.
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

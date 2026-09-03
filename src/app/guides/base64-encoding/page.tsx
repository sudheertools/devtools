import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How Base64 Encoding Works — A Complete Guide",
  description:
    "Learn how Base64 encoding works, when to use it, and the difference between Base64 and Base64URL. Includes practical examples and common use cases.",
  alternates: {
    canonical: "https://sudheertools.github.io/guides/base64-encoding",
  },
  openGraph: {
    title: "How Base64 Encoding Works — Complete Guide",
    description:
      "Learn how Base64 encoding works, when to use it, and common use cases.",
    url: "https://sudheertools.github.io/guides/base64-encoding",
  },
};

export default function Base64EncodingGuide() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
      <nav className="mb-8 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>Guides</span>
        <span className="mx-2">/</span>
        <span>Base64 Encoding</span>
      </nav>

      <article>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          How Base64 Encoding Works
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          A complete guide to Base64 encoding, decoding, and real-world use
          cases.
        </p>

        <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What is Base64?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Base64 is a binary-to-text encoding scheme that represents binary
            data as an ASCII string using 64 characters: A-Z, a-z, 0-9, +, and
            /. It&apos;s defined in{" "}
            <a
              href="https://datatracker.ietf.org/doc/html/rfc4648"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              RFC 4648
            </a>
            .
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            When to Use Base64
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>Embedding images in HTML/CSS (data URIs)</li>
            <li>Encoding binary data in JSON or XML</li>
            <li>Email attachments (MIME)</li>
            <li>Storing complex data in URLs</li>
            <li>Encoding credentials in HTTP Basic Auth</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Base64 vs Base64URL
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Base64URL is a URL-safe variant that replaces <code>+</code> with{" "}
            <code>-</code> and <code>/</code> with <code>_</code>, and omits
            padding. Use Base64URL when encoding data for URLs (like JWT
            tokens).
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Common Pitfalls
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              <strong>Not encoding:</strong> Base64 is NOT encryption. It&apos;s
              reversible. Never use it to hide sensitive data.
            </li>
            <li>
              <strong>Padding:</strong> Standard Base64 uses = padding. Some
              implementations strip padding — be aware of this.
            </li>
            <li>
              <strong>Unicode:</strong> Encode Unicode strings as UTF-8 first,
              then Base64-encode the bytes.
            </li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Try It Yourself
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Use our free{" "}
            <Link
              href="/base64-encode"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              Base64 Encoder
            </Link>{" "}
            and{" "}
            <Link
              href="/base64-decode"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              Base64 Decoder
            </Link>{" "}
            to encode and decode any text or data — entirely in your browser.
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

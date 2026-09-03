import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Decode JWT Tokens — A Complete Guide",
  description:
    "Learn how JWT tokens work, how to decode them, and what each header, payload, and signature field means. Practical examples included.",
  alternates: {
    canonical: "https://sudheertools.github.io/guides/jwt-decoding",
  },
  openGraph: {
    title: "How to Decode JWT Tokens — Complete Guide",
    description:
      "Learn how JWT tokens work, how to decode them, and what each field means.",
    url: "https://sudheertools.github.io/guides/jwt-decoding",
  },
};

export default function JwtDecodingGuide() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
      <nav className="mb-8 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>Guides</span>
        <span className="mx-2">/</span>
        <span>JWT Decoding</span>
      </nav>

      <article>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          How to Decode JWT Tokens
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          A practical guide to understanding and decoding JSON Web Tokens.
        </p>

        <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What is a JWT?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            A JSON Web Token (JWT) is a compact, URL-safe means of transmitting
            information between two parties as a JSON object. JWTs are commonly
            used for authentication and authorization in web applications.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            JWT Structure
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            A JWT consists of three parts separated by dots:
          </p>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              <strong>Header:</strong> Contains the algorithm (e.g., HS256) and
              token type.
            </li>
            <li>
              <strong>Payload:</strong> Contains the claims (user ID,
              expiration, roles, etc.).
            </li>
            <li>
              <strong>Signature:</strong> Verifies the token wasn&apos;t
              tampered with.
            </li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400">
            Example: <code>eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiAxMjM0fQ.abc123</code>
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            How to Decode
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            The header and payload are Base64URL-encoded (not encrypted). To
            decode them, simply base64-decode the first two parts. The signature
            cannot be decoded — it&apos;s used for verification.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Common payload claims include:
          </p>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              <code>sub</code> — Subject (who the token is about)
            </li>
            <li>
              <code>exp</code> — Expiration time (Unix timestamp)
            </li>
            <li>
              <code>iat</code> — Issued at time
            </li>
            <li>
              <code>roles</code> — User roles or permissions
            </li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Security Note
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Decoding a JWT does NOT verify its signature. Anyone can decode a
            JWT — the signature ensures the token was issued by a trusted source
            and hasn&apos;t been modified. Always verify tokens on your server.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Try It Yourself
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Use our free{" "}
            <Link
              href="/jwt-decoder"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              JWT Decoder
            </Link>{" "}
            to instantly decode any JWT token. Paste your token and see the
            header, payload, and expiration — entirely in your browser, no
            data uploaded.
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

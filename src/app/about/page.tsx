import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About DevTools — Why We Built Private Browser-Based Developer Tools",
  description:
    "Learn why DevTools was built: free, private, browser-based developer tools that never send your data to a server. Built by developers, for developers.",
  alternates: {
    canonical: "https://sudheertools.github.io/about",
  },
  openGraph: {
    title: "About DevTools — Private Browser-Based Developer Tools",
    description:
      "Free, private developer tools that run entirely in your browser. No data leaves your device.",
    url: "https://sudheertools.github.io/about",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        About DevTools
      </h1>

      <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          DevTools is a collection of {new Date().getFullYear() === 2026 ? "69" : "69"} free,
          browser-based developer tools built for one reason: your data should
          never leave your device.
        </p>

        <div className="not-prose mt-6 rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
              SK
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Sudheer Kumar
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Developer &amp; Creator of DevTools
              </p>
              <div className="mt-2 flex gap-3">
                <a
                  href="https://github.com/sudheertools"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/sudheerkumargv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.youtube.com/@TestingWithSudheer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>

        <h2 className="mt-10 text-2xl font-bold text-gray-900 dark:text-white">
          Why This Exists
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Most online developer tools send your data to their servers for
          processing. That&apos;s fine for a public JSON object — but what about
          API keys, JWT tokens, proprietary code, or customer data? You shouldn&apos;t
          have to trust a stranger&apos;s server to format your JSON.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          DevTools solves this by running every tool entirely in your browser
          using client-side JavaScript and the Web Crypto API. Your data never
          touches a server. You can verify this by opening your browser&apos;s
          DevTools Network tab — you&apos;ll see zero outgoing requests.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-gray-900 dark:text-white">
          How It Works
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Every tool is a static web page built with Next.js and React. When you
          paste data into a tool, the processing happens entirely in your
          browser&apos;s JavaScript engine. No data is transmitted over the
          network.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          For cryptographic operations (hashing, password generation), we use the
          browser&apos;s built-in{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Web Crypto API
          </a>
          , which implements the same algorithms you&apos;d find in OpenSSL or
          hashlib — but runs entirely on your device.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-gray-900 dark:text-white">
          Who It&apos;s For
        </h2>
        <ul className="text-gray-600 dark:text-gray-400">
          <li>
            <strong>Developers</strong> who need to quickly format JSON, test
            regex, decode JWTs, or encode Base64 without opening a heavy IDE.
          </li>
          <li>
            <strong>DevOps engineers</strong> who need to generate Dockerfiles,
            Terraform configs, or calculate subnet masks on the fly.
          </li>
          <li>
            <strong>Security-conscious professionals</strong> who can&apos;t
            paste sensitive data into third-party tools.
          </li>
          <li>
            <strong>Students and educators</strong> who want to demonstrate how
            encoding, hashing, and validation work.
          </li>
        </ul>

        <h2 className="mt-10 text-2xl font-bold text-gray-900 dark:text-white">
          Open Source
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Every tool&apos;s source code is visible in your browser. You can view
          the page source, inspect the JavaScript, and verify that no data is
          sent anywhere. The{" "}
          <a
            href="https://github.com/sudheertools/sudheertools.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            source code on GitHub
          </a>{" "}
          is also fully auditable.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-gray-900 dark:text-white">
          Contact
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Have a question, suggestion, or bug report? Open an issue on{" "}
          <a
            href="https://github.com/sudheertools/sudheertools.github.io/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            GitHub
          </a>
          .
        </p>
      </div>

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

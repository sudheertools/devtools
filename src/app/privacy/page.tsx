import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — DevTools",
  description:
    "DevTools privacy policy. Our tools run entirely in your browser — no data is collected, stored, or transmitted to any server.",
  alternates: {
    canonical: "https://sudheertools.github.io/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Last updated:{" "}
        {new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Overview
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          DevTools is designed with privacy as a core principle. All tools run
          entirely in your browser. No data you enter into any tool is
          collected, stored, or transmitted to any server.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
          Data Processing
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          When you use a DevTool, your input is processed entirely within your
          browser using client-side JavaScript. The processing happens on your
          device — no data is sent over the network to any external server or
          API.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          You can verify this by opening your browser&apos;s Developer Tools
          (F12), navigating to the Network tab, and using any tool. You will see
          zero outgoing network requests.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
          Analytics &amp; Advertising
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          This site uses Google AdSense for advertising. Google AdSense may use
          cookies to serve ads based on your prior visits to this or other
          websites. You can opt out of personalized advertising by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Google Ads Settings
          </a>
          .
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          AdSense cookies do not access or process any data you enter into the
          tools. The tools themselves do not use cookies or local storage to
          transmit data externally.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
          Local Storage
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Some tools may use your browser&apos;s local storage to remember your
          preferences (such as dark mode or recently used tools). This data
          stays on your device and is never transmitted externally.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
          Third-Party Services
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          The only third-party service used by this site is Google AdSense for
          advertising. No other third-party scripts, analytics trackers, or data
          collection tools are used.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
          Changes to This Policy
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          If this privacy policy changes, the updated date at the top of this
          page will be revised. Continued use of the site after changes
          constitutes acceptance of the updated policy.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
          Contact
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Questions about this privacy policy can be directed to the{" "}
          <a
            href="https://github.com/sudheertools/sudheertools.github.io/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            GitHub repository
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

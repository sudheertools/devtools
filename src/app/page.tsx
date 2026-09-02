import type { Metadata } from "next";
import { tools } from "@/lib/tools/registry";
import SearchBar from "@/components/ui/SearchBar";
import ToolCard from "@/components/tools/ToolCard";
import ThemeToggle from "@/components/layout/ThemeToggle";
import HomeAds from "@/components/tools/HomeAds";

export const metadata: Metadata = {
  title: "DevTools - Free Online Developer Tools",
  description:
    "Free online developer tools that run entirely in your browser. No data leaves your device. Fast, private, and secure.",
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
      <div className="flex justify-end">
        <ThemeToggle />
      </div>

      <section className="text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-xs font-medium text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
          All processing happens in your browser
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Free Online Developer Tools
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          A collection of free, fast, and secure developer tools. Your data
          never leaves your browser — everything runs locally on your device.
        </p>

        <div className="mt-8">
          <SearchBar />
        </div>

        <HomeAds />
      </section>

      <section id="tools" className="mt-16">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Popular Tools
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Why DevTools?
        </h2>
        <div className="mx-auto mt-6 grid max-w-3xl gap-6 sm:grid-cols-3">
          <div>
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Instant & Fast
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              No waiting for server responses. All computations happen instantly
              in your browser.
            </p>
          </div>
          <div>
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Private & Secure
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Your data never leaves your device. No servers, no tracking, no
              storage.
            </p>
          </div>
          <div>
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Completely Free
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              No sign-up required. No limits. Use all tools freely without any
              restrictions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState, useMemo, useEffect } from "react";
import { tools, categories } from "@/lib/tools/registry";
import ToolCard from "@/components/tools/ToolCard";
import ThemeToggle from "@/components/layout/ThemeToggle";
import HomeAds from "@/components/tools/HomeAds";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("recentlyUsed");
      if (stored) {
        setRecentlyUsed(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const filteredTools = useMemo(() => {
    let result = tools;

    if (selectedCategory !== "all") {
      result = result.filter((tool) => tool.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.category.toLowerCase().includes(query)
      );
    }

    return result;
  }, [searchQuery, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: tools.length };
    categories.forEach((cat) => {
      counts[cat.slug] = tools.filter((t) => t.category === cat.slug).length;
    });
    return counts;
  }, []);

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
          {tools.length} Free Developer Tools — Private, Browser-Based, No Signup
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600 dark:text-gray-400">
          Every tool runs entirely in your browser. Your API keys, JWT tokens,
          JSON payloads, and passwords never leave your device — no server
          uploads, no tracking, no risk. Format JSON, encode Base64, generate
          UUIDs, test regex, and {tools.length - 5} more tools — all free, all
          private.
        </p>
      </section>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Zero data uploads
        </div>
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          No signup required
        </div>
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Works offline
        </div>
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Dark mode supported
        </div>
      </div>

      {recentlyUsed.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Recently Used
          </h2>
          <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2">
            {recentlyUsed.slice(0, 6).map((slug) => {
              const tool = tools.find((t) => t.slug === slug);
              if (!tool) return null;
              return (
                <a
                  key={tool.slug}
                  href={tool.href}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm transition-all hover:border-blue-300 hover:shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-gray-100 text-[10px] font-bold text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                    {tool.icon}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {tool.name}
                  </span>
                </a>
              );
            })}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Popular Tools
        </h2>
        <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-3">
          {[
            {
              name: "JSON Formatter",
              desc: "Format, validate, and beautify JSON",
              href: "/json-formatter",
              icon: "JSON",
            },
            {
              name: "Base64 Encoder",
              desc: "Encode text with Unicode support",
              href: "/base64-encode",
              icon: "ENC",
            },
            {
              name: "UUID Generator",
              desc: "Generate random UUID v4 identifiers",
              href: "/uuid-generator",
              icon: "UID",
            },
            {
              name: "Password Generator",
              desc: "Create strong, secure passwords",
              href: "/password-generator",
              icon: "PWD",
            },
            {
              name: "Regex Tester",
              desc: "Test regular expressions live",
              href: "/regex-tester",
              icon: "REG",
            },
            {
              name: "Hash Generator",
              desc: "MD5, SHA-1, SHA-256, SHA-512",
              href: "/hash-generator",
              icon: "HASH",
            },
          ].map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600"
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                {tool.icon}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {tool.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {tool.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="mx-auto max-w-3xl">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${tools.length} tools, try "json", "base64", "url"...`}
              className="w-full rounded-xl border border-gray-200 bg-white py-4 pl-12 pr-4 text-base text-gray-900 placeholder-gray-400 shadow-sm transition-shadow focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-blue-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
              }`}
            >
              All
              <span className="ml-1.5 text-xs opacity-75">
                {categoryCounts.all}
              </span>
            </button>
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => setSelectedCategory(category.slug)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  selectedCategory === category.slug
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                }`}
              >
                {category.name}
                <span className="ml-1.5 text-xs opacity-75">
                  {categoryCounts[category.slug]}
                </span>
              </button>
            ))}
          </div>
        </div>

        <HomeAds />
      </section>

      <section id="tools" className="mt-10">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filteredTools.length === tools.length
              ? `${tools.length} tools`
              : `${filteredTools.length} of ${tools.length} tools`}
          </p>
          {(searchQuery || selectedCategory !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Clear filters
            </button>
          )}
        </div>

        {filteredTools.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-gray-50 py-12 text-center dark:border-gray-700 dark:bg-gray-800">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              No tools found for &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <section className="mt-20 rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Why DevTools?
        </h2>
        <div className="mx-auto mt-6 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
          <div>
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300">
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
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Open & Auditable
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              View source on any tool. Every function runs client-side JavaScript
              you can verify.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
            Built for Every Developer
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600 dark:text-gray-400">
            Whether you&apos;re debugging APIs, configuring infrastructure, or
            working with AI — there&apos;s a tool for you.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                For Developers
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Format JSON, test regex, validate emails, encode Base64, convert
                CSV, and debug API responses — all without leaving your browser.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["JSON Formatter", "Regex Tester", "JWT Decoder", "Diff Checker"].map((t) => (
                  <span key={t} className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">{t}</span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                For DevOps
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Generate Dockerfiles, Terraform configs, Helm charts, and cron
                expressions. Calculate subnets and validate infrastructure
                templates.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["Dockerfile Generator", "Terraform Generator", "Subnet Calculator", "Cron Generator"].map((t) => (
                  <span key={t} className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">{t}</span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                For AI &amp; ML Engineers
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Count tokens for LLM prompts, convert JSON to TypeScript for
                API schemas, and generate secure passwords for model
                endpoints.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["Token Counter", "JSON to TypeScript", "Password Generator", "UUID Generator"].map((t) => (
                  <span key={t} className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
            How It Works
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600 dark:text-gray-400">
            Every tool runs entirely in your browser using client-side
            JavaScript. Your data never touches a server.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                <span className="text-sm font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Paste Your Data
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Enter JSON, text, or any input into the tool. Works with API
                keys, JWT tokens, and sensitive data.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300">
                <span className="text-sm font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Process Instantly
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                The tool processes your data using JavaScript and the Web Crypto
                API. No network requests are made.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
                <span className="text-sm font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Copy the Result
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Get your formatted, encoded, or generated output. Copy it
                directly — nothing is stored or logged.
              </p>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Open your browser&apos;s DevTools → Network tab → use any tool. You
            will see zero outgoing requests. That&apos;s the proof.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 space-y-4">
            {[
              {
                q: "Is this really free?",
                a: "Yes, completely free. No sign-up, no limits, no premium tier. All 69 tools are available to everyone.",
              },
              {
                q: "Does it collect my data?",
                a: "No. Every tool runs entirely in your browser. No data is sent to any server. You can verify this by opening your browser's DevTools Network tab — you'll see zero outgoing requests.",
              },
              {
                q: "Can I use it offline?",
                a: "Yes. Once the page is loaded, all tools work offline. No internet connection is required for processing.",
              },
              {
                q: "Which browsers are supported?",
                a: "All modern browsers: Chrome, Firefox, Safari, Edge. The tools use standard Web APIs (Web Crypto, FileReader, etc.) that work across all major browsers.",
              },
              {
                q: "How is this different from other tool sites?",
                a: "Most developer tool sites send your data to their servers for processing. Ours never does. This makes DevTools safe for sensitive data like API keys, JWT tokens, passwords, and proprietary code.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {item.q}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Standards & References
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Our tools implement official standards. Learn more:
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {[
              { name: "UUID (RFC 4122)", href: "https://datatracker.ietf.org/doc/html/rfc4122" },
              { name: "JWT (RFC 7519)", href: "https://datatracker.ietf.org/doc/html/rfc7519" },
              { name: "Base64 (RFC 4648)", href: "https://datatracker.ietf.org/doc/html/rfc4648" },
              { name: "Web Crypto API", href: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API" },
              { name: "JSON (ECMA-404)", href: "https://www.ecma-international.org/publications-and-standards/standards/ecma-404/" },
            ].map((ref) => (
              <a
                key={ref.href}
                href={ref.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 transition-colors hover:border-blue-300 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-blue-600 dark:hover:text-blue-400"
              >
                {ref.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
            Quick Comparisons
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600 dark:text-gray-400">
            Not sure which tool to use? Here are the most common decisions.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                tool1: "JSON Formatter",
                tool2: "JSON Validator",
                desc: "Formatter beautifies JSON. Validator checks if JSON is structurally correct.",
                href1: "/json-formatter",
                href2: "/json-validator",
              },
              {
                tool1: "Base64 Encoder",
                tool2: "Image to Base64",
                desc: "Encoder handles text. Image to Base64 converts image files to data URIs.",
                href1: "/base64-encode",
                href2: "/image-to-base64",
              },
              {
                tool1: "Hash Generator",
                tool2: "Password Generator",
                desc: "Hash Generator creates checksums. Password Generator creates secure random strings.",
                href1: "/hash-generator",
                href2: "/password-generator",
              },
              {
                tool1: "URL Encoder",
                tool2: "URL Parser",
                desc: "Encoder escapes special characters. Parser extracts query params and components.",
                href1: "/url-encode",
                href2: "/url-parser",
              },
            ].map((item) => (
              <div
                key={item.tool1}
                className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex items-center gap-2 text-sm">
                  <a
                    href={item.href1}
                    className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    {item.tool1}
                  </a>
                  <span className="text-gray-400">vs</span>
                  <a
                    href={item.href2}
                    className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    {item.tool2}
                  </a>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Built With
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Modern web technologies, no frameworks, no servers.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {[
              { name: "Next.js", desc: "Static site generation" },
              { name: "Web Crypto API", desc: "Secure hashing & encryption" },
              { name: "React", desc: "Interactive UI components" },
              { name: "Tailwind CSS", desc: "Responsive dark mode design" },
              { name: "TypeScript", desc: "Type-safe tool logic" },
            ].map((tech) => (
              <div
                key={tech.name}
                className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-center dark:border-gray-700 dark:bg-gray-800"
              >
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {tech.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {tech.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-16 text-center text-xs text-gray-400 dark:text-gray-500">
        <p>Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
      </div>
    </div>
  );
}

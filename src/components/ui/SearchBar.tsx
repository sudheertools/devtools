"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { tools } from "@/lib/tools/registry";

interface SearchBarProps {
  placeholder?: string;
}

export default function SearchBar({
  placeholder = "Search tools...",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  const filtered = query.length > 0
    ? tools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query.toLowerCase()) ||
          tool.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  function handleSelect(href: string) {
    setQuery("");
    setShowSuggestions(false);
    router.push(href);
  }

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
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
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(e.target.value.length > 0);
          }}
          onFocus={() => setShowSuggestions(query.length > 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-blue-400"
        />
      </div>

      {showSuggestions && filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-40 mt-2 rounded-xl border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          {filtered.map((tool) => (
            <button
              key={tool.slug}
              onClick={() => handleSelect(tool.href)}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                {tool.icon}
              </span>
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {tool.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {tool.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {showSuggestions && query.length > 0 && filtered.length === 0 && (
        <div className="absolute top-full left-0 right-0 z-40 mt-2 rounded-xl border border-gray-200 bg-white px-4 py-6 text-center text-sm text-gray-500 shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
          No tools found for &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}

import Link from "next/link";
import { tools, categories } from "@/lib/tools/registry";

const popularTools = [
  { name: "JSON Formatter", href: "/json-formatter" },
  { name: "Base64 Encoder", href: "/base64-encode" },
  { name: "UUID Generator", href: "/uuid-generator" },
  { name: "Password Generator", href: "/password-generator" },
  { name: "Regex Tester", href: "/regex-tester" },
];

export default function Footer() {
  const toolCount = tools.length;
  const topCategories = categories.slice(0, 5);

  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-xs text-white">
                DT
              </span>
              DevTools
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              {toolCount} free developer tools that run entirely in your browser.
              No signup, no data sent to servers.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Popular Tools
            </h3>
            <ul className="mt-3 space-y-2">
              {popularTools.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Categories
            </h3>
            <ul className="mt-3 space-y-2">
              {topCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href="/#tools"
                    className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              All tools run locally in your browser.
            </h3>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              No data is sent to any server. Everything is processed
              client-side using JavaScript.
            </p>
            <div className="mt-4 flex gap-3">
              <Link
                href="/"
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Home
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6 text-center text-xs text-gray-400 dark:border-gray-800 dark:text-gray-500">
          <p>&copy; {new Date().getFullYear()} DevTools. All {toolCount} tools are free and open-source.</p>
        </div>
      </div>
    </footer>
  );
}

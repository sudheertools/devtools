import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-xs text-white">
              DT
            </span>
            DevTools
          </div>

          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            All tools run locally in your browser. No data is sent to any server.
          </p>

          <div className="flex gap-4">
            <Link
              href="/"
              className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

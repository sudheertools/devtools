import Link from "next/link";
import AdBanner from "@/components/ui/AdBanner";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ToolLayoutProps {
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  children: React.ReactNode;
}

export default function ToolLayout({
  title,
  description,
  breadcrumbs,
  children,
}: ToolLayoutProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `https://sudheertools.github.io${item.href}` } : {}),
    })),
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          {breadcrumbs.map((item, i) => (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && (
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-gray-700 dark:hover:text-gray-200"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 dark:text-gray-100">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </header>

      <AdBanner format="horizontal" />

      {children}

      <div className="mt-8">
        <AdBanner format="horizontal" />
      </div>
    </div>
  );
}

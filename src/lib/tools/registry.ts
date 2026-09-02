export interface Tool {
  name: string;
  slug: string;
  category: string;
  description: string;
  icon: string;
  href: string;
  relatedSlugs: string[];
}

export interface ToolCategory {
  name: string;
  slug: string;
  description: string;
}

export const categories: ToolCategory[] = [
  {
    name: "Encoding",
    slug: "encoding",
    description: "Encode and decode data in various formats",
  },
  {
    name: "Generation",
    slug: "generation",
    description: "Generate identifiers, codes, and random data",
  },
  {
    name: "Validation",
    slug: "validation",
    description: "Validate and verify data formats",
  },
  {
    name: "Formatting",
    slug: "formatting",
    description: "Format and beautify your data",
  },
  {
    name: "Conversion",
    slug: "conversion",
    description: "Convert between different formats and bases",
  },
  {
    name: "Utility",
    slug: "utility",
    description: "Useful developer utilities and helpers",
  },
];

export const tools: Tool[] = [
  // Encoding
  {
    name: "Base64 Encoder",
    slug: "base64-encode",
    category: "encoding",
    description: "Encode text to Base64 format. Supports Unicode characters.",
    icon: "ENC",
    href: "/base64-encode",
    relatedSlugs: ["base64-decode"],
  },
  {
    name: "Base64 Decoder",
    slug: "base64-decode",
    category: "encoding",
    description: "Decode Base64 encoded text back to readable format.",
    icon: "DEC",
    href: "/base64-decode",
    relatedSlugs: ["base64-encode"],
  },
  {
    name: "URL Encoder",
    slug: "url-encode",
    category: "encoding",
    description: "Encode text for safe use in URLs and query parameters.",
    icon: "URL",
    href: "/url-encode",
    relatedSlugs: ["url-decode", "url-parser"],
  },
  {
    name: "URL Decoder",
    slug: "url-decode",
    category: "encoding",
    description: "Decode URL-encoded text back to readable format.",
    icon: "UDC",
    href: "/url-decode",
    relatedSlugs: ["url-encode", "url-parser"],
  },
  {
    name: "HTML Encoder",
    slug: "html-encode",
    category: "encoding",
    description: "Encode special characters for safe use in HTML.",
    icon: "HTM",
    href: "/html-encode",
    relatedSlugs: ["html-decode"],
  },
  {
    name: "HTML Decoder",
    slug: "html-decode",
    category: "encoding",
    description: "Decode HTML entities back to readable text.",
    icon: "HDC",
    href: "/html-decode",
    relatedSlugs: ["html-encode"],
  },
  // Generation
  {
    name: "UUID Generator",
    slug: "uuid-generator",
    category: "generation",
    description: "Generate random UUID v4 identifiers for your applications.",
    icon: "UID",
    href: "/uuid-generator",
    relatedSlugs: ["password-generator"],
  },
  {
    name: "Password Generator",
    slug: "password-generator",
    category: "generation",
    description: "Generate strong, random passwords with customizable options.",
    icon: "PWD",
    href: "/password-generator",
    relatedSlugs: ["uuid-generator"],
  },
  {
    name: "Hash Generator",
    slug: "hash-generator",
    category: "generation",
    description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes.",
    icon: "HASH",
    href: "/hash-generator",
    relatedSlugs: [],
  },
  {
    name: "Lorem Ipsum Generator",
    slug: "lorem-ipsum",
    category: "generation",
    description: "Generate placeholder text for your designs and mockups.",
    icon: "IPS",
    href: "/lorem-ipsum",
    relatedSlugs: [],
  },
  {
    name: "Random Color Generator",
    slug: "random-color",
    category: "generation",
    description: "Generate random colors and color palettes for your designs.",
    icon: "CLR",
    href: "/random-color",
    relatedSlugs: ["color-converter"],
  },
  // Formatting
  {
    name: "JSON Formatter",
    slug: "json-formatter",
    category: "formatting",
    description: "Format, validate, and beautify JSON data.",
    icon: "JSON",
    href: "/json-formatter",
    relatedSlugs: [],
  },
  {
    name: "JSON Validator",
    slug: "json-validator",
    category: "formatting",
    description: "Validate JSON syntax and check for errors.",
    icon: "JVAL",
    href: "/json-validator",
    relatedSlugs: ["json-formatter"],
  },
  // Conversion
  {
    name: "Number Base Converter",
    slug: "number-base-converter",
    category: "conversion",
    description: "Convert between Binary, Octal, Decimal, and Hexadecimal.",
    icon: "NUM",
    href: "/number-base-converter",
    relatedSlugs: [],
  },
  {
    name: "Timestamp Converter",
    slug: "timestamp-converter",
    category: "conversion",
    description: "Convert Unix timestamps to human-readable dates and vice versa.",
    icon: "TMS",
    href: "/timestamp-converter",
    relatedSlugs: [],
  },
  {
    name: "Color Converter",
    slug: "color-converter",
    category: "conversion",
    description: "Convert between HEX, RGB, and HSL color formats.",
    icon: "COL",
    href: "/color-converter",
    relatedSlugs: ["random-color"],
  },
  {
    name: "Case Converter",
    slug: "case-converter",
    category: "conversion",
    description: "Convert text between camelCase, snake_case, kebab-case, and more.",
    icon: "CASE",
    href: "/case-converter",
    relatedSlugs: ["character-counter"],
  },
  // Utility
  {
    name: "URL Parser",
    slug: "url-parser",
    category: "utility",
    description: "Parse URLs to see protocol, hostname, path, and query parameters.",
    icon: "UPR",
    href: "/url-parser",
    relatedSlugs: ["url-encode", "url-decode"],
  },
  {
    name: "Cron Expression Generator",
    slug: "cron-generator",
    category: "utility",
    description: "Generate and describe cron expressions for scheduling tasks.",
    icon: "CRON",
    href: "/cron-generator",
    relatedSlugs: [],
  },
  {
    name: "Character Counter",
    slug: "character-counter",
    category: "utility",
    description: "Count characters, words, sentences, and lines in text.",
    icon: "CNT",
    href: "/character-counter",
    relatedSlugs: ["case-converter"],
  },
  {
    name: "Regex Tester",
    slug: "regex-tester",
    category: "utility",
    description: "Test regular expressions with live matching and highlighting.",
    icon: "REG",
    href: "/regex-tester",
    relatedSlugs: [],
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getRelatedTools(slug: string): Tool[] {
  const tool = getToolBySlug(slug);
  if (!tool) return [];
  return tool.relatedSlugs
    .map((relatedSlug) => getToolBySlug(relatedSlug))
    .filter((t): t is Tool => t !== undefined);
}

export function searchTools(query: string): Tool[] {
  const lower = query.toLowerCase();
  return tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(lower) ||
      tool.description.toLowerCase().includes(lower) ||
      tool.category.toLowerCase().includes(lower)
  );
}

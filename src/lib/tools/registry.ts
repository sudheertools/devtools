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
  {
    name: "Text",
    slug: "text",
    description: "Text manipulation and analysis tools",
  },
  {
    name: "CSS",
    slug: "css",
    description: "CSS tools and generators",
  },
  {
    name: "Image",
    slug: "image",
    description: "Image conversion and processing tools",
  },
  {
    name: "Color",
    slug: "color",
    description: "Color conversion and contrast tools",
  },
  {
    name: "Reference",
    slug: "reference",
    description: "Developer reference and lookup tools",
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
    relatedSlugs: ["base64-decode", "image-to-base64"],
  },
  {
    name: "Base64 Decoder",
    slug: "base64-decode",
    category: "encoding",
    description: "Decode Base64 encoded text back to readable format.",
    icon: "DEC",
    href: "/base64-decode",
    relatedSlugs: ["base64-encode", "base64-to-image"],
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
  {
    name: "Image to Base64",
    slug: "image-to-base64",
    category: "encoding",
    description: "Convert images to Base64 encoded strings. Supports PNG, JPG, GIF, and more.",
    icon: "IMG",
    href: "/image-to-base64",
    relatedSlugs: ["base64-to-image", "base64-encode"],
  },
  {
    name: "Base64 to Image",
    slug: "base64-to-image",
    category: "encoding",
    description: "Decode Base64 encoded strings back to images.",
    icon: "B64",
    href: "/base64-to-image",
    relatedSlugs: ["image-to-base64", "base64-decode"],
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
  {
    name: "QR Code Generator",
    slug: "qr-code-generator",
    category: "generation",
    description: "Generate QR codes for text, URLs, and more. Download as PNG.",
    icon: "QR",
    href: "/qr-code-generator",
    relatedSlugs: [],
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
  {
    name: "JSON to CSV",
    slug: "json-to-csv",
    category: "conversion",
    description: "Convert JSON data to CSV format for spreadsheets.",
    icon: "J2C",
    href: "/json-to-csv",
    relatedSlugs: ["csv-to-json", "json-formatter"],
  },
  {
    name: "CSV to JSON",
    slug: "csv-to-json",
    category: "conversion",
    description: "Convert CSV data to JSON format for APIs and applications.",
    icon: "C2J",
    href: "/csv-to-json",
    relatedSlugs: ["json-to-csv"],
  },
  {
    name: "HTML to Markdown",
    slug: "html-to-markdown",
    category: "conversion",
    description: "Convert HTML code to clean Markdown format.",
    icon: "H2M",
    href: "/html-to-markdown",
    relatedSlugs: [],
  },
  // Utility
  {
    name: "JWT Decoder",
    slug: "jwt-decoder",
    category: "utility",
    description: "Decode JSON Web Tokens (JWT) to view header, payload, and signature.",
    icon: "JWT",
    href: "/jwt-decoder",
    relatedSlugs: [],
  },
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
  // Formatting
  {
    name: "XML Formatter",
    slug: "xml-formatter",
    category: "formatting",
    description: "Format, validate, minify, and pretty-print XML documents.",
    icon: "XML",
    href: "/xml-formatter",
    relatedSlugs: ["html-formatter"],
  },
  {
    name: "SQL Formatter",
    slug: "sql-formatter",
    category: "formatting",
    description: "Format and beautify SQL queries with dialect support.",
    icon: "SQL",
    href: "/sql-formatter",
    relatedSlugs: [],
  },
  {
    name: "HTML Formatter",
    slug: "html-formatter",
    category: "formatting",
    description: "Format, beautify, and minify HTML code with proper indentation.",
    icon: "HFMT",
    href: "/html-formatter",
    relatedSlugs: ["xml-formatter", "css-minifier"],
  },
  {
    name: "CSS Minifier",
    slug: "css-minifier",
    category: "formatting",
    description: "Minify and beautify CSS code with syntax validation.",
    icon: "CSS",
    href: "/css-minifier",
    relatedSlugs: ["js-minifier", "html-formatter"],
  },
  {
    name: "JavaScript Minifier",
    slug: "js-minifier",
    category: "formatting",
    description: "Minify and beautify JavaScript code with syntax validation.",
    icon: "JS",
    href: "/js-minifier",
    relatedSlugs: ["css-minifier"],
  },
  // Conversion
  {
    name: "JSON to YAML",
    slug: "json-to-yaml",
    category: "conversion",
    description: "Convert between JSON and YAML formats bidirectionally.",
    icon: "YML",
    href: "/json-to-yaml",
    relatedSlugs: ["json-formatter", "json-to-csv"],
  },
  // Utility
  {
    name: "Diff Checker",
    slug: "diff-checker",
    category: "utility",
    description: "Compare two texts side by side and highlight differences.",
    icon: "DIFF",
    href: "/diff-checker",
    relatedSlugs: [],
  },
  {
    name: "Image Compressor",
    slug: "image-compressor",
    category: "utility",
    description: "Compress JPG, PNG, and WebP images to reduce file size.",
    icon: "IMG",
    href: "/image-compressor",
    relatedSlugs: ["image-to-base64"],
  },
  {
    name: "Color Contrast Checker",
    slug: "color-contrast",
    category: "utility",
    description: "Check WCAG color contrast ratios for accessibility compliance.",
    icon: "CCR",
    href: "/color-contrast",
    relatedSlugs: ["color-converter", "random-color"],
  },
  {
    name: "User Agent Parser",
    slug: "user-agent-parser",
    category: "utility",
    description: "Parse User Agent strings to extract browser, OS, and device info.",
    icon: "UAP",
    href: "/user-agent-parser",
    relatedSlugs: ["url-parser"],
  },
  // Validation
  {
    name: "Email Validator",
    slug: "email-validator",
    category: "validation",
    description: "Validate email addresses with format and syntax checking.",
    icon: "EM",
    href: "/email-validator",
    relatedSlugs: ["url-validator", "phone-validator"],
  },
  {
    name: "URL Validator",
    slug: "url-validator",
    category: "validation",
    description: "Validate URLs and parse their components.",
    icon: "UV",
    href: "/url-validator",
    relatedSlugs: ["email-validator", "url-parser"],
  },
  {
    name: "Phone Number Validator",
    slug: "phone-validator",
    category: "validation",
    description: "Validate phone numbers and detect international formats.",
    icon: "PH",
    href: "/phone-validator",
    relatedSlugs: ["email-validator"],
  },
  {
    name: "Credit Card Validator",
    slug: "credit-card-validator",
    category: "validation",
    description: "Validate credit card numbers using the Luhn algorithm.",
    icon: "CC",
    href: "/credit-card-validator",
    relatedSlugs: [],
  },
  {
    name: "JSON Schema Validator",
    slug: "json-schema-validator",
    category: "validation",
    description: "Validate JSON data against a JSON Schema definition.",
    icon: "JSV",
    href: "/json-schema-validator",
    relatedSlugs: ["json-validator", "json-formatter"],
  },
  // Text
  {
    name: "Word Counter",
    slug: "word-counter",
    category: "text",
    description: "Count words, characters, sentences, and reading time.",
    icon: "WC",
    href: "/word-counter",
    relatedSlugs: ["character-counter"],
  },
  {
    name: "Text Reverser",
    slug: "text-reverser",
    category: "text",
    description: "Reverse text, words, or lines instantly.",
    icon: "TR",
    href: "/text-reverser",
    relatedSlugs: [],
  },
  {
    name: "Remove Duplicate Lines",
    slug: "remove-duplicates",
    category: "text",
    description: "Remove duplicate lines from text keeping first occurrence.",
    icon: "RD",
    href: "/remove-duplicates",
    relatedSlugs: ["sort-lines"],
  },
  {
    name: "Sort Lines",
    slug: "sort-lines",
    category: "text",
    description: "Sort text lines alphabetically or numerically.",
    icon: "SL",
    href: "/sort-lines",
    relatedSlugs: ["remove-duplicates"],
  },
  // CSS
  {
    name: "CSS Beautifier",
    slug: "css-beautifier",
    category: "css",
    description: "Format and beautify CSS code with proper indentation.",
    icon: "CB",
    href: "/css-beautifier",
    relatedSlugs: ["css-minifier"],
  },
  {
    name: "Gradient Generator",
    slug: "gradient-generator",
    category: "css",
    description: "Generate CSS gradients with live preview and multiple stops.",
    icon: "GR",
    href: "/gradient-generator",
    relatedSlugs: ["box-shadow-generator", "css-gradient-generator"],
  },
  {
    name: "Box Shadow Generator",
    slug: "box-shadow-generator",
    category: "css",
    description: "Generate CSS box shadows with visual preview.",
    icon: "BS",
    href: "/box-shadow-generator",
    relatedSlugs: ["gradient-generator"],
  },
  // Image
  {
    name: "Image Resizer",
    slug: "image-resizer",
    category: "image",
    description: "Resize images by dimensions with aspect ratio lock.",
    icon: "IR",
    href: "/image-resizer",
    relatedSlugs: ["image-compressor", "png-to-jpg"],
  },
  {
    name: "PNG to JPG",
    slug: "png-to-jpg",
    category: "image",
    description: "Convert PNG images to JPG format with quality control.",
    icon: "P2J",
    href: "/png-to-jpg",
    relatedSlugs: ["jpg-to-png", "image-resizer"],
  },
  {
    name: "JPG to PNG",
    slug: "jpg-to-png",
    category: "image",
    description: "Convert JPG images to PNG format with lossless quality.",
    icon: "J2P",
    href: "/jpg-to-png",
    relatedSlugs: ["png-to-jpg", "image-resizer"],
  },
  // Color
  {
    name: "Color Palette Generator",
    slug: "color-palette",
    category: "color",
    description: "Generate color palettes from a base color.",
    icon: "CP",
    href: "/color-palette",
    relatedSlugs: ["random-color", "color-converter"],
  },
  {
    name: "CSS Gradient Generator",
    slug: "css-gradient-generator",
    category: "color",
    description: "Create CSS gradients with multiple color stops.",
    icon: "CG",
    href: "/css-gradient-generator",
    relatedSlugs: ["gradient-generator"],
  },
  // Reference
  {
    name: "HTTP Status Codes",
    slug: "http-status-codes",
    category: "reference",
    description: "Complete list of HTTP status codes with descriptions.",
    icon: "HTTP",
    href: "/http-status-codes",
    relatedSlugs: [],
  },
  {
    name: "ASCII Table",
    slug: "ascii-table",
    category: "reference",
    description: "Display ASCII character table with search functionality.",
    icon: "ASC",
    href: "/ascii-table",
    relatedSlugs: ["html-entities"],
  },
  {
    name: "HTML Entities",
    slug: "html-entities",
    category: "reference",
    description: "List common HTML entities with copy-to-clipboard support.",
    icon: "HTM",
    href: "/html-entities",
    relatedSlugs: ["ascii-table", "html-encode"],
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

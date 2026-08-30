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
];

export const tools: Tool[] = [
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

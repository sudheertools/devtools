export function formatHTML(input: string, indent: number = 2): string {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Input is empty. Please enter HTML to format.");
  }

  const selfClosingTags = [
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr",
  ];

  const voidElements = [
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr", "!doctype",
  ];

  let formatted = "";
  let level = 0;
  const pad = " ".repeat(indent);

  const lines = trimmed
    .replace(/>\s*</g, ">\n<")
    .split("\n")
    .filter((line) => line.trim());

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    if (trimmedLine.startsWith("<!") || trimmedLine.startsWith("<?")) {
      formatted += pad.repeat(level) + trimmedLine + "\n";
    } else if (trimmedLine.startsWith("</")) {
      level = Math.max(0, level - 1);
      formatted += pad.repeat(level) + trimmedLine + "\n";
    } else if (/<[^/][^>]*\/>/.test(trimmedLine)) {
      formatted += pad.repeat(level) + trimmedLine + "\n";
    } else if (/<[^/][^>]*>$/.test(trimmedLine)) {
      const tagName = trimmedLine.match(/<([a-zA-Z][a-zA-Z0-9]*)/)?.[1]?.toLowerCase();
      formatted += pad.repeat(level) + trimmedLine + "\n";
      if (tagName && !voidElements.includes(tagName)) {
        level++;
      }
    } else {
      formatted += pad.repeat(level) + trimmedLine + "\n";
    }
  }

  return formatted.trimEnd();
}

export function minifyHTML(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Input is empty. Please enter HTML to minify.");
  }

  return trimmed
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\s+/g, " ")
    .replace(/>\s+</g, "><")
    .replace(/\s+\/>/g, "/>")
    .replace(/=\s+/g, "=")
    .trim();
}

export function validateHTML(input: string): {
  valid: boolean;
  errors: string[];
  tags: number;
} {
  const trimmed = input.trim();
  const errors: string[] = [];

  if (!trimmed) {
    return { valid: false, errors: ["Input is empty."], tags: 0 };
  }

  const tags = (trimmed.match(/<[^>]+>/g) || []).length;
  const openTags = trimmed.match(/<([a-z]+)[^>]*>/gi) || [];
  const closeTags = trimmed.match(/<\/([a-z]+)>/gi) || [];

  const openTagNames = openTags.map((t) => t.replace(/<([a-z]+).*/i, "$1").toLowerCase());
  const closeTagNames = closeTags.map((t) => t.replace(/<\/([a-z]+)>/i, "$1").toLowerCase());

  const voidElements = [
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr",
  ];

  for (const tag of openTagNames) {
    if (!voidElements.includes(tag)) {
      const openCount = openTagNames.filter((t) => t === tag).length;
      const closeCount = closeTagNames.filter((t) => t === tag).length;
      if (openCount !== closeCount) {
        errors.push(`Tag <${tag}> appears ${openCount} time(s) but is closed ${closeCount} time(s).`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    tags,
  };
}

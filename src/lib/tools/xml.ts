export function formatXML(input: string, indent: number = 2): string {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Input is empty. Please enter XML to format.");
  }
  if (!/<[a-zA-Z][\s\S]*>/.test(trimmed)) {
    throw new Error("No valid XML tags found. Please enter valid XML.");
  }

  let formatted = "";
  let level = 0;
  const pad = " ".repeat(indent);

  const lines = trimmed
    .replace(/>\s*</g, ">\n<")
    .replace(/(<\?.*?\?>)/g, "$1\n")
    .replace(/(<!\[CDATA\[[\s\S]*?\]\]>)/g, "$1\n")
    .split("\n")
    .filter((line) => line.trim());

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    if (trimmedLine.startsWith("<?")) {
      formatted += trimmedLine + "\n";
    } else if (trimmedLine.startsWith("<![CDATA[")) {
      formatted += pad.repeat(level) + trimmedLine + "\n";
    } else if (trimmedLine.startsWith("</")) {
      level = Math.max(0, level - 1);
      formatted += pad.repeat(level) + trimmedLine + "\n";
    } else if (trimmedLine.startsWith("<!") || trimmedLine.startsWith("<!--")) {
      formatted += pad.repeat(level) + trimmedLine + "\n";
    } else if (/<[^/][^>]*[^/]>$/.test(trimmedLine) || /^<[^>]+>$/.test(trimmedLine)) {
      const isSelfClosing = /\/>$/.test(trimmedLine);
      formatted += pad.repeat(level) + trimmedLine + "\n";
      if (!isSelfClosing) {
        level++;
      }
    } else {
      formatted += pad.repeat(level) + trimmedLine + "\n";
    }
  }

  return formatted.trimEnd();
}

export function minifyXML(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Input is empty. Please enter XML to minify.");
  }
  if (!/<[a-zA-Z][\s\S]*>/.test(trimmed)) {
    throw new Error("No valid XML tags found. Please enter valid XML.");
  }

  return trimmed
    .replace(/>\s+</g, "><")
    .replace(/\s+/g, " ")
    .trim();
}

export function validateXML(input: string): {
  valid: boolean;
  errors: string[];
  tags: number;
  depth: number;
} {
  const trimmed = input.trim();
  const errors: string[] = [];
  let tags = 0;
  let depth = 0;
  let maxDepth = 0;

  if (!trimmed) {
    return { valid: false, errors: ["Input is empty."], tags: 0, depth: 0 };
  }

  if (!/<[a-zA-Z][\s\S]*>/.test(trimmed)) {
    return {
      valid: false,
      errors: ["No valid XML tags found."],
      tags: 0,
      depth: 0,
    };
  }

  const openStack: string[] = [];
  const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9:-]*)[^>]*\/?>/g;
  const commentRegex = /<!--[\s\S]*?-->/g;
  const cdataRegex = /<!\[CDATA\[[\s\S]*?\]\]>/g;
  const processingRegex = /<\?[\s\S]*?\?>/g;

  let content = trimmed
    .replace(commentRegex, "")
    .replace(cdataRegex, "")
    .replace(processingRegex, "");

  let match;
  while ((match = tagRegex.exec(content)) !== null) {
    const fullTag = match[0];
    const tagName = match[1];
    const isClosing = fullTag.startsWith("</");
    const isSelfClosing = fullTag.endsWith("/>") || [
      "area", "base", "br", "col", "embed", "hr", "img", "input",
      "link", "meta", "param", "source", "track", "wbr",
    ].includes(tagName.toLowerCase());

    if (!isClosing) {
      tags++;
      depth++;
      maxDepth = Math.max(maxDepth, depth);
      if (!isSelfClosing) {
        openStack.push(tagName.toLowerCase());
      }
    } else {
      tags++;
      const expected = openStack.pop();
      if (!expected) {
        errors.push(`Unexpected closing tag </${tagName}> without matching opening tag.`);
      } else if (expected !== tagName.toLowerCase()) {
        errors.push(`Mismatched tags: expected </${expected}> but found </${tagName}>.`);
      }
      depth = Math.max(0, depth - 1);
    }
  }

  if (openStack.length > 0) {
    errors.push(`Unclosed tags: ${openStack.join(", ")}`);
  }

  return {
    valid: errors.length === 0,
    errors,
    tags,
    depth: maxDepth,
  };
}

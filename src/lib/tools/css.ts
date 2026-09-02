export function minifyCSS(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Input is empty. Please enter CSS to minify.");
  }

  return trimmed
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*{\s*/g, "{")
    .replace(/\s*}\s*/g, "}")
    .replace(/\s*:\s*/g, ":")
    .replace(/\s*;\s*/g, ";")
    .replace(/\s*,\s*/g, ",")
    .replace(/;}/g, "}")
    .trim();
}

export function beautifyCSS(input: string, indent: number = 2): string {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Input is empty. Please enter CSS to beautify.");
  }

  const pad = " ".repeat(indent);
  let formatted = "";
  let level = 0;

  const content = trimmed
    .replace(/\/\*[\s\S]*?\*\//g, (match) => `\n/*COMMENT${match}*/\n`)
    .replace(/\s+/g, " ")
    .trim();

  const chars = content.split("");
  let inString = false;
  let stringChar = "";

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];

    if (inString) {
      formatted += char;
      if (char === stringChar && chars[i - 1] !== "\\") {
        inString = false;
      }
      continue;
    }

    if (char === '"' || char === "'") {
      inString = true;
      stringChar = char;
      formatted += char;
      continue;
    }

    if (char === "{") {
      formatted += " {\n";
      level++;
      formatted += pad.repeat(level);
    } else if (char === "}") {
      formatted = formatted.trimEnd() + "\n";
      level = Math.max(0, level - 1);
      formatted += pad.repeat(level) + "}\n";
    } else if (char === ";") {
      formatted += ";\n" + pad.repeat(level);
    } else if (char === ":" && formatted.trimEnd().slice(-1) !== " ") {
      formatted += char;
    } else {
      formatted += char;
    }
  }

  formatted = formatted
    .replace(/\/\*COMMENT/g, "/*")
    .replace(/COMMENT\*\//g, "*/")
    .replace(/\n\s*\n/g, "\n")
    .replace(/^\n+/, "")
    .replace(/\n+$/, "\n");

  return formatted.trim();
}

export function validateCSS(input: string): {
  valid: boolean;
  errors: string[];
  selectors: number;
  properties: number;
} {
  const trimmed = input.trim();
  const errors: string[] = [];

  if (!trimmed) {
    return { valid: false, errors: ["Input is empty."], selectors: 0, properties: 0 };
  }

  const openBraces = (trimmed.match(/{/g) || []).length;
  const closeBraces = (trimmed.match(/}/g) || []).length;
  if (openBraces !== closeBraces) {
    errors.push(`Mismatched braces: ${openBraces} opening vs ${closeBraces} closing.`);
  }

  const selectors = (trimmed.match(/[^{}]+(?=\s*{)/g) || []).length;
  const properties = (trimmed.match(/[^{}:]+:[^{}]+/g) || []).length;

  return {
    valid: errors.length === 0,
    errors,
    selectors,
    properties,
  };
}

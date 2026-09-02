export function minifyJS(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Input is empty. Please enter JavaScript to minify.");
  }

  let result = trimmed
    .replace(/\/\/.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}();,=+\-<>!&|?:])\s*/g, "$1")
    .replace(/;}/g, "}")
    .replace(/; /g, ";")
    .trim();

  return result;
}

export function beautifyJS(input: string, indent: number = 2): string {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Input is empty. Please enter JavaScript to beautify.");
  }

  const pad = " ".repeat(indent);
  let formatted = "";
  let level = 0;
  let inString = false;
  let stringChar = "";
  let inTemplate = false;

  const content = trimmed
    .replace(/\/\*[\s\S]*?\*\//g, (match) => `/*BLOCKCOMMENT${match}*/`)
    .replace(/\s+/g, " ")
    .trim();

  const chars = content.split("");

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const prev = i > 0 ? chars[i - 1] : "";

    if (inString) {
      formatted += char;
      if (char === stringChar && prev !== "\\") {
        inString = false;
      }
      continue;
    }

    if (inTemplate) {
      formatted += char;
      if (char === "`" && prev !== "\\") {
        inTemplate = false;
      }
      continue;
    }

    if (char === '"' || char === "'") {
      inString = true;
      stringChar = char;
      formatted += char;
      continue;
    }

    if (char === "`") {
      inTemplate = true;
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
      if (level > 0) {
        formatted += pad.repeat(level);
      }
    } else if (char === ";") {
      formatted += ";\n" + pad.repeat(level);
    } else {
      formatted += char;
    }
  }

  formatted = formatted
    .replace(/\/\*BLOCKCOMMENT/g, "/*")
    .replace(/BLOCKCOMMENT\*\//g, "*/")
    .replace(/\n\s*\n/g, "\n")
    .replace(/^\n+/, "")
    .replace(/\n+$/, "\n");

  return formatted.trim();
}

export function validateJS(input: string): {
  valid: boolean;
  errors: string[];
  lines: number;
} {
  const trimmed = input.trim();
  const errors: string[] = [];

  if (!trimmed) {
    return { valid: false, errors: ["Input is empty."], lines: 0 };
  }

  const lines = trimmed.split("\n").length;

  const openBraces = (trimmed.match(/{/g) || []).length;
  const closeBraces = (trimmed.match(/}/g) || []).length;
  if (openBraces !== closeBraces) {
    errors.push(`Mismatched braces: ${openBraces} opening vs ${closeBraces} closing.`);
  }

  const openParens = (trimmed.match(/\(/g) || []).length;
  const closeParens = (trimmed.match(/\)/g) || []).length;
  if (openParens !== closeParens) {
    errors.push(`Mismatched parentheses: ${openParens} opening vs ${closeParens} closing.`);
  }

  const openBrackets = (trimmed.match(/\[/g) || []).length;
  const closeBrackets = (trimmed.match(/]/g) || []).length;
  if (openBrackets !== closeBrackets) {
    errors.push(`Mismatched brackets: ${openBrackets} opening vs ${closeBrackets} closing.`);
  }

  const singleQuotes = (trimmed.match(/'/g) || []).length;
  const doubleQuotes = (trimmed.match(/"/g) || []).length;
  if (singleQuotes % 2 !== 0) {
    errors.push("Unmatched single quotes.");
  }
  if (doubleQuotes % 2 !== 0) {
    errors.push("Unmatched double quotes.");
  }

  return {
    valid: errors.length === 0,
    errors,
    lines,
  };
}

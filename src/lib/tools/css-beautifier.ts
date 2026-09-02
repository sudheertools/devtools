export function beautifyCSS(css: string): string {
  const trimmed = css.trim();
  if (!trimmed) throw new Error("Input is empty. Please enter CSS to beautify.");

  let result = "";
  let indentLevel = 0;
  const indent = "  ";
  let inString = false;
  let stringChar = "";

  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed[i];
    const nextChar = trimmed[i + 1];

    if (inString) {
      result += char;
      if (char === stringChar && trimmed[i - 1] !== "\\") {
        inString = false;
      }
      continue;
    }

    if (char === '"' || char === "'") {
      inString = true;
      stringChar = char;
      result += char;
      continue;
    }

    if (char === "{") {
      result += " {\n";
      indentLevel++;
      result += indent.repeat(indentLevel);
      continue;
    }

    if (char === "}") {
      indentLevel--;
      result += "\n" + indent.repeat(indentLevel) + "}\n";
      if (nextChar && nextChar !== "}" && nextChar !== ";") {
        result += indent.repeat(indentLevel);
      }
      continue;
    }

    if (char === ";") {
      result += ";\n" + indent.repeat(indentLevel);
      continue;
    }

    if (char === ":" && !inString) {
      result += ": ";
      while (trimmed[i + 1] === " ") i++;
      continue;
    }

    result += char;
  }

  return result.replace(/\n\s*\n/g, "\n").trim();
}

export function minifyCSS(css: string): string {
  const trimmed = css.trim();
  if (!trimmed) throw new Error("Input is empty. Please enter CSS to minify.");

  let result = "";
  let inString = false;
  let stringChar = "";

  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed[i];

    if (inString) {
      result += char;
      if (char === stringChar && trimmed[i - 1] !== "\\") {
        inString = false;
      }
      continue;
    }

    if (char === '"' || char === "'") {
      inString = true;
      stringChar = char;
      result += char;
      continue;
    }

    if (char === " " || char === "\n" || char === "\r" || char === "\t") {
      const prevChar = result[result.length - 1];
      const nextChar = trimmed[i + 1];
      if (prevChar && nextChar && prevChar !== " " && nextChar !== " " &&
          prevChar !== "{" && prevChar !== "}" && prevChar !== ";" && prevChar !== ":" &&
          nextChar !== "{" && nextChar !== "}" && nextChar !== ";" && nextChar !== ":") {
        result += " ";
      }
      continue;
    }

    result += char;
  }

  return result;
}

function parseYAMLValue(value: string): unknown {
  const trimmed = value.trim();
  if (trimmed === "null" || trimmed === "~" || trimmed === "") return null;
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (/^-?\d+$/.test(trimmed)) return parseInt(trimmed, 10);
  if (/^-?\d+\.\d+$/.test(trimmed)) return parseFloat(trimmed);
  if (/^["'].*["']$/.test(trimmed)) return trimmed.slice(1, -1);
  if (trimmed.startsWith("[")) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return trimmed;
    }
  }
  if (trimmed.startsWith("{")) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return trimmed;
    }
  }
  return trimmed;
}

function jsonToYAML(obj: unknown, indent: number = 0): string {
  const spaces = "  ".repeat(indent);

  if (obj === null || obj === undefined) {
    return "null";
  }

  if (typeof obj === "boolean") {
    return String(obj);
  }

  if (typeof obj === "number") {
    return String(obj);
  }

  if (typeof obj === "string") {
    if (
      obj.includes(":") ||
      obj.includes("#") ||
      obj.includes("\n") ||
      obj.startsWith(" ") ||
      obj.endsWith(" ") ||
      obj === "true" ||
      obj === "false" ||
      obj === "null" ||
      /^\d/.test(obj) ||
      /^[{[]/.test(obj) ||
      obj === ""
    ) {
      return `"${obj.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`;
    }
    return obj;
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    return obj
      .map((item) => {
        const value = jsonToYAML(item, indent + 1);
        if (typeof item === "object" && item !== null) {
          return `\n${spaces}- ${value.trimStart()}`;
        }
        return `\n${spaces}- ${value}`;
      })
      .join("");
  }

  if (typeof obj === "object") {
    const keys = Object.keys(obj);
    if (keys.length === 0) return "{}";
    return keys
      .map((key) => {
        const value = jsonToYAML((obj as Record<string, unknown>)[key], indent + 1);
        const safeKey = /[:\s#{}[\],&*?|>!%`]/.test(key) || key === "" ? `"${key}"` : key;
        if (typeof (obj as Record<string, unknown>)[key] === "object" && (obj as Record<string, unknown>)[key] !== null) {
          if (Array.isArray((obj as Record<string, unknown>)[key]) && ((obj as Record<string, unknown>)[key] as unknown[]).length === 0) {
            return `\n${spaces}${safeKey}: []`;
          }
          if (typeof (obj as Record<string, unknown>)[key] === "object" && Object.keys((obj as Record<string, unknown>)[key] as object).length === 0) {
            return `\n${spaces}${safeKey}: {}`;
          }
          return `\n${spaces}${safeKey}:${value}`;
        }
        return `\n${spaces}${safeKey}: ${value}`;
      })
      .join("");
  }

  return String(obj);
}

function parseYAML(yaml: string): unknown {
  const lines = yaml.split("\n");
  const result: Record<string, unknown> = {};
  let currentObj: Record<string, unknown> = result;
  const stack: { obj: Record<string, unknown>; indent: number }[] = [];
  let currentArray: unknown[] | null = null;
  let currentArrayIndent = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "" || line.trim().startsWith("#")) continue;

    const indent = line.search(/\S/);
    const content = line.trim();

    while (stack.length > 0 && stack[stack.length - 1].indent >= indent) {
      const popped = stack.pop()!;
      currentObj = popped.obj;
      currentArray = null;
    }

    if (content.startsWith("- ")) {
      const value = content.slice(2);
      if (!currentArray || indent !== currentArrayIndent) {
        currentArray = [];
        currentArrayIndent = indent;
        const parentKey = Object.keys(currentObj).pop();
        if (parentKey) {
          currentObj[parentKey] = currentArray;
        }
      }
      if (value.includes(":")) {
        const newObj: Record<string, unknown> = {};
        const colonIndex = value.indexOf(":");
        const key = value.slice(0, colonIndex).trim();
        const val = value.slice(colonIndex + 1).trim();
        newObj[key] = parseYAMLValue(val);
        currentArray.push(newObj);
        stack.push({ obj: currentObj, indent });
        currentObj = newObj;
      } else {
        currentArray.push(parseYAMLValue(value));
      }
      continue;
    }

    const colonIndex = content.indexOf(":");
    if (colonIndex === -1) continue;

    const key = content.slice(0, colonIndex).trim().replace(/^["']|["']$/g, "");
    const value = content.slice(colonIndex + 1).trim();

    if (value === "" || value === "|" || value === ">") {
      let blockContent = "";
      const blockIndent = indent + 2;
      let j = i + 1;
      while (j < lines.length) {
        const nextLine = lines[j];
        if (nextLine.trim() === "" || nextLine.search(/\S/) >= blockIndent) {
          blockContent += (blockContent ? "\n" : "") + nextLine.slice(blockIndent);
          j++;
        } else {
          break;
        }
      }
      i = j - 1;
      currentObj[key] = blockContent;
    } else if (value.startsWith("[")) {
      try {
        currentObj[key] = JSON.parse(value);
      } catch {
        currentObj[key] = value;
      }
    } else if (value.startsWith("{")) {
      try {
        currentObj[key] = JSON.parse(value);
      } catch {
        currentObj[key] = value;
      }
    } else if (value === "") {
      const newObj: Record<string, unknown> = {};
      currentObj[key] = newObj;
      stack.push({ obj: currentObj, indent });
      currentObj = newObj;
      currentArray = null;
    } else {
      currentObj[key] = parseYAMLValue(value);
    }
  }

  const keys = Object.keys(result);
  if (keys.length === 1 && typeof result[keys[0]] === "object" && result[keys[0]] !== null) {
    return result[keys[0]];
  }
  return result;
}

export function jsonToYAMLStr(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Input is empty. Please enter JSON to convert.");
  }
  try {
    const parsed = JSON.parse(trimmed);
    const yaml = jsonToYAML(parsed, 0);
    return yaml.startsWith("\n") ? yaml.slice(1) : yaml;
  } catch (e) {
    throw new Error(`Invalid JSON: ${(e as Error).message}`);
  }
}

export function yamlToJSONStr(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Input is empty. Please enter YAML to convert.");
  }
  try {
    const parsed = parseYAML(trimmed);
    return JSON.stringify(parsed, null, 2);
  } catch (e) {
    throw new Error(`Invalid YAML: ${(e as Error).message}`);
  }
}

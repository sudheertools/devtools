export function formatJSON(input: string, indent: number = 2): string {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Input is empty. Please enter JSON to format.");
  }
  try {
    const parsed = JSON.parse(trimmed);
    return JSON.stringify(parsed, null, indent);
  } catch (e) {
    const match = (e as Error).message.match(/position (\d+)/);
    const pos = match ? parseInt(match[1]) : -1;
    throw new Error(
      `Invalid JSON at position ${pos}. Please check your input and try again.`
    );
  }
}

export function minifyJSON(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Input is empty. Please enter JSON to minify.");
  }
  try {
    const parsed = JSON.parse(trimmed);
    return JSON.stringify(parsed);
  } catch (e) {
    const match = (e as Error).message.match(/position (\d+)/);
    const pos = match ? parseInt(match[1]) : -1;
    throw new Error(
      `Invalid JSON at position ${pos}. Please check your input and try again.`
    );
  }
}

export function validateJSON(input: string): {
  valid: boolean;
  error?: string;
  lines?: number;
  keys?: number;
} {
  const trimmed = input.trim();
  if (!trimmed) {
    return { valid: false, error: "Input is empty." };
  }
  try {
    const parsed = JSON.parse(trimmed);
    const lines = trimmed.split("\n").length;
    let keys = 0;
    if (typeof parsed === "object" && parsed !== null) {
      const countKeys = (obj: Record<string, unknown>): number => {
        let count = Object.keys(obj).length;
        for (const value of Object.values(obj)) {
          if (typeof value === "object" && value !== null) {
            count += countKeys(value as Record<string, unknown>);
          }
        }
        return count;
      };
      keys = countKeys(parsed as Record<string, unknown>);
    }
    return { valid: true, lines, keys };
  } catch (e) {
    const match = (e as Error).message.match(/position (\d+)/);
    const pos = match ? parseInt(match[1]) : -1;
    return {
      valid: false,
      error: `Invalid JSON at position ${pos}.`,
    };
  }
}

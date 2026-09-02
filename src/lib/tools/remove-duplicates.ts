export function removeDuplicateLines(text: string, caseSensitive: boolean = true): {
  result: string;
  removedCount: number;
  totalLines: number;
} {
  const lines = text.split("\n");
  const seen = new Set<string>();
  const result: string[] = [];
  let removedCount = 0;

  for (const line of lines) {
    const key = caseSensitive ? line : line.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      result.push(line);
    } else {
      removedCount++;
    }
  }

  return {
    result: result.join("\n"),
    removedCount,
    totalLines: lines.length,
  };
}

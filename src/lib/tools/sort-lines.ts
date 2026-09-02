export type SortMode = "alpha-asc" | "alpha-desc" | "numeric-asc" | "numeric-desc";

export function sortLines(text: string, mode: SortMode): string {
  const lines = text.split("\n");

  switch (mode) {
    case "alpha-asc":
      return lines.sort((a, b) => a.localeCompare(b)).join("\n");
    case "alpha-desc":
      return lines.sort((a, b) => b.localeCompare(a)).join("\n");
    case "numeric-asc":
      return lines.sort((a, b) => {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        if (isNaN(numA) && isNaN(numB)) return a.localeCompare(b);
        if (isNaN(numA)) return 1;
        if (isNaN(numB)) return -1;
        return numA - numB;
      }).join("\n");
    case "numeric-desc":
      return lines.sort((a, b) => {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        if (isNaN(numA) && isNaN(numB)) return b.localeCompare(a);
        if (isNaN(numA)) return 1;
        if (isNaN(numB)) return -1;
        return numB - numA;
      }).join("\n");
    default:
      return text;
  }
}

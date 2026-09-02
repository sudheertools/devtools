export function jsonToCSV(jsonData: string, delimiter: string = ","): string {
  const trimmed = jsonData.trim();
  if (!trimmed) {
    throw new Error("Input is empty. Please enter JSON data.");
  }

  let data: unknown[];
  try {
    const parsed = JSON.parse(trimmed);
    data = Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    throw new Error("Invalid JSON format. Please enter valid JSON data.");
  }

  if (data.length === 0) {
    throw new Error("JSON array is empty. Please enter data to convert.");
  }

  const headers = new Set<string>();
  data.forEach((item) => {
    if (typeof item === "object" && item !== null) {
      Object.keys(item).forEach((key) => headers.add(key));
    }
  });

  if (headers.size === 0) {
    throw new Error("No object properties found in JSON data.");
  }

  const headerArray = Array.from(headers);

  const escapeCSV = (value: unknown): string => {
    if (value === null || value === undefined) return "";
    const str = typeof value === "object" ? JSON.stringify(value) : String(value);
    if (
      str.includes(delimiter) ||
      str.includes('"') ||
      str.includes("\n") ||
      str.includes("\r")
    ) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = data.map((item) => {
    if (typeof item !== "object" || item === null) {
      return escapeCSV(item);
    }
    return headerArray.map((header) => escapeCSV((item as Record<string, unknown>)[header])).join(delimiter);
  });

  return [headerArray.join(delimiter), ...rows].join("\n");
}

export function csvToJSON(csvData: string, delimiter: string = ","): string {
  const trimmed = csvData.trim();
  if (!trimmed) {
    throw new Error("Input is empty. Please enter CSV data.");
  }

  const lines: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed[i];
    const nextChar = trimmed[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        current += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === delimiter) {
        lines.push(current);
        current = "";
      } else if (char === "\n" || (char === "\r" && nextChar === "\n")) {
        lines.push(current);
        current = "";
        if (char === "\r") i++;
        if (i < trimmed.length - 1) lines.push("\n");
      } else if (char === "\r") {
        lines.push(current);
        current = "";
        lines.push("\n");
      } else {
        current += char;
      }
    }
  }
  lines.push(current);

  const rows: string[][] = [];
  let currentRow: string[] = [];

  for (const line of lines) {
    if (line === "\n") {
      if (currentRow.length > 0) {
        rows.push(currentRow);
        currentRow = [];
      }
    } else {
      currentRow.push(line);
    }
  }
  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  if (rows.length < 2) {
    throw new Error(
      "CSV must have at least a header row and one data row."
    );
  }

  const headers = rows[0];
  const result = rows.slice(1).filter((row) => row.length > 0 && !(row.length === 1 && row[0] === "")).map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] || "";
    });
    return obj;
  });

  return JSON.stringify(result, null, 2);
}

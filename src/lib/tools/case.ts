export function convertCase(
  input: string,
  toCase: "upper" | "lower" | "title" | "sentence" | "camel" | "pascal" | "snake" | "kebab" | "constant" | "dot" | "path" | "header"
): string {
  if (!input.trim()) {
    throw new Error("Input is empty. Please enter text to convert.");
  }

  switch (toCase) {
    case "upper":
      return input.toUpperCase();
    case "lower":
      return input.toLowerCase();
    case "title":
      return input.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
      );
    case "sentence":
      return input
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());
    case "camel":
      return toCamelCase(input);
    case "pascal":
      const camel = toCamelCase(input);
      return camel.charAt(0).toUpperCase() + camel.slice(1);
    case "snake":
      return toSnakeCase(input);
    case "kebab":
      return toKebabCase(input);
    case "constant":
      return toSnakeCase(input).toUpperCase();
    case "dot":
      return toKebabCase(input).replace(/-/g, ".");
    case "path":
      return toKebabCase(input).replace(/-/g, "/");
    case "header":
      return input
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    default:
      return input;
  }
}

function toCamelCase(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, "");
}

function toSnakeCase(input: string): string {
  return input
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[-\s]+/g, "_")
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
}

function toKebabCase(input: string): string {
  return input
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function countCharacters(input: string): {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
} {
  if (!input) {
    return {
      characters: 0,
      charactersNoSpaces: 0,
      words: 0,
      sentences: 0,
      paragraphs: 0,
      lines: 0,
    };
  }

  const characters = input.length;
  const charactersNoSpaces = input.replace(/\s/g, "").length;
  const words = input.trim() ? input.trim().split(/\s+/).length : 0;
  const sentences = input.trim()
    ? input.split(/[.!?]+/).filter((s) => s.trim()).length
    : 0;
  const paragraphs = input.trim()
    ? input.split(/\n\s*\n/).filter((p) => p.trim()).length
    : 0;
  const lines = input.split("\n").length;

  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    lines,
  };
}

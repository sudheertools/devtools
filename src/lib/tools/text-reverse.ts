export function reverseText(text: string): string {
  return text.split("").reverse().join("");
}

export function reverseWords(text: string): string {
  return text.split(/\s+/).reverse().join(" ");
}

export function reverseLines(text: string): string {
  return text.split("\n").reverse().join("\n");
}

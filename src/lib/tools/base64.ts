export function encodeBase64(input: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(input);
  const binary = Array.from(bytes)
    .map((b) => String.fromCharCode(b))
    .join("");
  return btoa(binary);
}

export function decodeBase64(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Input is empty. Please enter Base64 encoded text.");
  }
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(trimmed)) {
    throw new Error(
      "Invalid Base64 format. Please enter valid Base64 encoded text."
    );
  }
  if (trimmed.length % 4 !== 0) {
    throw new Error(
      "Invalid Base64 length. The input does not appear to be valid Base64."
    );
  }
  try {
    const binary = atob(trimmed);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    const decoder = new TextDecoder("utf-8", { fatal: true });
    return decoder.decode(bytes);
  } catch {
    throw new Error(
      "Failed to decode. The input is not valid Base64 encoded text."
    );
  }
}

export function encodeBase64(input: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(input);
  const binary = Array.from(bytes)
    .map((b) => String.fromCharCode(b))
    .join("");
  return btoa(binary);
}

export function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export function base64ToImage(base64: string): Blob {
  const trimmed = base64.trim();
  if (!trimmed) {
    throw new Error("Input is empty. Please enter Base64 encoded image data.");
  }

  const dataUrlRegex = /^data:image\/([a-zA-Z]+);base64,(.+)$/;
  const plainBase64Regex = /^[A-Za-z0-9+/]+={0,2}$/;

  let mimeType = "image/png";
  let data = trimmed;

  const dataUrlMatch = trimmed.match(dataUrlRegex);
  if (dataUrlMatch) {
    const ext = dataUrlMatch[1].toLowerCase();
    mimeType = `image/${ext === "jpg" ? "jpeg" : ext}`;
    data = dataUrlMatch[2];
  } else if (plainBase64Regex.test(trimmed)) {
    mimeType = "image/png";
    data = trimmed;
  } else {
    throw new Error("Invalid Base64 image format.");
  }

  const binary = atob(data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return new Blob([bytes], { type: mimeType });
}

export function getImageMimeType(file: File): string {
  return file.type || "image/png";
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
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

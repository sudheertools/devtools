export function encodeURL(input: string): string {
  if (!input.trim()) {
    throw new Error("Input is empty. Please enter text to encode.");
  }
  return encodeURIComponent(input);
}

export function decodeURL(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Input is empty. Please enter URL-encoded text to decode.");
  }
  try {
    return decodeURIComponent(trimmed);
  } catch {
    throw new Error(
      "Failed to decode. The input is not valid URL-encoded text."
    );
  }
}

export function encodeFullURL(input: string): string {
  if (!input.trim()) {
    throw new Error("Input is empty. Please enter URL to encode.");
  }
  return encodeURI(input);
}

export function decodeFullURL(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Input is empty. Please enter encoded URL to decode.");
  }
  try {
    return decodeURI(trimmed);
  } catch {
    throw new Error("Failed to decode. The input is not valid encoded URL.");
  }
}

export function parseURL(input: string): {
  protocol: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  params: Record<string, string>;
} {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Input is empty. Please enter a URL to parse.");
  }
  try {
    const url = new URL(trimmed);
    const params: Record<string, string> = {};
    url.searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return {
      protocol: url.protocol,
      hostname: url.hostname,
      port: url.port,
      pathname: url.pathname,
      search: url.search,
      hash: url.hash,
      params,
    };
  } catch {
    throw new Error("Invalid URL. Please enter a valid URL.");
  }
}

export function validateURL(url: string): {
  valid: boolean;
  protocol: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  errors: string[];
} {
  const errors: string[] = [];
  const trimmed = url.trim();

  if (!trimmed) {
    return {
      valid: false,
      protocol: "",
      hostname: "",
      port: "",
      pathname: "",
      search: "",
      hash: "",
      errors: ["URL is empty."],
    };
  }

  try {
    const parsed = new URL(trimmed);

    if (!["http:", "https:", "ftp:", "ftps:", "mailto:", "tel:"].includes(parsed.protocol)) {
      errors.push(`Unsupported protocol: ${parsed.protocol}`);
    }

    return {
      valid: errors.length === 0,
      protocol: parsed.protocol,
      hostname: parsed.hostname,
      port: parsed.port,
      pathname: parsed.pathname,
      search: parsed.search,
      hash: parsed.hash,
      errors,
    };
  } catch {
    errors.push("Invalid URL format. Make sure to include the protocol (e.g., https://).");
    return {
      valid: false,
      protocol: "",
      hostname: "",
      port: "",
      pathname: "",
      search: "",
      hash: "",
      errors,
    };
  }
}

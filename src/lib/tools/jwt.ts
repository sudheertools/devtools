export interface JWTHeader {
  alg?: string;
  typ?: string;
  [key: string]: unknown;
}

export interface JWTDecoded {
  header: JWTHeader;
  payload: Record<string, unknown>;
  signature: string;
  isValid: boolean;
  error?: string;
}

export function decodeJWT(token: string): JWTDecoded {
  const trimmed = token.trim();

  if (!trimmed) {
    return {
      header: {},
      payload: {},
      signature: "",
      isValid: false,
      error: "Input is empty. Please enter a JWT token.",
    };
  }

  const parts = trimmed.split(".");

  if (parts.length !== 3) {
    return {
      header: {},
      payload: {},
      signature: "",
      isValid: false,
      error: "Invalid JWT format. A JWT must have 3 parts separated by dots.",
    };
  }

  try {
    const header = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")));
    const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
    const signature = parts[2];

    return {
      header,
      payload,
      signature,
      isValid: true,
    };
  } catch {
    return {
      header: {},
      payload: {},
      signature: "",
      isValid: false,
      error: "Failed to decode JWT. The token may be malformed or contain invalid base64.",
    };
  }
}

export function formatJWTPayload(payload: Record<string, unknown>): string {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(payload)) {
    if (key === "exp" || key === "iat" || key === "nbf") {
      if (typeof value === "number") {
        const date = new Date(value * 1000);
        result[key] = `${value} (${date.toISOString()})`;
        continue;
      }
    }
    result[key] = typeof value === "object" ? JSON.stringify(value) : String(value);
  }

  return JSON.stringify(result, null, 2);
}

export function getJWTExpiry(payload: Record<string, unknown>): {
  isExpired: boolean;
  expiresIn?: string;
} {
  if (typeof payload.exp !== "number") {
    return { isExpired: false };
  }

  const expDate = new Date(payload.exp * 1000);
  const now = new Date();
  const isExpired = expDate < now;

  if (isExpired) {
    const diff = now.getTime() - expDate.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return {
      isExpired: true,
      expiresIn: `Expired ${days > 0 ? `${days}d ` : ""}${hours}h ago`,
    };
  }

  const diff = expDate.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return {
    isExpired: false,
    expiresIn: `Expires in ${days > 0 ? `${days}d ` : ""}${hours}h`,
  };
}

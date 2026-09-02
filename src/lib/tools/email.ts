const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export function validateEmail(email: string): {
  valid: boolean;
  localPart: string;
  domain: string;
  errors: string[];
} {
  const errors: string[] = [];
  const trimmed = email.trim();

  if (!trimmed) {
    return { valid: false, localPart: "", domain: "", errors: ["Email is empty."] };
  }

  if (!trimmed.includes("@")) {
    return { valid: false, localPart: trimmed, domain: "", errors: ["Missing '@' symbol."] };
  }

  const parts = trimmed.split("@");
  if (parts.length > 2) {
    return { valid: false, localPart: trimmed, domain: "", errors: ["Multiple '@' symbols found."] };
  }

  const [localPart, domain] = parts;

  if (!localPart) {
    errors.push("Local part (before @) is empty.");
  }
  if (localPart.length > 64) {
    errors.push("Local part exceeds 64 characters.");
  }
  if (localPart.startsWith(".") || localPart.endsWith(".")) {
    errors.push("Local part cannot start or end with a dot.");
  }
  if (localPart.includes("..")) {
    errors.push("Local part cannot have consecutive dots.");
  }

  if (!domain) {
    errors.push("Domain part (after @) is empty.");
  }
  if (domain.length > 253) {
    errors.push("Domain exceeds 253 characters.");
  }
  if (!domain.includes(".")) {
    errors.push("Domain must contain at least one dot.");
  }
  if (domain.startsWith("-") || domain.endsWith("-")) {
    errors.push("Domain cannot start or end with a hyphen.");
  }

  if (!EMAIL_REGEX.test(trimmed)) {
    if (errors.length === 0) {
      errors.push("Invalid email format.");
    }
  }

  return {
    valid: errors.length === 0,
    localPart,
    domain,
    errors,
  };
}

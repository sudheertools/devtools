const PHONE_REGEX = /^\+?[1-9]\d{0,14}$/;
const US_PHONE_REGEX = /^(?:\+1)?[-.\s]?(?:\(?[0-9]{3}\)?[-.\s]?)?[0-9]{3}[-.\s]?[0-9]{4}$/;
const INTL_PHONE_REGEX = /^\+[1-9]\d{6,14}$/;

export function validatePhone(phone: string): {
  valid: boolean;
  normalized: string;
  countryCode: string;
  nationalNumber: string;
  format: string;
  errors: string[];
} {
  const errors: string[] = [];
  const cleaned = phone.replace(/[\s\-().]/g, "");

  if (!cleaned) {
    return {
      valid: false,
      normalized: "",
      countryCode: "",
      nationalNumber: "",
      format: "",
      errors: ["Phone number is empty."],
    };
  }

  if (!/^\+?\d+$/.test(cleaned)) {
    return {
      valid: false,
      normalized: cleaned,
      countryCode: "",
      nationalNumber: "",
      format: "",
      errors: ["Phone number can only contain digits, spaces, dashes, parentheses, and + prefix."],
    };
  }

  if (cleaned.length < 7) {
    errors.push("Phone number is too short (minimum 7 digits).");
  }
  if (cleaned.length > 15) {
    errors.push("Phone number is too long (maximum 15 digits).");
  }

  const hasPlus = phone.trim().startsWith("+");
  const normalized = hasPlus ? cleaned.replace(/^0+/, "") : cleaned;

  let countryCode = "";
  let nationalNumber = "";
  let format = "Unknown";

  if (INTL_PHONE_REGEX.test(normalized)) {
    countryCode = normalized.substring(0, normalized.length > 10 ? normalized.length - 10 : 1);
    nationalNumber = normalized.substring(countryCode.length);
    format = "International";
  } else if (US_PHONE_REGEX.test(phone)) {
    countryCode = "1";
    nationalNumber = normalized.replace(/^1/, "");
    format = "US/Canada";
  } else if (PHONE_REGEX.test(cleaned)) {
    nationalNumber = cleaned.replace(/^\+?/, "");
    format = "National";
  } else {
    errors.push("Phone number format is not recognized.");
  }

  return {
    valid: errors.length === 0,
    normalized,
    countryCode,
    nationalNumber,
    format,
    errors,
  };
}

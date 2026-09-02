export function generatePassword(options: {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}): string {
  const { length, uppercase, lowercase, numbers, symbols } = options;

  if (length < 4 || length > 128) {
    throw new Error("Password length must be between 4 and 128.");
  }

  let charset = "";
  let required = "";

  if (uppercase) {
    charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    required += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (lowercase) {
    charset += "abcdefghijklmnopqrstuvwxyz";
    required += "abcdefghijklmnopqrstuvwxyz";
  }
  if (numbers) {
    charset += "0123456789";
    required += "0123456789";
  }
  if (symbols) {
    charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    required += "!@#$%^&*()_+-=[]{}|;:,.<>?";
  }

  if (!charset) {
    throw new Error("At least one character type must be selected.");
  }

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  let password = Array.from(array, (x) => charset[x % charset.length]).join("");

  // Ensure at least one character from each required type
  if (required.length > 0 && length >= required.length) {
    const requiredChars = Array.from(
      new Uint32Array(required.length),
      (x) => required[x % required.length]
    );
    const positions = Array.from(
      new Uint32Array(required.length),
      (x) => x % length
    );
    const passwordArray = password.split("");
    for (let i = 0; i < requiredChars.length; i++) {
      passwordArray[positions[i]] = requiredChars[i];
    }
    password = passwordArray.join("");
  }

  return password;
}

export function calculatePasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;
  if (/(.)\1{2,}/.test(password)) score -= 1;

  if (score <= 2) return { score: Math.max(score, 0), label: "Weak", color: "red" };
  if (score <= 4) return { score, label: "Fair", color: "orange" };
  if (score <= 5) return { score, label: "Good", color: "yellow" };
  return { score: Math.min(score, 7), label: "Strong", color: "green" };
}

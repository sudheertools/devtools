interface CardType {
  name: string;
  pattern: RegExp;
  lengths: number[];
  cvvLength: number;
}

const CARD_TYPES: CardType[] = [
  { name: "Visa", pattern: /^4/, lengths: [13, 16, 19], cvvLength: 3 },
  { name: "Mastercard", pattern: /^(5[1-5][0-9]{14}|2[2-7][0-9]{14})$/, lengths: [16], cvvLength: 3 },
  { name: "American Express", pattern: /^3[47]/, lengths: [15], cvvLength: 4 },
  { name: "Discover", pattern: /^(6011|65|644-649)/, lengths: [16, 19], cvvLength: 3 },
  { name: "Diners Club", pattern: /^(300-305|36|38)/, lengths: [14, 16], cvvLength: 3 },
  { name: "JCB", pattern: /^35/, lengths: [15, 16], cvvLength: 3 },
  { name: "UnionPay", pattern: /^62/, lengths: [16, 17, 18, 19], cvvLength: 3 },
  { name: "Maestro", pattern: /^(5018|5020|5038|5893|6304|6759|6761|6762|6763)/, lengths: [12, 13, 14, 15, 16, 17, 18, 19], cvvLength: 3 },
];

function luhnCheck(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, "");
  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

export function validateCreditCard(cardNumber: string): {
  valid: boolean;
  cardType: string;
  formatted: string;
  errors: string[];
} {
  const errors: string[] = [];
  const digits = cardNumber.replace(/\D/g, "");

  if (!digits) {
    return { valid: false, cardType: "Unknown", formatted: "", errors: ["Card number is empty."] };
  }

  if (digits.length < 13 || digits.length > 19) {
    errors.push("Card number must be between 13 and 19 digits.");
  }

  let detectedType = "Unknown";
  let detectedCard: CardType | undefined;

  for (const card of CARD_TYPES) {
    if (card.pattern.test(digits)) {
      detectedType = card.name;
      detectedCard = card;
      break;
    }
  }

  if (detectedType === "Unknown") {
    errors.push("Card type not recognized.");
  } else if (detectedCard && !detectedCard.lengths.includes(digits.length)) {
    errors.push(`${detectedType} cards must have ${detectedCard.lengths.join(" or ")} digits.`);
  }

  const isValid = luhnCheck(digits);
  if (!isValid && errors.length === 0) {
    errors.push("Card number failed Luhn check.");
  }

  const formatted = digits.replace(/(.{4})/g, "$1 ").trim();

  return {
    valid: errors.length === 0 && isValid,
    cardType: detectedType,
    formatted,
    errors,
  };
}

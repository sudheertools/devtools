export function convertNumberBase(
  input: string,
  fromBase: number,
  toBase: number
): string {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Input is empty. Please enter a number to convert.");
  }

  if (fromBase < 2 || fromBase > 36 || toBase < 2 || toBase > 36) {
    throw new Error("Base must be between 2 and 36.");
  }

  const validChars = "0123456789abcdefghijklmnopqrstuvwxyz".slice(0, fromBase);
  const regex = new RegExp(`^[+-]?[${validChars}]+\\.?[${validChars}]*$`, "i");

  if (!regex.test(trimmed)) {
    throw new Error(
      `Invalid character for base ${fromBase}. Only ${validChars} are allowed.`
    );
  }

  const isNegative = trimmed.startsWith("-");
  const absInput = isNegative ? trimmed.slice(1) : trimmed;

  const parts = absInput.split(".");
  const intPart = parts[0];
  const fracPart = parts[1] || "";

  // Convert integer part
  let decimalInt = 0;
  for (const char of intPart.toLowerCase()) {
    const digit = parseInt(char, 36);
    decimalInt = decimalInt * fromBase + digit;
  }

  // Convert fractional part
  let decimalFrac = 0;
  for (let i = 0; i < fracPart.length; i++) {
    const digit = parseInt(fracPart[i], 36);
    decimalFrac += digit / Math.pow(fromBase, i + 1);
  }

  // Convert integer part to target base
  let resultInt = "";
  if (decimalInt === 0) {
    resultInt = "0";
  } else {
    let num = decimalInt;
    while (num > 0) {
      resultInt = (num % toBase).toString(toBase) + resultInt;
      num = Math.floor(num / toBase);
    }
  }

  // Convert fractional part to target base
  let resultFrac = "";
  if (decimalFrac > 0) {
    let frac = decimalFrac;
    let precision = 0;
    while (frac > 0 && precision < 10) {
      frac *= toBase;
      const digit = Math.floor(frac);
      resultFrac += digit.toString(toBase);
      frac -= digit;
      precision++;
    }
  }

  const result = resultFrac ? `${resultInt}.${resultFrac}` : resultInt;
  return isNegative ? `-${result}` : result;
}

export function getBaseName(base: number): string {
  const names: Record<number, string> = {
    2: "Binary",
    8: "Octal",
    10: "Decimal",
    16: "Hexadecimal",
  };
  return names[base] || `Base ${base}`;
}

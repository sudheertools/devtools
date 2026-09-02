export interface AsciiChar {
  char: string;
  code: number;
  name: string;
  category: string;
}

const ASCII_TABLE_DATA: AsciiChar[] = [];

for (let i = 0; i < 128; i++) {
  let char: string;
  let name: string;
  let category: string;

  if (i < 32) {
    char = "";
    const controlNames: Record<number, string> = {
      0: "NUL", 1: "SOH", 2: "STX", 3: "ETX", 4: "EOT", 5: "ENQ", 6: "ACK", 7: "BEL",
      8: "BS", 9: "TAB", 10: "LF", 11: "VT", 12: "FF", 13: "CR", 14: "SO", 15: "SI",
      16: "DLE", 17: "DC1", 18: "DC2", 19: "DC3", 20: "DC4", 21: "NAK", 22: "SYN", 23: "ETB",
      24: "CAN", 25: "EM", 26: "SUB", 27: "ESC", 28: "FS", 29: "GS", 30: "RS", 31: "US",
    };
    name = controlNames[i] || `CTRL-${i}`;
    category = "Control";
  } else if (i === 32) {
    char = " ";
    name = "SPACE";
    category = "Whitespace";
  } else if (i < 48) {
    char = String.fromCharCode(i);
    name = `PUNCTUATION`;
    category = "Punctuation";
  } else if (i < 58) {
    char = String.fromCharCode(i);
    name = `DIGIT ${char}`;
    category = "Digit";
  } else if (i < 65) {
    char = String.fromCharCode(i);
    name = `PUNCTUATION`;
    category = "Punctuation";
  } else if (i < 91) {
    char = String.fromCharCode(i);
    name = `UPPERCASE ${char}`;
    category = "Letter";
  } else if (i < 97) {
    char = String.fromCharCode(i);
    name = `PUNCTUATION`;
    category = "Punctuation";
  } else if (i < 123) {
    char = String.fromCharCode(i);
    name = `LOWERCASE ${char}`;
    category = "Letter";
  } else if (i < 127) {
    char = String.fromCharCode(i);
    name = `PUNCTUATION`;
    category = "Punctuation";
  } else {
    char = "DEL";
    name = "DELETE";
    category = "Control";
  }

  ASCII_TABLE_DATA.push({ char, code: i, name, category });
}

export const ASCII_TABLE: AsciiChar[] = ASCII_TABLE_DATA;

export function searchAscii(query: string): AsciiChar[] {
  const lower = query.toLowerCase();
  return ASCII_TABLE.filter(
    (c) =>
      c.char.toLowerCase().includes(lower) ||
      c.code.toString().includes(lower) ||
      c.name.toLowerCase().includes(lower) ||
      c.category.toLowerCase().includes(lower)
  );
}

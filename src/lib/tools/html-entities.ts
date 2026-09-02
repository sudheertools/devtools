export interface HtmlEntity {
  name: string;
  entity: string;
  code: string;
  description: string;
}

export const HTML_ENTITIES: HtmlEntity[] = [
  { name: "Ampersand", entity: "&amp;", code: "&", description: "Ampersand character" },
  { name: "Less Than", entity: "&lt;", code: "<", description: "Less-than sign" },
  { name: "Greater Than", entity: "&gt;", code: ">", description: "Greater-than sign" },
  { name: "Quotation Mark", entity: "&quot;", code: '"', description: "Double quotation mark" },
  { name: "Apostrophe", entity: "&apos;", code: "'", description: "Single quotation mark" },
  { name: "Non-Breaking Space", entity: "&nbsp;", code: " ", description: "Non-breaking space" },
  { name: "Copyright", entity: "&copy;", code: "©", description: "Copyright symbol" },
  { name: "Registered", entity: "&reg;", code: "®", description: "Registered trademark" },
  { name: "Trademark", entity: "&trade;", code: "™", description: "Trademark symbol" },
  { name: "Euro", entity: "&euro;", code: "€", description: "Euro currency symbol" },
  { name: "Pound", entity: "&pound;", code: "£", description: "Pound sterling symbol" },
  { name: "Yen", entity: "&yen;", code: "¥", description: "Yen/Yuan symbol" },
  { name: "Cent", entity: "&cent;", code: "¢", description: "Cent symbol" },
  { name: "Section", entity: "&sect;", code: "§", description: "Section symbol" },
  { name: "Degree", entity: "&deg;", code: "°", description: "Degree symbol" },
  { name: "Plus/Minus", entity: "&plusmn;", code: "±", description: "Plus-minus symbol" },
  { name: "Multiplication", entity: "&times;", code: "×", description: "Multiplication sign" },
  { name: "Division", entity: "&divide;", code: "÷", description: "Division sign" },
  { name: "Micro", entity: "&micro;", code: "µ", description: "Micro sign" },
  { name: "Paragraph", entity: "&para;", code: "¶", description: "Pilcrow sign" },
  { name: "Middle Dot", entity: "&middot;", code: "·", description: "Middle dot" },
  { name: "Left Single Quote", entity: "&lsquo;", code: "\u2018", description: "Left single quotation mark" },
  { name: "Right Single Quote", entity: "&rsquo;", code: "\u2019", description: "Right single quotation mark" },
  { name: "Left Double Quote", entity: "&ldquo;", code: "\u201C", description: "Left double quotation mark" },
  { name: "Right Double Quote", entity: "&rdquo;", code: "\u201D", description: "Right double quotation mark" },
  { name: "En Dash", entity: "&ndash;", code: "\u2013", description: "En dash" },
  { name: "Em Dash", entity: "&mdash;", code: "\u2014", description: "Em dash" },
  { name: "Horizontal Ellipsis", entity: "&hellip;", code: "\u2026", description: "Horizontal ellipsis" },
  { name: "Bullet", entity: "&bull;", code: "•", description: "Bullet point" },
  { name: "Check Mark", entity: "&check;", code: "✓", description: "Check mark" },
  { name: "Cross Mark", entity: "&cross;", code: "✗", description: "Cross mark" },
  { name: "Arrow Left", entity: "&larr;", code: "←", description: "Leftward arrow" },
  { name: "Arrow Right", entity: "&rarr;", code: "→", description: "Rightward arrow" },
  { name: "Arrow Up", entity: "&uarr;", code: "↑", description: "Upward arrow" },
  { name: "Arrow Down", entity: "&darr;", code: "↓", description: "Downward arrow" },
  { name: "Heart", entity: "&hearts;", code: "♥", description: "Heart symbol" },
  { name: "Diamond", entity: "&diams;", code: "♦", description: "Diamond suit" },
  { name: "Club", entity: "&clubs;", code: "♣", description: "Club suit" },
  { name: "Spade", entity: "&spades;", code: "♠", description: "Spade suit" },
];

export function searchHtmlEntities(query: string): HtmlEntity[] {
  const lower = query.toLowerCase();
  return HTML_ENTITIES.filter(
    (e) =>
      e.name.toLowerCase().includes(lower) ||
      e.entity.toLowerCase().includes(lower) ||
      e.code.toLowerCase().includes(lower) ||
      e.description.toLowerCase().includes(lower)
  );
}

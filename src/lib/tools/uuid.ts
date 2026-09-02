export function generateUUID(): string {
  return crypto.randomUUID();
}

export function generateMultipleUUIDs(count: number): string[] {
  if (count < 1 || count > 100) {
    throw new Error("Count must be between 1 and 100.");
  }
  const uuids: string[] = [];
  for (let i = 0; i < count; i++) {
    uuids.push(crypto.randomUUID());
  }
  return uuids;
}

export function validateUUID(input: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(input.trim());
}

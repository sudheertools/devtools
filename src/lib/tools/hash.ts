export async function generateHash(
  input: string,
  algorithm: "SHA-1" | "SHA-256" | "SHA-512"
): Promise<string> {
  if (!input) {
    throw new Error("Input is empty. Please enter text to hash.");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(input);

  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

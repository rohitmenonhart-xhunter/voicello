/**
 * Client-side utilities for Voicello
 */

/**
 * Generates a random room ID
 * @returns A random room ID string
 */
export function generateRoomId(): string {
  return Math.random().toString(36).substring(2, 12);
}

/**
 * Generates a random string of a given length
 * @param length The length of the random string
 * @returns A random string
 */
export function randomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/**
 * Encodes a passphrase for end-to-end encryption
 * @param passphrase The passphrase to encode
 * @returns The encoded passphrase
 */
export function encodePassphrase(passphrase: string): string {
  return encodeURIComponent(passphrase);
}

/**
 * Decodes a passphrase for end-to-end encryption
 * @param encoded The encoded passphrase
 * @returns The decoded passphrase
 */
export function decodePassphrase(encoded: string): string | undefined {
  if (!encoded) return undefined;
  try {
    return decodeURIComponent(encoded);
  } catch (error) {
    console.error('Failed to decode passphrase', error);
    return undefined;
  }
}

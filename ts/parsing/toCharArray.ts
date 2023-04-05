/**
 * Converts a string into a TypedArray of either `Uint8Array`, `Uint16Array`, or `Uint32Array`
 * @param text The string to convert into an applicable ArrayBuffer
 * @param size Either 8 for utf-8, 16 for utf-16 or 32 for utf-32
 * @returns A valid `CharArray` for use by `AbnfParser` or `AbnfReader`
 */
export default function toCharArray(text: string, size: 8 | 16 | 32 = 16) {
    const array = text.split("").map((c) => c.charCodeAt(0));
    if (size == 8) {
        return Uint8Array.from(array);
    } else if (size == 32) {
        return Uint32Array.from(array);
    } else {
        return Uint16Array.from(array);
    }
}

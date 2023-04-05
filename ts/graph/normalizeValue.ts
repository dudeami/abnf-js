/**
 * Normalizes a valid ABNF character value to it's numeric repesentation.
 * @param value The single character represented as a string, or a number
 * @returns
 */
export default function normalizeValue(value: string | number) {
    return typeof value == "string" ? value.charCodeAt(0) : value;
}

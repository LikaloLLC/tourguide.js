/**
 * Generates a GUID (Globally Unique Identifier) in string format.
 * @returns A string representing a GUID.
 */
export function GUID(): string {
  const s4 = () => Math
    .floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}
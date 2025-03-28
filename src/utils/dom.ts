/**
 * Parses a data string into an object with default values.
 * @param data - The input data string, where key-value pairs are separated by ";".
 * @param defaults - An optional object containing default key-value pairs.
 * @returns A new object constructed from the parsed data and defaults.
 */
export function getDataContents<T>(data = "", defaults: Record<string, string> = {}): T {
  const parts = data.split(";");
  const result = { ...defaults };
  parts.forEach((part) => {
    const entries = (part || "").split(":");
    if (entries[0]) {
      result[(entries[0] || "").trim()] = (entries[1] || "").trim();
    } else {
      console.warn("Invalid key-value pair found in data string:", part);
    }
  });
  return result as unknown as T;
}

export function isElementVisibleOnPage(element: HTMLElement | undefined): boolean {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return rect.width !== 0
    || rect.height !== 0
    || rect.top !== 0
    || rect.left !== 0
    || rect.bottom !== 0
    || rect.right !== 0;
}
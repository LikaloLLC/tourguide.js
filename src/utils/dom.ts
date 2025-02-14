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

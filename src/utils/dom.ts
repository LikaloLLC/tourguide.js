export function getDataContents<T>(data = "", defaults: any = {}): T {
  const parts = data.split(";");
  const result = { ...defaults };
  parts.forEach((part) => {
    const entries = (part || "").split(":");
    result[(entries[0] || "").trim()] = (entries[1] || "").trim();
  });
  return result;
}
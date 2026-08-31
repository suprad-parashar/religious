import type { TemplateValues } from "@/types/upakarma";

export function applyTemplate(source: string, values: TemplateValues) {
  return source.replace(/\{\{\s*([a-zA-Z0-9_.-]+)\s*\}\}/g, (match, key: string) => {
    if (Object.prototype.hasOwnProperty.call(values, key)) {
      return String(values[key]);
    }
    return match;
  });
}

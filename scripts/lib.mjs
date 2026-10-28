import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const root = join(dirname(fileURLToPath(import.meta.url)), "..");
export const tokens = JSON.parse(readFileSync(join(root, "tokens", "dialo.tokens.json"), "utf8"));

export function get(path) {
  return path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), tokens);
}

export function resolve(value, seen = new Set()) {
  if (typeof value === "string") {
    const m = value.match(/^\{([^}]+)\}$/);
    if (m) {
      if (seen.has(m[1])) throw new Error(`Referencia circular: ${m[1]}`);
      seen.add(m[1]);
      const t = get(m[1]);
      if (!t || t.$value === undefined) throw new Error(`Referencia rota: ${m[1]}`);
      return resolve(t.$value, seen);
    }
    return value;
  }
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, resolve(v, new Set(seen))]));
  }
  return value;
}

// Recorre un grupo y devuelve [[ruta, token]]
export function walk(obj, prefix = []) {
  const out = [];
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith("$")) continue;
    if (v && typeof v === "object" && "$value" in v) out.push([[...prefix, k], v]);
    else if (v && typeof v === "object") out.push(...walk(v, [...prefix, k]));
  }
  return out;
}

export function luminance(hex) {
  const n = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function contrast(a, b) {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

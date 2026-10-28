#!/usr/bin/env node
// Verifica en CI que los pares de color del sistema cumplen WCAG 2.2 AA.
import { tokens, resolve, contrast } from "./lib.mjs";

let fail = 0;
const rows = [];
for (const [theme, fg, bg, min] of tokens.contrast.pairs) {
  const f = resolve(tokens.semantic[theme][fg].$value);
  const b = resolve(tokens.semantic[theme][bg].$value);
  const r = contrast(f, b);
  const ok = r >= min;
  if (!ok) fail++;
  rows.push(`${ok ? "OK  " : "FAIL"}  ${theme.padEnd(6)} ${fg.padEnd(20)} ${f} sobre ${bg.padEnd(22)} ${b}  ${r.toFixed(2)}:1 (mín. ${min})`);
}
console.log(rows.join("\n"));
console.log("\nCombinaciones prohibidas (documentadas, no deben aparecer en componentes):");
for (const [f, b, why] of tokens.contrast.forbidden) console.log(`  ${contrast(f, b).toFixed(2)}:1  ${why}`);
if (fail) {
  console.error(`\n${fail} par(es) no cumplen contraste.`);
  process.exit(1);
}
console.log(`\nContraste: ${tokens.contrast.pairs.length} pares verificados.`);

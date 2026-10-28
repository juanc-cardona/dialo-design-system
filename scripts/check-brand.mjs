#!/usr/bin/env node
// Reglas de marca que se pueden comprobar automáticamente.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { root } from "./lib.mjs";

const errors = [];
const read = (...p) => readFileSync(join(root, ...p), "utf8");

// 1. Componentes sin colores en duro (todo sale de tokens)
for (const f of ["src/css/base.css", "src/css/components.css"]) {
  const css = read(f).replace(/url\("data:[^"]+"\)/g, "");
  const hex = css.match(/#[0-9a-fA-F]{3,8}\b/g);
  if (hex) errors.push(`${f}: colores en duro ${[...new Set(hex)].join(", ")} → usa tokens`);
}

// 2. Fidelidad del logo: cada geometría del maestro existe intacta en la versión de producción
const manifest = JSON.parse(read("assets/logo/manifest.json"));
const geom = (s) => [...s.matchAll(/\s(d|cx|cy|r|x|y|width|height|rx)="([^"]+)"/g)].map((m) => m[0].trim());
for (const l of manifest.logos) {
  const master = read(l.master);
  const prod = read(l.svg);
  const bgW = master.match(/viewBox="0 0 ([\d.]+)/)[1];
  const missing = geom(master.replace(new RegExp(`<rect[^>]*width="${bgW}"[^>]*/>`), "")).filter((g) => !g.startsWith("width=\"" + bgW) && !prod.includes(g));
  if (missing.length) errors.push(`${l.svg}: geometría distinta del maestro (${missing.slice(0, 3).join(" · ")})`);
  const colors = (s) => [...new Set((s.match(/#[0-9a-fA-F]{3,6}\b/g) || []).map((c) => c.toLowerCase()))].sort();
  const allowed = ["#0c4088", "#fc1c70", "#fff", "#3a3a3a", "#000"];
  const bad = colors(prod).filter((c) => !allowed.includes(c));
  if (bad.length) errors.push(`${l.svg}: colores fuera de marca ${bad.join(", ")}`);
}

// 3. Copys de ejemplos y docs: sin emojis, slogan literal
const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F2FF}]/u;
const SLOGAN = "El agente que convierte conversaciones en resultados.";
const scan = (dir) => (existsSync(join(root, dir)) ? readdirSync(join(root, dir)).filter((f) => /\.(html|md)$/.test(f)).map((f) => join(dir, f)) : []);
for (const f of [...scan("examples"), ...scan("docs"), ...scan("skill/dialo-brand"), ...scan("skill/dialo-brand/references"), "README.md"]) {
  if (!existsSync(join(root, f))) continue;
  const s = read(f);
  if (EMOJI.test(s)) errors.push(`${f}: contiene emojis`);
  // El slogan siempre termina en punto (brandbook §02)
  const near = s.match(/[Ee]l agente que convierte conversaciones en resultados.?/g) || [];
  for (const n of near) if (n !== SLOGAN) errors.push(`${f}: slogan no literal → "${n}"`);
}

if (errors.length) {
  console.error("Reglas de marca:\n  " + errors.join("\n  "));
  process.exit(1);
}
console.log(`Marca: ${manifest.logos.length} logos fieles al maestro, componentes sin hex en duro, copys sin emojis y slogan literal.`);

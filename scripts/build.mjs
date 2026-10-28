#!/usr/bin/env node
// Build del sistema de diseño Dialo: una fuente (tokens + src) → todos los destinos.
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from "node:fs";
import { join } from "node:path";
import { root, tokens, resolve, walk } from "./lib.mjs";

const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const D = (...p) => join(root, "dist", ...p);
const read = (...p) => readFileSync(join(root, ...p), "utf8");
const write = (p, s) => { mkdirSync(join(p, ".."), { recursive: true }); writeFileSync(p, s); };
const banner = `/*! Dialo Design System v${pkg.version} · generado desde tokens/dialo.tokens.json · no editar a mano */\n`;

if (existsSync(join(root, "src/react/logos.generated.js")) === false) {
  console.error("Falta src/react/logos.generated.js → ejecuta `npm run logos` primero.");
  process.exit(1);
}
rmSync(D(), { recursive: true, force: true });

// ------------------------------------------------------------------ nombres de variables
const P = tokens.primitive;
const cssName = (path) => {
  const [group, ...rest] = path;
  if (group === "color") {
    const [family, step] = rest;
    if (family === "brand") return `--${step}`;
    if (family === "status") return `--status-${step}-base`;
    return `--${family}-${step}`;
  }
  const map = { font: "font", space: "space", radius: "radius", shadow: "shadow", duration: "duration", easing: "ease", control: "control", breakpoint: "bp", layout: "", icon: "icon" };
  const pre = map[group];
  if (group === "font" && rest[0] === "family") return `--font-${rest[1]}`;
  if (group === "font" && rest[0] === "weight") return `--weight-${rest[1]}`;
  return pre ? `--${pre}-${rest.join("-")}` : `--${rest.join("-")}`;
};
const cssValue = (t) => {
  const v = resolve(t.$value);
  if (t.$type === "fontFamily") return v.map((f) => (/\s/.test(f) && !f.startsWith("-") ? `"${f}"` : f)).join(", ");
  if (t.$type === "cubicBezier") return `cubic-bezier(${v.join(", ")})`;
  return String(v);
};

const primitives = walk(P).map(([path, t]) => [cssName(path), cssValue(t), path]);
const typeVars = [
  ["--type-display-size", "56px"], ["--type-display-line", "64px"],
  ["--type-h1-size", "40px"], ["--type-h1-line", "48px"],
  ["--type-h2-size", "28px"], ["--type-h2-line", "36px"],
];
const semantic = (theme) => walk(tokens.semantic[theme]).map(([path, t]) => [`--${path.join("-")}`, cssValue(t)]);
const block = (sel, pairs) => `${sel} {\n${pairs.map(([k, v]) => `  ${k}: ${v};`).join("\n")}\n}\n`;

const tokensCss =
  banner +
  block(":root", [...primitives.map(([k, v]) => [k, v]), ...typeVars, ["--dl-logo-clear-ratio", "0.188"]]) +
  "\n/* Tema claro (por defecto) */\n" +
  block(':root,\n[data-surface="light"]', semantic("light")) +
  "\n/* Superficie de marca: fondo azul Dialo (portadas, héroes, páginas de sección) */\n" +
  block('[data-surface="brand"]', semantic("brand"));

// ------------------------------------------------------------------ fuentes
const fontFaces = (url) => `/* Montserrat (OFL) y Geist Mono (OFL) */
@font-face { font-family: "Montserrat"; src: ${url("montserrat/Montserrat-Variable.woff2")} format("woff2"); font-weight: 100 900; font-style: normal; font-display: swap; }
@font-face { font-family: "Montserrat"; src: ${url("montserrat/Montserrat-Italic-Variable.woff2")} format("woff2"); font-weight: 100 900; font-style: italic; font-display: swap; }
@font-face { font-family: "Geist Mono"; src: ${url("geist-mono/GeistMono-Variable.woff2")} format("woff2"); font-weight: 100 900; font-style: normal; font-display: swap; }
`;
const fontsCss = banner + fontFaces((f) => `url("../fonts/${f}")`);
const fontsEmbedded = banner + fontFaces((f) => `url(data:font/woff2;base64,${readFileSync(join(root, "fonts", f)).toString("base64")})`);
const fontsGoogle = banner + `/* Alternativa CDN (requiere red): */\n@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;1,300&family=Geist+Mono:wght@400;500&display=swap");\n`;

const baseCss = read("src/css/base.css");
const compCss = read("src/css/components.css");
const coreCss = tokensCss + "\n" + baseCss + "\n" + compCss;

write(D("css/tokens.css"), tokensCss);
write(D("css/fonts.css"), fontsCss);
write(D("css/fonts.google.css"), fontsGoogle);
write(D("css/fonts.embedded.css"), fontsEmbedded);
write(D("css/components.css"), banner + baseCss + "\n" + compCss);
write(D("css/dialo.css"), fontsCss + "\n" + coreCss);
write(D("css/dialo.embedded.css"), fontsEmbedded + "\n" + coreCss);
cpSync(join(root, "fonts"), D("fonts"), { recursive: true });

// ------------------------------------------------------------------ JS tokens
const flat = Object.fromEntries(primitives.map(([k, v]) => [k.slice(2), v]));
const resolvedTheme = (theme) => Object.fromEntries(walk(tokens.semantic[theme]).map(([p, t]) => [p.join("-"), cssValue(t)]));
const typography = Object.fromEntries(Object.entries(tokens.typography).map(([k, t]) => [k, { ...resolve(t.$value), fontFamily: resolve(t.$value).fontFamily }]));
const jsTokens = { version: pkg.version, primitive: flat, light: resolvedTheme("light"), brand: resolvedTheme("brand"), typography };
write(D("tokens/tokens.json"), JSON.stringify(jsTokens, null, 2) + "\n");
write(D("tokens/tokens.mjs"), `${banner}export const tokens = ${JSON.stringify(jsTokens, null, 2)};\nexport default tokens;\n`);
write(D("tokens/tokens.cjs"), `${banner}module.exports = ${JSON.stringify(jsTokens, null, 2)};\n`);

// DTCG (Figma Tokens Studio, Style Dictionary)
write(D("tokens/dtcg/primitives.json"), JSON.stringify({ primitive: tokens.primitive, typography: tokens.typography }, null, 2) + "\n");
write(D("tokens/dtcg/semantic-light.json"), JSON.stringify({ semantic: { light: tokens.semantic.light } }, null, 2) + "\n");
write(D("tokens/dtcg/surface-brand.json"), JSON.stringify({ semantic: { brand: tokens.semantic.brand } }, null, 2) + "\n");

// ------------------------------------------------------------------ Tailwind
const semKeys = Object.keys(resolvedTheme("light"));
const twColors = {
  dialo: { DEFAULT: "var(--dialo)", 900: "var(--dialo-900)", 800: "var(--dialo-800)", 700: "var(--dialo-700)", 400: "var(--dialo-400)", 300: "var(--dialo-300)", 100: "var(--dialo-100)", 50: "var(--dialo-50)" },
  pulse: { DEFAULT: "var(--pulse)", 700: "var(--pulse-700)", 500: "var(--pulse-500)", 50: "var(--pulse-50)" },
  neutral: Object.fromEntries(Object.keys(P.color.neutral).map((k) => [k, `var(--neutral-${k})`])),
  white: "var(--white)", offwhite: "var(--offwhite)", black: "var(--black)", graphite: "var(--graphite)",
  transparent: "transparent", current: "currentColor",
  ...Object.fromEntries(semKeys.map((k) => [k, `var(--${k})`])),
};
const twPreset = {
  theme: {
    colors: twColors,
    fontFamily: { sans: ["var(--font-brand)"], brand: ["var(--font-brand)"], mono: ["var(--font-mono)"] },
    fontWeight: { light: "300", normal: "400", medium: "500", semibold: "600" },
    fontSize: {
      display: ["56px", { lineHeight: "64px", fontWeight: "600" }],
      h1: ["40px", { lineHeight: "48px", fontWeight: "600" }],
      h2: ["28px", { lineHeight: "36px", fontWeight: "600" }],
      h3: ["20px", { lineHeight: "28px", fontWeight: "500" }],
      lead: ["18px", { lineHeight: "30px" }],
      body: ["16px", { lineHeight: "26px" }],
      small: ["14px", { lineHeight: "22px" }],
      label: ["12px", { lineHeight: "16px", letterSpacing: "0.04em", fontWeight: "500" }],
      xs: ["12px", "16px"], sm: ["14px", "22px"], base: ["16px", "26px"], lg: ["18px", "30px"], xl: ["20px", "28px"],
    },
    spacing: { px: "1px", ...Object.fromEntries(Object.keys(P.space).map((k) => [k, `var(--space-${k})`])) },
    borderRadius: { none: "0", ...Object.fromEntries(Object.keys(P.radius).map((k) => [k === "md" ? "DEFAULT" : k, `var(--radius-${k})`])), md: "var(--radius-md)" },
    boxShadow: { none: "none", 1: "var(--shadow-1)", 2: "var(--shadow-2)", 3: "var(--shadow-3)", DEFAULT: "var(--shadow-1)" },
    transitionDuration: { instant: "80ms", fast: "140ms", DEFAULT: "220ms", base: "220ms", slow: "360ms" },
    transitionTimingFunction: { DEFAULT: "var(--ease-out)", out: "var(--ease-out)", "in-out": "var(--ease-in-out)" },
    screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px" },
    extend: { maxWidth: { container: "var(--container)", measure: "var(--measure)" }, height: { "control-sm": "32px", "control-md": "40px", "control-lg": "48px" } },
  },
};
write(D("tailwind/preset.cjs"), `${banner}/** Preset Tailwind v3 · requiere dist/css/tokens.css (o dialo.css) cargado */\nmodule.exports = ${JSON.stringify(twPreset, null, 2)};\n`);
const v4 = [
  "@theme inline {",
  "  --color-*: initial;",
  ...Object.entries(twColors).flatMap(([k, v]) => (typeof v === "string" ? [`  --color-${k}: ${v};`] : Object.entries(v).map(([s, vv]) => `  --color-${k}${s === "DEFAULT" ? "" : "-" + s}: ${vv};`))),
  "  --font-sans: var(--font-brand);",
  "  --font-brand: var(--font-brand);",
  "  --font-mono: var(--font-mono);",
  ...Object.keys(P.radius).map((k) => `  --radius-${k}: var(--radius-${k});`),
  "  --shadow-1: var(--shadow-1);", "  --shadow-2: var(--shadow-2);", "  --shadow-3: var(--shadow-3);",
  "  --spacing: 4px;",
  "  --text-display: 56px; --text-display--line-height: 64px;",
  "  --text-h1: 40px; --text-h1--line-height: 48px;",
  "  --text-h2: 28px; --text-h2--line-height: 36px;",
  "  --text-h3: 20px; --text-h3--line-height: 28px;",
  "  --text-body: 16px; --text-body--line-height: 26px;",
  "  --text-small: 14px; --text-small--line-height: 22px;",
  "  --text-label: 12px; --text-label--line-height: 16px; --text-label--letter-spacing: 0.04em;",
  "  --ease-out: var(--ease-out);",
  "}",
];
write(D("tailwind/dialo-theme.css"), banner + "/* Tailwind v4: @import \"tailwindcss\"; @import \"@axoncore/dialo-design-system/css/tokens.css\"; @import \"@axoncore/dialo-design-system/tailwind/dialo-theme.css\"; */\n" + v4.join("\n") + "\n");

// ------------------------------------------------------------------ React
const factory = read("src/react/factory.js");
const logos = read("src/react/logos.generated.js");
write(D("react/factory.js"), factory);
write(D("react/logos.js"), logos);
const names = ["Logo", "Slogan", "SLOGAN", "Button", "Field", "Input", "Textarea", "Select", "Checkbox", "Radio", "Switch", "Badge", "Chip", "Card", "Tabs", "Alert", "Icon", "Avatar", "AgentAvatar", "Thread", "Message", "QuickReplies", "Typing", "Composer", "OrderCard", "Stat", "EmptyState", "Toast", "LOGO_VARIANTS"];
write(D("react/index.mjs"), `${banner}import * as React from "react";\nimport { createDialo } from "./factory.js";\nimport { LOGO_DATA, LOGO_META } from "./logos.js";\nconst D = createDialo(React, LOGO_DATA, LOGO_META);\nexport const { ${names.join(", ")} } = D;\nexport { LOGO_DATA, LOGO_META };\nexport default D;\n`);
write(D("react/index.d.ts"), banner + read("src/react/index.d.ts"));

// ------------------------------------------------------------------ Claude Design
const { buildClaudeDesign } = await import("./claude-design.mjs");
buildClaudeDesign({ pkg, factory, logos, baseCss, compCss });

// ------------------------------------------------------------------ Skill (assets sincronizados)
const S = (...p) => join(root, "skill", "dialo-brand", "assets", ...p);
if (existsSync(S())) {
  write(S("dialo.css"), coreCss);
  write(S("dialo-fonts.css"), fontsEmbedded);
  cpSync(join(root, "assets/logo/svg"), S("logos"), { recursive: true });
  cpSync(join(root, "assets/favicon/favicon.svg"), S("logos/dialo-favicon.svg"));
}

console.log(`Build v${pkg.version} → dist/{css,fonts,tokens,tailwind,react,claude-design} + skill/dialo-brand/assets`);

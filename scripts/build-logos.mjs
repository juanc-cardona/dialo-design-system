#!/usr/bin/env node
// Genera los logos de producción a partir de los 14 SVG maestros (assets/logo/master).
// - assets/logo/svg/         recorte ajustado, fondo transparente (uso en producto y web)
// - assets/logo/svg-framed/  encuadre original del maestro, con fondo cuando lo tiene (presentaciones, redes)
// - assets/logo/png/         exportaciones PNG
// - assets/favicon/          favicon e iconos de app
// - assets/logo/manifest.json  metadatos (viewBox, área de seguridad, mínimos, fondo)
// Requiere Playwright (solo para medir y rasterizar). Los maestros nunca se modifican.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const A = (...p) => join(root, "assets", ...p);

// Inventario oficial (brandbook §12)
export const LOGOS = [
  { name: "dialo-icon-positive", master: "01", version: "icon", color: "positive" },
  { name: "dialo-icon-mono-black", master: "02", version: "icon", color: "mono-black" },
  { name: "dialo-horizontal-endorsed-mono-black", master: "03", version: "horizontal-endorsed", color: "mono-black" },
  { name: "dialo-horizontal-endorsed-mono-white", master: "04", version: "horizontal-endorsed", color: "mono-white" },
  { name: "dialo-horizontal-endorsed-positive", master: "05", version: "horizontal-endorsed", color: "positive" },
  { name: "dialo-horizontal-endorsed-negative", master: "06", version: "horizontal-endorsed", color: "negative" },
  { name: "dialo-horizontal-mono-black", master: "07", version: "horizontal", color: "mono-black" },
  { name: "dialo-horizontal-mono-white", master: "08", version: "horizontal", color: "mono-white" },
  { name: "dialo-horizontal-positive", master: "09", version: "horizontal", color: "positive" },
  { name: "dialo-horizontal-negative", master: "10", version: "horizontal", color: "negative" },
  { name: "dialo-vertical-positive", master: "11", version: "vertical", color: "positive" },
  { name: "dialo-vertical-mono-black", master: "12", version: "vertical", color: "mono-black" },
  { name: "dialo-vertical-negative", master: "13", version: "vertical", color: "negative" },
  { name: "dialo-vertical-mono-white", master: "14", version: "vertical", color: "mono-white" },
];

const X = 84; // unidad x = diámetro del ojo
const STROKE_PAD = 9; // mitad del trazo de la diadema (18 u)
const MIN = {
  icon: { px: 32, mm: 8 },
  horizontal: { px: 120, mm: 28 },
  "horizontal-endorsed": { px: 200, mm: 45 },
  vertical: { px: 80, mm: 20 },
};
const BG = { positive: "#FFFFFF", negative: "#0C4088", "mono-black": "#FFFFFF", "mono-white": "#000000" };

function clean(svg) {
  return svg
    .replace(/<\?xml[^>]*>\s*/, "")
    .replace(/<!--[\s\S]*?-->\s*/g, "")
    .replace(/\s(id="Capa_1"|version="1\.1")/g, "")
    .replace(/<text\s*\/>\s*/g, "")
    .replace(/\n\s*\n/g, "\n")
    .trim();
}

function splitBackground(svg) {
  const [, w, h] = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  const re = new RegExp(`\\s*<rect(?=[^>]*width="${w}")(?=[^>]*height="${h}")[^>]*/>`);
  const m = svg.match(re);
  if (!m) return { body: svg, bg: null, w: +w, h: +h };
  const fill = (m[0].match(/fill="([^"]+)"/) || [, "#000000"])[1];
  return { body: svg.replace(re, ""), bg: fill.toUpperCase().replace(/^#FFF$/, "#FFFFFF"), w: +w, h: +h };
}

const r2 = (n) => Math.round(n * 100) / 100;

async function main() {
  for (const d of ["svg", "svg-framed", "png"]) mkdirSync(A("logo", d), { recursive: true });
  mkdirSync(A("favicon"), { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();
  const manifest = { unit: { x: X, note: "x = diámetro del ojo del icono, en unidades del archivo maestro" }, logos: [] };
  const inline = {};

  for (const logo of LOGOS) {
    const raw = readFileSync(A("logo", "master", `Marca_Dialo-${logo.master}.svg`), "utf8");
    const cleaned = clean(raw);
    const { body, bg, w, h } = splitBackground(cleaned);

    await page.setContent(`<!doctype html><body style="margin:0">${body}</body>`);
    const bb = await page.evaluate(() => {
      const s = document.querySelector("svg");
      const b = s.getBBox();
      return { x: b.x, y: b.y, width: b.width, height: b.height };
    });
    const vb = {
      x: r2(bb.x - STROKE_PAD),
      y: r2(bb.y - STROKE_PAD),
      w: r2(bb.width + STROKE_PAD * 2),
      h: r2(bb.height + STROKE_PAD * 2),
    };
    const viewBox = `${vb.x} ${vb.y} ${vb.w} ${vb.h}`;
    const inner = body.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "").trim();
    const title = `<title>Dialo</title>`;

    const trimmed = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-label="Dialo">\n  ${title}\n  ${inner}\n</svg>\n`;
    writeFileSync(A("logo", "svg", `${logo.name}.svg`), trimmed);

    const framed = cleaned
      .replace(/^<svg[^>]*>/, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="Dialo">\n  ${title}`) + "\n";
    writeFileSync(A("logo", "svg-framed", `${logo.name}.svg`), framed);

    const clear = logo.version === "icon" ? X : 2 * X;
    manifest.logos.push({
      ...logo,
      master: `assets/logo/master/Marca_Dialo-${logo.master}.svg`,
      svg: `assets/logo/svg/${logo.name}.svg`,
      framed: `assets/logo/svg-framed/${logo.name}.svg`,
      viewBox,
      aspectRatio: r2(vb.w / vb.h),
      background: BG[logo.color],
      framedBackground: bg,
      clearSpace: {
        units: clear,
        rule: logo.version === "icon" ? "1x" : "2x",
        ofHeight: Math.round((clear / vb.h) * 1000) / 1000,
      },
      minSize: MIN[logo.version],
    });
    inline[logo.name] = { viewBox, inner };

    // PNG: recorte transparente a 3 anchos + encuadre con fondo
    for (const width of logo.version === "icon" ? [64, 256, 512, 1024] : [512, 1024, 2048]) {
      const height = Math.round(width / (vb.w / vb.h));
      await page.setViewportSize({ width, height });
      await page.setContent(`<!doctype html><body style="margin:0;background:transparent">${trimmed.replace("<svg ", `<svg width="${width}" height="${height}" `)}</body>`);
      await page.screenshot({ path: A("logo", "png", `${logo.name}@${width}w.png`), omitBackground: true, clip: { x: 0, y: 0, width, height } });
    }
    {
      const width = 2048, height = Math.round(width / (w / h));
      await page.setViewportSize({ width, height });
      await page.setContent(`<!doctype html><body style="margin:0;background:${bg || BG[logo.color]}">${framed.replace("<svg ", `<svg width="${width}" height="${height}" `)}</body>`);
      await page.screenshot({ path: A("logo", "png", `${logo.name}-framed@${width}w.png`), clip: { x: 0, y: 0, width, height } });
    }
  }

  // Favicon e iconos de app (desde el icono positivo; no se crea ninguna versión nueva)
  const icon = inline["dialo-icon-positive"];
  const iconSvg = (pad, bgc) => {
    const [x, y, w, h] = icon.viewBox.split(" ").map(Number);
    const s = Math.max(w, h);
    const p = s * pad;
    const vx = x - (s - w) / 2 - p, vy = y - (s - h) / 2 - p, vs = s + p * 2;
    const rect = bgc ? `<rect x="${r2(vx)}" y="${r2(vy)}" width="${r2(vs)}" height="${r2(vs)}" fill="${bgc}"/>` : "";
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${r2(vx)} ${r2(vy)} ${r2(vs)} ${r2(vs)}">${rect}${icon.inner}</svg>`;
  };
  writeFileSync(A("favicon", "favicon.svg"), iconSvg(0.02) + "\n");
  const shots = [
    ["favicon-16.png", 16, 0.02, null],
    ["favicon-32.png", 32, 0.02, null],
    ["favicon-48.png", 48, 0.02, null],
    ["apple-touch-icon.png", 180, 0.12, "#FFFFFF"],
    ["icon-192.png", 192, 0.12, "#FFFFFF"],
    ["icon-512.png", 512, 0.12, "#FFFFFF"],
    ["icon-maskable-512.png", 512, 0.22, "#FFFFFF"],
  ];
  for (const [file, size, pad, bgc] of shots) {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(`<!doctype html><body style="margin:0;background:transparent">${iconSvg(pad, bgc).replace("<svg ", `<svg width="${size}" height="${size}" `)}</body>`);
    await page.screenshot({ path: A("favicon", file), omitBackground: !bgc, clip: { x: 0, y: 0, width: size, height: size } });
  }
  writeFileSync(
    A("favicon", "site.webmanifest"),
    JSON.stringify(
      {
        name: "Dialo",
        short_name: "Dialo",
        icons: [
          { src: "icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
        theme_color: "#0C4088",
        background_color: "#FFFFFF",
        display: "standalone",
      },
      null,
      2
    ) + "\n"
  );

  await browser.close();
  writeFileSync(A("logo", "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
  writeFileSync(join(root, "src", "react", "logos.generated.js"),
    "// Generado por scripts/build-logos.mjs desde los SVG maestros. No editar a mano.\n" +
    "export const LOGO_DATA = " + JSON.stringify(inline, null, 0) + ";\n" +
    "export const LOGO_META = " + JSON.stringify(Object.fromEntries(manifest.logos.map((l) => [l.name, { version: l.version, color: l.color, aspectRatio: l.aspectRatio, clearSpace: l.clearSpace.ofHeight, minPx: l.minSize.px, background: l.background }])), null, 0) + ";\n");
  console.log(`Logos: ${LOGOS.length} variantes → svg, svg-framed, png, favicon, manifest`);
}

main().catch((e) => { console.error(e); process.exit(1); });

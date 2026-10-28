#!/usr/bin/env node
// Captura el showcase (escritorio y móvil) para docs/ y como material de referencia de Claude Design.
import { createRequire } from "node:module";
import { join } from "node:path";
import { root } from "./lib.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
const url = "file://" + join(root, "examples", "index.html");
const browser = await chromium.launch();
for (const [name, viewport] of [["showcase", { width: 1440, height: 900 }], ["showcase-mobile", { width: 390, height: 844 }]]) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (overflow > 0) console.warn(`${name}: desbordamiento horizontal de ${overflow}px`);
  const font = await page.evaluate(() => document.fonts.check('600 16px Montserrat'));
  if (!font) console.warn(`${name}: Montserrat no cargó`);
  await page.screenshot({ path: join(root, "docs", `${name}.png`), fullPage: true });
  await page.close();
}
await browser.close();
console.log("Showcase → docs/showcase.png, docs/showcase-mobile.png");

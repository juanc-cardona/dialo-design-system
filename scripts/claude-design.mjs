// Genera el sistema de diseño "Dialo" para Claude Design (artefacto Design System)
// desde la misma fuente que producción. Salida: dist/claude-design/project/
// Las imágenes (logos, favicon, personaje) se suben como assets; sus ids viven en claude-design/blobs.json.
import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { root, tokens, resolve, walk } from "./lib.mjs";

const OUT = join(root, "dist", "claude-design", "project");
const w = (p, s) => { const f = join(OUT, p); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, s); };
const read = (p) => readFileSync(join(root, p), "utf8");

// ---------------------------------------------------------------- nombres
const P = tokens.primitive;
const dsName = (ref) => {
  const m = ref.match(/^\{primitive\.color\.(brand|dialo|pulse|neutral)\.([^}]+)\}$/);
  if (!m) return null;
  return m[1] === "brand" ? m[2] : `${m[1]}-${m[2]}`;
};
const colorUsage = {
  dialo: "Azul Dialo, color de marca (RGB 12 64 136 · CMYK 91 53 0 47). Icono, wordmark, fondos de marca, acción primaria. 50–60 % de cada pieza.",
  pulse: "Magenta Pulse de AxonCore (RGB 252 28 112 · CMYK 0 92 24 0). Solo acento ≤ 10 %: diadema, icono de la acción principal, tab activa, dato clave. Nunca fondo amplio, nunca sobre azul Dialo, nunca texto < 24 px.",
  white: "Blanco. Fondo principal, cara del icono, texto sobre azul Dialo.",
  offwhite: "Blanco roto (CMYK 4 3 4 0). Fondos claros y secciones alternas.",
  black: "Negro (CMYK 91 79 62 97). Texto principal y monocromía.",
  graphite: "Gris AxonCore (CMYK 67 58 55 61). Texto secundario y respaldo \"By axoncore\" en la versión positiva.",
  "dialo-900": "Escala del azul. Estados presionados, toasts, tooltips.",
  "dialo-800": "Escala del azul. Hover de elementos azules; superficies sobre la superficie de marca.",
  "dialo-700": "Escala del azul. Igual al azul Dialo.",
  "dialo-400": "Escala del azul. Ilustración y gráficos secundarios. No para texto.",
  "dialo-300": "Escala del azul. Bordes y divisores sobre fondos de marca, chips.",
  "dialo-100": "Escala del azul. Fondos de componentes seleccionados; halo de foco de inputs.",
  "dialo-50": "Escala del azul. Fondos suaves de sección y hover.",
  "pulse-700": "Magenta para texto pequeño sobre blanco o pulse-50 (5,9:1). Solo badges y etiquetas de acento.",
  "pulse-500": "Igual a pulse.",
  "pulse-50": "Fondo tintado del acento (badges de novedad o en vivo).",
  "neutral-0": "Neutral frío. Blanco.",
  "neutral-50": "Neutral frío. Igual a offwhite.",
  "neutral-100": "Neutral frío. Divisores suaves, pista del switch, badge neutral.",
  "neutral-200": "Neutral frío. Bordes por defecto de cards y tablas.",
  "neutral-400": "Neutral frío. Bordes de controles (3,4:1) y texto deshabilitado.",
  "neutral-500": "Neutral frío. Texto atenuado (5,3:1 sobre blanco).",
  "neutral-700": "Neutral frío. Igual a graphite.",
  "neutral-1000": "Neutral frío. Negro.",
};
const semUsage = {
  "bg-canvas": "Fondo de página. Claro: blanco. Marca: azul Dialo.",
  "bg-surface": "Secciones alternas y fondo de paneles de producto.",
  "bg-raised": "Cards, menús, inputs.",
  "bg-subtle": "Fondos suaves de sección.",
  "bg-hover": "Hover de filas, chips, botones secundarios.",
  "bg-selected": "Elementos seleccionados.",
  "bg-brand": "Bloques de marca (héroe, portada, cierre).",
  "text-primary": "Texto de lectura sobre bg-canvas, bg-surface y bg-raised.",
  "text-secondary": "Texto de apoyo sobre bg-canvas y bg-surface.",
  "text-muted": "Metadatos, placeholders y hints sobre bg-canvas y bg-surface (≥ 4,6:1).",
  "text-disabled": "Texto deshabilitado (no requiere contraste).",
  "text-heading": "Títulos (display, h1–h3, slogan) sobre bg-canvas y bg-subtle.",
  "text-link": "Enlaces subrayados sobre bg-canvas.",
  "text-on-brand": "Texto sobre bg-brand.",
  "border-subtle": "Divisores internos y filas de tabla.",
  "border-default": "Borde de cards, tablas y contenedores.",
  "border-strong": "Borde de inputs y controles (≥ 3:1).",
  "border-brand": "Borde de chips y elementos de marca.",
  "action-primary": "Botón primario: una acción por vista. Claro: azul; marca: blanco.",
  "action-primary-hover": "Hover del botón primario.",
  "action-primary-pressed": "Estado presionado del botón primario.",
  "on-action-primary": "Texto e icono sobre action-primary (≥ 8,4:1).",
  "on-action-primary-accent": "Icono de la acción principal (accentIcon) dentro del botón primario: blanco sobre el botón azul; magenta sobre el botón blanco de la superficie de marca.",
  "accent": "Acento magenta: icono de la acción principal, tab activa, punto en vivo, dato clave. En la superficie de marca pasa a blanco porque el magenta no va aislado sobre azul.",
  "accent-text": "Texto de acento pequeño sobre accent-subtle o blanco.",
  "accent-subtle": "Fondo de badges de acento.",
  "focus-ring": "Anillo de foco de 2 px con separación de 2 px.",
  "status-info": "Información; texto sobre status-info-subtle.",
  "status-info-subtle": "Fondo de alertas informativas.",
  "status-success": "Éxito (pagado, sincronizado); texto sobre status-success-subtle. Siempre con icono o palabra.",
  "status-success-subtle": "Fondo de éxito.",
  "status-warning": "Aviso (pendiente, stock bajo); texto sobre status-warning-subtle.",
  "status-warning-subtle": "Fondo de aviso.",
  "status-danger": "Error y acciones destructivas: naranja-rojo, nunca el magenta de marca; texto sobre status-danger-subtle.",
  "status-danger-subtle": "Fondo de error.",
  "bubble-agent": "Burbuja de Dialo (agente) en la conversación.",
  "on-bubble-agent": "Texto sobre bubble-agent.",
  "bubble-customer": "Burbuja del cliente.",
  "on-bubble-customer": "Texto sobre bubble-customer.",
};

const colorTokens = [];
for (const [path, t] of walk(P.color)) {
  if (path[0] === "status") continue;
  const name = path[0] === "brand" ? path[1] : `${path[0]}-${path[1]}`;
  const ref = dsName(t.$value);
  colorTokens.push({ name, value: ref ? `{${ref}}` : resolve(t.$value).toLowerCase(), usage: colorUsage[name] || t.$description || "" });
}
const L = tokens.semantic.light, B = tokens.semantic.brand;
for (const k of Object.keys(L)) {
  if (k.startsWith("$")) continue;
  const val = (t) => { if (!t) return undefined; const r = dsName(t.$value); return r ? `{${r}}` : resolve(t.$value).toLowerCase(); };
  const v = { light: val(L[k]) };
  if (B[k]) v.brand = val(B[k]);
  colorTokens.push({ name: k, value: v, usage: semUsage[k] || "" });
}

const px = (s) => s;
const dsTokens = {
  name: "Dialo",
  version: 1,
  meta: { source: "dialo-design-system", version: JSON.parse(read("package.json")).version, note: "Generado por scripts/claude-design.mjs desde tokens/dialo.tokens.json. Los cambios entran por el repositorio." },
  color: {
    themes: [{ id: "light", name: "Claro" }, { id: "brand", name: "Superficie de marca" }],
    tokens: colorTokens,
  },
  type: {
    fonts: [
      { family: "Montserrat", file: "fonts/Montserrat-Variable.woff2", weight: "100 900", style: "normal" },
      { family: "Montserrat", file: "fonts/Montserrat-Italic-Variable.woff2", weight: "100 900", style: "italic" },
      { family: "Geist Mono", file: "fonts/GeistMono-Variable.woff2", weight: "100 900", style: "normal" },
    ],
    families: {
      brand: 'Montserrat, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
      mono: '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
    },
    groups: [
      {
        name: "Marca",
        family: "brand",
        styles: [
          { name: "display", fontSize: "56px", lineHeight: "64px", fontWeight: 600, usage: "Portadas y héroes de campaña (móvil 40/48). Clase .dl-display.", sample: "Cada conversación, una venta cobrada y medida." },
          { name: "h1", fontSize: "40px", lineHeight: "48px", fontWeight: 600, usage: "Títulos de página (móvil 32/40). Clase .dl-h1.", sample: "Tu catálogo, en cada conversación" },
          { name: "h2", fontSize: "28px", lineHeight: "36px", fontWeight: 600, usage: "Secciones (móvil 24/32). Clase .dl-h2.", sample: "Pedidos, pagos y posventa" },
          { name: "h3", fontSize: "20px", lineHeight: "28px", fontWeight: 500, usage: "Subsecciones y títulos de card. Clase .dl-h3.", sample: "Resumen de la semana" },
          { name: "slogan", fontSize: "20px", lineHeight: "28px", fontWeight: 500, usage: "Firma de marca, literal y con punto final. Tamaño según formato. Clase .dl-slogan.", sample: "El agente que convierte conversaciones en resultados." },
          { name: "lead", fontSize: "18px", lineHeight: "30px", fontWeight: 400, usage: "Entradilla bajo un título. Clase .dl-lead.", sample: "Dialo atiende, vende, cobra y da seguimiento a tus clientes." },
          { name: "body", fontSize: "16px", lineHeight: "26px", fontWeight: 400, usage: "Texto corrido, máximo 70 caracteres por línea. Clase .dl-body.", sample: "Dialo trabaja con el catálogo, los precios y el inventario reales de cada empresa." },
          { name: "small", fontSize: "14px", lineHeight: "22px", fontWeight: 400, usage: "Apoyo e interfaz. Clase .dl-small.", sample: "Actualizado hace 5 minutos." },
          { name: "label", fontSize: "12px", lineHeight: "16px", fontWeight: 500, letterSpacing: "0.04em", usage: "Etiquetas, chips; en mayúsculas como overline (.dl-overline).", sample: "PEDIDOS DEL DÍA" },
          { name: "endorsement", fontSize: "14px", lineHeight: "20px", fontWeight: 300, fontStyle: "italic", usage: "Solo el \"By\" del lockup con respaldo; ya viene en contornos en los logos. No usar en texto.", sample: "By" },
        ],
      },
      {
        name: "Datos",
        family: "mono",
        styles: [{ name: "data", fontSize: "14px", lineHeight: "22px", fontWeight: 400, usage: "Cifras, IDs, importes, código. Clase .dl-data.", sample: "PED-4821 · $ 486.000 · 14 u" }],
      },
    ],
  },
  spacing: {
    note: "Retícula de 4/8 px.",
    tokens: Object.entries(P.space).map(([k, t]) => ({ name: `space-${k}`, value: t.$value, usage: { 0: "Sin espacio.", 1: "Icono-texto compacto.", 2: "Icono-texto, gap de chips.", 3: "Padding vertical de controles, gap de filas.", 4: "Gap por defecto, padding de alertas.", 5: "Padding horizontal de botones.", 6: "Padding de card, gutter.", 8: "Padding de panel.", 10: "Entre grupos de cards.", 12: "Entre bloques medianos.", 16: "Entre bloques de página; sección móvil.", 20: "Aire de héroe.", 24: "Padding de sección en escritorio.", 32: "Héroes de campaña." }[k] })),
  },
  radius: {
    tokens: Object.entries(P.radius).map(([k, t]) => ({ name: `radius-${k}`, value: t.$value, usage: t.$description || (k === "full" ? "Pills, badges, switches." : "") })),
  },
  shadow: {
    note: "Sombras suaves tintadas de azul profundo. Nunca sobre el logo.",
    tokens: [
      { name: "shadow-1", value: P.shadow["1"].$value, usage: "Cards en reposo." },
      { name: "shadow-2", value: P.shadow["2"].$value, usage: "Hover de cards interactivas, menús." },
      { name: "shadow-3", value: P.shadow["3"].$value, usage: "Diálogos, toasts, maqueta de móvil." },
    ],
  },
  control: {
    note: "Alturas de controles.",
    tokens: Object.entries(P.control).map(([k, t]) => ({ name: `control-${k}`, value: t.$value, usage: { sm: "Botón sm, chips de filtro.", md: "Botones e inputs por defecto.", lg: "Botón de héroe." }[k] })),
  },
  layout: {
    tokens: [
      { name: "container", value: "1200px", usage: "Ancho máximo del contenedor." },
      { name: "measure", value: "70ch", usage: "Medida máxima de lectura (Montserrat es ancha)." },
    ],
  },
};

// ---------------------------------------------------------------- bundle.css
const brandAliases = Object.entries(B).filter(([k]) => !k.startsWith("$")).map(([k, t]) => { const r = dsName(t.$value); return `  --${k}: ${r ? `var(--${r})` : resolve(t.$value)};`; }).join("\n");
const lightAliases = Object.entries(L).filter(([k]) => !k.startsWith("$")).map(([k, t]) => { const r = dsName(t.$value); return `  --${k}: ${r ? `var(--${r})` : resolve(t.$value)};`; }).join("\n");
const bundleCss = `/* Dialo — componentes (.dl-*). Los valores vienen de tokens.json (tokens.css). */
:root {
  --duration-instant: 80ms; --duration-fast: 140ms; --duration-base: 220ms; --duration-slow: 360ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1); --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --type-display-size: 56px; --type-display-line: 64px;
  --type-h1-size: 40px; --type-h1-line: 48px;
  --type-h2-size: 28px; --type-h2-line: 36px;
  --dl-logo-clear-ratio: 0.188;
}
/* Islas de superficie dentro de una página: data-surface="brand" | "light" */
[data-surface="brand"] {
${brandAliases}
}
[data-surface="light"] {
${lightAliases}
}

${read("src/css/base.css")}
${read("src/css/components.css")}`;

// ---------------------------------------------------------------- componentes
const groups = {
  Marca: ["Logo", "Slogan"],
  Acciones: ["Button", "Chip"],
  Formularios: ["Field", "Checkbox", "Radio", "Switch"],
  Estado: ["Badge", "Alert", "Toast"],
  Contenido: ["Card", "Tabs", "Avatar", "Stat", "EmptyState"],
  "Conversación": ["Message", "QuickReplies", "Typing", "Composer", "OrderCard", "AgentAvatar"],
};
const bundled = Object.values(groups).flat();

const pv = (group, height, body, { surface, script } = {}) => `<!-- @dsCard group="${group}" height=${height} -->
<!doctype html>
<html lang="es">
<head><meta charset="utf-8"><title>preview</title>
<style>body{margin:0;padding:24px;min-height:100%} .pv-row{display:flex;flex-wrap:wrap;gap:12px;align-items:center} .pv-col{display:flex;flex-direction:column;gap:16px;max-width:560px}</style>
</head>
<body class="dl-root"${surface ? ` data-surface="${surface}"` : ""}>
${body}
${script ? `<script>
  var D = window.Dialo, h = React.createElement;
${script}
</script>` : ""}
</body>
</html>
`;
const mount = (id, expr) => `  ReactDOM.createRoot(document.getElementById(${JSON.stringify(id)})).render(${expr});`;

const blobs = existsSync(join(root, "claude-design/blobs.json")) ? JSON.parse(read("claude-design/blobs.json")).assets : {};
const blobUrl = (k) => (blobs[k] ? `/_blob/${blobs[k].blob}` : `../../assets/${k}`);
const ICON = {
  cart: 'h("svg",{viewBox:"0 0 24 24",width:18,height:18,fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},h("circle",{cx:8,cy:21,r:1}),h("circle",{cx:19,cy:21,r:1}),h("path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"}))',
  check: 'h("svg",{viewBox:"0 0 24 24",width:18,height:18,fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},h("path",{d:"M20 6 9 17l-5-5"}))',
  download: 'h("svg",{viewBox:"0 0 24 24",width:18,height:18,fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},h("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),h("path",{d:"m7 10 5 5 5-5"}),h("path",{d:"M12 15V3"}))',
};

const comps = {
  Logo: {
    readme: `Logo oficial de Dialo: renderiza uno de los 14 archivos maestros en línea, nunca redibujado.

**Cuándo:** cabecera, navegación, portada, cierre y firma. Horizontal por defecto; vertical en formatos cuadrados; icono en app, avatar y favicon; con respaldo "By axoncore" solo fuera del entorno de Dialo (eventos, prensa, alianzas, propuestas a clientes nuevos).

**Props:** \`version\` (\`horizontal\` · \`horizontal-endorsed\` · \`vertical\` · \`icon\`), \`color\` (\`positive\` sobre blanco · \`negative\` sobre azul Dialo · \`mono-black\` sobre claro · \`mono-white\` sobre negro), \`height\` en px, \`clearSpace\` para añadir el área de seguridad (2x lockups, 1x icono). El icono solo existe en \`positive\` y \`mono-black\`; otra combinación lanza error.

**Mínimos:** horizontal 120 px de ancho (32 px de alto ≈ 135 px), con respaldo 200 px (≥ 68 px de alto), vertical 80 px, icono 32 px.

**No:** recolorear, quitar la diadema, deformar, añadir efectos, colocarlo sobre magenta, degradados o fotos recargadas, ni meter el slogan en el lockup. Para \`<img>\` usa los archivos del grupo Logos.`,
    preview: pv("Marca", 300, `<div class="pv-row" style="gap:16px">
  <div id="a" style="padding:24px;background:var(--white);border:1px solid var(--border-subtle);border-radius:var(--radius-lg)"></div>
  <div id="b" style="padding:24px;background:var(--dialo);border-radius:var(--radius-lg)"></div>
  <div id="c" style="padding:24px;background:var(--black);border-radius:var(--radius-lg)"></div>
  <div id="d" style="padding:24px;background:var(--white);border:1px solid var(--border-subtle);border-radius:var(--radius-lg)"></div>
  <div id="e" style="padding:24px;background:var(--white);border:1px solid var(--border-subtle);border-radius:var(--radius-lg)"></div>
</div>`, { script: [mount("a", 'h(D.Logo,{height:36})'), mount("b", 'h(D.Logo,{color:"negative",height:36})'), mount("c", 'h(D.Logo,{color:"mono-white",height:36})'), mount("d", 'h(D.Logo,{version:"horizontal-endorsed",color:"positive",height:72})'), mount("e", 'h(D.Logo,{version:"icon",height:56})')].join("\n") }),
  },
  Slogan: {
    readme: `Slogan oficial: "El agente que convierte conversaciones en resultados." El texto es fijo, en español y con punto final.

**Cuándo:** portadas, cierre de presentaciones y videos, firma de campañas, pie de email, héroe o footer web. Siempre como elemento independiente, fuera del lockup y respetando el área de seguridad.

**Props:** \`as\` (elemento, por defecto \`p\`). Estilo \`slogan\` (Montserrat 500) en \`text-heading\`; sobre la superficie de marca, blanco.`,
    preview: pv("Marca", 120, `<div class="pv-col"><div id="a"></div></div>`, { script: mount("a", "h(D.Slogan)") }),
  },
  Button: {
    readme: `Botón de acción con etiqueta verbo + objeto ("Hacer pedido", "Ver saldo").

**Cuándo:** \`primary\` para la única acción principal de la vista (azul con texto blanco; en la superficie de marca, blanco con texto azul); \`secondary\` y \`ghost\` para alternativas; \`danger\` para acciones destructivas. No existe botón magenta: el magenta solo va en el icono de la acción principal (\`accentIcon\`), y solo cuando el botón es claro (primario sobre la superficie de marca, secundario o ghost). Dentro del botón primario azul el icono queda blanco, porque el magenta no va sobre azul.

**Props:** \`variant\`, \`size\` (\`sm\` 32 · \`md\` 40 · \`lg\` 48), \`icon\` / \`iconRight\` (Lucide, trazo 2), \`accentIcon\`, \`loading\`, \`disabled\`, \`block\`, \`as\` ("a" para enlaces). Sin children = botón de icono: añade \`aria-label\`.

**Estados:** hover (azul 800), presionado (azul 900, baja 1 px), foco (anillo \`focus-ring\`), deshabilitado (40 %), cargando (spinner y \`aria-busy\`).`,
    preview: pv("Acciones", 150, `<div class="pv-col" style="max-width:none"><div id="a" class="pv-row"></div><div id="b" class="pv-row"></div></div>`, {
      script: [mount("a", `h(React.Fragment,null,h(D.Button,{icon:${ICON.cart},accentIcon:true},"Hacer pedido"),h(D.Button,{variant:"secondary",icon:${ICON.download}},"Descargar reporte"),h(D.Button,{variant:"ghost"},"Cancelar"),h(D.Button,{variant:"danger"},"Eliminar regla"))`), mount("b", `h(React.Fragment,null,h(D.Button,{size:"sm"},"Ver saldo"),h(D.Button,{size:"lg"},"Solicitar demo"),h(D.Button,{disabled:true},"Confirmar pago"),h(D.Button,{loading:true},"Procesando"))`)].join("\n"),
    }),
  },
  Chip: {
    readme: `Chip de selección: respuestas rápidas en la conversación y filtros.

**Cuándo:** 2–3 opciones cortas (1–3 palabras, verbo + objeto) que el cliente puede tocar en lugar de escribir; filtros de periodo en paneles.

**Props:** \`pressed\` (seleccionado, \`aria-pressed\`), \`onClick\`, \`disabled\`, children = etiqueta. Borde \`border-brand\`, texto \`text-heading\`, seleccionado en \`bg-selected\`.`,
    preview: pv("Acciones", 90, `<div id="a" class="pv-row"></div>`, { script: mount("a", 'h(React.Fragment,null,h(D.Chip,{pressed:true},"Hoy"),h(D.Chip,null,"7 días"),h(D.Chip,null,"30 días"),h(D.Chip,null,"Repetir pedido"))') }),
  },
  Field: {
    readme: `Campo de formulario: etiqueta, control, ayuda y error enlazados por accesibilidad.

**Cuándo:** todo input, textarea o select. La etiqueta es obligatoria y en sentence case; el error dice qué hacer ("Escribe un número de 10 dígitos.").

**Props:** \`label\`, \`hint\`, \`error\` (pone \`aria-invalid\` y sustituye a hint), \`id\`; children = un \`Input\`, \`Textarea\` o \`Select\` (también exportados).

**Estados:** hover (borde \`text-secondary\`), foco (borde azul + halo \`dialo-100\`), error (borde \`status-danger\`), deshabilitado (50 %).`,
    preview: pv("Formularios", 260, `<div id="a" class="pv-col" style="max-width:420px"></div>`, { script: mount("a", 'h(React.Fragment,null,h(D.Field,{label:"Nombre del negocio",hint:"Así te verán tus clientes en WhatsApp."},h(D.Input,{placeholder:"Tienda La Esquina"})),h(D.Field,{label:"Teléfono",error:"Escribe un número de 10 dígitos."},h(D.Input,{defaultValue:"300 12"})),h(D.Field,{label:"Canal"},h(D.Select,null,h("option",null,"WhatsApp"),h("option",null,"Web"),h("option",null,"App Dialo"))))') }),
  },
  Checkbox: {
    readme: `Casilla de verificación para opciones independientes que se confirman al enviar.

**Props:** \`label\` y los de \`<input type="checkbox">\` (\`checked\`, \`defaultChecked\`, \`onChange\`, \`disabled\`). Marcada en \`action-primary\`. Para efectos inmediatos usa \`Switch\`.`,
    preview: pv("Formularios", 90, `<div id="a" class="pv-row" style="gap:24px"></div>`, { script: mount("a", 'h(React.Fragment,null,h(D.Checkbox,{label:"Pago contra entrega",defaultChecked:true}),h(D.Checkbox,{label:"Crédito"}),h(D.Checkbox,{label:"Transferencia",disabled:true}))') }),
  },
  Radio: {
    readme: `Opción única dentro de un grupo.

**Props:** \`label\`, \`name\` (mismo para el grupo) y los de \`<input type="radio">\`. Seleccionado en \`action-primary\`.`,
    preview: pv("Formularios", 90, `<div id="a" class="pv-row" style="gap:24px"></div>`, { script: mount("a", 'h(React.Fragment,null,h(D.Radio,{name:"f",label:"Diario",defaultChecked:true}),h(D.Radio,{name:"f",label:"Semanal"}),h(D.Radio,{name:"f",label:"Mensual"}))') }),
  },
  Switch: {
    readme: `Interruptor de efecto inmediato ("Recordatorios automáticos").

**Props:** \`checked\` / \`defaultChecked\`, \`onChange(checked)\`, \`label\`, \`disabled\`. Activo en \`action-primary\` con perilla \`on-action-primary\`. Rol \`switch\` con \`aria-checked\`.`,
    preview: pv("Formularios", 90, `<div id="a" class="pv-row" style="gap:24px"></div>`, { script: mount("a", 'h(React.Fragment,null,h(D.Switch,{label:"Recordatorios automáticos",defaultChecked:true}),h(D.Switch,{label:"Ofertas por WhatsApp"}))') }),
  },
  Badge: {
    readme: `Etiqueta corta de estado o categoría. El estado siempre se dice con palabra, no solo con color.

**Props:** \`tone\` (\`neutral\` · \`brand\` canal o categoría · \`accent\` novedad o en vivo · \`success\` pagado · \`warning\` pendiente · \`danger\` rechazado), \`dot\`, \`live\` (punto animado), children = texto.`,
    preview: pv("Estado", 90, `<div id="a" class="pv-row"></div>`, { script: mount("a", 'h(React.Fragment,null,h(D.Badge,null,"Borrador"),h(D.Badge,{tone:"brand"},"WhatsApp"),h(D.Badge,{tone:"accent",live:true},"En vivo"),h(D.Badge,{tone:"success"},"Pagado"),h(D.Badge,{tone:"warning"},"Pendiente"),h(D.Badge,{tone:"danger"},"Rechazado"))') }),
  },
  Alert: {
    readme: `Mensaje de sistema con icono, título y cuerpo.

**Cuándo:** confirmar un resultado, avisar de un riesgo o explicar un error con la acción para resolverlo. Tono calmo y concreto.

**Props:** \`tone\` (\`info\` · \`success\` · \`warning\` · \`danger\`), \`title\`, children = cuerpo. \`danger\` usa \`role="alert"\`; el resto \`role="status"\`.`,
    preview: pv("Estado", 260, `<div id="a" class="pv-col"></div>`, { script: mount("a", 'h(React.Fragment,null,h(D.Alert,{title:"Catálogo sincronizado"},"248 productos con precio e inventario de hoy."),h(D.Alert,{tone:"success",title:"Pago recibido"},"$ 486.000 del pedido 4821."),h(D.Alert,{tone:"warning",title:"Stock bajo"},"Quedan 12 unidades de jugo de 1 L."),h(D.Alert,{tone:"danger",title:"No pudimos conectar con el ERP"},"Revisa las credenciales y vuelve a intentarlo."))') }),
  },
  Toast: {
    readme: `Confirmación breve y temporal de una acción ("Pedido confirmado.").

**Props:** children = texto, \`icon\` opcional (Lucide). Fondo \`dialo-900\`, texto blanco, \`shadow-3\`, \`role="status"\`.`,
    preview: pv("Estado", 80, `<div id="a"></div>`, { script: mount("a", `h(D.Toast,{icon:${ICON.check}},"Pedido confirmado.")`) }),
  },
  Card: {
    readme: `Contenedor de contenido con eyebrow, título y cuerpo.

**Props:** \`eyebrow\` (etiqueta en mayúsculas), \`title\` (H3 azul), children (texto o contenido), \`variant\` (\`surface\` gris sin sombra · \`brand\` azul Dialo con texto blanco), \`interactive\` (hover: sube 2 px y \`shadow-2\`), \`as\`.

**Uso:** una card \`brand\` por grupo como mucho; el resto blancas sobre \`bg-surface\`.`,
    preview: pv("Contenido", 220, `<div id="a" class="dl-grid" style="--dl-min:220px"></div>`, { script: mount("a", 'h(React.Fragment,null,h(D.Card,{eyebrow:"Commerce",title:"Toma pedidos sin ampliar el equipo"},"Dialo recomienda, arma el pedido y lo confirma con el inventario real."),h(D.Card,{eyebrow:"Payments",title:"Cobra dentro de la conversación",variant:"brand"},"Link de pago, contra entrega o crédito."),h(D.Card,{eyebrow:"Analytics",title:"Qué vende cada conversación",interactive:true},"Ventas, conversión y recompra por canal."))') }),
  },
  Tabs: {
    readme: `Navegación entre vistas hermanas.

**Props:** \`items\` (\`[{value, label}]\`), \`value\` / \`defaultValue\`, \`onChange\`, \`label\` (aria). Flechas izquierda/derecha cambian de tab. Indicador activo: trazo magenta de 2 px (uno de los usos permitidos del acento).`,
    preview: pv("Contenido", 90, `<div id="a"></div>`, { script: mount("a", 'h(D.Tabs,{items:[{value:"c",label:"Conversaciones"},{value:"p",label:"Pedidos"},{value:"g",label:"Pagos"},{value:"a",label:"Analytics"}]})') }),
  },
  Avatar: {
    readme: `Avatar de persona con forma squircle (22,7 %, la del icono).

**Props:** \`name\` (iniciales y aria-label), \`src\`, \`size\` (\`sm\` 32 · \`md\` 40 · \`lg\` 56). Para el agente usa \`AgentAvatar\`.`,
    preview: pv("Contenido", 90, `<div id="a" class="pv-row"></div>`, { script: mount("a", 'h(React.Fragment,null,h(D.Avatar,{name:"Marta Ruiz",size:"sm"}),h(D.Avatar,{name:"Tienda La Esquina"}),h(D.Avatar,{name:"Juan Pérez",size:"lg"}),h(D.AgentAvatar,{size:"lg"}))') }),
  },
  Stat: {
    readme: `Indicador clave con etiqueta, cifra y contexto.

**Props:** \`label\`, \`value\`, \`delta\` ("+18 %"), \`deltaTone\` (\`success\` · \`danger\` · \`warning\` · \`neutral\`), \`context\` ("vs. mes anterior"). Toda cifra lleva periodo o comparación. Cifra en Montserrat 600 40/48 azul con números tabulares.`,
    preview: pv("Contenido", 140, `<div id="a" class="dl-grid" style="--dl-min:180px"></div>`, { script: mount("a", 'h(React.Fragment,null,h(D.Stat,{label:"Ventas cobradas",value:"$ 42,8 M",delta:"+18 %",context:"vs. mes anterior"}),h(D.Stat,{label:"Conversaciones",value:"12.406",delta:"+9 %",context:"últimos 30 días"}),h(D.Stat,{label:"Conversión",value:"31 %",delta:"−2 pts",deltaTone:"danger",context:"vs. mes anterior"}))') }),
  },
  EmptyState: {
    readme: `Estado vacío con el personaje oficial, título, explicación y una acción.

**Props:** \`title\`, children (qué aparecerá aquí y cómo conseguirlo), \`action\` (un \`Button\` primario), \`art\` (URL del render oficial del personaje, grupo Personaje). El personaje nunca sustituye al logo ni se modifica.`,
    preview: pv("Contenido", 400, `<div id="a"></div>`, { script: mount("a", `h(D.EmptyState,{title:"Aún no hay pedidos hoy",art:${JSON.stringify(blobUrl("Personaje/dialo-character.jpg"))},action:h(D.Button,null,"Compartir catálogo")},"Cuando un cliente compre por WhatsApp o en tu tienda, verás aquí el pedido y su pago.")`) }),
  },
  Message: {
    readme: `Mensaje de la conversación entre Dialo y el cliente. Va dentro de \`Thread\` (\`role="log"\`, exportado).

**Props:** \`from\` (\`agent\`: izquierda, avatar con el icono, burbuja \`bubble-agent\` · \`customer\`: derecha, burbuja azul \`bubble-customer\`), \`time\`, \`avatar\`, children.

**Voz del agente:** dato o resultado → propuesta concreta → opción fácil de responder. Tuteo, sin emojis ni exclamaciones. Dialo no se presenta como chatbot.`,
    preview: pv("Conversación", 260, `<div id="a" style="max-width:520px"></div>`, { script: mount("a", 'h(D.Thread,null,h(D.Message,{time:"09:12"},"Hola, Marta. Te quedan 3 cajas de agua de 600 ml. ¿Repetimos el pedido de la semana pasada?"),h(D.Message,{from:"customer",time:"09:13"},"Sí, y súmale 2 cajas de jugo."),h(D.Message,null,"Listo, ya quedó apuntado. Llega mañana antes de las 10."))') }),
  },
  QuickReplies: {
    readme: `Respuestas rápidas bajo un mensaje del agente.

**Props:** \`options\` (2–3 textos de 1–3 palabras, verbo + objeto), \`onSelect(option)\`. Se alinean con la burbuja del agente.`,
    preview: pv("Conversación", 150, `<div id="a" style="max-width:520px"></div>`, { script: mount("a", 'h(D.Thread,null,h(D.Message,null,"Son $ 486.000. ¿Cómo quieres pagar?"),h(D.QuickReplies,{options:["Pagar con link","Contra entrega"]}))') }),
  },
  Typing: {
    readme: `Indicador de que Dialo está escribiendo. Sin props. \`role="status"\` con etiqueta "Dialo está escribiendo".`,
    preview: pv("Conversación", 80, `<div id="a"></div>`, { script: mount("a", "h(D.Typing)") }),
  },
  Composer: {
    readme: `Caja para escribir y enviar un mensaje.

**Props:** \`placeholder\` ("Escribe un mensaje"), \`onSend(text)\`, \`sendLabel\` (aria del botón, "Enviar mensaje"). Foco con borde azul y halo \`dialo-100\`.`,
    preview: pv("Conversación", 90, `<div id="a" style="max-width:420px"></div>`, { script: mount("a", "h(D.Composer)") }),
  },
  OrderCard: {
    readme: `Resumen de un pedido o producto dentro de la conversación.

**Props:** \`title\` ("Pedido 4821 · 14 cajas"), \`meta\` (forma de pago, entrega), \`amount\` (en Geist Mono, azul).`,
    preview: pv("Conversación", 100, `<div id="a" style="max-width:360px"></div>`, { script: mount("a", 'h(D.OrderCard,{title:"Pedido 4821 · 14 cajas",meta:"Pago contra entrega · llega mañana",amount:"$ 486.000"})') }),
  },
  AgentAvatar: {
    readme: `Avatar del agente: siempre el icono oficial positivo dentro de un squircle blanco. No se sustituye por el personaje ni por otra imagen.

**Props:** \`size\` (\`sm\` 32 · \`md\` 40 · \`lg\` 56).`,
    preview: pv("Conversación", 90, `<div id="a" class="pv-row"></div>`, { script: mount("a", 'h(React.Fragment,null,h(D.AgentAvatar,null),h(D.AgentAvatar,{size:"md"}),h(D.AgentAvatar,{size:"lg"}))') }),
  },
};

// Componentes solo CSS (sin React)
const cssOnly = {
  Table: {
    readme: `Tabla de datos (solo CSS): \`.dl-table-wrap\` > \`table.dl-table\`.

Cabeceras en etiqueta mayúscula \`text-secondary\` sobre \`bg-surface\`; filas con divisor \`border-subtle\` y hover \`bg-hover\`; columnas numéricas con \`td.is-num\` (Geist Mono, alineadas a la derecha). Estados con \`Badge\`.`,
    preview: pv("Contenido", 220, `<div class="dl-table-wrap"><table class="dl-table">
<thead><tr><th>Pedido</th><th>Cliente</th><th>Canal</th><th>Estado</th><th class="is-num">Total</th></tr></thead>
<tbody>
<tr><td class="dl-data">PED-4821</td><td>Tienda La Esquina</td><td>WhatsApp</td><td><span class="dl-badge dl-badge--success">Pagado</span></td><td class="is-num">$ 486.000</td></tr>
<tr><td class="dl-data">PED-4820</td><td>Minimercado Sol</td><td>App Dialo</td><td><span class="dl-badge dl-badge--warning">Pendiente</span></td><td class="is-num">$ 212.500</td></tr>
<tr><td class="dl-data">PED-4819</td><td>Droguería Central</td><td>Web</td><td><span class="dl-badge dl-badge--success">Pagado</span></td><td class="is-num">$ 1.080.000</td></tr>
</tbody></table></div>`),
  },
  Nav: {
    readme: `Barra de navegación (solo CSS): \`nav.dl-nav\` > logo horizontal positivo (\`.dl-logo\`, 32 px de alto) + \`.dl-nav__links\` > \`a.dl-nav__link\` (\`aria-current="page"\` en la activa) + un botón primario \`sm\`.

Siempre clara (\`data-surface="light"\`) con el logo positivo. Fondo translúcido con blur y borde \`border-subtle\`. Por debajo de 768 px los enlaces se ocultan: el producto debe ofrecer un menú.`,
    preview: pv("Contenido", 110, `<nav class="dl-nav" data-surface="light" style="position:static">
  <span class="dl-logo" style="--dl-logo-h:32px"><img src="${blobUrl("Logos/dialo-horizontal-positive.svg")}" alt="Dialo" style="height:32px;width:auto"></span>
  <div class="dl-nav__links"><a class="dl-nav__link" href="#" aria-current="page">Conversaciones</a><a class="dl-nav__link" href="#">Pedidos</a><a class="dl-nav__link" href="#">Analytics</a></div>
  <a class="dl-btn dl-btn--primary dl-btn--sm" href="#">Compartir catálogo</a>
</nav>`),
  },
};

// ---------------------------------------------------------------- cover
const cover = `<!-- @dsCard height=288 -->
<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Dialo</title>
<style>
  html, body { margin:0; height:100%; }
  body { background:var(--bg-canvas); color:var(--text-heading); font-family:var(--font-brand); overflow:hidden; }
  .cover { position:relative; height:288px; overflow:hidden; }
  .art { position:absolute; top:0; left:480px; width:480px; height:288px; overflow:hidden; }
  .art svg { display:block; width:480px; height:288px; }
  .slab { fill:var(--action-primary); }
  .deep { fill:var(--dialo-900); }
  .tint { fill:var(--bg-selected); }
  .band { fill:none; stroke:var(--accent); stroke-width:6; stroke-linecap:round; }
  .pad { fill:var(--accent); }
  .chip { fill:none; stroke:var(--border-brand); stroke-width:2; }
  .r-xl { rx:var(--radius-xl); } .r-lg { rx:var(--radius-lg); }
  .words { position:absolute; left:var(--space-6); bottom:var(--space-6); max-width:440px; }
  .name { margin:0; font-size:120px; line-height:.92; font-weight:600; letter-spacing:-.02em; color:var(--text-heading); }
  .tag { margin:var(--space-3) 0 0 6px; font-size:14px; line-height:20px; font-weight:500; color:var(--text-muted); }
</style>
</head>
<body>
<div class="cover">
<div class="art" aria-hidden="true">
<svg viewBox="0 0 480 288" width="480" height="288">
<!--
  blocks      action-primary 176×176 (the brand slab: Dialo blue, white on the brand surface) · dialo-900 136×232 bled off the right edge · bg-selected 112×72 (the tint) — about a third of 960×288
  arrangement one squircle slab with satellites, bottoms on one line space-6 above the edge, space-4 gutters
  pattern     literal motif, the headset: a continuous accent arc hugging the slab's top and sides with two pads, from the README "the headset stays magenta in every version"; plus three outlined quick-reply pills in border-brand
  scales      sides in space-2 multiples; gutters space-4; corners radius-xl (slab), radius-lg (satellites); pills rx half of space-6; band stroke ≈ 2.2 % of the slab like the headset
-->
<rect class="deep r-lg" x="344" y="-16" width="152" height="280" rx="16"/>
<rect class="tint r-lg" x="216" y="192" width="112" height="72" rx="16"/>
<rect class="slab r-xl" x="24" y="88" width="176" height="176" rx="24"/>
<path class="band" d="M 16 196 L 16 120 A 40 40 0 0 1 56 80 L 168 80 A 40 40 0 0 1 208 120 L 208 196"/>
<rect class="pad" x="6" y="148" width="20" height="56" rx="10"/>
<rect class="pad" x="198" y="148" width="20" height="56" rx="10"/>
<rect class="chip" x="216" y="96" width="72" height="24" rx="12"/>
<rect class="chip" x="216" y="136" width="104" height="24" rx="12"/>
<rect class="chip" x="296" y="96" width="32" height="24" rx="12"/>
</svg>
</div>
<div class="words">
  <p class="name">Dialo</p>
  <p class="tag">El agente que convierte conversaciones en resultados.</p>
</div>
</div>
</body>
</html>
`;

// ---------------------------------------------------------------- README y secciones
const readme = `Dialo es el agente de comercio conversacional de AxonCore: atiende, vende, cobra y da seguimiento a los clientes en WhatsApp, e-commerce, app o terminal de punto de venta. Este sistema sale del repositorio \`dialo-design-system\` (tokens, CSS y React idénticos a producción) y del brandbook v1.3. Úsalo para decks, documentos, páginas, pantallas de producto y piezas de campaña.

## Reglas que no se rompen

- Usa solo los logos del grupo **Logos** (o el componente \`Logo\`). Nunca reescribas "Dialo" con la fuente ni redibujes el icono. La diadema es magenta en todas las versiones.
- Proporción por pieza: \`dialo\` 50–60 %, blancos y neutrales 30–40 %, \`pulse\` como máximo 10 %.
- \`pulse\` nunca como fondo amplio, nunca sobre \`dialo\` (2,6:1), nunca con texto blanco encima por debajo de 24 px (3,8:1). Para texto magenta pequeño, \`accent-text\` sobre \`accent-subtle\`.
- Errores en \`status-danger\` (naranja-rojo), nunca en magenta. Todo estado lleva palabra o icono.
- Montserrat para todo (\`--font-brand\`); Geist Mono (\`--font-mono\`) solo para cifras, IDs y código. Escala de 400 / 500 / 600; Light 300 Italic solo en el "By" del respaldo.
- Sin emojis, sin signos de exclamación, sin buzzwords. Tuteo. Botones verbo + objeto.
- Dialo nunca se presenta como chatbot ni como canal de atención al cliente.
- Slogan literal, en español, con punto final y fuera del lockup: **El agente que convierte conversaciones en resultados.**

## Contenido

**Voz.** Como alguien del equipo comercial que conoce el negocio y entrega resultados: cercano, claro y al grano. Resultado primero.

| Así sí | Así no |
|---|---|
| "Tu pedido llega mañana antes de las 10." | "Te informamos que tu pedido ha sido procesado y será entregado..." |
| "Listo, ya quedó apuntado." | "Súper genial, ya está todo listo para ti." |
| "Te quedan 3 cajas. ¿Repetimos el pedido de la semana pasada?" | "¿En qué más te puedo ayudar hoy?" |

- Mayúscula inicial solo en la primera palabra; mayúsculas completas solo en etiquetas cortas (\`label\` como overline).
- Titulares de marketing concretos y orientados a resultado: "Cada conversación, una venta cobrada y medida."
- Descripción oficial en una frase: "Dialo es un ecosistema de comercio con IA conversacional que atiende, vende, cobra y da seguimiento a tus clientes en el canal donde están." Versiones corta y completa en la sección Marca.
- Mensajes del agente: dato → propuesta → respuesta rápida (componente \`QuickReplies\`).

## Fundamentos visuales

**Color.** Tema **Claro** por defecto: \`bg-canvas\` blanco, \`bg-surface\` \`offwhite\` para secciones alternas y paneles, \`text-primary\` negro, \`text-secondary\` \`graphite\`, \`text-heading\` azul Dialo. Tema **Superficie de marca** (o \`data-surface="brand"\` en un contenedor) para portadas, héroes, páginas de sección y cierres: fondo \`dialo\`, texto blanco, botón primario blanco. No hay modo oscuro. La escala \`dialo-900…50\` es para interfaz, ilustración y gráficos, nunca para el logo.

**Tipografía.** \`display\` 56/64 para portadas y héroes, \`h1\` 40/48, \`h2\` 28/36, \`h3\` 20/28, \`body\` 16/26 (máximo 70 caracteres por línea), \`small\` 14/22, \`label\` 12/16 +4 %. Títulos en \`text-heading\`.

**Espaciado y forma.** Retícula 4/8 (\`space-*\`). Contenedor \`container\` 1200 px. Radios: \`radius-sm\` inputs, \`radius-md\` botones y burbujas, \`radius-lg\` cards, \`radius-xl\` paneles, \`radius-squircle\` (22,7 %, la del icono) para avatares.

**Elevación.** \`shadow-1\` cards, \`shadow-2\` hover y menús, \`shadow-3\` diálogos y toasts. Sombras suaves tintadas de azul; nunca en el logo.

**Movimiento.** 80 / 140 / 220 / 360 ms con \`cubic-bezier(0.16, 1, 0.3, 1)\`. Botón presionado baja 1 px; card interactiva sube 2 px. Respeta reduced motion.

**Foco y accesibilidad.** Anillo sólido de 2 px en \`focus-ring\` con 2 px de separación. Todo texto ≥ 4,5:1 (≥ 3:1 a 24 px o más, bordes de control e iconos).

**Personaje.** Un único render oficial (grupo **Personaje**): el icono en volumen, cabeza y cuerpo a la vez, brazos y piernas finos, sin vestuario ni variaciones. Para onboarding, campañas, estados vacíos y comunicación; nunca sustituye al logo. Fondo gris claro de estudio o color plano de la paleta.

**Composición.** Landing: nav blanca con logo horizontal positivo → héroe en superficie de marca con maqueta de conversación → secciones blancas y \`bg-surface\` alternas → cierre azul con logo negativo y slogan. Deck: portada azul (logo horizontal negativo + slogan), contenido blanco, separadores azules, cierre azul. Producto: \`bg-surface\` con cards blancas y una acción primaria por vista.

## Iconografía

Lucide, trazo de 2 px, terminaciones y uniones redondeadas, 16 / 20 / 24 px, \`currentColor\`. Color \`dialo\` o \`graphite\`; \`pulse\` solo en el icono de la acción principal de la vista (\`Button\` con \`accentIcon\`). Sin emojis. Iconos frecuentes: message-circle, shopping-cart, credit-card, package, chart-line, store, refresh-ccw.

## Logo

Elige la versión por el fondo: blanco u \`offwhite\` → positiva; \`dialo\` → negativa; negro o muy oscuro → monocromía blanca; foto clara y limpia → monocromía negra; magenta, degradados o fotos recargadas → no se coloca. Horizontal por defecto, vertical en formatos cuadrados, icono en app, avatar y favicon. El respaldo "By axoncore" solo cuando Dialo aparece fuera de su entorno (eventos, prensa, alianzas, propuestas a clientes nuevos). Área de seguridad 2x (x = diámetro del ojo) en lockups y 1x en el icono. Mínimos: horizontal 120 px, con respaldo 200 px, vertical 80 px, icono 32 px. Detalle en la sección Logo.
`;

const fixPaths = (s) => s.replace(/`assets\/logos\/`/g, "el grupo **Logos**").replace(/assets\/logos\//g, "assets/Logos/").replace(/`assets\/dialo-character\.jpg`/g, "el grupo **Personaje**");
const sections = {
  "marca.md": read("skill/dialo-brand/references/foundations.md").replace(/^# .*$/m, "# Marca"),
  "logo.md": fixPaths(read("skill/dialo-brand/references/logo.md")).replace(/^# .*$/m, "# Logo"),
  "personaje.md": fixPaths(read("skill/dialo-brand/references/character.md")).replace(/^# .*$/m, "# Personaje").replace(/ Render: .*?\n/, " Render: grupo **Personaje**.\n"),
  "voz.md": read("skill/dialo-brand/references/voice.md").replace(/^# .*$/m, "# Voz y tono"),
};

const groupReadmes = {
  Logos: `Los 14 logos oficiales de Dialo: recorte ajustado y fondo transparente, generados de los SVG maestros sin alterar la geometría. Colócalos sobre su fondo: \`positive\` sobre blanco u \`offwhite\` (cuerpo y wordmark azul Dialo, diadema magenta, respaldo \`graphite\`); \`negative\` sobre \`dialo\` (blanco, cara azul); \`mono-black\` sobre claro (negro); \`mono-white\` sobre negro (blanco, cara negra). La diadema es magenta en todas. \`endorsed\` = con respaldo "By axoncore" (mínimo 200 px). El icono solo existe en positivo y monocromía negra.`,
  Favicon: `Favicon (SVG del icono positivo) e iconos de app sobre blanco (512 px y apple-touch 180 px). No existe icono negativo.`,
  Personaje: `Render oficial y único del personaje Dialo (720 × 1280, fondo gris claro de estudio). No se modifica ni se generan variaciones; nunca sustituye al logo.`,
};

// ---------------------------------------------------------------- bundle.js
function buildBundle(factory, logos) {
  const strip = (s) => s.replace(/^export\s+(const|function)\s/gm, "$1 ").replace(/^\/\/.*$/gm, "");
  const header = `/* @ds-bundle: ${JSON.stringify({ format: 4, namespace: "Dialo", components: bundled.map((name) => ({ name })) })} */`;
  const js = `${header}\n(function (global) {\n"use strict";\n${strip(logos)}\n${strip(factory)}\n  global.Dialo = createDialo(global.React, LOGO_DATA, LOGO_META);\n})(window);\n`;
  if (/<\/script|<!--/i.test(js)) throw new Error("bundle.js contiene </script o <!--");
  return js;
}

export function buildClaudeDesign({ factory, logos }) {
  rmSync(join(root, "dist", "claude-design"), { recursive: true, force: true });
  w("tokens.json", JSON.stringify(dsTokens, null, 2) + "\n");
  w("README.md", readme);
  for (const [f, s] of Object.entries(sections)) w(f, s);
  w("components/bundle.js", buildBundle(factory, logos));
  if (/<\/style/i.test(bundleCss)) throw new Error("bundle.css contiene </style");
  w("components/bundle.css", bundleCss);
  w("components/index.d.ts", read("src/react/index.d.ts"));
  for (const [name, c] of Object.entries({ ...comps, ...cssOnly })) {
    w(`components/${name}/README.md`, `# ${name}\n\n${c.readme}\n`);
    w(`components/${name}/preview.html`, c.preview);
  }
  w("components/Cover/preview.html", cover);
  for (const [g, s] of Object.entries(groupReadmes)) w(`assets/${g}/README.md`, s + "\n");
  for (const f of ["Montserrat-Variable.woff2", "Montserrat-Italic-Variable.woff2"]) cpSync(join(root, "fonts/montserrat", f), join(OUT, "fonts", f));
  cpSync(join(root, "fonts/geist-mono/GeistMono-Variable.woff2"), join(OUT, "fonts/GeistMono-Variable.woff2"));
  // React 18.3.1 empaquetado para que las previews no dependan de la CDN
  for (const f of ["react.production.min.js", "react-dom.production.min.js"]) cpSync(join(root, "claude-design/lib", f), join(OUT, "components/lib", f));

  // índice (solo como plantilla: assetGroups con los ids subidos)
  const assetGroups = {};
  for (const [k, v] of Object.entries(blobs)) {
    const [g, file] = k.split("/");
    assetGroups[g] ||= { name: g, tile: g === "Logos" ? "l" : g === "Personaje" ? "l" : "s", order: [], files: {} };
    assetGroups[g].order.push(file);
    assetGroups[g].files[file] = { name: file, blob: v.blob, size: v.size, type: v.type };
  }
  writeFileSync(join(root, "dist", "claude-design", "index.template.json"), JSON.stringify({ namespace: "Dialo", libraries: [
    { name: "react", version: "18.3.1", global: "React", file: "components/lib/react.production.min.js" },
    { name: "react-dom", version: "18.3.1", global: "ReactDOM", file: "components/lib/react-dom.production.min.js" },
  ], groups: Object.keys(assetGroups), assetGroups }, null, 2) + "\n");
}

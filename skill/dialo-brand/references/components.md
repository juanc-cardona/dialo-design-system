# Componentes, layout e iconografía

Todo sale de `assets/dialo.css` (tokens + base + componentes). Raíz: `<body class="dl-root">`. Superficie azul: `data-surface="brand"` en cualquier contenedor.

## Layout

- Retícula 4/8 px. Tokens `--space-1` 4 · `2` 8 · `3` 12 · `4` 16 · `5` 20 · `6` 24 · `8` 32 · `10` 40 · `12` 48 · `16` 64 · `20` 80 · `24` 96 · `32` 128.
- Contenedor `.dl-container` 1200 px (padding 24, móvil 16). Secciones `.dl-section` (96 px vertical, 64 en móvil).
- Utilidades: `.dl-stack` (columna), `.dl-row` (fila que envuelve), `.dl-grid` (auto-fit; `--dl-min` ancho mínimo de columna), `--dl-gap` para el espacio. `.dl-divider`.
- Breakpoints 640 / 768 / 1024 / 1280.
- Radios: `--radius-xs` 4 (checkbox) · `sm` 8 (inputs, chips) · `md` 12 (botones, burbujas, alertas) · `lg` 16 (cards) · `xl` 24 (paneles, media) · `squircle` 22,7 % (avatares, app icon) · `full`.
- Elevación: `--shadow-1` cards en reposo · `--shadow-2` hover, menús · `--shadow-3` diálogos, toasts. Sombras tintadas de azul profundo, suaves. Nunca sombras en el logo.
- Movimiento: `--duration-instant` 80 (press) · `fast` 140 (hover, foco) · `base` 220 (menús, tabs) · `slow` 360 (diálogos); `--ease-out` `cubic-bezier(0.16, 1, 0.3, 1)`. Botón presionado baja 1 px; card interactiva sube 2 px. Respeta `prefers-reduced-motion`.

## Componentes

| Componente | Marcado | Notas |
|---|---|---|
| Botón | `button.dl-btn.dl-btn--primary` · `--secondary` · `--ghost` · `--danger`; tamaños `--sm` 32, md 40, `--lg` 48; `--icon`, `--block` | Una acción primaria por vista. Icono de la acción principal con `<span class="dl-btn__accent">svg</span>`: magenta solo si el botón es claro (primario sobre superficie de marca, secundario, ghost); dentro del botón azul queda blanco, porque el magenta no va sobre azul. Disabled 0,4; cargando: `.dl-spinner` + `data-loading="true"` + `aria-busy` |
| Campo | `.dl-field` > `label.dl-field__label` + `input.dl-input` + `.dl-field__hint` / `.dl-field__error` | `aria-invalid="true"` para error. `textarea.dl-input`, `select.dl-input` |
| Checkbox / radio | `label.dl-choice` > `input.dl-check` / `input.dl-radio` | Checkbox = se confirma al enviar |
| Switch | `button.dl-switch[role=switch][aria-checked]` | Efecto inmediato |
| Badge | `.dl-badge` + `--brand` · `--accent` · `--success` · `--warning` · `--danger`; `.dl-badge__dot`; `--live` | Estados siempre con palabra |
| Chip | `button.dl-chip[aria-pressed]` | Respuestas rápidas y filtros |
| Card | `.dl-card` > `.dl-card__eyebrow` + `.dl-card__title` + `.dl-card__body`; `--surface`, `--brand`, `--interactive` | `--brand` = card azul con texto blanco |
| Tabs | `.dl-tabs[role=tablist]` > `button.dl-tab[role=tab][aria-selected]` | Indicador activo magenta de 2 px |
| Alerta | `.dl-alert.dl-alert--info|success|warning|danger` > svg `.dl-alert__icon` + `.dl-alert__title` + `.dl-alert__body` | `danger` con `role="alert"` |
| Avatar | `.dl-avatar` (`--sm` 32, md 40, `--lg` 56); `--agent` con el icono oficial | Forma squircle |
| Conversación | `.dl-thread` > `.dl-msg.dl-msg--agent|customer` > `.dl-bubble` (+ `.dl-msg__meta` hora); `.dl-quick-replies` > `.dl-chip`; `.dl-typing` (3 `span`); `form.dl-composer` > `input.dl-composer__input` + botón icono | Agente: avatar con icono positivo, burbuja #F6F6F6. Cliente: burbuja azul, alineada a la derecha |
| Pedido en chat | `.dl-order` > `.dl-order__title` + `.dl-order__amount` + `.dl-order__meta` | Importe en Geist Mono |
| KPI | `.dl-stat` > `.dl-stat__label` + `.dl-stat__value` + `.dl-stat__meta` (badge de variación + contexto) | Toda cifra con periodo o comparación |
| Tabla | `.dl-table-wrap` > `table.dl-table`; `td.is-num` | Cabeceras en etiqueta mayúscula; cifras alineadas a la derecha en mono |
| Navegación | `nav.dl-nav` > `.dl-logo` + `.dl-nav__links` > `a.dl-nav__link[aria-current]` + botón | Fondo translúcido con blur; enlaces ocultos < 768 px (usar menú) |
| Estado vacío | `.dl-empty` > `img.dl-empty__art` (personaje) + `.dl-empty__title` + `.dl-empty__body` + botón | |
| Toast / tooltip | `.dl-toast` (azul 900, texto blanco) · `.dl-tooltip` | |
| Logo | `span.dl-logo` con `--dl-logo-h: 32px` > svg en línea | `--dl-logo-clear` añade el área de seguridad |

Foco visible en todo: anillo de 2 px `--focus-ring` con 2 px de separación.

## Iconografía

Lucide (ISC), trazo **2 px**, `stroke-linecap: round`, `stroke-linejoin: round`, `fill: none`, `stroke: currentColor`. Tamaños 16 / 20 / 24. Color azul Dialo o #3A3A3A; magenta solo en el icono de la acción principal de la vista. Sin emojis, sin iconos rellenos salvo estados puntuales.

Iconos frecuentes: `message-circle` (conversación), `shopping-cart` (pedido), `credit-card` (pago), `package` (posventa/envío), `chart-line` (analytics), `megaphone` (marketing), `store` (punto de venta), `refresh-ccw` (recompra).

## Páginas y piezas

- **Landing / web:** nav con logo horizontal positivo → héroe en superficie de marca (display blanco, lead, botón primario blanco con icono magenta, maqueta de conversación) → secciones blancas y #F6F6F6 alternas → cierre azul con logo negativo y slogan.
- **Producto (panel):** fondo #F6F6F6, cards blancas, títulos azules, una acción primaria por vista; el agente se representa con su avatar (icono), no con el personaje.
- **Decks:** portada azul con logo horizontal negativo + slogan; páginas de contenido blancas; páginas de sección azules; cierre con icono o logo sobre azul + slogan. Con respaldo solo si el deck sale fuera del ecosistema (cliente nuevo, evento).
- **Documentos:** fondo blanco, títulos azules, cuerpo negro 16/26, logo horizontal positivo en cabecera.
- **Redes:** vertical o icono; personaje oficial para campañas sobre fondo plano.
- **Email:** cabecera blanca con logo horizontal positivo (≥ 120 px de ancho, PNG de `assets/logo/png/` del repositorio para clientes que no soportan SVG); pie con slogan.

## Snippet base de artefacto

```html
<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>…</title>
<style>/* cat assets/dialo-fonts.css assets/dialo.css */</style>
</head>
<body class="dl-root">
  <nav class="dl-nav"><span class="dl-logo" style="--dl-logo-h:32px"><!-- SVG dialo-horizontal-positive --></span> …</nav>
  <header data-surface="brand" class="dl-section"><div class="dl-container dl-stack" style="--dl-gap:24px">
    <h1 class="dl-display">…</h1><p class="dl-lead">…</p>
    <div class="dl-row"><a class="dl-btn dl-btn--primary dl-btn--lg" href="#">Solicitar demo</a></div>
  </div></header>
  …
  <footer data-surface="brand" class="dl-section"><div class="dl-container dl-stack">
    <span class="dl-logo" style="--dl-logo-h:40px"><!-- SVG dialo-horizontal-negative --></span>
    <p class="dl-slogan">El agente que convierte conversaciones en resultados.</p>
  </div></footer>
</body></html>
```

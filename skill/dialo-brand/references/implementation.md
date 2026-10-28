# Implementación

## Repositorio `dialo-design-system` (fuente única)

| Ruta | Contenido |
|---|---|
| `tokens/dialo.tokens.json` | Todos los valores (DTCG). Todo cambio entra por aquí |
| `src/css/`, `src/react/factory.js` | Componentes `.dl-*` y React |
| `assets/logo/master/` | 14 SVG maestros (no se editan) |
| `assets/logo/svg/`, `svg-framed/`, `png/`, `manifest.json` | Logos de producción, encuadrados con fondo, PNG y metadatos |
| `assets/favicon/`, `assets/character/` | Favicon, iconos PWA, render oficial |
| `dist/css/` | `dialo.css`, `dialo.embedded.css`, `tokens.css`, `components.css`, `fonts*.css` |
| `dist/tailwind/` | `preset.cjs` (v3) y `dialo-theme.css` (v4) |
| `dist/tokens/` | `tokens.mjs/.cjs/.json` y `dtcg/` para Figma |
| `dist/react/` | `index.mjs` + tipos |
| `dist/claude-design/project/` | El sistema "Dialo" en formato Design System: tokens, README, componentes con preview, bundle (`window.Dialo`), fuentes |
| `docs/` | Brandbook MD/PDF, implementación, decisiones, capturas |

Scripts: `npm run logos` · `npm run build` · `npm run check` (contraste WCAG + fidelidad del logo + sin hex en componentes + sin emojis + slogan literal) · `npm run showcase`.

## Consumo

| Proyecto | Qué usar |
|---|---|
| HTML/CSS | `dist/css/dialo.css` + `.dl-*` |
| Archivo único / artefacto | `dialo.embedded.css` (en esta skill: `assets/dialo-fonts.css` + `assets/dialo.css`) |
| React | `import { Logo, Button, Thread, Message, Composer } from "@axoncore/dialo-design-system/react"` + CSS |
| Tailwind | `presets: [require("@axoncore/dialo-design-system/tailwind")]` o `@import` de `tailwind/dialo-theme.css` |
| JS / gráficos / email | `import { tokens } from "@axoncore/dialo-design-system/tokens"` |
| Figma | `dist/tokens/dtcg/*.json` en Tokens Studio |

## Claude Design

Claude Design vive dentro de Claude: el sistema "Dialo" es un artefacto del tipo Design System. Úsalo para decks, diseños y páginas cuando esté disponible. Nunca edites valores solo en Claude Design: los cambios entran por el repositorio y luego se sincronizan (publicando los archivos cambiados de `dist/claude-design/project/` en el artefacto). Para código React, `/design-sync` en Claude Code sincroniza componentes de forma incremental.

## Co-branding con AxonCore

- En contextos AxonCore (modo oscuro, presentaciones corporativas) el logo de Dialo va en monocromía blanca o negra.
- Las piezas de AxonCore siguen la skill `axoncore-brand`; el contenido propio de Dialo dentro de ellas mantiene Montserrat y la voz de Dialo.
- El respaldo "By axoncore" es la forma de asociar las marcas en el logo; no se compone un lockup nuevo con ambos logos.

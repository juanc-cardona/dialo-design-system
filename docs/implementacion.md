# Implementación y Claude Design

## Modelo de fidelidad: una fuente, muchos destinos

```
tokens/dialo.tokens.json ─┐
src/css/*.css             ├─ npm run build ─▶ dist/css · dist/tailwind · dist/tokens · dist/react
src/react/factory.js      ┘                 └▶ dist/claude-design/project/ ─▶ Claude Design (Design System "Dialo")
assets/logo/master/*.svg ── npm run logos ──▶ logos de producción, PNG, favicons, manifest
skill/dialo-brand/       ──────────────────▶ Skill en Claude y Claude Code
```

La fidelidad se protege en tres capas:

| Capa | Qué garantiza | Cómo |
|---|---|---|
| **Repositorio** | Valores exactos | Tokens únicos, build automático, CI con contraste y reglas de marca |
| **Claude Design** | Diseños, decks y piezas con los mismos tokens, logos y componentes | Sistema de diseño "Dialo" generado en `dist/claude-design/project/` por `scripts/claude-design.mjs` |
| **Skill `dialo-brand`** | Criterio: lo que el código no puede imponer | Proporción de color, voz, usos del logo y del personaje, checklist |

## Consumo por tipo de proyecto

| Proyecto | Qué importar |
|---|---|
| HTML/CSS estático | `dist/css/dialo.css` + clases `.dl-*`; `<body class="dl-root">`; `data-surface="brand"` para secciones azules |
| Artefacto o HTML de un solo archivo | `dist/css/dialo.embedded.css` (fuentes en base64) + SVG del logo en línea |
| React | `dist/css/dialo.css` + `import { Button } from "@axoncore/dialo-design-system/react"` |
| Tailwind v3 / v4 | `dist/tailwind/preset.cjs` / `dist/tailwind/dialo-theme.css` + `dist/css/tokens.css` |
| Figma (Tokens Studio) | `dist/tokens/dtcg/*.json` |
| JS (gráficos, canvas, emails) | `dist/tokens/tokens.mjs` |
| Claude Design | Sistema de diseño "Dialo" (ver abajo) |

## Claude Design

Claude Design vive dentro de Claude: los sistemas de diseño se crean como artefactos del tipo **Design System** y cualquier chat, Proyecto o sesión de Claude Code los usa para crear decks, diseños y páginas. La aplicación independiente `claude.ai/design` cierra el 14 de diciembre de 2026, así que no conviene invertir en ella.

### Paso 1 — Abrir y revisar el sistema "Dialo"

El sistema ya está creado como artefacto Design System a partir de este repositorio. Ábrelo desde la tarjeta del chat o desde la galería de artefactos y comprueba:

- Portada con el logo horizontal y el slogan.
- Color: paleta principal, escala del azul, proporción 50–60 / 30–40 / ≤ 10.
- Tipografía Montserrat con la escala del brandbook y Geist Mono para datos.
- Logos: las 14 variantes, cada una sobre su fondo correcto.
- Componentes, incluidos los de conversación.

### Paso 2 — Hacerlo el sistema por defecto

En **Configuración › Sistemas de diseño** aparecen los sistemas de la cuenta. En planes Team o Enterprise, un owner puede fijar **Dialo** como sistema por defecto para el equipo de Dialo, o dejar AxonCore por defecto y pedir Dialo por nombre. Recomendación: AxonCore por defecto en la organización y Dialo invocado explícitamente ("con el sistema de diseño Dialo…"), porque conviven dos marcas.

### Paso 3 — Compartir

Desde el menú *Share* del artefacto. Es privado hasta que se comparte.

### Paso 4 — Instalar la skill

Guarda la skill `dialo-brand` desde la tarjeta de propuesta en el chat (botón *Save skill*) o súbela como `.skill` en la sección de Skills de la configuración de Claude. Para Claude Code, copia `skill/dialo-brand/` a `~/.claude/skills/` o al `.claude/skills/` del repositorio de producto.

### Paso 5 — Prueba de validación (5 minutos)

En un chat nuevo: *"Con el sistema de diseño Dialo, crea una landing para Dialo Commerce, un deck de 6 slides de presentación comercial y una pantalla de la app con una conversación de pedido."* Revisa con el checklist de la skill.

### Paso 6 — Mantener la sincronización

1. Todo cambio entra por el repositorio (PR + CI). Nunca edites valores solo en Claude Design.
2. Tras un merge, pide en un chat: *"Actualiza el sistema de diseño Dialo con dist/claude-design/project de la versión X.Y.Z"* y adjunta el zip del repositorio.
3. Para equipos de producto con código React: en Claude Code, dentro del repositorio, la skill `/design-sync` sincroniza componentes con el sistema de diseño de forma incremental.

### Qué contiene el sistema en Claude Design

`npm run build` genera `dist/claude-design/project/` en el formato del artefacto Design System:

| Archivo | Origen |
|---|---|
| `tokens.json` | `tokens/dialo.tokens.json` convertido a listas, con dos temas: **Claro** y **Superficie de marca**; nota de uso en cada token |
| `README.md` + `marca.md`, `logo.md`, `personaje.md`, `voz.md` | Brandbook y skill condensados en reglas que nombran tokens |
| `components/bundle.js` | El mismo `factory.js` de producción (`window.Dialo`) |
| `components/bundle.css` | `src/css` (base + componentes) |
| `components/<Comp>/` | README y preview en vivo de 25 componentes, más la portada |
| `components/lib/` | React 18.3.1, para que las previews no dependan de una CDN |
| `fonts/` | Montserrat (normal e itálica) y Geist Mono |
| Assets (Logos, Personaje, Favicon) | Subidos al artefacto; sus ids viven en `claude-design/blobs.json` |

Para actualizar: `npm run build`, y pedir a Claude que publique en el artefacto "Dialo" los archivos cambiados de `dist/claude-design/project/` (si cambian logos o el personaje, primero se suben y se actualiza `claude-design/blobs.json`).

## Gobierno

| Rol | Responsabilidad |
|---|---|
| Brand lead | Aprueba cambios de marca (brandbook) y publicación del sistema en Claude Design |
| Design system owner | Revisa PRs, mantiene tokens, componentes y versión |
| Equipos de producto | Consumen el paquete; proponen cambios por PR |

Revisión trimestral: `npm run check`, revisión de piezas publicadas y del registro de decisiones.

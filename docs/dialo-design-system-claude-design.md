# Dialo · Sistema de diseño

**Versión 1.0 · Octubre 2026** · Fuente: repositorio `dialo-design-system` y brandbook v1.3

> El agente que convierte conversaciones en resultados.

Este documento define el sistema de diseño de Dialo para Claude Design: marca, tokens, tipografía, logos, componentes, voz y reglas. Cada valor es exacto y sale del repositorio; no aproximes ni inventes valores.

## Material que acompaña a este documento

Adjunta junto a este MD (todo está en el zip del repositorio):

| Material | Ruta en el repositorio |
|---|---|
| 14 logos oficiales (fondo transparente) | `assets/logo/svg/*.svg` |
| Logos con su fondo (presentaciones) | `assets/logo/svg-framed/*.svg` |
| Favicon e icono de app | `assets/favicon/favicon.svg`, `assets/favicon/icon-512.png` |
| Render oficial del personaje | `assets/character/dialo-character.png` |
| Fuentes | `fonts/montserrat/*.woff2`, `fonts/geist-mono/*.woff2` (o Montserrat y Geist Mono desde Google Fonts) |
| Estilos y componentes de código | `dist/css/dialo.css`, `dist/react/` |
| Ejemplo terminado | `examples/index.html`, `docs/showcase.png` |
| Brandbook | `docs/Dialo-Brandbook.pdf` |

## 1 · Reglas que no se rompen

- Usa solo los logos oficiales (`assets/logo/svg/` o el componente `Logo`). Nunca reescribas "Dialo" con la fuente ni redibujes el icono. La diadema es magenta en todas las versiones.
- Proporción por pieza: `dialo` 50–60 %, blancos y neutrales 30–40 %, `pulse` como máximo 10 %.
- `pulse` nunca como fondo amplio, nunca sobre `dialo` (2,6:1), nunca con texto blanco encima por debajo de 24 px (3,8:1). Para texto magenta pequeño, `accent-text` sobre `accent-subtle`.
- Errores en `status-danger` (naranja-rojo), nunca en magenta. Todo estado lleva palabra o icono.
- Montserrat para todo (`--font-brand`); Geist Mono (`--font-mono`) solo para cifras, IDs y código. Escala de 400 / 500 / 600; Light 300 Italic solo en el "By" del respaldo.
- Sin emojis, sin signos de exclamación, sin buzzwords. Tuteo. Botones verbo + objeto.
- Dialo nunca se presenta como chatbot ni como canal de atención al cliente.
- Slogan literal, en español, con punto final y fuera del lockup: **El agente que convierte conversaciones en resultados.**

## 2 · Marca

### Qué es Dialo (tres extensiones oficiales)

**Una frase:** Dialo es un ecosistema de comercio con IA conversacional que atiende, vende, cobra y da seguimiento a tus clientes en el canal donde están.

**Versión corta:** Dialo es la solución de comercio conversacional de AxonCore. Sus agentes de IA hablan con tus clientes por WhatsApp, en tu e-commerce, en tu app o en una terminal para tus puntos de venta. Recomiendan productos, toman pedidos, cobran, resuelven la posventa y te dicen qué vende cada conversación.

**Versión completa** (decks, one-pagers, sección "Qué es" del sitio):

Dialo es un ecosistema de comercio impulsado por IA conversacional, desarrollado por AxonCore para marcas de consumo masivo, retail y D2C en Latinoamérica.

Sus agentes de IA entienden texto, voz e imagen, y trabajan con el catálogo, los precios, el inventario y las condiciones comerciales reales de cada empresa, porque se conectan a su e-commerce y a su ERP.

Dialo reúne en un solo producto seis módulos: Engagement, Commerce, Payments, Post Sale, Marketing y Analytics. Funciona en App Dialo, WhatsApp, web y API. Así, la misma solución puede ser una terminal de pedidos para la red de tiendas de una marca, un vendedor de IA dentro de su tienda online o un agente integrado en su propia app.

El resultado es que cada conversación con un cliente puede terminar en una venta cobrada y medida, sin ampliar el equipo comercial.

Usa estos textos literalmente cuando se pida "qué es Dialo"; no inventes otras descripciones.

### Datos clave

| Dato | Valor |
|---|---|
| Mercado | Marcas de consumo masivo, retail y D2C en Latinoamérica |
| Canales | App Dialo, WhatsApp, web y API |
| Módulos | Engagement, Commerce, Payments, Post Sale, Marketing, Analytics |
| Capacidades | Texto, voz e imagen; conexión con e-commerce y ERP |

### Arquitectura

Dialo es un producto de AxonCore con marca propia: su color, su personaje y su voz. De AxonCore hereda el magenta Pulse, los neutrales y, cuando lo necesita, la firma "By axoncore".

### Posicionamiento

Dialo **no** se presenta como chatbot ni como canal de atención al cliente. Es un ecosistema de comercio: cada conversación termina en una venta cobrada y medida.

### Personalidad

| Dialo es | Dialo no es |
|---|---|
| Cercano | Infantil |
| Resolutivo | Robótico |
| Claro | Técnico sin necesidad |
| Confiable | Exagerado ni vendedor agresivo |

### Pilares

1. **Resultados:** cada conversación puede terminar en una venta cobrada y medida.
2. **Presencia donde está el cliente:** WhatsApp, e-commerce, app o terminal en el punto de venta.
3. **Conocimiento real del negocio:** trabaja con el catálogo, los precios y el inventario reales de cada empresa.

### Slogan

> **El agente que convierte conversaciones en resultados.**

- Literal, mayúscula inicial y punto final. Solo en español; no se traduce.
- Montserrat Medium (500).
- Nunca forma parte del lockup; va como elemento independiente respetando el área de seguridad.
- Usos: portadas, cierre de presentaciones y videos, firma de campañas, pie de email, web (héroe o footer).

Por qué funciona: nombra la categoría correcta (agente), la conversación es solo el punto de partida, termina en el beneficio (resultados), no menciona "IA" (ya se entiende) y hace pareja con el slogan de AxonCore (*IA Generativa para impulsar tu negocio.*).

## 3 · Color

Dos temas: **Claro** (por defecto) y **Superficie de marca** (fondo azul Dialo, para portadas, héroes, páginas de sección y cierres). No existe modo oscuro.

### Paleta y primitivos

| Token | HEX | Uso |
|---|---|---|
| `dialo` | `#0C4088` | Azul Dialo, color de marca (RGB 12 64 136 · CMYK 91 53 0 47). Icono, wordmark, fondos de marca, acción primaria. 50–60 % de cada pieza. |
| `pulse` | `#FC1C70` | Magenta Pulse de AxonCore (RGB 252 28 112 · CMYK 0 92 24 0). Solo acento ≤ 10 %: diadema, icono de la acción principal, tab activa, dato clave. Nunca fondo amplio, nunca sobre azul Dialo, nunca texto < 24 px. |
| `white` | `#FFFFFF` | Blanco. Fondo principal, cara del icono, texto sobre azul Dialo. |
| `offwhite` | `#F6F6F6` | Blanco roto (CMYK 4 3 4 0). Fondos claros y secciones alternas. |
| `black` | `#000000` | Negro (CMYK 91 79 62 97). Texto principal y monocromía. |
| `graphite` | `#3A3A3A` | Gris AxonCore (CMYK 67 58 55 61). Texto secundario y respaldo "By axoncore" en la versión positiva. |
| `dialo-50` | `#E7ECF3` | Escala del azul. Fondos suaves de sección y hover. |
| `dialo-100` | `#CED9E7` | Escala del azul. Fondos de componentes seleccionados; halo de foco de inputs. |
| `dialo-300` | `#9EB3CF` | Escala del azul. Bordes y divisores sobre fondos de marca, chips. |
| `dialo-400` | `#6D8CB8` | Escala del azul. Ilustración y gráficos secundarios. No para texto. |
| `dialo-700` | `#0C4088` | Escala del azul. Igual al azul Dialo. |
| `dialo-800` | `#0A336D` | Escala del azul. Hover de elementos azules; superficies sobre la superficie de marca. |
| `dialo-900` | `#072652` | Escala del azul. Estados presionados, toasts, tooltips. |
| `pulse-50` | `#FFE8F1` | Fondo tintado del acento (badges de novedad o en vivo). |
| `pulse-500` | `#FC1C70` | Igual a pulse. |
| `pulse-700` | `#C11765` | Magenta para texto pequeño sobre blanco o pulse-50 (5,9:1). Solo badges y etiquetas de acento. |
| `neutral-0` | `#FFFFFF` | Neutral frío. Blanco. |
| `neutral-50` | `#F6F6F6` | Neutral frío. Igual a offwhite. |
| `neutral-100` | `#ECEDEE` | Neutral frío. Divisores suaves, pista del switch, badge neutral. |
| `neutral-200` | `#D4D6D8` | Neutral frío. Bordes por defecto de cards y tablas. |
| `neutral-400` | `#8C8C8C` | Neutral frío. Bordes de controles (3,4:1) y texto deshabilitado. |
| `neutral-500` | `#6B6B6B` | Neutral frío. Texto atenuado (5,3:1 sobre blanco). |
| `neutral-700` | `#3A3A3A` | Neutral frío. Igual a graphite. |
| `neutral-1000` | `#000000` | Neutral frío. Negro. |

### Tokens semánticos

| Token | Claro | Superficie de marca | Uso |
|---|---|---|---|
| `bg-canvas` | `#FFFFFF` | `#0C4088` | Fondo de página. Claro: blanco. Marca: azul Dialo. |
| `bg-surface` | `#F6F6F6` | `#0A336D` | Secciones alternas y fondo de paneles de producto. |
| `bg-raised` | `#FFFFFF` | `#0A336D` | Cards, menús, inputs. |
| `bg-subtle` | `#E7ECF3` | `#0A336D` | Fondos suaves de sección. |
| `bg-hover` | `#E7ECF3` | `#0A336D` | Hover de filas, chips, botones secundarios. |
| `bg-selected` | `#CED9E7` | `#072652` | Elementos seleccionados. |
| `bg-brand` | `#0C4088` | `#0C4088` | Bloques de marca (héroe, portada, cierre). |
| `text-primary` | `#000000` | `#FFFFFF` | Texto de lectura sobre bg-canvas, bg-surface y bg-raised. |
| `text-secondary` | `#3A3A3A` | `#CED9E7` | Texto de apoyo sobre bg-canvas y bg-surface. |
| `text-muted` | `#6B6B6B` | `#9EB3CF` | Metadatos, placeholders y hints sobre bg-canvas y bg-surface (≥ 4,6:1). |
| `text-disabled` | `#8C8C8C` | `#6D8CB8` | Texto deshabilitado (no requiere contraste). |
| `text-heading` | `#0C4088` | `#FFFFFF` | Títulos (display, h1–h3, slogan) sobre bg-canvas y bg-subtle. |
| `text-link` | `#0C4088` | `#FFFFFF` | Enlaces subrayados sobre bg-canvas. |
| `text-on-brand` | `#FFFFFF` | `#FFFFFF` | Texto sobre bg-brand. |
| `border-subtle` | `#ECEDEE` | `#0A336D` | Divisores internos y filas de tabla. |
| `border-default` | `#D4D6D8` | `#6D8CB8` | Borde de cards, tablas y contenedores. |
| `border-strong` | `#8C8C8C` | `#9EB3CF` | Borde de inputs y controles (≥ 3:1). |
| `border-brand` | `#9EB3CF` | `#9EB3CF` | Borde de chips y elementos de marca. |
| `action-primary` | `#0C4088` | `#FFFFFF` | Botón primario: una acción por vista. Claro: azul; marca: blanco. |
| `action-primary-hover` | `#0A336D` | `#E7ECF3` | Hover del botón primario. |
| `action-primary-pressed` | `#072652` | `#CED9E7` | Estado presionado del botón primario. |
| `on-action-primary` | `#FFFFFF` | `#0C4088` | Texto e icono sobre action-primary (≥ 8,4:1). |
| `on-action-primary-accent` | `#FFFFFF` | `#FC1C70` | Icono de la acción principal (accentIcon) dentro del botón primario: blanco sobre el botón azul; magenta sobre el botón blanco de la superficie de marca. |
| `accent` | `#FC1C70` | `#FFFFFF` | Acento magenta: icono de la acción principal, tab activa, punto en vivo, dato clave. En la superficie de marca pasa a blanco porque el magenta no va aislado sobre azul. |
| `accent-text` | `#C11765` | `#FFFFFF` | Texto de acento pequeño sobre accent-subtle o blanco. |
| `accent-subtle` | `#FFE8F1` | `#0A336D` | Fondo de badges de acento. |
| `focus-ring` | `#0C4088` | `#FFFFFF` | Anillo de foco de 2 px con separación de 2 px. |
| `status-info` | `#0C4088` | `#FFFFFF` | Información; texto sobre status-info-subtle. |
| `status-info-subtle` | `#E7ECF3` | `#0A336D` | Fondo de alertas informativas. |
| `status-success` | `#0B7A52` | `#E6F4EE` | Éxito (pagado, sincronizado); texto sobre status-success-subtle. Siempre con icono o palabra. |
| `status-success-subtle` | `#E6F4EE` | `#0A336D` | Fondo de éxito. |
| `status-warning` | `#8F5A00` | `#FBF1E0` | Aviso (pendiente, stock bajo); texto sobre status-warning-subtle. |
| `status-warning-subtle` | `#FBF1E0` | `#0A336D` | Fondo de aviso. |
| `status-danger` | `#C2340E` | `#FBEAE5` | Error y acciones destructivas: naranja-rojo, nunca el magenta de marca; texto sobre status-danger-subtle. |
| `status-danger-subtle` | `#FBEAE5` | `#0A336D` | Fondo de error. |
| `bubble-agent` | `#F6F6F6` | `#FFFFFF` | Burbuja de Dialo (agente) en la conversación. |
| `on-bubble-agent` | `#000000` | `#000000` | Texto sobre bubble-agent. |
| `bubble-customer` | `#0C4088` | `#0A336D` | Burbuja del cliente. |
| `on-bubble-customer` | `#FFFFFF` | `#FFFFFF` | Texto sobre bubble-customer. |

### Proporción y contraste

Azul 50–60 % · blancos y neutrales 30–40 % · magenta **máximo 10 %**. El magenta es un acento: la diadema, un detalle, una acción puntual. Nunca fondos amplios.

Dónde sí va el magenta en interfaz: icono de la acción principal de la vista (solo sobre fondo claro: nunca dentro del botón azul), indicador de la tab activa, punto "en vivo", el dato clave de un gráfico, badges de acento (texto `#C11765` sobre `#FFE8F1`).

#### Contraste

| Combinación | Ratio | Uso |
|---|---|---|
| Blanco sobre azul Dialo / azul sobre blanco | 10:1 | Todo texto |
| Gris #3A3A3A sobre blanco | 11,4:1 | Todo texto |
| #6B6B6B sobre blanco | 5,3:1 | Texto atenuado |
| Magenta sobre blanco | 3,8:1 | Solo gráficos y texto ≥ 24 px |
| #C11765 sobre blanco | 5,9:1 | Magenta en texto pequeño |
| Magenta sobre azul Dialo | 2,6:1 | **No permitido** para texto ni elementos aislados |
| Blanco sobre magenta | 3,8:1 | No para texto < 24 px (por eso no hay botones magenta) |

## 4 · Tipografía

Montserrat (Google Fonts, OFL) para todo; Geist Mono solo para cifras, IDs y código. Pesos 400 / 500 / 600; Light 300 Italic solo en el "By" del respaldo (ya viene en contornos en el logo).

| Estilo | Fuente | Peso | Tamaño / interlineado | Tracking | Uso |
|---|---|---|---|---|---|
| `display` | Montserrat | 600 | 56px / 64px | 0 | Portadas y héroes de campaña (móvil 40/48). Clase .dl-display. |
| `h1` | Montserrat | 600 | 40px / 48px | 0 | Títulos de página (móvil 32/40). Clase .dl-h1. |
| `h2` | Montserrat | 600 | 28px / 36px | 0 | Secciones (móvil 24/32). Clase .dl-h2. |
| `h3` | Montserrat | 500 | 20px / 28px | 0 | Subsecciones y títulos de card. Clase .dl-h3. |
| `slogan` | Montserrat | 500 | 20px / 28px | 0 | Firma de marca, literal y con punto final. Tamaño según formato. Clase .dl-slogan. |
| `lead` | Montserrat | 400 | 18px / 30px | 0 | Entradilla bajo un título. Clase .dl-lead. |
| `body` | Montserrat | 400 | 16px / 26px | 0 | Texto corrido, máximo 70 caracteres por línea. Clase .dl-body. |
| `small` | Montserrat | 400 | 14px / 22px | 0 | Apoyo e interfaz. Clase .dl-small. |
| `label` | Montserrat | 500 | 12px / 16px | 0.04em | Etiquetas, chips; en mayúsculas como overline (.dl-overline). |
| `endorsement` | Montserrat Italic | 300 | 14px / 20px | 0 | Solo el "By" del lockup con respaldo; ya viene en contornos en los logos. No usar en texto. |
| `data` | Geist Mono | 400 | 14px / 22px | 0 | Cifras, IDs, importes, código. Clase .dl-data. |

Reglas: mayúscula inicial solo en la primera palabra; mayúsculas completas solo en etiquetas cortas; máximo 70 caracteres por línea; títulos en `text-heading`.

## 5 · Espaciado, forma, elevación y movimiento

### Espaciado (retícula 4/8 px)

| Token | Valor | Uso |
|---|---|---|
| `space-0` | 0px | Sin espacio. |
| `space-1` | 4px | Icono-texto compacto. |
| `space-2` | 8px | Icono-texto, gap de chips. |
| `space-3` | 12px | Padding vertical de controles, gap de filas. |
| `space-4` | 16px | Gap por defecto, padding de alertas. |
| `space-5` | 20px | Padding horizontal de botones. |
| `space-6` | 24px | Padding de card, gutter. |
| `space-8` | 32px | Padding de panel. |
| `space-10` | 40px | Entre grupos de cards. |
| `space-12` | 48px | Entre bloques medianos. |
| `space-16` | 64px | Entre bloques de página; sección móvil. |
| `space-20` | 80px | Aire de héroe. |
| `space-24` | 96px | Padding de sección en escritorio. |
| `space-32` | 128px | Héroes de campaña. |

### Radios

| Token | Valor | Uso |
|---|---|---|
| `radius-xs` | 4px | Checkbox, badges pequeños |
| `radius-sm` | 8px | Inputs, botón sm, chips |
| `radius-md` | 12px | Botones, tabs, burbujas |
| `radius-lg` | 16px | Cards, popovers, diálogos |
| `radius-xl` | 24px | Paneles hero, media |
| `radius-squircle` | 22.7% | Radio del icono (184,88 / 815,53). Solo contenedores cuadrados tipo avatar o app icon |
| `radius-full` | 9999px | Pills, badges, switches. |

### Sombras

| Token | Valor | Uso |
|---|---|---|
| `shadow-1` | `0 1px 2px rgba(7, 38, 82, 0.08), 0 1px 1px rgba(7, 38, 82, 0.04)` | Cards en reposo. |
| `shadow-2` | `0 4px 12px rgba(7, 38, 82, 0.10), 0 1px 2px rgba(7, 38, 82, 0.06)` | Hover de cards interactivas, menús. |
| `shadow-3` | `0 16px 40px rgba(7, 38, 82, 0.16), 0 2px 6px rgba(7, 38, 82, 0.08)` | Diálogos, toasts, maqueta de móvil. |

### Controles y layout

| Token | Valor | Uso |
|---|---|---|
| `control-sm` | 32px | Botón sm, chips de filtro. |
| `control-md` | 40px | Botones e inputs por defecto. |
| `control-lg` | 48px | Botón de héroe. |
| `container` | 1200px | Ancho máximo del contenedor. |
| `measure` | 70ch | Medida máxima de lectura (Montserrat es ancha). |

### Movimiento

`duration-instant` 80 ms (press) · `duration-fast` 140 ms (hover, foco) · `duration-base` 220 ms (menús, tabs) · `duration-slow` 360 ms (diálogos). Curva `cubic-bezier(0.16, 1, 0.3, 1)`. Botón presionado baja 1 px; card interactiva sube 2 px. Respeta `prefers-reduced-motion`.

### Foco

Anillo sólido de 2 px en `focus-ring` con 2 px de separación en todo elemento interactivo.

## 6 · Logo

### Componentes

| Componente | Descripción |
|---|---|
| **Icono** | Squircle azul con la cara de Dialo (dos ojos redondos y sonrisa) y diadema con micrófono de trazo continuo en magenta |
| **Wordmark** | "Dialo" en Montserrat Medium, tracking −60, **en contornos**. Nunca se reescribe con la fuente |
| **Respaldo** (opcional) | "By" en Montserrat Light Italic + wordmark oficial de AxonCore, alineado a la derecha bajo el wordmark |

### Archivos (`assets/logo/svg/` en el repositorio)

Recorte ajustado y fondo transparente. Colócalos sobre el fondo indicado.

| Versión | Positiva (blanco / #F6F6F6) | Negativa (azul Dialo) | Mono negra (claro) | Mono blanca (negro / oscuro) |
|---|---|---|---|---|
| Horizontal (principal) | `dialo-horizontal-positive.svg` | `dialo-horizontal-negative.svg` | `dialo-horizontal-mono-black.svg` | `dialo-horizontal-mono-white.svg` |
| Horizontal con respaldo | `dialo-horizontal-endorsed-positive.svg` | `dialo-horizontal-endorsed-negative.svg` | `dialo-horizontal-endorsed-mono-black.svg` | `dialo-horizontal-endorsed-mono-white.svg` |
| Vertical | `dialo-vertical-positive.svg` | `dialo-vertical-negative.svg` | `dialo-vertical-mono-black.svg` | `dialo-vertical-mono-white.svg` |
| Icono | `dialo-icon-positive.svg` | — | `dialo-icon-mono-black.svg` | — |

`dialo-favicon.svg` = icono positivo con margen mínimo para favicon. Los maestros originales (`Marca_Dialo-01…14.svg`) viven en el repositorio; equivalencia: 01 icono positivo, 02 icono mono negra, 03–06 con respaldo (mono negra, mono blanca, positiva, negativa), 07–10 horizontal (mono negra, mono blanca, positiva, negativa), 11 vertical positiva, 12 mono negra, 13 negativa, 14 mono blanca.

No existen versiones de icono negativo, de una tinta ni en escala de grises: no las crees.

**En HTML:** pega el contenido del SVG en línea y fija solo la altura (`height: 32px; width: auto`). **En React:** `<Logo version="horizontal" color="positive" height={32} clearSpace />`.

### Versiones y uso

| Versión | Composición | Uso |
|---|---|---|
| Horizontal | Icono a la izquierda, wordmark a la derecha | Por defecto en todos los soportes (cabeceras, nav, firmas, portadas) |
| Horizontal con respaldo | + "By axoncore" bajo el wordmark, alineado al final de la "o" | Solo cuando Dialo aparece solo fuera de su entorno (ver abajo) |
| Vertical | Icono centrado sobre el wordmark | Formatos cuadrados o verticales, redes, merch |
| Icono | Solo el icono | App, avatar, favicon, redes, sellos |

### Qué versión de color según el fondo

| Fondo | Versión |
|---|---|
| Blanco o #F6F6F6 | Positiva |
| Azul Dialo | Negativa |
| Negro o grises muy oscuros | Monocromía blanca |
| Contextos de AxonCore (modo oscuro, presentaciones corporativas) | Monocromía blanca o negra |
| Fotografía clara y limpia | Monocromía negra |
| Fotografía oscura y limpia | Monocromía blanca |
| Magenta, degradados o fotografías recargadas | **No se coloca el logo** |

| Versión | Cuerpo del icono | Cara | Diadema | Wordmark | Respaldo |
|---|---|---|---|---|---|
| Positiva | Azul Dialo | Blanco | Magenta | Azul Dialo | Gris #3A3A3A |
| Negativa | Blanco | Azul Dialo | Magenta | Blanco | Blanco |
| Mono negra | Negro | Blanco | Magenta | Negro | Negro |
| Mono blanca | Blanco | Negro | Magenta | Blanco | Blanco |

### Con o sin respaldo

| Versión | Cuándo | Ejemplos |
|---|---|---|
| **Sin respaldo** (por defecto) | Dialo vive en su propio entorno o el contexto ya deja clara la relación con AxonCore | Plataforma y App Dialo, redes propias, onboarding, piezas de producto, materiales dentro del ecosistema AxonCore |
| **Con respaldo** | Dialo aparece solo, fuera de su entorno, y necesita la asociación | Eventos y ferias, prensa, alianzas y co-branding, propuestas comerciales a nuevos clientes, impresos de presentación |

El respaldo no se separa, no cambia de posición ni de color, y por debajo de 200 px de ancho se usa la versión sin respaldo.

### Área de seguridad y tamaños mínimos

Unidad **x = diámetro de un ojo del icono** (84 u en el maestro).

- Lockups (horizontal y vertical, con o sin respaldo): **2x** alrededor. En pantalla ≈ 19 % de la altura del logo horizontal, 13 % del horizontal con respaldo, 11 % del vertical.
- Icono: **1x** alrededor, medido desde el borde exterior de la diadema y las almohadillas (≈ 10 % de su altura).

| Versión | Digital | Impreso |
|---|---|---|
| Horizontal | 120 px de ancho | 28 mm |
| Horizontal con respaldo | 200 px de ancho | 45 mm |
| Vertical | 80 px de ancho | 20 mm |
| Icono | 32 px | 8 mm |

Referencias rápidas de altura (ancho = altura × proporción): horizontal 4,23:1 → 32 px de alto = 135 px; con respaldo 2,95:1 → mínimo 68 px de alto; vertical 1:1 → mínimo 80 px; icono 1,1:1.

### Construcción (para verificar, nunca para redibujar)

Cuerpo del icono W = 815,53 u, radio 184,88 u (22,7 %). Ojos de 84 u separados 325,84 u, a 58 % de la altura. Cara desplazada 5,3 u a la derecha (compensación óptica del micrófono). Diadema de trazo 18 u. En la horizontal, el icono mide lo mismo que la altura de mayúscula de "Dialo" y la separación es ≈ 4,1x. En la vertical, la mayúscula mide el 57 % del icono y la separación es ≈ 2,3x. El respaldo mide el 17 % de la mayúscula de "Dialo".

### Usos incorrectos

1. Deformar, estirar o comprimir.
2. Cambiar el color de la diadema o de cualquier parte fuera de las versiones definidas.
3. Quitar la diadema.
4. Modificar la cara: forma, tamaño o posición de los ojos o la sonrisa.
5. Reescribir el wordmark con Montserrat u otra fuente.
6. Aplicar degradados, sombras, brillos, contornos o efectos 3D al logo.
7. Rotar o reflejar.
8. Colocar el logo sobre magenta, degradados o fotografías recargadas.
9. Diadema magenta aislada sobre fondo azul.
10. Cambiar el color del respaldo, separarlo del lockup o moverlo.
11. Integrar el slogan dentro del lockup.
12. Invadir el área de seguridad.
13. Usar el logo por debajo de los tamaños mínimos.

## 7 · Personaje

El personaje es Dialo en volumen: su cabeza es el icono. **Existe un único personaje oficial.** Render: `assets/character/dialo-character.png`.

| Parte | Descripción |
|---|---|
| Cabeza | El icono en volumen: cubo redondeado azul Dialo con la misma silueta squircle. Es a la vez cabeza y cuerpo |
| Cara | Dos ojos redondos y la sonrisa en blanco. Sin pupilas, sin cejas, sin boca abierta |
| Diadema | Magenta, con micrófono a la izquierda |
| Extremidades | Brazos y piernas finos en azul Dialo, que salen directamente de la cabeza |
| Vestuario | Ninguno |

### Reglas de uso

- Para comunicación, onboarding, campañas, estados vacíos y dentro de la plataforma. **Nunca sustituye al logo**: si una pieza lleva el personaje, también lleva el logo (cabecera, esquina o cierre).
- Se usa siempre el render oficial. No se modifica ni se generan variaciones (ni por sector, ni con vestuario, ni con accesorios, ni con otras poses).
- Fondos: gris claro de estudio o colores planos de la paleta (blanco, #F6F6F6, azul Dialo). Sin escenarios recargados.
- Un personaje por composición, con aire alrededor. No se recorta por la cara ni la diadema.
- En estados vacíos: tamaño moderado (≈ 120–160 px de ancho) sobre título H3 + texto + una acción.

### Usos incorrectos

1. Añadir pupilas, cejas o boca abierta.
2. Quitar la diadema.
3. Cambiar el color de la cabeza.
4. Añadir vestuario, cuerpo o accesorios, o crear variaciones del personaje.
5. Usar el personaje en lugar del logo.

### Imagen con IA

Si piden "generar" al personaje en otra escena o pose: explica que la marca usa un único render oficial y ofrece componer la pieza con ese render sobre un fondo plano de la paleta. Si la persona insiste en un prompt (por ejemplo, para explorar), constrúyelo para preservar el personaje exacto y avisa de que el resultado no es oficial hasta que se apruebe:

```
Use the attached image as the exact character reference. Keep the character 100% identical:
rounded Dialo-blue (#0C4088) squircle cube that is both head and body, matte soft-touch material,
two round white eyes and a simple white smile (no pupils, no eyebrows, no open mouth),
magenta (#FC1C70) headset with the microphone on the left as seen by the viewer, thin blue arms and legs coming
directly out of the cube, no clothing, no accessories.
Scene: [escena], plain [light studio grey | #F6F6F6 | #0C4088] background, soft diffused studio
lighting, subtle contact shadow, centered, generous negative space, no text, no logos.
```

Fotografía de apoyo (recomendación del sistema; el brandbook no define fotografía): personas reales en comercios, tiendas de barrio, bodegas, e-commerce y puntos de venta de Latinoamérica; luz natural, encuadres limpios, móvil o terminal en escena; sin clichés de robots, cerebros o circuitos, sin texto generado.

## 8 · Componentes

Todos existen en código (`dist/css/dialo.css` con clases `.dl-*` y `dist/react/`). Estados comunes: default, hover, presionado, foco visible, deshabilitado.

### Logo

Logo oficial de Dialo: renderiza uno de los 14 archivos maestros en línea, nunca redibujado.

**Cuándo:** cabecera, navegación, portada, cierre y firma. Horizontal por defecto; vertical en formatos cuadrados; icono en app, avatar y favicon; con respaldo "By axoncore" solo fuera del entorno de Dialo (eventos, prensa, alianzas, propuestas a clientes nuevos).

**Props:** `version` (`horizontal` · `horizontal-endorsed` · `vertical` · `icon`), `color` (`positive` sobre blanco · `negative` sobre azul Dialo · `mono-black` sobre claro · `mono-white` sobre negro), `height` en px, `clearSpace` para añadir el área de seguridad (2x lockups, 1x icono). El icono solo existe en `positive` y `mono-black`; otra combinación lanza error.

**Mínimos:** horizontal 120 px de ancho (32 px de alto ≈ 135 px), con respaldo 200 px (≥ 68 px de alto), vertical 80 px, icono 32 px.

**No:** recolorear, quitar la diadema, deformar, añadir efectos, colocarlo sobre magenta, degradados o fotos recargadas, ni meter el slogan en el lockup. Para `<img>` usa los archivos del grupo Logos.

### Slogan

Slogan oficial: "El agente que convierte conversaciones en resultados." El texto es fijo, en español y con punto final.

**Cuándo:** portadas, cierre de presentaciones y videos, firma de campañas, pie de email, héroe o footer web. Siempre como elemento independiente, fuera del lockup y respetando el área de seguridad.

**Props:** `as` (elemento, por defecto `p`). Estilo `slogan` (Montserrat 500) en `text-heading`; sobre la superficie de marca, blanco.

### Button

Botón de acción con etiqueta verbo + objeto ("Hacer pedido", "Ver saldo").

**Cuándo:** `primary` para la única acción principal de la vista (azul con texto blanco; en la superficie de marca, blanco con texto azul); `secondary` y `ghost` para alternativas; `danger` para acciones destructivas. No existe botón magenta: el magenta solo va en el icono de la acción principal (`accentIcon`), y solo cuando el botón es claro (primario sobre la superficie de marca, secundario o ghost). Dentro del botón primario azul el icono queda blanco, porque el magenta no va sobre azul.

**Props:** `variant`, `size` (`sm` 32 · `md` 40 · `lg` 48), `icon` / `iconRight` (Lucide, trazo 2), `accentIcon`, `loading`, `disabled`, `block`, `as` ("a" para enlaces). Sin children = botón de icono: añade `aria-label`.

**Estados:** hover (azul 800), presionado (azul 900, baja 1 px), foco (anillo `focus-ring`), deshabilitado (40 %), cargando (spinner y `aria-busy`).

### Chip

Chip de selección: respuestas rápidas en la conversación y filtros.

**Cuándo:** 2–3 opciones cortas (1–3 palabras, verbo + objeto) que el cliente puede tocar en lugar de escribir; filtros de periodo en paneles.

**Props:** `pressed` (seleccionado, `aria-pressed`), `onClick`, `disabled`, children = etiqueta. Borde `border-brand`, texto `text-heading`, seleccionado en `bg-selected`.

### Field

Campo de formulario: etiqueta, control, ayuda y error enlazados por accesibilidad.

**Cuándo:** todo input, textarea o select. La etiqueta es obligatoria y en sentence case; el error dice qué hacer ("Escribe un número de 10 dígitos.").

**Props:** `label`, `hint`, `error` (pone `aria-invalid` y sustituye a hint), `id`; children = un `Input`, `Textarea` o `Select` (también exportados).

**Estados:** hover (borde `text-secondary`), foco (borde azul + halo `dialo-100`), error (borde `status-danger`), deshabilitado (50 %).

### Checkbox

Casilla de verificación para opciones independientes que se confirman al enviar.

**Props:** `label` y los de `<input type="checkbox">` (`checked`, `defaultChecked`, `onChange`, `disabled`). Marcada en `action-primary`. Para efectos inmediatos usa `Switch`.

### Radio

Opción única dentro de un grupo.

**Props:** `label`, `name` (mismo para el grupo) y los de `<input type="radio">`. Seleccionado en `action-primary`.

### Switch

Interruptor de efecto inmediato ("Recordatorios automáticos").

**Props:** `checked` / `defaultChecked`, `onChange(checked)`, `label`, `disabled`. Activo en `action-primary` con perilla `on-action-primary`. Rol `switch` con `aria-checked`.

### Badge

Etiqueta corta de estado o categoría. El estado siempre se dice con palabra, no solo con color.

**Props:** `tone` (`neutral` · `brand` canal o categoría · `accent` novedad o en vivo · `success` pagado · `warning` pendiente · `danger` rechazado), `dot`, `live` (punto animado), children = texto.

### Alert

Mensaje de sistema con icono, título y cuerpo.

**Cuándo:** confirmar un resultado, avisar de un riesgo o explicar un error con la acción para resolverlo. Tono calmo y concreto.

**Props:** `tone` (`info` · `success` · `warning` · `danger`), `title`, children = cuerpo. `danger` usa `role="alert"`; el resto `role="status"`.

### Toast

Confirmación breve y temporal de una acción ("Pedido confirmado.").

**Props:** children = texto, `icon` opcional (Lucide). Fondo `dialo-900`, texto blanco, `shadow-3`, `role="status"`.

### Card

Contenedor de contenido con eyebrow, título y cuerpo.

**Props:** `eyebrow` (etiqueta en mayúsculas), `title` (H3 azul), children (texto o contenido), `variant` (`surface` gris sin sombra · `brand` azul Dialo con texto blanco), `interactive` (hover: sube 2 px y `shadow-2`), `as`.

**Uso:** una card `brand` por grupo como mucho; el resto blancas sobre `bg-surface`.

### Tabs

Navegación entre vistas hermanas.

**Props:** `items` (`[{value, label}]`), `value` / `defaultValue`, `onChange`, `label` (aria). Flechas izquierda/derecha cambian de tab. Indicador activo: trazo magenta de 2 px (uno de los usos permitidos del acento).

### Avatar

Avatar de persona con forma squircle (22,7 %, la del icono).

**Props:** `name` (iniciales y aria-label), `src`, `size` (`sm` 32 · `md` 40 · `lg` 56). Para el agente usa `AgentAvatar`.

### Stat

Indicador clave con etiqueta, cifra y contexto.

**Props:** `label`, `value`, `delta` ("+18 %"), `deltaTone` (`success` · `danger` · `warning` · `neutral`), `context` ("vs. mes anterior"). Toda cifra lleva periodo o comparación. Cifra en Montserrat 600 40/48 azul con números tabulares.

### Table

Tabla de datos (solo CSS): `.dl-table-wrap` > `table.dl-table`.

Cabeceras en etiqueta mayúscula `text-secondary` sobre `bg-surface`; filas con divisor `border-subtle` y hover `bg-hover`; columnas numéricas con `td.is-num` (Geist Mono, alineadas a la derecha). Estados con `Badge`.

### Nav

Barra de navegación (solo CSS): `nav.dl-nav` > logo horizontal positivo (`.dl-logo`, 32 px de alto) + `.dl-nav__links` > `a.dl-nav__link` (`aria-current="page"` en la activa) + un botón primario `sm`.

Siempre clara (`data-surface="light"`) con el logo positivo. Fondo translúcido con blur y borde `border-subtle`. Por debajo de 768 px los enlaces se ocultan: el producto debe ofrecer un menú.

### EmptyState

Estado vacío con el personaje oficial, título, explicación y una acción.

**Props:** `title`, children (qué aparecerá aquí y cómo conseguirlo), `action` (un `Button` primario), `art` (URL del render oficial del personaje, grupo Personaje). El personaje nunca sustituye al logo ni se modifica.

### Message

Mensaje de la conversación entre Dialo y el cliente. Va dentro de `Thread` (`role="log"`, exportado).

**Props:** `from` (`agent`: izquierda, avatar con el icono, burbuja `bubble-agent` · `customer`: derecha, burbuja azul `bubble-customer`), `time`, `avatar`, children.

**Voz del agente:** dato o resultado → propuesta concreta → opción fácil de responder. Tuteo, sin emojis ni exclamaciones. Dialo no se presenta como chatbot.

### QuickReplies

Respuestas rápidas bajo un mensaje del agente.

**Props:** `options` (2–3 textos de 1–3 palabras, verbo + objeto), `onSelect(option)`. Se alinean con la burbuja del agente.

### Typing

Indicador de que Dialo está escribiendo. Sin props. `role="status"` con etiqueta "Dialo está escribiendo".

### Composer

Caja para escribir y enviar un mensaje.

**Props:** `placeholder` ("Escribe un mensaje"), `onSend(text)`, `sendLabel` (aria del botón, "Enviar mensaje"). Foco con borde azul y halo `dialo-100`.

### OrderCard

Resumen de un pedido o producto dentro de la conversación.

**Props:** `title` ("Pedido 4821 · 14 cajas"), `meta` (forma de pago, entrega), `amount` (en Geist Mono, azul).

### AgentAvatar

Avatar del agente: siempre el icono oficial positivo dentro de un squircle blanco. No se sustituye por el personaje ni por otra imagen.

**Props:** `size` (`sm` 32 · `md` 40 · `lg` 56).

### Referencia de clases CSS

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

## 9 · Iconografía

Lucide (ISC), trazo **2 px**, `stroke-linecap: round`, `stroke-linejoin: round`, `fill: none`, `stroke: currentColor`. Tamaños 16 / 20 / 24. Color azul Dialo o #3A3A3A; magenta solo en el icono de la acción principal de la vista. Sin emojis, sin iconos rellenos salvo estados puntuales.

Iconos frecuentes: `message-circle` (conversación), `shopping-cart` (pedido), `credit-card` (pago), `package` (posventa/envío), `chart-line` (analytics), `megaphone` (marketing), `store` (punto de venta), `refresh-ccw` (recompra).

## 10 · Composición de piezas

- **Landing / web:** nav con logo horizontal positivo → héroe en superficie de marca (display blanco, lead, botón primario blanco con icono magenta, maqueta de conversación) → secciones blancas y #F6F6F6 alternas → cierre azul con logo negativo y slogan.
- **Producto (panel):** fondo #F6F6F6, cards blancas, títulos azules, una acción primaria por vista; el agente se representa con su avatar (icono), no con el personaje.
- **Decks:** portada azul con logo horizontal negativo + slogan; páginas de contenido blancas; páginas de sección azules; cierre con icono o logo sobre azul + slogan. Con respaldo solo si el deck sale fuera del ecosistema (cliente nuevo, evento).
- **Documentos:** fondo blanco, títulos azules, cuerpo negro 16/26, logo horizontal positivo en cabecera.
- **Redes:** vertical o icono; personaje oficial para campañas sobre fondo plano.
- **Email:** cabecera blanca con logo horizontal positivo (≥ 120 px de ancho, PNG de `assets/logo/png/` del repositorio para clientes que no soportan SVG); pie con slogan.

## 11 · Voz y tono

### Cómo habla Dialo

Como alguien del equipo comercial que conoce el negocio y entrega resultados. Cercano, claro y al grano.

| Principio | Así sí | Así no |
|---|---|---|
| Directo | "Tu pedido llega mañana antes de las 10." | "Te informamos que tu pedido ha sido procesado y será entregado..." |
| Cercano, no infantil | "Listo, ya quedó apuntado." | "Súper genial, ya está todo listo para ti." |
| Resultado primero | "Te quedan 3 cajas. ¿Repetimos el pedido de la semana pasada?" | "¿En qué más te puedo ayudar hoy?" |
| Habla como el cliente | Con el tendero, lenguaje de tienda. Con una marca D2C, el tono de esa marca | El mismo registro para todos |

### Reglas

- Tuteo por defecto. Usted solo en mercados donde sea la norma.
- Voz activa y frases cortas.
- Botones: verbo + objeto ("Hacer pedido", "Ver saldo"). Nunca "OK", "Enviar" a secas o "Haz clic aquí".
- **Sin emojis**, ni en interfaz ni en conversación.
- Sin signos de exclamación en comunicación de marca.
- Sin buzzwords: revolucionar, disruptivo, sinergia, magia (tampoco "next-gen", "potenciado por IA" como relleno).
- Dialo no se presenta como chatbot ni como asistente de atención al cliente. Palabras preferidas: agente, ecosistema de comercio, vender, cobrar, pedido, resultado. Evitar: chatbot, bot, asistente virtual, soporte, mesa de ayuda.
- Datos antes que adjetivos: "31 % de conversión" mejor que "conversión increíble".

### Mensajes del agente (conversación con clientes finales)

Patrón: **dato o resultado → propuesta concreta → opción fácil de responder** (respuestas rápidas).

| Momento | Ejemplo |
|---|---|
| Recompra | "Hola, Marta. Te quedan 3 cajas de agua de 600 ml. ¿Repetimos el pedido de la semana pasada?" |
| Confirmación | "Listo, ya quedó apuntado. Llega mañana antes de las 10." |
| Cobro | "Son $ 486.000. Puedes pagar con este link o contra entrega." |
| Pago recibido | "Recibimos tu pago de $ 486.000. Tu pedido sale hoy." |
| Sin stock | "El jugo de 1 L se agotó. Tengo el de 500 ml al mismo precio por litro. ¿Lo cambio?" |
| Posventa | "Siento que llegara incompleto. Te enviamos las 2 cajas que faltan mañana, sin costo." |
| No entiende | "No te entendí bien. ¿Quieres hacer un pedido o revisar uno que ya hiciste?" |

Respuestas rápidas: 2–3 opciones, 1–3 palabras, verbo + objeto ("Repetir pedido", "Ver catálogo", "Hablar con un asesor").

### Microcopy de producto (panel para marcas)

| Situación | Ejemplo |
|---|---|
| Vacío | "Aún no hay pedidos hoy. Cuando un cliente compre por WhatsApp o en tu tienda, verás aquí el pedido y su pago." |
| Éxito | "Catálogo sincronizado. 248 productos con precio e inventario de hoy." |
| Aviso | "Stock bajo. Quedan 12 unidades de jugo de 1 L." |
| Error | "No pudimos conectar con el ERP. Revisa las credenciales y vuelve a intentarlo." |
| Carga | "Sincronizando catálogo" (sin puntos suspensivos decorativos) |
| Confirmación destructiva | Título: "¿Eliminar esta regla?" · Cuerpo: "Dialo dejará de ofrecer este descuento." · Botones: "Eliminar regla" / "Cancelar" |

Errores: calmos y accionables, sin culpar al usuario, sin códigos crudos (si hace falta, en Geist Mono al final).

### Marketing

Titulares orientados a resultado y concretos: "Cada conversación, una venta cobrada y medida." · "Toma pedidos sin ampliar el equipo." · "Cobra dentro de la conversación." Cierre o firma con el slogan literal.

## 12 · Registro de decisiones

### Decisiones de marca (brandbook §13)

| Fecha | Decisión | Motivo |
|---|---|---|
| 2026-10-19 | Se elimina el toldo del icono y se añade una diadema con micrófono de trazo continuo. La cara original se mantiene. | El toldo encasillaba a Dialo en CPG. La diadema comunica "agente". |
| 2026-10-19 | El personaje 3D usa el icono como cabeza. | Unidad total entre logo y personaje. |
| 2026-10-20 | Color principal: azul Dialo `#0C4088`. Diadema: magenta Pulse `#FC1C70` de AxonCore. | Continuidad con la marca Dialo y vínculo visual con AxonCore dentro del propio icono. |
| 2026-10-20 | Tipografía de marca: Montserrat. Wordmark en Medium; respaldo "By" en Light Italic. | Continuidad con el wordmark. |
| 2026-10-20 | El respaldo "By axoncore" es opcional y se usa solo cuando Dialo necesita la asociación fuera de su entorno. | Dialo funciona como marca completa por sí misma. |
| 2026-10-20 | Respaldo en gris `#3A3A3A` en la versión positiva; negro o blanco en monocromías. | El negro competía con el azul; `#3A3A3A` es color oficial de AxonCore y da jerarquía de firma. |
| 2026-10-20 | Las versiones en negro y blanco son monocromías y conservan la diadema magenta. | Definición de marca. |
| 2026-10-20 | Slogan: "El agente que convierte conversaciones en resultados." Solo en español. | Posiciona a Dialo como agente orientado a resultados, lejos de la lectura de chatbot o canal de atención. |
| 2026-10-20 | Sin emojis en interfaz ni en conversación. | Coherencia con la voz de AxonCore. |
| 2026-10-21 | Descripción oficial de Dialo en tres extensiones (una frase, corta y completa). | Definición de producto. |
| 2026-10-21 | Color especificado en HEX, RGB y CMYK. | Definición de marca. |
| 2026-10-28 | Un único personaje oficial: el icono en volumen, sin cuerpo independiente, con brazos y piernas. Sin vestuario ni variaciones. | Definición de marca. |
| 2026-10-21 | El sistema de logo se compone de los 14 archivos maestros. | Definición de marca. |

### Decisiones del sistema de diseño

Las decisiones de **marca** viven en el brandbook (§13). Aquí se registran las decisiones de **sistema**: valores que el brandbook no define y que el producto necesita. Todas heredan de AxonCore cuando existe un equivalente, para mantener la familia.

| Fecha | Decisión | Motivo | Impacto |
|---|---|---|---|
| 2026-10-28 | Tema claro como único tema de interfaz; la superficie azul (`data-surface="brand"`) se usa para portadas, héroes y páginas de sección. | El brandbook define fondo predominante blanco y páginas de sección en azul. No hay modo oscuro definido. | Un modo oscuro de producto requiere decisión de marca antes de implementarse. |
| 2026-10-28 | Texto principal negro `#000000`, secundario gris `#3A3A3A`, títulos en azul Dialo. Texto atenuado `#6B6B6B` (5,3:1). | Roles de color del brandbook §04. El atenuado se hereda de AxonCore. | Jerarquía clara con contraste AA. |
| 2026-10-28 | Botón principal azul Dialo con texto blanco (10:1). No existe botón magenta. | Blanco sobre magenta da 3,8:1: no apto para texto < 24 px. El brandbook reserva el magenta al icono de la acción principal. | El magenta aparece en el icono de la acción principal (`accentIcon`) solo cuando el botón es claro; dentro del botón azul el icono queda blanco. También en el indicador de tab activa, el punto "en vivo" y datos clave. |
| 2026-10-28 | Magenta para texto pequeño: `pulse-700` `#C11765` (5,9:1) sobre fondo `pulse-50` `#FFE8F1`. | Necesario para badges de acento legibles. Mismo tono que AxonCore usa en tema claro. | Solo en badges y etiquetas; nunca como color de párrafo. |
| 2026-10-28 | Estados funcionales heredados de AxonCore (tema claro): éxito `#0B7A52`, aviso `#8F5A00`, error `#C2340E`; información en azul Dialo. | Error naranja-rojo para no confundirse con el magenta de marca. | Coherencia entre productos AxonCore. |
| 2026-10-28 | Neutrales fríos `#ECEDEE`, `#D4D6D8`, `#8C8C8C` para divisores, bordes y controles. | Heredados de AxonCore. `#8C8C8C` da 3,4:1 para bordes de controles. | — |
| 2026-10-28 | Radios: 4 · 8 (inputs) · 12 (botones, burbujas) · 16 (cards) · 24 (paneles) y `radius-squircle` 22,7 % para avatares. | Más suaves que AxonCore (6–12) para acompañar el squircle del icono; el 22,7 % es la proporción exacta del icono. | Interfaz cercana sin perder precisión. |
| 2026-10-28 | Espaciado en retícula de 4/8 px, contenedor 1200 px, medida de lectura 70 caracteres. | Brandbook §06 (70 caracteres) y sistema AxonCore. | — |
| 2026-10-28 | Movimiento 80/140/220/360 ms con `cubic-bezier(0.16, 1, 0.3, 1)`; respeta `prefers-reduced-motion`. | Heredado de AxonCore. | — |
| 2026-10-28 | Escala tipográfica móvil (< 768 px): Display 40/48, H1 32/40, H2 24/32. | El brandbook define tamaños de escritorio. | Títulos legibles en pantallas pequeñas. |
| 2026-10-28 | Conversación: burbuja del agente en blanco roto con texto negro; burbuja del cliente en azul Dialo con texto blanco. El avatar del agente es siempre el icono positivo oficial. | Dialo es un producto conversacional; el icono identifica al agente. | Componentes `Thread`, `Message`, `QuickReplies`, `Composer`. |
| 2026-10-28 | Logos de producción con recorte ajustado y fondo transparente, generados desde los maestros sin alterar su geometría (verificado en CI). | Facilita el uso en web con el área de seguridad aplicada por CSS. | Los maestros siguen siendo la referencia. |
| 2026-10-28 | Sobre la superficie de marca, los estados usan su tinte claro (#E6F4EE, #FBF1E0, #FBEAE5) sobre `dialo-800`. | Los tonos oscuros de estado no se leen sobre azul. Sin colores nuevos. | Alertas, badges y errores legibles en héroes y portadas. |
| 2026-10-28 | Favicon e iconos de app a partir del icono positivo sobre blanco. | El brandbook no define icono negativo; no se crea ninguna versión nueva. | — |

## 13 · Checklist antes de entregar

- [ ] Azul 50–60 %, neutrales 30–40 %, magenta ≤ 10 % y solo como acento; nunca magenta sobre azul ni texto blanco sobre magenta.
- [ ] Logo desde el archivo oficial, versión y color correctos para el fondo, área de seguridad y tamaño mínimo respetados, diadema magenta, respaldo solo donde corresponde.
- [ ] Montserrat en todo (Geist Mono solo para datos), escala y pesos del sistema, sentence case.
- [ ] Una acción primaria por vista; magenta como mucho en su icono y solo si el botón es claro; foco visible.
- [ ] Todo texto con contraste AA (4,5:1; 3:1 a 24 px o más, bordes e iconos).
- [ ] Iconos Lucide de trazo 2 px; sin emojis.
- [ ] Copy en tuteo, voz activa, resultado primero, sin exclamaciones ni buzzwords; botones verbo + objeto; Dialo nunca como chatbot; slogan literal con punto final.
- [ ] Personaje: solo el render oficial, sin modificar, sin sustituir al logo.

## 14 · Prompt inicial sugerido para Claude Design

> Crea el sistema de diseño **Dialo** a partir de este documento y del material adjunto. Usa exactamente los tokens, la tipografía, los logos y los componentes definidos; no inventes valores. Los logos y el personaje se usan desde los archivos adjuntos, nunca redibujados. Incluye los dos temas (Claro y Superficie de marca), todos los componentes de la sección 8 con sus estados, y una portada con el logo horizontal negativo sobre azul Dialo y el slogan.

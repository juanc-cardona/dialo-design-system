# 04 · Color

Se especifica en HEX, RGB y CMYK. Pantone no está definido: no lo inventes.

## Paleta principal

| Color | Rol | HEX | RGB | CMYK |
|---|---|---|---|---|
| **Azul Dialo** | Color de marca: icono, wordmark, fondos de marca | `#0C4088` | 12, 64, 136 | 91 · 53 · 0 · 47 |
| **Magenta Pulse** (AxonCore) | Diadema y acento puntual | `#FC1C70` | 252, 28, 112 | 0 · 92 · 24 · 0 |
| **Blanco** | Cara del icono, fondos | `#FFFFFF` | 255, 255, 255 | 0 · 0 · 0 · 0 |
| **Blanco roto** | Fondos claros | `#F6F6F6` | 246, 246, 246 | 4 · 3 · 4 · 0 |
| **Negro** | Monocromía, texto | `#000000` | 0, 0, 0 | 91 · 79 · 62 · 97 |
| **Gris AxonCore** | Respaldo, texto secundario | `#3A3A3A` | 58, 58, 58 | 67 · 58 · 55 · 61 |

El CMYK del azul es una conversión de referencia: validar con prueba de color antes de imprimir.

## Escala del azul (interfaz, ilustración, gráficos; nunca el logo)

| Token | HEX | Uso |
|---|---|---|
| `dialo-900` | `#072652` | Texto sobre fondos claros de marca, estados presionados, toasts |
| `dialo-800` | `#0A336D` | Hover de elementos azules |
| `dialo-700` | `#0C4088` | Color de marca |
| `dialo-400` | `#6D8CB8` | Ilustración, gráficos secundarios |
| `dialo-300` | `#9EB3CF` | Bordes y divisores sobre fondos de marca |
| `dialo-100` | `#CED9E7` | Fondos de componentes seleccionados |
| `dialo-50` | `#E7ECF3` | Fondos suaves de sección, hover |

## Proporción por pieza

Azul 50–60 % · blancos y neutrales 30–40 % · magenta **máximo 10 %**. El magenta es un acento: la diadema, un detalle, una acción puntual. Nunca fondos amplios.

Dónde sí va el magenta en interfaz: icono de la acción principal de la vista (solo sobre fondo claro: nunca dentro del botón azul), indicador de la tab activa, punto "en vivo", el dato clave de un gráfico, badges de acento (texto `#C11765` sobre `#FFE8F1`).

## Contraste

| Combinación | Ratio | Uso |
|---|---|---|
| Blanco sobre azul Dialo / azul sobre blanco | 10:1 | Todo texto |
| Gris #3A3A3A sobre blanco | 11,4:1 | Todo texto |
| #6B6B6B sobre blanco | 5,3:1 | Texto atenuado |
| Magenta sobre blanco | 3,8:1 | Solo gráficos y texto ≥ 24 px |
| #C11765 sobre blanco | 5,9:1 | Magenta en texto pequeño |
| Magenta sobre azul Dialo | 2,6:1 | **No permitido** para texto ni elementos aislados |
| Blanco sobre magenta | 3,8:1 | No para texto < 24 px (por eso no hay botones magenta) |

## Tokens semánticos

| Token | Claro | Superficie de marca |
|---|---|---|
| `bg-canvas` | #FFFFFF | #0C4088 |
| `bg-surface` | #F6F6F6 | #0A336D |
| `bg-raised` | #FFFFFF | #0A336D |
| `bg-subtle`, `bg-hover` | #E7ECF3 | #0A336D |
| `bg-selected` | #CED9E7 | #072652 |
| `bg-brand` | #0C4088 | #0C4088 |
| `text-primary` | #000000 | #FFFFFF |
| `text-secondary` | #3A3A3A | #CED9E7 |
| `text-muted` | #6B6B6B | #9EB3CF |
| `text-heading`, `text-link` | #0C4088 | #FFFFFF |
| `border-subtle` / `default` / `strong` | #ECEDEE / #D4D6D8 / #8C8C8C | #0A336D / #6D8CB8 / #9EB3CF |
| `action-primary` (+ hover, pressed) | #0C4088 (#0A336D, #072652) | #FFFFFF (#E7ECF3, #CED9E7) |
| `on-action-primary` | #FFFFFF | #0C4088 |
| `accent` / `accent-text` / `accent-subtle` | #FC1C70 / #C11765 / #FFE8F1 | blanco (sin magenta aislado) |
| `focus-ring` | #0C4088 | #FFFFFF |
| `status-info` | #0C4088 sobre #E7ECF3 | — |
| `status-success` | #0B7A52 sobre #E6F4EE | — |
| `status-warning` | #8F5A00 sobre #FBF1E0 | — |
| `status-danger` | #C2340E sobre #FBEAE5 | — |
| `bubble-agent` / `on-` | #F6F6F6 / #000000 | #FFFFFF / #000000 |
| `bubble-customer` / `on-` | #0C4088 / #FFFFFF | #0A336D / #FFFFFF |

Superficie de marca = `data-surface="brand"` en cualquier contenedor (portadas, héroes, páginas de sección, cierres). No existe modo oscuro de interfaz.

## Gráficos

Serie principal en azul Dialo; secundarias en `dialo-400`, `dialo-300`, `dialo-100` y `#3A3A3A`; magenta solo para resaltar **un** dato clave. Ejes y rejilla en `#D4D6D8`, etiquetas en `#3A3A3A`, cifras en Geist Mono.

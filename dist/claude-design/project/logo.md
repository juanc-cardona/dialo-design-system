# Logo

## Componentes

| Componente | Descripción |
|---|---|
| **Icono** | Squircle azul con la cara de Dialo (dos ojos redondos y sonrisa) y diadema con micrófono de trazo continuo en magenta |
| **Wordmark** | "Dialo" en Montserrat Medium, tracking −60, **en contornos**. Nunca se reescribe con la fuente |
| **Respaldo** (opcional) | "By" en Montserrat Light Italic + wordmark oficial de AxonCore, alineado a la derecha bajo el wordmark |

## Archivos (el grupo **Logos**)

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

## Versiones y uso

| Versión | Composición | Uso |
|---|---|---|
| Horizontal | Icono a la izquierda, wordmark a la derecha | Por defecto en todos los soportes (cabeceras, nav, firmas, portadas) |
| Horizontal con respaldo | + "By axoncore" bajo el wordmark, alineado al final de la "o" | Solo cuando Dialo aparece solo fuera de su entorno (ver abajo) |
| Vertical | Icono centrado sobre el wordmark | Formatos cuadrados o verticales, redes, merch |
| Icono | Solo el icono | App, avatar, favicon, redes, sellos |

## Qué versión de color según el fondo

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

## Con o sin respaldo

| Versión | Cuándo | Ejemplos |
|---|---|---|
| **Sin respaldo** (por defecto) | Dialo vive en su propio entorno o el contexto ya deja clara la relación con AxonCore | Plataforma y App Dialo, redes propias, onboarding, piezas de producto, materiales dentro del ecosistema AxonCore |
| **Con respaldo** | Dialo aparece solo, fuera de su entorno, y necesita la asociación | Eventos y ferias, prensa, alianzas y co-branding, propuestas comerciales a nuevos clientes, impresos de presentación |

El respaldo no se separa, no cambia de posición ni de color, y por debajo de 200 px de ancho se usa la versión sin respaldo.

## Área de seguridad y tamaños mínimos

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

## Construcción (para verificar, nunca para redibujar)

Cuerpo del icono W = 815,53 u, radio 184,88 u (22,7 %). Ojos de 84 u separados 325,84 u, a 58 % de la altura. Cara desplazada 5,3 u a la derecha (compensación óptica del micrófono). Diadema de trazo 18 u. En la horizontal, el icono mide lo mismo que la altura de mayúscula de "Dialo" y la separación es ≈ 4,1x. En la vertical, la mayúscula mide el 57 % del icono y la separación es ≈ 2,3x. El respaldo mide el 17 % de la mayúscula de "Dialo".

## Usos incorrectos

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

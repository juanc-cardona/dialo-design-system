# 06 · Tipografía

## Montserrat (Google Fonts, OFL)

El wordmark está construido con Montserrat: usar la misma familia en todo el contenido da continuidad total entre logo y comunicación.

| Nivel | Peso | Tamaño / interlineado | Clase | Uso |
|---|---|---|---|---|
| Display | SemiBold 600 | 56/64 (móvil 40/48) | `.dl-display` | Portadas, héroes de campaña |
| H1 | SemiBold 600 | 40/48 (móvil 32/40) | `.dl-h1` | Títulos de página |
| H2 | SemiBold 600 | 28/36 (móvil 24/32) | `.dl-h2` | Secciones |
| H3 | Medium 500 | 20/28 | `.dl-h3` | Subsecciones, tarjetas |
| Slogan | Medium 500 | Según formato | `.dl-slogan` | Firma de marca |
| Lead | Regular 400 | 18/30 | `.dl-lead` | Entradilla bajo un título (extensión del sistema) |
| Cuerpo | Regular 400 | 16/26 | `.dl-body` | Texto corrido |
| Pequeño | Regular 400 | 14/22 | `.dl-small` | Apoyo, interfaz |
| Etiqueta | Medium 500 | 12/16, +4 % | `.dl-label`, `.dl-overline` (mayúsculas) | Etiquetas, chips, overlines |
| Respaldo "By" | Light Italic 300 | Proporcional | — (va en contornos en el logo) | Solo en el lockup con respaldo |
| Datos | Geist Mono 400/500 | 14/22 | `.dl-data` | Cifras, IDs, código |

Títulos en azul Dialo (`--text-heading`) sobre claro; en blanco sobre la superficie de marca. Cuerpo en negro; secundario en #3A3A3A.

## Reglas

- Mayúscula inicial solo en la primera palabra. Mayúsculas completas solo en etiquetas cortas (overline).
- Máximo ~70 caracteres por línea en cuerpo (Montserrat es ancha).
- En pantalla, ningún peso por debajo de Regular 400 para lectura. Light solo en el "By".
- Geist Mono es la única tipografía adicional permitida, solo para datos, código o cifras técnicas.
- En piezas co-brandeadas con AxonCore, Montserrat se mantiene para el contenido de Dialo.
- Nada de pesos Bold 700+ ni Black: la escala es 400 / 500 / 600.

## Carga

- Archivo único (artefactos): `cat assets/dialo-fonts.css` en el `<style>` (Montserrat variable normal e itálica + Geist Mono embebidas).
- Web con red: `https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;1,300&family=Geist+Mono:wght@400;500&display=swap`.
- Slides, documentos y Office: Montserrat instalada; si no está disponible, avisa en lugar de sustituirla en silencio.

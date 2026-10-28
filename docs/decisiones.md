# Decisiones del sistema de diseño

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

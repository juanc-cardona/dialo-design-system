Dialo es el agente de comercio conversacional de AxonCore: atiende, vende, cobra y da seguimiento a los clientes en WhatsApp, e-commerce, app o terminal de punto de venta. Este sistema sale del repositorio `dialo-design-system` (tokens, CSS y React idénticos a producción) y del brandbook v1.3. Úsalo para decks, documentos, páginas, pantallas de producto y piezas de campaña.

## Reglas que no se rompen

- Usa solo los logos del grupo **Logos** (o el componente `Logo`). Nunca reescribas "Dialo" con la fuente ni redibujes el icono. La diadema es magenta en todas las versiones.
- Proporción por pieza: `dialo` 50–60 %, blancos y neutrales 30–40 %, `pulse` como máximo 10 %.
- `pulse` nunca como fondo amplio, nunca sobre `dialo` (2,6:1), nunca con texto blanco encima por debajo de 24 px (3,8:1). Para texto magenta pequeño, `accent-text` sobre `accent-subtle`.
- Errores en `status-danger` (naranja-rojo), nunca en magenta. Todo estado lleva palabra o icono.
- Montserrat para todo (`--font-brand`); Geist Mono (`--font-mono`) solo para cifras, IDs y código. Escala de 400 / 500 / 600; Light 300 Italic solo en el "By" del respaldo.
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

- Mayúscula inicial solo en la primera palabra; mayúsculas completas solo en etiquetas cortas (`label` como overline).
- Titulares de marketing concretos y orientados a resultado: "Cada conversación, una venta cobrada y medida."
- Descripción oficial en una frase: "Dialo es un ecosistema de comercio con IA conversacional que atiende, vende, cobra y da seguimiento a tus clientes en el canal donde están." Versiones corta y completa en la sección Marca.
- Mensajes del agente: dato → propuesta → respuesta rápida (componente `QuickReplies`).

## Fundamentos visuales

**Color.** Tema **Claro** por defecto: `bg-canvas` blanco, `bg-surface` `offwhite` para secciones alternas y paneles, `text-primary` negro, `text-secondary` `graphite`, `text-heading` azul Dialo. Tema **Superficie de marca** (o `data-surface="brand"` en un contenedor) para portadas, héroes, páginas de sección y cierres: fondo `dialo`, texto blanco, botón primario blanco. No hay modo oscuro. La escala `dialo-900…50` es para interfaz, ilustración y gráficos, nunca para el logo.

**Tipografía.** `display` 56/64 para portadas y héroes, `h1` 40/48, `h2` 28/36, `h3` 20/28, `body` 16/26 (máximo 70 caracteres por línea), `small` 14/22, `label` 12/16 +4 %. Títulos en `text-heading`.

**Espaciado y forma.** Retícula 4/8 (`space-*`). Contenedor `container` 1200 px. Radios: `radius-sm` inputs, `radius-md` botones y burbujas, `radius-lg` cards, `radius-xl` paneles, `radius-squircle` (22,7 %, la del icono) para avatares.

**Elevación.** `shadow-1` cards, `shadow-2` hover y menús, `shadow-3` diálogos y toasts. Sombras suaves tintadas de azul; nunca en el logo.

**Movimiento.** 80 / 140 / 220 / 360 ms con `cubic-bezier(0.16, 1, 0.3, 1)`. Botón presionado baja 1 px; card interactiva sube 2 px. Respeta reduced motion.

**Foco y accesibilidad.** Anillo sólido de 2 px en `focus-ring` con 2 px de separación. Todo texto ≥ 4,5:1 (≥ 3:1 a 24 px o más, bordes de control e iconos).

**Personaje.** Un único render oficial (grupo **Personaje**): el icono en volumen, cabeza y cuerpo a la vez, brazos y piernas finos, sin vestuario ni variaciones. Para onboarding, campañas, estados vacíos y comunicación; nunca sustituye al logo. Fondo gris claro de estudio o color plano de la paleta.

**Composición.** Landing: nav blanca con logo horizontal positivo → héroe en superficie de marca con maqueta de conversación → secciones blancas y `bg-surface` alternas → cierre azul con logo negativo y slogan. Deck: portada azul (logo horizontal negativo + slogan), contenido blanco, separadores azules, cierre azul. Producto: `bg-surface` con cards blancas y una acción primaria por vista.

## Iconografía

Lucide, trazo de 2 px, terminaciones y uniones redondeadas, 16 / 20 / 24 px, `currentColor`. Color `dialo` o `graphite`; `pulse` solo en el icono de la acción principal de la vista (`Button` con `accentIcon`). Sin emojis. Iconos frecuentes: message-circle, shopping-cart, credit-card, package, chart-line, store, refresh-ccw.

## Logo

Elige la versión por el fondo: blanco u `offwhite` → positiva; `dialo` → negativa; negro o muy oscuro → monocromía blanca; foto clara y limpia → monocromía negra; magenta, degradados o fotos recargadas → no se coloca. Horizontal por defecto, vertical en formatos cuadrados, icono en app, avatar y favicon. El respaldo "By axoncore" solo cuando Dialo aparece fuera de su entorno (eventos, prensa, alianzas, propuestas a clientes nuevos). Área de seguridad 2x (x = diámetro del ojo) en lockups y 1x en el icono. Mínimos: horizontal 120 px, con respaldo 200 px, vertical 80 px, icono 32 px. Detalle en la sección Logo.

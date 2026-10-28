# Button

Botón de acción con etiqueta verbo + objeto ("Hacer pedido", "Ver saldo").

**Cuándo:** `primary` para la única acción principal de la vista (azul con texto blanco; en la superficie de marca, blanco con texto azul); `secondary` y `ghost` para alternativas; `danger` para acciones destructivas. No existe botón magenta: el magenta solo va en el icono de la acción principal (`accentIcon`), y solo cuando el botón es claro (primario sobre la superficie de marca, secundario o ghost). Dentro del botón primario azul el icono queda blanco, porque el magenta no va sobre azul.

**Props:** `variant`, `size` (`sm` 32 · `md` 40 · `lg` 48), `icon` / `iconRight` (Lucide, trazo 2), `accentIcon`, `loading`, `disabled`, `block`, `as` ("a" para enlaces). Sin children = botón de icono: añade `aria-label`.

**Estados:** hover (azul 800), presionado (azul 900, baja 1 px), foco (anillo `focus-ring`), deshabilitado (40 %), cargando (spinner y `aria-busy`).

# Field

Campo de formulario: etiqueta, control, ayuda y error enlazados por accesibilidad.

**Cuándo:** todo input, textarea o select. La etiqueta es obligatoria y en sentence case; el error dice qué hacer ("Escribe un número de 10 dígitos.").

**Props:** `label`, `hint`, `error` (pone `aria-invalid` y sustituye a hint), `id`; children = un `Input`, `Textarea` o `Select` (también exportados).

**Estados:** hover (borde `text-secondary`), foco (borde azul + halo `dialo-100`), error (borde `status-danger`), deshabilitado (50 %).

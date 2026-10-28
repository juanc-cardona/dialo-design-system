# Alert

Mensaje de sistema con icono, título y cuerpo.

**Cuándo:** confirmar un resultado, avisar de un riesgo o explicar un error con la acción para resolverlo. Tono calmo y concreto.

**Props:** `tone` (`info` · `success` · `warning` · `danger`), `title`, children = cuerpo. `danger` usa `role="alert"`; el resto `role="status"`.

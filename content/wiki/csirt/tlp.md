---
{"id":"csirt-tlp","title":"Traffic Light Protocol (TLP)","slug":"tlp","parent":"csirt-sensitive-information","type":"protocol","order":10,"aliases":["TLP:RED","TLP:AMBER","TLP:GREEN","TLP:WHITE","restricciones de difusión"],"related":["csirt-sensitive-information","csirt-handling","crypto-encryption"],"sources":[{"id":"lecture-incidents","pages":[23,24,25,26]},{"id":"manual","pages":[28]}]}
---
## Propósito

Traffic Light Protocol es un esquema para comunicar hasta dónde puede circular información sensible compartida entre equipos y afectados. El emisor indica el alcance de difusión para que los receptores sepan con quién pueden compartirla. La clase lo utiliza en el contexto de coordinación entre CSIRT.

TLP expresa restricciones de distribución. No cifra el mensaje, no comprueba una firma y no evita técnicamente que un receptor copie el contenido. Su utilidad depende de que las partes comprendan y respeten el alcance indicado.

## Etiquetas que muestra la cátedra

La tabla de la página 24 de la presentación utiliza las siguientes etiquetas. Se conservan como contenido de esa fuente, incluida la denominación `TLP:WHITE`.

| Etiqueta en la diapositiva | Alcance resumido del material |
| --- | --- |
| `TLP:RED` | Solo los receptores del ámbito original; no se comparte con terceros |
| `TLP:AMBER` | Difusión limitada por necesidad de conocer dentro de la organización y con clientes, proveedores o asociados que necesiten protegerse; puede haber restricciones adicionales del emisor |
| `TLP:GREEN` | Puede circular entre organizaciones afiliadas o miembros de la comunidad o sector, sin canales públicos |
| `TLP:WHITE` | Difusión sin restricciones TLP, sujeta a derechos de autor |

La nomenclatura tiene contexto de versión: el manual complementario presenta por separado una ampliación denominada TLP 2.0 con otras etiquetas. Esta nota explica la tabla oficial de la clase; no afirma que sus nombres sean la terminología vigente para cualquier intercambio operativo. Antes de un intercambio real, las partes deben acordar qué versión y alcance están utilizando.

## Ejemplo de uso

Un informe útil para otras entidades del mismo sector contiene detalles que no deben publicarse. Una restricción del tipo `TLP:GREEN`, según la tabla estudiada, permite compartirlo en esa comunidad y excluye publicarlo en un canal abierto. La utilidad de la información no anula la restricción.

Si el documento contiene datos que también requieren confidencialidad durante la transmisión, debe protegerse mediante un canal o [cifrado](wiki:crypto-encryption) adecuado. Esa protección complementa la regla de difusión.

## Repaso

:::question ¿Un archivo marcado TLP:RED queda cifrado automáticamente?
No. La etiqueta indica quién puede recibir o compartir la información; no transforma el archivo. La protección criptográfica y el control de destinatarios deben implementarse por los mecanismos apropiados.
:::

:::question ¿Publicar en una página abierta información TLP:GREEN respeta la tabla estudiada?
No. La tabla permite circulación en la comunidad o sector y excluye los canales públicos. Debe respetarse ese límite aunque el contenido parezca útil para un público más amplio.
:::

---
{"id":"fundamentals-cia","title":"Tríada CIA","slug":"cia","parent":"fundamentals-security","type":"concept","order":10,"aliases":["confidencialidad","integridad","disponibilidad"],"related":[],"sources":[{"id":"lecture-fundamentals","pages":[2,3,4]},{"id":"lecture-incidents","pages":[2,3]}],"permalink":"fundamentals/cia"}
---
## Definición

La tríada CIA reúne tres objetivos de protección de la información: confidencialidad, integridad y disponibilidad. Sus iniciales provienen de los términos en inglés. Son dimensiones de un mismo modelo, no tres tipos de ataque.

## Qué protege cada dimensión

| Dimensión | Pregunta que permite evaluar |
| --- | --- |
| Confidencialidad | ¿La información está al alcance solamente de quienes tienen autorización? |
| Integridad | ¿La información conserva su exactitud y no ha sufrido modificaciones indebidas? |
| Disponibilidad | ¿Los usuarios autorizados pueden utilizar la información y los servicios cuando los necesitan? |

Un control puede contribuir a más de un objetivo. También puede existir tensión entre ellos: una restricción de acceso demasiado rígida podría impedir un uso legítimo del servicio. Por eso la evaluación debe considerar el contexto, no solo la presencia de una herramienta.

## Ejemplo

En un sistema de calificaciones, leer notas ajenas sin permiso afecta la confidencialidad; cambiar una calificación sin autorización afecta la integridad; una interrupción que impide consultar las notas afecta la disponibilidad. Un mismo incidente puede afectar varias dimensiones.

## Preguntas de repaso

:::question ¿Cifrar un archivo garantiza por sí solo toda la tríada?
No. El cifrado puede proteger su confidencialidad, pero no garantiza que el archivo esté disponible cuando se necesita ni, por sí solo, que cualquier modificación indebida sea detectada.
:::

:::question ¿Por qué un incidente puede afectar más de un objetivo?
Porque sus efectos pueden combinarse: un atacante puede copiar información, modificarla y luego impedir el acceso al servicio. La tríada ayuda a describir cada consecuencia por separado.
:::

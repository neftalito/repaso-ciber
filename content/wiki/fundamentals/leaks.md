---
{"id":"fundamentals-leaks","title":"Filtraciones de información (Leaks)","slug":"leaks","parent":"fundamentals","type":"concept","order":70,"related":["fundamentals-cia","fundamentals-risk"],"sources":[{"id":"lecture-fundamentals","pages":[11,12,13,14]}],"aliases":["Filtraciones de información"]}
---
## Definición y contexto

Una filtración expone información que debía permanecer restringida. Las diapositivas describen datos robados que pasan a circular públicamente o a venderse, de modo que pueden quedar al alcance de terceros ajenos al sistema original.

## Uso en una investigación

Una exposición puede afectar la confidencialidad incluso cuando el servicio sigue funcionando. El curso menciona servicios que reúnen información sobre filtraciones conocidas como medio de consulta. Esa consulta aporta un indicio sobre los datos registrados por el servicio; no equivale a una auditoría completa de todas las cuentas o incidentes posibles.

## Ejemplo y límites

Si una dirección aparece en una filtración identificada, debe evaluarse qué datos se expusieron y a qué hecho corresponde. No se debe concluir automáticamente que el dispositivo actual esté infectado ni que todas las contraseñas de la persona hayan sido reveladas.

## Consulta de filtraciones conocidas

La diapositiva 13 menciona **Have I Been Pwned** como recurso para comprobar si determinados datos aparecen en filtraciones conocidas. En el ejemplo de una dirección de correo, se consulta si figura en los registros cubiertos por el servicio y se interpreta el resultado dentro de esa cobertura. Una coincidencia indica una exposición conocida asociada al dato; no demuestra por sí sola el estado actual de una cuenta o equipo. La ausencia de coincidencias tampoco garantiza que nunca se haya filtrado información.

Los ejemplos visuales de la diapositiva 12 muestran incidentes de Yahoo y Sony y distintos tipos de datos expuestos. La diapositiva 14 presenta un correo extorsivo que afirma conocer una contraseña y datos personales: su afirmación es parte del mensaje y requiere verificación; no prueba por sí misma que se haya producido el compromiso que anuncia. Una filtración puede facilitar nuevos engaños incluso cuando el servicio sigue disponible.

:::question ¿No aparecer en una recopilación de filtraciones garantiza que nunca hubo exposición?
No. La conclusión está limitada por la cobertura de la recopilación y los datos disponibles. Ausencia de un registro no demuestra ausencia de toda filtración posible.
:::

---
{"id":"fundamentals-mitm","title":"Man in the Middle (MitM)","slug":"mitm","parent":"fundamentals-attacks","type":"concept","order":20,"related":["crypto-pki","crypto-signature"],"sources":[{"id":"lecture-fundamentals","pages":[8]}],"aliases":["Intermediario en comunicaciones (MitM)"]}
---
## Definición

Un ataque de intermediario, o Man in the Middle, se sitúa en una comunicación entre partes para interceptar su intercambio. La clase lo presenta como una amenaza sobre los canales de comunicación.

## Ejemplo conceptual

Dos participantes creen intercambiar información directamente, pero un tercero puede observar o intervenir el tránsito. El análisis debe distinguir la protección del contenido de la comprobación de quién está en cada extremo. Tener una comunicación establecida no demuestra por sí mismo que el interlocutor sea el esperado.

## Límite de la descripción

El término identifica la posición del atacante dentro del intercambio; no prueba que una conexión concreta haya sido interceptada. Las evidencias y los mecanismos de autenticación usados deben revisarse en el caso particular.

:::question ¿Por qué importa comprobar la identidad de una clave pública recibida?
Porque una clave presentada por un intermediario podría pertenecer a él. Cifrar hacia esa clave no autentica automáticamente al destinatario deseado; se necesita un vínculo confiable entre identidad y clave.
:::

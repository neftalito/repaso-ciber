---
{"id":"crypto-rc4","title":"RC4","slug":"rc4","parent":"crypto-stream","type":"algorithm","order":10,"related":["crypto-stream","crypto-ecb"],"sources":[{"id":"lecture-crypto-1","pages":[29]},{"id":"practice-1b","pages":[5]},{"id":"manual","pages":[11]}],"permalink":"cryptography/encryption/modern/symmetric/stream/rc4"}
---
## Qué es RC4

**RC4** es el ejemplo de cifrado simétrico de flujo de Cripto, parte 1, página 29. En este modelo se genera una secuencia pseudoaleatoria, llamada **secuencia cifrante** o *keystream*, y se combina con los datos del mensaje.

## Cómo leer el mecanismo

La explicación de la Práctica 1, parte 2, página 5, describe el procedimiento general de los cifradores de flujo:

1. Generar la secuencia cifrante a partir del secreto correspondiente.
2. Combinar cada unidad del texto claro con la unidad correspondiente de esa secuencia; la operación habitual presentada es XOR.
3. Para descifrar, reproducir la misma secuencia y aplicar la combinación inversa al cifrado.

La secuencia cifrante es una entrada de la transformación, no el mensaje reordenado. Las fuentes desarrollan este modelo general, sin explicar la inicialización ni el estado interno específico de RC4.

El manual complementario, página 11, lo trata como ejemplo histórico y señala su obsolescencia para sistemas nuevos.

:::question ¿RC4 es un modo de AES como ECB?
No. RC4 se presenta como un algoritmo de flujo. ECB es un modo de operación para cifradores por bloques.
:::

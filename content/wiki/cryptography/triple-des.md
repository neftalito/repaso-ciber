---
{"id":"crypto-triple-des","title":"3DES","slug":"triple-des","parent":"crypto-block-algorithms","type":"algorithm","order":20,"related":["crypto-des","crypto-aes","crypto-key-agreement"],"sources":[{"id":"lecture-crypto-1","pages":[30]},{"id":"practice-1b","pages":[5]}],"permalink":"cryptography/encryption/modern/symmetric/block/triple-des"}
---
## Qué es 3DES

**3DES** aparece entre los algoritmos simétricos de Cripto, parte 1, página 30, y entre los ejemplos de cifrado por bloques de la explicación de la Práctica 1, parte 2, página 5.

En el modelo por bloques, una transformación recibe un bloque de texto claro y el secreto correspondiente, y produce un bloque cifrado. El descifrado permite recuperar el original.

## Qué debe especificar un ejercicio

Conocer el nombre 3DES no determina todo el procedimiento aplicado a un mensaje. También se necesitan las claves y los parámetros indicados por el esquema, incluido su modo de operación. La clasificación por bloques describe la unidad de procesamiento; no explica cómo las partes obtienen las claves.

Las fuentes citadas lo enumeran sin desarrollar su composición interna. Su alcance aquí es reconocerlo y relacionarlo con el cifrado simétrico por bloques.

:::question ¿Nombrar 3DES resuelve el problema de distribuir secretos?
No. Elegir un algoritmo simétrico no establece por sí mismo cómo las partes obtienen y protegen las claves que necesitan.
:::

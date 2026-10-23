---
{"id":"crypto-ecb","title":"Modo ECB","slug":"ecb","parent":"crypto-block-modes","type":"technique","order":10,"related":["crypto-aes","crypto-cbc"],"sources":[{"id":"lecture-crypto-1","pages":[25,26,28]},{"id":"manual","pages":[10]}],"permalink":"cryptography/encryption/modern/symmetric/block/ecb"}
---
## Cifrar cada bloque de forma independiente

ECB, Electronic Codebook, aplica el mismo cifrador y la misma clave a cada bloque del mensaje por separado. No mezcla el bloque actual con el anterior. Su consecuencia central es que **bloques planos iguales producen bloques cifrados iguales** bajo la misma clave.

## Por qué se filtran repeticiones

Las páginas 25 y 26 de *Cripto, parte 1* presentan el procesamiento independiente. El manual complementario, página 10, expresa su consecuencia paso a paso:

1. Dos bloques contienen el mismo texto plano: `P1 = P2`.
2. Se aplica a ambos la misma transformación con la misma clave: `E(K, P1) = E(K, P2)`.
3. Los resultados coinciden: `C1 = C2`.

El observador puede reconocer esa igualdad sin conocer el contenido de los bloques ni descifrar el mensaje.

## La imagen de la clase

La página 28 compara una imagen original con sus versiones cifradas mediante ECB y CBC. En ECB siguen siendo reconocibles patrones de la figura. El problema no es que todos los píxeles permanezcan iguales al original, sino que el cifrado conserva relaciones de repetición entre bloques.

Una clave secreta no elimina esta filtración. El [encadenamiento de CBC](wiki:crypto-cbc) permite comprender por qué cambiar el modo modifica la relación entre bloques, aunque elegir un modo también requiere considerar sus propios parámetros y límites.

:::question ¿Una clave desconocida evita la filtración de repeticiones en ECB?
No. La igualdad de los bloques cifrados puede observarse sin descifrar. Surge del procesamiento independiente y determinista bajo la misma clave.
:::

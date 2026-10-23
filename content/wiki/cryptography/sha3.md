---
{"id":"crypto-sha3","title":"Familia SHA-3","slug":"sha3","parent":"crypto-hash","type":"algorithm","order":40,"related":["crypto-sha2","crypto-collisions"],"sources":[{"id":"lecture-crypto-1","pages":[18]},{"id":"manual","pages":[8]}],"permalink":"cryptography/hash/sha3"}
---
## Una familia distinta de SHA-2

**SHA-3** aparece en Cripto, parte 1, página 18, como una familia de funciones hash. Su propósito conceptual es calcular un resumen de los datos para poder compararlo; no producir un mensaje que se recupere mediante descifrado.

## Precisión sobre los nombres de la fuente

La diapositiva repite junto a SHA-3 la lista de nombres que antes utiliza para SHA-2. Esa repetición no permite considerar que SHA-224, SHA-256, SHA-384 y SHA-512 identifiquen indistintamente ambas familias. El manual complementario, página 8, conserva la distinción entre SHA-2 y SHA-3, sin desarrollar el mecanismo interno de esta última.

Para interpretar una herramienta o reproducir un cálculo se necesita el identificador concreto de la función. Conocer únicamente la cantidad de bits del resultado no alcanza: la longitud describe el resumen, pero no define qué función lo calculó.

:::question ¿Dos resúmenes de la misma longitud proceden necesariamente de la misma función?
No. Funciones distintas pueden tener salidas de igual longitud. Para comparar un procedimiento hay que conocer el algoritmo utilizado y los bytes de entrada.
:::

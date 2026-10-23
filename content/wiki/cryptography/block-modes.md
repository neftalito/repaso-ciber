---
{"id":"crypto-block-modes","title":"Modos de operación","slug":"modes","parent":"crypto-block","type":"category","order":20,"aliases":["modos de cifrado por bloques"],"related":["crypto-block-algorithms","crypto-xor"],"sources":[{"id":"lecture-crypto-1","pages":[25,26,27,28]},{"id":"manual","pages":[10,11]}]}
---
## Qué organiza un modo de operación

Un modo de operación establece cómo se utiliza un cifrador de bloques al procesar datos. El algoritmo y el modo resuelven cuestiones diferentes: nombrar AES identifica el cifrador, pero no determina por sí solo cómo se encadenan o combinan sus operaciones sobre un mensaje.

Las páginas hijas distinguen ECB, CBC, CFB y OFB. Cada una conserva sus explicaciones y límites; esta categoría permite compararlas sin mezclarlas con las páginas de algoritmos.

## Procedencia y límites

La teoría de cátedra enumera los cuatro modos en la página física 25 y desarrolla ejemplos de ECB y CBC en las páginas 26–28. El manual complementario aporta explicaciones adicionales. Que un modo figure en la lista de la clase no significa que todas sus propiedades estén desarrolladas allí.

Las condiciones concretas de inicialización y tratamiento de los datos dependen del esquema estudiado. Esta clasificación no añade parámetros de implementación ni una recomendación de uso.

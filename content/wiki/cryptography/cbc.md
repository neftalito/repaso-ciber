---
{"id":"crypto-cbc","title":"Modo CBC","slug":"cbc","parent":"crypto-block-modes","type":"technique","order":20,"related":["crypto-ecb","crypto-xor","crypto-signature"],"sources":[{"id":"lecture-crypto-1","pages":[25,27,28]},{"id":"manual","pages":[10,11]}],"permalink":"cryptography/encryption/modern/symmetric/block/cbc"}
---
## Encadenamiento

CBC, Cipher Block Chaining, combina cada bloque de texto plano con el bloque cifrado anterior mediante XOR antes de cifrarlo. El primero utiliza un vector de inicialización, IV, en lugar de un bloque anterior.

```text
C1 = E(K, P1 XOR IV)
C2 = E(K, P2 XOR C1)
P1 = D(K, C1) XOR IV
P2 = D(K, C2) XOR C1
```

## Qué cambia respecto de ECB

Dos bloques planos iguales situados en contextos previos diferentes no quedan sujetos a la igualdad directa de ECB. El encadenamiento introduce la historia del mensaje. Esto explica la comparación de imágenes de la clase; no demuestra que CBC autentique el contenido.

## Parámetros y límites

El IV no es la clave secreta. El manual precisa que debe ser impredecible al cifrar nuevos mensajes. También debe conocerse el relleno cuando el texto no completa los bloques. El modo, por sí solo, no proporciona una comprobación de autenticidad.

:::question ¿Conocer la clave y omitir el IV permite reconstruir correctamente el primer bloque?
No en general. Tras aplicar la operación inversa del cifrador todavía falta combinar el resultado con el IV usado para ese bloque.
:::

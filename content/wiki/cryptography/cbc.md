---
{"id":"crypto-cbc","title":"Modo CBC","slug":"cbc","parent":"crypto-block-modes","type":"technique","order":20,"related":["crypto-ecb","crypto-xor","crypto-signature"],"sources":[{"id":"lecture-crypto-1","pages":[25,27,28]},{"id":"manual","pages":[10,11]}],"permalink":"cryptography/encryption/modern/symmetric/block/cbc"}
---
## Encadenar los bloques antes de cifrar

CBC, Cipher Block Chaining, combina cada bloque de texto plano mediante XOR con el bloque cifrado anterior y después aplica el cifrador. El primer bloque utiliza un vector de inicialización, IV, porque todavía no existe un bloque cifrado anterior.

La intuición es que cada bloque deja de procesarse de manera independiente: su resultado depende de lo procesado antes. El diagrama de la página 27 de *Cripto, parte 1* muestra esa conexión entre bloques.

## Cifrado paso a paso

En las fórmulas, `P` es un bloque de texto plano, `C` un bloque cifrado y `K` la clave. `E` representa la operación de cifrado del algoritmo elegido.

1. Combinar `P1` con el IV mediante XOR y cifrar el resultado: `C1 = E(K, P1 XOR IV)`.
2. Combinar `P2` con el bloque cifrado obtenido, `C1`, y cifrar: `C2 = E(K, P2 XOR C1)`.
3. Continuar utilizando como entrada de la combinación el bloque cifrado inmediatamente anterior.

El encadenamiento utiliza **el bloque cifrado anterior**, no el anterior en texto plano.

## Cómo se recupera el texto

El manual complementario, página 11, desarrolla la operación inversa. `D` representa el descifrado del cifrador por bloques:

```text
P1 = D(K, C1) XOR IV
P2 = D(K, C2) XOR C1
```

Primero se descifra el bloque y después se aplica XOR con el IV o con el bloque cifrado anterior. Por eso conocer la clave no permite omitir el IV para recuperar correctamente el primer bloque.

## Qué mejora y qué no garantiza

A diferencia de [ECB](wiki:crypto-ecb), la transformación no depende solo del bloque plano y la clave. Dos bloques planos iguales con entradas de encadenamiento diferentes no producen la repetición directa de ECB. La página 28 compara las imágenes resultantes para mostrar ese efecto sobre los patrones.

El modo por sí solo no autentica el contenido. Además de la clave deben conocerse los parámetros del esquema, incluido el relleno cuando corresponda. El manual precisa que el IV debe ser impredecible al cifrar nuevos mensajes; no debe confundirse con la clave secreta.

:::question ¿Conocer la clave y omitir el IV permite reconstruir correctamente el primer bloque?
No en general. Tras descifrar C1 todavía falta combinar el resultado con el IV utilizado en ese mensaje.
:::

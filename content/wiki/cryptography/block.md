---
{"id":"crypto-block","title":"Cifrado por bloques","slug":"block","parent":"crypto-symmetric","type":"category","order":10,"related":["crypto-stream","crypto-xor"],"sources":[{"id":"lecture-crypto-1","pages":[25,26,27,28]},{"id":"practice-1b","pages":[5]},{"id":"manual","pages":[10,11]}],"permalink":"cryptography/encryption/modern/symmetric/block"}
---
## Transformar unidades de tamaño fijo

Un **cifrador por bloques** transforma un bloque de datos en otro bloque mediante una clave secreta. El descifrado utiliza esa misma clave para recuperar el original. DES y AES son ejemplos de Cripto, parte 1, página 25.

La explicación de la Práctica 1, parte 2, página 5, representa el recorrido como `C = E(K, P)` y `P = D(K, C)`: `P` es el bloque original, `C` el cifrado y `K` la clave. `E` y `D` son las operaciones de cifrado y descifrado.

## Algoritmo y modo de operación

- [Algoritmos](wiki:crypto-block-algorithms): transforman cada bloque con la clave.
- [Modos de operación](wiki:crypto-block-modes): organizan la aplicación del cifrador a un mensaje.

El tamaño de bloque y la longitud de clave son datos distintos. Para reproducir un descifrado también deben conocerse el tratamiento del último fragmento y, cuando corresponda, los parámetros de inicialización. El manual complementario, páginas 10–11, desarrolla esas distinciones.

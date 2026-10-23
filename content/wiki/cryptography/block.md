---
{"id":"crypto-block","title":"Cifrado por bloques","slug":"block","parent":"crypto-symmetric","type":"category","order":10,"related":["crypto-stream","crypto-xor"],"sources":[{"id":"lecture-crypto-1","pages":[25,26,27,28]},{"id":"practice-1b","pages":[5]},{"id":"manual","pages":[10,11]}]}
---
## Algoritmo y modo

Un cifrador de bloques transforma un bloque de tamaño fijo usando una clave: `C = E(K, P)`. La operación inversa recupera el bloque: `P = D(K, C)`. DES y AES son ejemplos nombrados en la clase.

Para procesar un mensaje se necesita además un **modo de operación**, que determina cómo se aplica el cifrador a los bloques. ECB, CBC, CFB y OFB tienen páginas propias: no son algoritmos alternativos a AES, sino maneras de organizar su utilización.

El tamaño de bloque no es la longitud de clave. También deben conocerse el tratamiento del último fragmento y, cuando corresponda, los parámetros de inicialización. Decir únicamente «se usó AES» no permite reproducir un descifrado.

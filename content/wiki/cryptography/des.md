---
{"id":"crypto-des","title":"DES","slug":"des","parent":"crypto-block-algorithms","type":"algorithm","order":10,"related":["crypto-triple-des","crypto-aes","crypto-rsa"],"sources":[{"id":"lecture-crypto-1","pages":[25]},{"id":"practice-1b","pages":[5]}],"permalink":"cryptography/encryption/modern/symmetric/block/des"}
---
## Qué es DES

**DES** es un algoritmo de cifrado simétrico por bloques. Recibe un bloque de datos y una clave secreta, y produce un bloque cifrado. El descifrado utiliza la misma clave para recuperar el original.

Cripto, parte 1, página 25, lo enumera junto con AES. La explicación de la Práctica 1, parte 2, página 5, desarrolla el modelo general de cifrado y descifrado por bloques.

## Algoritmo y modo de operación

DES identifica el algoritmo. Los nombres ECB y CBC identifican modos de aplicar cifradores por bloques a un mensaje. Por eso conocer solamente el nombre DES no completa un procedimiento de descifrado: también se necesitan la clave y la configuración utilizada.

Las páginas citadas permiten comprender esa ubicación, pero no desarrollan las rondas ni los parámetros internos de DES.

:::question ¿DES y RSA utilizan el mismo modelo de claves?
No. DES pertenece al cifrado simétrico con secreto compartido; RSA se estudia con un par de claves pública y privada.
:::

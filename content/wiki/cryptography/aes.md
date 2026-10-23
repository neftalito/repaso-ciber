---
{"id":"crypto-aes","title":"AES","slug":"aes","parent":"crypto-block-algorithms","type":"algorithm","order":30,"related":["crypto-ecb","crypto-cbc","crypto-base64"],"sources":[{"id":"lecture-crypto-1","pages":[25,26,27,28,30]},{"id":"manual","pages":[10]},{"id":"practice-guide","pages":[5]}],"permalink":"cryptography/encryption/modern/symmetric/block/aes"}
---
## Definición

AES es un algoritmo de cifrado simétrico por bloques. La clase lo utiliza para comparar ECB y CBC; el manual complementario precisa que opera con bloques de 128 bits y admite claves de 128, 192 o 256 bits.

## Parámetros que deben distinguirse

| Dato | Significado |
| --- | --- |
| Bloque de 128 bits | Unidad de 16 bytes transformada por el algoritmo |
| Clave AES-128 | Secreto de 16 bytes |
| Clave AES-256 | Secreto de 32 bytes, sin cambiar el tamaño de bloque |
| Modo de operación | Forma de aplicar el algoritmo al mensaje |

## Ejemplo de interpretación

Si un ejercicio entrega «AES-128-ECB en Base64», la etiqueta contiene varias decisiones. Base64 representa los bytes cifrados; AES-128 fija el algoritmo y la longitud de clave; ECB fija la relación entre bloques. También se necesita conocer el relleno, si existe.

El funcionamiento interno de las rondas no se desarrolla en las fuentes utilizadas. El objetivo es interpretar correctamente el esquema, no reconstruir una implementación criptográfica.

:::question ¿AES-256 cifra bloques de 256 bits?
No. El número identifica la longitud de la clave. El bloque de AES sigue siendo de 128 bits, es decir, 16 bytes.
:::

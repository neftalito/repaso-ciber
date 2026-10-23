---
{"id":"crypto-asymmetric","title":"Criptografía asimétrica","slug":"asymmetric","parent":"crypto-modern","type":"category","order":20,"related":["crypto-symmetric","crypto-signature","crypto-dh"],"sources":[{"id":"lecture-crypto-2","pages":[4,5,6,7,8,9,10]},{"id":"practice-1b","pages":[1]},{"id":"dh-rsa-guide","pages":[4,8,9]}],"permalink":"cryptography/encryption/modern/asymmetric"}
---
## Un par de claves con roles diferentes

La **criptografía asimétrica** utiliza una clave pública y una privada relacionadas matemáticamente. La pública puede distribuirse; la privada debe permanecer bajo control de su propietario.

Cripto, parte 2, páginas 4–7, distingue dos usos: cifrar con la pública del destinatario para que este descifre con su privada, y [firmar](wiki:crypto-signature) con la privada del emisor para que otros verifiquen con su pública. Son objetivos diferentes.

## Mecanismos de clave pública

- [RSA](wiki:crypto-rsa): se presenta para cifrado y firma.
- [ElGamal](wiki:crypto-elgamal): se relaciona con el logaritmo discreto y con cifrado y firma.
- [Criptografía de curvas elípticas](wiki:crypto-elliptic-curves): identifica una familia matemática, no un único procedimiento.

La página 10 también distingue DSA, destinado a firma, y [Diffie–Hellman](wiki:crypto-dh), destinado a acordar un secreto. Por eso la frase «una clave deshace lo que hace la otra» no debe generalizarse como definición de todas las operaciones de clave pública.

## Comparar acuerdo, cifrado y autenticación

| Aspecto | Diffie–Hellman | RSA |
| --- | --- | --- |
| Objetivo del ejemplo | Acordar un secreto compartido. | Cifrar un entero con clave pública y recuperarlo con la privada. |
| Datos públicos | p, g, A y B. | n y e. |
| Datos secretos | a, b y el secreto resultante. | p, q y d. |
| Operación central | B^a mod p = A^b mod p. | c=m^e mod n; m=c^d mod n. |
| Autenticación | Hay que autenticar el intercambio. | Hay que autenticar el vínculo entre clave pública e identidad. |

El secreto DH suele pasar por una función de derivación; RSA requiere un esquema completo de cifrado o de firma. Los ejemplos con números pequeños sirven para estudiar las operaciones. La guía, página 8, advierte además que RSA y DH clásicos no proporcionan resistencia frente a un ordenador cuántico suficientemente potente.

Los cálculos se desarrollan en [Diffie–Hellman](wiki:crypto-dh) y [RSA](wiki:crypto-rsa).

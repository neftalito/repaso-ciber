---
{"id":"crypto-asymmetric","title":"Criptografía asimétrica","slug":"asymmetric","parent":"crypto-modern","type":"category","order":20,"related":["crypto-symmetric","crypto-signature","crypto-dh"],"sources":[{"id":"lecture-crypto-2","pages":[4,5,6,7,8,9,10]},{"id":"practice-1b","pages":[1]}],"permalink":"cryptography/encryption/modern/asymmetric"}
---
## Un par de claves con roles diferentes

La **criptografía asimétrica** utiliza una clave pública y una privada relacionadas matemáticamente. La pública puede distribuirse; la privada debe permanecer bajo control de su propietario.

Cripto, parte 2, páginas 4–7, distingue dos usos: cifrar con la pública del destinatario para que este descifre con su privada, y [firmar](wiki:crypto-signature) con la privada del emisor para que otros verifiquen con su pública. Son objetivos diferentes.

## Mecanismos de clave pública

- [RSA](wiki:crypto-rsa): se presenta para cifrado y firma.
- [ElGamal](wiki:crypto-elgamal): se relaciona con el logaritmo discreto y con cifrado y firma.
- [Criptografía de curvas elípticas](wiki:crypto-elliptic-curves): identifica una familia matemática, no un único procedimiento.

La página 10 también distingue DSA, destinado a firma, y [Diffie–Hellman](wiki:crypto-dh), destinado a acordar un secreto. Por eso la frase «una clave deshace lo que hace la otra» no debe generalizarse como definición de todas las operaciones de clave pública.

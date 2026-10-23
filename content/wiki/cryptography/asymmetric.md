---
{"id":"crypto-asymmetric","title":"Criptografía asimétrica","slug":"asymmetric","parent":"crypto-modern","type":"category","order":20,"related":["crypto-symmetric","crypto-signature","crypto-dh"],"sources":[{"id":"lecture-crypto-2","pages":[4,5,6,7,8,9,10]},{"id":"practice-1b","pages":[1]}]}
---
## Un par de claves con roles diferentes

La criptografía asimétrica utiliza una clave pública y una privada relacionadas matemáticamente. La pública puede distribuirse; la privada debe permanecer bajo control de su propietario.

Para cifrar un mensaje destinado a una persona se utiliza su clave pública y se descifra con la privada correspondiente. Para [firmar](wiki:crypto-signature), el emisor utiliza su clave privada y los demás verifican con su pública. Cifrar y firmar resuelven objetivos diferentes.

La clase presenta RSA y ElGamal, además de DSA y criptografía de curvas elípticas. No todos los mecanismos de clave pública cifran mensajes: DSA es de firma y [Diffie–Hellman](wiki:crypto-dh) acuerda un secreto. La simplificación «una clave deshace lo que hace la otra» no debe generalizarse como definición de todos estos algoritmos.

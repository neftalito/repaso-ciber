---
{"id":"crypto-elgamal","title":"ElGamal","slug":"elgamal","parent":"crypto-asymmetric","type":"algorithm","order":20,"related":["crypto-dh","crypto-rsa","crypto-signature"],"sources":[{"id":"lecture-crypto-2","pages":[10]}],"permalink":"cryptography/encryption/modern/asymmetric/elgamal"}
---
## Para qué se menciona ElGamal

**ElGamal** aparece en Cripto, parte 2, página 10, entre los algoritmos de clave pública, asociado al **logaritmo discreto** y a aplicaciones de cifrado y firma.

## Separar los propósitos

Cifrar para un destinatario busca proteger la lectura del mensaje. Firmar como emisor permite verificar su origen mediante la información pública correspondiente. Que el nombre ElGamal esté asociado a ambos usos no significa que una misma operación proporcione automáticamente los dos servicios.

La página también presenta Diffie–Hellman, relacionado con el logaritmo discreto, para acordar una clave secreta. Esa base matemática compartida no convierte el acuerdo de claves en cifrado de documentos.

La fuente enumera la relación y los usos, sin desarrollar la generación de claves ni las ecuaciones de ElGamal. No ofrece un ejemplo numérico para reconstruir esos procedimientos.

:::question ¿Compartir una base matemática hace idénticos a ElGamal y Diffie–Hellman?
No. Hay que distinguir el problema matemático en que se apoya un mecanismo de la operación que permite realizar.
:::

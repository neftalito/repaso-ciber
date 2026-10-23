---
{"id":"crypto-pgp","title":"PGP","slug":"pgp","parent":"crypto-modern","type":"concept","order":90,"related":["crypto-hybrid","crypto-signature","crypto-pgp-trust","crypto-gpg","csirt-email"],"sources":[{"id":"lecture-crypto-2","pages":[18,23,24,25]},{"id":"practice-1b","pages":[6,7]}],"permalink":"cryptography/pgp"}
---
## Definición

PGP, Pretty Good Privacy, permite proteger documentos mediante cifrado y firmas. El material lo describe como un criptosistema híbrido que combina técnicas simétricas y asimétricas y como un esquema personal de confianza descentralizada.

## Operaciones diferentes

| Operación | Propósito | Clave asociada al rol |
| --- | --- | --- |
| Cifrar para una persona | Restringir lectura | Pública del destinatario |
| Descifrar lo recibido | Recuperar contenido | Privada correspondiente |
| Firmar | Vincular contenido con el emisor | Privada del firmante |
| Verificar una firma | Comprobar firma e integridad | Pública del firmante |

También puede usarse cifrado simétrico con una frase de paso. La práctica distingue mensajes solamente cifrados, solamente firmados y ambas operaciones combinadas.

## Confianza

Descargar una clave de un repositorio público no demuestra a quién pertenece. La red de confianza de PGP aborda la asociación entre identidad y clave mediante decisiones y firmas de los usuarios.

:::question ¿Una firma verificable con una clave llamada «Docente» demuestra por sí sola esa identidad?
No. Primero hay que justificar que la clave pertenece a la persona esperada. La verificación matemática y la validación de identidad son cuestiones diferentes.
:::

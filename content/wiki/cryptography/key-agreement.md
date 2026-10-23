---
{"id":"crypto-key-agreement","title":"Acuerdo de claves","slug":"key-agreement","parent":"crypto-modern","type":"category","order":30,"related":["crypto-symmetric","crypto-signature","crypto-pki"],"sources":[{"id":"lecture-crypto-2","pages":[10]},{"id":"practice-1b","pages":[4]},{"id":"practice-guide","pages":[6]}],"permalink":"cryptography/key-agreement"}
---
## Establecer un secreto compartido

Un **acuerdo de claves** permite que dos partes obtengan un secreto compartido a partir de valores privados y de intercambios públicos. Resuelve el establecimiento de ese secreto, que después puede utilizarse en una comunicación cifrada.

## Mecanismo desarrollado en la materia

- [Diffie–Hellman](wiki:crypto-dh): permite acordar el secreto sin transmitirlo directamente.

Cripto, parte 2, página 10, presenta su propósito y la explicación de la Práctica 1, parte 2, página 4, desarrolla el procedimiento. DH no cifra por sí mismo la conversación. La guía complementaria, página 6, aclara además que su versión básica no autentica a los participantes: acuerdo, cifrado y autenticación cumplen funciones distintas dentro de un protocolo.
